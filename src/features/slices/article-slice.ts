import { createSlice } from '@reduxjs/toolkit';

export type TInitialStateUser = {
  name: string;
  description: string;
  body: string;
  slug: string;
  tagsList: string[];
};

const initialStateUser: TInitialStateUser = {
  name: '',
  description: '',
  body: '',
  slug: '',
  tagsList: [],
};

const sliceArticle = createSlice({
  name: 'article',
  initialState: initialStateUser,
  reducers: {
    setAticleInfo: (state, action) => {
      const { name, description, body, slug, tagsList } = action.payload;
      state.name = name;
      state.description = description;
      state.body = body;
      state.slug = slug;
      state.tagsList = tagsList;
    },
  },
});

export default sliceArticle.reducer;
export const { setAticleInfo } = sliceArticle.actions;
