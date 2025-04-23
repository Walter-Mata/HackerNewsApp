import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Story, StoryState, User} from 'types';
import {fetchTopStories, fetchStory, fetchUser} from './api';

const initialState: StoryState = {
  topStories: [],
  stories: {},
  users: {},
  loading: false,
  error: null,
};

export const getTopStories = createAsyncThunk(
  'stories/getTopStories',
  async (_, {dispatch}) => {
    const topStoryIds = await fetchTopStories();
    // Get only the first 10 stories
    return topStoryIds.slice(0, 10);
  },
);

export const getStory = createAsyncThunk(
  'stories/getStory',
  async (id: number, {dispatch, getState}) => {
    const story = await fetchStory(id);

    // Also fetch the author information
    if (story.by) {
      dispatch(getUser(story.by));
    }

    return story;
  },
);

export const getUser = createAsyncThunk(
  'stories/getUser',
  async (id: string) => {
    return await fetchUser(id);
  },
);

const storySlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTopStories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getTopStories.fulfilled,
        (state, action: PayloadAction<number[]>) => {
          state.loading = false;
          state.topStories = action.payload;
        },
      )
      .addCase(getTopStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch top stories';
      })
      .addCase(getStory.fulfilled, (state, action: PayloadAction<Story>) => {
        state.stories[action.payload.id] = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users[action.payload.id] = action.payload;
      });
  },
});

export default storySlice.reducer;
