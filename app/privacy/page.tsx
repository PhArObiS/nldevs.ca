import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How NLDEVS collects and uses member information for updates, playtests, support, and collaboration opportunities.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "What We Collect",
    items: [
      "Name and email address when you join or check in as a member.",
      "Optional player details such as Fortnite name, Discord username, favorite map, avatar preference, messages, and submitted images.",
      "Optional developer or creator details such as role, availability, portfolio link, and skills.",
      "A required confirmation that the member is 13 or older and has parent or guardian permission if under 18.",
      "Basic technical details such as source page and browser information to help us understand where signups come from and troubleshoot issues.",
    ],
  },
  {
    title: "How We Use It",
    items: [
      "To recognize returning members.",
      "To respond to messages, bug reports, map ideas, and collaboration interest.",
      "To invite interested members to playtests, map updates, or NLDEVS opportunities.",
      "To improve the website, maps, and member experience.",
    ],
  },
  {
    title: "How We Protect It",
    items: [
      "Member submissions are handled through a server route so secret database keys are not exposed in browser code.",
      "Database access is restricted with Supabase Row Level Security and server-side credentials.",
      "We do not sell member information.",
      "We limit the information we ask for and keep optional fields optional.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main id="top" className="mx-auto w-full max-w-4xl px-6 py-14">
      <section className="relative">
        <div
          className="pointer-events-none absolute -top-24 left-0 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.16) 0%, rgba(3,0,20,0) 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <p className="eyebrow">NLDEVS</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Privacy
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-400">
            We use member information to run NLDEVS, support players, organize
            playtests, and find future collaborators. We keep it practical,
            limited, and never sell it.
          </p>
        </div>
      </section>

      <div className="mt-12 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-bold text-white">{section.title}</h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 leading-relaxed text-gray-400">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h2 className="text-2xl font-bold text-white">Emails</h2>
          <p className="mt-4 leading-relaxed text-gray-400">
            If you join NLDEVS, we may send a short confirmation email. We only
            use your contact consent for future updates, playtests, or map news.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">Delete Or Update Info</h2>
          <p className="mt-4 leading-relaxed text-gray-400">
            To update or delete your member info, email{" "}
            <a
              href="mailto:nldevsmtl@gmail.com"
              className="text-neon-cyan underline underline-offset-4 transition hover:text-white"
            >
              nldevsmtl@gmail.com
            </a>
            . Use the same email address you joined with so we can find the
            right record.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">Third-Party Services</h2>
          <p className="mt-4 leading-relaxed text-gray-400">
            NLDEVS uses trusted services such as Supabase for member data and
            Resend for email delivery. Those services process data only as
            needed to provide the site features.
          </p>
        </section>

        <div className="border-t border-white/10 pt-6">
          <Link
            href="/"
            className="clip-corner-sm inline-flex border border-neon-cyan bg-neon-cyan px-5 py-3 font-black uppercase tracking-wide text-ink transition hover:bg-white"
          >
            Back to NLDEVS
          </Link>
        </div>
      </div>
    </main>
  );
}
