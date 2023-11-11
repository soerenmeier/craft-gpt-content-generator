var Rt=Object.defineProperty;var Wt=(e,t,n)=>t in e?Rt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ft=(e,t,n)=>(Wt(e,typeof t!="symbol"?t+"":t,n),n);function P(){}function At(e){return e()}function kt(){return Object.create(null)}function L(e){e.forEach(At)}function Ft(e){return typeof e=="function"}function K(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Bt(e){return Object.keys(e).length===0}const Gt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function a(e,t){e.appendChild(t)}function $(e,t,n){e.insertBefore(t,n||null)}function C(e){e.parentNode&&e.parentNode.removeChild(e)}function Ut(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function h(e){return document.createElement(e)}function N(e){return document.createTextNode(e)}function w(){return N(" ")}function Kt(){return N("")}function E(e,t,n,l){return e.addEventListener(t,n,l),()=>e.removeEventListener(t,n,l)}function Qt(e){return function(t){return t.preventDefault(),e.call(this,t)}}function f(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Yt(e){return Array.from(e.childNodes)}function Ot(e,t){t=""+t,e.data!==t&&(e.data=t)}function rt(e,t){e.value=t??""}function Et(e,t,n){e.classList.toggle(t,!!n)}function Jt(e,t,{bubbles:n=!1,cancelable:l=!1}={}){return new CustomEvent(e,{detail:t,bubbles:n,cancelable:l})}let U;function G(e){U=e}function qt(){if(!U)throw new Error("Function called outside component initialization");return U}function Xt(e){qt().$$.on_mount.push(e)}function ct(){const e=qt();return(t,n,{cancelable:l=!1}={})=>{const o=e.$$.callbacks[t];if(o){const i=Jt(t,n,{cancelable:l});return o.slice().forEach(s=>{s.call(e,i)}),!i.defaultPrevented}return!0}}const R=[],st=[];let W=[];const ht=[],jt=Promise.resolve();let mt=!1;function Dt(){mt||(mt=!0,jt.then(Mt))}function xt(){return Dt(),jt}function _t(e){W.push(e)}function Zt(e){ht.push(e)}const dt=new Set;let H=0;function Mt(){if(H!==0)return;const e=U;do{try{for(;H<R.length;){const t=R[H];H++,G(t),te(t.$$)}}catch(t){throw R.length=0,H=0,t}for(G(null),R.length=0,H=0;st.length;)st.pop()();for(let t=0;t<W.length;t+=1){const n=W[t];dt.has(n)||(dt.add(n),n())}W.length=0}while(R.length);for(;ht.length;)ht.pop()();mt=!1,dt.clear(),G(e)}function te(e){if(e.fragment!==null){e.update(),L(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(_t)}}function ee(e){const t=[],n=[];W.forEach(l=>e.indexOf(l)===-1?t.push(l):n.push(l)),n.forEach(l=>l()),W=t}const it=new Set;let q;function Vt(){q={r:0,c:[],p:q}}function It(){q.r||L(q.c),q=q.p}function S(e,t){e&&e.i&&(it.delete(e),e.i(t))}function A(e,t,n,l){if(e&&e.o){if(it.has(e))return;it.add(e),q.c.push(()=>{it.delete(e),l&&(n&&e.d(1),l())}),e.o(t)}else l&&l()}function Ct(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function ne(e,t,n){const l=e.$$.props[t];l!==void 0&&(e.$$.bound[l]=n,n(e.$$.ctx[l]))}function ut(e){e&&e.c()}function Q(e,t,n){const{fragment:l,after_update:o}=e.$$;l&&l.m(t,n),_t(()=>{const i=e.$$.on_mount.map(At).filter(Ft);e.$$.on_destroy?e.$$.on_destroy.push(...i):L(i),e.$$.on_mount=[]}),o.forEach(_t)}function Y(e,t){const n=e.$$;n.fragment!==null&&(ee(n.after_update),L(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function le(e,t){e.$$.dirty[0]===-1&&(R.push(e),Dt(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function J(e,t,n,l,o,i,s=null,p=[-1]){const d=U;G(e);const r=e.$$={fragment:null,ctx:[],props:i,update:P,not_equal:o,bound:kt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(d?d.$$.context:[])),callbacks:kt(),dirty:p,skip_bound:!1,root:t.target||d.$$.root};s&&s(r.root);let u=!1;if(r.ctx=n?n(e,t.props||{},(c,m,..._)=>{const k=_.length?_[0]:m;return r.ctx&&o(r.ctx[c],r.ctx[c]=k)&&(!r.skip_bound&&r.bound[c]&&r.bound[c](k),u&&le(e,c)),m}):[],r.update(),u=!0,L(r.before_update),r.fragment=l?l(r.ctx):!1,t.target){if(t.hydrate){const c=Yt(t.target);r.fragment&&r.fragment.l(c),c.forEach(C)}else r.fragment&&r.fragment.c();t.intro&&S(e.$$.fragment),Q(e,t.target,t.anchor),Mt()}G(d)}class X{constructor(){ft(this,"$$");ft(this,"$$set")}$destroy(){Y(this,1),this.$destroy=P}$on(t,n){if(!Ft(n))return P;const l=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return l.push(n),()=>{const o=l.indexOf(n);o!==-1&&l.splice(o,1)}}$set(t){this.$$set&&!Bt(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const oe="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(oe);function $t(e,t,n){const l=e.slice();return l[6]=t[n],l}function Pt(e){let t,n,l=e[6].name+"",o,i,s,p,d,r,u,c;function m(...b){return e[3](e[6],...b)}function _(...b){return e[4](e[6],...b)}function k(...b){return e[5](e[6],...b)}return{c(){t=h("div"),n=h("button"),o=N(l),i=w(),s=h("button"),p=w(),d=h("button"),r=w(),f(n,"type","button"),f(n,"class","svelte-xbcoyz"),f(s,"type","button"),f(s,"class","edit svelte-xbcoyz"),f(s,"data-icon","edit"),f(d,"type","button"),f(d,"class","delete svelte-xbcoyz"),f(d,"data-icon","trash"),f(t,"class","prompt svelte-xbcoyz")},m(b,T){$(b,t,T),a(t,n),a(n,o),a(t,i),a(t,s),a(t,p),a(t,d),a(t,r),u||(c=[E(n,"click",m),E(s,"click",_),E(d,"click",k)],u=!0)},p(b,T){e=b,T&1&&l!==(l=e[6].name+"")&&Ot(o,l)},d(b){b&&C(t),u=!1,L(c)}}}function re(e){let t,n,l,o,i,s,p,d,r=Ct(e[0].list),u=[];for(let c=0;c<r.length;c+=1)u[c]=Pt($t(e,r,c));return{c(){t=h("div"),n=h("h5"),n.textContent="Select a prompt",l=w(),o=h("div");for(let c=0;c<u.length;c+=1)u[c].c();i=w(),s=h("button"),s.textContent="+ New Prompt",f(o,"class","list svelte-xbcoyz"),f(s,"type","button"),f(s,"class","btn"),f(t,"class","promptselector")},m(c,m){$(c,t,m),a(t,n),a(t,l),a(t,o);for(let _=0;_<u.length;_+=1)u[_]&&u[_].m(o,null);a(t,i),a(t,s),p||(d=E(s,"click",e[2]),p=!0)},p(c,[m]){if(m&3){r=Ct(c[0].list);let _;for(_=0;_<r.length;_+=1){const k=$t(c,r,_);u[_]?u[_].p(k,m):(u[_]=Pt(k),u[_].c(),u[_].m(o,null))}for(;_<u.length;_+=1)u[_].d(1);u.length=r.length}},i:P,o:P,d(c){c&&C(t),Ut(u,c),p=!1,d()}}}function ie(e,t,n){let{prompts:l}=t;const o=ct();function i(r){o("new")}const s=(r,u)=>o("select",{prompt:r}),p=(r,u)=>o("edit",{prompt:r}),d=(r,u)=>o("delete",{prompt:r});return e.$$set=r=>{"prompts"in r&&n(0,l=r.prompts)},[l,o,i,s,p,d]}class se extends X{constructor(t){super(),J(this,t,ie,re,K,{prompts:0})}}function ce(e){let t,n,l,o,i,s,p,d;return{c(){t=h("button"),n=h("div"),n.innerHTML='<div class="handle"></div>',l=w(),o=h("input"),f(n,"class","lightswitch-container"),f(o,"type","hidden"),f(o,"name",e[1]),o.value=i=+!!e[0],f(t,"type","button"),f(t,"class","lightswitch"),f(t,"role","switch"),f(t,"aria-checked",s=!!e[0]),Et(t,"on",e[0])},m(r,u){$(r,t,u),a(t,n),a(t,l),a(t,o),p||(d=E(t,"click",e[3]),p=!0)},p(r,[u]){u&2&&f(o,"name",r[1]),u&1&&i!==(i=+!!r[0])&&(o.value=i),u&1&&s!==(s=!!r[0])&&f(t,"aria-checked",s),u&1&&Et(t,"on",r[0])},i:P,o:P,d(r){r&&C(t),p=!1,d()}}}function ue(e,t,n){let{id:l=null}=t,{on:o}=t,{name:i}=t;const s=p=>n(0,o=!o);return e.$$set=p=>{"id"in p&&n(2,l=p.id),"on"in p&&n(0,o=p.on),"name"in p&&n(1,i=p.name)},[o,i,l,s]}class ae extends X{constructor(t){super(),J(this,t,ue,ce,K,{id:2,on:0,name:1})}}function St(e){let t,n,l,o,i,s,p;function d(u){e[6](u)}let r={id:"gpt-prompt-save",name:"should-save"};return e[1]!==void 0&&(r.on=e[1]),i=new ae({props:r}),st.push(()=>ne(i,"on",d)),{c(){t=h("div"),n=h("div"),n.innerHTML='<label for="gpt-prompt-save">Save Prompt</label>',l=w(),o=h("div"),ut(i.$$.fragment),f(n,"class","heading"),f(o,"class","input ltr"),f(t,"class","field width-100")},m(u,c){$(u,t,c),a(t,n),a(t,l),a(t,o),Q(i,o,null),p=!0},p(u,c){const m={};!s&&c&2&&(s=!0,m.on=u[1],Zt(()=>s=!1)),i.$set(m)},i(u){p||(S(i.$$.fragment,u),p=!0)},o(u){A(i.$$.fragment,u),p=!1},d(u){u&&C(t),Y(i)}}}function fe(e){var wt;let t,n,l,o,i,s,p,d,r,u,c,m,_,k,b,T,j,Z,D,tt,M,B,V,et,nt,g,v,F,O,lt,bt,I,ot,at,vt,y=(((wt=e[0])==null?void 0:wt.id)??null)===null&&St(e);return{c(){t=h("div"),n=h("h5"),n.textContent="Edit or create a prompt",l=w(),o=h("form"),i=h("div"),s=h("div"),s.innerHTML='<label for="gpt-prompt-name">Name</label>',p=w(),d=h("div"),r=h("input"),u=w(),c=h("div"),m=h("div"),m.innerHTML='<label for="gpt-prompt-prompt">Prompt</label>',_=w(),k=h("div"),b=h("p"),T=N("Use "),j=h("code"),j.textContent="{{fieldValue}}",Z=N(" to insert the value into the prompt. Other properties "),D=h("code"),D.textContent="{{fieldName}}",tt=N(", "),M=h("code"),M.textContent="{{fieldLabel}}",B=N(", "),V=h("code"),V.textContent="{{fieldInstructions}}",et=N("."),nt=w(),g=h("div"),v=h("textarea"),F=w(),y&&y.c(),O=w(),lt=h("button"),lt.textContent="Save",bt=w(),I=h("button"),I.textContent="Cancel",f(n,"class","svelte-fda1us"),f(s,"class","heading"),f(r,"id","gpt-prompt-name"),f(r,"type","text"),f(r,"class","text fullwidth"),f(r,"name","name"),r.required=!0,f(d,"class","input ltr"),f(i,"class","field"),f(m,"class","heading"),f(j,"class","svelte-fda1us"),f(D,"class","svelte-fda1us"),f(M,"class","svelte-fda1us"),f(V,"class","svelte-fda1us"),f(k,"class","instructions"),f(v,"id","gpt-prompt-prompt"),f(v,"name","prompt"),f(v,"class","text nicetext fullwidth"),f(v,"rows","5"),v.required=!0,f(g,"class","input ltr"),f(c,"class","field width-100"),f(lt,"class","btn submit"),f(I,"type","button"),f(I,"class","btn"),f(t,"class","editprompt svelte-fda1us")},m(x,z){$(x,t,z),a(t,n),a(t,l),a(t,o),a(o,i),a(i,s),a(i,p),a(i,d),a(d,r),rt(r,e[0].name),a(o,u),a(o,c),a(c,m),a(c,_),a(c,k),a(k,b),a(b,T),a(b,j),a(b,Z),a(b,D),a(b,tt),a(b,M),a(b,B),a(b,V),a(b,et),a(c,nt),a(c,g),a(g,v),rt(v,e[0].prompt),a(o,F),y&&y.m(o,null),a(o,O),a(o,lt),a(o,bt),a(o,I),ot=!0,at||(vt=[E(r,"input",e[4]),E(v,"input",e[5]),E(I,"click",e[7]),E(o,"submit",Qt(e[3]))],at=!0)},p(x,[z]){var yt;z&1&&r.value!==x[0].name&&rt(r,x[0].name),z&1&&rt(v,x[0].prompt),(((yt=x[0])==null?void 0:yt.id)??null)===null?y?(y.p(x,z),z&1&&S(y,1)):(y=St(x),y.c(),S(y,1),y.m(o,O)):y&&(Vt(),A(y,1,1,()=>{y=null}),It())},i(x){ot||(S(y),ot=!0)},o(x){A(y),ot=!1},d(x){x&&C(t),y&&y.d(),at=!1,L(vt)}}}function de(e,t,n){let{prompt:l}=t;const o=ct();let i=!0;async function s(c){if(!i){o("save",{prompt:l});return}const m=new FormData(c.target);((l==null?void 0:l.id)??null)!==null&&m.set("id",l.id);const _=await fetch("/actions/gpt-content-generator/prompts/save",{method:"POST",body:m,headers:{Accept:"application/json"}});n(0,l=await _.json()),o("save",{prompt:l})}function p(){l.name=this.value,n(0,l)}function d(){l.prompt=this.value,n(0,l)}function r(c){i=c,n(1,i)}const u=c=>o("cancel");return e.$$set=c=>{"prompt"in c&&n(0,l=c.prompt)},[l,i,o,s,p,d,r,u]}class pe extends X{constructor(t){super(),J(this,t,de,fe,K,{prompt:0})}}function he(e){let t,n,l,o,i,s,p,d,r,u,c;return{c(){t=h("div"),n=h("p"),l=N(e[0]),o=w(),i=h("button"),i.textContent="Ok",s=w(),p=h("button"),p.textContent="Regenerate",d=w(),r=h("button"),r.textContent="Cancel",f(i,"type","button"),f(i,"class","btn submit"),f(p,"type","button"),f(p,"class","btn"),f(r,"type","button"),f(r,"class","btn"),f(t,"class","generated-text")},m(m,_){$(m,t,_),a(t,n),a(n,l),a(t,o),a(t,i),a(t,s),a(t,p),a(t,d),a(t,r),u||(c=[E(i,"click",e[2]),E(p,"click",e[3]),E(r,"click",e[4])],u=!0)},p(m,[_]){_&1&&Ot(l,m[0])},i:P,o:P,d(m){m&&C(t),u=!1,L(c)}}}function me(e,t,n){let{text:l}=t;const o=ct(),i=d=>o("accept"),s=d=>o("regenerate"),p=d=>o("cancel");return e.$$set=d=>{"text"in d&&n(0,l=d.text)},[l,o,i,s,p]}class _e extends X{constructor(t){super(),J(this,t,me,he,K,{text:0})}}const{window:Nt}=Gt;function ge(e){let t,n;return t=new se({props:{prompts:e[0]}}),t.$on("new",e[8]),t.$on("select",e[9]),t.$on("edit",e[11]),t.$on("delete",e[12]),{c(){ut(t.$$.fragment)},m(l,o){Q(t,l,o),n=!0},p(l,o){const i={};o&1&&(i.prompts=l[0]),t.$set(i)},i(l){n||(S(t.$$.fragment,l),n=!0)},o(l){A(t.$$.fragment,l),n=!1},d(l){Y(t,l)}}}function be(e){let t,n;return t=new pe({props:{prompt:e[2]}}),t.$on("save",e[10]),t.$on("cancel",e[17]),{c(){ut(t.$$.fragment)},m(l,o){Q(t,l,o),n=!0},p(l,o){const i={};o&4&&(i.prompt=l[2]),t.$set(i)},i(l){n||(S(t.$$.fragment,l),n=!0)},o(l){A(t.$$.fragment,l),n=!1},d(l){Y(t,l)}}}function ve(e){let t,n,l,o=e[4]&&Lt();return{c(){t=h("p"),t.textContent="Generating...",n=w(),o&&o.c(),l=Kt()},m(i,s){$(i,t,s),$(i,n,s),o&&o.m(i,s),$(i,l,s)},p(i,s){i[4]?o||(o=Lt(),o.c(),o.m(l.parentNode,l)):o&&(o.d(1),o=null)},i:P,o:P,d(i){i&&(C(t),C(n),C(l)),o&&o.d(i)}}}function we(e){let t,n;return t=new _e({props:{text:e[5]}}),t.$on("accept",e[13]),t.$on("regenerate",e[14]),t.$on("cancel",e[16]),{c(){ut(t.$$.fragment)},m(l,o){Q(t,l,o),n=!0},p(l,o){const i={};o&32&&(i.text=l[5]),t.$set(i)},i(l){n||(S(t.$$.fragment,l),n=!0)},o(l){A(t.$$.fragment,l),n=!1},d(l){Y(t,l)}}}function Lt(e){let t;return{c(){t=h("p"),t.textContent="Failed to generate"},m(n,l){$(n,t,l)},d(n){n&&C(t)}}}function ye(e){let t,n,l,o,i,s,p;const d=[we,ve,be,ge],r=[];function u(c,m){return c[5]?0:c[3]?1:c[2]?2:3}return l=u(e),o=r[l]=d[l](e),{c(){t=h("div"),n=h("div"),o.c(),f(n,"class","gpt-popover svelte-hqfsef"),f(t,"class","gpt-popover-cont svelte-hqfsef")},m(c,m){$(c,t,m),a(t,n),r[l].m(n,null),e[18](t),i=!0,s||(p=[E(Nt,"scroll",e[6]),E(Nt,"click",e[7])],s=!0)},p(c,[m]){let _=l;l=u(c),l===_?r[l].p(c,m):(Vt(),A(r[_],1,1,()=>{r[_]=null}),It(),o=r[l],o?o.p(c,m):(o=r[l]=d[l](c),o.c()),S(o,1),o.m(n,null))},i(c){i||(S(o),i=!0)},o(c){A(o),i=!1},d(c){c&&C(t),r[l].d(),e[18](null),s=!1,L(p)}}}function ke(e,t,n){let{field:l}=t,{prompts:o}=t;const i=ct();let s,p=null,d=null,r=null,u=null,c=null;function m(){const g=l.el.getBoundingClientRect(),v=s.offsetHeight;g.top<v?(n(1,s.style.top=g.bottom+"px",s),n(1,s.style.bottom="auto",s)):(n(1,s.style.top="auto",s),n(1,s.style.bottom=window.innerHeight-g.top+"px",s)),n(1,s.style.right=window.innerWidth-g.right+"px",s),n(1,s.style.maxWidth=l.el.offsetWidth+"px",s)}function _(){m()}function k(g){Date.now()-p<100||console.log("e",g)}async function b(g){n(2,d={name:"",prompt:""}),await xt(),m()}function T(g){const v=g.detail.prompt;B(v.prompt)}function j(g){const v=g.detail.prompt;"id"in v&&n(0,o=o.save(v)),n(2,d=null)}async function Z(g){n(2,d=g.detail.prompt),await xt(),m()}async function D(g){const v=g.detail.prompt,F=new FormData;F.set("id",v.id);try{if(!(await fetch("/actions/gpt-content-generator/prompts/delete",{method:"POST",body:F,headers:{Accept:"application/json"}})).ok)throw new Error("error");n(0,o=o.del(v))}catch{console.log("failed to generate"),alert("could not delete prompt")}}function tt(g){l.setValue(c),i("close")}function M(g){n(5,c=null),B(r)}async function B(g){g=g.replaceAll("{{fieldName}}",l.name()).replaceAll("{{fieldLabel}}",l.label()).replaceAll("{{fieldInstructions}}",l.instructions()).replaceAll("{{fieldValue}}",l.value()),n(4,u=null),n(3,r=g);const v=new FormData;v.set("prompt",g);try{const O=await(await fetch("/actions/gpt-content-generator/prompts/execute",{method:"POST",body:v,headers:{Accept:"application/json"}})).json();n(5,c=O)}catch{console.log("failed to generate"),n(4,u="could not generate")}}Xt(()=>{p=Date.now(),m()});const V=g=>n(5,c=null),et=g=>n(2,d=null);function nt(g){st[g?"unshift":"push"](()=>{s=g,n(1,s)})}return e.$$set=g=>{"field"in g&&n(15,l=g.field),"prompts"in g&&n(0,o=g.prompts)},[o,s,d,r,u,c,_,k,b,T,j,Z,D,tt,M,l,V,et,nt]}class Ee extends X{constructor(t){super(),J(this,t,ke,ye,K,{field:15,prompts:0})}}class xe{constructor(){this.prompts=null,this.current=null,this.currentField=null}setPrompts(t){this.prompts=t}open(t){if(this.current&&(this.current.$destroy(),this.current=null),this.currentField&&this.currentField.eq(t)){this.currentField=null;return}this.currentField=t;const n=new Ee({target:document.body,props:{field:t,prompts:this.prompts}});n.$on("close",l=>{n.$destroy(),this.currentField&&this.currentField.eq(t)&&(this.currentField=null,this.current=null)}),this.current=n}}class gt{constructor(t){this.list=t}static async load(){const t=await fetch("/actions/gpt-content-generator/prompts/get");return new gt(await t.json())}save(t){return this.list.find(l=>l.id!=t.id?!1:(l.name=t.name,l.prompt=t.prompt,!0))||this.list.push(t),this}del(t){return this.list=this.list.filter(n=>n.id!==t.id),this}}class zt{constructor(t,n){this.type=t,this.el=n}name(){throw new Error("could not get name of "+this.type)}label(){throw new Error("could not get the label of "+this.type)}instructions(){throw new Error("could not get the instructions of "+this.type)}value(){throw new Error("could not get value of "+this.type)}setValue(t){throw new Error("could not set value of "+this.type)}eq(t){return this.type===t.type&&this.el===t.el}}class Ce extends zt{constructor(t,n){super("input",t),this.labelEl=n==null?void 0:n.label,this.instructionsEl=n==null?void 0:n.instructions}name(){return this.el.name}label(){return this.labelEl?this.labelEl.innerText:""}instructions(){return this.instructionsEl?this.instructionsEl.innerText:""}value(){return this.el.value}setValue(t){this.el.value=t}}class $e extends zt{constructor(t,n){super("textarea",t),this.labelEl=n==null?void 0:n.label,this.instructionsEl=n==null?void 0:n.instructions}name(){return this.el.name}label(){return this.labelEl?this.labelEl.innerText:""}instructions(){return this.instructionsEl?this.instructionsEl.innerText:""}value(){return this.el.value}setValue(t){this.el.value=t}}const pt="gptvis",Ht=new xe;function Tt(){const e=["#content-container input[type=text]","#content-container textarea"],t=/^(title|fields.*)$/;for(const n of e)for(const l of document.querySelectorAll(n)){if(l.dataset[pt])continue;if(getComputedStyle(l).display==="none")return;if(t.test(l.name))l.dataset[pt]="valid";else{l.dataset[pt]="invalid";continue}const o=l.parentNode.parentNode.querySelector("label"),i=l.parentNode.parentNode.querySelector(".instructions"),s=l.nodeName.toLowerCase();let p;s==="input"?p=new Ce(l,{label:o,instructions:i}):s==="textarea"&&(p=new $e(l,{label:o,instructions:i}));const d=document.createElement("span");d.classList.add("gpt-click-icon"),d.classList.add("gpt-click-icon-"+s),d.innerText="ai",l.parentNode.appendChild(d),d.addEventListener("click",async u=>{Ht.open(p)})}}async function Pe(){const e=await gt.load();Ht.setPrompts(e),Tt(),document.addEventListener("click",t=>{Tt()})}Pe();
//# sourceMappingURL=main-60d7724d.js.map
