import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TestState {
  userId: string | null
}

const initialState: TestState = {
  userId: null
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    getUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload
    }
  }
})

export const { getUserId } = testSlice.actions

export default testSlice.reducer
