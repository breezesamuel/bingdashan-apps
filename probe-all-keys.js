var h=require('https'),f=require('fs'),p=require('path'),d='C:/bingdashan',L=d+'/keys-all-probe.log';
var P=[
 {n:'moonshot-kimi',host:'api.moonshot.cn',k:'sk-5MFZU8IHjssOQZFII0AKzOiATg98UE7PZDytB1JBaaH5zUT0'},
 {n:'agnes-hub',host:'apihub.agnes-ai.com',k:'sk-B7g6ivaA35M2e6QL3mQecwzybqAznAV86GU8Lf1UVxwi'},
 {n:'zhipu-new',host:'open.bigmodel.cn',k:'90c15519726b4d64b482000405a3bbf2.l6aHOS2Tp2FkIZzw'},
 {n:'deepseek-papi',host:'api.deepseek.com',k:'sk-301a05f23d764a89a85157639ab96a'},
 {n:'nvidia',host:'integrate.api.nvidia.com',k:'nvapi-tBKWRAbKGm8FDqTk-hlYSwB-m8IOSmoyXBXFgAcDg8TBJxl-xqhDXBhCBlw'},
 {n:'agnes-extra',host:'apihub.agnes-ai.com',k:'geV0E1YXCHmfkvjJU2WandyrQXzs7JnhhgdYdQXFmaM88zQcUZM4IQbd'}
];
function head(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function probe(pr,cb){
  var u='/v1/models',req=h.request({host:pr.host,path:u,method:'GET',headers:{Authorization:'Bearer '+pr.k}},function(r){
    var c=[];r.on('data',function(x){c.push(x)});r.on('end',function(){
      var b=Buffer.concat(c),t=b.toString('utf8'),n=-1,fr='',all='';
      try{var j=JSON.parse(t);if(j.data&&j.data.length){n=j.data.length;fr=j.data[0].id||'';all=j.data.map(function(x){return x.id}).slice(0,3).join(',')}}catch(e){}
      var line=pr.n+': status='+r.statusCode+' bytes='+b.length+(n>=0?(' models='+n+(fr?' first='+fr:'')):'')+(all?' head='+all:'');
      if(r.statusCode!==200&&r.statusCode!==302&&r.statusCode!==301&&r.statusCode!==308&&r.statusCode!==404){line+=' cb='+t.slice(0,60).replace(/\s+/g,' ')}
      f.appendFileSync(L,line+'\n','utf8');console.log(line);cb();
    });
  });
  req.on('error',function(e){f.appendFileSync(L,pr.n+': ERR '+e.code+'\n','utf8');console.log(pr.n+': ERR '+e.code);cb()});
  req.end();
}
var i=0;
(function next(){if(i<P.length)probe(P[i++],next);else{f.appendFileSync(L,'PROBE_DONE count='+P.length+'\n','utf8');console.log('PROBE_DONE count='+P.length+' log='+L)}})();
