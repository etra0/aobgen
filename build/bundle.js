var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function a(t){t.parentNode.removeChild(t)}function i(t){return document.createElement(t)}function l(t){return document.createTextNode(t)}function u(){return l(" ")}function d(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function h(t,e){t.value=null==e?"":e}let p;function g(t){p=t}const m=[],b=[],$=[],y=[],x=Promise.resolve();let v=!1;function w(){v||(v=!0,x.then(B))}function _(t){$.push(t)}const k=new Set;let C=0;function B(){const t=p;do{for(;C<m.length;){const t=m[C];C++,g(t),E(t.$$)}for(g(null),m.length=0,C=0;b.length;)b.pop()();for(let t=0;t<$.length;t+=1){const e=$[t];k.has(e)||(k.add(e),e())}$.length=0}while(m.length);for(;y.length;)y.pop()();v=!1,k.clear(),g(t)}function E(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(_)}}const A=new Set;function O(s,c,i,l,u,d,f,h=[-1]){const b=p;g(s);const $=s.$$={fragment:null,ctx:null,props:d,update:t,not_equal:u,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(c.context||(b?b.$$.context:[])),callbacks:n(),dirty:h,skip_bound:!1,root:c.target||b.$$.root};f&&f($.root);let y=!1;if($.ctx=i?i(s,c.props||{},((t,e,...n)=>{const o=n.length?n[0]:e;return $.ctx&&u($.ctx[t],$.ctx[t]=o)&&(!$.skip_bound&&$.bound[t]&&$.bound[t](o),y&&function(t,e){-1===t.$$.dirty[0]&&(m.push(t),w(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(s,t)),e})):[],$.update(),y=!0,o($.before_update),$.fragment=!!l&&l($.ctx),c.target){if(c.hydrate){const t=function(t){return Array.from(t.childNodes)}(c.target);$.fragment&&$.fragment.l(t),t.forEach(a)}else $.fragment&&$.fragment.c();c.intro&&((x=s.$$.fragment)&&x.i&&(A.delete(x),x.i(v))),function(t,n,s,c){const{fragment:a,on_mount:i,on_destroy:l,after_update:u}=t.$$;a&&a.m(n,s),c||_((()=>{const n=i.map(e).filter(r);l?l.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(_)}(s,c.target,c.anchor,c.customElement),B()}var x,v;g(b)}class L{generateAob(t,e){const n=/^[/\w].*?\.exe/gim;let o=t.split(/[\r\n]/).map((t=>t.toLowerCase().replace(n,"")));return 0==o.length?"":o[0].includes("|")?this.handleX64Dbg(o,e):(r=o[0].split(""),s="-",r.reduce(((t,e)=>t+(e==s?1:0)),0)>1?this.handleCheatEngine(o,e):"<Unknown Format>");var r,s}handleX64Dbg(t,e){let n="";for(const o of t){let t=o.split("|");t.length<3||(t[1]=t[1].replace(":"," "),n+=this.handleByteFragments(t[1],t[2],e))}return n.trim().toUpperCase()}handleCheatEngine(t,e){let n="";for(const o of t){const t=o.indexOf("-");if(t<0)continue;const r=o.indexOf("-",t+1);if(r<0)continue;const s=o.substring(t+1,r-1).trim(),c=o.substring(r+1).trim().toLowerCase();n+=this.handleByteFragments(s,c,e)}return n.trim().toUpperCase()}handleByteFragments(t,e,n){const o=t.split(" ");let r="",s=!1;for(let t=0;t<o.length;t++){const c=o[t];switch(c.length){case 2:!s&&n&&t==o.length-1&&e.includes("+"+c)?(r+="?? ",s=!0):r+=L.pureBytes(c);break;case 4:case 6:r+=L.pureBytes(c);break;case 8:!s&&this.shouldWildcard(c.toLowerCase(),e,n)?(r+="?? ?? ?? ?? ",s=!0):r+=L.pureBytes(c);break;default:continue}}return r}shouldWildcard(t,e,n){const o=""+t[6]+t[7]+t[4]+t[5]+t[2]+t[3]+t[0]+t[1],r=Number.parseInt(o,16).toString(16),s=e.includes(r)||e.includes(o);return!(!n||!s)||!e.includes(r)&&!e.includes(o)}static pureBytes(t){let e="";for(let n=0;n<t.length;n+=2)e+=t[n]+t[n+1]+" ";return e}}function T(e){let n,r,s,p,g,m,b,$,y,x,v,w,_,k,C,B,E,A,O,L,T,F,j=(e[2]||e[4])+"";return{c(){n=i("main"),r=i("p"),r.innerHTML="AOB generator tool. Paste your x64dbg or Cheat Engine disassembly to generate an AOB.<br/>\n\t\tYou can also select a portion of the disassembly to generate that specific AOB.",s=u(),p=i("p"),p.innerHTML='This project is <bold>heavily</bold> based off <a href="https://github.com/FransBouma/InjectableGenericCameraSystem/tree/master/Tools/AOBGen">Frans&#39;s work</a>',g=u(),m=i("textarea"),b=u(),$=i("div"),y=i("label"),y.textContent="Wildcard offsets:",x=u(),v=i("input"),w=u(),_=i("p"),k=l("AOB: "),C=i("code"),B=l(j),E=u(),A=i("button"),A.textContent="Copy to clipboard",O=u(),L=i("p"),L.textContent="Current version: 8b404d27994ecabb4a8d2af2dcd1b124b703676c",f(m,"placeholder","Enter the disassembly"),f(m,"rows","20"),f(y,"for","wildcard"),f(v,"name","wildcard"),f(v,"type","checkbox"),f(v,"class","svelte-1xc3ygq"),f($,"class","info svelte-1xc3ygq"),f(n,"class","svelte-1xc3ygq")},m(t,o){!function(t,e,n){t.insertBefore(e,n||null)}(t,n,o),c(n,r),c(n,s),c(n,p),c(n,g),c(n,m),h(m,e[0]),e[8](m),c(n,b),c(n,$),c($,y),c($,x),c($,v),v.checked=e[1],c(n,w),c(n,_),c(_,k),c(_,C),c(C,B),c(n,E),c(n,A),c(n,O),c(n,L),T||(F=[d(m,"input",e[6]),d(m,"mouseup",e[7]),d(v,"change",e[9]),d(v,"change",e[10]),d(A,"click",e[11])],T=!0)},p(t,[e]){1&e&&h(m,t[0]),2&e&&(v.checked=t[1]),20&e&&j!==(j=(t[2]||t[4])+"")&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(B,j)},i:t,o:t,d(t){t&&a(n),e[8](null),T=!1,o(F)}}}function F(t,e,n){let o,r,s=new L,c="",a=!1,i="";async function l(t,e,o){const{selectionStart:r,selectionEnd:c,value:a}=t,l=a.slice(r,c);""!==l?(n(2,i=s.generateAob(l,o)),await(w(),x)):n(2,i="")}return t.$$.update=()=>{3&t.$$.dirty&&n(4,o=s.generateAob(c,a))},[c,a,i,r,o,l,function(){c=this.value,n(0,c)},t=>l(r,0,a),function(t){b[t?"unshift":"push"]((()=>{r=t,n(3,r)}))},function(){a=this.checked,n(1,a)},()=>l(r,0,a),()=>navigator.clipboard.writeText(i||o)]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),O(this,t,F,T,s,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
