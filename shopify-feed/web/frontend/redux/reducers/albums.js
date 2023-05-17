// @ts-nocheck
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { NGROK_TUNNEL } from "../../Constants";

const initialState = {
  albums: [],
  selectedAlbumId: null,
  albumsOptions: [],
  loader: null,
  deleteError: null,
};

export const getAllAlbums = createAsyncThunk(
  'albums/getAllAlbums',
  async (userId) => {
    const data = await axios
    .get(`${NGROK_TUNNEL}/api/albums?userId=${userId}`)
    .then((data) => {
    return data;
  })
  return data;
}
)
export const deleteAlbum = createAsyncThunk(
  'albums/deleteAlbum',
  async (dataObj, {rejectWithValue}) => {
    const {userId, albumId} = dataObj;
    const data = await axios
    .delete(`${NGROK_TUNNEL}/api/albums?userId=${userId}&albumId=${albumId}`)
    .then((data) => {
    return data;
  }).catch(err=>{
    throw rejectWithValue(err.response.data.message);
  })
  return {data, albumId: albumId};
}
)
export const approveDeleteAlbum = createAsyncThunk(
  'albums/approveDeleteAlbum',
  async (dataObj, {rejectWithValue}) => {
    const {userId, albumId} = dataObj;
    console.log(dataObj);
    const data = await axios
    .delete(`${NGROK_TUNNEL}/api/albums/completely?userId=${userId}&albumId=${albumId}`)
    .then((data) => {
    return data;
  }).catch(err=>{
    throw rejectWithValue(err.response.data.message);
  })
  return {data, albumId: albumId};
}
)

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
      cancelDeleting (state, action) {
       state.deleteError = null;
      },
      selectAlbum (state, action) {
       state.selectedAlbumId = action.payload;
      } 
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAlbums.pending, (state, action) => {
      state.loader = true;
    })
    builder.addCase(getAllAlbums.fulfilled, (state, action) => {
      state.albums = [...action.payload.data];
      state.albumsOptions = action.payload.data.map(el=>{
        return {
          value: el.albumId,
          label: el.albumName
        }
      })
      state.loader = false;
    })
    builder.addCase(deleteAlbum.pending, (state, action) => {
      state.deleteError = null;      
    })
    builder.addCase(deleteAlbum.fulfilled, (state, action) => {
      const newArr = current(state.albums).filter(album=>album.albumId !== action.payload.albumId);
      state.albums = [...newArr];     
    })
    builder.addCase(deleteAlbum.rejected, (state, action) => {
      state.deleteError = action.payload;
    })
    builder.addCase(approveDeleteAlbum.fulfilled, (state, action) => {
      const newArr = current(state.albums).filter(album=>album.albumId !== action.payload.albumId);
      state.albums = [...newArr]; 
      state.deleteError = null;
    })

  },
});

export const albumsSelector = (state) => state.albums

export const { cancelDeleting, selectAlbum} =
albumsSlice.actions;

export default albumsSlice.reducer;
