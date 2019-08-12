new (class Header {
  constructor() {
    this.navEventInit();
  }

  navEventInit() {
    const navToggle = document.getElementsByClassName('m-menu')[0];
    const navHidden = document.getElementsByClassName('nav-mobile')[0];

    navToggle.addEventListener('click', () => {
      let display = navHidden.style.display;
      display = display === 'block' ? 'none' : 'block';
      navHidden.style.display = display;
    });

    window.addEventListener('resize', event => {
      const width = this.getWidth();
      if (1000 < width) {
        navHidden.style.display = 'none';
      }
    });
  }

  getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }
})();
