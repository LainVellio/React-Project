import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api';
import { setGlobalError } from './app-reducer';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: {
    userId,
    email,
    login,
    isAuth,
  },
});
export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const getAuthUserData = () => async (dispatch) => {
  try {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
      const { id, email, login } = response.data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  } catch (error) {
    dispatch(setGlobalError(error));
  }
};

export const login = (email, password, rememberMe, captcha = null) => async (
  dispatch,
) => {
  try {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
      const message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : 'Some error';
      dispatch(stopSubmit('login', { _error: message }));
    }
  } catch (error) {
    dispatch(setGlobalError(error));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  } catch (error) {
    dispatch(setGlobalError(error));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  try {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  } catch (error) {
    dispatch(setGlobalError(error));
  }
};

export default authReducer;
