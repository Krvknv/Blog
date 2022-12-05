import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { enterUser, registerUser } from 'API/userApi';

export type TInitialStateUser = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  isExist: boolean;
  incorrectValue: boolean;
};

const initialStateUser: TInitialStateUser = {
  token: '',
  username: '',
  email: '',
  bio: '',
  image: '',
  isExist: false,
  incorrectValue: false,
};

const sliceUser = createSlice({
  name: 'user',
  initialState: initialStateUser,
  reducers: {},
  extraReducers: {
    [registerUser.fulfilled.type]: (
      state,
      action: PayloadAction<{
        email: string;
        token: string;
        username: string;
        bio: string;
        image: string;
      }>
    ) => {
      const { token, username, email, bio, image } = action.payload;
      state.token = token;
      state.username = username;
      state.email = email;
      state.bio = bio;
      state.image = image;
    },
    [registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isExist = true;
    },

    [enterUser.fulfilled.type]: (
      state,
      action: PayloadAction<{
        email: string;
        token: string;
        username: string;
        bio: string;
        image: string;
      }>
    ) => {
      const { token, username, email, bio, image } = action.payload;
      state.token = token;
      state.username = username;
      state.email = email;
      state.bio = bio;
      state.image = image;
    },
    [enterUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.incorrectValue = true;
    },
  },
});

export default sliceUser.reducer;
// export const {  } = sliceUser.actions;
