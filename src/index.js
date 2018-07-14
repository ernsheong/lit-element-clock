import { LitElement, html, svg } from "@polymer/lit-element";

const minuteTicks = (() => {
  const lines = [];
  for (let i = 0; i < 60; i++) {
    lines.push(svg`
      <line
        class='minor'
        y1='42'
        y2='45'
        transform$='rotate(${(360 * i) / 60})'/>
    `);
  }
  return lines;
})();

const hourTicks = (() => {
  const lines = [];
  for (let i = 0; i < 12; i++) {
    lines.push(svg`
      <line
        class='major'
        y1='32'
        y2='45'
        transform$='rotate(${(360 * i) / 12})'/>
    `);
  }
  return lines;
})();

/**
 * Adapted from the Ractive.js clock example: http://www.ractivejs.org/examples/clock/
 */
export class LitClock extends LitElement {
  static get properties() {
    return {
      _date: Date
    };
  }

  constructor() {
    super();

    this._date = new Date();
    setInterval(() => {
      this._date = new Date();
    }, 1000);
  }

  _render({ _date }) {
    return html`
      <style>
        :host {
          display: block;
        }
        .square {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 100%;
        }

        svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .clock-face {
          stroke: #333;
          fill: white;
        }

        .minor {
          stroke: #999;
          stroke-width: 0.5;
        }

        .major {
          stroke: #333;
          stroke-width: 1;
        }

        .hour {
          stroke: #333;
        }

        .minute {
          stroke: #666;
        }

        .second, .second-counterweight {
          stroke: rgb(180,0,0);
        }

        .second-counterweight {
          stroke-width: 3;
        }
      </style>
      <div class='square'> <!-- so the SVG keeps its aspect ratio -->
        <svg viewBox='0 0 100 100'>

          <!-- first create a group and move it to 50,50 so
              all co-ords are relative to the center -->
          <g transform='translate(50,50)'>
            <circle class='clock-face' r='48'/>
            ${minuteTicks}
            ${hourTicks}

            <!-- hour hand -->
            <line class='hour' y1='2' y2='-20'
              transform$='rotate(${30 * _date.getHours() + _date.getMinutes() / 2})'/>

            <!-- minute hand -->
            <line class='minute' y1='4' y2='-30'
              transform$='rotate(${6 * _date.getMinutes() + _date.getSeconds() / 10})'/>

            <!-- second hand -->
            <g transform$='rotate(${6 * _date.getSeconds()})'>
              <line class='second' y1='10' y2='-38'/>
              <line class='second-counterweight' y1='10' y2='2'/>
            </g>
          </g>
        </svg>
      </div>

      <h3 style="text-align: center;">See source at <a href="https://github.com/ernsheong/lit-element-clock/blob/master/src/index.js">github.com/ernsheong/lit-element-clock</a></h3>
    `;
  }
}
customElements.define("lit-clock", LitClock);
