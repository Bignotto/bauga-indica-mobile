export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly origin: string;

  constructor(message: string, statusCode = 400, origin: string) {
    this.statusCode = statusCode;
    this.origin = origin;

    if (message === "form_identifier_exists")
      //not working
      this.message = "Endereço de e-mail já está em uso.";
    else if (message === "form_password_length_too_short")
      this.message = "Senha precisa ter pelo menos 8 caracteres.";
    else if (message === "User already registered")
      this.message = "Já existe uma conta para este endereço de e-mail.";
    else if (
      message === "A user with this email address has already been registered"
    )
      this.message = "Este endereço de e-mail já está em uso.";
    else this.message = message;
  }
}
