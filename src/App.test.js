import { render, screen } from '@testing-library/react';
import App from './App';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.reject(new Error('API not available')))
}));

describe('App Component', () => {
  test('renders IELTS Study Schedule heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/IELTS Study Schedule/i);
    expect(headingElement).toBeInTheDocument();
  });
});
