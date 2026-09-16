import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "@/services/auth.service";
import { AuthState, User } from "@/types";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
};


export const fetchCurrentUser = createAsyncThunk("auth/fetchCurrentUser", async () => {
  const { data } = await authService.me();
  return data;
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = "authenticated";
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "unauthenticated";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "authenticated";
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "unauthenticated";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "unauthenticated";
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
