const headerContent = document.querySelector('.head-content');

/* PROPERTIES */
export let isDark = true;

const themeObj = {
  header: document.querySelector('header'),
  main: document.querySelector('main'),
  input: document.querySelector('.main-body .input input[name="input"]'),
  output: document.querySelector('.output'),
  itemBorder: document.querySelectorAll('.item'),
};

const themes = {
  dark: {
    header: 'dark-header',
    main: 'dark-main',
    list: 'dark-list',
    border: 'dark-border',
  },
  light: {
    header: 'light-header',
    main: 'light-main',
    list: 'light-list',
    border: 'light-border',
  },
};

const setTheme = (svg, themeType) => {
  switch (themeType) {
    case 'dark':
      // set new svg icon
      headerContent.insertAdjacentHTML('beforeend', `<img src="${svg}" data="light">`);
      // set bool
      isDark = true;
      // set theme
      replaceTheme(isDark);

      break;
    case 'light':
      // set new svg icon
      headerContent.insertAdjacentHTML('beforeend', `<img src="${svg}" data="dark">`);
      // set bool
      isDark = false;
      // set theme
      replaceTheme(isDark);
      break;

    default:
      break;
  }
};

const replaceTheme = (_isDark) => {
  console.log(_isDark);
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
      _isDark ? themes.dark.border : themes.dark.border
    );
  });
};

export default setTheme;
