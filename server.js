var h=require('http'),f=require('fs'),p=require('path'),
    d=p.normalize('C:/bingdashan'),
    m={'html':'text/html; charset=utf-8','js':'text/javascript; charset=utf-8','css':'text/css; charset=utf-8','json':'application/json; charset=utf-8','txt':'text/plain; charset=utf-8'};
h.createServer(function(q,r){
  var u=decodeURIComponent(q.url.split('?')[0]);
  if(u==='/'||u==='') u='/index.html';
  var fp=p.normalize(p.join(d,u));
  if(fp!==d && fp.indexOf(d+p.sep)!==0){ r.statusCode=403; r.end('forbidden'); return; }
  f.stat(fp,function(e,st){
    if(e||!st.isFile()){ r.statusCode=404; r.end('404 '+u); return; }
    r.setHeader('Content-Type',m[p.extname(fp).slice(1)]||'application/octet-stream');
    f.createReadStream(fp).pipe(r);
  });
}).listen(8090,function(){
  f.writeFileSync(p.join(d,'server-up.flag'),'up 8090 root='+d,'utf8');
  console.log('listening 8090 root='+d);
});
