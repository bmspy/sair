import { UI_START_LOADING, UI_STOP_LOADING, SET_RELOAD } from './ActionTypes'

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    }
}

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    }
}

export const setReload = () => {
    return {
      type: SET_RELOAD,
    };
  };
  