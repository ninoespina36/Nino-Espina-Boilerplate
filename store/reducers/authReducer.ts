import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface UserData {
  id: string
  name: string
  email: string
  token: string
}

interface AuthState {
  user: UserData
  isAuthenticated: boolean
}

const initialState: AuthState =  {
  user:{
    id: '',
    name: '',
    email: '',
    token: ''
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