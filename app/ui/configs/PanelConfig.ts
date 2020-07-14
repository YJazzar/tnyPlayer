import { Enable } from 're-resizable';

export enum PanelType {
    navPanel,
    mainPanel,
    playerControlsPanel,
}

export interface PanelConfig {
    id: string;
    panelType: PanelType;
    panelName: string;
    className: string;
    classStyles: string;

    resizableSides: Enable;
    defaultSize: {
        defaultWidth: number | string;
        defaultHeight: number | string;
    };

    element?: React.ReactNode; // The child element for the panel
}
