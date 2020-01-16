import { updateData as updateImageSize } from './modules/_responsiveHome.js';
// Execute onload, so that the background image is already loaded.

window.addEventListener('load', updateImageSize);
window.addEventListener('resize', updateImageSize);

//Open / Close Menu
const menuIcon = document.querySelector('.top-nav-menu-bars');
const menuList = document.querySelector('.top-nav-list');
menuIcon.addEventListener('click', function() {
  menuIcon.classList.toggle('top-nav-menu-x');
  menuList.classList.toggle('top-nav-list-mobile');
});
// Remove Mobile Classes on bigger Screens
const screenBig = window.matchMedia('(min-width: 1300px)');
window.addEventListener('resize', function() {
  if (screenBig.matches) {
    menuList.classList = 'top-nav-list';
    menuIcon.classList = 'top-nav-menu-bars';
  }
});
