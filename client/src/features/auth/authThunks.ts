import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { AxiosError } from "axios";
import type { ResponseError } from "../../app/http/api";

import { API_BASE } from "../../app/http/api";

import AuthService, { AuthResponse } from "../../app/services/auth";

export const fetchLogin = createAsyncThunk<
  AuthResponse,
  { username: string; password: string },
  { rejectValue: ResponseError }
>("auth/login", async ({ username, password }, thunkAPI) => {
  try {
    const response = await AuthService.login({ username, password });
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>; // cast the error for access
    if (!error.response) {
      throw err;
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchRegistration = createAsyncThunk<
  AuthResponse,
  { username: string; name: string; email: string; password: string },
  { rejectValue: ResponseError }
>(
  "auth/registration",
  async ({ username, name, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.registration({
        username,
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.accessToken); // comment it because store it in redux is more faster
      return response.data;
    } catch (err) {
      const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchLogout = createAsyncThunk<
  { message: string },
  undefined,
  { rejectValue: ResponseError }
>("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await AuthService.logout();
    localStorage.removeItem("token");
    return response.data;
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>; // cast the error for access
    if (!error.response) {
      throw err;
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchCheckAuth = createAsyncThunk<
  AuthResponse,
  undefined,
  { rejectValue: ResponseError }
>("auth/refresh", async (_, thunkAPI) => {
  try {
    const response = await axios.get<AuthResponse>(`${API_BASE}/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>; // cast the error for access
    if (!error.response) {
      throw err;
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
