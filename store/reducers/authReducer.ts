import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface UserData {
  id: string | null
  name: string | null
  email: string | null
  token: string | null
}

interface AuthState {
  user: UserData
  isAuthenticated: boolean
}

const initialState: AuthState =  {
  user:{
    id: null,
    name: null,
    email: null,
    token: null
  },
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload: user }: PayloadAction<UserData>) => {
      state.user = user;
      state.isAuthenticated = true;
    },
    logout: () => { initialState },
  }
})


// Export functions so that can be used anywhere in the app
export const { 
    login, 
    logout,
} = authSlice.actions;

export default authSlice.reducer;