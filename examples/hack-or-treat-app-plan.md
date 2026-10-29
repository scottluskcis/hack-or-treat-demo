# Hack or Treat: Starter App and Template Repository Plan

## Background and decisions

Hack or Treat is a university workshop held on Halloween day. Students may be new to GitHub and Copilot. The organizers want practical software engineering experience that students can reuse in their projects, with interest in web applications, GitHub workflows, AI agents, Azure, and DevOps.

The presenter typically uses Next.js, Clerk, and Supabase. For this workshop, the agreed scope is:

- **Next.js only, with browser storage and no external services.**
- **30–45 minutes for the demo and student exercises, excluding introductory slides.**
- A template repository with a working starting point, not an empty project.
- Feature issues that support requirements, planning, implementation, testing, and pull request review.
- Tailwind CSS and shadcn/ui for styling and components, with pnpm as the only package manager.
- Local development and an optional GitHub Codespaces path using a committed devcontainer configuration.
- Working GitHub Actions CI so students can see automated quality checks within the SDLC.

This document is a proposed implementation plan, not an existing application. Companion issue content is in `hack-or-treat-feature-issues.md`. The earlier task tracker slide plan and walkthrough remain unchanged; adapt them to this event app before presenting.

## Product concept

**Discover fictional campus Halloween events and build your personal itinerary.**

Event cards show a title, time, location, category, and short description. During the workshop, students add the ability to save and remove events.

Saving an event is a personal bookmark, **not registration or a seat reservation**.

### Why this is a real example

The application models a common event discovery workflow with structured data, interactive state, persistence, accessibility, and tests. The Halloween theme supplies engaging sample content without changing the engineering fundamentals.

### Why not Clerk and Supabase yet?

| Choice | Benefit | Tradeoff |
|---|---|---|
| Static fictional event data | Everyone starts with the same working app; no backend setup. | No live event management. |
| Browser-saved itinerary | Demonstrates persistence without credentials or accounts. | Data stays in that browser and can be cleared. |
| No authentication | Keeps attention on the feature and development workflow. | No cross-device identity or synchronization. |

Clerk and Supabase are sensible next steps when the product needs shared event management or cross-device itineraries. They are not necessary to demonstrate the core workflow.

## Recommended stack

- Next.js App Router with TypeScript.
- pnpm with a committed `pnpm-lock.yaml` and an exact version recorded in the `package.json` `packageManager` field.
- Tailwind CSS and shadcn/ui, installing only components used by the starter.
- Vitest, React Testing Library, and user-event for focused interaction tests.
- ESLint, TypeScript checks, and a production build.
- GitHub Actions to run lint, type checks, tests, and a production build.
- A single `.devcontainer/devcontainer.json` for optional Codespaces development.

Choose supported versions when implementing, record the required Node version, and use consistent Node and pnpm versions locally, in Codespaces, and in CI. Do not commit npm or Yarn lockfiles, introduce state libraries, or create a custom API for static data.

## Starter-template guardrails: keep it simple

**Apply YAGNI: You Aren't Gonna Need It.** Build only what the starter and planned workshop features require.

- Every file, dependency, and configuration should have a clear current purpose.
- Use shadcn/ui for actual UI needs, not as a reason to generate a full component catalog. Start with Card and Badge where used; add Button when implementing save/remove.
- Keep Tailwind styling readable and reuse the small set of existing theme tokens.
- Do not add authentication scaffolding, backend clients, unused environment examples, analytics, or speculative extension points.
- Avoid barrel files, wrapper components, generic service layers, and abstractions for a single use.
- Remove scaffold demo assets and boilerplate that are no longer used.
- Keep documentation short and actionable; do not generate overlapping guides, architecture essays, or placeholder TODO files.
- Do not add custom Dockerfiles, Docker Compose, databases, or extra containers when a standard Node development image is sufficient.
- Prefer a few clear scripts and one CI job over an elaborate pipeline.

The goal is a starter students can understand and extend, not a production platform or a showcase of every available tool.

## What ships in the starter versus workshop work

| Surface | Working starter | Added during the workshop |
|---|---|---|
| Event catalog | Six fictional events rendered as cards | No catalog infrastructure changes |
| Theme | Responsive orange/purple styling with readable contrast | Optional polish only |
| Event data | Typed local dataset with stable IDs | No external API |
| Persistence | Small tested browser-storage hook for saved event IDs | Connect save/remove interactions |
| Save controls | Not present | Accessible save/remove buttons and status |
| Saved count | Not present | Student exercise |
| Category filter | Not present | Alternative independent exercise |
| Quality checks | Passing baseline tests and CI | Feature-specific tests |
| Development environment | Local setup plus optional Codespaces devcontainer | No environment configuration exercise |

Prebuild the storage mechanics because server rendering and browser storage are not the teaching goal. Keep the hook small and readable, with its behavior explained in the README. Do not prebuild the feature's buttons or leave nonfunctional controls in the interface.

## Example event dataset

Use October 31 sample events labeled as fictional, not an actual campus schedule.

| ID | Title | Time | Location | Category |
|---|---|---|---|---|
| haunted-hackathon | Haunted Hackathon | 10:00–12:00 | Innovation Lab | Workshop |
| pumpkin-api-lab | Pumpkin API Lab | 12:30–13:30 | Computing Lab | Workshop |
| costume-contest | Campus Costume Contest | 14:00–15:00 | Student Center | Social |
| spooky-design | Spooky Design Studio | 15:30–16:30 | Makerspace | Workshop |
| trick-or-treat-social | Trick-or-Treat Social | 17:00–18:00 | Campus Quad | Social |
| midnight-movie | Not-Quite-Midnight Movie | 19:00–21:00 | Campus Theater | Entertainment |

Each event should have a short description. Display times as campus-local strings for this single-day sample; avoid adding timezone conversion to the workshop.

## Suggested small project structure

```text
.devcontainer/
  devcontainer.json
.github/
  workflows/
    ci.yml
  copilot-instructions.md
  PULL_REQUEST_TEMPLATE.md
README.md
package.json
pnpm-lock.yaml
components.json
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    event-browser.tsx
    event-card.tsx
    ui/
      card.tsx
      badge.tsx
  lib/
    utils.ts
  data/
    events.ts
  hooks/
    use-saved-events.ts
  types/
    event.ts
```

Colocate tests with the modules they cover. The tree highlights the intended structure, not every framework or test configuration file. Keep only the shadcn/ui components and generated utilities actually used; `components.json` records the shadcn configuration. Keep the page server-rendered where appropriate and put interactive behavior in a focused client component.

Avoid generic repository layers, provider trees, state machines, reusable design systems, and placeholder Clerk/Supabase integrations.

## Persistence contract to implement before the workshop

The hook should expose saved event IDs, an update function, readiness, and any storage error. Its exact names can follow the implementation.

- Store only stable event IDs under an app-specific key such as `hack-or-treat:saved-events:v1`.
- Read browser storage after mounting; do not access `window` during server rendering.
- Do not overwrite existing saved data with the initial empty state before loading finishes.
- Validate stored data and deduplicate IDs; ignore IDs not in the current event catalog.
- If stored data is malformed, notify the user that saved selections could not be loaded rather than silently claiming success.
- If storage is unavailable or a write fails, keep the current session usable and show that changes may not survive a refresh.
- Expose a readiness state so future save controls do not accept clicks before initialization.
- Test normal loading, empty storage, malformed data, and unavailable storage.

Scope out cross-tab synchronization, cloud sync, and persistence of event definitions.

## Build sequence

### 1. Scaffold and establish the baseline

- Create the Next.js application with TypeScript, Tailwind CSS, and pnpm.
- Initialize shadcn/ui using its supported setup and add only components used by the initial event browser.
- Set up package scripts for development, tests, lint, type checking, and build, using the command contract below.
- Document the actual commands, Node requirement, and pnpm installation method.
- Confirm the app runs without an account, environment file, or external service.

### 2. Build the event browser

- Add the typed fictional dataset.
- Render event cards with all essential information.
- Add semantic headings, visible keyboard focus, and responsive styling.
- Label the schedule as fictional.
- Avoid externally hosted assets or runtime font downloads where practical.

### 3. Prepare persistence and tests

- Implement the small storage hook and its documented contract.
- Display storage notices through the app's existing UI.
- Add baseline rendering and persistence tests.
- Keep save controls, counts, and filters out of the starter.

### 4. Prepare collaboration surfaces

- Add a short README, Copilot repository instructions, and a pull request template.
- Commit the devcontainer configuration and verify the Codespaces setup below.
- Configure the GitHub Actions workflow with the documented checks below.
- Make the repository a GitHub template.
- Tag a known-good starting state, such as `workshop-starter`.
- Keep an instructor solution in a separate branch for recovery.

### 5. Rehearse the exact workshop

- Generate a fresh repository from the template and follow both the local and Codespaces README paths.
- Work through the main issue using Copilot.
- Confirm the feature can be implemented and reviewed within the time budget.
- Confirm students can complete one small exercise without backend setup.
- Record recovery steps and actual run/test commands.

## Development commands

Implement these scripts and use them consistently in the README and CI:

| Command | Purpose |
|---|---|
| `pnpm install --frozen-lockfile` | Install exactly the committed dependency set. |
| `pnpm dev` | Start the development server. |
| `pnpm test` | Run tests once and exit with a failing status if tests fail. |
| `pnpm test:watch` | Optional watch mode for local development. |
| `pnpm lint` | Run ESLint. |
| `pnpm typecheck` | Check TypeScript without emitting application output. |
| `pnpm build` | Create a production build. |

Do not rely on `next build` to run lint or all other checks implicitly. Use the same explicit checks locally and in CI.

## Optional Codespaces environment

Commit one `.devcontainer/devcontainer.json` that:

- Uses a maintained Node development container image aligned with the chosen Node version.
- Makes the pinned pnpm version available through a supported, rehearsed setup method.
- Runs `pnpm install --frozen-lockfile` after container creation, after pnpm is available.
- Forwards port 3000 with a clear application label and a private preview by default.
- Includes the VS Code extensions needed for Copilot and Tailwind development, without a large extension bundle.
- Does not embed credentials or require Clerk, Supabase, Azure, or an environment file.

Let students start the app explicitly with `pnpm dev`; avoid hidden server startup automation. If required for forwarded-port access, document the command to bind the development server to `0.0.0.0`.

Verify a fresh Codespace actually installs dependencies, starts the app, exposes a working preview, and runs the checks. Confirm Copilot sign-in separately: installing an extension does not grant Copilot access.

Explain that Codespaces requires a GitHub account and is subject to account allowances and billing rules. Do not promise unlimited free usage. Tell students how to stop a Codespace when finished and that retained Codespaces may still consume storage allowance.

## GitHub Actions CI

Commit `.github/workflows/ci.yml` as a working part of the starter, not an exercise students must complete before feature work.

### Workflow requirements

- Run on pull requests, pushes to the default branch, and manual dispatch.
- Use one clearly named job on a supported Ubuntu runner with read-only repository permissions.
- Check out the repository and install the pinned pnpm and selected Node versions using maintained actions.
- Enable pnpm dependency-store caching keyed by the committed lockfile.
- Install with `pnpm install --frozen-lockfile`.
- Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` as separate named steps.
- Fail the job when a required check fails; do not use `continue-on-error` or silently skip tests.
- Use a reasonable timeout and cancel superseded runs on the same branch or pull request.
- Require no secrets, external services, cloud resources, deployment step, or browser-test matrix.

Use current supported action versions when implementing. The cache is an optimization, not a substitute for installation. Pinning package versions and the lockfile keeps the workflow reproducible without adding a release pipeline.

### Teaching connection to the SDLC

Show a feature branch, a pull request, its Actions run, and the actual test/build results. Explain that CI automatically checks changes before integration; it does not prove every requirement is met or deploy the app by itself.

Rehearse one intentional failing test and its fix on an instructor practice branch. Keep the published starter green. Branch protection can require the check where supported and configured, but it is not a prerequisite for using the template.

## Beginner-friendly README

Create a real, concise `README.md` in the template repository. Put the two startup paths near the top and use copyable commands with no unresolved placeholders.

### Recommended order

1. **What is Hack or Treat?** One paragraph, fictional schedule notice, and a note that saving is not registration.
2. **Choose how to run it.** Local development or GitHub Codespaces; students need only one path.
3. **Run locally.** Required Node/pnpm versions, a verified pnpm setup method, then use the template, clone the new repository, install dependencies, run `pnpm dev`, and open `http://localhost:3000`. Explain where to run commands and how to stop the server.
4. **Run in Codespaces.** Generate a repository from the template, open its Code → Codespaces menu, create a Codespace, wait for setup, run `pnpm dev`, and open the forwarded port preview. Explain how to stop the Codespace and link to current usage/billing documentation.
5. **Run checks.** The short command table above and where to find Actions results on a pull request.
6. **Find your way around.** A few paths for event data, event cards, and the storage hook.
7. **Workshop features.** What already works, what the issues add, and how to copy issue content.
8. **Limitations and help.** Browser-only saving, no cloud sync, Copilot access/setup links, and a short troubleshooting section.

### Keep instructions approachable

- Explain “template” and “terminal” briefly instead of assuming prior experience.
- Clarify that “Use this template” creates a student's own repository; it is not the same as cloning the instructor's repository.
- Keep prerequisites out of the Codespaces path when they are handled by the container.
- Explain that Copilot is helpful but optional for running and editing the application.
- Limit troubleshooting to common setup failures: unsupported Node/pnpm versions, port 3000 already in use, incomplete dependency installation, and Codespaces setup failures. Show how to find the actual error rather than masking it with reset commands.
- Explain that browser storage is tied to the browser origin: local and Codespaces previews do not share saved selections.
- Do not require students to read several other documents just to start the app.

Template-generated repositories do not automatically copy the template's issues. Keep issue bodies in repository documentation, or have students copy a supplied issue. Test failures in the starter should not be used as hidden assignments.

Copilot instructions should be brief: follow existing Next.js/Tailwind/shadcn patterns, use pnpm only, apply YAGNI, avoid new dependencies and unrelated changes, keep accessibility, run checks, and explicitly report failures.

## Suggested 30–45-minute session

| Segment | Time |
|---|---|
| Show the working baseline and feature issue | 4 minutes |
| Ask Copilot to explain the code and propose a plan | 5 minutes |
| Implement save/remove with an agent | 8 minutes |
| Inspect the diff, run tests, and check browser behavior | 7 minutes |
| Commit and open a pull request | 4 minutes |
| Student exercise and short debrief | Up to 15 minutes |

For a 30-minute slot, make the student exercise a take-home issue. For 45 minutes, use the saved-count issue. Category filtering is an alternative, not another required feature.

## Definition of ready for the workshop

- A fresh template copy runs using only the documented prerequisites and commands.
- Both README startup paths have been followed successfully from a clean local checkout and a fresh Codespace.
- The devcontainer installs the correct tools, forwards a working application preview, and requires no secrets.
- No Clerk, Supabase, Azure, payment details, or environment secrets are required.
- Fictional events display correctly on laptop and narrow screens.
- Baseline tests, lint, type checks, and build pass.
- GitHub Actions runs the same checks successfully on a real pull request.
- Only pnpm is used, its lockfile is committed, and versions are consistent across environments.
- Tailwind and the small set of included shadcn/ui components are actually used; unused boilerplate is removed.
- Storage behavior and error notices meet the contract.
- Save/remove, count, and filtering are not already implemented.
- A completed instructor branch is available and clearly distinguished from the starter.
- Issue bodies are accessible even when students generate new repositories.

## After the workshop

Introduce Clerk, Supabase, or Azure only as separate product milestones. Decide the new requirement first: shared catalog, authenticated users, cross-device saves, or hosting. Do not add infrastructure merely to make the starter appear more production-like.