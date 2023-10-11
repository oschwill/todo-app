const observeElement = (selector) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        return resolve(document.querySelector(selector));
      }
    });

    // the list welche observed wird
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

export default observeElement;
