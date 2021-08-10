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
        m('div', { class: `${infoPane ? 'info-pane' : 'info-pane-open'}` },
          m(svg.arrow, {
            class: infoPane ? 'info-pane-pull' : 'info-pane-pull-rotated',
            stroke: '#fff',
            onclick: () => { infoPane = !infoPane; },
          }),
          m('div', { class: 'info-pane-content' })),
      ];
    },
  };
}
