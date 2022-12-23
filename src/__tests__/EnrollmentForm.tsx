import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer, SetupServerApi } from "msw/node";
import { rest } from "msw";
import EnrollmentForm from "../components/form/EnrollmentForm";

// using Mock Service Worker library to declaratively mock API communication
// https://mswjs.io/docs/getting-started/
const createServer = (
  status: number,
  json: { message: string } | string
): SetupServerApi =>
  setupServer(
    rest.post(
      process.env.REACT_APP_BACKEND_ADDRESS as string,
      (req, res, ctx) => res(ctx.status(status), ctx.json(json))
    )
  );

class ResizeObserverMock {
  // https://eslint.org/docs/latest/rules/class-methods-use-this
  // eslint-disable-next-line class-methods-use-this
  disconnect(): void {
    /**
     * This method is an intentionally-blank override.
     * It resolves "ResizeObserver is not defined" error when running Jest
     * see https://github.com/ZeeCoder/use-resize-observer/issues/40
     * */
  }

  // eslint-disable-next-line class-methods-use-this
  observe(): void {
    /**
     * This method is an intentionally-blank override.
     * It resolves "ResizeObserver is not defined" error when running Jest
     * see https://github.com/ZeeCoder/use-resize-observer/issues/40
     * */
  }

  // eslint-disable-next-line class-methods-use-this
  unobserve(): void {
    /**
     * This method is an intentionally-blank override.
     * It resolves "ResizeObserver is not defined" error when running Jest
     * see https://github.com/ZeeCoder/use-resize-observer/issues/40
     * */
  }
}
window.ResizeObserver = ResizeObserverMock;

const nextPage = async (): Promise<void> => {
  await userEvent.click(
    screen.getByRole("button", {
      name: /próximo/i,
    })
  );
};

const fillPage1 = async (): Promise<void> => {
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

const fillMandatoryAndSubmit = async (): Promise<void> => {
  await fillPage1(); // mandatory fields
  await nextPage(); // page 2
  await nextPage(); // page 3
  const checkboxes = screen.getAllByText("Li e concordo");
  checkboxes.forEach(async (checkbox) => {
    await userEvent.click(checkbox);
  });
  await userEvent.click(
    screen.getByRole("button", {
      name: /enviar/i,
    })
  );
};

const submitToServer = async (
  server: SetupServerApi,
  expected: RegExp
): Promise<void> => {
  server.listen();
  render(<EnrollmentForm />);
  await fillMandatoryAndSubmit();
  const message = await screen.findByText(expected);
  expect(message).toBeInTheDocument();
  server.close();
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
    // not in the document
    messages.forEach((message) => {
      expect(screen.queryByText(message)).toBeNull();
    });
    // try submit form
    await userEvent.click(nextBtn);
    // alerts shows
    messages.forEach((message) => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });
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

  it("fills mandatory fields and submit for the first time", async () => {
    await submitToServer(
      createServer(201, { message: "enrolled" }),
      /inscrição confirmada!/i
    );
  });

  it("fills mandatory fields and submit for the second time", async () => {
    await submitToServer(
      createServer(409, { message: "waiting" }),
      /Opa! Já tínhamos uma inscrição sua./i
    );
  });

  it("handles wrong message from 201 response", async () => {
    await submitToServer(
      createServer(201, "enrolled"),
      /Não conseguimos fazer sua inscrição/i
    );
  });

  it("handles wrong message from 409 response", async () => {
    await submitToServer(
      createServer(409, "waiting"),
      /Não conseguimos fazer sua inscrição/i
    );
  });

  it("handles not json response", async () => {
    await submitToServer(
      setupServer(
        rest.post(
          process.env.REACT_APP_BACKEND_ADDRESS as string,
          (req, res, ctx) => res(ctx.status(200), ctx.text("not json"))
        )
      ),
      /Não conseguimos fazer sua inscrição/i
    );
  });
});

describe("The 'Anterior' button", () => {
  it("moves from page 2, back to page 1", async () => {
    render(<EnrollmentForm />);
    await fillPage1();
    // move from page 1 to page 2
    await nextPage();
    // get button and move back to page 1
    await userEvent.click(
      screen.getByRole("button", {
        name: /anterior/i,
      })
    );
    // there is no 'Anterior' button in the first page
    const button = screen.queryByRole("button", {
      name: /anterior/i,
    });
    expect(button).not.toBeInTheDocument();
  });
});
