import { connect } from 'react-redux'
import {
  ExtractDispatchers,
  MapStateToProps,
  MapDispatchToProps
} from 'react-retux'
import { StoreState, StoreAction } from '@/content/redux/modules'
import { isStandalonePage } from '@/_helpers/saladict'
import { newWord } from '@/_helpers/record-manager'
import { message } from '@/_helpers/browser-api'
import { MenuBar, MenuBarProps } from './MenuBar'

type Dispatchers = ExtractDispatchers<
  MenuBarProps,
  | 'searchText'
  | 'updateText'
  | 'addToNoteBook'
  | 'updateHistoryIndex'
  | 'togglePin'
  | 'onClose'
  | 'onSwitchSidebar'
  | 'onDragAreaMouseDown'
  | 'onDragAreaTouchStart'
  | 'onHeightChanged'
>

const mapStateToProps: MapStateToProps<
  StoreState,
  MenuBarProps,
  Dispatchers
> = state => ({
  text: state.text,
  isInNotebook: state.isFav,
  shouldFocus: !state.isExpandMtaBox && (state.isQSPanel || isStandalonePage()),
  enableSuggest: state.config.searchSuggests,
  histories: state.searchHistory,
  historyIndex: state.historyIndex,
  profiles: state.profiles,
  activeProfileId: state.activeProfile.id,
  isPinned: state.isPinned
})

const mapDispatchToProps: MapDispatchToProps<
  StoreAction,
  MenuBarProps,
  Dispatchers
> = dispatch => ({
  searchText: text => {
    dispatch({
      type: 'SEARCH_START',
      payload: {
        word: newWord({
          text,
          title: 'Saladict',
          favicon: 'https://saladict.crimx.com/favicon.ico'
        })
      }
    })
  },
  updateText: text => {
    dispatch({ type: 'UPDATE_TEXT', payload: text })
  },
  addToNoteBook: () => {
    dispatch({ type: 'ADD_TO_NOTEBOOK' })
  },
  updateHistoryIndex: index => {
    dispatch({ type: 'UPDATE_HISTORY_INDEX', payload: index })
    dispatch({ type: 'SEARCH_START', payload: { noHistory: true } })
  },
  togglePin: () => {
    dispatch({ type: 'TOGGLE_PIN' })
  },
  onClose: () => {
    if (isStandalonePage()) {
      window.close()
    } else {
      dispatch({ type: 'CLOSE_PANEL' })
    }
  },
  onSwitchSidebar: (side: 'left' | 'right') => {
    message.send({ type: 'QS_SWITCH_SIDEBAR', payload: side })
  },
  onHeightChanged: (height: number) => {
    dispatch({
      type: 'UPDATE_PANEL_HEIGHT',
      payload: {
        area: 'menubar',
        height: 30,
        floatHeight: height
      }
    })
  },
  onDragAreaMouseDown: event => {
    dispatch({
      type: 'DRAG_START_COORD',
      payload: {
        x: event.clientX,
        y: event.clientY
      }
    })
  },
  onDragAreaTouchStart: event => {
    dispatch({
      type: 'DRAG_START_COORD',
      payload: {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY
      }
    })
  }
})

export const MenuBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar)

export default MenuBarContainer
