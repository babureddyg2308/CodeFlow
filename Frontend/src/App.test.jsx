 import { render, screen } from '@testing-library/react';
import Room from './Room';

test('renders learn react link', () => {
  render(<Room />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
