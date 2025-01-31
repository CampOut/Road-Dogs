import { createListenerMiddleware } from '@reduxjs/toolkit';

import layoutReducer, { changeLayout } from './layoutSlice';

const listenerMiddleware = createListenerMiddleware();

const changeBodyAttribute = (attribute, value) => {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
};

const manageBodyClass = (cssClass, action = 'toggle') => {
  switch (action) {
    case 'add':
      if (document.body) document.body.classList.add(cssClass);
      break;
    case 'remove':
      if (document.body) document.body.classList.remove(cssClass);
      break;
    default:
      if (document.body) document.body.classList.toggle(cssClass);
      break;
  }
  return true;
};

const showRightSidebar = async () => {
  try {
    manageBodyClass('right-bar-enabled', 'add');
  } catch (error) {}
};

const changeLeftSidebarType = async ({
  payload: { sidebarType, isMobile },
}) => {
  try {
    switch (sidebarType) {
      case 'compact':
        changeBodyAttribute('data-sidebar-size', 'small');
        manageBodyClass('sidebar-enable', 'remove');
        manageBodyClass('vertical-collpsed', 'remove');
        break;
      case 'icon':
        changeBodyAttribute('data-sidebar-size', '');
        changeBodyAttribute('data-keep-enlarged', 'true');
        manageBodyClass('vertical-collpsed', 'add');
        break;
      case 'condensed':
        manageBodyClass('sidebar-enable', 'add');
        if (window.screen.width >= 992) {
          manageBodyClass('vertical-collpsed', 'remove');
          manageBodyClass('sidebar-enable', 'remove');
          manageBodyClass('vertical-collpsed', 'add');
          manageBodyClass('vertical-collpsed', 'add');
        } else {
          manageBodyClass('sidebar-enable', 'add');
          manageBodyClass('vertical-collpsed', 'add');
        }
        break;
      default:
        changeBodyAttribute('data-sidebar-size', '');
        manageBodyClass('sidebar-enable', 'remove');
        if (!isMobile) {
          manageBodyClass('vertical-collpsed', 'remove');
        }
        break;
    }
  } catch (error) {}
};

const changeTopbarTheme = async ({ payload: theme }) => {
  try {
    changeBodyAttribute('data-topbar', theme);
  } catch (error) {}
};

const changeLeftSidebarTheme = ({ payload: theme }) => {
  try {
    changeBodyAttribute('data-sidebar', theme);
  } catch (error) {}
};

const changeLayoutWidth = async ({ payload: width }) => {
  try {
    if (width === 'boxed') {
      changeLeftSidebarType({ sidebarType: 'icon' });
      changeBodyAttribute('data-layout-size', width);
      changeBodyAttribute('data-layout-scrollable', false);
    } else if (width === 'scrollable') {
      changeLeftSidebarType({ sidebarType: 'default' });
      changeBodyAttribute('data-layout-scrollable', true);
    } else {
      changeLeftSidebarType({ sidebarType: 'default' });
      changeBodyAttribute('data-layout-size', width);
      changeBodyAttribute('data-layout-scrollable', false);
    }
  } catch (error) {}
};


listenerMiddleware.startListening({
    actionCreator: changeLayout,
    effect: async (action, listenerApi) => {
        changeLayout(action.payload)
    }
})