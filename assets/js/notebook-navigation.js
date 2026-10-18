// Run after the theme's DOMContentLoaded handler opens the active branch.
document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('site-nav');
  if (!nav) return;

  var currentLink = nav.querySelector('.nav-list-link.active');
  if (currentLink) currentLink.setAttribute('aria-current', 'page');

  nav.querySelectorAll('.nav-list-expander').forEach(function (button) {
    button.setAttribute('aria-expanded', String(button.parentElement.classList.contains('active')));
  });
}, { once: true });
