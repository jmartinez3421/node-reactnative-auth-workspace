export type ResponseType<T extends object> =
    | {
          data: T;
      }
    | {
          msg: string;
      };
