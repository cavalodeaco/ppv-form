import { render, screen } from "@testing-library/react";
import EnrollmentForm from "../components/EnrollmentForm";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from 'msw'

// using Mock Service Worker library to declaratively mock API communication
// https://mswjs.io/docs/getting-started/
const server = setupServer(
  rest.post(process.env.REACT_APP_BACKEND_ADDRESS as string, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: "enrolled" }));
  })
);

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

// solves "ResizeObserver is not defined" error when running Jest"
// https://github.com/ZeeCoder/use-resize-observer/issues/40
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

const nextPage = async () => {
  await userEvent.click(
    screen.getByRole("button", {
      name: /próximo/i,
    })
  );
};

const fillPage1 = async () => {
  await userEvent.type(
    screen.getByRole("textbox", {
      name: /nome completo/i,
    }),
    "Jackson Teller"
  );
  await userEvent.type(
    screen.getByRole("textbox", {
      name: /celular\/whatsapp/i,
    }),
    "(99) 99999-9999"
  );
  await userEvent.type(
    screen.getByRole("textbox", {
      name: /número da cnh/i,
    }),
    "00123456789"
  );
};

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
      "O campo nome é obrigatório",
      "Informe um número de celular",
      "Informe o número da sua CNH",
    ];
    const nextBtn = screen.getByRole("button", {
      name: /próximo/i,
    });
    expect(screen.queryAllByRole("alert").length).toBe(0);
    await userEvent.click(nextBtn);
    const alerts = screen.queryAllByRole("alert");
    expect(alerts.length).toBe(3);
    const alertsTexts = alerts.map((alert) => alert.innerHTML);
    for (const message of messages) {
      expect(alertsTexts).toContainEqual(message);
    }
  });
});

describe("Mandatory fields form submission", () => {
  it("moves from page 1 to page 2", async () => {
    render(<EnrollmentForm />);
    await fillPage1();
    await userEvent.click(
      screen.getByRole("button", {
        name: /próximo/i,
      })
    );
    expect(
      screen.getByRole("textbox", {
        name: /e-mail/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("searchbox", {
        name: /uso da motocicleta/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: /marca/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: /modelo/i,
      })
    ).toBeInTheDocument();
  });

  it("moves from page 2 to page 3", async () => {
    render(<EnrollmentForm />);
    await fillPage1();
    // move from page 1 to page 2
    await nextPage();
    // move from page  to page 3
    await nextPage();
    expect(screen.getAllByText(/termo de autorização/i).length).toBeGreaterThan(
      0
    );
    expect(
      screen.getAllByText(/termo de responsabilidade/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/termo de consentimento/i).length
    ).toBeGreaterThan(0);
  });

  it("fills mandatory fields and submit", async () => {
    render(<EnrollmentForm />);
    await fillPage1(); // mandatory fields
    await nextPage(); // page 2
    await nextPage(); // page 3
    const checkboxes = screen.getAllByText("Li e concordo");
    for (const checkbox of checkboxes) {
      await userEvent.click(checkbox);
    }
    await userEvent.click(
      screen.getByRole("button", {
        name: /enviar/i,
      })
    );
    const message = await screen.findByText(/inscrição confirmada!/i);
    expect(message).toBeInTheDocument();
  });
});
