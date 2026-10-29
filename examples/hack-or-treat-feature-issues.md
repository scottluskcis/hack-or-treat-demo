# Hack or Treat: Feature Issue Content

## How to use this document

Copy each issue's title and body into GitHub. Labels, dependencies, and suggested timing are planning metadata; create labels before applying them.

These issues assume the working Next.js starter described in `hack-or-treat-starter-app-plan.md`: fictional event cards, tested browser-storage plumbing, no authentication or external services, and no save controls yet.

For a 30–45-minute session, demonstrate Issue A and use Issue B as the student exercise if time allows. Issue C is an alternative independent exercise. Issues D and E are optional follow-up work, not workshop prerequisites.

GitHub template repositories do not copy issues into generated repositories. Give students these bodies so they can create an issue in their own repository.

## Issue A — Save and remove events from my itinerary

**Suggested labels:** `enhancement`, `workshop-demo`  
**Dependency:** Working starter app and persistence hook  
**Role:** Main instructor demonstration

### Issue body

#### Goal

As a student browsing Hack or Treat events, I want to save interesting events and remove them later so I can plan my day.

Saving is a personal bookmark, not registration or a seat reservation.

#### Scope

Add save/remove interactions to the existing event browser using its prepared browser-storage hook. Follow the existing components, styling, and test conventions.

#### Acceptance criteria

- [ ] Every unsaved event has a keyboard-operable “Save event” button.
- [ ] Every saved event shows a visible “Saved” status and a “Remove from itinerary” button.
- [ ] Controls have accessible names that identify the event as well as the action.
- [ ] Saving leaves the event visible and does not duplicate its saved ID.
- [ ] Removing a saved event returns it to the unsaved state.
- [ ] Saving or removing one event does not affect another event.
- [ ] Saved selections survive a refresh when browser storage is available.
- [ ] Save controls are unavailable until saved state has loaded.
- [ ] Existing storage error notices remain visible when persistence fails.
- [ ] Focused interaction tests cover saving, removing, and event isolation; existing checks still pass.

#### Out of scope

Accounts, cloud synchronization, registration, a separate itinerary page, filtering, and new dependencies.

#### Verification

Save the first event, confirm the second stays unsaved, refresh, and confirm the first remains saved. Remove it and refresh again. Check keyboard interaction and run the documented tests and checks.

#### Copilot starting prompt

> Read this issue and inspect the relevant event components and storage hook. Explain the existing data flow and propose the smallest implementation plan. Do not edit files yet. Identify how you will test each behavior.

---

## Issue B — Show how many events are in my itinerary

**Suggested labels:** `enhancement`, `good first issue`, `workshop-exercise`  
**Dependency:** Issue A  
**Suggested exercise time:** 10–15 minutes

### Issue body

#### Goal

As a student, I want to see how many events I have saved so I can understand my itinerary at a glance.

#### Acceptance criteria

- [ ] Show the saved-event count near the event browser heading.
- [ ] Use “No events saved” for zero, “1 event saved” for one, and “N events saved” for larger counts.
- [ ] While saved state loads, show an honest loading state rather than an incorrect zero count.
- [ ] Saving and removing events updates the count immediately.
- [ ] The count is derived from existing saved state; it is not maintained as a second independent state value.
- [ ] The count remains correct after a refresh when browser storage is available.
- [ ] Tests cover zero, one, multiple saved events, and updates after interactions.
- [ ] Existing checks pass.

#### Out of scope

A new page, category filtering, authentication, or changes to the persistence format.

#### Verification

Start with no saved events, save two different events, and remove one. Confirm the labels at each step.

#### Copilot starting prompt

> Help me implement this issue using the existing saved-event state. First explain where the count should be derived and suggest tests. Keep the implementation small and do not add dependencies.

---

## Issue C — Filter events by category

**Suggested labels:** `enhancement`, `good first issue`, `workshop-exercise`  
**Dependency:** Working starter app; does not require Issues A or B  
**Role:** Alternative exercise or independent follow-up

### Issue body

#### Goal

As a student, I want to filter the schedule by category so I can find activities that interest me.

#### Acceptance criteria

- [ ] Provide a visibly labeled, keyboard-operable category selector.
- [ ] “All categories” is selected by default and displays every event.
- [ ] Category choices come from the existing event data without duplicates.
- [ ] Selecting a category displays only events in that category.
- [ ] Returning to “All categories” restores every event in its original order.
- [ ] If save/remove is implemented, filtering does not change saved selections, including selections hidden by the filter.
- [ ] Tests cover the default view, a selected category, and restoring all events.
- [ ] Existing checks pass.

#### Out of scope

Search, multiple simultaneous filters, URL synchronization, persistence of filter selection, and new dependencies.

#### Verification

Choose “Workshop,” confirm only workshop events remain, then restore all categories. If itinerary controls exist, save an event before filtering and confirm its saved status afterward.

#### Copilot starting prompt

> Inspect the event dataset and browser. Propose a simple category filter using a native form control and derived event data. Do not edit files yet, and do not introduce a filtering library.

---

## Issue D — Show only my saved events

**Suggested labels:** `enhancement`, `stretch`  
**Dependency:** Issue A  
**Role:** After-workshop feature

### Issue body

#### Goal

As a student, I want to switch between all events and my saved events so I can review my itinerary.

#### Acceptance criteria

- [ ] Provide an accessible, clearly labeled “Saved events only” toggle.
- [ ] The default view shows all events.
- [ ] With the toggle enabled, show only saved events.
- [ ] Removing an event while viewing saved events immediately removes its card from that view.
- [ ] If no saved events match, show a helpful empty state and an obvious way to return to all events.
- [ ] If category filtering exists, both filters apply together and can produce an empty result.
- [ ] If the saved count exists, it continues to count all saved events, not just visible events.
- [ ] Filtering does not modify stored selections.
- [ ] Tests cover switching views, removing the final visible event, and the empty state.
- [ ] Existing checks pass.

#### Out of scope

A new route, calendar export, sorting, accounts, and cloud synchronization.

#### Verification

Save two events, switch to saved-only, remove both, and confirm the empty state. Return to all events and confirm the catalog is unchanged.

---

## Issue E — Propose a cross-device itinerary architecture

**Suggested labels:** `planning`, `stretch`  
**Dependency:** Familiarity with the completed local itinerary feature  
**Role:** Optional bridge to Clerk and Supabase; planning only

### Issue body

#### Goal

Our browser-only itinerary does not follow students between devices. Before adding infrastructure, evaluate how authenticated, cross-device saving should work.

#### Deliverable

A short design proposal, not an implementation or cloud-resource deployment.

#### Acceptance criteria

- [ ] Describe the user need and the limitations of the current browser-only approach.
- [ ] Evaluate Clerk for authentication and Supabase for persistent itinerary data.
- [ ] Describe the identity integration and server-side authorization boundary; never trust a user ID supplied by the browser alone.
- [ ] Explain how users will be prevented from reading or changing another user's saved events.
- [ ] Explain what happens to existing browser-saved selections when a user signs in.
- [ ] Consider duplicates, failed requests, signed-out behavior, and account deletion.
- [ ] Identify configuration, credential handling, costs, and test requirements.
- [ ] Cite current official Clerk and Supabase documentation for the proposed integration.
- [ ] Break the proposal into small implementation issues with explicit dependencies.

#### Out of scope

Installing SDKs, creating cloud accounts or resources, storing credentials, and changing the current application.

#### Copilot starting prompt

> Review the current local itinerary design and this issue. Draft a concise architecture proposal for cross-device saves using Clerk and Supabase. Verify integration details against current official documentation and state uncertainties. Do not edit the application or provision resources.