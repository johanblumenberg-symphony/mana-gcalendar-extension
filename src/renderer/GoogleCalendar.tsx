import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import * as moment from 'moment'

const localizer = momentLocalizer(moment)

export interface GoogleCalendarProps { }
export interface GoogleCalendarActions { }

class GoogleCalendar extends React.Component<GoogleCalendarProps & GoogleCalendarActions & WithStyles<typeof styles>> {
    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <Calendar
                    localizer={localizer}
                    defaultView='week'
                    events={[]}
                />
            </div>
        );
    }
}

export default withStyles(styles)(GoogleCalendar);
