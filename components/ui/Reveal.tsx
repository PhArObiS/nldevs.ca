"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer } from "@/utils/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this element animates in. */
  delay?: number;
  /** Render as a <section> etc. instead of a <div>. */
  as?: "div" | "section" | "li" | "article";
};

/**
 * Fades content up the first time it scrolls into view.
 *
 * `once: true` means the animation never replays on scroll-back — repeated
 * motion on every pass is distracting and makes long pages feel unstable.
 * The global `prefers-reduced-motion` rule in globals.css collapses the
 * transition duration, so this is inert for users who opt out.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      // js-reveal is the hook for the <noscript> fallback in app/layout.tsx:
      // without JS these never animate, so they would stay at opacity 0.
      className={`js-reveal${className ? ` ${className}` : ""}`}
      variants={fadeUp(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "section" | "ul";
};

/**
 * Wraps a set of <RevealItem> children so they animate in one after another.
 * Children must use RevealItem (not Reveal) to inherit the stagger timing.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: RevealGroupProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={`js-reveal${className ? ` ${className}` : ""}`}
      variants={staggerContainer(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={`js-reveal${className ? ` ${className}` : ""}`}
      variants={fadeUp(0)}
    >
      {children}
    </MotionTag>
  );
}
