import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

export interface RailIconProps { }
export interface RailIconActions { }

class RailIcon extends React.Component<RailIconProps & RailIconActions & WithStyles<typeof styles>> {
    public render() {
        return <div title='Google Calendar' className={this.props.classes.icon}>X</div>;
    }
}

export default withStyles(styles)(RailIcon);
