// Client ID and API key from the Developer Console
const CLIENT_ID = '85220659436-c5ubh2qdoflqg10r9tnq73511uc1i452.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD3rL6RSg9-FELpAKgM1urc9r_E3f8TGls';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export interface ICalendarStore {
    subscribe(fn: (isSignedIn: boolean) => void): void;

    signIn(): void;
    signOut(): void;

    fetchEvents(from: Date, to: Date): Promise<any[]>;
}

export class CalendarStore implements ICalendarStore {

    private _isSignedIn: boolean | undefined;
    private _subscribers: ((isSignedIn: boolean) => void)[] = [];

    public init() {
        var script = document.createElement('script');
        script.src="https://apis.google.com/js/api.js";
        script.onload = () =>{
            gapi.load('client:auth2', this.initClient);
        }
        document.head.appendChild(script);
    }

    private initClient = () => {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(() => {
            // Listen for sign-in state changes.
            (gapi as any).auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

            // Handle the initial sign-in state.
            this.updateSigninStatus((gapi as any).auth2.getAuthInstance().isSignedIn.get());
        }, (err: any) => {
            console.error('Failed to init gapi', err);
        });
    }

    private updateSigninStatus = (isSignedIn: boolean) => {
        this._isSignedIn = isSignedIn;
        this._subscribers.forEach(s => s(isSignedIn));
    };

    public signIn() {
        (gapi as any).auth2.getAuthInstance().signIn();
    }

    public signOut() {
        (gapi as any).auth2.getAuthInstance().signOut();
    }

    public subscribe(fn: (isSignedIn: boolean) => void) {
        this._subscribers.push(fn);

        if (this._isSignedIn !== undefined) {
            fn(this._isSignedIn);
        }
    }

    public fetchEvents(from: Date, to: Date): Promise<any[]> {
        return (gapi.client as any).calendar.events.list({
          'calendarId': 'primary',
          'timeMin': from.toISOString(),
          'timeMax': to.toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'orderBy': 'startTime'
        }).then((response: any) => {
            return response.result.items;
        });
    }
}
