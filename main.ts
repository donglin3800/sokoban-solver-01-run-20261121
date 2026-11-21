import{readdirSync as a,readFileSync as b,mkdirSync as c,writeFileSync as d}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR||"/input",U=process.env.MAKEFUN_OUTPUT_DIR||"/output";
let W,E,F,G,B,P;
const H=(m,x)=>x>0?m<<BigInt(x):m>>BigInt(-x);
const V=(f,g)=>{let l=g;for(let o=0n;o!=l;){o=l;for(let x of E)l|=H(l,-x)&f&H(f,x)}return l};
const R=(m,p)=>{let f=1n<<BigInt(p);for(let o=0n;o!=f;)o=f,f=(f|f<<1n|f>>1n|f<<BigInt(W)|f>>BigInt(W))&m;return f};
const J=(m,p)=>{let P={[p]:p},H={},q=[p],r=0n;
for(let i=0;i<q.length;i++){let x=q[i];r|=1n<<BigInt(x);for(let j=0;j<4;j++){let y=x+E[j];if(!(m>>BigInt(y)&1n)||y in P)continue;P[y]=x;H[y]="rldu"[j];q.push(y)}}
return[r,P,H]};
const S=(f,g,b,p)=>{let L=V(f,g);if(b&~L)return 0;let A=new Set(),Q=[[b,p,""]],h=0;
A.add((b<<256n)|R(f&~b,p));
for(;h<Q.length;h++){let[cb,pl,mv]=Q[h],j=J(f&~cb,pl),rg=j[0],Pp=j[1],Hh=j[2];
if(!(cb&~g))return[mv,pl];
for(let m=cb;m;m&=m-1n){let u=Math.log2(Number(m&-m));
for(let k=0;k<4;k++){let s=u-E[k],t=u+E[k];
if(!(rg>>BigInt(s)&1n)||!(f>>BigInt(t)&1n)||(cb>>BigInt(t)&1n)||!(L>>BigInt(t)&1n))continue;
let nb=cb^(1n<<BigInt(u))^(1n<<BigInt(t)),nr=R(f&~nb,u),K=(nb<<256n)|nr;
if(A.has(K))continue;A.add(K);let w="";for(let x=s;x!=pl;x=Pp[x])w=Hh[x]+w;Q.push([nb,u,mv+w+"RLDU"[k]])}}
if(Q.length>4e5)return 0}
return 0};
const O=()=>{let r=P/W|0,o=F&((1n<<BigInt(W))-1n)<<BigInt(r*W),a=F&~o,K=[],s=0n;
for(let m=B;m;m&=m-1n){let c=m&-m;if(c&s)continue;let e=R(a,Math.log2(Number(c)));s|=e;let b=B&e,g=G&e;if(b)K.push([b,g])}
return K};
const T=()=>{let Rr=O(),m="";
for(let i=0;i<Rr.length;i++){let l=0n;for(let j=0;j<Rr.length;j++)if(j!=i)l|=Rr[j][0];
let s=S(F&~l,Rr[i][1],Rr[i][0],P);if(!s)return 0;m+=s[0];P=s[1];Rr[i][0]=Rr[i][1]}
return[m,P]};
const D=t=>{W=t.indexOf("\n");let i=0;F=G=B=0n;for(let c of t){if(c=="\n")continue;let m=1n<<BigInt(i);if(c!="#")F|=m;if(".*+".includes(c))G|=m;if("$*".includes(c))B|=m;if("@+".includes(c))P=i;i++}E=[1,-1,W,-W]};
for(let id of a(I).sort()){let m="";try{D(b(I+"/"+id+"/level.txt","utf8"));m=T()?.[0]||""}catch{m=""}c(U+"/"+id,{recursive:true});d(U+"/"+id+"/solution.txt",m+"\n")}
