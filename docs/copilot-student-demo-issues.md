# Student Demo Feature Issues

Publication status: reviewed drafts; issue links will be recorded after creation. Only bookmarks is implemented during the live demonstration. The other issues are follow-up exercises or a backup. No implementation is included in this document.

## Save and Remove Personal Event Bookmarks

### User Story

As a student browsing the fictional campus schedule, I want to bookmark events so I can return to my choices after refreshing the page. Saving is a personal bookmark in this browser, not registration or a reservation.

### Acceptance Criteria

- [ ] Each event has a keyboard-operable save/remove toggle. Its accessible name includes the event title, for example, "Save Haunted Hackathon" or "Remove Haunted Hackathon from saved events".
- [ ] Saved events are visually distinguishable; toggles expose their state with `aria-pressed`.
- [ ] Save controls are disabled until stored bookmarks have loaded.
- [ ] Saving two different events keeps both saved; removing one leaves the other saved.
- [ ] Reloading on the same origin restores saved choices when browser storage is working.
- [ ] Storage errors produce readable feedback. A failed write explains that choices may not survive reload; it does not claim durable saving succeeded.
- [ ] Existing event details and all twelve events remain available.
- [ ] UI tests cover readiness, saving/removing multiple events, restored bookmarks after remount, and storage-error feedback, using roles and accessible names.

### Implementation Guidance

Reuse [useSavedEvents](../src/hooks/use-saved-events.ts) with one shared client owner. Pass state and handlers to cards rather than creating an independent hook instance per card. Keep the static header outside the interactive boundary where practical. Derive values from existing state.

Start with [EventBrowser](../src/components/event-browser.tsx), [EventCard](../src/components/event-card.tsx), and the [existing UI tests](../src/components/event-browser.test.tsx). Follow [repository instructions](../.github/copilot-instructions.md): pnpm only, existing styling, accessible controls, and no unnecessary dependencies.

### Out of Scope

No saved-only view, category filter, accounts, registration, backend, cross-device or cross-tab synchronization, new dependencies, or storage-hook rewrite.

### Verification

Run the focused UI and hook tests, then `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. In the browser, save two events, reload, remove one, and reload again. Verify keyboard activation and visible focus. Use automated tests for storage failures. Report failed or unrun checks.

Dependency: none. This is the live demonstration issue.

## Switch Between All Events and Saved Events

### User Story

As a student with bookmarked events, I want to see only my saved choices so I can quickly find my personal itinerary.

### Acceptance Criteria

- [ ] Provide clearly labeled "All events" and "Saved events" views; start on All events.
- [ ] Show the saved count, derived from shared bookmark state.
- [ ] The saved view shows only bookmarked events, retaining their original order.
- [ ] Removing an event in the saved view immediately updates the list and count.
- [ ] Once storage is ready, an empty saved view says "No saved events yet" and offers a way back to All events.
- [ ] While storage is loading, do not misleadingly show the empty-bookmarks state.
- [ ] View selection works with a keyboard and exposes selected state through appropriate control semantics.
- [ ] Existing save controls, persistence, and storage-error feedback continue to work.
- [ ] Role/name-based UI tests cover view switching, the count, removing the last saved event, and the empty state after readiness.

### Implementation Guidance

Build on bookmarking's shared hook owner. Store only the selected view; derive the saved count and displayed events from event data and bookmark IDs. Keep error feedback visible even when the list is empty. Follow the repository's existing styling and testing conventions.

### Out of Scope

No separate page, URL parameters, persistence of view selection, sorting, calendar export, category filtering, backend, or new dependencies. Bookmarks are not registration.

### Verification

Save two events, switch to Saved events, remove one, remove the last, and return to All events. Reload to verify bookmarks restore; selected view need not persist. Add focused UI tests, then run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.

Dependency: complete Save and Remove Personal Event Bookmarks first. The published issue will link to it.

## Filter Events by Category

### User Story

As a student exploring the schedule, I want to filter events by category so I can find activities that interest me.

### Acceptance Criteria

- [ ] Provide an accessible category selector with "All categories", "Workshop", "Social", and "Entertainment".
- [ ] Start on All categories and display all twelve events.
- [ ] Selecting a category shows only matching events in their original order; returning to All categories restores the complete list.
- [ ] Selection is keyboard-operable, visibly identifiable, and has an accessible label.
- [ ] Filtering never removes bookmarks or changes saved state, if bookmarking is present.
- [ ] If the saved-only view is present, category selection applies within it. No matching saved events produces an empty state and a way to clear the category filter; distinguish this from having no bookmarks.
- [ ] Role/name-based UI tests cover selection and resetting. When saved-only functionality is present, also cover the combined empty state and unchanged bookmarks.

### Implementation Guidance

Use the existing [EventCategory type](../src/types/event.ts) and [event data](../src/data/events.ts). Keep selection in local UI state and derive the visible list. Prefer a simple labeled native select unless a suitable primitive already exists. This feature must work independently of the bookmark issues.

### Out of Scope

No free-text search, multi-select categories, URL parameters, persisted preferences, changes to event data, backend, or new dependencies.

### Verification

Select each category and confirm every visible event matches. Restore all categories and confirm all twelve events return. If bookmarks exist, save an event, filter it out, and clear the filter to confirm it remains saved. Add focused UI tests, then run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.

Dependency: none. Preserve any already-implemented bookmarking or saved-view behavior without adding another bookmark-state owner.