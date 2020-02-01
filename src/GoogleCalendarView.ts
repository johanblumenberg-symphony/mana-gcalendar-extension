import { interfaces, uiComps } from '@mana/extension-lib';
import GoogleCalendar from './renderer/GoogleCalendar';

export class GoogleCalendarView extends interfaces.BaseView implements interfaces.nav.INavItem {
    public name = 'Google Calendar';
    public renderer: interfaces.view.ReactRenderer;

    constructor() {
        super();

        this.renderer = uiComps.createReactRenderer(this, GoogleCalendar);
    }

    public getState() {
        return {};
    }

    public getActions() {
       return {};
    }
}
