var h=require('https'),f=require('fs'),o='C:/bingdashan/probe-final.log';
var P=[['moonshot','api.moonshot.cn','sk-5MFZU8IHjssOQZFII0AKzOiATg98UE7PZDytB1JBaaH5zUT0'],
       ['agnes','apihub.agnes-ai.com','sk-B7g6ivaA35M2e6QL3mQecwzybqAznAV86GU8Lf1UVxwi'],
       ['deepseek','api.deepseek.com','sk-301a05f23d764a89a85157639ab96a'],
       ['zhipu','open.bigmodel.cn','a5b20c547c5841dea71a3d4781b71343.72I80E1f7OnYXNyS']];
function W(s){f.appendFileSync(o,s+'\n','utf8');console.log(s);}
function next(i){
  if(i>=P.length){W('DONE all='+P.length);return;}
  var pr=P[i],o2={host:pr[1],path:'/v1/models',method:'GET',headers:{Authorization:'Bearer '+pr[2]}};
  var req=h.request(o2,function(r){
    var c=[];r.on('data',function(x){c.push(x)});r.on('end',function(){
      var b=Buffer.concat(c),s='['+pr[0]+'] status='+r.statusCode+' bytes='+b.length;
      try{var j=JSON.parse(b.toString());if(j.data){s+=' models='+j.data.length;if(j.data[0])s+=' first='+j.data[0].id;}}catch(e){}
      W(s);next(i+1);
    });
  });
  req.on('error',function(e){W('['+pr[0]+'] ERR '+e.code);next(i+1);});
  req.end();
}
next(0);
