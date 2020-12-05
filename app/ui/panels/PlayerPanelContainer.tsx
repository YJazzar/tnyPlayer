import IconButton from '@material-ui/core/IconButton/IconButton';
import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import ApplicationState from '../../libs/templates/ApplicationState';
import Slider from '../components/Slider';
import playerControlsConfig from '../configs/PlayerControlsConfigImpl';
import UIController from '../controllers/UIController';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { VolumeDown } from '@material-ui/icons';
import VolumeSlider from '../components/VolumeSlider';

// const log = LoggerFactory.getUILogger(__filename);

const PlayerPanelDiv = styled(UIController.getInstance().getTheme())`
    border-top-width: 4px;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Button = styled(IconButton)`
    width: 5%;
    color: palevioletred;
    margin: auto;
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    display: block;
    width: 10%;
    &:focus {
        outline: none;
    }
`;

const AudioPlayerDiv = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: 'center';
`;

const TimeStamp = styled.div`
    width: 10%;
    display: inline-block;
    margin: auto;
    justify-content: center;
    align-items: left;
    vertical-align: baseline;
`;

interface State {
    currentTime: number;
    duration: number;
    paused: boolean;
}

export default class PlayerPanelContainer extends React.Component<ApplicationState, State> {
    audioPlayerRef: React.RefObject<HTMLAudioElement>;

    constructor(props: ApplicationState) {
        super(props);

        this.state = {
            currentTime: 0,
            duration: 0,
            paused: false,
        };

        this.audioPlayerRef = React.createRef();
    }

    // This will be passed to the <audio> tag so currTime can be updated regularly
    onTimeUpdate(event: SyntheticEvent<HTMLAudioElement, Event>) {
        this.setState({
            currentTime: event.currentTarget.currentTime as number,
            duration: event.currentTarget.duration as number,
        });
    }

    // This will be passed to the <Slider> component so the user can drag the slider
    onSliderDrag(newTime: number) {
        this.setState({
            currentTime: newTime,
        });

        if (this.audioPlayerRef.current) {
            this.audioPlayerRef.current.currentTime = newTime;
        }
    }

    togglePlay() {
        if (!this.props.playing) {
            // Return early here to avoid changing the component's state is something is not playing
            return;
        }

        if (this.state.paused === false) {
            this.audioPlayerRef.current?.pause();
            this.setState({
                paused: true,
            });
        } else if (this.state.paused === true) {
            this.audioPlayerRef.current?.play();
            this.setState({
                paused: false,
            });
        }
    }

    render() {
        // If something is playing, then load an audio tag and play the audio:
        const duration = this.state.duration;

        return (
            <PlayerPanelDiv className={`${playerControlsConfig.className} ${playerControlsConfig.cssClassStyles}`}>
                <Button onClick={this.togglePlay.bind(this)} color={'inherit'}>
                    {this.state.paused || !this.props.playing ? <PlayArrowIcon /> : <PauseIcon />}
                </Button>
                <AudioPlayerDiv>
                    <Slider
                        minValue={0}
                        maxValue={duration}
                        currValue={this.state.currentTime}
                        onSliderDrag={this.onSliderDrag.bind(this)}
                    />
                </AudioPlayerDiv>
                <TimeStamp>
                    {isNaN(duration) ? '-' : Math.round(this.state.currentTime)} / {isNaN(duration) ? '-' : Math.round(duration)}
                </TimeStamp>
                {this.getAudioPlayer()}
                <VolumeSlider/>
            </PlayerPanelDiv>
        );
    }

    getAudioPlayer(): React.ReactChild {
        if (this.props.currFilePlaying != null) {
            return (
                <audio
                    autoPlay
                    src={this.props.currFilePlaying}
                    style={{ width: '100%' }}
                    ref={this.audioPlayerRef}
                    onTimeUpdate={this.onTimeUpdate.bind(this)}
                >
                    An error ocurred when loading the <code>audio</code> tag!
                </audio>
            );
        }

        return <div id={'NoAudioPlaying'} />;
    }
}
