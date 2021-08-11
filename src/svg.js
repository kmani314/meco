import m from 'mithril';

const arrow = {
  view(vnode) {
    return m('svg', {
      xmlns: 'http://www.w3.org/2000/svg', height: '48', viewBox: '0 0 24 24', width: '48', ...vnode.attrs,
    },
    m('path', { d: 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z' }));
  },
};

export default { arrow };
