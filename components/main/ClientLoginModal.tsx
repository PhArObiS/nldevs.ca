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
  imageData?: string;
  imagePurpose?: string;
  contactConsent: boolean;
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fortniteName, setFortniteName] = useState("");
  const [discordName, setDiscordName] = useState("");
  const [avatarStyle, setAvatarStyle] = useState("");
  const [favoriteMap, setFavoriteMap] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePurpose, setImagePurpose] = useState("");
  const [contactConsent, setContactConsent] = useState(false);
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const hasProfile = window.localStorage.getItem(STORAGE_KEY);
    const dismissed = window.sessionStorage.getItem(DISMISSED_KEY);

    if (!hasProfile && !dismissed) {
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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
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
        imageData,
        imagePurpose: imagePurpose || undefined,
        contactConsent,
        savedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/player-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error("Unable to save right now.");
      }

      const { imageData: _imageData, ...storedProfile } = profile;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedProfile));
      setSaved(true);
      window.setTimeout(() => setOpen(false), 700);
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
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-login-title"
    >
      <div className="clip-corner relative max-h-[calc(100vh-3rem)] w-full max-w-xl overflow-y-auto border border-neon-cyan/40 bg-ink/95 p-6 shadow-[0_0_48px_rgba(34,211,238,0.18)]">
        <button
          type="button"
          onClick={closeForSession}
          className="clip-corner-sm absolute right-4 top-4 border border-edge-bright bg-ink-800/80 px-3 py-1.5 text-sm font-semibold text-gray-300 transition hover:border-neon-cyan hover:text-white"
          aria-label="Close client login"
        >
          Skip
        </button>

        <div className="flex items-center gap-3 pr-16">
          <Image
            src="/NavLogo.png"
            alt=""
            aria-hidden="true"
            width={42}
            height={42}
            priority
          />
          <div>
            <p className="eyebrow">Player Access</p>
            <h2 id="client-login-title" className="mt-1 text-2xl font-black text-white">
              Join NLDEVS
            </h2>
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
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
              className="mt-2 w-full border border-edge bg-ink-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
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
              className="mt-2 w-full border border-edge bg-ink-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
              placeholder="you@example.com"
            />
          </div>

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
              className="mt-2 w-full border border-edge bg-ink-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
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
                className="mt-2 w-full border border-edge bg-ink-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
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
                className="mt-2 w-full border border-edge bg-ink-800 px-4 py-3 text-white outline-none transition focus:border-neon-cyan"
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
              className="mt-2 w-full border border-edge bg-ink-800 px-4 py-3 text-white outline-none transition focus:border-neon-cyan"
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
                className="mt-2 w-full border border-edge bg-ink-800 px-4 py-3 text-sm text-gray-300 outline-none transition file:mr-3 file:border-0 file:bg-neon-cyan file:px-3 file:py-1.5 file:font-bold file:text-ink focus:border-neon-cyan"
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
                className="mt-2 w-full border border-edge bg-ink-800 px-4 py-3 text-white outline-none transition focus:border-neon-cyan"
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
              rows={3}
              className="mt-2 w-full resize-none border border-edge bg-ink-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-neon-cyan"
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

          <button
            type="submit"
            disabled={submitting}
            className="clip-corner-sm w-full border border-neon-cyan bg-neon-cyan px-5 py-3 font-black uppercase tracking-wide text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
          >
            {saved ? "Saved" : submitting ? "Saving" : "Continue"}
          </button>

          {error && (
            <p className="text-center text-sm font-semibold text-red-300">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
