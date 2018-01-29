import * as actions from './index';
import * as urls from '../constants/urlConstants';
import * as types from '../constants/actionTypes';

describe('ACTION CREATORS', () => {
  it('should create an action to init load first track', () => {
    const expectedAction = {
      type: types.FIRST_LOAD,
      callAPI: `${urls.RETRO_API_URL}/tracks?limit=1`,
    };

    expect(actions.firstLoad()).toEqual(expectedAction);
  });

  it('should create an action to switch to previous track', () => {
    const expectedAction = {
      type: types.SWITCH_TO_PREVIOUS_TRACK,
    };

    expect(actions.switchToPreviousTrack()).toEqual(expectedAction);
  });

  it('should create an action to switch to next track', () => {
    const expectedAction = {
      type: types.SWITCH_TO_NEXT_TRACK,
    };

    expect(actions.switchToNextTrack()).toEqual(expectedAction);
  });

  it('should create an action to change play status', () => {
    const expectedAction = {
      type: types.CHANGE_PLAY_STATUS,
    };

    expect(actions.changePlayStatus()).toEqual(expectedAction);
  });

  it('should create an action to change volume to 66', () => {
    const expectedAction = {
      type: types.CHANGE_VOLUME,
      payload: { volume: 66 },
    };

    expect(actions.changeVolume(66)).toEqual(expectedAction);
  });

  it('should create an action to change volume to -66', () => {
    const expectedAction = {
      type: types.CHANGE_VOLUME,
      payload: { volume: -66 },
    };

    expect(actions.changeVolume(-66)).toEqual(expectedAction);
  });

  it('should create an action to volume up', () => {
    const expectedAction = {
      type: types.VOLUME_UP,
    };

    expect(actions.volumeUp()).toEqual(expectedAction);
  });

  it('should create an action to volume dowm', () => {
    const expectedAction = {
      type: types.VOLUME_DOWN,
    };

    expect(actions.volumeDown()).toEqual(expectedAction);
  });

  it('should create an action to change track duration', () => {
    const expectedTrackObject = {
      position: 1500,
      duration: 30000,
    };

    const expectedAction = {
      type: types.CHANGE_TRACK_DURATION,
      payload: expectedTrackObject,
    };

    expect(actions.changeDuration(expectedTrackObject)).toEqual(expectedAction);
  });

  it('should create an action to change track position', () => {
    const expectedTrackObject = {
      position: 1500,
      duration: 30000,
    };

    const expectedAction = {
      type: types.CHANGE_TRACK_POSITION,
      payload: expectedTrackObject,
    };

    expect(actions.changePosition(expectedTrackObject)).toEqual(expectedAction);
  });
});
