import { interfaces, uiComps } from '@mana/extension-lib';
import { HelloWorldProps, HelloWorldActions, HelloWorldRenderer } from './renderer/HelloWorldRenderer';

export const { BaseView } = interfaces;

export class HelloWorldView extends BaseView {
    public renderer: interfaces.view.ReactRenderer;

    constructor() {
        super();
        this.renderer = uiComps.createReactRenderer<HelloWorldProps, HelloWorldActions>(this, HelloWorldRenderer);
    }

    public getState(): HelloWorldProps {
        return {};
    }

    public getActions(): HelloWorldActions {
        return {};
    }
}
