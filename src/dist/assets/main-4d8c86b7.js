var Yt=Object.defineProperty;var Zt=(e,t,n)=>t in e?Yt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var at=(e,t,n)=>(Zt(e,typeof t!="symbol"?t+"":t,n),n);class xt extends Error{constructor(t){super(t)}__promptsError__(){}}function $t(e){return typeof e=="object"&&e!==null&&typeof e.__promptsError__=="function"}class ht{constructor(t){this.list=t.prompts,this.groups=t.groups,this.fieldGroups=t.fieldGroups}static async load(){const t=await fetch("/actions/gpt-content-generator/prompts/get");return new ht(await t.json())}get(t){return t=parseInt(t),this.list.find(n=>n.id===t)}getByGroup(t){return this.list.filter(n=>n.group===t)}canViewGroup(t){return!!this.getGroup(t)}canEditGroup(t){const n=typeof Craft=="object"&&Craft.userIsAdmin,l=this.getGroup(t);return((l==null?void 0:l.canEdit)??!1)||n}getGroup(t){return this.groups.find(n=>n.key===t)}getFieldGroup(t){return this.fieldGroups[t]??null}async save(t){const n=new FormData;t.id&&n.set("id",t.id),n.set("name",t.name),n.set("prompt",t.prompt),n.set("group",t.group);const l=await fetch("/actions/gpt-content-generator/prompts/save",{method:"POST",body:n,headers:{Accept:"application/json"}});if(!l.ok)throw new Error("not ok");return t=await l.json(),this.list.find(r=>r.id!=t.id?!1:(r.name=t.name,r.prompt=t.prompt,r.group=t.group,!0))||this.list.push(t),t}async del(t){const n=new FormData;if(n.set("id",t.id),!(await fetch("/actions/gpt-content-generator/prompts/delete",{method:"POST",body:n,headers:{Accept:"application/json"}})).ok)throw new Error("not ok");this.list=this.list.filter(o=>o.id!==t.id)}async execute(t,n){const l=new FormData;l.set("prompt",t),l.set("context",JSON.stringify(n));const o=await fetch("/actions/gpt-content-generator/prompts/execute",{method:"POST",body:l,headers:{Accept:"application/json"}});if(!o.ok)throw new Error("not ok");const r=await o.json();if(r!=null&&r.error)throw new xt(r.error);return r}}class _t{constructor(t){this.list=t.fields,this.fieldGroups=t.fieldGroups,(!t.fieldGroups||Array.isArray(t.fieldGroups))&&(this.fieldGroups={})}static async load(){const t=await fetch("/actions/gpt-content-generator/settings/get-fields");return new _t(await t.json())}getCombined(){return this.list.map(t=>{const{id:n,handle:l,type:o,name:r}=t;return{id:n,handle:l,type:o,name:r,group:this.fieldGroups[n]??""}})}async saveFieldGroups(t){const n=new FormData;n.set("fieldGroups",JSON.stringify(t));const l=await fetch("/actions/gpt-content-generator/settings/save-field-groups",{method:"POST",body:n,headers:{Accept:"application/json"}});if(!l.ok)throw new Error("not ok");this.fieldGroups=await l.json()}}function j(){}function jt(e){return e()}function bt(){return Object.create(null)}function V(e){e.forEach(jt)}function Ot(e){return typeof e=="function"}function U(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function te(e){return Object.keys(e).length===0}const ee=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function f(e,t){e.appendChild(t)}function G(e,t,n){e.insertBefore(t,n||null)}function C(e){e.parentNode&&e.parentNode.removeChild(e)}function ot(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function h(e){return document.createElement(e)}function F(e){return document.createTextNode(e)}function w(){return F(" ")}function Bt(){return F("")}function M(e,t,n,l){return e.addEventListener(t,n,l),()=>e.removeEventListener(t,n,l)}function Ht(e){return function(t){return t.preventDefault(),e.call(this,t)}}function m(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ne(e){return Array.from(e.childNodes)}function H(e,t){t=""+t,e.data!==t&&(e.data=t)}function B(e,t){e.value=t??""}function st(e,t,n){for(let l=0;l<e.options.length;l+=1){const o=e.options[l];if(o.__value===t){o.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function Rt(e){const t=e.querySelector(":checked");return t&&t.__value}function le(e,t,{bubbles:n=!1,cancelable:l=!1}={}){return new CustomEvent(e,{detail:t,bubbles:n,cancelable:l})}let nt;function et(e){nt=e}function Vt(){if(!nt)throw new Error("Function called outside component initialization");return nt}function gt(e){Vt().$$.on_mount.push(e)}function ct(){const e=Vt();return(t,n,{cancelable:l=!1}={})=>{const o=e.$$.callbacks[t];if(o){const r=le(t,n,{cancelable:l});return o.slice().forEach(c=>{c.call(e,r)}),!r.defaultPrevented}return!0}}const Z=[],pt=[];let x=[];const vt=[],zt=Promise.resolve();let mt=!1;function Wt(){mt||(mt=!0,zt.then(Ut))}function yt(){return Wt(),zt}function lt(e){x.push(e)}const ft=new Set;let Y=0;function Ut(){if(Y!==0)return;const e=nt;do{try{for(;Y<Z.length;){const t=Z[Y];Y++,et(t),oe(t.$$)}}catch(t){throw Z.length=0,Y=0,t}for(et(null),Z.length=0,Y=0;pt.length;)pt.pop()();for(let t=0;t<x.length;t+=1){const n=x[t];ft.has(n)||(ft.add(n),n())}x.length=0}while(Z.length);for(;vt.length;)vt.pop()();mt=!1,ft.clear(),et(e)}function oe(e){if(e.fragment!==null){e.update(),V(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(lt)}}function re(e){const t=[],n=[];x.forEach(l=>e.indexOf(l)===-1?t.push(l):n.push(l)),n.forEach(l=>l()),x=t}const it=new Set;let Q;function ie(){Q={r:0,c:[],p:Q}}function se(){Q.r||V(Q.c),Q=Q.p}function W(e,t){e&&e.i&&(it.delete(e),e.i(t))}function X(e,t,n,l){if(e&&e.o){if(it.has(e))return;it.add(e),Q.c.push(()=>{it.delete(e),l&&(n&&e.d(1),l())}),e.o(t)}else l&&l()}function R(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function rt(e){e&&e.c()}function $(e,t,n){const{fragment:l,after_update:o}=e.$$;l&&l.m(t,n),lt(()=>{const r=e.$$.on_mount.map(jt).filter(Ot);e.$$.on_destroy?e.$$.on_destroy.push(...r):V(r),e.$$.on_mount=[]}),o.forEach(lt)}function tt(e,t){const n=e.$$;n.fragment!==null&&(re(n.after_update),V(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ce(e,t){e.$$.dirty[0]===-1&&(Z.push(e),Wt(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function J(e,t,n,l,o,r,c=null,a=[-1]){const s=nt;et(e);const u=e.$$={fragment:null,ctx:[],props:r,update:j,not_equal:o,bound:bt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(s?s.$$.context:[])),callbacks:bt(),dirty:a,skip_bound:!1,root:t.target||s.$$.root};c&&c(u.root);let d=!1;if(u.ctx=n?n(e,t.props||{},(i,p,...b)=>{const P=b.length?b[0]:p;return u.ctx&&o(u.ctx[i],u.ctx[i]=P)&&(!u.skip_bound&&u.bound[i]&&u.bound[i](P),d&&ce(e,i)),p}):[],u.update(),d=!0,V(u.before_update),u.fragment=l?l(u.ctx):!1,t.target){if(t.hydrate){const i=ne(t.target);u.fragment&&u.fragment.l(i),i.forEach(C)}else u.fragment&&u.fragment.c();t.intro&&W(e.$$.fragment),$(e,t.target,t.anchor),Ut()}et(s)}class K{constructor(){at(this,"$$");at(this,"$$set")}$destroy(){tt(this,1),this.$destroy=j}$on(t,n){if(!Ot(n))return j;const l=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return l.push(n),()=>{const o=l.indexOf(n);o!==-1&&l.splice(o,1)}}$set(t){this.$$set&&!te(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ue="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ue);function wt(e,t,n){const l=e.slice();return l[4]=t[n],l}function ae(e){let t,n,l,o,r,c,a=R(e[0].list),s=[];for(let u=0;u<a.length;u+=1)s[u]=Et(wt(e,a,u));return{c(){t=h("div"),n=h("div"),l=h("table"),o=h("thead"),o.innerHTML='<tr><th>Name</th> <th>Group</th> <th>Prompt</th> <th class="thin"></th></tr>',r=w(),c=h("tbody");for(let u=0;u<s.length;u+=1)s[u].c();m(c,"class","vuetable-body"),m(l,"class","vuetable data fullwidth"),m(n,"class","vue-admin-tablepane tablepane"),m(t,"class","tableview")},m(u,d){G(u,t,d),f(t,n),f(n,l),f(l,o),f(l,r),f(l,c);for(let i=0;i<s.length;i+=1)s[i]&&s[i].m(c,null)},p(u,d){if(d&7){a=R(u[0].list);let i;for(i=0;i<a.length;i+=1){const p=wt(u,a,i);s[i]?s[i].p(p,d):(s[i]=Et(p),s[i].c(),s[i].m(c,null))}for(;i<s.length;i+=1)s[i].d(1);s.length=a.length}},d(u){u&&C(t),ot(s,u)}}}function fe(e){let t;return{c(){t=h("div"),t.innerHTML="<p>No Prompts exist yet.</p>",m(t,"class","zilch")},m(n,l){G(n,t,l)},p:j,d(n){n&&C(t)}}}function de(e){let t=e[4].name+"",n;return{c(){n=F(t)},m(l,o){G(l,n,o)},p(l,o){o&1&&t!==(t=l[4].name+"")&&H(n,t)},d(l){l&&C(n)}}}function pe(e){let t,n=e[4].name+"",l,o;return{c(){t=h("a"),l=F(n),m(t,"href",o=e[1]+"/prompts/"+e[4].id)},m(r,c){G(r,t,c),f(t,l)},p(r,c){c&1&&n!==(n=r[4].name+"")&&H(l,n),c&3&&o!==(o=r[1]+"/prompts/"+r[4].id)&&m(t,"href",o)},d(r){r&&C(t)}}}function kt(e){let t,n,l;function o(...r){return e[3](e[4],...r)}return{c(){t=h("a"),m(t,"title","Delete"),m(t,"role","button"),m(t,"href","#"),m(t,"class","delete icon")},m(r,c){G(r,t,c),n||(l=M(t,"click",Ht(o)),n=!0)},p(r,c){e=r},d(r){r&&C(t),n=!1,l()}}}function Et(e){var k;let t,n,l,o,r,c,a=(((k=e[0].getGroup(e[4].group))==null?void 0:k.name)??"")+"",s,u,d,i,p=e[4].prompt+"",b,P,T,S=e[0].canEditGroup(e[4].group),I;function N(E,y){return y&1&&(l=null),l==null&&(l=!!E[0].canEditGroup(E[4].group)),l?pe:de}let O=N(e,-1),A=O(e),v=S&&kt(e);return{c(){t=h("tr"),n=h("td"),A.c(),o=w(),r=h("td"),c=h("span"),s=F(a),u=w(),d=h("td"),i=h("span"),b=F(p),P=w(),T=h("td"),v&&v.c(),I=w(),m(c,"class","light"),m(i,"class","light")},m(E,y){G(E,t,y),f(t,n),A.m(n,null),f(t,o),f(t,r),f(r,c),f(c,s),f(t,u),f(t,d),f(d,i),f(i,b),f(t,P),f(t,T),v&&v.m(T,null),f(t,I)},p(E,y){var L;O===(O=N(E,y))&&A?A.p(E,y):(A.d(1),A=O(E),A&&(A.c(),A.m(n,null))),y&1&&a!==(a=(((L=E[0].getGroup(E[4].group))==null?void 0:L.name)??"")+"")&&H(s,a),y&1&&p!==(p=E[4].prompt+"")&&H(b,p),y&1&&(S=E[0].canEditGroup(E[4].group)),S?v?v.p(E,y):(v=kt(E),v.c(),v.m(T,null)):v&&(v.d(1),v=null)},d(E){E&&C(t),A.d(),v&&v.d()}}}function me(e){let t;function n(r,c){return r[0].list.length?ae:fe}let l=n(e),o=l(e);return{c(){o.c(),t=Bt()},m(r,c){o.m(r,c),G(r,t,c)},p(r,[c]){l===(l=n(r))&&o?o.p(r,c):(o.d(1),o=l(r),o&&(o.c(),o.m(t.parentNode,t)))},i:j,o:j,d(r){r&&C(t),o.d(r)}}}function he(e,t,n){let{prompts:l}=t,{url:o}=t;async function r(a,s){if(confirm("Delete the Prompt?"))try{await l.del(s),n(0,l)}catch{console.log("could not delete prompt"),alert("Failed to delete the prompt")}}const c=(a,s)=>r(s,a);return e.$$set=a=>{"prompts"in a&&n(0,l=a.prompts),"url"in a&&n(1,o=a.url)},[l,o,r,c]}class _e extends K{constructor(t){super(),J(this,t,he,me,U,{prompts:0,url:1})}}function ge(e){let t,n,l,o,r,c,a,s,u,d,i,p;return{c(){t=h("p"),n=F("Dynamically add the field value into the prompt with "),l=h("code"),l.textContent="{{field.value|raw}}",o=F(`
	. The field also provides
	`),r=h("code"),r.textContent="{{field.name}}",c=F(`
	,
	`),a=h("code"),a.textContent="{{field.label}}",s=F(`
	and
	`),u=h("code"),u.textContent="{{field.instructions}}",d=F(`
	. To access the current language, use
	`),i=h("code"),i.textContent="{{currentSite.language}}",p=F(`
	.`),m(l,"class","svelte-sv2vnm"),m(r,"class","svelte-sv2vnm"),m(a,"class","svelte-sv2vnm"),m(u,"class","svelte-sv2vnm"),m(i,"class","svelte-sv2vnm")},m(b,P){G(b,t,P),f(t,n),f(t,l),f(t,o),f(t,r),f(t,c),f(t,a),f(t,s),f(t,u),f(t,d),f(t,i),f(t,p)},p:j,i:j,o:j,d(b){b&&C(t)}}}class Jt extends K{constructor(t){super(),J(this,t,null,ge,U,{})}}function Ct(e,t,n){const l=e.slice();return l[9]=t[n],l}function Pt(e){let t,n=e[9].name+"",l,o,r,c;return{c(){t=h("option"),l=F(n),o=w(),t.__value=r=e[9].key,B(t,t.__value),t.selected=c=e[1].group?null:e[9].key==="default"},m(a,s){G(a,t,s),f(t,l),f(t,o)},p(a,s){s&1&&n!==(n=a[9].name+"")&&H(l,n),s&1&&r!==(r=a[9].key)&&(t.__value=r,B(t,t.__value)),s&3&&c!==(c=a[1].group?null:a[9].key==="default")&&(t.selected=c)},d(a){a&&C(t)}}}function be(e){let t,n,l,o,r,c,a,s,u,d,i,p,b,P,T,S,I,N,O,A,v,k,E,y;i=new Jt({});let L=R(e[0].groups.filter(Gt)),g=[];for(let _=0;_<L.length;_+=1)g[_]=Pt(Ct(e,L,_));return{c(){t=h("div"),n=h("div"),n.innerHTML='<label for="gpt-prompt-name">Name</label>',l=w(),o=h("div"),r=h("input"),c=w(),a=h("div"),s=h("div"),s.innerHTML='<label for="gpt-prompt-prompt">Prompt</label>',u=w(),d=h("div"),rt(i.$$.fragment),p=w(),b=h("div"),P=h("textarea"),T=w(),S=h("div"),I=h("div"),I.innerHTML='<label for="group">Group</label>',N=w(),O=h("div"),A=h("div"),v=h("select");for(let _=0;_<g.length;_+=1)g[_].c();m(n,"class","heading"),m(r,"id","gpt-prompt-name"),m(r,"type","text"),m(r,"class","text fullwidth"),m(r,"name","name"),r.required=!0,m(o,"class","input ltr"),m(t,"class","field"),m(s,"class","heading"),m(d,"class","instructions"),m(P,"id","gpt-prompt-prompt"),m(P,"name","prompt"),m(P,"class","text nicetext fullwidth"),m(P,"rows","5"),P.required=!0,m(b,"class","input ltr"),m(a,"class","field width-100"),m(I,"class","heading"),m(v,"id","group"),m(v,"name","group"),v.required=!0,e[1].group===void 0&&lt(()=>e[7].call(v)),m(A,"class","select"),m(O,"class","input ltr"),m(S,"class","field")},m(_,D){G(_,t,D),f(t,n),f(t,l),f(t,o),f(o,r),B(r,e[1].name),G(_,c,D),G(_,a,D),f(a,s),f(a,u),f(a,d),$(i,d,null),f(a,p),f(a,b),f(b,P),B(P,e[1].prompt),G(_,T,D),G(_,S,D),f(S,I),f(S,N),f(S,O),f(O,A),f(A,v);for(let q=0;q<g.length;q+=1)g[q]&&g[q].m(v,null);st(v,e[1].group,!0),k=!0,E||(y=[M(r,"input",e[5]),M(P,"input",e[6]),M(v,"change",e[7])],E=!0)},p(_,[D]){if(D&3&&r.value!==_[1].name&&B(r,_[1].name),D&3&&B(P,_[1].prompt),D&3){L=R(_[0].groups.filter(Gt));let q;for(q=0;q<L.length;q+=1){const z=Ct(_,L,q);g[q]?g[q].p(z,D):(g[q]=Pt(z),g[q].c(),g[q].m(v,null))}for(;q<g.length;q+=1)g[q].d(1);g.length=L.length}D&3&&st(v,_[1].group)},i(_){k||(W(i.$$.fragment,_),k=!0)},o(_){X(i.$$.fragment,_),k=!1},d(_){_&&(C(t),C(c),C(a),C(T),C(S)),tt(i),ot(g,_),E=!1,V(y)}}}const Gt=e=>e.canEdit;function ve(e,t,n){let{prompts:l}=t,{form:o}=t,{id:r}=t,{url:c}=t,a=r?l.get(r):{};async function s(){try{await l.save(a),window.location=c}catch{console.log("could not save prompt"),alert("Could not save prompt")}}gt(()=>{o.addEventListener("submit",async p=>{p.preventDefault(),s()}),document.body.addEventListener("keydown",p=>{p.key.toLowerCase()!=="s"||!p.metaKey||(p.preventDefault(),o.querySelector('[type="submit"]').click())}),o.removeAttribute("data-confirm-unload")});function u(){a.name=this.value,n(1,a),n(0,l)}function d(){a.prompt=this.value,n(1,a),n(0,l)}function i(){a.group=Rt(this),n(1,a),n(0,l)}return e.$$set=p=>{"prompts"in p&&n(0,l=p.prompts),"form"in p&&n(2,o=p.form),"id"in p&&n(3,r=p.id),"url"in p&&n(4,c=p.url)},[l,a,o,r,c,u,d,i]}class ye extends K{constructor(t){super(),J(this,t,ve,be,U,{prompts:0,form:2,id:3,url:4})}}function St(e,t,n){const l=e.slice();return l[8]=t[n],l[9]=t,l[10]=n,l}function At(e,t,n){const l=e.slice();return l[11]=t[n],l}function Lt(e){let t,n=e[11].name+"",l,o,r;return{c(){t=h("option"),l=F(n),o=w(),t.__value=r=e[11].key,B(t,t.__value)},m(c,a){G(c,t,a),f(t,l),f(t,o)},p(c,a){a&1&&n!==(n=c[11].name+"")&&H(l,n),a&1&&r!==(r=c[11].key)&&(t.__value=r,B(t,t.__value))},d(c){c&&C(t)}}}function Tt(e){let t,n,l=e[8].name+"",o,r,c,a=e[8].handle+"",s,u,d,i=e[8].type+"",p,b,P,T,S,I,N,O,A,v=R(e[0].groups),k=[];for(let y=0;y<v.length;y+=1)k[y]=Lt(At(e,v,y));function E(){e[6].call(S,e[9],e[10])}return{c(){t=h("tr"),n=h("td"),o=F(l),r=w(),c=h("td"),s=F(a),u=w(),d=h("td"),p=F(i),b=w(),P=h("td"),T=h("div"),S=h("select"),I=h("option");for(let y=0;y<k.length;y+=1)k[y].c();N=w(),I.__value="",B(I,I.__value),m(S,"id","group"),m(S,"name","group"),e[8].group===void 0&&lt(E),m(T,"class","select"),m(t,"class","s-10")},m(y,L){G(y,t,L),f(t,n),f(n,o),f(t,r),f(t,c),f(c,s),f(t,u),f(t,d),f(d,p),f(t,b),f(t,P),f(P,T),f(T,S),f(S,I);for(let g=0;g<k.length;g+=1)k[g]&&k[g].m(S,null);st(S,e[8].group,!0),f(t,N),O||(A=M(S,"change",E),O=!0)},p(y,L){if(e=y,L&2&&l!==(l=e[8].name+"")&&H(o,l),L&2&&a!==(a=e[8].handle+"")&&H(s,a),L&2&&i!==(i=e[8].type+"")&&H(p,i),L&1){v=R(e[0].groups);let g;for(g=0;g<v.length;g+=1){const _=At(e,v,g);k[g]?k[g].p(_,L):(k[g]=Lt(_),k[g].c(),k[g].m(S,null))}for(;g<k.length;g+=1)k[g].d(1);k.length=v.length}L&3&&st(S,e[8].group)},d(y){y&&C(t),ot(k,y),O=!1,A()}}}function we(e){let t,n,l,o,r,c=R(e[1]),a=[];for(let s=0;s<c.length;s+=1)a[s]=Tt(St(e,c,s));return{c(){t=h("div"),n=h("table"),l=h("thead"),l.innerHTML='<tr><th scope="col">Label</th> <th scope="col">Handle</th> <th scope="col">Field type</th> <th scope="col">Group</th></tr>',o=w(),r=h("tbody");for(let s=0;s<a.length;s+=1)a[s].c();m(n,"class","data fullwidth"),m(t,"class","tableview tablepane")},m(s,u){G(s,t,u),f(t,n),f(n,l),f(n,o),f(n,r);for(let d=0;d<a.length;d+=1)a[d]&&a[d].m(r,null)},p(s,[u]){if(u&3){c=R(s[1]);let d;for(d=0;d<c.length;d+=1){const i=St(s,c,d);a[d]?a[d].p(i,u):(a[d]=Tt(i),a[d].c(),a[d].m(r,null))}for(;d<a.length;d+=1)a[d].d(1);a.length=c.length}},i:j,o:j,d(s){s&&C(t),ot(a,s)}}}function ke(e,t,n){let{prompts:l}=t,{fields:o}=t,{form:r}=t,{enableAll:c}=t,{disableAll:a}=t,s=o.getCombined();async function u(){const i={};for(const p of s)i[p.id]=p.group;try{await o.saveFieldGroups(i),window.location.reload()}catch{console.log("could not save prompt"),alert("Could not save prompt")}}gt(()=>{r.addEventListener("submit",i=>{i.preventDefault(),u()}),document.body.addEventListener("keydown",i=>{i.key.toLowerCase()!=="s"||!i.metaKey||(i.preventDefault(),u())}),c.addEventListener("click",i=>{n(1,s=s.map(p=>(p.group||(p.group="default"),p)))}),a.addEventListener("click",i=>{n(1,s=s.map(p=>(p.group="",p)))})});function d(i,p){i[p].group=Rt(this),n(1,s),n(0,l)}return e.$$set=i=>{"prompts"in i&&n(0,l=i.prompts),"fields"in i&&n(2,o=i.fields),"form"in i&&n(3,r=i.form),"enableAll"in i&&n(4,c=i.enableAll),"disableAll"in i&&n(5,a=i.disableAll)},[l,s,o,r,c,a,d]}class Ee extends K{constructor(t){super(),J(this,t,ke,we,U,{prompts:0,fields:2,form:3,enableAll:4,disableAll:5})}}function Nt(e,t,n){const l=e.slice();return l[7]=t[n],l}function qt(e){let t,n,l,o,r;function c(...s){return e[5](e[7],...s)}function a(...s){return e[6](e[7],...s)}return{c(){t=h("button"),n=w(),l=h("button"),m(t,"type","button"),m(t,"class","edit svelte-xbcoyz"),m(t,"data-icon","edit"),m(l,"type","button"),m(l,"class","delete svelte-xbcoyz"),m(l,"data-icon","trash")},m(s,u){G(s,t,u),G(s,n,u),G(s,l,u),o||(r=[M(t,"click",c),M(l,"click",a)],o=!0)},p(s,u){e=s},d(s){s&&(C(t),C(n),C(l)),o=!1,V(r)}}}function It(e){let t,n,l=e[7].name+"",o,r,c=e[0].canEditGroup(e[1]),a,s,u;function d(...p){return e[4](e[7],...p)}let i=c&&qt(e);return{c(){t=h("div"),n=h("button"),o=F(l),r=w(),i&&i.c(),a=w(),m(n,"type","button"),m(n,"class","svelte-xbcoyz"),m(t,"class","prompt svelte-xbcoyz")},m(p,b){G(p,t,b),f(t,n),f(n,o),f(t,r),i&&i.m(t,null),f(t,a),s||(u=M(n,"click",d),s=!0)},p(p,b){e=p,b&3&&l!==(l=e[7].name+"")&&H(o,l),b&3&&(c=e[0].canEditGroup(e[1])),c?i?i.p(e,b):(i=qt(e),i.c(),i.m(t,a)):i&&(i.d(1),i=null)},d(p){p&&C(t),i&&i.d(),s=!1,u()}}}function Dt(e){let t,n,l;return{c(){t=h("button"),t.textContent="+ New Prompt",m(t,"type","button"),m(t,"class","btn")},m(o,r){G(o,t,r),n||(l=M(t,"click",e[3]),n=!0)},p:j,d(o){o&&C(t),n=!1,l()}}}function Ce(e){let t,n,l,o,r,c=e[0].canEditGroup(e[1]),a=R(e[0].getByGroup(e[1])),s=[];for(let d=0;d<a.length;d+=1)s[d]=It(Nt(e,a,d));let u=c&&Dt(e);return{c(){t=h("div"),n=h("h5"),n.textContent="Select a prompt",l=w(),o=h("div");for(let d=0;d<s.length;d+=1)s[d].c();r=w(),u&&u.c(),m(o,"class","list svelte-xbcoyz"),m(t,"class","promptselector")},m(d,i){G(d,t,i),f(t,n),f(t,l),f(t,o);for(let p=0;p<s.length;p+=1)s[p]&&s[p].m(o,null);f(t,r),u&&u.m(t,null)},p(d,[i]){if(i&7){a=R(d[0].getByGroup(d[1]));let p;for(p=0;p<a.length;p+=1){const b=Nt(d,a,p);s[p]?s[p].p(b,i):(s[p]=It(b),s[p].c(),s[p].m(o,null))}for(;p<s.length;p+=1)s[p].d(1);s.length=a.length}i&3&&(c=d[0].canEditGroup(d[1])),c?u?u.p(d,i):(u=Dt(d),u.c(),u.m(t,null)):u&&(u.d(1),u=null)},i:j,o:j,d(d){d&&C(t),ot(s,d),u&&u.d()}}}function Pe(e,t,n){let{prompts:l}=t,{group:o}=t;const r=ct();function c(d){r("new")}const a=(d,i)=>r("select",{prompt:d}),s=(d,i)=>r("edit",{prompt:d}),u=(d,i)=>r("delete",{prompt:d});return e.$$set=d=>{"prompts"in d&&n(0,l=d.prompts),"group"in d&&n(1,o=d.group)},[l,o,r,c,a,s,u]}class Ge extends K{constructor(t){super(),J(this,t,Pe,Ce,U,{prompts:0,group:1})}}function Se(e){let t,n,l,o,r,c,a,s,u,d,i,p,b,P,T,S,I,N,O,A,v,k,E,y,L;return T=new Jt({}),{c(){t=h("div"),n=h("h5"),n.textContent="Edit or create a prompt",l=w(),o=h("form"),r=h("div"),c=h("div"),c.innerHTML='<label for="gpt-prompt-name">Name</label>',a=w(),s=h("div"),u=h("input"),d=w(),i=h("div"),p=h("div"),p.innerHTML='<label for="gpt-prompt-prompt">Prompt</label>',b=w(),P=h("div"),rt(T.$$.fragment),S=w(),I=h("div"),N=h("textarea"),O=w(),A=h("button"),A.textContent="Save",v=w(),k=h("button"),k.textContent="Cancel",m(n,"class","svelte-bl79w9"),m(c,"class","heading"),m(u,"id","gpt-prompt-name"),m(u,"type","text"),m(u,"class","text fullwidth"),m(u,"name","name"),u.required=!0,m(s,"class","input ltr"),m(r,"class","field"),m(p,"class","heading"),m(P,"class","instructions"),m(N,"id","gpt-prompt-prompt"),m(N,"name","prompt"),m(N,"class","text nicetext fullwidth"),m(N,"rows","5"),N.required=!0,m(I,"class","input ltr"),m(i,"class","field width-100"),m(A,"class","btn submit"),m(k,"type","button"),m(k,"class","btn"),m(t,"class","editprompt svelte-bl79w9")},m(g,_){G(g,t,_),f(t,n),f(t,l),f(t,o),f(o,r),f(r,c),f(r,a),f(r,s),f(s,u),B(u,e[0].name),f(o,d),f(o,i),f(i,p),f(i,b),f(i,P),$(T,P,null),f(i,S),f(i,I),f(I,N),B(N,e[0].prompt),f(o,O),f(o,A),f(o,v),f(o,k),E=!0,y||(L=[M(u,"input",e[4]),M(N,"input",e[5]),M(k,"click",e[6]),M(o,"submit",Ht(e[2]))],y=!0)},p(g,[_]){_&1&&u.value!==g[0].name&&B(u,g[0].name),_&1&&B(N,g[0].prompt)},i(g){E||(W(T.$$.fragment,g),E=!0)},o(g){X(T.$$.fragment,g),E=!1},d(g){g&&C(t),tt(T),y=!1,V(L)}}}function Ae(e,t,n){let{prompts:l}=t,{prompt:o}=t;const r=ct();async function c(d){try{const i=await l.save(o);r("save",{prompt:i})}catch(i){console.log("could not save prompt",i),alert("Could not save prompt")}}function a(){o.name=this.value,n(0,o)}function s(){o.prompt=this.value,n(0,o)}const u=d=>r("cancel");return e.$$set=d=>{"prompts"in d&&n(3,l=d.prompts),"prompt"in d&&n(0,o=d.prompt)},[o,r,c,l,a,s,u]}class Le extends K{constructor(t){super(),J(this,t,Ae,Se,U,{prompts:3,prompt:0})}}function Te(e){let t,n,l,o,r,c,a,s,u,d,i;return{c(){t=h("div"),n=h("p"),l=F(e[0]),o=w(),r=h("button"),r.textContent="Ok",c=w(),a=h("button"),a.textContent="Regenerate",s=w(),u=h("button"),u.textContent="Cancel",m(r,"type","button"),m(r,"class","btn submit"),m(a,"type","button"),m(a,"class","btn"),m(u,"type","button"),m(u,"class","btn"),m(t,"class","generated-text")},m(p,b){G(p,t,b),f(t,n),f(n,l),f(t,o),f(t,r),f(t,c),f(t,a),f(t,s),f(t,u),d||(i=[M(r,"click",e[2]),M(a,"click",e[3]),M(u,"click",e[4])],d=!0)},p(p,[b]){b&1&&H(l,p[0])},i:j,o:j,d(p){p&&C(t),d=!1,V(i)}}}function Ne(e,t,n){let{text:l}=t;const o=ct(),r=s=>o("accept"),c=s=>o("regenerate"),a=s=>o("cancel");return e.$$set=s=>{"text"in s&&n(0,l=s.text)},[l,o,r,c,a]}class qe extends K{constructor(t){super(),J(this,t,Ne,Te,U,{text:0})}}const{window:dt}=ee;function Ie(e){let t,n;return t=new Ge({props:{prompts:e[0],group:e[1].group}}),t.$on("new",e[10]),t.$on("select",e[11]),t.$on("edit",e[13]),t.$on("delete",e[14]),{c(){rt(t.$$.fragment)},m(l,o){$(t,l,o),n=!0},p(l,o){const r={};o&1&&(r.prompts=l[0]),o&2&&(r.group=l[1].group),t.$set(r)},i(l){n||(W(t.$$.fragment,l),n=!0)},o(l){X(t.$$.fragment,l),n=!1},d(l){tt(t,l)}}}function De(e){let t,n;return t=new Le({props:{prompts:e[0],prompt:e[3]}}),t.$on("save",e[12]),t.$on("cancel",e[18]),{c(){rt(t.$$.fragment)},m(l,o){$(t,l,o),n=!0},p(l,o){const r={};o&1&&(r.prompts=l[0]),o&8&&(r.prompt=l[3]),t.$set(r)},i(l){n||(W(t.$$.fragment,l),n=!0)},o(l){X(t.$$.fragment,l),n=!1},d(l){tt(t,l)}}}function Fe(e){let t;function n(r,c){return r[5]?Oe:je}let l=n(e),o=l(e);return{c(){o.c(),t=Bt()},m(r,c){o.m(r,c),G(r,t,c)},p(r,c){l===(l=n(r))&&o?o.p(r,c):(o.d(1),o=l(r),o&&(o.c(),o.m(t.parentNode,t)))},i:j,o:j,d(r){r&&C(t),o.d(r)}}}function Me(e){let t,n;return t=new qe({props:{text:e[6]}}),t.$on("accept",e[15]),t.$on("regenerate",e[16]),t.$on("cancel",e[17]),{c(){rt(t.$$.fragment)},m(l,o){$(t,l,o),n=!0},p(l,o){const r={};o&64&&(r.text=l[6]),t.$set(r)},i(l){n||(W(t.$$.fragment,l),n=!0)},o(l){X(t.$$.fragment,l),n=!1},d(l){tt(t,l)}}}function je(e){let t;return{c(){t=h("p"),t.textContent="Generating..."},m(n,l){G(n,t,l)},p:j,d(n){n&&C(t)}}}function Oe(e){let t,n;return{c(){t=h("p"),n=F(e[5])},m(l,o){G(l,t,o),f(t,n)},p(l,o){o&32&&H(n,l[5])},d(l){l&&C(t)}}}function Be(e){let t,n,l,o,r,c,a;const s=[Me,Fe,De,Ie],u=[];function d(i,p){return i[6]?0:i[4]?1:i[3]?2:3}return l=d(e),o=u[l]=s[l](e),{c(){t=h("div"),n=h("div"),o.c(),m(n,"class","gpt-popover svelte-hqfsef"),m(t,"class","gpt-popover-cont svelte-hqfsef")},m(i,p){G(i,t,p),f(t,n),u[l].m(n,null),e[19](t),r=!0,c||(a=[M(dt,"scroll",e[7]),M(dt,"resize",e[8]),M(dt,"click",e[9])],c=!0)},p(i,[p]){let b=l;l=d(i),l===b?u[l].p(i,p):(ie(),X(u[b],1,1,()=>{u[b]=null}),se(),o=u[l],o?o.p(i,p):(o=u[l]=s[l](i),o.c()),W(o,1),o.m(n,null))},i(i){r||(W(o),r=!0)},o(i){X(o),r=!1},d(i){i&&C(t),u[l].d(),e[19](null),c=!1,V(a)}}}function He(e,t,n){const l=ct();let{field:o}=t,{prompts:r}=t,c,a=null,s=null,u=null,d=null,i=null;function p(){const _=o.input.cont.getBoundingClientRect(),D=c.offsetHeight;_.top<D?(n(2,c.style.top=_.bottom+"px",c),n(2,c.style.bottom="auto",c)):(n(2,c.style.top="auto",c),n(2,c.style.bottom=window.innerHeight-_.top+"px",c)),n(2,c.style.right=window.innerWidth-_.right+"px",c),n(2,c.style.maxWidth=Math.min(800,o.input.cont.offsetWidth)+"px",c)}function b(){p()}function P(){p()}function T(_){Date.now()-a<100||c.contains(_.target)||!document.body.contains(_.target)||u||l("close")}async function S(_){n(3,s={name:"",prompt:"",group:o.group}),await yt(),p()}function I(_){const D=_.detail.prompt;E(D.prompt)}function N(_){_.detail.prompt,n(0,r),n(3,s=null)}async function O(_){n(3,s=_.detail.prompt),await yt(),p()}async function A(_){const D=_.detail.prompt;try{await r.del(D),n(0,r)}catch{console.log("failed to generate"),alert("could not delete prompt")}}function v(_){o.setValue(i),l("close")}function k(_){n(6,i=null),E(u,!1)}async function E(_,D=!0){var q;if(n(5,d=null),D){const z={field:{name:o.name(),label:o.label(),instructions:o.instructions(),value:o.value()}};(q=window==null?void 0:window.Craft)!=null&&q.siteId&&(z.siteId=Craft.siteId),n(4,u={prompt:_,ctx:z})}try{n(6,i=await r.execute(u.prompt,u.ctx))}catch(z){$t(z)?n(5,d=z.message):n(5,d="could not generate")}}gt(()=>{a=Date.now(),p()});const y=_=>{n(6,i=null),n(4,u=null)},L=_=>n(3,s=null);function g(_){pt[_?"unshift":"push"](()=>{c=_,n(2,c)})}return e.$$set=_=>{"field"in _&&n(1,o=_.field),"prompts"in _&&n(0,r=_.prompts)},[r,o,c,s,u,d,i,b,P,T,S,I,N,O,A,v,k,y,L,g]}class Re extends K{constructor(t){super(),J(this,t,He,Be,U,{field:1,prompts:0})}}class Ve{constructor(){this.prompts=null,this.actives=[],this.id=0}setPrompts(t){this.prompts=t}open(t){let n=!1;if(this.actives=this.actives.filter(r=>r.field.eq(t)?(r.comp.$destroy(),n=!0,!1):!0),n)return;const l=this.id++,o=new Re({target:document.body,props:{field:t,prompts:this.prompts}});o.$on("close",r=>{o.$destroy(),this.actives=this.actives.filter(c=>c.id!==l)}),this.actives.push({id:l,comp:o,field:t})}}class Kt{constructor(t){switch(this.fieldGen=t,this.contEl=t.parentNode.parentNode,this.group=t.dataset.group,this.input=null,this.labelEl=this.contEl.querySelector("label"),this.instructionsEl=this.contEl.querySelector(".instructions"),t.dataset.type){case"craft\\fields\\PlainText":this.input=new ze(t.parentNode);break;case"craft\\redactor\\Field":this.input=new We(t.parentNode);break;case"craft\\ckeditor\\Field":this.input=new Ue(t.parentNode);break;case"spicyweb\\tinymce\\fields\\TinyMCE":this.input=new Je(t.parentNode);break;default:console.log("unknown type: "+t.dataset.type)}}name(){return this.input.name()}label(){return this.labelEl?this.labelEl.innerText:""}instructions(){return this.instructionsEl?this.instructionsEl.innerText:""}value(){return this.input.value()}setValue(t){return this.input.setValue(t)}eq(t){return this.input.eq(t.input)}}class ut{constructor(t,n){this.type=t,this.cont=n}name(){throw new Error("could not get name of "+this.type)}value(){throw new Error("could not get value of "+this.type)}setValue(t){throw new Error("could not set value of "+this.type)}appendIcon(t){this.cont.appendChild(t)}eq(t){return this.type===t.type&&this.cont===t.cont}}class ze extends ut{constructor(t){super("plainText",t);const n=t.querySelector("input"),l=t.querySelector("textarea");this.el=n||l}name(){return this.el.name}value(){return this.el.value}setValue(t){this.el.value=t}appendIcon(t){this.el.nodeName.toLowerCase()==="input"&&t.classList.add("gpt-align-center"),this.cont.appendChild(t),this.el.style.paddingRight="30px"}}class We extends ut{constructor(t){super("redactor",t),this.el=t.querySelector("textarea")}name(){return this.el.name}value(){return this.el.value}setValue(t){$R(this.el,"source.setCode",t)}}class Ue extends ut{constructor(t){super("ckeditor",t),this.el=t.querySelector("textarea"),this.instance=this.cont.querySelector(".ck-editor__editable").ckeditorInstance}name(){return this.el.name}value(){return this.instance.getData()}setValue(t){this.instance.setData(t)}}class Je extends ut{constructor(t){super("tinymce",t),this.el=t.querySelector("textarea")}name(){return this.el.name}value(){return this.el.value}setValue(t){if(typeof window.tinymce>"u"){console.log("tinymce is not defined");return}window.tinymce.get(this.el.id).setContent(t)}}const Qt=new Ve;function Xt(e){const t=document.createElement("span");t.classList.add("gpt-click-icon"),t.innerText="ai",e.input.appendIcon(t),t.addEventListener("click",async n=>{Qt.open(e)})}function Ke(e,t){const n=document.createElement("div");return n.dataset.group=e,n.dataset.type=t,n}function Ft(e){const t=e.getFieldGroup("title");if(!t)return;const n=document.querySelectorAll("input[type=text]:not([data-gpt-scanned])");for(const l of n){if(l.setAttribute("data-gpt-scanned",""),l.name!=="title"&&!l.name.endsWith("[title]"))continue;const o=Ke(t,"craft\\fields\\PlainText");l.parentNode.appendChild(o);const r=new Kt(o);Xt(r)}}function Mt(){const e=document.querySelectorAll(".gpt-content-generator-field[data-not-scanned]");for(const t of e){t.removeAttribute("data-not-scanned");const n=new Kt(t);n.input&&Xt(n)}}function Qe(e){Qt.setPrompts(e),Ft(e),Mt(),document.addEventListener("click",t=>{setTimeout(()=>{Ft(e),Mt()},500)})}function Xe(e){const t=document.getElementById("prompts-list-table");if(!t)return;const n=new URL(t.dataset.url);new _e({target:t,props:{prompts:e,url:n.origin+n.pathname}})}function Ye(e){const t=document.getElementById("prompts-edit");if(!t)return;const n=document.getElementById("main-form");n.removeAttribute("novalidate");const l=new URL(t.dataset.url);new ye({target:t,props:{prompts:e,form:n,id:t.dataset.id,url:l.origin+l.pathname}})}async function Ze(e){const t=document.getElementById("gpt-fields-list");if(!t)return;const n=await _t.load(),l=document.getElementById("main-form");l.removeAttribute("novalidate");const o=document.getElementById("enable-all"),r=document.getElementById("disable-all");new Ee({target:t,props:{prompts:e,fields:n,form:l,enableAll:o,disableAll:r}})}async function xe(){const e=await ht.load();Xe(e),Ye(e),Ze(e),Qe(e)}xe();
//# sourceMappingURL=main-4d8c86b7.js.map