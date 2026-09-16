var fs=require('fs'),d='C:/bingdashan';
var providers=[
  {name:'moonshot',host:'api.moonshot.cn',key:'sk-5MFZU8IHjssOQZFII0AKzOiATg98UE7PZDytB1JBaaH5zUT0'},
  {name:'agnes-hub',host:'apihub.agnes-ai.com',key:'sk-B7g5ivaA35M2e6QL3mQecwzybqAznAV86GU8Lf1UVxwi'},
  {name:'deepseek',host:'api.deepseek.com',key:'sk-301a05f23d76489a85157639ab96a'},
  {name:'nvidia',host:'api.nvidia.com',key:'nvapi-tBKWRAbKGm8FDqTk-hlYSwB-m8IOSmoyXBXFgAcDg8TBJxl-xqhDXBhCBlw'}
];
function test(pr,cb){
  var o={host:pr.host,path:'/v1/models',method:'GET',headers:{Authorization:'Bearer '+pr.key}};
  var q=require('https').request(o,function(r){
    var c=[];r.on('data',function(x){c.push(x)});r.on('end',function(){
      var b=Buffer.concat(c),t='';try{t=JSON.parse(b.toString('utf8'))}catch(e){}
      var n=(t&&t.data&&t.data.length)||-1;
      fs.appendFileSync(d+'/keys.verified.log',pr.name+': status='+r.statusCode+' models='+n+'\n','utf8');
      console.log(pr.name+': status='+r.statusCode+' models='+n);
      cb();
    });
  });
  q.on('error',function(e){fs.appendFileSync(d+'/keys.verified.log',pr.name+': ERR '+e.code+'\n','utf8');console.log(pr.name+': ERR '+e.code);cb()});
  q.end();
}
var i=0;
function next(){
  if(i<providers.length){var pr=providers[i++];test(pr,next);}
  else console.log('KEY_TESTS DONE see C:/bingdashan/keys.verified.log');
}
next();
