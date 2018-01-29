import reducer from './index';
import { playStatuses } from '../constants/playerConstants';
import * as types from '../constants/actionTypes';

const defaultState = {
  currentTrack: 0,
  playStatus: playStatuses.play,
  tracks: [],
  currentDuration: 0,
  currentPosition: 0,
  volume: 50,
};

describe('REDUCER', () => {
  describe('INIT STATE', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(defaultState);
    });
  });

  describe('FIRST_LOAD', () => {
    it('should handle FIRST_LOAD_SUCCESS', () => {
      expect(reducer(defaultState, {
        type: types.FIRST_LOAD + types.SUCCESS,
        payload: {
          status: 200,
          body: {
            cursor: 1,
            tracks: [
              {
                id: '243236a6b088274f35d66ae62f2661ef218db6f6',
                title: 'D.Notive – Second Chances',
                duration: 360000,
                streamUrl: '/audio/243236a6b088274f35d66ae62f2661ef218db6f6.mp3',
                artworkUrl: '/artwork/243236a6b088274f35d66ae62f2661ef218db6f6.png',
              },
            ],
          },
        },
      })).toEqual({
        currentTrack: 0,
        playStatus: playStatuses.play,
        tracks: [
          {
            id: '243236a6b088274f35d66ae62f2661ef218db6f6',
            title: 'D.Notive – Second Chances',
            duration: 360000,
            streamUrl: '/audio/243236a6b088274f35d66ae62f2661ef218db6f6.mp3',
            artworkUrl: '/artwork/243236a6b088274f35d66ae62f2661ef218db6f6.png',
          },
        ],
        currentDuration: 0,
        currentPosition: 0,
        volume: 50,
      });
    });
  });

  describe('SWITCH_TO_PREVIOUS_TRACK', () => {
    it('should handle SWITCH_TO_PREVIOUS_TRACK when the current track is 0', () => {
      expect(reducer(
        {
          currentTrack: 0,
          playStatus: playStatuses.play,
          tracks: [],
          currentDuration: 0,
          currentPosition: 0,
          volume: 50,
        },
        {
          type: types.SWITCH_TO_PREVIOUS_TRACK,
        },
      )).toEqual({
        currentTrack: 0,
        playStatus: playStatuses.play,
        tracks: [],
        currentDuration: 0,
        currentPosition: 0,
        volume: 50,
      });
    });

    it('should handle SWITCH_TO_PREVIOUS_TRACK when the current track is not 0', () => {
      expect(reducer(
        {
          currentTrack: 1,
          playStatus: playStatuses.pause,
          tracks: [
            {
              id: '22ea2a7715fe109547c5c8a5ee47418873bcd85a',
              title: 'Moondragon – Eye in the Sky',
            },
            {
              id: '3f761abec5383126c956079c5b67013508bc6818',
              title: 'Muscle – Our Bodies In Heat',
            },
          ],
          currentDuration: 0,
          currentPosition: 0,
          volume: 50,
        },
        {
          type: types.SWITCH_TO_PREVIOUS_TRACK,
        },
      )).toEqual({
        currentTrack: 0,
        playStatus: playStatuses.play,
        tracks: [
          {
            id: '22ea2a7715fe109547c5c8a5ee47418873bcd85a',
            title: 'Moondragon – Eye in the Sky',
          },
          {
            id: '3f761abec5383126c956079c5b67013508bc6818',
            title: 'Muscle – Our Bodies In Heat',
          },
        ],
        currentDuration: 0,
        currentPosition: 0,
        volume: 50,
      });
    });
  });

  describe('SWITCH_TO_NEXT_TRACK', () => {
    it('should handle SWITCH_TO_NEXT_TRACK', () => {
      expect(reducer(defaultState, { type: types.SWITCH_TO_NEXT_TRACK })).toEqual({
        currentTrack: 1,
        playStatus: playStatuses.play,
        tracks: [],
        currentDuration: 0,
        currentPosition: 0,
        volume: 50,
      });
    });
  });

  describe('LOAD_NEXT_TRACK_SUCCESS', () => {
    it('should handle LOAD_NEXT_TRACK_SUCCESS', () => {
      expect(reducer(
        {
          currentTrack: 0,
          playStatus: playStatuses.pause,
          tracks: [
            {
              id: '243236a6b088274f35d66ae62f2661ef218db6f6',
              title: 'D.Notive – Second Chances',
              duration: 360000,
              streamUrl: '/audio/243236a6b088274f35d66ae62f2661ef218db6f6.mp3',
              artworkUrl: '/artwork/243236a6b088274f35d66ae62f2661ef218db6f6.png',
            },
          ],
          currentDuration: 0,
          currentPosition: 0,
          volume: 50,
        },
        {
          type: types.LOAD_NEXT_TRACK + types.SUCCESS,
          payload: {
            status: 200,
            body: {
              cursor: 1,
              tracks: [
                {
                  id: '7aac5c4753ca9859e3c67685c72b5a8529f14e67',
                  title: 'Prius An Sich – Hyperion Booster',
                  duration: 273244.25,
                  streamUrl: '/audio/7aac5c4753ca9859e3c67685c72b5a8529f14e67.mp3',
                  artworkUrl: '/artwork/7aac5c4753ca9859e3c67685c72b5a8529f14e67.jpg',
                },
              ],
            },
          },
        },
      )).toEqual({
        currentTrack: 1,
        playStatus: playStatuses.play,
        tracks: [
          {
            id: '243236a6b088274f35d66ae62f2661ef218db6f6',
            title: 'D.Notive – Second Chances',
            duration: 360000,
            streamUrl: '/audio/243236a6b088274f35d66ae62f2661ef218db6f6.mp3',
            artworkUrl: '/artwork/243236a6b088274f35d66ae62f2661ef218db6f6.png',
          },
          {
            id: '7aac5c4753ca9859e3c67685c72b5a8529f14e67',
            title: 'Prius An Sich – Hyperion Booster',
            duration: 273244.25,
            streamUrl: '/audio/7aac5c4753ca9859e3c67685c72b5a8529f14e67.mp3',
            artworkUrl: '/artwork/7aac5c4753ca9859e3c67685c72b5a8529f14e67.jpg',
          },
        ],
        currentDuration: 0,
        currentPosition: 0,
        volume: 50,
      });
    });
  });

  describe('CHANGE_PLAY_STATUS', () => {
    it('should handle CHANGE_PLAY_STATUS and change status from play to pause', () => {
      expect(reducer(
        {
          currentTrack: 0,
          playStatus: playStatuses.play,
          tracks: [],
          currentDuration: 0,
          currentPosition: 0,
          volume: 50,
        },
        { type: types.CHANGE_PLAY_STATUS },
      )).toEqual({
        currentTrack: 0,
        playStatus: playStatuses.pause,
        tracks: [],
        currentDuration: 0,
        currentPosition: 0,
        volume: 50,
      });
    });

    it('should handle CHANGE_PLAY_STATUS and change status from pause to play', () => {
      expect(reducer(
        {
          currentTrack: 0,
          playStatus: playStatuses.pause,
          tracks: [],
          currentDuration: 0,
          currentPosition: 0,
          volume: 50,
        },
        { type: types.CHANGE_PLAY_STATUS },
      )).toEqual({
        currentTrack: 0,
        playStatus: playStatuses.play,
        tracks: [],
        currentDuration: 0,
        currentPosition: 0,
        volume: 50,
      });
    });
  });

  describe('CHANGE_TRACK_DURATION', () => {
    it('should handle CHANGE_TRACK_DURATION with 1000', () => {
      expect(reducer(
        {
          currentTrack: 0,
          playStatus: playStatuses.play,
          tracks: [],
          currentDuration: 0,
          currentPosition: 0,
          volume: 50,
        },
        { type: types.CHANGE_TRACK_DURATION, payload: { duration: 1000 } },
      )).toEqual({
        currentTrack: 0,
        playStatus: playStatuses.play,
        tracks: [],
        currentDuration: 1000,
        currentPosition: 0,
        volume: 50,
      });
    });
  });

  describe('CHANGE_TRACK_POSITION', () => {
    it('should handle CHANGE_TRACK_POSITION with 100', () => {
      expect(reducer(
        {
          currentTrack: 0,
          playStatus: playStatuses.play,
          tracks: [],
          currentDuration: 0,
          currentPosition: 0,
          volume: 50,
        },
        { type: types.CHANGE_TRACK_POSITION, payload: { position: 100 } },
      )).toEqual({
        currentTrack: 0,
        playStatus: playStatuses.play,
        tracks: [],
        currentDuration: 0,
        currentPosition: 100,
        volume: 50,
      });
    });
  });

  describe('CHANGE_VOLUME', () => {
    it('should handle CHANGE_VOLUME with 75', () => {
      expect(reducer(
        {
          currentTrack: 0,
          playStatus: playStatuses.play,
          tracks: [],
          currentDuration: 0,
          currentPosition: 0,
          volume: 50,
        },
        { type: types.CHANGE_VOLUME, payload: { volume: 75 } },
      )).toEqual({
        currentTrack: 0,
        playStatus: playStatuses.play,
        tracks: [],
        currentDuration: 0,
        currentPosition: 0,
        volume: 75,
      });
    });
  });

  describe('VOLUME_UP', () => {
    it('should handle VOLUME_UP when the volume is not maximum', () => {
      expect(reducer(
        {
          currentTrack: 0,
          playStatus: playStatuses.play,
          tracks: [],
          currentDuration: 0,
          currentPosition: 0,
          volume: 50,
        },
        { type: types.VOLUME_UP },
      )).toEqual({
        currentTrack: 0,
        playStatus: playStatuses.play,
        tracks: [],
        currentDuration: 0,
        currentPosition: 0,
        volume: 51,
      });
    });

    it('should handle VOLUME_UP when the volume is maximum', () => {
      expect(reducer(
        {
          currentTrack: 0,
          playStatus: playStatuses.play,
          tracks: [],
          currentDuration: 0,
          currentPosition: 0,
          volume: 100,
        },
        { type: types.VOLUME_UP },
      )).toEqual({
        currentTrack: 0,
        playStatus: playStatuses.play,
        tracks: [],
        currentDuration: 0,
        currentPosition: 0,
        volume: 100,
      });
    });
  });

  describe('VOLUME_DOWN', () => {
    it('should handle VOLUME_DOWN when the volume is not minimum', () => {
      expect(reducer(
        {
          currentTrack: 0,
          playStatus: playStatuses.play,
          tracks: [],
          currentDuration: 0,
          currentPosition: 0,
          volume: 50,
        },
        { type: types.VOLUME_DOWN },
      )).toEqual({
        currentTrack: 0,
        playStatus: playStatuses.play,
        tracks: [],
        currentDuration: 0,
        currentPosition: 0,
        volume: 49,
      });
    });

    it('should handle VOLUME_DOWN when the volume is minimum', () => {
      expect(reducer(
        {
          currentTrack: 0,
          playStatus: playStatuses.play,
          tracks: [],
          currentDuration: 0,
          currentPosition: 0,
          volume: 0,
        },
        { type: types.VOLUME_DOWN },
      )).toEqual({
        currentTrack: 0,
        playStatus: playStatuses.play,
        tracks: [],
        currentDuration: 0,
        currentPosition: 0,
        volume: 0,
      });
    });
  });

  describe('UNEXPECTED ACTION', () => {
    it('should handle unexpected action', () => {
      expect(reducer(
        {
          tracks: [{ id: '123' }],
        },
        { type: 'UNEXPECTED ACTION 9a0j901j92j021' },
      )).toEqual({
        tracks: [{ id: '123' }],
      });
    });
  });
});
