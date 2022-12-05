import { createSlice } from '@reduxjs/toolkit';

export type TInitialStateUser = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  signAction: string;
};

const initialStateUser: TInitialStateUser = {
  token: '',
  username: '',
  email: '',
  bio: '',
  image: '',
  signAction: '',
};

const sliceUser = createSlice({
  name: 'user',
  initialState: initialStateUser,
  reducers: {
    setUserData(state, action) {
      const { token, username, email, bio, image } = action.payload;
      state.token = token;
      state.username = username;
      state.email = email;
      state.bio = bio;
      state.image = image;
    },
    setSignAction(state, action) {
      const { signAction } = action.payload;
      state.signAction = signAction;
    },
  },
});

export default sliceUser.reducer;
export const { setUserData, setSignAction } = sliceUser.actions;
