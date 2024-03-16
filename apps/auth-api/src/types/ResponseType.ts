export type ResponseType<T extends object> =
    | {
          ok: true;
          data: T;
      }
    | {
          ok: false;
          msg: string;
      }
    | {
          ok: false;
          msg: string;
          errors: string[];
      };

export enum ErrorCodes {
    InvalidEmail = "InvalidEmail",
    EmailRequired = "EmailRequired",
    InvalidPassword = "InvalidPassword",
    PasswordRequired = "PasswordRequired",
    NameRequired = "NameRequired",
    TokenRequired = "TokenRequired",
    EmailAlreadyExists = "EmailAlreadyExists",
    NoTokenProvided = "NoTokenProvided",
    UserNotFound = "UserNotFound",
    InactiveUser = "InactiveUser",
    InvalidToken = "InvalidToken",
    InvalidResetToken = "InvalidResetToken",
    InternalError = "InternalError",
}
