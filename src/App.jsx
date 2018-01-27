import React, { Component } from 'react';
import styled from 'styled-components';
import Sound from 'react-sound';

import { playStatuses } from './constants';

const RETRO_URL = 'https://retrowave.ru';

function msToTime(ms) {
  let seconds = parseInt((ms / 1000) % 60, 10);
  let minutes = parseInt((ms / (1000 * 60)) % 60, 10);
  let hours = parseInt((ms / (1000 * 60 * 60)) % 24, 10);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  if (ms > 1000 * 60 * 60) {
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
`;

class App extends Component {
  state = {
    currentTrack: 0,
    cursor: 3,
    playStatus: playStatuses.play,
    tracks: [],
    currentDuration: 0,
    currentPosition: 0,
  };

  componentWillMount() {
    if (!this.state.tracks || !this.state.tracks.length) {
      fetch(`https://retrowave.ru/api/v1/tracks?cursor=${this.state.cursor}&limit=3`)
        .then(res => res.json())
        .then(({ body: { tracks } }) => {
          this.setState(
            {
              tracks: [...this.state.tracks, ...tracks],
            },
            () => console.log('---', this.state),
          );
        });
    }
  }

  handlePrev = () => {
    if (this.state.currentTrack) {
      this.setState(
        {
          currentTrack: this.state.currentTrack - 1,
        },
        () => console.log(this.state),
      );
    }
  };

  // TODO: maybe load another track immediately after the next track
  handlePlay = () => {
    const { playStatus } = this.state;

    let newStatus;
    if (playStatus === playStatuses.play) {
      newStatus = playStatuses.pause;
    } else {
      newStatus = playStatuses.play;
    }

    this.setState({
      playStatus: newStatus,
    });
  };

  handleNext = () => {
    console.log('---', this.state);

    if (this.state.currentTrack + 1 >= this.state.tracks.length) {
      fetch(`https://retrowave.ru/api/v1/tracks?cursor=${this.state.cursor}&limit=1`)
        .then(res => res.json())
        .then(({ body: { tracks } }) => {
          this.setState(
            {
              currentTrack: this.state.currentTrack + 1,
              playStatus: playStatuses.play,
              tracks: [...this.state.tracks, ...tracks],
            },
            () => console.log('---', this.state),
          );
        });
    } else {
      this.setState(
        {
          currentTrack: this.state.currentTrack + 1,
          playStatus: playStatuses.play,
        },
        () => console.log('---', this.state),
      );
    }
  };

  // FIXME: get more accuracy
  displayPosition = (trackObject) => {
    // console.log('trackObject.position', msToTime(trackObject.position));
    // console.log('this.state.currentPosition', msToTime(this.state.currentPosition));

    if (msToTime(trackObject.position) !== msToTime(this.state.currentPosition)) {
      this.setState({
        currentPosition: trackObject.position,
      });
    }
  };

  displayDuration = (trackObject) => {
    // console.log('trackObject.duration', trackObject.duration);
    this.setState({
      currentDuration: trackObject.duration,
    });
  };

  render() {
    const {
      currentTrack, currentPosition, currentDuration, playStatus, tracks,
    } = this.state;

    console.log('RENDER');

    return (
      <Wrapper>
        {this.state.tracks.length && (
          <Sound
            url={`${RETRO_URL}${tracks[currentTrack].streamUrl}`}
            playStatus={playStatus}
            // FIXME: get more accuracy
            onPlaying={this.displayPosition}
            onLoad={this.displayDuration}
            onFinishedPlaying={this.handleNext}
          />
        )}
        <div>
          <button disabled={!this.state.currentTrack} onClick={this.handlePrev}>
            PREV
          </button>
          <button onClick={this.handlePlay}>PLAY</button>
          <button onClick={this.handleNext}>NEXT</button>
        </div>
        <div>
          <span>{msToTime(currentPosition)}</span> / <span>{msToTime(currentDuration)}</span>
        </div>
      </Wrapper>
    );
  }
}

export default App;
