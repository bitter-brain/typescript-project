import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUser, fetchUserRepos } from "../api/userApi"
import type { User, Repo } from "./userTypes"

interface UserState {
  user: User | null
  repos: Repo[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  repos: [],
  loading: false,
  error: null,
}

export const loadUser = createAsyncThunk<User, string, { rejectValue: string }>(
  "user/loadUser",
  async (username: string, { rejectWithValue }) => {
    try {
      return await fetchUser(username);
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        return rejectWithValue("Network error")
      }
      return rejectWithValue("User not found")
    }
  }
)

export const loadRepos = createAsyncThunk<Repo[], string>(
  "user/loadRepos",
  async (username: string) => {
    return await fetchUserRepos(username)
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.user = null
        state.repos = []
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? "User not found"
        state.user = null
      })
      .addCase(loadRepos.fulfilled, (state, action) => {
        state.repos = action.payload
      })
  },
})

export default userSlice.reducer