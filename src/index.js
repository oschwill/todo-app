/* MODEL FUNCTIONS */
import setTheme, { input } from './Model/theme';
import { getAllData, setData, getActiveData, getCompletedData } from './Model/data';
/* MODEL CONTAINER */
import { headerContent } from './Model/theme';
/* VIEW FUNCTIONS */
import { showAllContent } from './View/output';
/* VIEW CONTAINER */
import { checkBox } from './View/output';
/* SVG */
import sun from './images/icon-sun.svg';
import moon from './images/icon-moon.svg';
/* STYLES */
import styles from './styles/styles.css';

const init = () => {
  // set start theme
  setTheme({ sun, moon }, 'dark');
};

// RUN
init();

/* EVENTLISTENER */
headerContent.addEventListener('click', (e) => {
  let themeType = headerContent.lastChild.attributes.data.value;

  // set theme
  setTheme({ sun, moon }, themeType);
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    let inputVal = input.value;

    if (inputVal === '') {
      return;
    }
    // set the new content
    setData(inputVal);

    // output all content
    showAllContent(getAllData(), getActiveData().length);

    // clear input
    input.value = '';
  }

  return;
});

/* FUNCTIONS */
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

waitForElm('.check').then((elm) => {
  console.log('Element is ready');
  console.log(elm.parentElement);
});
