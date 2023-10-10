/* MODEL PROPERTY */
import { isDark } from '../Model/theme';
/* CONTAINER */
const output = document.querySelector('.output');

export const showContent = (contentArr) => {
  // clear output
  output.innerHTML = '';

  // build controls
  let uncompletedItems = contentArr.filter((c) => c.completed === false).length;
  const controls = `
    <div class="output-controls">
          <p><span class="count">${uncompletedItems}</span> items left</p>
          <div class="sort">
            <p data="all">All</p>
            <p data="active">Active</p>
            <p data="complete">Completed</p>
          </div>
          <div class="clear">
            <p data="clear-completed">Clear Completed</p>
          </div>
        </div>
  `;

  const contentItems = contentArr.map((item) => {
    return `
      <div class="item ${isDark ? 'dark-border' : 'light-border'}" key="${item.id}">
          <input type="checkbox" class="check">
          <span>${item.content}</span>
      </div>    
    `;
  });

  // push controls to items
  contentItems.push(controls);

  output.insertAdjacentHTML('beforeend', contentItems.join(''));
};
