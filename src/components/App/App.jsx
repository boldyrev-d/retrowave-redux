import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Sound from 'react-sound';

import Player from '../Player';

import { firstLoad, changeDuration, changePosition, changeVolume } from '../../AC';

import { RETRO_URL } from '../../constants/urlConstants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
`;

const fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 0.8;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${props => props.bg}) center;
  background-color: transparent;
  background-size: cover;
  filter: blur(100px);
  opacity: 0.8;
  z-index: -1;
  animation: ${fade} 4s ease-in-out;
`;

class App extends Component {
  componentWillMount() {
    if (!this.props.tracks || !this.props.tracks.length) {
      this.props.firstLoad();
    }
  }

  render() {
    const {
      currentTrack, playStatus, tracks, volume,
    } = this.props;

    return (
      <Wrapper>
        {tracks.length !== 0 && (
          <Fragment>
            <Background bg={`${RETRO_URL}${tracks[currentTrack].artworkUrl}`} />

            <Sound
              url={`${RETRO_URL}${tracks[currentTrack].streamUrl}`}
              playStatus={playStatus}
              volume={volume}
              // FIXME: get more accuracy
              onPlaying={this.props.changePosition}
              onLoad={this.props.changeDuration}
              onFinishedPlaying={this.handleNext}
            />

            <Player />
          </Fragment>
        )}
      </Wrapper>
    );
  }
}

export default connect(
  (state) => {
    const {
      currentTrack, playStatus, tracks, volume,
    } = state;

    return {
      currentTrack,
      playStatus,
      tracks,
      volume,
    };
  },
  {
    firstLoad,
    changeDuration,
    changePosition,
    changeVolume,
  },
)(App);
