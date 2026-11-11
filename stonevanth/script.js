(()=>{'use strict';
const $=s=>document.querySelector(s);
/* ---- seeded RNG (string seeds, no Number-parsing of IDs) ---- */
function R(s){let h=1779033703^s.length;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),3432918353);h=h<<13|h>>>19}
 let a=(Math.imul(h^h>>>16,2246822507)^Math.imul(h^h>>>13,3266489909))>>>0;
 return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const pk=(r,a)=>a[r()*a.length|0];
const S1=['ka','vor','dra','mel','tha','ur','zan','bar','kel','ron','sil','gor','nem','ish','tar','ox','vel','mor','han','dur','cas','ith'],
 S2=['th','n','r','l','k','m','v','z','g','d','sh','br'],S3=['a','o','u','e','i','ia','ar','on','eth','ul','im','ax'];
const cap=s=>s[0].toUpperCase()+s.slice(1);
const word=(r,n)=>{let w='';n=n||2+(r()*2|0);for(let i=0;i<n;i++)w+=(i?pk(r,S2):'')+pk(r,i%2?S3:S1);return cap(w)};
/* ---- hierarchy: galaxy>system>planet>civ>city>profile ---- */
const L=['galaxy','system','planet','civ','city','profile'],FAN=[1,7,6,8,10,25];
const LN={galaxy:'Galaxy',system:'Stone System',planet:'Planet',civ:'Civilization',city:'City',profile:'Profile'};
const par=(l,n)=>(n-1n)/BigInt(FAN[l])+1n;
function anc(l,n){const a=[];for(let k=l;k>0;k--){n=par(k,n);a[k-1]=n}return a}
const M=new Map();
const NM=[r=>word(r)+' '+pk(r,['Expanse','Spiral','Reach','Veil','Cluster']),
 r=>word(r)+' '+pk(r,['Lithos','Stonefold','Monolith','Cairn','Tor']),
 r=>word(r)+pk(r,['',' Prime',' Minor',' Deep',' Rock']),
 r=>pk(r,['The ','','House of ','The '])+word(r)+' '+pk(r,['Dominion','Concord','Covenant','Synod','Kingdom','Delvers']),
 r=>word(r)+pk(r,['hold','gard','spire','deep','reach','hollow','vault','fall'])];
function name(l,n){const k=l+':'+n;let v=M.get(k);if(v)return v;if(M.size>4000)M.clear();
 v=l<5?NM[l](R(k)):'';M.set(k,v);return v}
const G={mountain:['crystal ridges','basalt spires','cave-riddled cliffs','floating rock shelves','marble ranges','obsidian plateaus'],
 core:['a slow-pulsing magma heart','a lattice of singing crystal','a hollow resonant core','veins of living bronze','a frozen quartz heart'],
 trait:['patient masonry','deep-cavern navigation','resonance song','oath-carving','stoneweather prediction','geode trade'],
 gov:['a council of elder masons','hereditary quarry-lords','a guild of cartographers','a rotating synod of keepers','an oracle assembly']};
const roman=['I','II','III','IV','V','VI'];
function civ(n){const r=R('cv'+n),w=word(R('sp'+n));
 return{sp:w+pk(r,['kin','born','folk','ari']),life:pk(r,[90,140,300,700,1400]),cur:4000+(r()*9000|0),trait:pk(r,G.trait),gov:pk(r,G.gov)}}
function ent(l,n){const r=R('d'+l+n),a=anc(l,n),nm=name(l,n),o={name:nm,l,n,path:a,p:[]};
 const ch=l<5?FAN[l+1]:0;
 if(l==0)o.d=`${nm} is a drifting arm of ${7} stone systems, its dust lanes glittering with pulverised crystal. Astronomers of the nearest worlds map it by sound: every stone body in it hums at a different pitch.`;
 if(l==1)o.d=`${nm} circles a ${pk(r,['dim amber','pale blue','dull red'])} star. Its six worlds are bound by shared tides of rock and gravity, and ${pk(r,['ring-quarries','orbital monoliths','tethered stone bridges'])} link them.`;
 if(l==2)o.d=`${nm} is a stone world of ${pk(r,G.mountain)} and ${pk(r,G.mountain)}, built around ${pk(r,G.core)}. Surface temperatures sit near ${-40+(r()*160|0)}°C and ${pk(r,['great underground caverns','sunken stone seas','hanging crystal forests'])} shelter its peoples.`;
 if(l==3){const c=civ(n);o.d=`The ${c.sp} are known for ${c.trait}. Governed by ${c.gov}, they reckon time by the Stone Reckoning, currently year ${c.cur.toLocaleString('en-US')}. Their eight great cities share roads cut straight through living rock.`}
 if(l==4)o.d=`${nm} was carved into ${pk(r,['a cliff face','a dead volcano','a vast geode','the underside of a floating rock'])}. Its ${pk(r,['lantern-lit tunnels','marble terraces','bronze-gated halls'])} house a population of ${(8000+(r()*900000|0)).toLocaleString('en-US')}.`;
 return o}
/* ---- profile generation ---- */
const FN=['Deepvein Miner','Crystal Cartographer','Basalt Mason','Rune-Cutter','Geode Surgeon','Seismic Oracle','Lantern Warden','Cavern Pilot','Obsidian Smith','Gem Archivist','Tunnel Engineer','Monolith Keeper','Marble Sculptor','Fault-Line Scout','Stone Historian','Quarry Foreman','Mineral Alchemist','Dust Merchant','Cairn Priest','Orbit Rockrider','Magma Tender','Resonance Tuner','Sky-Rock Navigator','Fossil Diplomat'];
const SK=['slate-grey','bronze-flecked','chalk-pale','obsidian-dark','mica-sheened','granite-speckled','copper-veined','quartz-clear'],
 EY=['amber','crystal blue','emerald','pewter','molten orange','pale violet','onyx','silver'],
 FT=['a jagged crystal crest','a scarred brow ridge','fused stone knuckles','a faint glowing seam along the jaw','layered shoulder plates','moss-green veins at the throat','a chipped horn','fine fossil patterns across the back'],
 PS=['stubborn','patient','curious','guarded','generous','methodical','fiercely loyal','wry','solemn','restless','meticulous','quietly ambitious','warm','suspicious','dreamy','disciplined'],
 AB=['hears tremors days before they strike','shapes rock with a touch','reads memories stored in crystal','walks through thin stone walls','sees through darkness by echo','survives extreme pressure','calls loose boulders to heel','tastes minerals in the air'],
 EV=['survived a cave-in that lasted nine days','mapped a previously unknown cavern system','apprenticed under a famed master','witnessed a mountain split open','traded across three stone systems','repaired a failing monolith','lost a family hall to a quake','carved a public monument','led a rescue through flooded tunnels','discovered a seam of singing crystal'];
const cache=new Map();
function prof(id){let p=cache.get(id);if(p)return p;if(cache.size>1500)cache.clear();
 const b=BigInt(id),a=anc(5,b),r=R('p'+id),c=civ(a[3]),
 fn=word(r),ln=word(r,2),age=18+(r()*c.life*.8|0),
 st=name(4,a[4]),reg=word(R('rg'+a[4]))+' Reach',con=word(R('ct'+(a[3]%3n)+a[2]))+' Continent',
 set=pk(r,['Lower Ward','Obsidian Quarter','Lantern Row','Marble Steps','Deepgate','Bronze Market','Cinder Court','Quarry Edge']),
 prof=pk(r,FN),ab=r()<.8?pk(r,AB):'None known',tr=pk(r,PS),tr2=pk(r,PS);
 p={id,a,name:fn+' '+ln,sp:c.sp,civ:name(3,a[3]),planet:name(2,a[2]),system:name(1,a[1]),galaxy:name(0,a[0]),city:st,
  loc:`${set}, ${st}, ${reg}, ${con}`,prof,birth:c.cur-age,age,ab,cur:c.cur,
  look:`A ${c.sp} with ${pk(r,SK)} skin, ${pk(r,EY)} eyes and ${pk(r,FT)}.`,
  pers:`${cap(tr)} and ${tr2}; ${pk(r,['rarely speaks of the past','keeps a small stone from home','hums while working','distrusts open sky'])}.`};
 p.bg=`Born in ${set} of ${st} in year ${p.birth} of the Stone Reckoning, ${fn} ${pk(r,EV)} and later ${pk(r,EV)}. Today they work as a ${prof.toLowerCase()} under ${c.gov}.`;
 p.short=`${prof} of ${st}, ${tr} by nature, who ${pk(r,EV)}.`;
 p.desc=`${p.name} is a ${prof.toLowerCase()} of the ${c.sp} on ${p.planet}. ${p.pers} Their life began in ${set}, and their work still shapes ${st}.`;
 cache.set(id,p);return p}
/* ---- rendering ---- */
const L_=(l,n)=>`#/${L[l]}/${n}`;
const card=id=>{const p=prof(id);return`<article class="card"><h3>${p.name}</h3><span class="id">ID ${id}</span><span class="meta"><b>${p.planet}</b> · ${p.civ}</span><span class="meta">${p.prof}</span><p>${p.short}</p><a class="btn" href="#/profile/${id}">Explore Profile</a></article>`};
const cards=(s,n)=>{let h='';for(let i=0;i<n;i++)h+=card(String(BigInt(s)+BigInt(i)));return h};
/* feed: lazily hydrated chunks, batches of 300 prepared ahead */
const feed=$('#feed'),CH=50,BATCH=300;let made=0,view='home',busy=false;
const io=new IntersectionObserver(es=>{if(view!=='home')return;for(const e of es){const d=e.target;
 if(e.isIntersecting){if(!d.dataset.on){d.innerHTML=cards(d.dataset.s,CH);d.dataset.on=1;d.style.height='';d.style.minHeight=''}
  if(+d.dataset.s+CH>made-200&&!busy){busy=true;(self.requestIdleCallback||setTimeout)(()=>{addBatch();busy=false})}}
 else if(d.dataset.on&&d.offsetHeight>0){d.style.height=d.offsetHeight+'px';d.innerHTML='';delete d.dataset.on}}},{rootMargin:'1800px 0px'});
function addBatch(){const cols=Math.max(1,Math.floor(innerWidth/330)),est=Math.ceil(CH/cols)*230,f=document.createDocumentFragment();
 for(let i=0;i<BATCH/CH;i++){const d=document.createElement('div');d.className='chunk grid';d.dataset.s=made+1;d.style.minHeight=est+'px';f.appendChild(d);io.observe(d);made+=CH}
 feed.appendChild(f)}
/* detail views */
const dv=$('#detail'),home=$('#home');
const mini=(l,n,sub)=>`<a class="mini" href="${L_(l,n)}"><b>${name(l,n)||prof(String(n)).name}</b><span>${sub}</span></a>`;
function crumbs(l,a){let h='<a href="#/">Feed</a><a href="#/universe">Universe</a>';for(let i=0;i<l;i++)h+=`<a href="${L_(i,a[i])}">${name(i,a[i])}</a>`;return`<div class="crumbs">${h}</div>`}
function children(l,n){if(l>=5)return'';const k=BigInt(FAN[l+1]),s=(n-1n)*k+1n;let h='';
 for(let i=0n;i<k;i++){const c=s+i;h+=l==4?`<a class="mini" href="#/profile/${c}"><b>${prof(String(c)).name}</b><span>${prof(String(c)).prof} · ID ${c}</span></a>`:mini(l+1,c,LN[L[l+1]])}
 return`<h4>${l==4?'Inhabitants':'Contains'}</h4><div class="grid" style="padding:0">${h}</div>`}
function showEnt(l,n){const e=ent(l,n),extra=l==3?`<span class="tag">${civ(n).sp}</span>`:'';
 dv.innerHTML=`${crumbs(l,e.path)}<span class="tag">${LN[L[l]]}</span>${extra}<h2>${e.name}</h2><p>${e.d}</p>${children(l,n)}`}
function showProf(id){const p=prof(id);
 dv.innerHTML=`${crumbs(5,p.a)}<span class="tag">Profile</span><h2>${p.name}</h2><span class="id">ID ${id}</span>
 <dl><dt>Species</dt><dd>${p.sp}</dd><dt>Civilization</dt><dd>${p.civ}</dd><dt>Planet</dt><dd>${p.planet}</dd><dt>Stone System</dt><dd>${p.system}</dd><dt>Galaxy</dt><dd>${p.galaxy}</dd>
 <dt>Location</dt><dd>${p.loc}</dd><dt>Profession</dt><dd>${p.prof}</dd><dt>Born</dt><dd>Year ${p.birth}</dd><dt>Age</dt><dd>${p.age}</dd><dt>Abilities</dt><dd>${p.ab}</dd></dl>
 <h4>Historical background</h4><p>${p.bg}</p><h4>Appearance</h4><p>${p.look}</p><h4>Personality</h4><p>${p.pers}</p><h4>Profile</h4><p>${p.desc}</p>
 <h4>Explore</h4><div class="links"><a class="btn" href="${L_(3,p.a[3])}">Civilization</a><a class="btn" href="${L_(4,p.a[4])}">City</a><a class="btn" href="${L_(2,p.a[2])}">Planet</a><a class="btn" href="${L_(0,p.a[0])}">Galaxy</a><a class="btn" href="#/">Back to feed</a></div>`}
let uio=null;
function showUni(){let n=1n;dv.innerHTML='<div class="crumbs"><a href="#/">Feed</a></div><h2>The Universe</h2><p>Galaxies continue in every direction. Scroll to keep travelling.</p><div class="grid" id="ug" style="padding:0"></div><div id="us" style="height:1px"></div>';
 const g=$('#ug'),add=()=>{let h='';for(let i=0;i<30;i++,n++)h+=mini(0,n,'Galaxy');g.insertAdjacentHTML('beforeend',h)};add();
 uio=new IntersectionObserver(e=>{if(e[0].isIntersecting)add()},{rootMargin:'1200px'});uio.observe($('#us'))}
let savedY=0;
function route(){const[,t,id]=location.hash.split('/');const was=view;if(uio){uio.disconnect();uio=null}$('#res').hidden=true;
 if(!t){view='home';dv.hidden=true;home.hidden=false;if(was!=='home')scrollTo(0,savedY);return}
 if(was==='home')savedY=scrollY;view='detail';home.hidden=true;dv.hidden=false;
 const l=L.indexOf(t);
 if(t==='universe')showUni();else if(l>=0&&/^[1-9]\d*$/.test(id||'')){l==5?showProf(id):showEnt(l,BigInt(id))}
 else dv.innerHTML='<p>That location does not exist. <a class="btn" href="#/">Back to feed</a></p>';
 scrollTo(0,0)}
/* ---- search ---- */
const res=$('#res');
function out(items,msg){res.innerHTML='';if(msg){const p=document.createElement('p');p.textContent=msg;res.appendChild(p)}
 items.forEach(([h,t,s])=>{const a=document.createElement('a');a.href=h;a.textContent=t;if(s){const m=document.createElement('small');m.textContent='  '+s;a.appendChild(m)}res.appendChild(a)});res.hidden=false}
$('#sf').addEventListener('submit',e=>{e.preventDefault();const t=$('#st').value,q=$('#sq').value.trim();if(!q)return;
 if(t==='pid'){const d=q.replace(/[\s,_]/g,'');if(!/^\d+$/.test(d)||/^0+$/.test(d))return out([],'Profile IDs are whole numbers greater than 0.');location.hash='#/profile/'+d.replace(/^0+/,'');return}
 const l=L.indexOf(t==='pname'?'profile':t),d=q.replace(/\s/g,'');
 if(t!=='pname'&&/^[1-9]\d*$/.test(d)){location.hash=L_(l,d);return}
 const lq=q.toLowerCase(),max=l==5?30000:l==4?20000:5000,hits=[];
 for(let i=1;i<=max&&hits.length<30;i++){const n=BigInt(i),nm=l==5?prof(String(i)).name:name(l,n);
  if(nm.toLowerCase().includes(lq))hits.push([L_(l,i),nm,l==5?'ID '+i:LN[L[l]]+' '+i])}
 out(hits,hits.length?'':'No match. Try a shorter name or a number.')});
document.addEventListener('click',e=>{if(!e.target.closest('header'))res.hidden=true});
history.scrollRestoration='manual';addBatch();addEventListener('hashchange',route);route();
})();
