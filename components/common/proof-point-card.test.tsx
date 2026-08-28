import { render, screen } from "@testing-library/react";

import { ProofPointCard } from "./proof-point-card";

describe("ProofPointCard", () => {
  it("renders proof point copy with accessible card semantics", () => {
    render(
      <ProofPointCard
        eyebrow="Proof point"
        body="Editorial notice: the proof point copy is intentionally deferred until it can be backed by approved evidence."
      />,
    );

    expect(screen.getByText("Proof point")).toBeInTheDocument();
    expect(
      screen.getByText(
        /editorial notice: the proof point copy is intentionally deferred until it can be backed by approved evidence/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("article")).toBeInTheDocument();
  });
});
