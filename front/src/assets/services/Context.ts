import { createContext } from "react";

export type ContextTypeProps =
  | {
      baseUrl: string;
      token?: string;
      setToken: (arg?: string) => void;
      logout: () => void;
    }
  | Record<string, never>;

const Context = createContext<ContextTypeProps>({});

export default Context;
