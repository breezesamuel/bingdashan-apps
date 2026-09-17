// extra pain-tools data (batch 2) + merged generator
const fs=require('fs'),path=require('path');
const OUT='C:/bingdashan/pain-tools';
const IND='C:/bingdashan/pain-tools-index.html';
const tools=require('C:/bingdashan/tools-data.js');
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function page(t){
 let inp=(t.inputs||'');
 let j=t.js||'document.getElementById("o").textContent="done";';
 return `<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(t.t)}</title><style>body{font-family:system-ui,sans-serif;max-width:640px;margin:40px auto;padding:0 16px;line-height:1.7;color:#222}
h1{font-size:1.5rem}.box{border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin:16px 0}
input,textarea,select{width:100%;box-sizing:border-box;padding:10px;border:1px solid #d1d5db;border-radius:8px;font-size:1rem;margin-top:4px}
button{margin-top:12px;padding:10px 18px;background:#111;color:#fff;border:0;border-radius:8px;cursor:pointer;font-size:1rem}
.out{margin-top:14px;padding:12px;background:#f3f4f6;border-radius:8px;white-space:pre-wrap}
.k{font-size:.8rem;color:#666;margin-top:28px}.nav{font-size:.85rem;margin-bottom:20px}</style></head><body>
<div class="nav">◀ <a href="../index.html">← 回工具总表</a> · 👥 ${esc(t.p)} · 痛点: ${esc(t.pain)}</div>
<h1>${esc(t.t)}</h1><div class="box">${inp}
<button onclick="go()">开始</button><div class="out" id="o">结果在这里</div></div>
<p class="k">只服务「${esc(t.p)}」人群 · 免费 · bingdashan pain-tools</p>
<script>${j}</script></body></html>`;
}
function attach(t){
 const j=t.js||'';
 let h='';
 if(/T1/.test(j)) h+='<label>输入 A</label><textarea id="T1" rows="4" placeholder="贴内容..."></textarea>';
 if(/T2/.test(j)) h+='<label>输入 B</label><textarea id="T2" rows="3" placeholder="第二段..."></textarea>';
 if(/N1/.test(j)) h+='<label>数值 1</label><input id="N1" type="number" placeholder="0">';
 if(/N2/.test(j)) h+='<label>数值 2</label><input id="N2" type="number" placeholder="0">';
 if(/N3/.test(j)) h+='<label>数值 3</label><input id="N3" type="number" placeholder="0">';
 if(/S1/.test(j)) h+='<label>字段</label><input id="S1" type="text" placeholder="名字/标题/城市...">';
 if(/S2/.test(j)) h+='<label>字段2</label><input id="S2" type="text" placeholder="另一项...">';
 if(/D1/.test(j)) h+='<label>日期</label><input id="D1" type="date">';
 if(!h) h='<label>输入</label><input id="T1" type="text" placeholder="输入内容">';
 return h;
}
fs.mkdirSync(OUT,{recursive:true});
let cards=[];
tools.forEach(t=>{const dir=path.join(OUT,t.n);fs.mkdirSync(dir,{recursive:true});t.inputs=attach(t);fs.writeFileSync(path.join(dir,'index.html'),page(t),'utf8');cards.push(t);});
const byPersona={};cards.forEach(c=>{(byPersona[c.p]=byPersona[c.p]||[]).push(c);});
let html=`<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>bingdashan 痛点工具箱 · ${cards.length} 个免费小工具</title><style>
body{font-family:system-ui,sans-serif;max-width:960px;margin:0 auto;padding:24px 16px;line-height:1.6;color:#222}
h1{font-size:1.8rem}input#q{width:100%;max-width:480px;padding:12px;border:1px solid #d1d5db;border-radius:8px;font-size:1.05rem}
.cat{margin-top:24px;font-size:1.25rem;font-weight:600;border-bottom:2px solid #111;padding-bottom:6px}
.g{display:flex;flex-wrap:wrap;gap:12px;margin-top:10px}
.c{flex:1 1 280px;border:1px solid #e5e7eb;border-radius:12px;padding:14px;text-decoration:none;color:inherit;transition:box-shadow .15s}
.c:hover{box-shadow:0 4px 16px rgba(0,0,0,.08)}.c b{display:block;margin-bottom:4px}
.c span{font-size:.85rem;color:#666}.ct{font-size:.75rem;color:#999;margin-top:6px}
.note{font-size:.8rem;color:#888}</style></head><body>
<h1>🧰 bingdashan 痛点工具箱 · ${cards.length} 个</h1>
<p>每个工具只服务 <b>一类人</b> 的 <b>一个痛点</b> · 全免费 · 自托管 · 可搜索</p>
<input id="q" placeholder="搜: 学生/求职/卖家/开场白/算价…" oninput="f(this.value)">
`;
Object.keys(byPersona).forEach(p=>{html+=`<div class="cat">👥 ${p} <span style="font-weight:400;color:#999;font-size:.9rem">×${byPersona[p].length}</span></div><div class="g">`+byPersona[p].map(c=>`<a class="c" href="${c.n}/"><b>${c.t}</b><span>${c.pain}</span><div class="ct">痛点工具 · 免费</div></a>`).join('')+`</div>`;});
html+=`<script>function f(v){v=v.trim().toLowerCase();document.querySelectorAll('.g').forEach(g=>{let s=0;g.querySelectorAll('.c').forEach(c=>{const k=(c.textContent||'').toLowerCase();c.style.display=(!v||k.includes(v))?'':'none';if(!v||k.includes(v))s++;});g.style.display=(!v||s)?'':'none';});}</script>
<div class="note" style="margin-top:40px">bingdashan pain-tools · 主目录: <a href="../index.html">回 1027 总库</a></div></body></html>`;
fs.writeFileSync(IND,html,'utf8');
console.log('generated '+cards.length+' tools');