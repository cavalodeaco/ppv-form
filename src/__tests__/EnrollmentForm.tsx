import { render, screen } from "@testing-library/react";
import EnrollmentForm from "../components/EnrollmentForm";
import userEvent from "@testing-library/user-event";

describe("The EnrollmentForm component - page 1", () => {
  it("asks for the full name", () => {
    render(<EnrollmentForm />);
    const fullNameTextBox = screen.getByRole("textbox", {
      name: /nome completo/i,
    });
    expect(fullNameTextBox).toBeInTheDocument();
  });

  it("alerts empty full name, WhatsApp and CNH", async () => {
    render(<EnrollmentForm />);
    const messages = [
      'O campo nome é obrigatório',
      'Informe um número de celular',
      'Informe o número da sua CNH',
    ];
    const nextBtn = screen.getByRole("button", {
      name: /próximo/i,
    });
    expect(screen.queryAllByRole('alert').length).toBe(0);
    await userEvent.click(nextBtn);
    const alerts = screen.queryAllByRole('alert');
    expect(alerts.length).toBe(3);
    const alertsTexts = alerts.map((alert) => alert.innerHTML)
    for (const message of messages) {
      expect(alertsTexts).toContainEqual(message);
    }
  });
});
