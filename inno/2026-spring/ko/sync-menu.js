const fs = require('fs');
const path = require('path');

const menuItems = [
  { href: 'index.html', label: '首頁' },
  { href: 'vocab.html', label: '情境單字學習' },
  { href: 'quiz.html', label: '選擇題測驗' },
  { href: 'fill-blank.html', label: '填空練習' },
  { href: 'resources.html', label: '資源中心' },
  { href: 'stats.html', label: '統計資料' },
  { href: 'how-it-works.html', label: '如何運作' },
  { href: 'about-us.html', label: '關於我們' },
  { href: 'contact-us.html', label: '聯絡我們' }
];

const menuHTML = `  <nav>
    <ul>
${menuItems.map(item => `      <li><a href="${item.href}">${item.label}</a></li>`).join('\n')}
    </ul>
  </nav>`;

function generateActiveMenu(currentPage) {
  return `  <nav>
    <ul>
${menuItems.map(item => {
  const isActive = item.href === currentPage ? ' class="active"' : '';
  return `      <li><a href="${item.href}"${isActive}>${item.label}</a></li>`;
}).join('\n')}
    </ul>
  </nav>`;
}

const koDir = __dirname;

function syncMenu() {
  const files = fs.readdirSync(koDir).filter(f => f.endsWith('.html'));
  
  files.forEach(file => {
    const filePath = path.join(koDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const activeMenu = generateActiveMenu(file);
    const oldNavPattern = /(\n  <nav>\n[\s\S]*?<\/nav>)/;
    
    if (oldNavPattern.test(content)) {
      content = content.replace(oldNavPattern, activeMenu);
      fs.writeFileSync(filePath, content);
      console.log(`Updated: ${file}`);
    }
  });
  
  console.log(`Synced menu to ${files.length} files.`);
}

if (require.main === module) {
  syncMenu();
}

module.exports = { menuItems, generateActiveMenu, syncMenu };