import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { editUser, enterUser, registerUser } from 'API/userApi';
import { TFullUserData } from 'types/types';

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
  reducers: {
    // PayloadAction
    setUserData(state, action: PayloadAction<any>) {
      // const { token, username, email, bio, image } = action.payload;
      state = { ...state, ...action.payload };
    },
  },
  extraReducers: {
    [registerUser.fulfilled.type]: (state, action: PayloadAction<TFullUserData>) => {
      // const { token, username, email, bio, image } = action.payload;
      state = { ...state, ...action.payload };
      // state.token = token;
      // state.username = username;
      // state.email = email;
      // state.bio = bio;
      // state.image = image;
      // state.isExist = false;
    },
    [registerUser.rejected.type]: (state) => {
      state.isExist = true;
    },

    [enterUser.fulfilled.type]: (state, action: PayloadAction<TFullUserData>) => {
      const { token, username, email, bio, image } = action.payload;
      state.token = token;
      state.username = username;
      state.email = email;
      state.bio = bio;
      state.image = image;
      state.incorrectValue = false;
    },
    [enterUser.rejected.type]: (state) => {
      state.incorrectValue = true;
    },

    [editUser.fulfilled.type]: (state, action: PayloadAction<TFullUserData>) => {
      const { token, username, email, bio, image } = action.payload;
      state.token = token;
      state.username = username;
      state.email = email;
      state.bio = bio;
      state.image = image;
      state.isExist = false;
    },
    [editUser.rejected.type]: (state) => {
      state.isExist = true;
    },
  },
});

export default sliceUser.reducer;
export const { setUserData } = sliceUser.actions;
