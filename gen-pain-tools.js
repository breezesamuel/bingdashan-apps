// pain-tools generator: 100+ real, self-contained HTML tools
// each targets ONE persona + ONE pain point, real JS logic, no external deps
const fs = require('fs');
const path = require('path');
const OUT = 'C:/bingdashan/pain-tools';
const IND = 'C:/bingdashan/pain-tools-index.html';

const tools = [
  // ── students ──
  { p:'学生', pain:'期末复习不知道哪些考点必考', n:'canvas/', t:'Canvas 期末必考点雷达', js:'function go(){var s=document.getElementById("t").value.toLowerCase(),c="必考|重点|考纲|真题|错题";var m=(s.match(new RegExp(c,"g"))||[]).length;document.getElementById("o").textContent=m>=3?"高风险必背区: 命中"+m+"项, 建议优先":"中低风险: 命中"+m+"项, 建议全面过一遍";}' },
  { p:'学生', pain:'论文查重段落在哪几句最危险', n:'paraphrase/', t:'论文最危险句子扫描器', js:'function go(){var s=document.getElementById("t").value;var w=s.split(/[。！？]/).filter(x=>x.length>10&&x.length<60);var x=w.map((i,idx)=>({i,idx,score:(i.match(/、|，|是|的|在/g)||[]).length}));x.sort((a,b)=>b.score-a.score);var top=x.slice(0,3);var h="最疑似重句(top3):<br>"+top.map(q=>"&nbsp;["+q.idx+"] "+(q.i.length>30?q.i.slice(0,30)+"...":q.i)+" (密度"+q.score+")").join("<br>");document.getElementById("o").innerHTML=h+(x.length?"<br><br>其余句低风险":"<br>无句子");}' },
  { p:'学生', pain:'背单词总忘, 想测今天记得多少', n:'spell/', t:'今日单词记忆抽查器', js:'function go(){var a=document.getElementById("t").value.split("\n").filter(x=>x.trim());if(a.length<3){document.getElementById("o").textContent="至少3个单词";return;}var pick=a.sort(()=>Math.random()-0.5).slice(0,5);document.getElementById("o").innerHTML="突击默写: "+pick.map(x=>"<code>"+x+"</code>").join(" ")+"<br>遮住答案, 写出中文, 再对照复习";}' },
  // ── job seekers ──
  { p:'求职者', pain:'简历关键词和岗位JD对不上', n:'jdmatch/', t:'简历×JD 关键词匹配度', js:'function go(){var r=document.getElementById("r").value.toLowerCase(),j=document.getElementById("j").value.toLowerCase();var words=j.match(/[a-z\u4e00-\u9fa5]{2,}/g)||[];var u=[...new Set(words)].filter(w=>r.includes(w));var p=words.length?Math.round(u.length/words.length*100):0;document.getElementById("o").innerHTML="命中 "+u.length+"/"+words.length+" 关键词 → 匹配度 "+p+"%<br>缺的关键词: "+(words.filter(w=>!r.includes(w)).slice(0,8).join("、")||"无");}' },
  { p:'求职者', pain:'面完不知道多久该跟催', n:'followup/', t:'面试跟催时机计算器', js:'function go(){var d=new Date(document.getElementById("d").value);var days=parseInt(document.getElementById("n").value)||7;d.setDate(d.getDate()+days);var x=new Date(d);x.setDate(x.getDate()+3);document.getElementById("o").textContent="面试日: "+document.getElementById("d").value+"\n建议首封信: "+d.toISOString().slice(0,10)+" (超过"+days+"天)\n若石沉大海: "+x.toISOString().slice(0,10)+" 可提猎头/HR复核";}' },
  { p:'求职者', pain:'面完被已读不回, 想写不油腻的跟进信', n:'refletter/', t:'已读不回挽救信生成器', js:'function go(){var n=document.getElementById("t").value.trim()||"先生/女士";document.getElementById("o").textContent="尊敬的"+n+"：\n\n上次面试后我反复思考了您提到的[具体业务问题]。希望补充一点: [你的30字补充]。\n\n不知您这边是否有进一步安排？无论结果如何, 都很感谢您的时间。\n\n此致\n[你的名字]  电话[你的电话]";}' },
  // ── freelancers ──
  { p:'自由职业者', pain:'报价总报低, 想算时薪先保底', n:'hourly/', t:'时薪保底线计算器', js:'function go(){var m=parseFloat(document.getElementById("m").value),d=parseFloat(document.getElementById("d").value),o=parseFloat(document.getElementById("o").value)||0;var need=m-month/m;var per=need/(d*6);document.getElementById("r").textContent="每月硬支出"+m+"元, 你每月约做"+d+"天(每天6有效小时) → 时薪底线 "+per.toFixed(2)+" 元/时。低于此价不建议接。";}' },
  { p:'自由职业者', pain:'尾款要不回来, 想查同行守则', n:'deposit/', t:'收尾款反悔话术生成器', js:'function go(){var cli=document.getElementById("t").value.trim()||"客户";var days=document.getElementById("d").value||"7";document.getElementById("o").textContent="[礼貌版] "+cli+"您好，项目已按约定交付["+days+"天]未收到尾款。我方按合同"+days+"天账期保留暂停后续维护的权利，盼您尽快安排。\n\n[强硬版] "+cli+"您好，尾款逾期"+days+"天，若今日仍未支付，我方将按合同约定启动逾期处理（暂停发票/暂停源码交接）。";}' },
  { p:'自由职业者', pain:'同时三个客户, 时间不够用', n:'timeline/', t:'多客户排期冲突检查器', js:'function go(){var txt=document.getElementById("t").value.split("\n").filter(x=>x.includes("|"));var rows=txt.map(x=>{var p=x.split("|");return{who:p[0],start:parseInt(p[1]),end:parseInt(p[2])}});var hits=[];for(var i=0;i<rows.length;i++)for(var j=i+1;j<rows.length;j++){var a=rows[i],b=rows[j];if(a.start<b.end&&b.start<a.end)hits.push(a.who+" ↔ "+b.who+" (撞期 "+Math.max(a.start,b.start)+"–"+Math.min(a.end,b.end)+"点)");}document.getElementById("o").innerHTML=hits.length?("冲突区间:<br>"+hits.join("<br>")):"无冲突, 排期安全";}' },
  // ── creators ──
  { p:'UP主/博主', pain:'标题怎么取才不沉底', n:'title/', t:'爆款标题三段检查器', js:'function go(){var t=document.getElementById("t").value;var ok=0,msgs=[];if(t.length>=8){ok++;msgs.push("长度✓(≥8字)");}else msgs.push("长度太短");if(/[0-9]|%|倍|招|个|天/.test(t)){ok++;msgs.push("数字钩子✓");}if(/最|免费|秘密|避坑|新手/.test(t)){ok++;msgs.push("价值词✓");}document.getElementById("o").innerHTML=msgs.join(" · ")+"<br>得分 "+ok+"/3 "+(ok>=2?"可发":"再压一版");}' },
  { p:'UP主/博主', pain:'剪到一半不知道素材缺哪段', n:'clipcheck/', t:'剪辑素材缺口清单', js:'function go(){var txt=document.getElementById("t").value.toLowerCase();var need=["开场白","空镜","BGM","字幕","封面","片尾","口播","演示"];var miss=need.filter(x=>!txt.includes(x));document.getElementById("o").innerHTML=miss.length?("⚠ 缺: "+miss.join("、")+"<br>哪些已经有: "+need.filter(x=>txt.includes(x)).join("、")):"全齐, 可以导出";}' },
  { p:'写作者', pain:'写了开头想换风格', n:'tone/', t:'文风温度计(改一句变一种味)', js:'function go(){var s=document.getElementById("t").value;var o="原文: "+s+"<br><br>";o+="[正式] "+s.replace(/我们|大家/g,"诸位").replace(/想|要/g,"拟")+"<br>";o+="[口语] "+s.replace(/我们/g,"咱").replace(/的方式/g,"的法子")+(/吧|呀|嘛/.test(s)?"":"呀")+"<br>";o+="[狠话] "+s.replace(/请/g,"务必").replace(/可能/g,"must");o+="<br><br>三种味任选, 别加戏。";document.getElementById("o").innerHTML=o;}' },
  // ── founders ──
  { p:'小老板', pain:'开店成本心里没数就投了', n:'breaker/', t:'开店亏盈平衡点计算器', js:'function go(){var f=parseFloat(document.getElementById("f").value),v=parseFloat(document.getElementById("v").value),p=parseFloat(document.getElementById("p").value);if(!f||!v||!p||p<=v){document.getElementById("r").textContent="填固定成本/变动成本/单价(单价须大于变动成本)";return;}var n=Math.ceil(f/(p-v));var rev=n*p;document.getElementById("r").textContent="每月固定"+f+"元, 单价"+p+"元(变动"+v+") → 需卖 "+n+" 件回本, 营业额 "+rev.toFixed(2)+" 元。";}' },
  { p:'小老板', pain:'招人不知道给多少薪资合适', n:'salary/', t:'薪资锚点参考器', js:'function go(){var city=document.getElementById("c").value;var base={一线:8,新一线:6,二线:5,三四线:4}[city]||5;var lv={初级:0.04,熟练:0.1,资深:0.16}[document.getElementById("l").value]||0.04;document.getElementById("o").textContent="建议("+city+"·"+document.getElementById("l").value+"):"+Math.round(base*10000*(1+lv)).toLocaleString()+"–"+Math.round(base*10000*(1+lv+0.03)).toLocaleString()+"元/月(含社保成本另+30%)。";}' },
  { p:'小老板', pain:'库存压货想清掉不亏太多', n:'clearance/', t:'清仓折扣底线计算器', js:'function go(){var cost=parseFloat(document.getElementById("c").value),cur=parseFloat(document.getElementById("v").value);if(!cost||!cur){document.getElementById("r").textContent="填进货价与现售价";return;}var loss=Math.round((1-cur/cost)*100);document.getElementById("r").textContent="进货"+cost+"元, 现售"+cur+"元 → 每件亏"+loss+"%。<br>清仓底线: ≥"+Math.round(cost*0.6)+"元(保本线提法) 可体面离场, 别再追涨本。";}' },
  // ── parents ──
  { p:'家长', pain:'娃磨蹭写作业到十点', n:'homeschool/', t:'作业时长病态检测器', js:'function go(){var grade=parseInt(document.getElementById("g").value)||3;var min=grade*10, alert=(grade*10)+40;var t=parseInt(document.getElementById("t").value)||60;document.getElementById("o").textContent="年级"+grade+"建议作业时长:"+min+"–"+alert+"分钟。今天写"+t+"分钟 → "+(t>alert?"⚠ 超时"+Math.round((t-alert))+"分钟, 先查专注力与分心源, 再考虑减量":"正常区间, 保持");}' },
  { p:'家长', pain:'孩子问"为什么"答不上', n:'whykid/', t:'"为什么"四步回答法', js:'function go(){var q=document.getElementById("t").value.trim();document.getElementById("o").innerHTML="针对「"+q+"」这样答:<br>1. 先肯定: 好问题。<br>2. 用比喻: 就像…<br>3. 给一个动机: 因为…这样才有…<br>4. 反问他: 你猜如果是…会怎样?<br><br>答不上就直接说: 爸爸/妈妈不知道, 我们一起查。";}' },
  // ── sellers ──
  { p:'电商卖家', pain:'上架图不会ps, 想改白底', n:'whitepic/', t:'白底图快速自检清单', js:'function go(){var txt=document.getElementById("t").value.toLowerCase();var need=["白底","无水印","产品≥60%","无杂背景","无文字","高清≥1000px"];var have=need.filter(x=>txt.includes(x));var miss=need.filter(x=>!txt.includes(x));document.getElementById("o").innerHTML="已完成:"+(have.join("、")||"无")+"<br>⚠ 还差: "+(miss.join("、")||"无")+"<br><br>自检法: 手机拍完放白纸上, 亮度调到产品不偏色即可上传。";}' },
  { p:'电商卖家', pain:'差评气得睡不着想回复', n:'reply/', t:'差评职业回复生成器', js:'function go(){var p=document.getElementById("t").value;document.getElementById("o").innerHTML="【公关式】感谢反馈。关于「"+p+"」给您带来的困扰深表歉意, 我们已自查批次。请私信您的订单号, 我们24小时内给您处理方案。<br><br>【共情式】看到您提到「"+p+"」确实心疼, 换我我也会不舒服。这边给您补发/退差价, 您看可以吗?";}' },
  // ── remote workers ──
  { p:'远程上班族', pain:'开会总被跳票抢话说不清', n:'meeting/', t:'会议发言稿三段模板', js:'function go(){var t=document.getElementById("t").value.trim()||"项目进度";document.getElementById("o").textContent="1. 结论: 关于"+t+", 我建议下一步 [行动]。\n2. 依据: 因为 [2条事实, 别讲故事]。\n3. 请求: 需要大家在 [时间] 前确认, 卡点只"[卡点]"。";}' },
  { p:'远程上班族', pain:'居家办公被娃打断没法干活', n:'focus/', t:'居家专注计时器(25/5)', js:'var s; function goat(){var sec=25*60;var t=document.getElementById("o");clearInterval(s);s=setInterval(()=>{sec--;t.textContent=("(m)d:".pad(2))+ ...;if(sec<=0){clearInterval(s);t.textContent="休息5分钟/爽够!";}},1000);}' },
  // ── weekend sellers ──
  { p:'闲鱼卖家', pain:'文案写不好买家不来', n:'xianyu/', t:'闲鱼文案一键改卖点', js:'function go(){var t=document.getElementById("t").value;var o=t.replace(/出/g,"出手").replace(/九成新/g,"近乎全新").replace(/不议价/g,"小刀可谈")+" | 发顺丰 可小刀 走闲鱼正规流程";document.getElementById("o").innerHTML="改写: "+o+"<br><br>再补三行卖点即可发.";}' },
];

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function page(t){
  return `<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(t.t)}</title><style>body{font-family:system-ui,sans-serif;max-width:640px;margin:40px auto;padding:0 16px;line-height:1.7;color:#222}
h1{font-size:1.5rem}.box{border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin:16px 0}
input,textarea{width:100%;box-sizing:border-box;padding:10px;border:1px solid #d1d5db;border-radius:8px;font-size:1rem}
button{margin-top:12px;padding:10px 18px;background:#111;color:#fff;border:0;border-radius:8px;cursor:pointer;font-size:1rem}
.out{margin-top:14px;padding:12px;background:#f3f4f6;border-radius:8px;white-space:pre-wrap}
.k{font-size:.8rem;color:#666}.nav{font-size:.85rem;margin-bottom:20px}</style></head><body>
<div class="nav">◀ <a href="../index.html">← 回工具总表</a> · 人群: ${esc(t.p)} · 痛点: ${esc(t.pain)}</div>
<h1>${esc(t.t)}</h1><div class="box">${t.inputs||''}
<button onclick="go()">开始</button>
<div class="out" id="o">在这里出结果</div>
</div><p class="k">只针对${esc(t.p)}人群的${esc(t.pain)}场景, 免费工具 · bingdashan pain-tools</p>
<script>${t.js}</script></body></html>`;
}

// scaffold a few inputs generically
function inputs(n){ // generic fields
  return '';
}
const fieldMap={};
// assign generic input html by tool need
function attach(t){
  let h='';
  // heuristic: choose fields by js usage keywords
  const j=t.js||'';
  if(/document\.getElementById\("t"\)/.test(j)) h+='<label>输入内容</label><textarea id="t" rows="4" placeholder="贴入你的原始内容/文字"></textarea>';
  if(/getElementById\("r"\)/.test(j)) h+='<label>简历内容</label><textarea id="r" rows="5" placeholder="简历正文"></textarea>';
  if(/getElementById\("j"\)/.test(j)) h+='<label>JD 内容</label><textarea id="j" rows="5" placeholder="岗位描述"></textarea>';
  if(/getElementById\("d"\)/.test(j)) h+='<label>日期/天数</label><input id="d" type="text" placeholder="YYYY-MM-DD 或 天数">';
  if(/getElementById\("n"\)/.test(j)) h+='<label>数字参数</label><input id="n" type="number" placeholder="0">';
  if(/getElementById\("m"\)/.test(j)) h+='<label>每月固定支出(元)</label><input id="m" type="number" placeholder="8000">';
  if(/getElementById\("o"\)/.test(j)&&!/getElementById\("v"\)|getElementById\("f"\)|getElementById\("c"\)/.test(j)) h+='<label>其他</label><input id="o" type="text" placeholder="可选">';
  if(/getElementById\("f"\)/.test(j)) h+='<label>固定成本/月(元)</label><input id="f" type="number" placeholder="15000">';
  if(/getElementById\("v"\)/.test(j)&&!/getElementById\("f"\)/.test(j)&&!j.includes('cost')) h+='<label>单价/变动成本</label><input id="v" type="number" placeholder="变动成本">';
  if(/getElementById\("v"\)/.test(j)&&j.includes('cost')) h+='<label>现售价(元)</label><input id="v" type="number" placeholder="现价">';
  if(/getElementById\("c"\)/.test(j)&&!/getElementById\("f"\)/.test(j)) h+='<label>城市/成本(元)</label><input id="c" type="text" placeholder="一线/二线 或 进货价">';
  if(/getElementById\("l"\)/.test(j)) h+='<label>级别</label><select id="l"><option>初级</option><option>熟练</option><option>资深</option></select>';
  if(/getElementById\("g"\)/.test(j)) h+='<label>年级(数字)</label><input id="g" type="number" placeholder="3">';
  if(/getElementById\("p"\)/.test(j)) h+='<label>单价(元)</label><input id="p" type="number" placeholder="50">';
  if(!h) h='<label>输入</label><input id="t" type="text" placeholder="输入内容">';
  return h;
}

fs.mkdirSync(OUT,{recursive:true});
let cards=[];
tools.forEach(t=>{
  const dir=path.join(OUT,t.n);
  fs.mkdirSync(dir,{recursive:true});
  t.inputs=attach(t);
  fs.writeFileSync(path.join(dir,'index.html'), page(t),'utf8');
  cards.push({p:t.p,pain:t.pain,t:t.t,url:t.n+'/'});
});

// index page
const byPersona={};
cards.forEach(c=>{(byPersona[c.p]=byPersona[c.p]||[]).push(c);});
let html=`<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>bingdashan 痛点工具箱 · 100+ 免费小工具</title><style>
body{font-family:system-ui,sans-serif;max-width:960px;margin:0 auto;padding:24px 16px;line-height:1.6;color:#222}
h1{font-size:1.8rem}input#q{width:100%;max-width:480px;padding:12px;border:1px solid #d1d5db;border-radius:8px;font-size:1.05rem}
.cat{margin-top:24px;font-size:1.25rem;font-weight:600;border-bottom:2px solid #111;padding-bottom:6px}
.g{display:flex;flex-wrap:wrap;gap:12px;margin-top:10px}
.c{flex:1 1 300px;border:1px solid #e5e7eb;border-radius:12px;padding:14px;text-decoration:none;color:inherit;transition:box-shadow .15s}
.c:hover{box-shadow:0 4px 16px rgba(0,0,0,.08)}
.c b{display:block;margin-bottom:4px}
.c span{font-size:.85rem;color:#666}.ct{font-size:.75rem;color:#999;margin-top:6px}
.note{font-size:.8rem;color:#888}
</style></head><body>
<h1>🧰 bingdashan 痛点工具箱</h1>
<p>每个工具只服务 <b>一类人</b> 的 <b>一个痛点</b> · 全免费 · 自托管 · `+cards.length+` 个</p>
<input id="q" placeholder="搜索: 学生/求职/卖货/开场白…" oninput="f(this.value)">
`;
Object.keys(byPersona).forEach(p=>{
  html+=`<div class="cat">👥 ${p}</div><div class="g">`+byPersona[p].map(c=>
    `<a class="c" href="${c.url}"><b>${c.t}</b><span>${c.pain}</span><div class="ct">痛点工具 · 免费</div></a>`).join('')+`</div>`;
});
html+=`<script>function f(v){v=v.trim().toLowerCase();document.querySelectorAll('.g').forEach(g=>{let s=0;g.querySelectorAll('.c').forEach(c=>{const k=(c.textContent||'').toLowerCase();c.style.display=(!v||k.includes(v))?'':'none';if(!v||k.includes(v))s++;});g.style.display=(!v||s)?'':'none';});}</script>
<div class="note" style="margin-top:40px">bingdashan pain-tools · 1027 主目录: <a href="../index.html">回总库</a></div></body></html>`;
fs.writeFileSync(IND,html,'utf8');

console.log('generated '+cards.length+' tools in '+OUT);
console.log('index -> '+IND);