var h=require('https'),f=require('fs'),p=require('path');
var d='C:/bingdashan';
var K1='sk-rlpgxajazjckpnnjynihnactolxrcjwmndabauueyyucmuel';
var K2='a5b20c547c5841dea71a3d4781b71343.72I80E1f7OnYXNyS';
function call(host,path,k,body,cb){
  var b=JSON.stringify(body),o={host:host,path:path,method:'POST',headers:{'Authorization':'Bearer '+k,'Content-Type':'application/json','Content-Length':Buffer.byteLength(b)}};
  var rq=h.request(o,function(r){var c=[];r.on('data',function(x){c.push(x)});r.on('end',function(){cb(null,r.statusCode,Buffer.concat(c));});});
  rq.on('error',function(e){cb(e);});rq.end(b);
}
function getModelReply(body){try{var j=JSON.parse(body);if(j.choices&&j.choices[0]&&j.choices[0].message)return j.choices[0].message.content;}catch(e){}return '';}
call('api.siliconflow.cn','/v1/chat/completions',K1,
  {model:'deepseek-ai/DeepSeek-V3',temperature:0.3,max_tokens:1600,
   messages:[{role:'user',content:'Write ONE complete standalone HTML page (no external deps, ASCII only, no markdown fences) about a personal finance tracker. It must have a name, a one-line pitch for freelancers, an input to add transactions, a running total, and a <title>. Output ONLY the raw HTML.'}]},
  function(e1,s1,b1){
    if(e1){console.log('E1 '+e1.code);process.exit(1);}
    var m1=getModelReply(b1);
    var file=p.join(d,'out','ai-finance-tracker-v1.html');
    f.writeFileSync(file,m1,'utf8');
    console.log('si_flow status='+s1+' bytes='+b1.length+' reply_len='+m1.length+' saved='+f.statSync(file).size);
    console.log('V1 head='+m1.slice(0,60).replace(/\s+/g,' '));
    call('open.bigmodel.cn','/api/paas/v4/chat/completions',K2,
      {model:'glm-4-flash',temperature:0.3,max_tokens:1600,
       messages:[{role:'user',content:'Write ONE complete standalone HTML page (ASCII only, no external deps, no markdown fences) about a skill that only an AI agent can do: deciding how much to reinvest crypto gains. Fun, concrete, tabular. Title says REINVEST-DECIDER. Output ONLY the raw HTML.'}]},
      function(e2,s2,b2){
        if(e2){console.log('E2 '+e2.code);process.exit(1);}
        var m2=getModelReply(b2);
        var file2=p.join(d,'out','ai-reinvest-decider-v1.html');
        f.writeFileSync(file2,m2,'utf8');
        console.log('zhipu status='+s2+' bytes='+b2.length+' reply_len='+m2.length+' saved='+f.statSync(file2).size);
        console.log('V2 head='+m2.slice(0,60).replace(/\s+/g,' '));
        console.log('AGENT DONE files=2 both real AI-generated from real user keys');
      });
  });