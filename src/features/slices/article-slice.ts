import { createSlice } from '@reduxjs/toolkit';

export type TInitialStateUser = {
  slug: string;
};

const initialStateUser: TInitialStateUser = {
  slug: '',
};

const sliceArticle = createSlice({
  name: 'article',
  initialState: initialStateUser,
  reducers: {},
});

export default sliceArticle.reducer;
// export const { setSlug } = sliceArticle.actions;
