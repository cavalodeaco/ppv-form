import { render, screen } from "@testing-library/react";
import { HeaderResponsive } from "../components/HeaderResponsive";
import userEvent from "@testing-library/user-event";

const getLinks = () => ({
  sobre: screen.getByRole("link", {
    name: /sobre/i,
  }),
  lrmc: screen.getByRole("link", {
    name: /lrmc/i,
  }),
  inscrevase: screen.getByRole("link", {
    name: /inscreva-se/i,
  }),
});

describe("The responsive header", () => {
  it('starts with "Inscreva-se" button active', () => {
    render(<HeaderResponsive />);
    const { sobre, lrmc, inscrevase } = getLinks();
    expect(sobre.classList).toEqual(lrmc.classList);
    expect(sobre.classList).not.toEqual(inscrevase.classList);
    expect(document.URL).not.toMatch('/#sobre');
  });
  
  it('allows to set "sobre" button to active', async () => {
    render(<HeaderResponsive />);
    const { sobre, lrmc, inscrevase } = getLinks();
    await userEvent.click(sobre);
    expect(inscrevase.classList).toEqual(lrmc.classList);
    expect(inscrevase.classList).not.toEqual(sobre.classList);
    expect(document.URL).toMatch('/#sobre');
  });

});
