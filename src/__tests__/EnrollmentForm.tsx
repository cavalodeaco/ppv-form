import { render, screen } from "@testing-library/react";
import EnrollmentForm from "../components/EnrollmentForm";

describe("The EnrollmentForm component", () => {
  it("asks for the full name", () => {
    render(<EnrollmentForm />);
    const fullNameTextBox = screen.getByRole('textbox', {
      name: /nome completo/i
    });
    expect(fullNameTextBox).toBeInTheDocument();
  })
});