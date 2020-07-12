import { ipcMain, BrowserWindow } from 'electron';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import LogMessage from '../../libs/logger/LogMessage';

const log = LoggerFactory.getLogger(__filename);

// Used and managed by ApplicationEntry object
export default class IpcMainController {
    private mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {
        log.info('Initializing ipcMainController...');
        this.mainWindow = mainWindow;
    }

    init(): void {
        this.mainWindow.webContents.on('did-finish-load', () => {
            log.info('Did-Finish-Load event was received');
        });

        // This allows for the script to wait until the webpage is loaded
        ipcMain.on('loadDone', () => {
            log.debug('The main BrowserWindow has been fully loaded.');
        });

        // An event so the html files from the electron browser can use the logger
        ipcMain.on('Logger', this.sendLogMessage);
    }

    // eslint-disable-next-line class-methods-use-this
    sendLogMessage(_event: Event, message: LogMessage) {
        LoggerFactory.getLoggerImpl().log(
            message.logLevelName,
            message.sourcePath,
            message.message
        );
    }
}
