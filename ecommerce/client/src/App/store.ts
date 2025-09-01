import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Features/Cart/cartSlice";
import wishListSlice from "../Features/Wishlist/wishListSlice";
import authReducer from "../Features/Auth/authSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { FLUSH,REHYDRATE , REGISTER ,PAUSE, PURGE ,PERSIST, persistStore,persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistconfig ={
  key:"root",
  version:1,
  storage
};

const rootReducer = combineReducers({
  cart: cartSlice,
  wishlist: wishListSlice,
  auth: authReducer,
});
const persistedReducer= persistReducer(persistconfig ,rootReducer);


export const store = configureStore({
reducer:persistedReducer,
middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
  serializableCheck:{
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
})
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
