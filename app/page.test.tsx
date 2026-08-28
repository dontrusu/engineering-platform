describe("Home page", () => {
  it("renders truthful positioning, project navigation, and editorial sections", async () => {
    const { default: Page } = await import("./page");

    const { render, screen } = await import("@testing-library/react");

    render(<Page />);

    expect(screen.getByRole("heading", { name: "Denys Shybkovskyy" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Engineering work, made inspectable." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What I am building" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View all projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getAllByText("Planned")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "A truthful record is still being assembled." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Contact actions will appear when verified." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Project Page" })).toHaveAttribute("href", "/projects/atlas");
    expect(screen.queryByRole("link", { name: "Pulse" })).not.toBeInTheDocument();
  });
});
