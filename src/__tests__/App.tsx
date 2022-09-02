import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";

describe("The App component", () => {
  test("renders header text", () => {
    render(<App />);
    const headerText = screen.getByRole('heading', { name: /pilotando para vida/i })
    expect(headerText).toBeInTheDocument();
  });
});
