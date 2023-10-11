/* MODEL FUNCTIONS */
import setTheme, { input } from './Model/theme';
import { getAllData, setData, getActiveData, getCompletedData, editData } from './Model/data';
import observeElement from './Model/observer';
/* MODEL CONTAINER */
import { headerContent } from './Model/theme';
/* VIEW FUNCTIONS */
import { showContent, toggleCompleteContent, buildControls, setActiveState } from './View/output';
/* VIEW PROPERTY */
import { currentState } from './View/output';

/* SVG */
import sun from './images/icon-sun.svg';
import moon from './images/icon-moon.svg';
/* STYLES */
import styles from './styles/styles.css';

const init = () => {
  // set start theme
  setTheme({ sun, moon }, 'dark');
  buildControls();
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
    showContent(getAllData(), getActiveData().length);

    // clear input
    input.value = '';

    createCheckBoxEvents();
  }
});

/* OBSERVER */
observeElement('#all').then((all) => {
  const active = document.querySelector('#active');
  const complete = document.querySelector('#complete');

  all.addEventListener('click', (e) => {
    showContent(getAllData(), getActiveData().length);
    createCheckBoxEvents();
    setActiveState({ first: active, second: complete }, all);
  });

  active.addEventListener('click', () => {
    showContent(getActiveData(), getActiveData().length);
    createCheckBoxEvents();
    setActiveState({ first: all, second: complete }, active);
  });

  complete.addEventListener('click', () => {
    showContent(getCompletedData(), getActiveData().length);
    createCheckBoxEvents();
    setActiveState({ first: all, second: active }, complete);
  });
});

/* FUNCTIONS */
function completeTodo() {
  try {
    // modify Data
    editData(this.parentNode.getAttribute('key'));
    // modify UI
    toggleCompleteContent(this.nextElementSibling, getActiveData().length);

    // check wich current state for refreshing content
    if (currentState === 'active') {
      showContent(getActiveData(), getActiveData().length);
      createCheckBoxEvents();
      return;
    }

    if (currentState === 'complete') {
      showContent(getCompletedData(), getActiveData().length);
      createCheckBoxEvents();
      return;
    }
  } catch (error) {
    alert(error);
  }
}

const createCheckBoxEvents = () => {
  const allCheckboxes = document.querySelectorAll('.check');
  //  remove all Eventlistener from nodelist
  allCheckboxes.forEach((el) => el.removeEventListener('click', completeTodo));
  // add all Eventlistener on nodelist
  allCheckboxes.forEach((el) => el.addEventListener('click', completeTodo));
};
