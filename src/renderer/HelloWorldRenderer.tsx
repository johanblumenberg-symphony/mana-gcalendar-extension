import * as React from 'react';

export interface HelloWorldProps {
}

export interface HelloWorldActions {
}

export class HelloWorldRenderer extends React.Component<HelloWorldProps & HelloWorldActions, {}> {
    public render() {
        return <span>Hello World!</span>;
    }
}
