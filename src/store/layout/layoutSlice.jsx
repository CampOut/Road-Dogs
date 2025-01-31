import { createSlice } from '@reduxjs/toolkit';

import {
  layoutTypes,
  layoutModeTypes,
  layoutWidthTypes,
  topBarThemeTypes,
  leftSideBarThemeTypes,
  leftSidebarTypes,
} from '../../constants/layout';

const initState = {
  layoutType: layoutTypes.VERTICAL,
  layoutModeTypes: layoutModeTypes.LIGHTMODE,
  layoutWidth: layoutWidthTypes.FLUID,
  leftSideBarTheme: leftSideBarThemeTypes.DARK,
  leftSideBarType: leftSidebarTypes.DEFAULT,
  topbarTheme: topBarThemeTypes.LIGHT,
  showRightSidebar: false,
  isMobile: false,
  showSidebar: true,
  leftMenu: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initState,
  reducers: {
    changeLayout: (state, action) => {
      state.layoutType = action.payload;
    },
    changeLayoutMode: (state, action) => {
      state.layoutModeTypes = action.payload;
    },
    changeLayoutWidth: (state, action) => {
      state.layoutWidth = action.payload;
    },
    changeSidebarTheme: (state, action) => {
      state.leftSideBarTheme = action.payload;
    },
    changeSidebarType: (state, action) => {
      state.leftSideBarType = action.payload.sidebarType;
    },
    changeTopbarTheme: (state, action) => {
      state.topbarTheme = action.payload;
    },
    showRightSidebar: (state, action) => {
      state.showRightSidebar = action.payload;
    },
    showSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    toggleLeftMenu: (state, action) => {
      state.leftMenu = action.payload;
    },
  },
});

export default layoutSlice.reducer;

export const {
  changeLayout,
  changeLayoutMode,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  showRightSidebar,
  showSidebar,
  toggleLeftMenu,
} = layoutSlice.actions;
