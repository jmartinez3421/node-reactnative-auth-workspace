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
