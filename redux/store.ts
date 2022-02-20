import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import logoutReducer from "./logoutSlice";
import notificationReducer from "./notificationSlice";
import userReducer from "./userSlice";

const reducers = combineReducers({
  auth: authReducer,
  logout: logoutReducer,
  notifications: notificationReducer,
  user: userReducer,
});

const persistConfig = {
  key: "caradil",
  storage,
  whitelist: ["auth"],

  //     key: string, // the key for the persist
  //   storage: Object, // the storage adapter, following the AsyncStorage api
  //   version?: number, // the state version as an integer (defaults to -1)
  //   blacklist?: Array<string>, // do not persist these keys
  //   whitelist?: Array<string>, // only persist these keys
  //   migrate?: (Object, number) => Promise<Object>,
  //   transforms?: Array<Transform>,
  //   throttle?: number, // ms to throttle state writes
  //   keyPrefix?: string, // will be prefixed to the storage key
  //   debug?: boolean, // true -> verbose logs
  //   stateReconciler?: false | StateReconciler, // false -> do not automatically reconcile state
  //   serialize?: boolean, // false -> do not call JSON.parse & stringify when setting & getting from storage
  //   writeFailHandler?: Function, // will be called if the storage engine fails during setItem()
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
