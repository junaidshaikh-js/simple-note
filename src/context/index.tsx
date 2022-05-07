import { AuthContextProvider, useAuth } from "./authContext";
import { childrenType } from "./context.type";

const Provider = ({ children }: { children: childrenType }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export { Provider, useAuth };
