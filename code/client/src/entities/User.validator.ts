interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

export class UserValidator {
  static validateEmail(email: string): boolean {
    const emailPattern = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
    return emailPattern.test(email);
  }

  static validatePassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /\d/;
    const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/;
    const isValidLength = password.length >= 8;

    if (
      !hasUpperCase.test(password) ||
      !hasLowerCase.test(password) ||
      !hasNumbers.test(password) ||
      !hasSpecialCharacters.test(password) ||
      !isValidLength
    ) {
      return false;
    }

    return true;
  }

  static validateSignInData({ email, password }: SignInData): ValidationResult {
    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return {
        isValid: false,
        error: "Email не должен быть пустым",
      };
    }

    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0
    ) {
      return {
        isValid: false,
        error: "Пароль не должен быть пустым",
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }

  static validateSignUpData({
    username,
    email,
    password,
  }: SignUpData): ValidationResult {
    if (
      !username ||
      typeof username !== "string" ||
      username.trim().length === 0
    ) {
      return {
        isValid: false,
        error: "поле username не должно быть пустым",
      };
    }

    if (
      !email ||
      typeof email !== "string" ||
      email.trim().length === 0 ||
      !this.validateEmail(email)
    ) {
      return {
        isValid: false,
        error: "email должен быть валидным",
      };
    }

    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0 ||
      !this.validatePassword(password)
    ) {
      return {
        isValid: false,
        error:
          "Пароль не должен быть пустым, должен содержать одну большую букву, одну маленькую, один специальный символ, и не должен быть короче 8 символов",
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }
}
