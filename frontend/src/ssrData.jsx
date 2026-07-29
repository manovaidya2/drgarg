import { createContext, useContext } from "react";

export const SsrDataContext = createContext({});

export const useSsrData = () => useContext(SsrDataContext);
