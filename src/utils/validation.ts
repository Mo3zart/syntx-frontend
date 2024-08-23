// src/utils/validation.ts

export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Please enter a valid email address.';
};

export const validateUsername = (username: string): string | null => {
    return username.length >= 3 ? null : 'Username must be at least 3 characters long.';
};

export const validatePassword = (password: string): {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    error: string | null;
} => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*-]/.test(password);

    let error: string | null = null;
    if (!minLength) {
        error = `Password must be at least 8 characters long.`;
    } else if (!hasUppercase) {
        error = 'Password must contain at least one uppercase letter.';
    } else if (!hasLowercase) {
        error = 'Password must contain at least one lowercase letter.';
    } else if (!hasNumber) {
        error = 'Password must contain at least one number.';
    } else if (!hasSpecialChar) {
        error = 'Password must contain at least one special character (!@#$%^&*-).';
    }

    return { minLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar, error };
};
