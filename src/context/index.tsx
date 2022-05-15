import { AuthContextProvider, useAuth } from "./authContext";
import { DataContextProvider, useData } from "./data-context";

import { childrenType } from "./context.type";

const Provider = ({ children }: { children: childrenType }) => {
  return (
    <AuthContextProvider>
      <DataContextProvider>{children}</DataContextProvider>
    </AuthContextProvider>
  );
};

export { Provider, useAuth, useData };
