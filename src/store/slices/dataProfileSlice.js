import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: '',
    dateBirth: '',
    description: '',
    avatar: ''
}

const dataProfileSlice = createSlice({
    name: 'dataProfile',
    initialState,
    reducers: {
        addDataProfile: (state, action) => {
            state.name = action.payload.name || state.name;
            state.dateBirth = action.payload.dateBirth || state.dateBirth;
            state.description = action.payload.description || state.description;
            state.avatar = action.payload.avatar // || state.avatar
        }   
    }
})

export const { addDataProfile } = dataProfileSlice.actions;
export default dataProfileSlice.reducer;