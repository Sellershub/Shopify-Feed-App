// @ts-nocheck
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { NGROK_TUNNEL } from "../../Constants";

const initialState = {
  widgets: [],
  loader: null,
};

export const getAllWidgets = createAsyncThunk(
  'widgets/getAllWidgets',
  async (userId) => {
    const data = await axios
    .get(`${NGROK_TUNNEL}/api/widget?userId=${userId}`)
    .then((data) => {
    return data.data;
  }).catch(err=>console.log('err', err))
  return data;
}
)
export const deleteWidget = createAsyncThunk(
  'widgets/deleteWidget',
  async (dataObj) => {
    const {userId, widgetId} = dataObj;
    const data = await axios
    .delete(`${NGROK_TUNNEL}/api/widget?userId=${userId}&widgetId=${widgetId}`)
    .then((data) => {
    return data;
  }).catch(err=>{
    return err
  })
  return {data, albumId: albumId};
}
)

export const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
      deleteWidgetById (state, action) {
        const newArr = state.widgets.filter(widget=>widget.id !== action.payload.widgetId);
        state.widgets = [...newArr];
      }
    
  },
  extraReducers: (builder) => {
    builder.addCase(getAllWidgets.pending, (state, action) => {
      state.loader = true;
    })
    builder.addCase(getAllWidgets.fulfilled, (state, action) => {
      state.widgets = [...action.payload];
      state.loader = false;
    })
    builder.addCase(deleteWidget.fulfilled, (state, action) => {
      const newArr = current(state.widgets).filter(widget=>widget.albumId !== action.payload.albumId);
      state.widgets = [...newArr];
      
      // state.widgets = [...action.payload.data]
    })
    builder.addCase(deleteWidget.rejected, (state, action) => {
      console.log(action.payload);
    })

  },
});

export const widgetsSelector = (state) => state.widgets

export const { deleteWidgetById} =
widgetsSlice.actions;

export default widgetsSlice.reducer;
