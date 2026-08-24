describe("Home page", () => {
  it("renders the positioning shell and placeholder evidence sections", async () => {
    const { default: Page } = await import("./page");

    const { render, screen } = await import("@testing-library/react");

    render(<Page />);

    expect(
      screen.getByRole("heading", {
        name: /a resume can't show how i actually think through a hard technical problem/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /proof points/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/editorial notice/i).length).toBeGreaterThan(0);
    expect(
      screen.queryByText(/senior software engineer/i),
    ).not.toBeInTheDocument();
  });
});
