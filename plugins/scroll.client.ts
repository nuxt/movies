// We cannot leverage vue-router scrollBehavior since the scroll is not on window
export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp()


  // We need to check if the user is going back or not
  let isBack = false;
  window.onpopstate = function () {
    isBack = true;
  };

  nuxtApp.$router.afterEach(async (to, from) => {
    if (from.path === to.path) return;

    const currentHistory = {
      path: from.path,
      scrollPosition: document.querySelector('[data-scroll]')?.scrollTop
    }

    const scrollHistory = JSON.parse(localStorage.getItem('scrollHistory') || '[]');

    if (scrollHistory[scrollHistory.length - 1]?.path === to.path && isBack) {
      // Here we check if the scroll is not biger than the scrollHeight, if it is, scroll to the bottom
      if (scrollHistory[scrollHistory.length - 1]?.scrollPosition > document.querySelector('[data-scroll]')?.scrollHeight) {
        document.querySelector('[data-scroll]')?.scrollTo({ top: document.querySelector('[data-scroll]')?.scrollHeight });
      } else {
        document.querySelector('[data-scroll]')?.scrollTo({ top: scrollHistory[scrollHistory.length - 1]?.scrollPosition })
      }

      scrollHistory.pop();
    }
    else {
      scrollHistory.push(currentHistory);
      document.querySelector('[data-scroll]')?.scrollTo({ top: 9 });
      isBack = false;
    }

    localStorage.setItem('scrollHistory', JSON.stringify(scrollHistory));
  })
})
