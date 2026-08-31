describe("Home page", () => {
  it("renders truthful positioning, project navigation, and editorial sections", async () => {
    const { default: Page } = await import("./page");

    const { render, screen } = await import("@testing-library/react");

    render(<Page />);

    expect(screen.getByText("Denys Shybkovskyy")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Frontend Engineer" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "What I am building" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View all projects" }),
    ).toHaveAttribute("href", "/projects");
    expect(screen.getAllByText("Planned")).toHaveLength(3);
    expect(
      screen.getByRole("heading", {
        name: "A truthful record is still being assembled.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Contact actions will appear when verified.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View Project Page" }),
    ).toHaveAttribute("href", "/projects/atlas");
    expect(
      screen.queryByRole("link", { name: "Pulse" }),
    ).not.toBeInTheDocument();
  });

  it("presents the evidence-first About composition", async () => {
    const { default: Page } = await import("./page");

    const { render, within } = await import("@testing-library/react");

    const about = render(<Page />);
    const aboutScreen = within(about.container);

    expect(
      aboutScreen.getByText(
        /A CV can tell you I know React, TypeScript, or Vue/,
      ),
    ).toBeInTheDocument();
    expect(
      aboutScreen.getByRole("heading", { name: "What this site is" }),
    ).toBeInTheDocument();
    expect(
      aboutScreen.getByText(/The stack changes — the fundamentals don't/),
    ).toBeInTheDocument();
    expect(
      aboutScreen.getByText(
        /Engineering Lab = Projects \+ documented decisions \+ Evidence/,
      ),
    ).toBeInTheDocument();
    expect(aboutScreen.queryByText("6+")).not.toBeInTheDocument();
    expect(aboutScreen.queryByText("40+")).not.toBeInTheDocument();
  });
});
