import { interfaces, uiComps } from '@mana/extension-lib';
import GoogleCalendar, { GoogleCalendarActions, GoogleCalendarProps } from './renderer/GoogleCalendar';
import { ICalendarStore } from './calendar/CalendarStore';

function weekDateStart() {
    let tmp = new Date();
    tmp.setDate(tmp.getDate() - 7);
    return tmp;
}

function weekDateEnd() {
    let tmp = new Date();
    tmp.setDate(tmp.getDate() + 7);
    return tmp;
}

export class GoogleCalendarView extends interfaces.BaseView implements interfaces.nav.INavItem {
    public name = 'Google Calendar';
    public renderer: interfaces.view.ReactRenderer;

    @interfaces.injectInterface('CalendarStore')
    private calendarStore!: ICalendarStore;

    private isSignedIn: boolean | undefined;
    private events: any[] = [];

    constructor() {
        super();

        this.renderer = uiComps.createReactRenderer<GoogleCalendarProps, GoogleCalendarActions>(this, GoogleCalendar);

        this.calendarStore.subscribe(this.onStoreUpdate);
    }

    public getState() {
        return {
            isSignedIn: this.isSignedIn,
            events: this.events,
        };
    }

    public getActions() {
       return {
           signIn: this.signIn,
           setRange: this.setRange,
       };
    }

    private signIn = () => {
        this.calendarStore.signIn();
    };

    private setRange = (from: Date, to: Date) => {
        this.calendarStore.fetchEvents(from, to).then((events) => {
            this.events = events;
            this.renderer.render();
        });
    }

    private onStoreUpdate = (isSignedIn: boolean) => {
        if (!this.isSignedIn && isSignedIn) {
            this.setRange(weekDateStart(), weekDateEnd());
        }
        
        this.isSignedIn = isSignedIn;
        this.renderer.render();
    };
}
