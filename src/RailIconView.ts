import { interfaces, uiComps } from '@mana/extension-lib';
import RailIcon, { RailIconProps, RailIconActions } from './renderer/RailIcon';
import { GoogleCalendarView } from './GoogleCalendarView';

export class RailIconView implements interfaces.rail.IRailItem {
    public renderer: interfaces.view.ReactRenderer;

    public name = 'Google Calendar';
    public isActive = false;
    public exclusive = false;

    @interfaces.injectInterface(interfaces.Symbols.IModal)
    private modal!: interfaces.modal.IModal;

    constructor() {
        this.renderer = uiComps.createReactRenderer<RailIconProps, RailIconActions>(this, RailIcon);
    }

    public getState(): RailIconProps {
        return {};
    }

    public getActions(): RailIconActions {
        return {};
    }

    public getIconView() {
        return this.renderer;
    }

    public open() {
        this.modal.show({
            content: new GoogleCalendarView(),
            size: 'large',
        });
    }

    public close() {
        this.modal.close();
    }
}
