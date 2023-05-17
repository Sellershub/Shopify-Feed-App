import { configureStore } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import  accountsSlice  from './reducers/accounts';
import albumCreation from './reducers/albumCreation'
import albumsSlice from './reducers/albums';
import  widgetsSlice  from './reducers/widgets';
import widgetSetupSlice from './reducers/widgetSetup';


export const store = configureStore({
  reducer: {
    albumCreation: albumCreation,
    albums: albumsSlice,
    widgetSetup: widgetSetupSlice,
    widgets: widgetsSlice,
    accounts: accountsSlice,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})