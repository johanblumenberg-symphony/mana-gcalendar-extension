import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

export interface GoogleCalendarProps { }
export interface GoogleCalendarActions { }

class GoogleCalendar extends React.Component<GoogleCalendarProps & GoogleCalendarActions & WithStyles<typeof styles>> {
    public render() {
        return <div>X</div>;
    }
}

export default withStyles(styles)(GoogleCalendar);
