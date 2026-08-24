"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Lead = {
  id: string;
  name: string;
  email: string;
  fortnite_name: string | null;
  discord_name: string | null;
  favorite_map: string | null;
  member_goals: string | null;
  developer_interest: boolean | null;
  developer_role: string | null;
  developer_portfolio: string | null;
  developer_availability: string | null;
  contact_consent: boolean | null;
  age_attestation: boolean | null;
  email_confirmed: boolean | null;
  email_confirmed_at: string | null;
  signup_locale: string | null;
  preferred_email_locale: string | null;
  marketing_unsubscribed: boolean | null;
  admin_status: string | null;
  admin_tags: string | null;
  admin_notes: string | null;
  contacted_at: string | null;
  last_reviewed_at: string | null;
  created_at: string;
};

const STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "playtester", label: "Playtester" },
  { value: "developer", label: "Developer" },
  { value: "priority", label: "Priority" },
  { value: "not_a_fit", label: "Not a fit" },
];

const LOCALES = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "pt", label: "Portuguese" },
  { value: "es", label: "Spanish" },
  { value: "ru", label: "Russian" },
  { value: "pl", label: "Polish" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
];

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function AdminLeads() {
  const [token, setToken] = useState("");
  const [confirmToken, setConfirmToken] = useState("");
  const [activeToken, setActiveToken] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [sendingId, setSendingId] = useState("");
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastDraft, setBroadcastDraft] = useState({
    subject: "",
    message: "",
    sourceLocale: "en",
    forceEnglish: false,
    confirmBroadcast: "",
  });
  const [emailDrafts, setEmailDrafts] = useState<
    Record<string, { subject: string; message: string }>
  >({});
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const filteredLeads = useMemo(() => {
    const search = query.trim().toLowerCase();
    return leads.filter((lead) => {
      const status = lead.admin_status || "new";
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesSearch =
        !search ||
        [lead.name, lead.email, lead.fortnite_name, lead.discord_name, lead.member_goals]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [leads, query, statusFilter]);

  async function loadLeads(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setError("");
    setNotice("");
    const submittedToken = token;
    const submittedConfirmToken = confirmToken;
    setToken("");
    setConfirmToken("");

    if (submittedToken !== submittedConfirmToken) {
      setActiveToken("");
      setLeads([]);
      setError("Access tokens do not match. Please enter both again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/leads", {
        headers: { Authorization: `Bearer ${submittedToken}` },
      });
      const result = (await response.json()) as {
        error?: string;
        leads?: Lead[];
      };

      if (!response.ok) {
        throw new Error(result.error || "Could not load leads.");
      }

      setActiveToken(submittedToken);
      setLeads(result.leads ?? []);
      setNotice("Leads loaded.");
    } catch (loadError) {
      setActiveToken("");
      setLeads([]);
      setError(loadError instanceof Error ? loadError.message : "Could not load leads.");
    } finally {
      setLoading(false);
    }
  }

  async function saveLead(lead: Lead) {
    setError("");
    setNotice("");
    setSavingId(lead.id);

    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${activeToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lead.id,
          adminStatus: lead.admin_status || "new",
          adminTags: lead.admin_tags || "",
          adminNotes: lead.admin_notes || "",
          preferredEmailLocale: lead.preferred_email_locale || null,
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        lead?: Lead;
      };

      if (!response.ok) {
        throw new Error(result.error || "Could not save lead.");
      }

      if (result.lead) {
        setLeads((current) =>
          current.map((item) => (item.id === result.lead?.id ? result.lead : item))
        );
      }
      setNotice("Lead updated.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save lead.");
    } finally {
      setSavingId("");
    }
  }

  async function sendLeadEmail(lead: Lead) {
    const draft = emailDrafts[lead.id] ?? { subject: "", message: "" };
    setError("");
    setNotice("");
    setSendingId(lead.id);

    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${activeToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lead.id,
          subject: draft.subject,
          message: draft.message,
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        warning?: string;
        lead?: Lead;
      };

      if (!response.ok) {
        throw new Error(result.error || "Could not send email.");
      }

      if (result.lead) {
        setLeads((current) =>
          current.map((item) => (item.id === result.lead?.id ? result.lead : item))
        );
      }
      setEmailDrafts((current) => ({
        ...current,
        [lead.id]: { subject: "", message: "" },
      }));
      setNotice(result.warning || `Email sent to ${lead.email}.`);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Could not send email.");
    } finally {
      setSendingId("");
    }
  }

  async function sendBroadcast() {
    setError("");
    setNotice("");
    setBroadcasting(true);

    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${activeToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          broadcast: true,
          subject: broadcastDraft.subject,
          message: broadcastDraft.message,
          sourceLocale: broadcastDraft.sourceLocale,
          forceEnglish: broadcastDraft.forceEnglish,
          confirmBroadcast: broadcastDraft.confirmBroadcast,
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        sent?: number;
        failed?: string[];
        translatedLocales?: string[];
      };

      if (!response.ok) {
        throw new Error(result.error || "Could not send broadcast.");
      }

      setBroadcastDraft((current) => ({
        ...current,
        subject: "",
        message: "",
        confirmBroadcast: "",
      }));
      const failedCount = result.failed?.length ?? 0;
      setNotice(
        failedCount
          ? `Broadcast sent to ${result.sent ?? 0}; ${failedCount} failed.`
          : `Broadcast sent to ${result.sent ?? 0} members.`
      );
    } catch (broadcastError) {
      setError(
        broadcastError instanceof Error
          ? broadcastError.message
          : "Could not send broadcast."
      );
    } finally {
      setBroadcasting(false);
    }
  }

  function updateLead(id: string, patch: Partial<Lead>) {
    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead))
    );
  }

  function updateEmailDraft(
    id: string,
    patch: Partial<{ subject: string; message: string }>
  ) {
    setEmailDrafts((current) => ({
      ...current,
      [id]: {
        subject: current[id]?.subject ?? "",
        message: current[id]?.message ?? "",
        ...patch,
      },
    }));
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-14">
      <section>
        <p className="eyebrow">Private admin</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
          Member Leads
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-gray-400">
          Review new members, mark follow-up status, tag playtesters or
          developers, and keep private notes.
        </p>
      </section>

      <form
        onSubmit={loadLeads}
        className="mt-10 grid gap-3 border border-edge bg-ink-800/50 p-4 md:grid-cols-[1fr_1fr_auto]"
      >
        <input
          type="password"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          className="w-full border border-edge bg-ink px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
          placeholder="Admin access token"
          required
        />
        <input
          type="password"
          value={confirmToken}
          onChange={(event) => setConfirmToken(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          className="w-full border border-edge bg-ink px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
          placeholder="Confirm access token"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="clip-corner-sm border border-neon-cyan bg-neon-cyan px-5 py-3 font-black uppercase tracking-wide text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? "Loading" : "Load leads"}
        </button>
      </form>

      {(error || notice) && (
        <p
          className={`mt-4 text-sm font-semibold ${
            error ? "text-red-300" : "text-neon-cyan"
          }`}
        >
          {error || notice}
        </p>
      )}

      <section className="mt-8 border border-edge bg-ink-800/50 p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_14rem_12rem]">
          <input
            value={broadcastDraft.subject}
            onChange={(event) =>
              setBroadcastDraft((current) => ({
                ...current,
                subject: event.target.value,
              }))
            }
            maxLength={140}
            className="w-full border border-edge bg-ink px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
            placeholder="Launch or event email subject"
          />
          <select
            value={broadcastDraft.sourceLocale}
            onChange={(event) =>
              setBroadcastDraft((current) => ({
                ...current,
                sourceLocale: event.target.value,
              }))
            }
            className="border border-edge bg-ink py-3 pl-4 pr-10 text-white outline-none transition focus:border-neon-cyan"
          >
            {LOCALES.map((locale) => (
              <option key={locale.value} value={locale.value}>
                Written in {locale.label}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 border border-edge bg-ink px-4 py-3 text-sm font-semibold text-gray-300">
            <input
              type="checkbox"
              checked={broadcastDraft.forceEnglish}
              onChange={(event) =>
                setBroadcastDraft((current) => ({
                  ...current,
                  forceEnglish: event.target.checked,
                }))
              }
              className="h-4 w-4 accent-neon-cyan"
            />
            Force English
          </label>
        </div>
        <textarea
          value={broadcastDraft.message}
          onChange={(event) =>
            setBroadcastDraft((current) => ({
              ...current,
              message: event.target.value,
            }))
          }
          maxLength={2000}
          rows={5}
          className="mt-3 w-full resize-none border border-edge bg-ink px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
          placeholder="Write one update. It will be sent individually to confirmed members who allowed updates, translated to their language unless English is forced."
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            Eligible now:{" "}
            {
              leads.filter(
                (lead) =>
                  lead.email_confirmed &&
                  lead.contact_consent &&
                  !lead.marketing_unsubscribed
              ).length
            }{" "}
            confirmed consenting members.
          </p>
          <input
            value={broadcastDraft.confirmBroadcast}
            onChange={(event) =>
              setBroadcastDraft((current) => ({
                ...current,
                confirmBroadcast: event.target.value,
              }))
            }
            className="w-32 border border-edge bg-ink px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
            placeholder="Type SEND"
          />
          <button
            type="button"
            onClick={sendBroadcast}
            disabled={
              !activeToken ||
              broadcasting ||
              broadcastDraft.confirmBroadcast !== "SEND"
            }
            className="clip-corner-sm border border-neon-magenta bg-neon-magenta px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-ink disabled:cursor-wait disabled:opacity-70"
          >
            {broadcasting ? "Sending" : "Send broadcast"}
          </button>
        </div>
      </section>

      <div className="mt-8 grid gap-3 md:grid-cols-[1fr_14rem]">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full border border-edge bg-ink-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
          placeholder="Search name, email, Discord, goals..."
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="border border-edge bg-ink-800 py-3 pl-4 pr-10 text-white outline-none transition focus:border-neon-cyan"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-4">
        {filteredLeads.map((lead) => (
          <article
            key={lead.id}
            className="clip-corner border border-edge/70 bg-ink-800/50 p-4"
          >
            <div className="grid gap-4 lg:grid-cols-[1fr_16rem]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{lead.name}</h2>
                  <span className="clip-corner-sm border border-neon-cyan/40 bg-neon-cyan/10 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-neon-cyan">
                    {lead.admin_status || "new"}
                  </span>
                  {lead.developer_interest && (
                    <span className="clip-corner-sm border border-neon-magenta/40 bg-neon-magenta/10 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-neon-magenta">
                      Developer
                    </span>
                  )}
                  <span
                    className={`clip-corner-sm border px-2 py-1 text-[10px] font-black uppercase tracking-wide ${
                      lead.email_confirmed
                        ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                        : "border-amber-300/40 bg-amber-300/10 text-amber-200"
                    }`}
                  >
                    {lead.email_confirmed ? "Email verified" : "Unconfirmed"}
                  </span>
                  {lead.marketing_unsubscribed && (
                    <span className="clip-corner-sm border border-red-300/40 bg-red-300/10 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-red-200">
                      Unsubscribed
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-400">{lead.email}</p>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <dt className="text-gray-500">Fortnite</dt>
                    <dd className="text-gray-300">{lead.fortnite_name || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Discord</dt>
                    <dd className="text-gray-300">{lead.discord_name || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Favorite map</dt>
                    <dd className="text-gray-300">{lead.favorite_map || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Here for</dt>
                    <dd className="text-gray-300">{lead.member_goals || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Developer role</dt>
                    <dd className="text-gray-300">{lead.developer_role || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Joined</dt>
                    <dd className="text-gray-300">{formatDate(lead.created_at)}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Email confirmed</dt>
                    <dd className="text-gray-300">
                      {lead.email_confirmed ? formatDate(lead.email_confirmed_at) : "-"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Signup language</dt>
                    <dd className="text-gray-300">
                      {lead.signup_locale?.toUpperCase() || "EN"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Updates consent</dt>
                    <dd className="text-gray-300">
                      {lead.contact_consent ? "Yes" : "No"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-3">
                <select
                  value={lead.preferred_email_locale || ""}
                  onChange={(event) =>
                    updateLead(lead.id, {
                      preferred_email_locale: event.target.value || null,
                    })
                  }
                  className="w-full border border-edge bg-ink py-2.5 pl-3 pr-10 text-white outline-none transition focus:border-neon-cyan"
                >
                  <option value="">Auto language</option>
                  {LOCALES.map((locale) => (
                    <option key={locale.value} value={locale.value}>
                      Prefer {locale.label}
                    </option>
                  ))}
                </select>
                <select
                  value={lead.admin_status || "new"}
                  onChange={(event) =>
                    updateLead(lead.id, { admin_status: event.target.value })
                  }
                  className="w-full border border-edge bg-ink py-2.5 pl-3 pr-10 text-white outline-none transition focus:border-neon-cyan"
                >
                  {STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <input
                  value={lead.admin_tags || ""}
                  onChange={(event) =>
                    updateLead(lead.id, { admin_tags: event.target.value })
                  }
                  className="w-full border border-edge bg-ink px-3 py-2.5 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
                  placeholder="Tags: build, qa, priority..."
                />
                <textarea
                  value={lead.admin_notes || ""}
                  onChange={(event) =>
                    updateLead(lead.id, { admin_notes: event.target.value })
                  }
                  rows={3}
                  className="w-full resize-none border border-edge bg-ink px-3 py-2.5 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
                  placeholder="Private notes"
                />
                <button
                  type="button"
                  onClick={() => saveLead(lead)}
                  disabled={!activeToken || savingId === lead.id}
                  className="clip-corner-sm w-full border border-neon-cyan bg-neon-cyan px-4 py-2.5 text-sm font-black uppercase tracking-wide text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
                >
                  {savingId === lead.id ? "Saving" : "Save"}
                </button>

                <div className="border-t border-white/10 pt-3">
                  <p className="text-xs font-black uppercase tracking-wide text-neon-cyan">
                    Send message
                  </p>
                  <input
                    value={emailDrafts[lead.id]?.subject ?? ""}
                    onChange={(event) =>
                      updateEmailDraft(lead.id, { subject: event.target.value })
                    }
                    maxLength={140}
                    className="mt-2 w-full border border-edge bg-ink px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
                    placeholder="Subject"
                  />
                  <textarea
                    value={emailDrafts[lead.id]?.message ?? ""}
                    onChange={(event) =>
                      updateEmailDraft(lead.id, { message: event.target.value })
                    }
                    maxLength={2000}
                    rows={4}
                    className="mt-2 w-full resize-none border border-edge bg-ink px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
                    placeholder="Short message"
                  />
                  <button
                    type="button"
                    onClick={() => sendLeadEmail(lead)}
                    disabled={!activeToken || sendingId === lead.id}
                    className="clip-corner-sm mt-2 w-full border border-neon-magenta bg-neon-magenta px-4 py-2.5 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-ink disabled:cursor-wait disabled:opacity-70"
                  >
                    {sendingId === lead.id ? "Sending" : "Send email"}
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
