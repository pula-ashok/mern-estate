import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import {} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  user: userReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (applyMiddleware) =>
    applyMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
