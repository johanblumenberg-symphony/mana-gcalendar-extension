import { interfaces } from '@mana/extension-lib';
import { RailIconView } from './RailIconView';

import 'react-big-calendar/lib/sass/styles.scss';
import { CalendarStore } from './calendar/CalendarStore';

const { injectInterface, Symbols } = interfaces;

export default class Extension implements interfaces.extension.ITrustedExtension {

    @injectInterface(Symbols.IRail)
    private rail!: interfaces.rail.IRail;

    public async init() {
        const calendarStore = new CalendarStore();
        calendarStore.init();
        interfaces.registry.bind('CalendarStore', () => calendarStore);

        this.rail.register(new RailIconView());
    }
}
