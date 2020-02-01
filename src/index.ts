import { interfaces } from '@mana/extension-lib';
import { RailIconView } from './RailIconView';

const { injectInterface, Symbols } = interfaces;

export default class Extension implements interfaces.extension.ITrustedExtension {

    @injectInterface(Symbols.IRail)
    private rail!: interfaces.rail.IRail;

    public async init() {
        let railIcon = new RailIconView();

        this.rail.register({
            name: 'Google Calendar',
            isActive: false,
            open: () => undefined,
            close: () => undefined,
            getIconView: () => railIcon.renderer,
        });
    }
}
