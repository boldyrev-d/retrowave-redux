import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Sound from 'react-sound';

import { msToTime } from './utils/displayUtils';

import { RETRO_URL } from './constants/urlConstants';
import { playStatuses } from './constants/playerConstants';

import {
  firstLoad,
  switchToPreviousTrack,
  switchToNextTrack,
  changePlayStatus,
  changeDuration,
  changePosition,
  changeVolume,
} from './AC';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
`;

class App extends Component {
  componentWillMount() {
    if (!this.props.tracks || !this.props.tracks.length) {
      this.props.firstLoad();
    }
  }

  handleVolume = (ev) => {
    const volume = parseInt(ev.target.value, 10);
    this.props.changeVolume(volume);
  };

  render() {
    const {
      currentTrack,
      currentPosition,
      currentDuration,
      playStatus,
      tracks,
      volume,
    } = this.props;

    const soundComponent = tracks.length ? (
      <Sound
        url={`${RETRO_URL}${tracks[currentTrack].streamUrl}`}
        playStatus={playStatus}
        volume={this.props.volume}
        // FIXME: get more accuracy
        onPlaying={this.props.changePosition}
        onLoad={this.props.changeDuration}
        onFinishedPlaying={this.handleNext}
      />
    ) : null;

    return (
      <Wrapper>
        {soundComponent}

        <div>
          <button disabled={!currentTrack} onClick={this.props.switchToPreviousTrack}>
            PREV
          </button>
          <button onClick={this.props.changePlayStatus}>
            {playStatus === playStatuses.play ? 'PAUSE' : 'PLAY'}
          </button>
          <button onClick={this.props.switchToNextTrack}>NEXT</button>
        </div>

        <div>
          <span>{msToTime(currentPosition)}</span> / <span>{msToTime(currentDuration)}</span>
        </div>

        <div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={this.handleVolume}
          />
        </div>
      </Wrapper>
    );
  }
}

export default connect(
  (state) => {
    const {
      currentTrack, playStatus, tracks, currentDuration, currentPosition, volume,
    } = state;

    return {
      currentTrack,
      playStatus,
      tracks,
      currentDuration,
      currentPosition,
      volume,
    };
  },
  {
    firstLoad,
    switchToPreviousTrack,
    switchToNextTrack,
    changePlayStatus,
    changeDuration,
    changePosition,
    changeVolume,
  },
)(App);
