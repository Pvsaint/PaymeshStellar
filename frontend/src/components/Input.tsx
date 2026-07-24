import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input field type — controls keyboard, validation, and browser behaviour */
  type?: 'text' | 'email' | 'password' | 'number';
  /** Visible label rendered above the input and linked via htmlFor */
  label?: string;
  /** Unique id used to associate the label and input for accessibility */
  id?: string;
  /** Validation error message displayed below the input in red */
  error?: string;
  /** Optional hint or guidance rendered below the input when there is no error */
  helpText?: string;
  /** Additional CSS classes applied to the outermost wrapper */
  className?: string;
}

/**
 * Input — a reusable, accessible form input component for the PaymeshStellar
 * frontend. Supports text, email, password, and number types, with optional
 * label, error, and help-text slots, styled with Tailwind CSS.
 *
 * Usage:
 * ```tsx
 * <Input
 *   id="wallet-address"
 *   label="Wallet Address"
 *   type="text"
 *   placeholder="G…"
 *   helpText="Your Stellar public key."
 *   error={errors.walletAddress}
 * />
 * ```
 */
export default function Input({
  type = 'text',
  label,
  id,
  error,
  helpText,
  className = '',
  disabled,
  ...props
}: InputProps) {
  // Derive a stable id from the label when none is provided, so the
  // label's htmlFor always resolves to a matching input id.
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const baseInput = [
    'block w-full rounded-lg border px-3 py-2 text-sm outline-none',
    'transition-colors duration-150',
    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
    'bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-50',
    'focus:ring-2 focus:ring-offset-0',
  ].join(' ');

  const stateClasses = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-300 dark:border-red-500 dark:focus:ring-red-700'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-700';

  const disabledClasses = disabled
    ? 'cursor-not-allowed opacity-50 bg-gray-100 dark:bg-gray-800'
    : '';

  // Derive unique ids for aria-describedby so screen readers announce the
  // error or help text alongside the input.
  const errorId = inputId ? `${inputId}-error` : undefined;
  const helpId = inputId ? `${inputId}-help` : undefined;
  const describedBy = error ? errorId : helpText ? helpId : undefined;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${baseInput} ${stateClasses} ${disabledClasses}`}
        {...props}
      />

      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {!error && helpText && (
        <p id={helpId} className="text-xs text-gray-500 dark:text-gray-400">
          {helpText}
        </p>
      )}
    </div>
  );
}
