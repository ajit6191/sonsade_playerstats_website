import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =====================================================
   CHECK ADMIN AUTH (COOKIE BASED)
===================================================== */
export const checkAdminAuth = createAsyncThunk(
  "auth/checkAdminAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8000/users/me", {
        withCredentials: true, // REQUIRED for cookies
      });

      // Expected response: { success: true, role: "admin" }
      return res.data;
    } catch (err) {
      return rejectWithValue("Not authenticated");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    role: null,
    loading: true,
  },
  reducers: {
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 Checking auth
      .addCase(checkAdminAuth.pending, (state) => {
        state.loading = true;
      })

      // ✅ Auth success
      .addCase(checkAdminAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.role = action.payload.role;
        state.loading = false;
      })

      // ❌ Auth failed
      .addCase(checkAdminAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.role = null;
        state.loading = false;
      });
  },
});

export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
