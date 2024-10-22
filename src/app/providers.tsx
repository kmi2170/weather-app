"use client";

import { CookiesProvider } from "react-cookie";
import StoreProvider from "./storeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <StoreProvider>{children}</StoreProvider>
    </CookiesProvider>
  );
}
