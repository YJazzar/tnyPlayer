import {LoggerImpl} from "./Logger";
import {LoggerInstance, UILoggerInstance} from "./LoggerInstance";


export class LoggerFactory {

    private static logger: LoggerImpl;
    private static printToDevTools: boolean;

    static getLogger(sourcePath: string): LoggerInstance {
        this.init();
        return new LoggerInstance(this.logger, this.trimPath(sourcePath))
    }

    static getUILogger(sourcePath: string) {
        return new UILoggerInstance(sourcePath, this.printToDevTools);
    }

    static init(): void {
        if (!this.logger) {
            console.log('Creating a logger instance!');
            this.logger = new LoggerImpl(null);
            this.logger.init();
            this.getConfig();
        }
    }

    // TODO: implement to actually read properties from a file
    private static getConfig() {
        this.printToDevTools = true;
    }

    private static trimPath(sourcePath: string) {
        return sourcePath.substring(sourcePath.length - 35, sourcePath.length);
    }
}