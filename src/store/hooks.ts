import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppStore, type AppDispatch, type RootState } from "./store";
import { useStore } from "react-redux";

export const useAppStore = () => useStore<AppStore>();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppSelector = useSelector.withTypes<RootState>();
//export const useAppStore = useStore.withTypes<AppStore>();
