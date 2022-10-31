import { LitElement, html } from 'lit';

class MyElement extends LitElement {
    static properties = {
        words: {},
    };

    constructor() {
        super();
        this.words = 'initial value';
    }

    render () {
        return html`
            <div>Hello from MyElement!</div>
        `;
    }
}

customElements.define('my-element', MyElement);
