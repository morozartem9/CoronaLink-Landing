const scrollToTop = () => window.safari ? (document.body.scrollTop = 0) : (document.documentElement.scrollTop = 0);

export { scrollToTop };

