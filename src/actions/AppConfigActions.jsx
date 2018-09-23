import {LIGHT_THEME, DARK_THEME} from "../reducers/AppReducer";

export const CHANGE_THEME = 'CHANGE_THEME';

export function ChangeThemeEvent(theme) {
    return {
        type: CHANGE_THEME,
        theme: 
            theme == LIGHT_THEME 
                ? DARK_THEME 
                : LIGHT_THEME,
    };
}
