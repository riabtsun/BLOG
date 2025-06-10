import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from './posts.ts';
import axios from '../../axios';
import { formValues } from '../../pages/Login';
import { RootState } from '../store.ts';

export const fetchAuthData = createAsyncThunk<any, formValues>('auth/fetchAuthData', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.data = null;
      state.status = 'error';
    });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
