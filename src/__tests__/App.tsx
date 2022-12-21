import { render, screen, within } from '@testing-library/react';
import App from '../components/App';

describe('The App component', () => {
  it('renders PPV logo', () => {
    render(<App />);
    const main = screen.getByRole('main');
    const logo = within(main).getByRole('img', {
      name: /pilotando para vida/i,
    });
    expect(logo).toBeInTheDocument();
  });
});
