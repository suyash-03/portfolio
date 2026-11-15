import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div className={props.className}>{children}</div>,
    h1: ({ children }) => <h1>{children}</h1>,
  },
  useReducedMotion: () => true,
}));

test('shows the current résumé and lets visitors switch project categories', () => {
  render(<App />);

  expect(screen.getByRole('heading', { level: 1, name: /suyash singh/i })).toBeInTheDocument();
  expect(screen.getByText(/100K\+ system telemetry events per day/i)).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /résumé/i })[0]).toHaveAttribute('href', expect.stringContaining('drive.google.com/file/d/1k3hBRM9GzNaaKSWFixiYYKq5Ft4h1ITu'));

  fireEvent.click(screen.getByRole('tab', { name: 'Independent' }));
  expect(screen.getByRole('heading', { name: 'FmCUI' })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Independent' })).toHaveAttribute('aria-selected', 'true');
});
