import m from 'mithril';

const arrow = {
  view(vnode) {
    return m('svg', {
      xmlns: 'http://www.w3.org/2000/svg', height: '48', viewBox: '0 0 24 24', width: '48', ...vnode.attrs,
    },
    m('path', { d: 'M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z' }));
  },
};

export default { arrow };
