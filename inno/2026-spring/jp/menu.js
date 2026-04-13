const menuItems = [
  { href: 'index.html', label: 'Home' },
  { href: 'focus-forest.html', label: 'Focus Forest' },
  { href: 'culture-lab.html', label: 'Culture Lab' },
  { href: 'coming-soon.html', label: 'Story Mode' },
  { href: 'coming-soon.html', label: 'Vocabulary Trainer' },
  { href: 'my-progress.html', label: 'My Progress' },
  { href: 'stats.html', label: 'Stats' },
  { href: 'library.html', label: 'Library' },
  { href: 'coming-soon.html', label: 'IoT / Smart Scan' },
  { href: 'coming-soon.html', label: 'Account & Settings' },
  { href: 'about-us.html', label: 'About' },
];

function getCurrentPage() {
  const href = window.location.href;
  const pathname = window.location.pathname;
  const file = pathname.split('/').pop() || 'index.html';
  return { file, href };
}

function isActive(item) {
  const { file, href } = getCurrentPage();
  if (file === 'coming-soon.html') return false;
  const itemUrl = new URL(item.href, window.location.origin + window.location.pathname.replace(/[^/]+$/, ''));
  return itemUrl.pathname.endsWith(file) || href.includes(item.href);
}

function initMenu() {
  const container = document.getElementById('menu-container');
  if (!container) return;

  const currentPage = getCurrentPage();

  const html = `
    <nav>
      <ul>
        ${menuItems.map(item => `
          <li><a href="${item.href}" ${isActive(item) ? 'class="active"' : ''}>${item.label}</a></li>
        `).join('')}
      </ul>
      <button class="nav-toggle" onclick="toggleMenu()">☰</button>
    </nav>
    <div class="overlay" onclick="toggleMenu()"></div>
    <div class="side-menu">
      <ul>
        ${menuItems.map(item => `
          <li><a href="${item.href}" ${isActive(item) ? 'class="active"' : ''}>${item.label}</a></li>
        `).join('')}
      </ul>
    </div>
  `;

  container.innerHTML = html;
}

function toggleMenu() {
  document.querySelector('.side-menu').classList.toggle('open');
  document.querySelector('.overlay').classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', initMenu);