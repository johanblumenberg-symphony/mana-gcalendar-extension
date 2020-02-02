import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Calendar, momentLocalizer, View } from 'react-big-calendar'
import * as moment from 'moment'

const localizer = momentLocalizer(moment)

export interface GoogleCalendarProps {
    isSignedIn: boolean | undefined;
    events: any[];
}

export interface GoogleCalendarActions {
    signIn(): void;
    setRange(from: Date, to: Date): void;
}

function addOneDay(date: Date): Date {
    let tmp = new Date(date.getTime());
    tmp.setDate(tmp.getDate() + 1);
    return tmp;
}

function toDate(date: Date | string): Date {
    if (date instanceof Date) {
        return date;
    } else {
        return new Date(Date.parse(date));
    }
}

function toDatePlusOneDay(date: Date | string): Date {
    if (date instanceof Date) {
        return addOneDay(date);
    } else {
        return addOneDay(new Date(Date.parse(date)));
    }
}

function getScrollTime(): Date {
    let tmp = new Date();
    tmp.setHours(7, 0, 0, 0);
    return tmp;
}

const Accessors = {
    titleAccessor: (event: any) => event.summary,
    tooltipAccessor: (event: any) => event.summary,
    startAccessor: (event: any) => new Date(Date.parse(event.start.dateTime)),
    endAccessor: (event: any) => new Date(Date.parse(event.end.dateTime)),
};

const Formats = {
    eventTimeRangeFormat: () => '',
    eventTimeRangeStartFormat: () => '',
    eventTimeRangeEndFormat: () => '',
};

class GoogleCalendar extends React.Component<GoogleCalendarProps & GoogleCalendarActions & WithStyles<typeof styles>> {
    private _view: View = 'week';

    public render() {
        const { classes, isSignedIn, events } = this.props;

        return (
            <div className={classes.container}>
                <Calendar
                    localizer={localizer}
                    views={['day', 'week', 'work_week', 'month']}
                    defaultView='week'
                    events={events}
                    onRangeChange={this.onRangeChange}
                    onView={this.onViewChange}
                    scrollToTime={getScrollTime()}
                    {...Accessors}
                    formats={Formats}
                />
                { (isSignedIn === false) && <div className={classes.signin}>
                        <button onClick={this.props.signIn}>Sign In</button>
                    </div>
                }
            </div>
        );
    }

    private onViewChange = (view: View) => {
        this._view = view;
    };

    private onRangeChange = (range: Date[] | { start: string | Date, end: string | Date}) => {
        if (this._view === 'day') {
            let r: Date[] = range as Date[];
            this.props.setRange(toDate(r[0]), toDatePlusOneDay(r[0]));
        } else if (this._view === 'week') {
            let r: Date[] = range as Date[];
            this.props.setRange(toDate(r[0]), toDatePlusOneDay(r[6]));
        } else if (this._view === 'work_week') {
            let r: Date[] = range as Date[];
            this.props.setRange(toDate(r[0]), toDatePlusOneDay(r[4]));
        } else if (this._view === 'month') {
            let r: { start: Date, end: Date } = range as { start: Date, end: Date };
            this.props.setRange(toDate(r.start), toDatePlusOneDay(r.end));
        }
    };
}

export default withStyles(styles)(GoogleCalendar);
