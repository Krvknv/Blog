import { createSlice } from '@reduxjs/toolkit';

export type TInitialStateUser = {
  pagesQuantity: number | null;
};

const initialStateUser: TInitialStateUser = {
  pagesQuantity: null,
};

const sliceArticle = createSlice({
  name: 'article',
  initialState: initialStateUser,
  reducers: {
    setPagesQuantity: (state, action) => {
      const { pagesQuantity } = action.payload;
      state.pagesQuantity = pagesQuantity;
    },
  },
});

export default sliceArticle.reducer;
export const { setPagesQuantity } = sliceArticle.actions;
