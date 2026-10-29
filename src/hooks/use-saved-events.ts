"use client";

import { useCallback, useEffect, useState } from "react";

import { events } from "@/data/events";

export const SAVED_EVENTS_STORAGE_KEY = "hack-or-treat:saved-events:v1";

export type SavedEventsError =
  | "malformed"
  | "unavailable"
  | "write-failed";

const validEventIds = new Set(events.map((event) => event.id));

function normalizeEventIds(value: unknown): string[] {
  if (!Array.isArray(value)) {
    throw new TypeError("Saved events must be a list.");
  }

  const ids = new Set<string>();
  for (const item of value) {
    if (typeof item !== "string") {
      throw new TypeError("Saved event IDs must be strings.");
    }
    if (validEventIds.has(item)) {
      ids.add(item);
    }
  }
  return [...ids];
}

export function useSavedEvents() {
  const [savedEventIds, setSavedEventIdsState] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<SavedEventsError | null>(null);

  useEffect(() => {
    let nextSavedEventIds: string[] = [];
    let initialError: SavedEventsError | null = null;

    try {
      const raw = window.localStorage.getItem(SAVED_EVENTS_STORAGE_KEY);
      if (raw !== null) {
        try {
          nextSavedEventIds = normalizeEventIds(JSON.parse(raw));
        } catch {
          initialError = "malformed";
        }
      }
    } catch {
      initialError = "unavailable";
    }

    let isMounted = true;
    queueMicrotask(() => {
      if (isMounted) {
        setSavedEventIdsState(nextSavedEventIds);
        setError(initialError);
        setIsReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const updateSavedEventIds = useCallback(
    (nextIds: string[]) => {
      if (!isReady) {
        return;
      }

      const normalizedIds = [...new Set(nextIds.filter((id) => validEventIds.has(id)))];
      setSavedEventIdsState(normalizedIds);
      try {
        window.localStorage.setItem(
          SAVED_EVENTS_STORAGE_KEY,
          JSON.stringify(normalizedIds),
        );
        setError(null);
      } catch {
        setError("write-failed");
      }
    },
    [isReady],
  );

  return { savedEventIds, updateSavedEventIds, isReady, error };
}
