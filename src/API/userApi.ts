import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENTER_USER_URL, REGISTER_USER_URL } from 'features/constants';
import { TUserData } from 'types/types';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, username, password }: TUserData, thunkAPI) => {
    try {
      const response = await fetch(REGISTER_USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ user: { email, username, password } }),
      });
      if (!response.ok) {
        throw Error;
      }
      const { user } = await response.json();
      return { ...user };
    } catch (error) {
      return thunkAPI.rejectWithValue('Error');
    }
  }
);

export const enterUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password }: Omit<TUserData, 'username'>, thunkAPI) => {
    try {
      const response = await fetch(ENTER_USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ user: { email, password } }),
      });
      const responseJson = await response.json();
      return { ...responseJson.user };
    } catch (error) {
      return thunkAPI.rejectWithValue('Error');
    }
  }
);
