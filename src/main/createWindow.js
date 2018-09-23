import {BrowserWindow} from "electron";

let win;

export default function createWindow() {
    win = new BrowserWindow({ width: 1024, height: 768});
    win.loadURL(`file://${__dirname}/../../index.html`);
    win.on("close", () => {
        win = null;
    });
}