import { act, renderHook, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { events } from "@/data/events";
import {
  SAVED_EVENTS_STORAGE_KEY,
  useSavedEvents,
} from "@/hooks/use-saved-events";

describe("useSavedEvents", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("loads known IDs, drops unknown IDs, and deduplicates saved data", async () => {
    window.localStorage.setItem(
      SAVED_EVENTS_STORAGE_KEY,
      JSON.stringify([events[0].id, events[0].id, "not-an-event"]),
    );

    const { result } = renderHook(() => useSavedEvents());

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.savedEventIds).toEqual([events[0].id]);
    expect(result.current.error).toBeNull();
  });

  it("starts ready with an empty list when storage is empty", async () => {
    const { result } = renderHook(() => useSavedEvents());

    expect(result.current.isReady).toBe(false);
    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.savedEventIds).toEqual([]);
  });

  it("renders on the server without accessing browser storage", () => {
    function ServerStatus() {
      const { isReady } = useSavedEvents();
      return <span>{String(isReady)}</span>;
    }

    expect(renderToString(<ServerStatus />)).toContain("<span>false</span>");
  });

  it("does not accept or persist updates before storage initialization", async () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    const { result } = renderHook(() => useSavedEvents());

    act(() => result.current.updateSavedEventIds([events[0].id]));

    expect(result.current.savedEventIds).toEqual([]);
    expect(setItem).not.toHaveBeenCalled();
    await waitFor(() => expect(result.current.isReady).toBe(true));
  });

  it("reports malformed stored data without claiming it loaded", async () => {
    window.localStorage.setItem(SAVED_EVENTS_STORAGE_KEY, "{bad json");
    const { result } = renderHook(() => useSavedEvents());

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.savedEventIds).toEqual([]);
    expect(result.current.error).toBe("malformed");
  });

  it("reports unavailable storage and still becomes ready", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Storage is blocked", "SecurityError");
    });
    const { result } = renderHook(() => useSavedEvents());

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.error).toBe("unavailable");
  });

  it("keeps the session usable and reports failed writes", async () => {
    const { result } = renderHook(() => useSavedEvents());
    await waitFor(() => expect(result.current.isReady).toBe(true));
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage is full", "QuotaExceededError");
    });

    act(() => result.current.updateSavedEventIds([events[1].id]));

    expect(result.current.savedEventIds).toEqual([events[1].id]);
    expect(result.current.error).toBe("write-failed");
  });

  it("persists updates and removes duplicate or unknown IDs", async () => {
    const { result } = renderHook(() => useSavedEvents());
    await waitFor(() => expect(result.current.isReady).toBe(true));

    act(() =>
      result.current.updateSavedEventIds([
        events[1].id,
        events[1].id,
        "not-an-event",
      ]),
    );

    expect(result.current.savedEventIds).toEqual([events[1].id]);
    expect(window.localStorage.getItem(SAVED_EVENTS_STORAGE_KEY)).toBe(
      JSON.stringify([events[1].id]),
    );
    expect(result.current.error).toBeNull();
  });
});
