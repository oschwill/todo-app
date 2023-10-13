export const dragList = document.querySelector('.output-items');
let draggedItem = null;
let isNextTarget = false;
let previousTarget = null;
let targetStartY = 0;
let cloneDragElement;

// Drag start event handler
export const handleDragStart = (event) => {
  targetStartY = event.clientY;
  draggedItem = event.target;

  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', draggedItem.outerHTML);
  draggedItem.style.backgroundColor = 'hsl(280, 78%, 13%)';
  draggedItem.style.border = '3px solid black';

  // event.dataTransfer.setDragImage(draggedItem, 0, 0);
};

// Drag over event handler
export const handleDragOver = (event) => {
  if (event.preventDefault) {
    event.preventDefault(); // Necessary. Allows us to drop.
  }

  const targetItem = event.target;

  if (!isNextTarget) {
    previousTarget = targetItem;
    isNextTarget = true;
  }

  event.dataTransfer.dropEffect = 'move';

  if (
    targetItem !== draggedItem &&
    (targetItem.classList.contains('item') || targetItem.parentNode.classList.contains('item'))
  ) {
    targetItem.parentNode.classList.contains('item')
      ? (targetItem.parentNode.style.borderTop = '3px solid red')
      : (targetItem.style.borderTop = '3px solid red');

    if (targetItem !== previousTarget || targetItem === draggedItem) {
      previousTarget.style.borderTop = '';
      isNextTarget = false;
    }
  } else {
    previousTarget.style.borderTop = '';
    isNextTarget = false;
  }

  return false;
};

// Drop event handler
export const handleDrop = (event) => {
  if (event.stopPropagation) {
    event.stopPropagation(); // Stops some browsers from redirecting.
  }

  const targetItem = event.target;

  if (targetItem !== draggedItem && targetItem.classList.contains('item')) {
    if (event.clientY < targetStartY) {
      targetItem.parentNode.insertBefore(draggedItem, targetItem);
    } else {
      targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
    }
  }

  targetItem.style.borderTop = '';
  targetItem.style.borderBottom = '';
  draggedItem.style.backgroundColor = '';
  draggedItem.style.border = '';
  draggedItem = null;
};
