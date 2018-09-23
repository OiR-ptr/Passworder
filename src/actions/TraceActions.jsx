// Log Level Constant
export const LEVEL_DEBUG = 'DEBUG';
export const LEVEL_INFO = 'INFO';
export const LEVEL_WARN = 'WARN';
export const LEVEL_ERROR = 'ERROR';



export function report(level, message) {
    return {
        logLevel: level,
        message: message,
    };
}