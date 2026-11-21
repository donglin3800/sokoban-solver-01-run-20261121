import{mkdirSync as a,readdirSync as b,readFileSync as c,writeFileSync as d}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",U=process.env.MAKEFUN_OUTPUT_DIR??"/output";
const D=[[0,-1,"u"],[0,1,"d"],[-1,0,"l"],[1,0,"r"]];
const P=t=>{let r=t.split("\n").filter(e=>e),w=Math.max(...r.map(e=>e.length)),a=new Uint8Array(w*r.length).fill(1),g=[],b=[],p=-1;
r.forEach((e,y)=>{for(let x=0;x<e.length;x++){let c=e[x],i=y*w+x;if(c=="#")continue;a[i]=0;if(".*+".includes(c))g.push(i);if("$*".includes(c))b.push(i);if("@+".includes(c))p=i}});
return{w,a,g,b:b.sort((x,y)=>x-y),p}},
V=v=>{let{w,a,g}=v,l=new Uint8Array(a.length),q=g.map(x=>(l[x]=1,x));
for(let i=0;i<q.length;i++){let x=q[i];for(let[dx,dy]of D){let d=dy*w+dx,y=x-d;if(!a[y]&&!a[y-d]&&!l[y]){l[y]=1;q.push(y)}}}
return l},
R=(v,o,f,s,t,k)=>{let{w,a}=v,n=0,l=f;k[n++]=f;s[f]=t;
while(n){let p=k[--n];if(p<l)l=p;for(let[dx,dy]of D){let q=p+dy*w+dx;if(!a[q]&&!o[q]&&s[q]!=t){s[q]=t;k[n++]=q}}}
return l},
F=(v,o,g,t)=>{let{w,a}=v;
for(let e of[t,t-1,t-w,t-w-1]){let b=e+1,c=e+w,d=c+1;
if((a[e]||o[e])&&(a[b]||o[b])&&(a[c]||o[c])&&(a[d]||o[d])&&((o[e]&&!g[e])||(o[b]&&!g[b])||(o[c]&&!g[c])||(o[d]&&!g[d])))return 1}
return 0},
K=(b,l,N)=>{let k=l;for(let x of b)k=k*N+x;return k},
W=(v,o,f,t)=>{let{w,a}=v;if(f==t)return"";let p=new Int32Array(a.length).fill(-1),h=new Array(a.length),q=[f];p[f]=f;
for(let i=0;i<q.length;i++){let x=q[i];if(x==t)break;for(let[dx,dy,l]of D){let y=x+dy*w+dx;if(a[y]||o[y]||p[y]!=-1)continue;p[y]=x;h[y]=l;q.push(y)}}
if(p[t]==-1)throw new Error("x");let s="";for(let x=t;x!=f;x=p[x])s=h[x]+s;return s},
S=v=>{let{w,a,g}=v,N=a.length,G=new Uint8Array(N);for(let x of g)G[x]=1;
let l=V(v),o=new Uint8Array(N),s=new Int32Array(N),m=new Int32Array(N),k=new Int32Array(N),z=0;
let ok=b=>b.every(x=>G[x]);if(v.b.some(x=>!l[x]))return null;
let B=[v.b],Y=[v.p],A=[-1],Mp=new Map;
for(let x of v.b)o[x]=1;Mp.set(K(v.b,R(v,o,v.p,s,++z,k),N),0);for(let x of v.b)o[x]=0;
let f=ok(v.b)?0:-1;
for(let h=0;f<0&&h<B.length;h++){let b=B[h];for(let x of b)o[x]=1;R(v,o,Y[h],s,++z,k);let e=z;
for(let i=0;i<b.length&&f<0;i++){let u=b[i];
for(let[dx,dy]of D){let d=dy*w+dx,t=u+d;if(s[u-d]!=e||a[t]||o[t]||!l[t])continue;
o[u]=0;o[t]=1;let fz=F(v,o,G,t),k2=-1,n=null;
if(!fz){n=b.slice();n[i]=t;n.sort((x,y)=>x-y);k2=K(n,R(v,o,u,m,++z,k),N)}
o[t]=0;o[u]=1;if(fz||Mp.has(k2))continue;
if(B.length>=2.5e5){for(let x of b)o[x]=0;return null}
Mp.set(k2,B.length);B.push(n);Y.push(u);A.push(h);if(ok(n)){f=B.length-1;break}}}
for(let x of b)o[x]=0}
if(f<0)return null;
let p=[],mv="",pl=v.p,bx=v.b;
for(let x=f;x>0;x=A[x])p.push(x);p.reverse();
for(let x of p){let nb=B[x],fr=bx.find(y=>!nb.includes(y)),to=nb.find(y=>!bx.includes(y)),d=to-fr;
for(let y of bx)o[y]=1;mv+=W(v,o,pl,fr-d);for(let y of bx)o[y]=0;mv+="UDLR"[d==-w?0:d==w?1:d==-1?2:3];pl=fr;bx=nb}
return{m:mv,e:pl}},
O=v=>{let{w,a,g,b,p}=v,l=V(v),r=Math.floor(p/w),c=new Uint8Array(a.length);
for(let i=r*w;i<(r+1)*w;i++)if(!a[i]&&!l[i])c[i]=1;
if(b.some(x=>c[x]))return null;
let t=new Int32Array(a.length).fill(-1),Q=[];
for(let s=0;s<a.length;s++){if(a[s]||c[s]||t[s]>=0)continue;let q=[s];t[s]=Q.length;
for(let i=0;i<q.length;i++)for(let[dx,dy]of D){let y=q[i]+dy*w+dx;if(!a[y]&&!c[y]&&t[y]<0){t[y]=Q.length;q.push(y)}}
Q.push({b:[],g:[]})}
for(let x of b)Q[t[x]].b.push(x);
for(let x of g)if(t[x]>=0)Q[t[x]].g.push(x);
if(g.some(x=>t[x]<0)||Q.some(x=>x.b.length!=x.g.length))return null;
return Q.filter(x=>x.b.length)},
T=v=>{let Q=O(v);if(!Q)return S(v);let p=v.p,m="";
for(let r of Q){let a=v.a.slice();for(let o of Q)if(o!=r)for(let x of o.done?o.g:o.b)a[x]=1;
let s=S({w:v.w,a,g:r.g.slice().sort((x,y)=>x-y),b:r.b.slice().sort((x,y)=>x-y),p});
if(!s)return null;m+=s.m;p=s.e;r.done=1}
return{m}}
for(let id of b(I).sort()){let m="";try{m=T(P(c(I+"/"+id+"/level.txt","utf8")))?.m??""}catch{m=""}
a(U+"/"+id,{recursive:true});d(U+"/"+id+"/solution.txt",m+"\n")}
