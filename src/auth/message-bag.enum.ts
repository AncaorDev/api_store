export enum MessageBag {
  //  Error Responses
  NO_VALID_SESSION = 'Tu sesión no es válida.',
  NO_VALID_OR_EXPIRATION_SESSION = 'Tu sesión no es válida o ha expirado.',
  INSUFFICENT_PERMISSIONS = 'No tienes permisos suficientes para realizar esta acción.',

  //  Validation Responses
  INVALID_CREDENTIALS = 'Usuario o contraseña incorrecta.',
  INVALID_PASSWORD = 'Contraseña inválida.',
  INVALID_MAIL = 'Correo inválido.',

  ACCOUNT_DISABLED = 'Cuenta deshabilitada.',
  MAIL_ALREADY_SENT = 'Ya se envió un correo. Revisa tu bandeja de entrada o spam.',
}
