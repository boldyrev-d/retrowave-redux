import { START, SUCCESS, FAIL } from '../constants/actionTypes';

export default () => next => (action) => {
  const { callAPI, type, ...rest } = action;
  if (!callAPI) return next(action);

  next({ ...rest, type: type + START });

  return fetch(callAPI)
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(response => next({ ...rest, type: type + SUCCESS, payload: response }))
    .catch(error => next({ ...rest, type: type + FAIL, error: error.message }));
};
