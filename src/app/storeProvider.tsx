import { useRef } from "react";
import { Provider } from "react-redux";

import { AppStore, makeStore, store } from "../store/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={store}>{children}</Provider>;
}
