import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from "./App";

test('renders todo', () => {
  render(<App />);
  const element = screen.getByText(/todo/i);
  expect(element).toBeInTheDocument();
});
