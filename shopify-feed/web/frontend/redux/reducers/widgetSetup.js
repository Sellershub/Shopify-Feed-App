// @ts-nocheck
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
import { NGROK_TUNNEL } from '../../Constants'
import { basicWidgetSettings } from '../../utils/widget'

const initialState = {
  widget: [],
  widgetId: null,
  widgetName: '',
  selectedWidgetAlbum: null,
  selectedWidgetAlbumId: null,
  loader: null,
  settings: basicWidgetSettings,
}

export const getAlbumForWidget = createAsyncThunk(
  'widget/getAlbumForWidget',
  async (albumData, thunkAPI) => {
    const { albumId, userId } = albumData;
    const data = await axios
      .get(`${NGROK_TUNNEL}/api/albums/id?albumId=${albumId}&userId=${userId}`)
      .then(({ data }) => {
        return { data, albumId }
      })
      .catch((err) => console.log('err', err))
    return data
  },
)

export const createWidget = createAsyncThunk(
  'widget/createWidget',
  async (data) => {
    try {
      const response = await axios.post(`${NGROK_TUNNEL}/api/widget`, data);
      return response
    } catch (err) {
      console.error(err)
    }
  },
)

export const getSelectedWidget = createAsyncThunk(
  'widget/getSelectedAlbum',
  async (widgetData, thunkAPI) => {
    const { widgetId, userId } = widgetData
    const data = await axios
      .get(`${NGROK_TUNNEL}/api/widget/id?widgetId=${widgetId}&userId=${userId}`)
      .then(({ data }) => {
        return  data 
      })
      .catch((err) => console.log('err', err))
    return data
  },
)

export const editWidget = createAsyncThunk('widget/editWidget', async (data) => {
  try {
    const response = await axios.post(`${NGROK_TUNNEL}/api/widget/update`, data)
    // If you want to get something back
    return response.data
  } catch (err) {
    console.error(err)
  }
})

export const widgetSetupSlice = createSlice({
  name: 'widgetSetup',
  initialState,
  reducers: {
    setWidgetName: (state, action)=>{
      state.widgetName = action.payload;
    },
    setDefalultSettings: (state, action)=>{
      state.settings = basicWidgetSettings;
    },
    setAlbumNull: (state, action)=>{
      state.widgetName='';
      state.selectedWidgetAlbumId=null;
      state.selectedWidgetAlbum=null;
    },
    chooseDevice: (state, action) => {
      state.settings.device = action.payload
    },
    chooseTemplate: (state, action) => {
      state.settings.selectedTemplate = action.payload
    },
    chooseSetting: (state, action) => {
      state.settings.selectedSettings = action.payload
    },
    choosePosition: (state, action) => {
      state.settings.position = action.payload
    },
    selectLayout: (state, action) => {
      const { type, value } = action.payload
      switch (type) {
        case 'column':
          state.settings.layout.columns = value
          break
        case 'row':
          state.settings.layout.rows = value
          break
        case 'padding':
          state.settings.layout.padding = value
          break
        case 'border':
          state.settings.layout.borderRadius = value
          break
        case 'mobilecolumn':
          state.settings.layout.mobileColumns = value
          break
        case 'mobilerows':
          state.settings.layout.mobileRows = value
          break
        case 'background':
          state.settings.layout.backgroundColor = value
          break
      }
    },
    selectHeading: (state, action) => {
      const { type, value } = action.payload
      switch (type) {
        case 'select':
          state.settings.heading.radio = value
          break
        case 'title':
          state.settings.heading.enableTitle = value
          break
        case 'description':
          state.settings.heading.enableDescription = value
          break
        case 'button':
          state.settings.heading.enableButton = value
          break
      }
    },
    selectItems: (state, action) => {
      const { type, value } = action.payload
      switch (type) {
        case 'hover':
          state.settings.items.enableHover = value;
          break
        case 'background':
          state.settings.items.backgroundColor = value;
          break
        case 'opacity':
          state.settings.items.opacity = value;
          break
        case 'color':
          state.settings.items.color = value;
          break
        case 'textAlign':
          state.settings.items.textAlign = value;
          break
        case 'textSize':
          state.settings.items.textSize = value;
          break
        case 'textWeight':
          state.settings.items.textWeight = value;
          break
        case 'caption':
          state.settings.items.caption = value;
          break
      }
    },
    selectPopup: (state, action) => {
      const { type, value } = action.payload
      switch (type) {
        case 'profile':
          state.settings.popup.profile = value;
          break
        case 'profileTab':
          state.settings.popup.profileTab = value;
          break
        case 'folowBtn':
          state.settings.popup.folowBtn = value;
          break
        case 'folowBtnText':
          state.settings.popup.folowBtnText = value;
          break
        case 'caption':
          state.settings.popup.caption = value;
          break
        case 'date':
          state.settings.popup.date = value;
          break
        case 'instaView':
          state.settings.popup.instaView = value;
          break
        case 'instaViewTab':
          state.settings.popup.instaViewTab = value;
          break
      }
    },
    selectShoppable: (state, action) => {
      const { type, value } = action.payload
      switch (type) {
        case 'showIcon':
          state.settings.shoppable.showIcon = value;
          break
        case 'hotSpotColor':
          state.settings.shoppable.hotSpotColor = value;
          break
        case 'hotSpotHover':
          state.settings.shoppable.hotSpotHover = value;
          break
        case 'opacity':
          state.settings.shoppable.opacity = value;
          break
        case 'hotspotLink':
          state.settings.shoppable.hotspotLink = value;
          break
        case 'displayProduct':
          state.settings.shoppable.displayProduct = value;
          break
        case 'ctaBtn':
          state.settings.shoppable.ctaBtn = value;
          break
        case 'ctaBtnText':
          state.settings.shoppable.ctaBtnText = value;
          break
        case 'ctaBtnColor':
          state.settings.shoppable.ctaBtnColor = value;
          break
        case 'ctaBtnTextColor':
          state.settings.shoppable.ctaBtnTextColor = value;
          break
       
      }
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(getAlbumForWidget.pending, (state, action) => {
      state.loader = true
    })
    builder.addCase(getAlbumForWidget.fulfilled, (state, action) => {
      state.widget = action.payload.data?.posts.filter((post) => post.isShown)
      state.selectedWidgetAlbumId = action.payload.albumId;
      state.loader = false
    })
    builder.addCase(createWidget.pending, (state, action) => {
      // state.loader = true;
    })
    builder.addCase(createWidget.fulfilled, (state, action) => {
      state.widgetName = '';
      // state.loader = false
    })
    builder.addCase(editWidget.fulfilled, (state, action) => {
      console.log(action.payload);
    })
    builder.addCase(getSelectedWidget.pending, (state, action) => {
      state.loader = true;
    })
    builder.addCase(getSelectedWidget.fulfilled, (state, action) => {
      state.widget= action.payload.posts.filter(post=>post.isShown)
      state.widgetName = action.payload.widgetName;
      state.selectedWidgetAlbum = action.payload.albumName;
      state.selectedWidgetAlbumId = action.payload.albumId;
      state.settings= action.payload.options;
      state.widgetId= action.payload.widgetId;
      state.loader = false;
    })
  },
})

export const widgetSetupSelector = (state) => state.widgetSetup

export const {
  chooseTemplate,
  setAlbumNull,
  setWidgetName,
  setDefalultSettings,
  chooseSetting,
  choosePosition,
  chooseDevice,
  selectLayout,
  selectHeading,
  selectItems,
  selectPopup,
  selectShoppable
} = widgetSetupSlice.actions

export default widgetSetupSlice.reducer
