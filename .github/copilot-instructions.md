# Copilot instructions for Hack or Treat

A small Next.js workshop starter that lists fictional campus Halloween events and lets students save them to a personal itinerary in browser storage. Keep code simple enough for beginners to read.

## Guardrails

- Use **pnpm only**. Never use npm or yarn.
- Apply **YAGNI**: build only what the request needs. No new dependencies, abstractions, or unrelated refactors without a clear reason.
- No backend: no API routes, auth, database, or environment variables. Event data lives in `src/data/events.ts`.
- Saving an event is a personal bookmark, **not** registration. Word it that way.

## Next.js and React

- Components are Server Components by default. Add `"use client"` only to the smallest component that needs state, events, or browser APIs.
- Only access `localStorage` after mount. Reuse `useSavedEvents()`, disable save controls until `isReady`, and show its `error` to the user.
- Derive values from existing state instead of storing copies. Do not add context providers or state libraries.

## Styling

- Use Tailwind utility classes and the existing orange/violet palette. Merge classes with `cn()` from `@/lib/utils`.
- Use shadcn/ui for UI primitives. Add new ones with `pnpm dlx shadcn@latest add <component>`, and only when they are used.
- Use `lucide-react` for icons, with `aria-hidden="true"` on decorative ones.

## Accessibility and testing

- Buttons need an accessible name that includes the event title (for example, "Save Haunted Hackathon"). Toggles use `aria-pressed`.
- Write Vitest and React Testing Library tests that query by role and accessible name. Add tests for every behavior change.

## Before finishing

Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. Report any failures. Do not hide them.
