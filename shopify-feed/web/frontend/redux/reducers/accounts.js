// @ts-nocheck
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { NGROK_TUNNEL } from "../../Constants";

const initialState = {
  accounts: [],
  loader: null,
};

export const getAllAccounts = createAsyncThunk(
  'accounts/getAllAccounts',
  async (userId) => {
    const data = await axios
    .get(`${NGROK_TUNNEL}/api/accounts?userId=${userId}`)
    .then((data) => {
    return data;
  })
  return data;
}
)
export const deleteAccount = createAsyncThunk(
  'accounts/deleteAccount',
  async (dataObj) => {
    const {userId, albumId} = dataObj;
    const data = await axios
    .delete(`${NGROK_TUNNEL}/api/accounts?userId=${userId}&albumId=${albumId}`)
    .then((data) => {
    return data;
  })
  return {data, albumId: albumId};
}
)

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
      deleteWidgetById (state, action) {
        const newArr = state.accounts.filter(widget=>widget.id !== action.payload.albumId);
        state.accounts = [...newArr];
      }
    
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAccounts.pending, (state, action) => {
      state.loader = true;
    })
    builder.addCase(getAllAccounts.fulfilled, (state, action) => {
      state.accounts = [...action.payload.data];
      state.loader = false;
    })
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      const newArr = current(state.accounts).filter(widget=>widget.albumId !== action.payload.albumId);
      state.accounts = [...newArr];
      
      // state.accounts = [...action.payload.data]
    })

  },
});

export const accountsSelector = (state) => state.accounts

export const { deleteWidgetById} =
accountsSlice.actions;

export default accountsSlice.reducer;
