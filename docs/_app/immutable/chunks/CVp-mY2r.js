var q=Object.defineProperty;var B=(t,e,n)=>e in t?q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>B(t,typeof e!="symbol"?e+"":e,n);function M(){}const at=t=>t;function R(t,e){for(const n in e)t[n]=e[n];return t}function F(t){return t()}function ut(){return Object.create(null)}function G(t){t.forEach(F)}function I(t){return typeof t=="function"}function ft(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let p;function _t(t,e){return t===e?!0:(p||(p=document.createElement("a")),p.href=e,t===p.href)}function ht(t){return Object.keys(t).length===0}function j(t,...e){if(t==null){for(const i of e)i(void 0);return M}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function dt(t){let e;return j(t,n=>e=n)(),e}function mt(t,e,n){t.$$.on_destroy.push(j(e,n))}function pt(t,e,n,i){if(t){const s=H(t,e,n,i);return t[0](s)}}function H(t,e,n,i){return t[1]&&i?R(n.ctx.slice(),t[1](i(e))):n.ctx}function yt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const l=[],r=Math.max(e.dirty.length,s.length);for(let o=0;o<r;o+=1)l[o]=e.dirty[o]|s[o];return l}return e.dirty|s}return e.dirty}function gt(t,e,n,i,s,l){if(s){const r=H(e,n,i,l);t.p(r,s)}}function bt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function xt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Et(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function wt(t){const e={};for(const n in t)e[n]=!0;return e}function vt(t){return t&&I(t.destroy)?t.destroy:M}function Nt(t){const e=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}let g=!1;function Tt(){g=!0}function kt(){g=!1}function z(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function U(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let a=0;a<e.length;a++){const u=e[a];u.claim_order!==void 0&&c.push(u)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let c=0;c<e.length;c++){const a=e[c].claim_order,u=(s>0&&e[n[s]].claim_order<=a?s+1:z(1,s,O=>e[n[O]].claim_order,a))-1;i[c]=n[u]+1;const A=u+1;n[A]=c,s=Math.max(A,s)}const l=[],r=[];let o=e.length-1;for(let c=n[s]+1;c!=0;c=i[c-1]){for(l.push(e[c-1]);o>=c;o--)r.push(e[o]);o--}for(;o>=0;o--)r.push(e[o]);l.reverse(),r.sort((c,a)=>c.claim_order-a.claim_order);for(let c=0,a=0;c<r.length;c++){for(;a<l.length&&r[c].claim_order>=l[a].claim_order;)a++;const u=a<l.length?l[a]:null;t.insertBefore(r[c],u)}}function W(t,e){t.appendChild(e)}function J(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function At(t){const e=T("style");return e.textContent="/* empty */",K(J(t),e),e.sheet}function K(t,e){return W(t.head||t,e),e.sheet}function Q(t,e){if(g){for(U(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function V(t,e,n){t.insertBefore(e,n||null)}function X(t,e,n){g&&!n?Q(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function w(t){t.parentNode&&t.parentNode.removeChild(t)}function Ct(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function T(t){return document.createElement(t)}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function k(t){return document.createTextNode(t)}function Lt(){return k(" ")}function Mt(){return k("")}function jt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Z(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const $=["width","height"];function Ht(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&$.indexOf(i)===-1?t[i]=e[i]:Z(t,i,e[i])}function Pt(t){return t.dataset.svelteH}function St(t){let e;return{p(...n){e=n,e.forEach(i=>t.push(i))},r(){e.forEach(n=>t.splice(t.indexOf(n),1))}}}function Dt(t){return Array.from(t.childNodes)}function P(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function S(t,e,n,i,s=!1){P(t);const l=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const o=t[r];if(e(o)){const c=n(o);return c===void 0?t.splice(r,1):t[r]=c,s||(t.claim_info.last_index=r),o}}for(let r=t.claim_info.last_index-1;r>=0;r--){const o=t[r];if(e(o)){const c=n(o);return c===void 0?t.splice(r,1):t[r]=c,s?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,o}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function tt(t,e,n,i){return S(t,s=>s.nodeName===e,s=>{const l=[];for(let r=0;r<s.attributes.length;r++){const o=s.attributes[r];n[o.name]||l.push(o.name)}l.forEach(r=>s.removeAttribute(r))},()=>i(e))}function Ot(t,e,n){return tt(t,e,n,T)}function et(t,e){return S(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>k(e),!0)}function qt(t){return et(t," ")}function C(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return-1}function Bt(t,e){const n=C(t,"HTML_TAG_START",0),i=C(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new b(e);P(t);const s=t.splice(n,i-n+1);w(s[0]),w(s[s.length-1]);const l=s.slice(1,s.length-1);if(l.length===0)return new b(e);for(const r of l)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new b(e,l)}function Rt(t,e){e=""+e,t.data!==e&&(t.data=e)}function Ft(t,e){t.value=e??""}function Gt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,"")}function It(t,e,n){t.classList.toggle(e,!!n)}function nt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}class it{constructor(e=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=Y(n.nodeName):this.e=T(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)V(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(w)}}class b extends it{constructor(n=!1,i){super(n);f(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)X(this.t,this.n[i],n)}}function zt(t,e){return new t(e)}let y;function x(t){y=t}function d(){if(!y)throw new Error("Function called outside component initialization");return y}function Ut(t){d().$$.on_mount.push(t)}function Wt(t){d().$$.after_update.push(t)}function Jt(t){d().$$.on_destroy.push(t)}function Kt(){const t=d();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const l=nt(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,l)}),!l.defaultPrevented}return!0}}function Qt(t,e){return d().$$.context.set(t,e),e}function Vt(t){return d().$$.context.get(t)}function Xt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const m=[],L=[];let h=[];const v=[],D=Promise.resolve();let N=!1;function st(){N||(N=!0,D.then(ct))}function Yt(){return st(),D}function rt(t){h.push(t)}function Zt(t){v.push(t)}const E=new Set;let _=0;function ct(){if(_!==0)return;const t=y;do{try{for(;_<m.length;){const e=m[_];_++,x(e),lt(e.$$)}}catch(e){throw m.length=0,_=0,e}for(x(null),m.length=0,_=0;L.length;)L.pop()();for(let e=0;e<h.length;e+=1){const n=h[e];E.has(n)||(E.add(n),n())}h.length=0}while(m.length);for(;v.length;)v.pop()();N=!1,E.clear(),x(t)}function lt(t){if(t.fragment!==null){t.update(),G(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(rt)}}function $t(t){const e=[],n=[];h.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),h=e}export{xt as $,At as A,G as B,I as C,rt as D,nt as E,at as F,x as G,ut as H,ct as I,ht as J,$t as K,y as L,F as M,m as N,st as O,Tt as P,kt as Q,Qt as R,Vt as S,dt as T,Nt as U,pt as V,gt as W,bt as X,yt as Y,wt as Z,R as _,Lt as a,St as a0,Ht as a1,Et as a2,Xt as a3,It as a4,Kt as a5,vt as a6,b as a7,Bt as a8,_t as a9,Pt as aa,Zt as ab,Ct as ac,Dt as b,Ot as c,et as d,T as e,w as f,qt as g,Q as h,X as i,Rt as j,mt as k,Mt as l,Wt as m,M as n,Ut as o,Z as p,Gt as q,Yt as r,ft as s,k as t,L as u,zt as v,Ft as w,jt as x,Jt as y,J as z};
