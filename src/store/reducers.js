import { combineReducers } from "@reduxjs/toolkit"

import authReducer from './auth/authSlice'
import layoutReducer from './layout/layoutSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    layout: layoutReducer
})

export default rootReducer