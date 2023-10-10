export const headerContent = document.querySelector('.head-content');

/* PROPERTIES */
export let isDark = true;

const themeObj = {
  header: document.querySelector('header'),
  main: document.querySelector('main'),
  input: document.querySelector('.main-body .input input[name="input"]'),
  output: document.querySelector('.output'),
  itemBorder: document.querySelectorAll('.item'),
  root: document.documentElement,
};

export const input = themeObj.input;

const themes = {
  dark: {
    header: 'dark-header',
    main: 'dark-main',
    list: 'dark-list',
    border: 'dark-border',
    hover: 'hsl(236, 33%, 92%)',
  },
  light: {
    header: 'light-header',
    main: 'light-main',
    list: 'light-list',
    border: 'light-border',
    hover: 'hsl(235, 21%, 11%)',
  },
};

const setTheme = (svg, themeType) => {
  let svgImageElement = document.createElement('img');

  switch (themeType) {
    case 'dark':
      // set element properties
      svgImageElement.setAttribute('src', svg.sun);
      svgImageElement.setAttribute('data', 'light');

      // set bool
      isDark = true;

      break;
    case 'light':
      // set element properties
      svgImageElement.setAttribute('src', svg.moon);
      svgImageElement.setAttribute('data', 'dark');

      // set bool
      isDark = false;
      break;

    default:
      break;
  }

  // set new svg icon
  headerContent.lastChild.tagName === 'IMG'
    ? headerContent.lastChild.replaceWith(svgImageElement)
    : headerContent.insertAdjacentElement('beforeend', svgImageElement);

  // set theme
  replaceTheme(isDark);
};

const replaceTheme = (_isDark) => {
  themeObj.header.classList.replace(
    _isDark ? themes.light.header : themes.dark.header,
    _isDark ? themes.dark.header : themes.light.header
  );
  themeObj.main.classList.replace(
    _isDark ? themes.light.main : themes.dark.main,
    _isDark ? themes.dark.main : themes.light.main
  );
  themeObj.input.classList.replace(
    _isDark ? themes.light.list : themes.dark.list,
    _isDark ? themes.dark.list : themes.light.list
  );
  themeObj.output.classList.replace(
    _isDark ? themes.light.list : themes.dark.list,
    _isDark ? themes.dark.list : themes.light.list
  );
  themeObj.itemBorder?.forEach((item) => {
    item.classList.replace(
      _isDark ? themes.light.border : themes.dark.border,
      _isDark ? themes.dark.border : themes.light.border
    );
  });
  // Set hover color
  themeObj.root.style.setProperty(
    '--hover-color',
    _isDark ? themes.dark.hover : themes.light.hover
  );
};

export default setTheme;
