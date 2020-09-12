import m from 'mithril';
import render from './render';

m.mount(document.body, {
  view: () => m(render),
});
