/* MODEL FUNCTIONS */
import setTheme, { input } from './Model/theme';
import { setData } from './Model/data';
/* MODEL CONTAINER */
import { headerContent } from './Model/theme';
/* VIEW FUNCTIONS */
import { showContent } from './View/output';
/* SVG */
import sun from './images/icon-sun.svg';
import moon from './images/icon-moon.svg';

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
    // set the new content and output
    showContent(setData(inputVal));

    // clear input
    input.value = '';
  }

  return;
});
