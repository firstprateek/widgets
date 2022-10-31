import { css, LitElement, html } from "lit";
import {classMap} from 'lit/directives/class-map.js';

class WordViewer extends LitElement {
    static styles = css`
        :host {
            background-color: white;
            color: violet;
            cursor: pointer;
            display: block;
        }

        :host(.green) {
            color: green;
        }

        pre {
            padding: 0.2em;
        }

        pre.backwards {
            color: white;
            background-color: violet;
        }
    `;
    
    static properties = { words: {}, idx: {state: true}, playDirection: {state:true} };

    constructor() {
        super();
        this.words = 'initial word';
        this.idx = 0;
        this.playDirection = 1;
    }

    intervalTimer;

    connectedCallback() {
        super.connectedCallback();
        this.intervalTimer = setInterval(this.tickToNextWord, 1000);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.intervalTimer);
        this.intervalTimer = undefined;
    }

    render() {
        const splitWords = this.words.split('.');
        const idx = ((this.idx % splitWords.length) + splitWords.length) % splitWords.length;
        const word = splitWords[idx];
        return html`
            <pre @click=${() => this.playDirection *= -1} class=${classMap({ backwards: this.playDirection === -1 })}>${word}</pre>
        `;
    }

    tickToNextWord = () => {
        this.idx += this.playDirection;
    }
}

customElements.define('word-viewer', WordViewer);
