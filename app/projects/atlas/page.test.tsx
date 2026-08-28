describe("Atlas Project Page", () => {
  it("explains the problem and preserves the incomplete evidence boundary", async () => {
    const { default: Page } = await import("./page");
    const { render, screen } = await import("@testing-library/react");

    render(<Page />);

    expect(screen.getByRole("heading", { name: "Atlas" })).toBeInTheDocument();
    expect(screen.getByLabelText("Project status: Planned")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Problem framing" })).toBeInTheDocument();
    expect(screen.getByText(/not yet a Case Study/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to projects" })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.queryByRole("link", { name: "Visit project" })).not.toBeInTheDocument();
  });
});
