// import three from 'three';
import m from 'mithril';
import svg from './svg';
import canvas from './render';
import './main.css';

export default function render() {
  let infoPane = true;
  return {
    view(vnode) {
      return [m(canvas, vnode.attrs),
        m('div', { class: `${infoPane ? 'info-pane-open' : 'info-pane'}` },
          m(svg.arrow, {
            class: infoPane ? 'info-pane-pull-rotated' : 'info-pane-pull',
            stroke: '#fff',
            onclick: () => { infoPane = !infoPane; },
          }),
          m('div', { class: 'info-pane-content' })),
      ];
    },
  };
}
