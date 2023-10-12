/* MODEL PROPERTY */
import { isDark } from '../Model/theme';
/* CONTAINER */
const output = document.querySelector('.output');
const outputItems = document.querySelector('.output-items');
let count;

/* PROPERTIES */
export let currentState;

export const showContent = (contentArr, activeItems) => {
  // clear output
  outputItems.innerHTML = '';

  buildContent(contentArr, activeItems);
};

export const toggleCompleteContent = (element, activeItems) => {
  element.classList.contains('line-trough')
    ? element.classList.remove('line-trough')
    : element.classList.add('line-trough');

  // change items left
  count.innerText = activeItems;
};

const buildContent = (contentArr, activeItems) => {
  const contentItems = contentArr.map((item) => {
    return `
      <div class="item ${isDark ? 'dark-border' : 'light-border'}" key="${item.id}">
          <input type="checkbox" class="check" ${item.completed ? 'checked' : ''}>
          <span class="${item.completed ? 'line-trough' : ''}">${item.content}</span>
          <span class="clear-item">x</span>
      </div>    
    `;
  });

  outputItems.insertAdjacentHTML('beforeend', contentItems.join(''));
  count.innerText = activeItems;
};

export const buildControls = () => {
  // build controls
  const controls = `
    <div class="output-controls">
      <p><span class="count">0</span> items left</p>
      <div class="sort">
        <p data="all" class="clicked-active" id="all">All</p>
        <p data="active" id="active">Active</p>
        <p data="complete" id="complete">Completed</p>
      </div>
      <div class="clear">
        <p data="clear-completed" id="clear-completed">Clear Completed</p>
      </div>
    </div>
  `;

  output.insertAdjacentHTML('beforeend', controls);
  count = document.querySelector('.count');
};

export const setActiveState = (stateObj, activeState) => {
  // remove active state
  stateObj.first.classList.remove('clicked-active');
  stateObj.second.classList.remove('clicked-active');

  // add active state
  activeState.classList.add('clicked-active');

  // set current state
  currentState = activeState.id !== 'all' ? activeState.id : null;
};
