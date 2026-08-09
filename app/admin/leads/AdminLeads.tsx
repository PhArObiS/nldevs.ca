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

const TOKEN_STORAGE_KEY = "nldevs-admin-token";

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
  const [leads, setLeads] = useState<Lead[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setToken(window.sessionStorage.getItem(TOKEN_STORAGE_KEY) ?? "");
  }, []);

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
    setLoading(true);

    try {
      const response = await fetch("/api/admin/leads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = (await response.json()) as {
        error?: string;
        leads?: Lead[];
      };

      if (!response.ok) {
        throw new Error(result.error || "Could not load leads.");
      }

      window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
      setLeads(result.leads ?? []);
      setNotice("Leads loaded.");
    } catch (loadError) {
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
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lead.id,
          adminStatus: lead.admin_status || "new",
          adminTags: lead.admin_tags || "",
          adminNotes: lead.admin_notes || "",
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

  function updateLead(id: string, patch: Partial<Lead>) {
    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead))
    );
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
        className="mt-10 grid gap-3 border border-edge bg-ink-800/50 p-4 md:grid-cols-[1fr_auto]"
      >
        <input
          type="password"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          className="w-full border border-edge bg-ink px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
          placeholder="Admin access token"
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
          className="border border-edge bg-ink-800 px-4 py-3 text-white outline-none transition focus:border-neon-cyan"
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
                </dl>
              </div>

              <div className="space-y-3">
                <select
                  value={lead.admin_status || "new"}
                  onChange={(event) =>
                    updateLead(lead.id, { admin_status: event.target.value })
                  }
                  className="w-full border border-edge bg-ink px-3 py-2.5 text-white outline-none transition focus:border-neon-cyan"
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
                  disabled={savingId === lead.id}
                  className="clip-corner-sm w-full border border-neon-cyan bg-neon-cyan px-4 py-2.5 text-sm font-black uppercase tracking-wide text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
                >
                  {savingId === lead.id ? "Saving" : "Save"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
