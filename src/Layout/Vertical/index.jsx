import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import withRouter from '../../components/common/withRouter';

import { useSelector, useDispatch } from 'react-redux';

import {
  changeLayout,
  changeLayoutMode,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
  showRightSidebar,
} from '../../store/layout/layoutSlice';
import { createSelector } from 'reselect';

const VerticalLayout = ({ children }) => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.layout;

  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutModeTypes: layout.layoutModeTypes,
      leftSideBarType: layout.leftSideBarType,
      layoutWidth: layout.layoutWidth,
      topbarTheme: layout.topbarTheme,
      showRightSidebar: layout.showRightSidebar,
      leftSideBarTheme: layout.leftSideBarTheme,
    })
  );

  const {
    layoutModeTypes,
    layoutWidth,
    leftSideBarTheme,
    topbarTheme,
    showRightSidebar,
    leftSideBarType,
  } = useSelector(selectLayoutProperties);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = () => {
    if (leftSideBarType === 'default') {
      dispatch(changeSidebarType('condensed', isMobile));
    } else if (leftSideBarType === 'condensed') {
      dispatch(changeSidebarType('default', isMobile));
    }
  };

  const hideRightbar = useCallback(
    (event) => {
      var rightbar = document.getElementById('right-bar');

      if (rightbar && rightbar.contains(event.target)) {
        return;
      } else {
        // if clicked in outside of rightbar then fire action for hide rightbar
        dispatch(showRightSidebar(false));
      }
    },
    [dispatch]
  );

  /*
    Layout settings
    */

  useEffect(() => {
    if (
      layoutModeTypes ||
      leftSideBarTheme ||
      layoutWidth ||
      leftSideBarType ||
      topbarTheme
    ) {
      window.dispatchEvent(new Event('resize'));
      dispatch(changeLayout('vertical'));
      dispatch(changeLayoutMode(layoutModeTypes));
      dispatch(changeSidebarTheme(leftSideBarTheme));
      dispatch(changeLayoutWidth(layoutWidth));
      dispatch(changeSidebarType(leftSideBarType));
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [
    layoutModeTypes,
    leftSideBarTheme,
    layoutWidth,
    leftSideBarType,
    topbarTheme,
    dispatch,
  ]);

  useEffect(() => {
    document.body.addEventListener('click', hideRightbar, true);
  }, [hideRightbar]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id='layout-wrapper'>
        <div className='main-content'>{children}</div>
      </div>
    </>
  );
};

VerticalLayout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeLayoutMode: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
};

export default withRouter(VerticalLayout)