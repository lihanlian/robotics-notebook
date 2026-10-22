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

// Reuse Kramdown's outline so heading exclusions, formatting, and links stay intact.
document.addEventListener('DOMContentLoaded', function () {
  var toc = document.querySelector('#main-content > main > #markdown-toc');
  if (!toc || !toc.querySelector('a[href^="#"]')) return;

  var wrap = toc.closest('.main-content-wrap');
  var main = toc.closest('.main');
  if (!wrap || !main) return;

  var heading = toc.previousElementSibling;
  if (!heading || !/^H[1-6]$/.test(heading.tagName)) heading = null;

  // Mark both positions so small screens and printing retain the original order.
  var tocPosition = document.createComment('Notebook inline table of contents');
  toc.before(tocPosition);
  var headingPosition;
  if (heading) {
    headingPosition = document.createComment('Notebook inline contents heading');
    heading.before(headingPosition);
  }

  var sidebar = document.createElement('nav');
  // The theme scopes list numbering and heading styles to .main-content.
  sidebar.className = 'notebook-toc main-content';
  if (heading && heading.id) sidebar.setAttribute('aria-labelledby', heading.id);
  else sidebar.setAttribute('aria-label', 'Table of contents');

  var scroll = document.createElement('div');
  scroll.className = 'notebook-toc__scroll';
  sidebar.appendChild(scroll);

  var desktop = window.matchMedia('(min-width: 1024px)');
  var print = window.matchMedia('print');
  var preparingPrint = false;
  var inSidebar = false;
  var heightPending = false;

  function fitSidebar() {
    heightPending = false;
    if (!inSidebar) return;
    // Before it sticks, the outline starts below the header and breadcrumbs.
    var top = Math.max(16, sidebar.getBoundingClientRect().top);
    sidebar.style.setProperty('--notebook-toc-top', top + 'px');
  }

  function scheduleFit() {
    if (!inSidebar || heightPending) return;
    heightPending = true;
    window.requestAnimationFrame(fitSidebar);
  }

  function updatePlacement() {
    var useSidebar = desktop.matches && !print.matches && !preparingPrint;
    if (useSidebar === inSidebar) return;

    if (useSidebar) {
      if (heading) sidebar.insertBefore(heading, scroll);
      scroll.appendChild(toc);
      wrap.appendChild(sidebar);
      main.classList.add('notebook-has-toc');
    } else {
      if (heading) headingPosition.after(heading);
      tocPosition.after(toc);
      sidebar.remove();
      main.classList.remove('notebook-has-toc');
    }
    inSidebar = useSidebar;
    fitSidebar();
  }

  window.addEventListener('scroll', scheduleFit, { passive: true });
  window.addEventListener('resize', scheduleFit);

  [desktop, print].forEach(function (query) {
    if (query.addEventListener) query.addEventListener('change', updatePlacement);
    else query.addListener(updatePlacement);
  });
  window.addEventListener('beforeprint', function () {
    preparingPrint = true;
    updatePlacement();
  });
  window.addEventListener('afterprint', function () {
    preparingPrint = false;
    updatePlacement();
  });
  updatePlacement();
}, { once: true });
