import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import {
  changeLayout,
  changeLayoutMode,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  showRightSidebar,
} from './layoutSlice'

/**
 * Changes the body attribute
 */
function changeBodyAttribute(attribute, value) {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
}

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
function manageBodyClass(cssClass, action = 'toggle') {
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
}

/**
 * Changes the layout type
 * @param {*} param0
 */
function* changeLayoutSaga({ payload: layout }) {
  try {
    if (layout === 'horizontal') {
      yield put(changeTopbarTheme('light'));
      document.body.removeAttribute('data-sidebar');
      document.body.removeAttribute('data-sidebar-size');
    } else {
      yield put(changeTopbarTheme('light'));
    }
    yield call(changeBodyAttribute, 'data-layout', layout);
  } catch (error) {
    console.error('Error in changeLayoutSaga:', error);
  }
}

/**
 * Changes the layout mode
 * @param {*} param0
 */
function* changeLayoutModeSaga({ payload: layoutMode }) {
  try {
    if (layoutMode === 'light') {
      yield call(changeBodyAttribute, 'data-bs-theme', layoutMode);
      yield put(changeTopbarTheme('light'));
    } else if (layoutMode === 'dark') {
      yield call(changeBodyAttribute, 'data-bs-theme', layoutMode);
      yield put(changeTopbarTheme('dark'));
    }
  } catch (error) {
    console.error('Error in changeLayoutModeSaga:', error);
  }
}

/**
 * Changes the layout width
 * @param {*} param0
 */
function* changeLayoutWidthSaga({ payload: width }) {
  try {
    if (width === 'boxed') {
      yield put(changeSidebarType({ sidebarType: 'icon' }));
      yield call(changeBodyAttribute, 'data-layout-size', width);
      yield call(changeBodyAttribute, 'data-layout-scrollable', false);
    } else if (width === 'scrollable') {
      yield put(changeSidebarType({ sidebarType: 'default' }));
      yield call(changeBodyAttribute, 'data-layout-scrollable', true);
    } else {
      yield put(changeSidebarType({ sidebarType: 'default' }));
      yield call(changeBodyAttribute, 'data-layout-size', width);
      yield call(changeBodyAttribute, 'data-layout-scrollable', false);
    }
  } catch (error) {
    console.error('Error in changeLayoutWidthSaga:', error);
  }
}

/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
function* changeLeftSidebarThemeSaga({ payload: theme }) {
  try {
    yield call(changeBodyAttribute, 'data-sidebar', theme);
  } catch (error) {
    console.error('Error in changeLeftSidebarThemeSaga:', error);
  }
}

/**
 * Changes the topbar theme
 * @param {*} param0
 */
function* changeTopbarThemeSaga({ payload: theme }) {
  try {
    yield call(changeBodyAttribute, 'data-topbar', theme);
  } catch (error) {
    console.error('Error in changeTopbarThemeSaga:', error);
  }
}

/**
 * Changes the left sidebar type
 * @param {*} param0
 */
function* changeLeftSidebarTypeSaga({ payload: { sidebarType, isMobile } }) {
  try {
    switch (sidebarType) {
      case 'compact':
        yield call(changeBodyAttribute, 'data-sidebar-size', 'small');
        yield call(manageBodyClass, 'sidebar-enable', 'remove');
        yield call(manageBodyClass, 'vertical-collpsed', 'remove');
        break;
      case 'icon':
        yield call(changeBodyAttribute, 'data-sidebar-size', '');
        yield call(changeBodyAttribute, 'data-keep-enlarged', 'true');
        yield call(manageBodyClass, 'vertical-collpsed', 'add');
        break;
      case 'condensed':
        yield call(manageBodyClass, 'sidebar-enable', 'add');
        if (window.screen.width >= 992) {
          yield call(manageBodyClass, 'vertical-collpsed', 'remove');
          yield call(manageBodyClass, 'sidebar-enable', 'remove');
          yield call(manageBodyClass, 'vertical-collpsed', 'add');
          yield call(manageBodyClass, 'sidebar-enable', 'add');
        } else {
          yield call(manageBodyClass, 'sidebar-enable', 'add');
          yield call(manageBodyClass, 'vertical-collpsed', 'add');
        }
        break;
      default:
        yield call(changeBodyAttribute, 'data-sidebar-size', '');
        yield call(manageBodyClass, 'sidebar-enable', 'remove');
        if (!isMobile)
          yield call(manageBodyClass, 'vertical-collpsed', 'remove');
        break;
    }
  } catch (error) {
    console.error('Error in changeLeftSidebarTypeSaga:', error);
  }
}

/**
 * Show the rightsidebar
 */
function* showRightSidebarSaga() {
  try {
    yield call(manageBodyClass, 'right-bar-enabled', 'add');
  } catch (error) {
    console.error('Error in showRightSidebarSaga:', error);
  }
}

/**
 * Watchers
 */
export function* watchChangeLayoutType() {
  yield takeEvery(changeLayout, changeLayoutSaga);
}

export function* watchChangeLayoutModeType() {
  yield takeEvery(changeLayoutMode, changeLayoutModeSaga);
}

export function* watchChangeLayoutWidth() {
  yield takeEvery(changeLayoutWidth, changeLayoutWidthSaga);
}

export function* watchChangeLeftSidebarTheme() {
  yield takeEvery(changeSidebarTheme, changeLeftSidebarThemeSaga);
}

export function* watchChangeLeftSidebarType() {
  yield takeEvery(changeSidebarType, changeLeftSidebarTypeSaga);
}

export function* watchChangeTopbarTheme() {
  yield takeEvery(changeTopbarTheme, changeTopbarThemeSaga);
}

export function* watchShowRightSidebar() {
  yield takeEvery(showRightSidebar, showRightSidebarSaga);
}

function* LayoutSaga() {
  yield all([
    fork(watchChangeLayoutType),
    fork(watchChangeLayoutModeType),
    fork(watchChangeLayoutWidth),
    fork(watchChangeLeftSidebarTheme),
    fork(watchChangeLeftSidebarType),
    fork(watchShowRightSidebar),
    fork(watchChangeTopbarTheme),
  ]);
}

export default LayoutSaga;
