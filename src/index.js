import sun from './images/icon-sun.svg';
import styles from './styles/styles.css';

console.log(sun);

const header = document.querySelector('.head-content');

header.insertAdjacentHTML('beforeend', `<img src="${sun}" >`);
