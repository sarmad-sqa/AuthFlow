import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
});

test('check if submit button is present', () => {
  render(<App />);
  // "Submit" button dhoond raha hai
  const buttonElement = screen.getByText(/submit/i); 
  expect(buttonElement).toBeInTheDocument();
});

test('opens the login page, toggles password visibility, and returns to signup', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('link', { name: /log in/i }));

  expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  expect(screen.getByLabelText('Email Address:')).toBeRequired();

  const passwordInput = screen.getByLabelText('Password:');
  expect(passwordInput).toHaveAttribute('type', 'password');

  fireEvent.click(screen.getByRole('button', { name: 'Show password' }));
  expect(passwordInput).toHaveAttribute('type', 'text');
  expect(screen.getByRole('button', { name: 'Hide password' })).toHaveAttribute(
    'aria-pressed',
    'true'
  );

  fireEvent.click(screen.getByRole('link', { name: /sign up/i }));
  expect(screen.getByRole('heading', { name: 'Signup Form' })).toBeInTheDocument();
});

test('posts signup data and clears fields only after successful registration', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    status: 201,
    json: jest.fn().mockResolvedValue({ message: 'Signup successful! User created.' })
  });

  render(<App />);

  const termsCheckbox = screen.getByRole('checkbox', {
    name: /accept our terms and conditions/i
  });
  expect(termsCheckbox).toBeRequired();
  expect(screen.queryByRole('button', { name: /clear|reset form/i })).not.toBeInTheDocument();

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
  fireEvent.click(screen.getByRole('button', { name: /^submit$/i }));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
    });
  });

  await screen.findByRole('status');
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

test.each([
  [400, 'All fields are required'],
  [409, 'Email already registered'],
  [500, 'Unable to create user']
])('displays the backend error for HTTP %i without clearing form data', async (status, message) => {
  global.fetch = jest.fn().mockResolvedValue({
    status,
    json: jest.fn().mockResolvedValue({ message })
  });

  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
    target: { value: 'Test User' }
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
    target: { value: 'test@example.com' }
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
    target: { value: 'password123' }
  });
  const termsCheckbox = screen.getByRole('checkbox', {
    name: /accept our terms and conditions/i
  });
  fireEvent.click(termsCheckbox);
  fireEvent.click(screen.getByRole('button', { name: /^submit$/i }));

  expect(await screen.findByRole('alert')).toHaveTextContent(message);
  expect(screen.getByPlaceholderText('Enter your username')).toHaveValue('Test User');
  expect(screen.getByPlaceholderText('Enter your email address')).toHaveValue('test@example.com');
  expect(screen.getByPlaceholderText('Enter your password')).toHaveValue('password123');
  expect(termsCheckbox).toBeChecked();
});