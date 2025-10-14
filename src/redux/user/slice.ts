import { api } from '@/lib/api';
import { User } from '@/types/user.types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: true,
};

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await api.post('/auth/logout', {}, { withCredentials: true });
  window.location.reload();
  return null;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { setUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
