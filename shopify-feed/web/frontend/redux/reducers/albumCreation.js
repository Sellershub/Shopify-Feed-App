// @ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { NGROK_TUNNEL } from '../../Constants'
import { current } from '@reduxjs/toolkit'

const initialState = {
  instaData: [],
  products: [],
  productsLoader: null,
  instaId: null,
  loader: null,
  selectedMedia: null,
  widget: [],
  albumName: null,
  albumId: null,
}

export const auth = createAsyncThunk('auth/auth', async (code, thunkAPI) => {
  const data = await axios
    .post(`${NGROK_TUNNEL}/api/instagram/auth/token`, { code })
    .then(({ data: authData }) => {
      localStorage.setItem('instagramId', authData.user_id)
      localStorage.setItem('accessToken', authData.access_token)
      return { instaId: authData.user_id, userToken: authData.access_token }
    })
    .catch((err) => console.log('errauthhhhh', err))
  return data
})
export const getInstaData = createAsyncThunk(
  'albums/getInstaData',
  async (userData, thunkAPI) => {
    const { accessToken, userId, instagramId } = userData
    const data = await axios
      .get(
        `${NGROK_TUNNEL}/api/posts?access_token=${accessToken}&userId=${userId}&instagramId=${instagramId}`,
      )
      .then(({ data }) => {
        return { data }
      })
      .catch((err) => console.log('err', err))
    return data
  },
)
export const getProducts = createAsyncThunk(
  'albums/getProducts',
  async () => {
    const data = await axios
      .get(
        `${NGROK_TUNNEL}/api/shopify/getproduct`,
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => console.log('err', err))
    return data
  },
)

export const getSelectedAlbum = createAsyncThunk(
  'albums/getSelectedAlbum',
  async (albumData, thunkAPI) => {
    const { albumId, userId } = albumData
    const data = await axios
      .get(`${NGROK_TUNNEL}/api/albums/id?albumId=${albumId}&userId=${userId}`)
      .then(({ data }) => {
        return { data }
      })
      .catch((err) => console.log('err', err))
    return data
  },
)

export const createAlbums = createAsyncThunk(
  'albums/createAlbums',
  async (data) => {
    try {
      const response = await axios.post(`${NGROK_TUNNEL}/api/albums`, data)
      // If you want to get something back
      return response.data
    } catch (err) {
      console.error(err)
    }
  },
)
export const editAlbum = createAsyncThunk('albums/editAlbum', async (data) => {
  try {
    const response = await axios.post(`${NGROK_TUNNEL}/api/albums/test`, data)
    // If you want to get something back
    return response.data
  } catch (err) {
    console.error(err)
  }
})

export const albumCreationSlice = createSlice({
  name: 'albumCreation',
  initialState,
  reducers: {
    setAlbumName: (state, action) =>{
      state.albumName = action.payload
    },
    editInstaPost: (state, action) => {
      const { id, type } = action.payload
      const index = state.instaData.findIndex((el) => el.id === id)
      if (type === 'switch') {
        state.instaData[index].isShown = !state.instaData[index].isShown
      }
      if (type === 'checkbox') {
        state.instaData[index].selected = !state.instaData[index].selected
      }
      if (type === 'pin') {
        state.instaData[index].pinned = !state.instaData[index].pinned
      }
    },
    selectHideAll: (state, action) => {
      state.instaData = state.instaData.map((el) => {
        if (action.payload.type === 'tags') {
          const selectedTags = (el?.instaTags).filter((tag) =>
            action.payload.tags.includes(tag.split(' ')[0]),
          )
          return {
            ...el,
            isShown: selectedTags.length > 0,
          }
        } else {
          return {
            ...el,
            isShown: action.payload.type === 'select',
          }
        }
      })
    },
    selectAll: (state, action) => {
      state.instaData.forEach((post) => (post.selected = action.payload.select))
    },
    multiplyChoice: (state, action) => {
      state.instaData = current(state.instaData).map((post) => {
        if (post.selected) {
          return {
            ...post,
            isShown: action.payload.show,
          }
        } else {
          return post
        }
      })
    },
    addTag: (state, action)=>{
      const {postIndex, tag} = action.payload;
      state.instaData[postIndex].productTags.push(tag)
    },
    deleteTag: (state, action)=>{
      const {postIndex, tagId} = action.payload;
      state.instaData[postIndex].productTags = state.instaData[postIndex].productTags.filter((item) => item.id !== tagId)
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(auth.fulfilled, (state, action) => {
      state.instaId = action.payload.instaId
    })
    builder.addCase(getInstaData.pending, (state, action) => {
      state.loader = true
    })
    builder.addCase(getInstaData.fulfilled, (state, action) => {
      state.instaData = [...action.payload.data];
      state.albumName = null;
      state.loader = false
    })
    builder.addCase(createAlbums.pending, (state, action) => {
      // state.loader = true
    })
    builder.addCase(createAlbums.fulfilled, (state, action) => {
      state.widget = action.payload.posts
      state.instaData = []
      // state.loader = false
    })
    builder.addCase(getSelectedAlbum.pending, (state, action) => {
      state.loader = true
    })
    builder.addCase(getSelectedAlbum.fulfilled, (state, action) => {
      state.instaData = [...action.payload.data?.posts]
      state.albumName = action.payload.data?.albumName
      state.albumId = action.payload.data?.albumId
      state.loader = false
    })
    builder.addCase(editAlbum.fulfilled, (state, action) => {
      console.log(action.payload)
    })
    builder.addCase(getProducts.pending, (state, action) => {
      state.productsLoader=true;
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = [...action.payload];
      state.productsLoader = false;
    })
  },
})

export const albumCreationSelector = (state) => state.albumCreation

export const {
  editInstaPost,
  selectHideAll,
  selectAll,
  multiplyChoice,
  addTag,
  deleteTag,
  setAlbumName
} = albumCreationSlice.actions

export default albumCreationSlice.reducer
