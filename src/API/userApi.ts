import { createAsyncThunk } from '@reduxjs/toolkit';
import { EDIT_USER_URL, ENTER_USER_URL, GET_PROFILE, REGISTER_USER_URL } from 'features/constants';
import { TFullUserData, TUserData } from 'types/types';

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

export const editUser = createAsyncThunk(
  'user/editUser',
  async ({ token, ...userData }: Partial<TFullUserData>, thunkAPI) => {
    try {
      const response = await fetch(EDIT_USER_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: userData }),
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

// Error check
export const getProfile = async (username: string, token: string) => {
  const options = token
    ? {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  const response = await fetch(`${GET_PROFILE}${username}`, options);
  const { profile } = await response.json();

  return profile;
};

export const followUser = async (username: string, token: string) => {
  const response = await fetch(`${GET_PROFILE}${username}/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  });

  const { profile } = await response.json();

  return profile;
};

export const unfollowUser = async (username: string, token: string) => {
  const response = await fetch(`${GET_PROFILE}${username}/follow`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  });

  const { profile } = await response.json();

  return profile;
};
