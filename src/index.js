/* UI */
import setTheme from './Model/theme';
/* SVG */
import sun from './images/icon-sun.svg';
import moon from './images/icon-moon.svg';
/* CSS */
import styles from './styles/styles.css';

const init = () => {
  // set start theme
  setTheme(sun, 'dark');
};

// RUN
init();
