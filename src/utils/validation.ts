export const validateUsername = (value: string): string | null => {
  if (!value || value.trim().length === 0) {
    return 'Username is required';
  }
  if (value.trim().length < 3) {
    return 'Username must be at least 3 characters';
  }
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (!value || value.trim().length === 0) {
    return 'Password is required';
  }
  if (value.trim().length < 3) {
    return 'Password must be at least 3 characters';
  }
  return null;
};
