import { FC, ReactElement, createContext } from "react";
import { AuthProvider } from "./AuthProvider";

type RootProviderType = {
  children: ReactElement;
};
const RootContext = createContext({});

export const RootProvider: FC<RootProviderType> = ({ children }) => {
  return (
    <RootContext.Provider value={{}}>
      <AuthProvider>{children}</AuthProvider>
    </RootContext.Provider>
  );
};
