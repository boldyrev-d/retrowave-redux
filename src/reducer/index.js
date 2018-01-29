import { playStatuses } from '../constants/playerConstants';
import {
  FIRST_LOAD,
  SWITCH_TO_PREVIOUS_TRACK,
  SWITCH_TO_NEXT_TRACK,
  LOAD_NEXT_TRACK,
  CHANGE_PLAY_STATUS,
  CHANGE_TRACK_DURATION,
  CHANGE_TRACK_POSITION,
  CHANGE_VOLUME,
  VOLUME_UP,
  VOLUME_DOWN,
  SUCCESS,
} from '../constants/actionTypes';

const defaultState = {
  currentTrack: 0,
  playStatus: playStatuses.play,
  tracks: [],
  currentDuration: 0,
  currentPosition: 0,
  volume: 50,
};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FIRST_LOAD + SUCCESS:
      return {
        ...state,
        tracks: [...payload.body.tracks],
      };

    case SWITCH_TO_PREVIOUS_TRACK:
      if (state.currentTrack) {
        return {
          ...state,
          currentTrack: state.currentTrack - 1,
          playStatus: playStatuses.play,
        };
      }
      break;

    case SWITCH_TO_NEXT_TRACK: {
      return {
        ...state,
        currentTrack: state.currentTrack + 1,
        playStatus: playStatuses.play,
      };
    }

    case LOAD_NEXT_TRACK + SUCCESS:
      return {
        ...state,
        currentTrack: state.currentTrack + 1,
        playStatus: playStatuses.play,
        tracks: [...state.tracks, ...payload.body.tracks],
      };

    case CHANGE_PLAY_STATUS:
      if (state.playStatus === playStatuses.play) {
        return {
          ...state,
          playStatus: playStatuses.pause,
        };
      }
      return {
        ...state,
        playStatus: playStatuses.play,
      };

    case CHANGE_TRACK_DURATION:
      return {
        ...state,
        currentDuration: payload.duration,
      };

    // FIXME: get more accuracy
    case CHANGE_TRACK_POSITION:
      return {
        ...state,
        currentPosition: payload.position,
      };

    case CHANGE_VOLUME:
      return {
        ...state,
        volume: payload.volume,
      };

    case VOLUME_UP:
      return {
        ...state,
        volume: state.volume === 100 ? state.volume : state.volume + 1,
      };

    case VOLUME_DOWN:
      return {
        ...state,
        volume: state.volume === 0 ? state.volume : state.volume - 1,
      };

    default:
      return state;
  }

  return state;
};
