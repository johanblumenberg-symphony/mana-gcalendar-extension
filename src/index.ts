import { interfaces } from '@mana/extension-lib';
import { HelloWorldView } from './HelloWorldView';

const { injectInterface, Symbols } = interfaces;

export default class Extension implements interfaces.extension.ITrustedExtension {

    @injectInterface(Symbols.IRail)
    private rail!: interfaces.data.IRail;

    public async init() {
    }
}
