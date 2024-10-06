import { createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = process.env.YOUTHOOB_API_KEY;

export const getHomePageVidoes = createAsyncThunk(
  "youtubeApp/homePageVideos",
  async (isNext: boolean, { getState }) => {}
);
