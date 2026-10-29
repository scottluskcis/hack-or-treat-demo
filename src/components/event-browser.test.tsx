import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EventBrowser } from "@/components/event-browser";

describe("EventBrowser", () => {
  it("shows the fictional notice and all twelve event cards", () => {
    render(<EventBrowser />);

    expect(screen.getByRole("img", { name: "Hack or Treat" })).toBeInTheDocument();
    expect(
      screen.getByText("Fictional sample schedule — not an actual campus event listing."),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Halloween plans? We’ve got the lineup.",
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(12);
  });
});
