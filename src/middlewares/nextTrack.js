import { RETRO_API_URL } from '../constants/urlConstants';
import { SWITCH_TO_NEXT_TRACK, LOAD_NEXT_TRACK } from '../constants/actionTypes';

export default store => next => (action) => {
  const { type, ...rest } = action;
  if (type !== SWITCH_TO_NEXT_TRACK) return next(action);

  if (store.getState().currentTrack + 1 >= store.getState().tracks.length) {
    return next({
      ...rest,
      type: LOAD_NEXT_TRACK,
      callAPI: `${RETRO_API_URL}/tracks?limit=1`,
    });
  }
  return next({ ...rest, type });
};
