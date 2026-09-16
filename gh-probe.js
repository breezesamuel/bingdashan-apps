var https=require('https'),fs=require('fs'),p=require('path'),d='C:/bingdashan',L=d+'/github-auth.log';
var t=process.env.GHT||'';
fs.appendFileSync(L,'=== gh-auth '+new Date().toISOString()+' ===\n','utf8');
function W(s){fs.appendFileSync(L,s+'\n','utf8');console.log(s)}
function G(path,cb){
  var o={host:'api.github.com',path:path,method:'GET',headers:{'User-Agent':'bingdashan-catalog','Authorization':'token '+t,'Accept':'application/vnd.github+json'}};
  var q=https.request(o,function(r){var c=[];r.on('data',function(x){c.push(x)});r.on('end',function(){
    var b=Buffer.concat(c),s='';(function(){try{s=JSON.parse(b.toString('utf8'))}catch(e){}})();
    cb({status:r.statusCode,scopes:r.headers['x-oauth-scopes']||'',rate:r.headers['x-ratelimit-remaining']||'?',json:s,bytes:b.length});
  });});
  q.on('error',function(e){cb({status:'ERR',scopes:'',rate:'',json:null,err:e.code,bytes:0})});
  q.end();
}
G('/user',function(u){
  if(u.status!==200){W('auth status='+u.status+' scopes=['+u.scopes+'] err='+(u.err||''));return;}
  var login=(u.json.login||'?'),name=u.json.name||'';
  W('auth status=200 login='+login+(name?' name='+name:'')+' scopes=['+u.scopes+'] rate_left='+u.rate+' token_head='+t.slice(0,4)+'..'+t.slice(-4));
  G('/user/repos?per_page=100&sort=updated',function(re){
    if(re.status===200&&re.json&&re.json.length){
      W('repos_count='+re.json.length+' total_disk_repos=');
      re.json.forEach(function(ro){W('  repo '+ro.full_name+' updated='+ro.updated_at+' pushed='+(ro.pushed_at||''))});
    }else{W('repos_static status='+re.status+' err='+(re.err||''))}
  });
});
