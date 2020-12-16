import React from 'react';
import styled from 'styled-components';
import navConfig from '../configs/NavConfigImpl';
import UIController from '../controllers/UIController';
import ApplicationState from '../../libs/templates/ApplicationState';
import { List, ListItem } from '@material-ui/core';
import Queue from '../components/Queue';
import VerticalResizable from '../containers/VerticalResizable';

const NavPanelDiv = styled(UIController.getInstance().getTheme())`
    border-right-width: 4px;
    border-radius: 0.25rem;
`;

const FullHeight = styled.div`
    height: 100%;
    overflow: auto;
`;

interface Props extends ApplicationState {
    changePlaylist: (newPlaylist: string) => void;
}

interface State {}

export default class NavigationPanelContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    // This click listener will be used to lift the state change to the root component
    // It will be invoked when a user changes the playlist that they want to access
    getClickListener(name: string): () => void {
        return () => this.props.changePlaylist(name);
    }

    getPlaylists(): React.ReactChild {
        const list: React.ReactChild[] = this.props.playlistNames.map((name) => {
            return (
                <ListItem button key={name} onClick={this.getClickListener(name).bind(this)}>
                    {name}
                </ListItem>
            );
        });

        return <List>{list}</List>;
    }

    render() {
        return (
            <NavPanelDiv id={'NavPanelDiv'} className={navConfig.className + ' ' + navConfig.cssClassStyles}>
                <VerticalResizable
                    topChild={this.getTop()}
                    bottomChild={this.getBottom()}
                    topChildDefaultHeight={0.5}
                    topChildMaxHeight={1}
                    topChildMinHeight={0}
                />
            </NavPanelDiv>
        );
    }

    getTop() {
        return (
            <FullHeight>
                <h1>Navigation Panel</h1>
                <br />
                {this.getPlaylists()}
            </FullHeight>
        );
    }

    getBottom() {
        return (
            <FullHeight>
                <Queue {...this.props} />
            </FullHeight>
        );
    }
}
