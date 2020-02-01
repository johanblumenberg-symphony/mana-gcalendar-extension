import { interfaces, uiComps } from '@mana/extension-lib';
import { RailIconProps, RailIconActions, RailIcon } from './renderer/RailIcon';

export const { BaseView } = interfaces;

export class RailIconView extends BaseView {
    public renderer: interfaces.view.ReactRenderer;

    constructor() {
        super();
        this.renderer = uiComps.createReactRenderer<RailIconProps, RailIconActions>(this, RailIcon);
    }

    public getState(): RailIconProps {
        return {};
    }

    public getActions(): RailIconActions {
        return {};
    }
}
