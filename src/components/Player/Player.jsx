import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import {
  switchToPreviousTrack,
  switchToNextTrack,
  changePlayStatus,
  changeVolume,
  volumeUp,
  volumeDown,
} from '../../AC';

import { RETRO_URL } from '../../constants/urlConstants';
import { playStatuses } from '../../constants/playerConstants';

import { msToTime } from '../../utils/displayUtils';

import cassette from './cassette.png';
import cassetteReel from './cassette-reel.png';
import prevIcon from './prev.svg';
import nextIcon from './next.svg';
import playIcon from './play.svg';
import pauseIcon from './pause.svg';

const Wrapper = styled.div`
  position: relative;
  width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const Cassette = styled.div`
  position: relative;
  width: 310px;
  height: 195px;
  margin: 0 auto;
`;

const CassetteCover = styled.div`
  position: absolute;
  top: 13px;
  left: 16px;
  width: 278px;
  height: 132px;
  background: url(${props => props.bg}) center no-repeat;
  background-size: cover;
  z-index: 100;

  clip-path: polygon(
    278px 132px,
    278px 0,
    0 0,
    0 132px,
    278px 132px,
    67px 90px,
    54px 80px,
    54px 64px,
    68px 52px,
    210px 52px,
    224px 65px,
    224px 77px,
    211px 90px,
    67px 90px
  );
`;

const CassetteBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 310px;
  height: 195px;
  background: url(${props => props.bg}) center no-repeat;
  background-size: cover;
  z-index: 100;
`;

const Controls = styled.div`
  position: absolute;
  z-index: 1000;
  top: 70px;
  left: 0;
  width: 100%;
`;

const ControlsButton = styled.button`
  display: inline-block;
  vertical-align: top;
  width: 65px;
  height: 30px;
  border: 0;
  background: url(${props => props.icon}) center no-repeat;
  transition: opacity 0.5s ease-in-out;
  cursor: pointer;

  &:nth-child(2) {
    margin: 0 150px;
  }

  &:disabled {
    cursor: auto;
    opacity: 0.5;
  }
`;

const Title = styled.div`
  margin: 20px 0 15px;
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;
`;

const Time = styled.div`
  margin: 20px 0 15px;
  font-weight: bold;
  font-style: italic;
`;

const TimePosition = styled.span`
  font-size: 1.25rem;
`;

const TimeDuration = styled.span`
  color: #9cf1ff;
  font-size: 1rem;
`;

const Volume = styled.input`
  appearance: none;
  vertical-align: middle;
  width: 180px;
  background: none;
  overflow: hidden;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 24px;
    cursor: pointer;
    background-image: linear-gradient(
      to bottom,
      transparent 0,
      transparent 11px,
      rgba(255, 255, 255, 0.2) 11px,
      rgba(255, 255, 255, 0.2) 13px,
      transparent 13px,
      transparent 24px
    );
  }

  &::-webkit-slider-thumb {
    appearance: none;
    position: relative;
    width: 12px;
    height: 12px;
    margin-top: 6px;
    border-radius: 50%;
    cursor: pointer;
    background-color: #fff;
    transition: background-color 0.1s linear;
  }

  &::-webkit-slider-thumb::before {
    pointer-events: none;
    content: '';
    position: absolute;
    top: 5px;
    right: 5px;
    width: 99999px;
    height: 2px;
    background: #fff;
  }

  &::-moz-range-thumb {
    position: relative;
    width: 12px;
    height: 12px;
    margin-top: 6px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const CassetteReelLeft = styled.div`
  position: absolute;
  z-index: 90;
  top: 65px;
  left: 72px;
  width: 34px;
  height: 39px;
  border-radius: 50%;
  background: url(${props => props.image}) no-repeat;
  color: #16181a;
  clip-path: circle(50% at 50% 50%);
  animation: ${spin} 4s linear infinite;
  animation-play-state: ${props =>
    (props.playStatus === playStatuses.pause ? 'paused' : 'running')};
`;

const CassetteReelRight = CassetteReelLeft.extend`
  left: 204px;
`;

class Player extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (ev) => {
    if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      this.props.switchToNextTrack();
    }

    if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      this.props.switchToPreviousTrack();
    }

    if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      this.props.volumeUp();
    }

    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      this.props.volumeDown();
    }

    if (ev.code === 'Space') {
      ev.preventDefault();
      this.props.changePlayStatus();
    }
  };

  render() {
    const {
      cover,
      currentTrack,
      playStatus,
      currentPosition,
      currentDuration,
      volume,
      title,
    } = this.props;

    return (
      <Wrapper>
        <Cassette>
          <CassetteCover bg={cover} />
          <CassetteBody bg={cassette} />
          <CassetteReelLeft image={cassetteReel} playStatus={playStatus} />
          <CassetteReelRight image={cassetteReel} playStatus={playStatus} />
        </Cassette>

        <Controls>
          <ControlsButton
            disabled={!currentTrack}
            icon={prevIcon}
            onClick={this.props.switchToPreviousTrack}
          />
          <ControlsButton
            icon={playStatus === playStatuses.play ? pauseIcon : playIcon}
            onClick={this.props.changePlayStatus}
          />
          <ControlsButton icon={nextIcon} onClick={this.props.switchToNextTrack} />
        </Controls>

        <Title>{title}</Title>

        <Time>
          <TimePosition>{msToTime(currentPosition)}</TimePosition>
          <TimeDuration> / {msToTime(currentDuration)}</TimeDuration>
        </Time>

        <Volume
          type="range"
          min="0"
          max="100"
          step="1"
          value={volume}
          onChange={(ev) => {
            const volumeValue = parseInt(ev.target.value, 10);
            this.props.changeVolume(volumeValue);
          }}
        />
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
      currentDuration,
      currentPosition,
      volume,
      cover: `${RETRO_URL}${tracks[currentTrack].artworkUrl}`,
      title: `${tracks[currentTrack].title}`,
    };
  },
  {
    switchToPreviousTrack,
    switchToNextTrack,
    changePlayStatus,
    changeVolume,
    volumeUp,
    volumeDown,
  },
)(Player);
