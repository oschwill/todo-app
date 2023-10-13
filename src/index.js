/* MODEL FUNCTIONS */
import setTheme, { input } from './Model/theme';
import {
  getAllData,
  setData,
  getActiveData,
  getCompletedData,
  editData,
  clearAllCompletedData,
  clearDataRow,
} from './Model/data';
import { dragList, handleDragStart, handleDragOver, handleDrop } from './Model/itemmover';
import observeElement from './Model/observer';
/* MODEL CONTAINER */
import { headerContent } from './Model/theme';
/* VIEW FUNCTIONS */
import {
  showContent,
  toggleCompleteContent,
  buildControls,
  setActiveState,
  removeItem,
} from './View/output';
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
  if (e.target.localName !== 'img') {
    return;
  }

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

    // clear input
    input.value = '';

    // output all content
    process(
      { data: getAllData(), itemCount: getActiveData().length },
      setActiveState({ first: complete, second: active }, all)
    );
  }
});

// Add event listeners for drag and drop events
dragList.addEventListener('dragstart', handleDragStart);
dragList.addEventListener('dragover', handleDragOver);
dragList.addEventListener('drop', handleDrop);

/* OBSERVER */
observeElement('#all').then((all) => {
  const active = document.querySelector('#active');
  const complete = document.querySelector('#complete');
  const clearCompleted = document.querySelector('#clear-completed');

  all.addEventListener('click', (e) => {
    process(
      { data: getAllData(), itemCount: getActiveData().length },
      setActiveState({ first: active, second: complete }, all)
    );
  });

  active.addEventListener('click', () => {
    process(
      { data: getActiveData(), itemCount: getActiveData().length },
      setActiveState({ first: all, second: complete }, active)
    );
  });

  complete.addEventListener('click', () => {
    process(
      { data: getCompletedData(), itemCount: getActiveData().length },
      setActiveState({ first: all, second: active }, complete)
    );
  });

  clearCompleted.addEventListener('click', () => {
    clearAllCompletedData();
    if (currentState === 'complete') {
      process({ data: getCompletedData(), itemCount: getActiveData().length });
      return;
    }

    process({ data: getAllData(), itemCount: getActiveData().length });
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
      process({ data: getActiveData(), itemCount: getActiveData().length });
      return;
    }

    if (currentState === 'complete') {
      process({ data: getCompletedData(), itemCount: getActiveData().length });
      return;
    }
  } catch (error) {
    alert(error);
  }
}

function clearSingleData() {
  // clear row
  let element = this.parentNode;
  clearDataRow(element.getAttribute('key'));

  // clear element in dom
  removeItem(element);
}

const createEvents = () => {
  const allCheckboxes = document.querySelectorAll('.check');
  const clearSingleTodos = document.querySelectorAll('.clear-item');
  //  remove all Eventlistener from nodelist
  allCheckboxes.forEach((el) => el.removeEventListener('click', completeTodo));
  clearSingleTodos.forEach((el) => el.removeEventListener('click', clearSingleData));
  // add all Eventlistener on nodelist
  allCheckboxes.forEach((el) => el.addEventListener('click', completeTodo));
  clearSingleTodos.forEach((el) => el.addEventListener('click', clearSingleData));
};

const process = (dataObj, callback) => {
  showContent(dataObj.data, dataObj.itemCount);
  createEvents();

  if (typeof callback == 'function') callback();
};
