const transitionStyle = '0.4s height ease-in-out';
  const Transition = {
    beforeEnter(el) {
      el.style.transition = transitionStyle;
      if (!el.dataset) el.dataset = {};      
      el.style.height = 0;
       console.log('beforeEnter',el.scrollHeight)
    },

    enter(el) {
      if (el.scrollHeight !== 0) {
        el.style.height = `${el.scrollHeight}px`;
      } else {
        el.style.height = '';      
      }
      el.style.overflow = 'hidden';
      console.log('enter',el.scrollHeight)

    },

    afterEnter(el) {
      el.style.transition = '';
      el.style.height = '';      
      console.log('afterEnter',el.scrollHeight)
    },

    beforeLeave(el) {
      if (!el.dataset) el.dataset = {};
      el.style.display = 'block';
      el.style.height = `${el.scrollHeight}px`;
      el.style.overflow = 'hidden';
      console.log('beforeLeave',el.scrollHeight,el.style.height)
    },

    leave(el) {
      if (el.scrollHeight !== 0) {
        el.style.transition = transitionStyle;
        el.style.height = 0;
        console.log('leave',el.scrollHeight)
      }
    },

    afterLeave(el) {
      el.style.transition = '';
      el.style.height = '';
      console.log('afterLeave',el.scrollHeight)
    },
  };
  export default {
    name: 'CollapseTransition',
    functional: true,
    render(h, { children }) {
      const data = {
        on: Transition,
      };
      return h('transition', data, children);
    },
  };