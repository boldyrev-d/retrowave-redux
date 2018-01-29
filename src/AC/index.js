import { RETRO_API_URL } from '../constants/urlConstants';
import {
  FIRST_LOAD,
  SWITCH_TO_PREVIOUS_TRACK,
  SWITCH_TO_NEXT_TRACK,
  CHANGE_PLAY_STATUS,
  CHANGE_TRACK_DURATION,
  CHANGE_TRACK_POSITION,
  CHANGE_VOLUME,
  VOLUME_UP,
  VOLUME_DOWN,
} from '../constants/actionTypes';

export const firstLoad = () => ({
  type: FIRST_LOAD,
  callAPI: `${RETRO_API_URL}/tracks?limit=1`,
});

export const switchToPreviousTrack = () => ({
  type: SWITCH_TO_PREVIOUS_TRACK,
});

export const changePlayStatus = () => ({
  type: CHANGE_PLAY_STATUS,
});

export const switchToNextTrack = () => ({
  type: SWITCH_TO_NEXT_TRACK,
});

export const changeDuration = trackObject => ({
  type: CHANGE_TRACK_DURATION,
  payload: trackObject,
});

// FIXME: get more accuracy
export const changePosition = trackObject => ({
  type: CHANGE_TRACK_POSITION,
  payload: trackObject,
});

export const changeVolume = volume => ({
  type: CHANGE_VOLUME,
  payload: { volume },
});

export const volumeUp = () => ({
  type: VOLUME_UP,
});

export const volumeDown = () => ({
  type: VOLUME_DOWN,
});
