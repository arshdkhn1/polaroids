/*eslint import/namespace: ['error', { allowComputed: true }]*/
import * as types from '../constants/actionTypes';
import fetch from 'unfetch';

const captialize = str =>  str[0].toUpperCase() + str.slice(1);

export function getInitialState(cb, page) {
  return (dispatch) => {
    fetch(`/api/get${captialize(page)}Data`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.status >= 400) {
        throw new Error(response);
      } else {
        return response.json();
      }
    })
    .then(data => {
      dispatch(
        {
          type: types[`UPDATE_${page.toUpperCase()}_STATE`],
          payload: data
        }
      );
      cb();
    })
    .catch(err => {
      /* eslint-disable no-console */
      console.error(`Got error:${err} while dispatching GET_INITIAL_${page.toUpperCase()}_STATE!`);
      cb();
    });
  };
}

export function updateItemLikes(change, pos) {
  return (dispatch) => {
    dispatch(
      {
        type: types.UPDATE_MY_ITEM_LIKES,
        payload: {change, pos}
      }
    );

    dispatch(
      {
        type: types.UPDATE_ITEM_LIKES,
        payload: {change, pos}
      }
    );
  };
}
