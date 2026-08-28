describe("Projects index", () => {
  it("lists all projects and links only the approved Atlas Project Page", async () => {
    const { default: Page } = await import("./page");
    const { render, screen } = await import("@testing-library/react");

    render(<Page />);

    expect(screen.getByRole("heading", { name: "Project index" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "View Project Page" })).toHaveAttribute(
      "href",
      "/projects/atlas",
    );
    expect(screen.getAllByText("Planned")).toHaveLength(3);
    expect(screen.queryByRole("link", { name: /pulse/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /composite/i })).not.toBeInTheDocument();
  });
});
