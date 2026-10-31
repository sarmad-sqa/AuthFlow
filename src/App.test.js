import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('requires acceptance of the terms and displays a submission toast', () => {
  render(<App />);

  const termsCheckbox = screen.getByRole('checkbox', {
    name: /accept our terms and conditions/i
  });
  expect(termsCheckbox).toBeRequired();
  expect(screen.queryByText(/clear|reset form/i)).not.toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
    target: { value: 'Test User' }
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
    target: { value: 'test@example.com' }
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
    target: { value: 'password123' }
  });
  fireEvent.click(termsCheckbox);
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByRole('status')).toHaveTextContent(
    'Signup submitted successfully!'
  );
  expect(screen.getByRole('status')).toHaveStyle({
    position: 'fixed',
    bottom: '20px',
    right: '20px'
  });
  expect(screen.getByPlaceholderText('Enter your username')).toHaveValue('');
  expect(screen.getByPlaceholderText('Enter your email address')).toHaveValue('');
  expect(screen.getByPlaceholderText('Enter your password')).toHaveValue('');
  expect(termsCheckbox).not.toBeChecked();
});