var fs = require('fs');
var path = require('path');
var out = 'C:/bingdashan/out';
var files = fs.readdirSync(out).filter(function (f) { return /\.html$/.test(f); }).sort();
var rows = files.map(function (f) {
  return '<li><a href="out/' + f + '">' + f.replace('.html', '') + '</a></li>';
}).join('');
var css = [
  'body{font-family:system-ui,sans-serif;max-width:920px;margin:36px auto;padding:0 16px;background:#0d1017;color:#dfe6f0}',
  '.title{font-size:24px;font-weight:700;margin-bottom:6px}',
  '.meta{color:#8790a3;font-size:13px;margin-bottom:18px}',
  'input{width:100%;box-sizing:border-box;padding:11px 12px;border-radius:8px;border:1px solid #232a37;background:#151a24;color:#e6ecf6;font-size:14px;margin-bottom:16px}',
  'ul{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px}',
  'li a{display:block;padding:11px 13px;border-radius:8px;border:1px solid #232a37;background:#12161f;color:#c9d2e0;text-decoration:none;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
  'li a:hover{background:#1a2230;color:#fff}'
].join('');
var html = [
  '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width,initial-scale=1">',
  '<title>App Catalog</title><style>', css, '</style></head><body>',
  '<div class="title">App Catalog</div>',
  '<div class="meta">' + files.length + ' apps on disk | ',
  Math.round(files.reduce(function (a, f) { return a + fs.statSync(path.join(out, f)).size; }, 0) / 1024),
  ' KB | pure ASCII | open any card to run locally</div>',
  '<input id="q" placeholder="search apps" oninput="filter()">',
  '<ul>' + rows + '</ul>',
  '<script>function filter(){var q=document.getElementById("q").value.toLowerCase();',
  'var li=document.querySelectorAll("li");for(var i=0;i<li.length;i++){',
  'li[i].style.display=li[i].textContent.toLowerCase().indexOf(q)>-1?"":"none";}}</script>',
  '</body></html>'
].join('');
fs.writeFileSync('C:/bingdashan/index.html', html, 'utf8');
console.log('index.html written: C:/bingdashan/index.html');
console.log('apps linked: ' + files.length);
