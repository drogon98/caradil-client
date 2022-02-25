import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../graphql_types/generated/graphql";

// declaring the types for our state
export type SearchState = {
  show_more_filters: boolean;
};

const initialState: SearchState = {
  show_more_filters: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    showMoreFilters: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      // It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based off those changes
      state.show_more_filters = true;
    },
    closeMoreFilters: (state) => {
      state.show_more_filters = false;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { showMoreFilters, closeMoreFilters } = searchSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
// export const selectCount = (state: RootState) => state.auth;

// exporting the reducer here, as we need to add this to the store
export default searchSlice.reducer;
