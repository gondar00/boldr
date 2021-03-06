import { normalize } from 'normalizr';

import api, { API_PREFIX } from '../../../../core/api';
import { sendNotification } from '../../../../state';
import * as notif from '../../../../core/constants';
import {
  user as userSchema,
  arrayOfUsers,
} from '../../../../state/modules/users/schema';
import * as t from '../actionTypes';

/**
  * FETCH MEMBERS ACTIONS
  * -------------------------
  * @exports fetchMembers
  *****************************************************************/
export const fetchMembers = (axios: any): ThunkAction => (
  dispatch: Dispatch,
) => {
  dispatch({ type: t.LOAD_MEMBERS_REQUEST });

  return axios
    .get(`${API_PREFIX}/users?include=[roles]`)
    .then(res => {
      const users = res.data.results;
      const normalizedUsers = normalize(users, arrayOfUsers);

      dispatch({
        type: t.LOAD_MEMBERS_SUCCESS,
        payload: normalizedUsers,
      });
    })
    .catch(err => {
      dispatch({
        type: t.LOAD_MEMBERS_FAILURE,
        error: err,
      });
    });
};
/* istanbul ignore next */
export const fetchMembersIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldFetchMembers(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchMembers(axios));
  }

  /* istanbul ignore next */
  return null;
};

function shouldFetchMembers(state) {
  const { ids } = state.admin.members;
  if (!ids.length) {
    return true;
  }
  return false;
}

/**
  * UPDATE MEMBER ACTIONS
  * -------------------------
  * @exports updateMember
  *****************************************************************/

export function updateMember(userData) {
  const data = {
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    avatarUrl: userData.avatarUrl,
    role: userData.role,
  };
  return dispatch => {
    dispatch(beginUpdateMember());
    return api
      .put(`${API_PREFIX}/users/admin/${userData.id}`, data)
      .then(res => {
        const updatedUser = res.data;
        const normalizedUser = normalize(updatedUser, userSchema);
        dispatch(doneUpdateMember(normalizedUser));
        dispatch(sendNotification(notif.MSG_UPDATE_MEMBER_SUCCESS));
      })
      .catch(err => {
        dispatch(failUpdateMember(err.message));
        dispatch(sendNotification(notif.MSG_UPDATE_MEMBER_ERROR));
      });
  };
}

const beginUpdateMember = () => {
  return { type: t.UPDATE_MEMBER_REQUEST };
};

const doneUpdateMember = normalizedUser => {
  return {
    type: t.UPDATE_MEMBER_SUCCESS,
    payload: normalizedUser,
  };
};

const failUpdateMember = err => {
  return {
    type: t.UPDATE_MEMBER_FAILURE,
    error: err,
  };
};

/**
  * SELECT MEMBER ACTIONS
  * -------------------------
  * @exports memberSelected
  *****************************************************************/

export function memberSelected(user) {
  return {
    type: t.MEMBER_SELECTED,
    payload: user,
  };
}
