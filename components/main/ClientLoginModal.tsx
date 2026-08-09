"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";

const STORAGE_KEY = "nldevs-client-profile";
const DISMISSED_KEY = "nldevs-client-login-dismissed";

type ClientProfile = {
  name: string;
  email: string;
  fortniteName?: string;
  discordName?: string;
  avatarStyle?: string;
  favoriteMap?: string;
  message?: string;
  imageName?: string;
  imageType?: string;
  imageUrl?: string;
  imagePurpose?: string;
  developerInterest: boolean;
  developerRole?: string;
  developerPortfolio?: string;
  developerSkills?: string;
  developerAvailability?: string;
  contactConsent: boolean;
  ageAttestation: boolean;
  savedAt: string;
};

const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;

const AVATAR_OPTIONS = [
  "No preference",
  "Star Wars",
  "TMNT",
  "Squid Game",
  "Winterfest",
  "NLDEVS logo",
];

const FAVORITE_MAPS = [
  "Star Wars Tycoon Sidekick Legends",
  "Star Wars Mega RvB",
  "Star Wars Tilted 99 Bots Royale",
  "TMNT Mega Ramp Survival",
  "TMNT City",
  "RvB Squid Minigame",
  "99 Bots Squid Royale Boss",
  "Sidekick Siege 99 Bots",
  "Winterfest Demon Hunters",
  "RvB Players vs Guards",
];

const IMAGE_PURPOSES = ["Screenshot", "Bug", "Map idea", "Fan art", "Other"];

const DEVELOPER_ROLES = [
  "UEFN / Verse developer",
  "Unreal Engine developer",
  "3D artist",
  "Level designer",
  "Gameplay designer",
  "UI / web developer",
  "QA tester",
  "Other",
];

const DEVELOPER_AVAILABILITY = [
  "Open now",
  "Open soon",
  "Part-time",
  "Contract / freelance",
  "Future opportunities",
];

function readImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Unable to read image."));
    });
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

export default function ClientLoginModal() {
  const [open, setOpen] = useState(false);
  const [returningEmail, setReturningEmail] = useState("");
  const [showNewMember, setShowNewMember] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fortniteName, setFortniteName] = useState("");
  const [discordName, setDiscordName] = useState("");
  const [avatarStyle, setAvatarStyle] = useState("");
  const [favoriteMap, setFavoriteMap] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePurpose, setImagePurpose] = useState("");
  const [developerInterest, setDeveloperInterest] = useState(false);
  const [developerRole, setDeveloperRole] = useState("");
  const [developerPortfolio, setDeveloperPortfolio] = useState("");
  const [developerSkills, setDeveloperSkills] = useState("");
  const [developerAvailability, setDeveloperAvailability] = useState("");
  const [contactConsent, setContactConsent] = useState(false);
  const [ageAttestation, setAgeAttestation] = useState(false);
  const [website, setWebsite] = useState("");
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const storedProfile = window.localStorage.getItem(STORAGE_KEY);
    const dismissed = window.sessionStorage.getItem(DISMISSED_KEY);

    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile) as Partial<ClientProfile>;
        applyProfile(profile);
        setReturningEmail(profile.email ?? "");
        setSaved(Boolean(profile.email));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    if (!storedProfile && !dismissed) {
      const timer = window.setTimeout(() => setOpen(true), 650);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    function onOpenClientLogin() {
      setOpen(true);
    }

    window.addEventListener("nldevs:open-client-login", onOpenClientLogin);
    return () => {
      window.removeEventListener("nldevs:open-client-login", onOpenClientLogin);
    };
  }, []);

  function closeForSession() {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    setOpen(false);
  }

  function openEditInfo() {
    setError("");
    setNotice("");
    setShowNewMember(true);
  }

  function applyProfile(profile: Partial<ClientProfile>) {
    setName(profile.name ?? "");
    setEmail(profile.email ?? "");
    setFortniteName(profile.fortniteName ?? "");
    setDiscordName(profile.discordName ?? "");
    setAvatarStyle(profile.avatarStyle ?? "");
    setFavoriteMap(profile.favoriteMap ?? "");
    setMessage(profile.message ?? "");
    setImagePurpose(profile.imagePurpose ?? "");
    setDeveloperInterest(profile.developerInterest ?? false);
    setDeveloperRole(profile.developerRole ?? "");
    setDeveloperPortfolio(profile.developerPortfolio ?? "");
    setDeveloperSkills(profile.developerSkills ?? "");
    setDeveloperAvailability(profile.developerAvailability ?? "");
    setContactConsent(profile.contactConsent ?? false);
    setAgeAttestation(profile.ageAttestation ?? false);
  }

  function saveProfile(profile: ClientProfile) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(
      new CustomEvent("nldevs:client-login-updated", {
        detail: profile,
      })
    );
    setSaved(true);
  }

  async function onReturningSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoggingIn(true);

    try {
      const response = await fetch("/api/player-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: returningEmail.trim(),
          website,
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        code?: string;
        profile?: ClientProfile;
      };

      if (!response.ok) {
        if (result.code === "MEMBER_NOT_FOUND") {
          setEmail(returningEmail.trim());
          setShowNewMember(true);
          setNotice("No member found. Join below.");
          return;
        }

        throw new Error(result.error || "Unable to log in right now.");
      }

      if (result.profile) {
        applyProfile(result.profile);
        saveProfile(result.profile);
      }

      setNotice("Welcome back.");
      window.setTimeout(() => setOpen(false), 900);
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Could not log in yet. Please try again in a moment."
      );
    } finally {
      setLoggingIn(false);
    }
  }

  async function onSignupSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);

    try {
      if (imageFile && !imageFile.type.startsWith("image/")) {
        throw new Error("Please upload an image file.");
      }

      if (imageFile && imageFile.size > MAX_IMAGE_BYTES) {
        throw new Error("Image must be 1.5 MB or smaller.");
      }

      const imageData = imageFile ? await readImageFile(imageFile) : undefined;
      const profile: ClientProfile = {
        name: name.trim(),
        email: email.trim(),
        fortniteName: fortniteName.trim() || undefined,
        discordName: discordName.trim() || undefined,
        avatarStyle: avatarStyle || undefined,
        favoriteMap: favoriteMap || undefined,
        message: message.trim() || undefined,
        imageName: imageFile?.name,
        imageType: imageFile?.type,
        imageUrl: undefined,
        imagePurpose: imagePurpose || undefined,
        developerInterest,
        developerRole: developerRole || undefined,
        developerPortfolio: developerPortfolio.trim() || undefined,
        developerSkills: developerSkills.trim() || undefined,
        developerAvailability: developerAvailability || undefined,
        contactConsent,
        ageAttestation,
        savedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/player-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, action: "signup", imageData, website }),
      });

      const result = (await response.json()) as {
        error?: string;
        profile?: ClientProfile;
      };

      if (!response.ok) {
        throw new Error(result.error || "Unable to save right now.");
      }

      const storedProfile = result.profile ?? profile;
      saveProfile(storedProfile);
      setReturningEmail(storedProfile.email);
      window.setTimeout(() => setOpen(false), 900);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not save yet. Please try again in a moment."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/75 px-3 py-3 backdrop-blur-md sm:items-center sm:px-4 sm:py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-login-title"
    >
      <div className="clip-corner relative max-h-[calc(100dvh-1.5rem)] w-full max-w-[22rem] overflow-y-auto border border-neon-cyan/40 bg-ink/95 p-4 shadow-[0_0_48px_rgba(34,211,238,0.18)] sm:max-h-[calc(100vh-3rem)] sm:max-w-xl sm:p-6">
        <button
          type="button"
          onClick={closeForSession}
          className="clip-corner-sm absolute right-3 top-3 min-h-10 border border-edge-bright bg-ink-800/90 px-3 text-sm font-semibold text-gray-300 transition hover:border-neon-cyan hover:text-white sm:right-4 sm:top-4"
          aria-label="Close client login"
        >
          Skip
        </button>

        <div className="flex items-center gap-2.5 pr-16 sm:gap-3">
          <Image
            src="/NavLogo.png"
            alt=""
            aria-hidden="true"
            width={36}
            height={36}
            priority
          />
          <div>
            <p className="eyebrow">Member Access</p>
            <h2 id="client-login-title" className="mt-1 text-2xl font-black text-white">
              {saved ? "Logged in" : "Join NLDEVS"}
            </h2>
          </div>
        </div>

        {saved && (
          <div className="mt-5 border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-3">
            <p className="text-sm font-semibold text-neon-cyan">
              You&apos;re logged in. Welcome to NLDEVS.
            </p>
            <button
              type="button"
              onClick={openEditInfo}
              className="clip-corner-sm mt-3 border border-neon-cyan/70 bg-ink-800/70 px-3 py-2 text-xs font-black uppercase tracking-wide text-neon-cyan transition hover:bg-neon-cyan hover:text-ink"
            >
              Edit Info
            </button>
          </div>
        )}

        {notice && (
          <p className="mt-5 border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-3 text-sm font-semibold text-neon-cyan">
            {notice}
          </p>
        )}

        <form
          className="mt-5 border border-edge bg-ink-800/40 p-3 sm:mt-6"
          onSubmit={onReturningSubmit}
        >
          <div className="hidden" aria-hidden="true">
            <label htmlFor="returning-member-website">Website</label>
            <input
              id="returning-member-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>

          <h3 className="text-sm font-black uppercase tracking-wide text-white">
            Returning Member
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div>
              <label
                htmlFor="returning-member-email"
                className="text-sm font-semibold text-gray-200"
              >
                Email
              </label>
              <input
                id="returning-member-email"
                name="returningEmail"
                type="email"
                autoComplete="email"
                value={returningEmail}
                onChange={(event) => setReturningEmail(event.target.value)}
                required
                className="mt-2 w-full border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="clip-corner-sm self-end border border-neon-cyan bg-neon-cyan px-4 py-2.5 text-sm font-black uppercase tracking-wide text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
            >
              {loggingIn ? "Checking" : "Log in"}
            </button>
          </div>
        </form>

        <p className="mt-3 border border-edge/80 bg-ink-800/30 px-3 py-2 text-xs leading-relaxed text-gray-400">
          We only use your info for NLDEVS updates, playtests, support, and
          collaboration opportunities. We never sell your info.
        </p>

        <details
          className="mt-3 border border-edge bg-ink-800/25 p-3"
          open={showNewMember}
          onToggle={(event) => setShowNewMember(event.currentTarget.open)}
        >
          <summary className="cursor-pointer text-sm font-black uppercase tracking-wide text-neon-cyan">
            {saved ? "Edit Member Info" : "New Member"}
          </summary>

        <form className="mt-4 space-y-3 sm:space-y-4" onSubmit={onSignupSubmit}>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="client-website">Website</label>
            <input
              id="client-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="client-name" className="text-sm font-semibold text-gray-200">
              Name
            </label>
            <input
              id="client-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
              className="mt-2 w-full border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan sm:px-4 sm:py-3"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="client-email" className="text-sm font-semibold text-gray-200">
              Email
            </label>
            <input
              id="client-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 w-full border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan sm:px-4 sm:py-3"
              placeholder="you@example.com"
            />
          </div>

          <details className="border border-edge bg-ink-800/40 p-3">
            <summary className="cursor-pointer text-sm font-semibold text-neon-cyan">
              Optional player info
            </summary>

            <div className="mt-4 space-y-3 sm:space-y-4">
          <div>
            <label
              htmlFor="client-fortnite-name"
              className="text-sm font-semibold text-gray-200"
            >
              Fortnite name <span className="text-gray-500">optional</span>
            </label>
            <input
              id="client-fortnite-name"
              name="fortniteName"
              type="text"
              autoComplete="nickname"
              value={fortniteName}
              onChange={(event) => setFortniteName(event.target.value)}
              className="mt-2 w-full border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan sm:px-4 sm:py-3"
              placeholder="Epic / Fortnite name"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="client-discord-name"
                className="text-sm font-semibold text-gray-200"
              >
                Discord <span className="text-gray-500">optional</span>
              </label>
              <input
                id="client-discord-name"
                name="discordName"
                type="text"
                autoComplete="username"
                value={discordName}
                onChange={(event) => setDiscordName(event.target.value)}
                className="mt-2 w-full border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan sm:px-4 sm:py-3"
                placeholder="Discord username"
              />
            </div>

            <div>
              <label
                htmlFor="client-avatar-style"
                className="text-sm font-semibold text-gray-200"
              >
                Avatar <span className="text-gray-500">optional</span>
              </label>
              <select
                id="client-avatar-style"
                name="avatarStyle"
                value={avatarStyle}
                onChange={(event) => setAvatarStyle(event.target.value)}
                className="mt-2 w-full border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition focus:border-neon-cyan sm:px-4 sm:py-3"
              >
                <option value="">Choose avatar style</option>
                {AVATAR_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="client-favorite-map"
              className="text-sm font-semibold text-gray-200"
            >
              Favorite map <span className="text-gray-500">optional</span>
            </label>
            <select
              id="client-favorite-map"
              name="favoriteMap"
              value={favoriteMap}
              onChange={(event) => setFavoriteMap(event.target.value)}
              className="mt-2 w-full border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition focus:border-neon-cyan sm:px-4 sm:py-3"
            >
              <option value="">Choose a map</option>
              {FAVORITE_MAPS.map((map) => (
                <option key={map} value={map}>
                  {map}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_0.7fr]">
            <div>
              <label
                htmlFor="client-image"
                className="text-sm font-semibold text-gray-200"
              >
                Image to send NLDEVS <span className="text-gray-500">optional</span>
              </label>
              <input
                id="client-image"
                name="image"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                className="mt-2 w-full border border-edge bg-ink-800 px-3 py-2.5 text-sm text-gray-300 outline-none transition file:mr-3 file:border-0 file:bg-neon-cyan file:px-3 file:py-1.5 file:font-bold file:text-ink focus:border-neon-cyan sm:px-4 sm:py-3"
              />
            </div>

            <div>
              <label
                htmlFor="client-image-purpose"
                className="text-sm font-semibold text-gray-200"
              >
                Type <span className="text-gray-500">optional</span>
              </label>
              <select
                id="client-image-purpose"
                name="imagePurpose"
                value={imagePurpose}
                onChange={(event) => setImagePurpose(event.target.value)}
                className="mt-2 w-full border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition focus:border-neon-cyan sm:px-4 sm:py-3"
              >
                <option value="">Choose type</option>
                {IMAGE_PURPOSES.map((purpose) => (
                  <option key={purpose} value={purpose}>
                    {purpose}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="client-message"
              className="text-sm font-semibold text-gray-200"
            >
              Message to NLDEVS <span className="text-gray-500">optional</span>
            </label>
            <textarea
              id="client-message"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={600}
              rows={2}
              className="mt-2 w-full resize-none border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan sm:px-4 sm:py-3"
              placeholder="Ideas, feedback, playtest interest, or anything you want to send."
            />
          </div>

          <label className="flex items-start gap-3 border border-edge bg-ink-800/60 p-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={contactConsent}
              onChange={(event) => setContactConsent(event.target.checked)}
              className="mt-1 h-4 w-4 accent-neon-cyan"
            />
            <span>NLDEVS can contact me about maps, updates, or playtests.</span>
          </label>

          <label className="flex items-start gap-3 border border-edge bg-ink-800/60 p-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={ageAttestation}
              onChange={(event) => setAgeAttestation(event.target.checked)}
              required
              className="mt-1 h-4 w-4 accent-neon-cyan"
            />
            <span>
              I am 13 or older. If I am under 18, I have permission from a
              parent or guardian to share this information with NLDEVS.
            </span>
          </label>
            </div>
          </details>

          <details className="border border-edge bg-ink-800/40 p-3">
            <summary className="cursor-pointer text-sm font-semibold text-neon-cyan">
              Developer / creator info
            </summary>

            <div className="mt-4 space-y-3 sm:space-y-4">
              <label className="flex items-start gap-3 border border-edge bg-ink-800/60 p-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={developerInterest}
                  onChange={(event) => setDeveloperInterest(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-neon-cyan"
                />
                <span>I&apos;m a developer or creator interested in future work with NLDEVS.</span>
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="client-developer-role"
                    className="text-sm font-semibold text-gray-200"
                  >
                    Role <span className="text-gray-500">optional</span>
                  </label>
                  <select
                    id="client-developer-role"
                    name="developerRole"
                    value={developerRole}
                    onChange={(event) => setDeveloperRole(event.target.value)}
                    className="mt-2 w-full border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition focus:border-neon-cyan sm:px-4 sm:py-3"
                  >
                    <option value="">Choose role</option>
                    {DEVELOPER_ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="client-developer-availability"
                    className="text-sm font-semibold text-gray-200"
                  >
                    Availability <span className="text-gray-500">optional</span>
                  </label>
                  <select
                    id="client-developer-availability"
                    name="developerAvailability"
                    value={developerAvailability}
                    onChange={(event) => setDeveloperAvailability(event.target.value)}
                    className="mt-2 w-full border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition focus:border-neon-cyan sm:px-4 sm:py-3"
                  >
                    <option value="">Choose availability</option>
                    {DEVELOPER_AVAILABILITY.map((availability) => (
                      <option key={availability} value={availability}>
                        {availability}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="client-developer-portfolio"
                  className="text-sm font-semibold text-gray-200"
                >
                  Portfolio / profile <span className="text-gray-500">optional</span>
                </label>
                <input
                  id="client-developer-portfolio"
                  name="developerPortfolio"
                  type="url"
                  inputMode="url"
                  value={developerPortfolio}
                  onChange={(event) => setDeveloperPortfolio(event.target.value)}
                  className="mt-2 w-full border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan sm:px-4 sm:py-3"
                  placeholder="Website, ArtStation, GitHub, Fortnite page"
                />
              </div>

              <div>
                <label
                  htmlFor="client-developer-skills"
                  className="text-sm font-semibold text-gray-200"
                >
                  Skills / tools <span className="text-gray-500">optional</span>
                </label>
                <textarea
                  id="client-developer-skills"
                  name="developerSkills"
                  value={developerSkills}
                  onChange={(event) => setDeveloperSkills(event.target.value)}
                  maxLength={500}
                  rows={2}
                  className="mt-2 w-full resize-none border border-edge bg-ink-800 px-3 py-2.5 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan sm:px-4 sm:py-3"
                  placeholder="UEFN, Verse, Blender, Unreal, level design, QA..."
                />
              </div>
            </div>
          </details>

          <button
            type="submit"
            disabled={submitting}
            className="clip-corner-sm w-full border border-neon-cyan bg-neon-cyan px-5 py-3 font-black uppercase tracking-wide text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
          >
            {submitting ? "Saving" : saved ? "Save changes" : "Join NLDEVS"}
          </button>

        </form>
        </details>

        {error && (
          <p className="mt-3 text-center text-sm font-semibold text-red-300">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
