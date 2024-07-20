import React, { PropsWithChildren } from "react";
import { render as rtlRender } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedStateShapeFromReducersMapObject } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { AppStore, RootState, setupStore } from "../app/store";
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>;
  store?: AppStore;
}

function renderWithProvider(
  ui: React.ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({
    children,
  }: PropsWithChildren<Record<string, unknown>>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// re-export everything from RTL
export * from "@testing-library/react";
// Override the `render` export name with our custom function
export { renderWithProvider as render };
