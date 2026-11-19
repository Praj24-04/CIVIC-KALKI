const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-BVvgsMk_.js","assets/browser-CIZFGh__.js","assets/index-CB9BIZx8.js"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=s(r);fetch(r.href,c)}})();const $c="modulepreload",zc=function(i){return"/"+i},So={},Ci=function(n,s,o){let r=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),u=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));r=Promise.allSettled(s.map(h=>{if(h=zc(h),h in So)return;So[h]=!0;const m=h.endsWith(".css"),g=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${g}`))return;const v=document.createElement("link");if(v.rel=m?"stylesheet":$c,m||(v.as="script"),v.crossOrigin="",v.href=h,u&&v.setAttribute("nonce",u),document.head.appendChild(v),m)return new Promise((b,w)=>{v.addEventListener("load",b),v.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${h}`)))})}))}function c(d){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=d,window.dispatchEvent(u),!u.defaultPrevented)throw d}return r.then(d=>{for(const u of d||[])u.status==="rejected"&&c(u.reason);return n().catch(c)})},ir=[];let nr=()=>{};function _e(i,n){ir.push({path:i,handler:n})}function ar(i){nr=i}function Lc(i){const n=[...ir].sort((s,o)=>{const r=s.path.includes(":"),c=o.path.includes(":");return!r&&c?-1:r&&!c?1:0});for(const s of n){const o=[],r=s.path.replace(/:([^/]+)/g,(u,h)=>(o.push(h),"([^/]+)")).replace(/\//g,"\\/"),c=new RegExp(`^${r}$`),d=i.match(c);if(d){const u={};return o.forEach((h,m)=>{u[h]=decodeURIComponent(d[m+1])}),{handler:s.handler,params:u,path:s.path}}}return null}function ne(i){window.history.pushState({},"",i),Ka(window.location.href)}function Ka(i=window.location.href){const n=new URL(i,window.location.origin);let s=n.pathname;s.length>1&&s.endsWith("/")&&(s=s.slice(0,-1));const o=Lc(s);if(o){const r=o.handler(o.params,n.searchParams);r&&typeof r.then=="function"&&r.then(()=>{window.dispatchEvent(new CustomEvent("civic:route-rendered",{detail:{pathname:s,async:!0}}))}).catch(c=>{console.error("[Router Error]:",c)})}else nr();window.dispatchEvent(new CustomEvent("civic:route-rendered",{detail:{pathname:s}}))}function sr(){window.navigate=ne,window.addEventListener("popstate",()=>Ka(window.location.href));const i=document.getElementById("app");i&&i.addEventListener("click",n=>{const s=n.target.closest("a[href]");if(!s)return;const o=s.getAttribute("href");!o||o.startsWith("http")||o.startsWith("mailto:")||o.startsWith("#")||(n.preventDefault(),ne(o))}),Ka(window.location.href)}const Ec=Object.freeze(Object.defineProperty({__proto__:null,addRoute:_e,initRouter:sr,navigate:ne,onNotFound:ar},Symbol.toStringTag,{value:"Module"}));let Qe=null,ht=null,ai=null,Zi=null;async function or(){try{const i=await fetch("/api/auth/me",{credentials:"include",headers:{"X-Requested-With":"ck-web"}});if(!i.ok)return Qe=null,ht=null,null;const n=await i.json();return n.success&&n.data?(Qe=n.data.user||null,ht=n.data.expires_at||null,rr(),Qe):(Qe=null,ht=null,null)}catch{return Qe=null,ht=null,null}}function rr(){if(ai&&clearTimeout(ai),!ht)return;const i=new Date(ht).getTime()-Date.now();i>0&&(ai=setTimeout(()=>{Qe=null,ht=null,ai=null},i))}async function Cc(){return Zi||(Zi=or().finally(()=>{Zi=null}),Zi)}function He(){return Qe}function Gn(){return(Qe==null?void 0:Qe.role)||null}function Kn(){return Qe?ht?new Date(ht).getTime()>Date.now():!0:!1}function lr(i){i&&(Qe=i.user||(i.user_id?i:null),ht=i.expires_at||null,rr())}function rs(){Qe=null,ht=null,ai&&(clearTimeout(ai),ai=null)}async function Sc(){return or()}function ri(){const i=He();return!i||i.role==="citizen"}function kt(i){return Kn()?!0:(i("/login"),!1)}function ls(i,n){if(!kt(n))return!1;const s=Gn();return i.includes(s)?!0:(n("/dashboard"),!1)}const Tc={citizen:"Citizen",coordinator_area:"Area Coordinator",coordinator_general:"General Coordinator",director:"Director",admin:"Administrator"};function Ki(i){return Tc[i]||i}const Ya=[{code:"en",name:"English",nativeName:"English",region:"Pan-India / Official",popular:!0},{code:"hi",name:"Hindi",nativeName:"हिन्दी",region:"North & Central India",popular:!0},{code:"mr",name:"Marathi",nativeName:"मराठी",region:"Maharashtra",popular:!0},{code:"ta",name:"Tamil",nativeName:"தமிழ்",region:"Tamil Nadu & Puducherry",popular:!0},{code:"te",name:"Telugu",nativeName:"తెలుగు",region:"Andhra Pradesh & Telangana",popular:!0},{code:"bn",name:"Bengali",nativeName:"বাংলা",region:"West Bengal & Tripura",popular:!0},{code:"gu",name:"Gujarati",nativeName:"ગુજરાતી",region:"Gujarat",popular:!0},{code:"kn",name:"Kannada",nativeName:"ಕನ್ನಡ",region:"Karnataka",popular:!0},{code:"ml",name:"Malayalam",nativeName:"മലയാളം",region:"Kerala & Lakshadweep",popular:!0},{code:"pa",name:"Punjabi",nativeName:"ਪੰਜਾਬੀ",region:"Punjab",popular:!0},{code:"ur",name:"Urdu",nativeName:"اردو",region:"Pan-India",popular:!0},{code:"as",name:"Assamese",nativeName:"অসমীয়া",region:"Assam"},{code:"bho",name:"Bhojpuri",nativeName:"भोजपुरी",region:"Bihar & Uttar Pradesh"},{code:"doi",name:"Dogri",nativeName:"डोगरी",region:"Jammu & Kashmir"},{code:"gom",name:"Konkani",nativeName:"कोंकणी",region:"Goa & Konkan"},{code:"mai",name:"Maithili",nativeName:"मैथिली",region:"Bihar & Jharkhand"},{code:"mni-Mtei",name:"Meiteilon (Manipuri)",nativeName:"ꯃꯤꯇꯩꯂꯣꯟ",region:"Manipur"},{code:"lus",name:"Mizo",nativeName:"Mizo ṭawng",region:"Mizoram"},{code:"ne",name:"Nepali",nativeName:"नेपाली",region:"Sikkim & West Bengal"},{code:"or",name:"Odia",nativeName:"ଓଡ଼ିଆ",region:"Odisha"},{code:"sa",name:"Sanskrit",nativeName:"संस्कृतम्",region:"Classical Language"},{code:"sd",name:"Sindhi",nativeName:"سنڌي",region:"Sindhi"}],cr="civic_kalki_lang";function Vt(){return localStorage.getItem(cr)||"en"}function dr(i){return Ya.find(n=>n.code.toLowerCase()===(i||"").toLowerCase())||{code:i||"en",name:"English",nativeName:"English",region:"Official"}}function ur(i){try{const n=localStorage.getItem(`civic_trans_${i}`);return n?JSON.parse(n):{}}catch{return{}}}function Mc(i,n){try{const o={...ur(i),...n};localStorage.setItem(`civic_trans_${i}`,JSON.stringify(o))}catch{}}function pr(){["googtrans","googtrans_opt","__googtrans"].forEach(n=>{document.cookie=`${n}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`,window.location.hostname&&(document.cookie=`${n}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`,document.cookie=`${n}=; path=/; domain=.${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`)}),document.querySelectorAll(".goog-te-banner-frame, iframe.goog-te-banner-frame, #google_translate_element, #goog-gt-tt, .goog-te-balloon-frame").forEach(n=>{try{n.remove()}catch{}}),document.body&&(document.body.style.top="0px",document.body.style.position="static")}function Ac(i){const n=[],s=[],o=[],r=new Set,c=document.createTreeWalker(i,NodeFilter.SHOW_TEXT,{acceptNode(d){if(!d.nodeValue)return NodeFilter.FILTER_REJECT;const u=d.parentElement;if(!u)return NodeFilter.FILTER_REJECT;const h=u.tagName.toLowerCase();if(["script","style","code","pre","textarea"].includes(h)||u.closest(".notranslate, .lang-dropdown-container, .lang-dropdown-menu"))return NodeFilter.FILTER_REJECT;const m=(d._civicOriginal!==void 0?d._civicOriginal:d.nodeValue).trim();return!m||/^[\d\s\-_.,/\\:;!@#$%^&*()=+~`|<>?"'’]+$/.test(m)||/^#?[A-Za-z]{1,5}-\d+$/.test(m)||/^#\d+$/.test(m)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});for(;c.nextNode();){const d=c.currentNode;d._civicOriginal===void 0&&(d._civicOriginal=d.nodeValue);const u=d._civicOriginal.trim();u&&(n.push({node:d,original:u}),r.add(u))}return i.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(d=>{if(d.closest(".notranslate, .lang-dropdown-container, .lang-dropdown-menu"))return;d._civicOriginalPlaceholder===void 0&&(d._civicOriginalPlaceholder=d.placeholder);const u=(d._civicOriginalPlaceholder||"").trim();u&&!/^[\d\s]+$/.test(u)&&(s.push({element:d,original:u}),r.add(u))}),i.querySelectorAll("[title]").forEach(d=>{if(d.closest(".notranslate, .lang-dropdown-container, .lang-dropdown-menu"))return;d._civicOriginalTitle===void 0&&(d._civicOriginalTitle=d.title);const u=(d._civicOriginalTitle||"").trim();u&&!/^[\d\s]+$/.test(u)&&(o.push({element:d,original:u}),r.add(u))}),{textItems:n,placeholderItems:s,titleItems:o,uniqueStrings:Array.from(r)}}function Ic(i=document.getElementById("app")){if(!i)return;const n=document.createTreeWalker(i,NodeFilter.SHOW_TEXT,null);for(;n.nextNode();){const s=n.currentNode;s._civicOriginal!==void 0&&(s.nodeValue=s._civicOriginal)}i.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(s=>{s._civicOriginalPlaceholder!==void 0&&(s.placeholder=s._civicOriginalPlaceholder)}),i.querySelectorAll("[title]").forEach(s=>{s._civicOriginalTitle!==void 0&&(s.title=s._civicOriginalTitle)})}let Ba=!1,Ra=!1,Ja=!1;async function Li(i){const n=i||Vt(),s=document.getElementById("app")||document.body;if(!s)return;if(n==="en"){Ic(s);return}const{textItems:o,placeholderItems:r,titleItems:c,uniqueStrings:d}=Ac(s);if(d.length===0)return;const u=ur(n),h=[],m=()=>{Ja=!0;try{o.forEach(({node:g,original:v})=>{if(u[v])if(g._civicOriginal&&g._civicOriginal.trim()===v){const b=g._civicOriginal.match(/^\s*/)[0],w=g._civicOriginal.match(/\s*$/)[0];g.nodeValue=b+u[v]+w}else g._civicOriginal&&(g.nodeValue=g._civicOriginal.replace(v,u[v]))}),r.forEach(({element:g,original:v})=>{u[v]&&(g.placeholder=u[v])}),c.forEach(({element:g,original:v})=>{u[v]&&(g.title=u[v])})}finally{setTimeout(()=>{Ja=!1},40)}};if(m(),d.forEach(g=>{u[g]||h.push(g)}),h.length!==0){if(Ba){Ra=!0;return}Ba=!0;try{const g=h.filter(v=>v.length<=2e3);for(let v=0;v<g.length;v+=100){const b=await fetch("/api/translate",{method:"POST",headers:{"Content-Type":"application/json","X-Requested-With":"ck-web"},body:JSON.stringify({texts:g.slice(v,v+100),targetLang:n})});if(!b.ok)break;const w=await b.json();w&&w.translations&&(Mc(n,w.translations),Object.assign(u,w.translations),m())}}catch(g){console.error("[Translation Service Error]:",g)}finally{Ba=!1,Ra&&(Ra=!1,setTimeout(()=>{Li(n)},50))}}}function To(i){const n=(i||"en").trim();localStorage.setItem(cr,n),pr(),Pc(n),Li(n)}function Yn(i={}){const n=i.idPrefix||"topbar",s=Vt(),o=dr(s),r=Ya.filter(c=>c.popular);return`
    <div class="lang-dropdown-container notranslate" id="${n}-lang-container">
      <button 
        type="button" 
        class="lang-trigger-btn" 
        id="${n}-lang-btn" 
        aria-haspopup="true" 
        aria-expanded="false" 
        title="Choose language (Indian Regional & Official Languages)"
      >
        <span class="lang-globe-icon" aria-hidden="true">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke-width="1.8"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
          </svg>
        </span>
        <span class="lang-btn-label truncate" id="${n}-lang-label">
          ${at(o.nativeName||o.name)}
        </span>
        <span class="lang-badge">${at(s.toUpperCase().slice(0,5))}</span>
        <svg class="lang-chevron" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <!-- Dropdown Card -->
      <div class="lang-dropdown-menu" id="${n}-lang-dropdown">
        <div class="lang-dropdown-header">
          <div class="lang-header-title">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span>Choose Language (भारतीय भाषाएं)</span>
          </div>
          <span class="lang-count-badge">🇮🇳 Indian Languages</span>
        </div>

        <!-- Search Bar with region search -->
        <div class="lang-search-box">
          <svg class="lang-search-icon" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input 
            type="text" 
            class="lang-search-input" 
            id="${n}-lang-search" 
            placeholder="Search language or state (e.g. Hindi, Marathi, Tamil)..." 
            autocomplete="off"
            spellcheck="false"
          />
          <button type="button" class="lang-search-clear hidden" id="${n}-lang-clear" aria-label="Clear search">✕</button>
        </div>

        <!-- Quick Select Chips for Major Indian Languages -->
        <div class="lang-quick-section" id="${n}-lang-popular-section">
          <div class="lang-section-label">Most Common</div>
          <div class="lang-chips-grid">
            ${r.map(c=>`
              <button 
                type="button" 
                class="lang-chip ${c.code===s?"active":""}" 
                data-lang="${c.code}"
                title="${at(c.name)} (${at(c.region)})"
              >
                ${at(c.nativeName)}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="lang-section-label" style="padding: 6px 14px 2px;">Official & Regional Languages</div>

        <!-- Full Scrollable List -->
        <div class="lang-options-scroll" id="${n}-lang-list">
          ${Ya.map(c=>{const d=c.code===s;return`
              <div 
                class="lang-option-row ${d?"selected":""}" 
                data-lang="${c.code}" 
                data-name="${at(c.name.toLowerCase())}" 
                data-native="${at(c.nativeName.toLowerCase())}"
                data-region="${at((c.region||"").toLowerCase())}"
                role="button"
                tabindex="0"
              >
                <div class="lang-names-wrap">
                  <span class="lang-native-name">${at(c.nativeName)}</span>
                  <span class="lang-english-name">${at(c.name)} • <span style="opacity:0.75;">${at(c.region)}</span></span>
                </div>
                <div class="lang-code-pill">${at(c.code)}</div>
                ${d?`
                  <svg class="lang-check-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                `:""}
              </div>
            `}).join("")}
        </div>

        <!-- Footer / Reset -->
        <div class="lang-dropdown-footer">
          <button type="button" class="lang-reset-btn" id="${n}-lang-reset">
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset to English (Default)
          </button>
        </div>
      </div>
    </div>
  `}function Jn(i="topbar"){const n=document.getElementById(`${i}-lang-container`),s=document.getElementById(`${i}-lang-btn`),o=document.getElementById(`${i}-lang-dropdown`),r=document.getElementById(`${i}-lang-search`),c=document.getElementById(`${i}-lang-clear`),d=document.getElementById(`${i}-lang-list`),u=document.getElementById(`${i}-lang-reset`),h=document.getElementById(`${i}-lang-popular-section`);if(!(!n||!s||!o)){if(s.addEventListener("click",m=>{m.stopPropagation();const g=o.classList.contains("show");document.querySelectorAll(".lang-dropdown-menu.show").forEach(v=>{v!==o&&v.classList.remove("show")}),o.classList.toggle("show",!g),s.setAttribute("aria-expanded",String(!g)),!g&&r&&setTimeout(()=>r.focus(),50)}),o.addEventListener("click",m=>{m.stopPropagation();const g=m.target.closest("[data-lang]");if(g){const v=g.getAttribute("data-lang");v&&(o.classList.remove("show"),s.setAttribute("aria-expanded","false"),To(v))}}),r&&d){const m=Array.from(d.querySelectorAll(".lang-option-row")),g=()=>{const v=(r.value||"").trim().toLowerCase();c==null||c.classList.toggle("hidden",v.length===0),h&&(h.style.display=v.length>0?"none":"block");let b=0;m.forEach($=>{const x=$.getAttribute("data-name")||"",T=$.getAttribute("data-native")||"",E=$.getAttribute("data-region")||"",_=($.getAttribute("data-lang")||"").toLowerCase(),P=!v||x.includes(v)||T.includes(v)||E.includes(v)||_.includes(v);$.style.display=P?"flex":"none",P&&b++});let w=d.querySelector(".lang-no-match");b===0?(w||(w=document.createElement("div"),w.className="lang-no-match",w.textContent="No Indian language found matching your search",d.appendChild(w)),w.style.display="block"):w&&(w.style.display="none")};r.addEventListener("input",g),c&&c.addEventListener("click",v=>{v.stopPropagation(),r.value="",g(),r.focus()})}u&&u.addEventListener("click",m=>{m.stopPropagation(),o.classList.remove("show"),s.setAttribute("aria-expanded","false"),To("en")}),document.addEventListener("click",m=>{n.contains(m.target)||(o.classList.remove("show"),s.setAttribute("aria-expanded","false"))}),document.addEventListener("keydown",m=>{m.key==="Escape"&&o.classList.contains("show")&&(o.classList.remove("show"),s.setAttribute("aria-expanded","false"),s.focus())})}}function Pc(i){const n=dr(i);document.querySelectorAll(".lang-btn-label").forEach(s=>{s.textContent=n.nativeName||n.name}),document.querySelectorAll(".lang-badge").forEach(s=>{s.textContent=(i||"EN").toUpperCase().slice(0,5)}),document.querySelectorAll(".lang-chip").forEach(s=>{const o=s.getAttribute("data-lang")===i;s.classList.toggle("active",o)}),document.querySelectorAll(".lang-option-row").forEach(s=>{const o=s.getAttribute("data-lang")===i;s.classList.toggle("selected",o);let r=s.querySelector(".lang-check-icon");if(o&&!r){const c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.setAttribute("class","lang-check-icon"),c.setAttribute("width","16"),c.setAttribute("height","16"),c.setAttribute("fill","none"),c.setAttribute("stroke","currentColor"),c.setAttribute("viewBox","0 0 24 24"),c.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>',s.appendChild(c)}else!o&&r&&r.remove()})}let Oa=null,ja=null;function Bc(){if(Oa)return;const i=document.getElementById("app")||document.body;i&&(Oa=new MutationObserver(n=>{if(Ja)return;const s=Vt();if(s==="en")return;let o=!1;for(const r of n){if(r.type==="childList"&&r.addedNodes.length>0){for(const c of r.addedNodes)if(c.nodeType===Node.ELEMENT_NODE){if(c.closest&&c.closest(".notranslate, .lang-dropdown-menu, .lang-dropdown-container"))continue;o=!0;break}}if(o)break}o&&(ja&&clearTimeout(ja),ja=setTimeout(()=>{Li(s)},70))}),Oa.observe(i,{childList:!0,subtree:!0}))}function Rc(){pr(),window.civicTranslatePage=n=>Li(n||Vt()),Bc();const i=Vt();i!=="en"&&setTimeout(()=>{Li(i)},100),window.addEventListener("civic:route-rendered",()=>{const n=Vt();n!=="en"&&setTimeout(()=>{Li(n)},60)})}function at(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const ge={tool:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',sprout:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>',users:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',activity:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',message:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',zap:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',grid:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',workflow:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>',chart:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',shield:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',bot:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="6" rx="2"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/><path d="M12 2v4"/><path d="M8 2h8"/></svg>',tree:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-7"/><path d="M8 15h8l-2-4h3l-2-4h2L12 2 7 7h2l-2 4h3z"/></svg>',school:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v6a6 3 0 0 0 12 0v-6"/><path d="M22 13v6"/></svg>',water:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',clock:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',chatLarge:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',botLarge:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="6" rx="2"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><path d="M12 2v4"/><path d="M8 2h8"/><path d="M2 13h1"/><path d="M21 13h1"/></svg>',gearLarge:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',checkLarge:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',flame:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',target:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',layers:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',heartHand:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',lock:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',database:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>',sparkles:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',toolBox:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',heartFill:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="var(--primary)" stroke="var(--primary)" stroke-width="1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>'};function Oc(){const i=Kn(),n=document.getElementById("app");n&&(n.innerHTML=`
    <div class="ck-home">

      <!-- ═══════════ HEADER ═══════════ -->
      <header class="ck-home-header" id="ck-home-header">
        <div class="ck-home-header-inner">
          <a href="/" class="ck-home-brand">
            <img src="/logo.png" alt="CivicKalki" class="ck-home-brand-img" />
          </a>

          <nav class="ck-home-nav" id="ck-home-nav">
            <a href="#features" class="ck-home-nav-link">Features</a>
            <a href="#how-it-works" class="ck-home-nav-link">How It Works</a>
            <a href="#buzz" class="ck-home-nav-link">Civic Buzz</a>
            <a href="#about" class="ck-home-nav-link">About</a>
            <a href="#faq" class="ck-home-nav-link">FAQ</a>
          </nav>

          <div class="ck-home-header-actions">
            ${Yn({idPrefix:"home"})}
            ${i?`
              <a href="/dashboard" class="ck-home-cta-btn">
                Open Civic OS →
              </a>
            `:`
              <a href="/login" class="ck-home-signin-link">Sign In</a>
              <a href="/signup" class="ck-home-cta-btn">Get Started — Free</a>
            `}
            <button class="ck-home-burger" id="ck-home-burger" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <!-- ═══════════ HERO ═══════════ -->
      <section class="ck-home-hero ck-hero-classic">

        <!-- Floating pills (decorative) -->
        <div class="ck-hero-float ck-float-1" aria-hidden="true">
          <span class="ck-float-badge ck-fb-orange">${ge.tool} REPORT</span>
        </div>
        <div class="ck-hero-float ck-float-2" aria-hidden="true">
          <span class="ck-float-badge ck-fb-green">${ge.sprout} INITIATIVE</span>
        </div>
        <div class="ck-hero-float ck-float-3" aria-hidden="true">
          <span class="ck-float-badge ck-fb-blue">${ge.users} VOLUNTEER</span>
        </div>
        <div class="ck-hero-float ck-float-4" aria-hidden="true">
          <span class="ck-float-badge ck-fb-purple">${ge.activity} TRACK</span>
        </div>
        <div class="ck-hero-float ck-float-5" aria-hidden="true">
          <span class="ck-float-badge ck-fb-pink">${ge.message} SPEAK UP</span>
        </div>

        <div class="ck-hero-content">
          <div class="ck-hero-pill">
            <span class="ck-hero-pill-dot"></span>
            The Civic OS That Actually Listens
          </div>

          <h1 class="ck-hero-headline">
            Don't<br>
            Hesitate<br>
            to <span class="ck-hero-accent">Speak Up.</span>
          </h1>

          <p class="ck-hero-sub">
            Your city has problems. You have ideas.<br class="ck-hide-mobile">
            CIVIC-KALKI turns both into structured civic action<br class="ck-hide-mobile">
            — with AI that actually understands what you need.
          </p>

          <!-- Mascot dome: rises from the bottom of the hero; the actions and figures sit on its body -->
          <div class="ck-hero-dome">
            <div class="ck-dome-eyes" aria-hidden="true">
              <div class="ck-mascot-eye"><div class="ck-mascot-pupil" id="ck-pupil-l"></div></div>
              <div class="ck-mascot-eye"><div class="ck-mascot-pupil" id="ck-pupil-r"></div></div>
            </div>
            <div class="ck-hero-actions">
              ${i?`
                <a href="/dashboard" class="ck-btn-hero">Enter My Workspace →</a>
              `:`
                <a href="/signup" class="ck-btn-hero">Start Your Civic Journey</a>
                <a href="/login" class="ck-btn-hero-ghost">I have an account →</a>
              `}
            </div>

            <!-- Live figures from this installation's public metadata -->
            <div class="ck-hero-trust" aria-label="This installation">
              <div class="ck-trust-item"><span class="ck-trust-num" id="ck-fact-modules">—</span><span class="ck-trust-label">Civic Modules</span></div>
              <div class="ck-trust-sep"></div>
              <div class="ck-trust-item"><span class="ck-trust-num" id="ck-fact-rules">—</span><span class="ck-trust-label">Rules Linking Them</span></div>
              <div class="ck-trust-sep"></div>
              <div class="ck-trust-item"><span class="ck-trust-num" id="ck-fact-wards">—</span><span class="ck-trust-label">Wards</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════ FEATURES — TABBED ═══════════ -->
      <section class="ck-home-section ck-section-features" id="features">
        <div class="ck-section-inner">
          <div class="ck-section-label">PLATFORM CAPABILITIES</div>
          <h2 class="ck-section-heading">Everything civic.<br><span class="ck-text-accent">One intelligent platform.</span></h2>
          <p class="ck-section-sub">From reporting a broken streetlight to tracking city-wide governance — CIVIC-KALKI is the operating system your city didn't know it needed.</p>

          <div class="ck-tabs" id="ck-feature-tabs">
            <div class="ck-tabs-nav">
              <button class="ck-tab-btn active" data-tab="tab-report">${ge.zap} Report</button>
              <button class="ck-tab-btn" data-tab="tab-organize">${ge.grid} Organize</button>
              <button class="ck-tab-btn" data-tab="tab-execute">${ge.workflow} Execute</button>
              <button class="ck-tab-btn" data-tab="tab-understand">${ge.chart} Understand</button>
              <button class="ck-tab-btn" data-tab="tab-accountable">${ge.shield} Accountable</button>
            </div>

            <div class="ck-tabs-body">
              <div class="ck-tab-panel active" id="tab-report">
                <div class="ck-tab-visual">
                  <div class="ck-tab-mockup">
                    <div class="ck-mockup-topbar">
                      <span class="ck-dot red"></span><span class="ck-dot yellow"></span><span class="ck-dot green"></span>
                      <span class="ck-mockup-url">civickalki.app/report</span>
                    </div>
                    <div class="ck-mockup-body">
                      <div class="ck-mock-chat">
                        <div class="ck-mock-msg ck-msg-user">The streetlight near Sector 5 park has been broken for 3 weeks</div>
                        <div class="ck-mock-msg ck-msg-ai">
                          <span class="ck-ai-badge">${ge.bot} KALKI AI</span>
                          Got it! I've classified this as a <strong>Public Infrastructure — Streetlight</strong> issue. Priority: <strong style="color:var(--primary-hover);">High</strong>. Filing now...
                        </div>
                        <div class="ck-mock-typing">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ck-tab-info">
                  <h3>Report problems in plain language.</h3>
                  <ul class="ck-feature-list">
                    <li>Just tell the AI what's wrong — no forms, no jargon</li>
                    <li>Automatic classification, priority, and routing</li>
                    <li>Attach photos, location, and evidence</li>
                    <li>Track resolution in real time</li>
                  </ul>
                  <a href="/signup" class="ck-btn-feature">Try Reporting →</a>
                </div>
              </div>

              <div class="ck-tab-panel" id="tab-organize">
                <div class="ck-tab-visual">
                  <div class="ck-tab-mockup">
                    <div class="ck-mockup-topbar">
                      <span class="ck-dot red"></span><span class="ck-dot yellow"></span><span class="ck-dot green"></span>
                      <span class="ck-mockup-url">civickalki.app/initiative</span>
                    </div>
                    <div class="ck-mockup-body">
                      <div class="ck-mock-organize">
                        <div class="ck-org-card">
                          <div class="ck-org-icon-pill">${ge.tree}</div>
                          <div>
                            Tree Plantation Drive
                            <div class="ck-org-meta">42 volunteers • Sector 7</div>
                          </div>
                        </div>
                        <div class="ck-org-card">
                          <div class="ck-org-icon-pill">${ge.school}</div>
                          <div>
                            School Renovation Fund
                            <div class="ck-org-meta">₹2.4L raised • Ward 12</div>
                          </div>
                        </div>
                        <div class="ck-org-card">
                          <div class="ck-org-icon-pill">${ge.water}</div>
                          <div>
                            Clean Water Initiative
                            <div class="ck-org-meta">18 contributors • City-wide</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ck-tab-info">
                  <h3>Organize people and resources.</h3>
                  <ul class="ck-feature-list">
                    <li>Build civic initiatives around any cause</li>
                    <li>Recruit volunteers and track contributions</li>
                    <li>Link citizens, documents, and related cases</li>
                    <li>One engine powers every civic module</li>
                  </ul>
                  <a href="/signup" class="ck-btn-feature">Start Organizing →</a>
                </div>
              </div>

              <div class="ck-tab-panel" id="tab-execute">
                <div class="ck-tab-visual">
                  <div class="ck-tab-mockup">
                    <div class="ck-mockup-topbar">
                      <span class="ck-dot red"></span><span class="ck-dot yellow"></span><span class="ck-dot green"></span>
                      <span class="ck-mockup-url">civickalki.app/workflow</span>
                    </div>
                    <div class="ck-mockup-body">
                      <div class="ck-mock-workflow">
                        <div class="ck-wf-step done"><span>✓</span> Submitted</div>
                        <div class="ck-wf-line done"></div>
                        <div class="ck-wf-step done"><span>✓</span> Area Review</div>
                        <div class="ck-wf-line active"></div>
                        <div class="ck-wf-step active"><span>${ge.clock}</span> Director Approval</div>
                        <div class="ck-wf-line"></div>
                        <div class="ck-wf-step"><span>○</span> Resolved</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ck-tab-info">
                  <h3>Transparent multi-stage workflows.</h3>
                  <ul class="ck-feature-list">
                    <li>Role-based approval chains (citizen → coordinator → director)</li>
                    <li>Automated verification and SLA tracking</li>
                    <li>Real-time status visible to all stakeholders</li>
                    <li>Zero manual process — rules drive everything</li>
                  </ul>
                  <a href="/signup" class="ck-btn-feature">See Workflows →</a>
                </div>
              </div>

              <div class="ck-tab-panel" id="tab-understand">
                <div class="ck-tab-visual">
                  <div class="ck-tab-mockup">
                    <div class="ck-mockup-topbar">
                      <span class="ck-dot red"></span><span class="ck-dot yellow"></span><span class="ck-dot green"></span>
                      <span class="ck-mockup-url">civickalki.app/intelligence</span>
                    </div>
                    <div class="ck-mockup-body">
                      <div class="ck-mock-chart">
                        <div class="ck-chart-bars">
                          <div class="ck-bar" style="height:45%"><span>Roads</span></div>
                          <div class="ck-bar ck-bar-accent" style="height:80%"><span>Sanitation</span></div>
                          <div class="ck-bar" style="height:35%"><span>Water</span></div>
                          <div class="ck-bar" style="height:60%"><span>Lights</span></div>
                          <div class="ck-bar" style="height:25%"><span>Parks</span></div>
                        </div>
                        <div class="ck-chart-label">Issue Distribution by Category — Ward 5</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ck-tab-info">
                  <h3>Civic intelligence, not just data.</h3>
                  <ul class="ck-feature-list">
                    <li>AI-generated insights on ward-level patterns</li>
                    <li>Real-time aggregated reports and dashboards</li>
                    <li>Identify hotspots, trends, and priority areas</li>
                    <li>Decision support for governance teams</li>
                  </ul>
                  <a href="/signup" class="ck-btn-feature">Explore Intelligence →</a>
                </div>
              </div>

              <div class="ck-tab-panel" id="tab-accountable">
                <div class="ck-tab-visual">
                  <div class="ck-tab-mockup">
                    <div class="ck-mockup-topbar">
                      <span class="ck-dot red"></span><span class="ck-dot yellow"></span><span class="ck-dot green"></span>
                      <span class="ck-mockup-url">civickalki.app/audit</span>
                    </div>
                    <div class="ck-mockup-body">
                      <div class="ck-mock-audit">
                        <div class="ck-audit-row"><span class="ck-audit-time">10:42 AM</span><span class="ck-audit-who">Coordinator Sharma</span><span class="ck-audit-act">Approved grievance #GRV-0042</span></div>
                        <div class="ck-audit-row"><span class="ck-audit-time">10:15 AM</span><span class="ck-audit-who">Rule Engine</span><span class="ck-audit-act">Auto-created inspection task</span></div>
                        <div class="ck-audit-row"><span class="ck-audit-time">09:30 AM</span><span class="ck-audit-who">Citizen Priya</span><span class="ck-audit-act">Submitted grievance with photo evidence</span></div>
                        <div class="ck-audit-row"><span class="ck-audit-time">Yesterday</span><span class="ck-audit-who">Director Mehta</span><span class="ck-audit-act">Escalated priority to High</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ck-tab-info">
                  <h3>Full accountability. Zero cover-ups.</h3>
                  <ul class="ck-feature-list">
                    <li>Immutable audit trail on every civic action</li>
                    <li>Parent-child entity lineage tracking</li>
                    <li>Role-based access with full transparency</li>
                    <li>Institutional memory that never forgets</li>
                  </ul>
                  <a href="/signup" class="ck-btn-feature">See Audit Trail →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════ HOW IT WORKS ═══════════ -->
      <section class="ck-home-section ck-section-how" id="how-it-works">
        <div class="ck-section-inner">
          <div class="ck-section-label">HOW IT WORKS</div>
          <h2 class="ck-section-heading">From problem to progress.<br><span class="ck-text-accent">In 4 steps.</span></h2>

          <div class="ck-how-grid">
            <div class="ck-how-card">
              <div class="ck-how-top">
                <div class="ck-how-num">01</div>
                <div class="ck-how-icon-box">${ge.chatLarge}</div>
              </div>
              <h3>Tell us what's wrong</h3>
              <p>Type or speak in plain language. Our AI understands civic issues — no bureaucratic forms.</p>
            </div>
            <div class="ck-how-card">
              <div class="ck-how-top">
                <div class="ck-how-num">02</div>
                <div class="ck-how-icon-box">${ge.botLarge}</div>
              </div>
              <h3>AI classifies & routes</h3>
              <p>KALKI AI auto-categorizes, sets priority, and routes to the right department instantly.</p>
            </div>
            <div class="ck-how-card">
              <div class="ck-how-top">
                <div class="ck-how-num">03</div>
                <div class="ck-how-icon-box">${ge.gearLarge}</div>
              </div>
              <h3>Workflows kick in</h3>
              <p>Multi-stage approvals, inspections, and assignments — automated, transparent, and tracked.</p>
            </div>
            <div class="ck-how-card">
              <div class="ck-how-top">
                <div class="ck-how-num">04</div>
                <div class="ck-how-icon-box">${ge.checkLarge}</div>
              </div>
              <h3>Resolution & impact</h3>
              <p>Issues get resolved. You get notified. The city gets better. Data makes everyone smarter.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════ CIVIC BUZZ ═══════════ -->
      <section class="ck-home-section ck-section-buzz" id="buzz">
        <div class="ck-section-inner">
          <div class="ck-section-label">${ge.flame} CIVIC BUZZ</div>
          <h2 class="ck-section-heading">Civic issues,<br>but make it <span class="ck-text-accent">relatable.</span></h2>
          <p class="ck-section-sub">Citizens can share respectful, AI-assisted civic awareness content after moderator review.</p>

          <div class="ck-buzz-grid">
            <p class="ck-section-sub">No Buzz yet. Be the first to highlight an issue.</p>
          </div>

          <div class="ck-buzz-cta" style="display:flex; flex-direction:column; align-items:center; gap:12px;">
            <p>These aren't just memes. These are real issues waiting to be fixed.</p>
            <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
              <a href="/meme/studio" class="ck-btn-hero" style="background:linear-gradient(135deg, #f59e0b, #ef4444); border:none; color:#fff;">
                Open Civic Buzz Studio
              </a>
              <a href="/signup" class="ck-btn-hero">Report Yours. We'll Actually Fix It. →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════ ABOUT ═══════════ -->
      <section class="ck-home-section ck-section-about" id="about">
        <div class="ck-section-inner">
          <div class="ck-about-layout">
            <div class="ck-about-text">
              <div class="ck-section-label ck-label-left">ABOUT CIVIC-KALKI</div>
              <h2 class="ck-section-heading" style="text-align:left;">Built by citizens.<br><span class="ck-text-accent">For citizens.</span></h2>
              <p class="ck-about-body">
                CIVIC-KALKI isn't just another government portal that nobody uses. It's a <strong>metadata-driven civic operating system</strong> that transforms how cities work — from the ground up.
              </p>
              <p class="ck-about-body">
                We believe civic governance shouldn't require a PhD in bureaucracy. Our AI-powered platform lets any citizen report, track, and contribute to their city's improvement — while giving municipal teams the tools to actually respond efficiently.
              </p>
              <div class="ck-about-values">
                <div class="ck-value-chip">${ge.target} Transparent</div>
                <div class="ck-value-chip">${ge.zap} AI-First</div>
                <div class="ck-value-chip">${ge.layers} No-Code</div>
                <div class="ck-value-chip">${ge.heartHand} Citizen-Centric</div>
                <div class="ck-value-chip">${ge.chart} Data-Driven</div>
                <div class="ck-value-chip">${ge.lock} Accountable</div>
              </div>
            </div>
            <div class="ck-about-visual">
              <div class="ck-about-card-stack">
                <div class="ck-acard ck-acard-1">
                  <div class="ck-acard-icon-box">${ge.database}</div>
                  <div>
                    <div class="ck-acard-text">20+ Database Tables</div>
                    <div class="ck-acard-sub">Powering civic intelligence</div>
                  </div>
                </div>
                <div class="ck-acard ck-acard-2">
                  <div class="ck-acard-icon-box">${ge.sparkles}</div>
                  <div>
                    <div class="ck-acard-text">Gemini AI Agent</div>
                    <div class="ck-acard-sub">Understands civic context</div>
                  </div>
                </div>
                <div class="ck-acard ck-acard-3">
                  <div class="ck-acard-icon-box">${ge.toolBox}</div>
                  <div>
                    <div class="ck-acard-text">No-Code Module Builder</div>
                    <div class="ck-acard-sub">Deploy new civic modules in minutes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════ FAQ ═══════════ -->
      <section class="ck-home-section ck-section-faq" id="faq">
        <div class="ck-section-inner" style="max-width:760px;">
          <div class="ck-section-label">FAQ</div>
          <h2 class="ck-section-heading">Got questions?<br><span class="ck-text-accent">We've got answers.</span></h2>

          <div class="ck-faq-list" id="ck-faq-list">
            <div class="ck-faq-item">
              <button class="ck-faq-q">What can CIVIC-KALKI help with?<span class="ck-faq-toggle">+</span></button>
              <div class="ck-faq-a">
                <p>CIVIC-KALKI helps citizens report civic issues (potholes, broken streetlights, sanitation), start community initiatives, volunteer for causes, and track the entire resolution process transparently. For municipal teams, it provides workflow automation, governance intelligence, and no-code module deployment.</p>
              </div>
            </div>
            <div class="ck-faq-item">
              <button class="ck-faq-q">Is it free to use?<span class="ck-faq-toggle">+</span></button>
              <div class="ck-faq-a">
                <p>Yes! CIVIC-KALKI is free for citizens. Sign up, report issues, track progress, and participate in civic initiatives at no cost.</p>
              </div>
            </div>
            <div class="ck-faq-item">
              <button class="ck-faq-q">How does the AI agent work?<span class="ck-faq-toggle">+</span></button>
              <div class="ck-faq-a">
                <p>Our AI agent (powered by Google Gemini) understands natural language descriptions of civic issues. Just type or speak what's wrong — the AI classifies the issue, sets priority, selects the right form, and routes it to the appropriate department. No bureaucratic knowledge required.</p>
              </div>
            </div>
            <div class="ck-faq-item">
              <button class="ck-faq-q">What is the "No-Code Module Builder"?<span class="ck-faq-toggle">+</span></button>
              <div class="ck-faq-a">
                <p>It's a tool for administrators to create entirely new civic modules (like a Donation Tracker or Public Survey system) without writing any code. Define fields, workflows, and approval chains through a visual interface, and deploy instantly.</p>
              </div>
            </div>
            <div class="ck-faq-item">
              <button class="ck-faq-q">Is my data secure?<span class="ck-faq-toggle">+</span></button>
              <div class="ck-faq-a">
                <p>Absolutely. We use industry-standard JWT authentication, bcrypt password hashing, role-based access control, and a Supabase PostgreSQL database with full audit logging. Every action is tracked, every access is controlled.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════ FINAL CTA ═══════════ -->
      <section class="ck-home-section ck-section-cta">
        <div class="ck-cta-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="rgba(var(--primary-rgb),0.06)" d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,117.3C672,96,768,64,864,74.7C960,85,1056,139,1152,154.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div class="ck-cta-inner">
          <h2 class="ck-cta-title">Your city is waiting.</h2>
          <p class="ck-cta-sub">Join the civic movement. Report. Contribute. Transform.</p>
          <a href="/signup" class="ck-btn-cta-big">Get Started — It's Free →</a>
        </div>
      </section>

      <!-- ═══════════ FOOTER ═══════════ -->
      <footer class="ck-home-footer">
        <div class="ck-footer-inner">
          <div class="ck-footer-brand">
            <img src="/logo.png" alt="CivicKalki" style="height:32px;" />
            <p>The AI-powered Civic Operating System for transparent, accountable, and intelligent municipal governance.</p>
          </div>

          <div class="ck-footer-col">
            <h4>Platform</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="/login">Sign In</a>
            <a href="/signup">Get Started</a>
          </div>

          <div class="ck-footer-col">
            <h4>Civic Modules</h4>
            <a href="/signup">Report a Problem</a>
            <a href="/signup">Start Initiative</a>
            <a href="/signup">Volunteer</a>
            <a href="/signup">Governance Intelligence</a>
          </div>

          <div class="ck-footer-col">
            <h4>Connect</h4>
            <a href="#about">About Us</a>
            <a href="#faq">FAQ</a>
            <a href="mailto:team@civickalki.in">team@civickalki.in</a>
            <a href="#">GitHub</a>
          </div>
        </div>

        <div class="ck-footer-bottom">
          <span>© ${new Date().getFullYear()} CIVIC-KALKI. Built for transparent civic governance.</span>
          <span style="display:inline-flex; align-items:center; gap:6px;">Made with ${ge.heartFill} in India</span>
        </div>
      </footer>
    </div>
  `,Jn("home"),Hc())}async function jc(){var d,u;const i=h=>fetch(h,{credentials:"include"}).then(m=>m.ok?m.json():null).catch(()=>null),[n,s]=await Promise.all([i("/api/forms/metadata"),i("/api/jurisdictions?tree=true")]);let o=0;const r=h=>(h||[]).forEach(m=>{m.type==="ward"&&m.status!=="inactive"&&(o+=1),r(m.children)});r(Array.isArray(s==null?void 0:s.data)?s.data:[]);const c=(h,m)=>{const g=document.getElementById(h);g&&(g.textContent=String(m))};n&&(c("ck-fact-modules",(((d=n.data)==null?void 0:d.entityTypes)||[]).length),c("ck-fact-rules",(((u=n.data)==null?void 0:u.rules)||[]).length)),s&&c("ck-fact-wards",o)}let St=null;function Nc(){St&&(St(),St=null);const i=[document.getElementById("ck-pupil-l"),document.getElementById("ck-pupil-r")].filter(Boolean);if(i.length!==2)return;const n=window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)"):null;if(n&&n.matches)return;let s=0,o=0,r=0,c=0;const d=()=>{if(r=0,!i[0].isConnected){St&&St();return}for(const m of i){const g=m.parentElement.getBoundingClientRect(),v=s-(g.left+g.width/2),b=o-(g.top+g.height/2),w=Math.min(g.width,g.height)*.24,$=Math.hypot(v,b)||1,x=Math.min($*.15,w);m.style.transform=`translate(${v/$*x}px, ${b/$*x}px)`}},u=m=>{const g=performance.now();g-c<32||(c=g,s=m.clientX,o=m.clientY,r||(r=requestAnimationFrame(d)))},h=()=>{n.matches&&(i.forEach(m=>{m.style.transform=""}),St&&St())};document.addEventListener("pointermove",u,{passive:!0}),n&&n.addEventListener&&n.addEventListener("change",h),St=()=>{document.removeEventListener("pointermove",u),n&&n.removeEventListener&&n.removeEventListener("change",h),r&&cancelAnimationFrame(r),r=0,St=null}}function Hc(){jc(),Nc();const i=document.getElementById("ck-home-header");i&&window.addEventListener("scroll",()=>{i.classList.toggle("scrolled",window.scrollY>40)},{passive:!0});const n=document.getElementById("ck-home-burger"),s=document.getElementById("ck-home-nav");n&&s&&n.addEventListener("click",()=>{s.classList.toggle("open"),n.classList.toggle("open")});const o=document.getElementById("ck-feature-tabs");o&&o.addEventListener("click",u=>{const h=u.target.closest(".ck-tab-btn");if(!h)return;const m=h.dataset.tab;o.querySelectorAll(".ck-tab-btn").forEach(v=>v.classList.remove("active")),o.querySelectorAll(".ck-tab-panel").forEach(v=>v.classList.remove("active")),h.classList.add("active");const g=document.getElementById(m);g&&g.classList.add("active")});const r=document.getElementById("ck-faq-list");r&&r.addEventListener("click",u=>{const h=u.target.closest(".ck-faq-q");if(!h)return;const m=h.closest(".ck-faq-item"),g=m.classList.contains("open");r.querySelectorAll(".ck-faq-item").forEach(v=>v.classList.remove("open")),g||m.classList.add("open")}),document.querySelectorAll('.ck-home a[href^="#"]').forEach(u=>{u.addEventListener("click",h=>{h.preventDefault();const m=document.querySelector(u.getAttribute("href"));if(m){m.scrollIntoView({behavior:"smooth",block:"start"});const g=document.getElementById("ck-home-nav"),v=document.getElementById("ck-home-burger");g&&g.classList.remove("open"),v&&v.classList.remove("open")}})});const c=u=>{u.forEach(h=>{h.isIntersecting&&h.target.classList.add("ck-visible")})},d=new IntersectionObserver(c,{threshold:.1,rootMargin:"0px 0px -60px 0px"});document.querySelectorAll(".ck-how-card, .ck-buzz-meme, .ck-about-text, .ck-about-visual, .ck-faq-item").forEach(u=>{d.observe(u)})}const hr="/api";async function D(i,n,s=null,o={}){const c={method:i,headers:{"Content-Type":"application/json","X-Requested-With":"ck-web"},credentials:"include",...o};s!==null&&(c.body=JSON.stringify(s));const d=await fetch(`${hr}${n}`,c);d.status===401&&(rs(),window.dispatchEvent(new CustomEvent("auth:expired")));const u=await d.json().catch(()=>({success:!1,error:"Invalid server response"}));if(!d.ok){const h=new Error(u.error||`HTTP ${d.status}`);throw h.status=d.status,h.data=u,h}return u}const Xn={login:(i,n)=>D("POST","/auth/login",{email:i,password:n}),signup:(i,n,s)=>D("POST","/auth/signup",{name:i,email:n,password:s}),changePassword:(i,n)=>D("POST","/auth/change-password",{current_password:i,new_password:n}),me:()=>D("GET","/auth/me"),logout:()=>D("POST","/auth/logout")},cs={listUsers:(i={})=>{const n=new URLSearchParams(i).toString();return D("GET",`/admin/users${n?"?"+n:""}`)},getUser:i=>D("GET",`/admin/users/${i}`),setRole:(i,n,s)=>D("POST",`/admin/users/${i}/role`,{role:n,assignedArea:s})},fe={list:(i={})=>{const n=new URLSearchParams(i).toString();return D("GET",`/entities${n?"?"+n:""}`)},listTypes:()=>D("GET","/entities/entity-types"),createType:i=>D("POST","/entities/entity-types",i),createRule:i=>D("POST","/entities/rules",i),get:i=>D("GET",`/entities/${i}`),create:i=>D("POST","/entities",i),update:(i,n)=>D("PUT",`/entities/${i}`,n),softDelete:i=>D("DELETE",`/entities/${i}`),transition:(i,n,s)=>D("POST",`/entities/${i}/transition`,{to_status:n,reason:s}),fireRules:(i,n)=>D("POST",`/entities/${i}/fire-rules`,{eventType:n}),aiAnalysis:i=>D("POST",`/entities/${i}/ai-analysis`),casePanel:i=>D("GET",`/entities/${i}/case-panel`),caseBrief:i=>D("POST",`/entities/${i}/case-panel/brief`),caseSuggestionOutcome:(i,n)=>D("POST",`/entities/${i}/case-panel/suggestion`,n),audit:i=>D("GET",`/entities/${i}/audit`),getLineage:i=>D("GET",`/entities/${i}/lineage`),workflow:i=>D("GET",`/entities/${i}/workflow`),notifications:(i=30)=>D("GET",`/entities/notifications?limit=${encodeURIComponent(i)}`),nearby:(i,n,s=10)=>D("GET",`/entities/nearby?lat=${encodeURIComponent(i)}&lng=${encodeURIComponent(n)}&radius_km=${encodeURIComponent(s)}`)},mr={list:i=>D("GET",`/entities/${i}/values`),create:(i,n)=>D("POST",`/entities/${i}/values`,{values:n}),upsert:(i,n)=>D("PUT",`/entities/${i}/values`,{values:n})},Si={getMetadata:()=>D("GET","/forms/metadata"),schema:i=>D("GET",`/forms/${i}/schema`),create:i=>D("POST","/forms",i),addSection:(i,n)=>D("POST",`/forms/${i}/sections`,n),addSubsection:(i,n)=>D("POST",`/sections/${i}/subsections`,n),addParameter:(i,n)=>D("POST",`/subsections/${i}/parameters`,n),getAssistant:i=>D("GET",`/forms/assistant/${i}`),saveAssistant:(i,n)=>D("PUT",`/forms/assistant/${i}`,n)},li={list:(i={})=>{const n=new URLSearchParams(i).toString();return D("GET",`/reports${n?"?"+n:""}`)},get:i=>D("GET",`/reports/${i}`),create:i=>D("POST","/reports",i),execute:(i,n={})=>{const s=new URLSearchParams(n).toString();return D("GET",`/reports/${i}/execute${s?"?"+s:""}`)}},Dc={validate:i=>D("POST","/module-builder/validate",i),deploy:i=>D("POST","/module-builder/deploy",i)},Bn={list:(i={})=>{const n=new URLSearchParams(i).toString();return D("GET",`/jurisdictions${n?"?"+n:""}`)},tree:()=>D("GET","/jurisdictions?tree=true"),get:i=>D("GET",`/jurisdictions/${i}`),create:i=>D("POST","/jurisdictions",i),update:(i,n)=>D("PUT",`/jurisdictions/${i}`,n),deactivate:i=>D("DELETE",`/jurisdictions/${i}`)},Fc={getConfig:()=>D("GET","/governance/config"),analyze:i=>D("POST","/governance/analyze",i?{entity_type_id:i}:{})},Rn={chat:async(i,n,s=null,o="en",r=null)=>{if(!s)return D("POST","/agent/chat",r?{sessionId:i,message:n,lang:o,edits:r}:{sessionId:i,message:n,lang:o});const c=new FormData;c.append("sessionId",i),c.append("message",n||""),c.append("lang",o||"en"),c.append("attachment",s);const d={"X-Requested-With":"ck-web"},u=await fetch(`${hr}/agent/chat`,{method:"POST",headers:d,credentials:"include",body:c});u.status===401&&(rs(),window.dispatchEvent(new CustomEvent("auth:expired")));const h=await u.json().catch(()=>({success:!1,error:"Invalid server response"}));if(!u.ok){const m=new Error(h.error||`HTTP ${u.status}`);throw m.status=u.status,m.data=h,m}return h},clearSession:i=>D("DELETE",`/agent/chat/${i}`).catch(()=>{})},ve={list:(i={})=>{const n=new URLSearchParams(i).toString();return D("GET",`/buzz${n?"?"+n:""}`)},get:i=>D("GET",`/buzz/${i}`),create:i=>D("POST","/buzz",i),update:(i,n)=>D("PATCH",`/buzz/${i}`,n),vote:i=>D("POST",`/buzz/${i}/vote`),follow:i=>D("POST",`/buzz/${i}/follow`),getComments:(i,n={})=>{const s=new URLSearchParams(n).toString();return D("GET",`/buzz/${i}/comments${s?"?"+s:""}`)},addComment:(i,n)=>D("POST",`/buzz/${i}/comments`,{text:n}),logEvent:(i,n)=>D("POST",`/buzz/${i}/event`,{type:n}),getStats:i=>D("GET",`/buzz/${i}/stats`),generateCaptions:i=>D("POST","/buzz/captions",i),uploadImage:i=>D("POST","/buzz/upload-image",{image_data:i}),report:(i,n)=>D("POST",`/buzz/${i}/report`,{reason:n})};let qc=0;function on(i,n="default",s=3500){const o=document.getElementById("toast-container"),r=++qc,c=document.createElement("div");return c.className=`toast toast-${n}`,c.id=`toast-${r}`,c.innerHTML=`
    <span>${Uc(i)}</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:8px;font-size:1rem;line-height:1;opacity:.7">×</button>
  `,o.appendChild(c),setTimeout(()=>{c.remove()},s),r}function fr(i){return on(i,"default")}function ye(i){return on(i,"success")}function te(i){return on(i,"error")}function _t(i){return on(i,"warning")}function Uc(i){return String(i).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const Zc=Object.freeze(Object.defineProperty({__proto__:null,showToast:on,toast:fr,toastError:te,toastSuccess:ye,toastWarning:_t},Symbol.toStringTag,{value:"Module"}));function Mo(i,n="/dashboard"){const s=i&&i.get("redirect");return typeof s=="string"&&s.startsWith("/")&&!s.startsWith("//")&&!s.startsWith("/\\")&&!s.includes("://")&&!s.toLowerCase().includes("javascript:")&&!/[\x00-\x1F\x7F]/.test(s)?s:n}function Vc(i,n){if(Kn()){ne(Mo(n));return}const s=document.getElementById("app");s.innerHTML=`
    <div class="auth-layout">
      <div class="auth-card">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--space-4);">
          <a href="/" style="font-size:0.8125rem; color:var(--text-muted); display:inline-flex; align-items:center; gap:4px; text-decoration:none;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Home
          </a>
          ${Yn({idPrefix:"login"})}
        </div>

        <div class="auth-card-brand">
          <img src="/logo.png" alt="CivicKalki" style="height:44px; width:auto; object-fit:contain;" />
        </div>

        <h2>Sign in to Civic OS</h2>
        <p class="subtitle">Enter your credentials to access your operational dashboard</p>
        
        <div id="login-error-alert" class="alert alert-danger hidden mt-3 mb-3" role="alert" aria-live="assertive"></div>

        <form id="login-form" novalidate>
          <div class="form-group">
            <label class="form-label" for="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              class="form-control" 
              placeholder="name@city.gov" 
              required 
              autofocus
              aria-required="true"
              autocomplete="email"
            >
          </div>
          
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <div style="position:relative;">
              <input 
                type="password" 
                id="password" 
                class="form-control" 
                placeholder="Enter password" 
                required
                aria-required="true"
                autocomplete="current-password"
                style="padding-right:40px;"
              >
              <button 
                type="button" 
                id="toggle-password-btn"
                aria-label="Show password"
                style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:var(--text-muted); padding:4px; display:flex; align-items:center;"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full mt-4" id="login-btn">
            Sign In
          </button>
        </form>
        
        <div class="mt-6 text-center text-sm text-secondary">
          Don't have an account? <a href="/signup" class="text-link">Sign up</a>
        </div>

        <div class="mt-4 text-center">
          <a href="/" style="font-size:0.8rem; color:var(--text-muted); text-decoration:none;">← Back to Public Home</a>
        </div>
      </div>
    </div>
  `;const o=document.getElementById("password"),r=document.getElementById("toggle-password-btn"),c='<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>',d='<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>';r&&o&&r.addEventListener("click",()=>{const h=o.getAttribute("type")==="password"?"text":"password";o.setAttribute("type",h),r.setAttribute("aria-label",h==="password"?"Show password":"Hide password"),r.innerHTML=h==="password"?c:d});const u=document.getElementById("login-error-alert");document.getElementById("login-form").addEventListener("submit",async h=>{h.preventDefault(),u&&(u.classList.add("hidden"),u.textContent="");const m=document.getElementById("login-btn"),g=document.getElementById("email").value.trim(),v=o.value;if(!g||!v){u&&(u.textContent="Please enter both email address and password.",u.classList.remove("hidden"));return}m.disabled=!0,m.innerHTML='<div class="spinner" style="width:16px;height:16px;border-width:2px;margin-right:8px;"></div> Signing in...';try{const b=await Xn.login(g,v);lr(b.data),ne(Mo(n))}catch(b){const w=b.message||"Invalid email or password. Please check your credentials.";u&&(u.textContent=w,u.classList.remove("hidden")),te(w),m.disabled=!1,m.innerHTML="Sign In"}}),Jn("login")}function Ao(i,n="/dashboard"){const s=i&&i.get("redirect");return typeof s=="string"&&s.startsWith("/")&&!s.startsWith("//")&&!s.startsWith("/\\")&&!s.includes("://")&&!s.toLowerCase().includes("javascript:")&&!/[\x00-\x1F\x7F]/.test(s)?s:n}function Wc(i,n){if(Kn()){ne(Ao(n));return}const s=document.getElementById("app");s.innerHTML=`
    <div class="auth-layout">
      <div class="auth-card">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--space-4);">
          <a href="/" style="font-size:0.8125rem; color:var(--text-muted); display:inline-flex; align-items:center; gap:4px; text-decoration:none;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Home
          </a>
          ${Yn({idPrefix:"signup"})}
        </div>

        <div class="auth-card-brand">
          <img src="/logo.png" alt="CivicKalki" style="height:44px; width:auto; object-fit:contain;" />
        </div>

        <h2>Create an account</h2>
        <p class="subtitle">Join as a citizen to get started</p>
        
        <form id="signup-form">
          <div class="form-group">
            <label class="form-label" for="name">Full Name</label>
            <input type="text" id="name" class="form-control" placeholder="Enter your full name" required autofocus>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="email">Email address</label>
            <input type="email" id="email" class="form-control" placeholder="Enter your email" required>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input type="password" id="password" class="form-control" placeholder="Create a password (min 8 chars)" minlength="8" required>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full mt-4" id="signup-btn">
            Create Account
          </button>
        </form>
        
        <div class="mt-6 text-center text-sm text-secondary">
          Already have an account? <a href="/login" class="text-link">Sign in</a>
        </div>

        <div class="mt-4 text-center">
          <a href="/" style="font-size:0.8rem; color:var(--text-muted); text-decoration:none;">← Back to Public Home</a>
        </div>
      </div>
    </div>
  `,document.getElementById("signup-form").addEventListener("submit",async o=>{o.preventDefault();const r=document.getElementById("signup-btn"),c=document.getElementById("name").value.trim(),d=document.getElementById("email").value.trim(),u=document.getElementById("password").value;if(!(!c||!d||!u)){r.disabled=!0,r.innerHTML='<div class="spinner" style="width:16px;height:16px;border-width:2px;margin-right:8px;"></div> Creating account...';try{const h=await Xn.signup(c,d,u);lr(h.data),ne(Ao(n))}catch(h){te(h.message||"Signup failed"),r.disabled=!1,r.innerHTML="Create Account"}}}),Jn("signup")}const Xa={initiative:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",grievance:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",park:"M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",passport:"M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",charter:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",employment:"M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",volunteer:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",legacy:"M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",feedback:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",survey:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",default:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"},gr={"🌱":"initiative","🚨":"grievance","⚠️":"grievance","🪪":"passport","📜":"charter","💼":"employment","🤝":"volunteer","🏛️":"legacy","🏛":"legacy","💬":"feedback","📢":"feedback","📊":"survey","📋":"survey","🌳":"park","🏞️":"park","🏞":"park","🏗️":"legacy","🏗":"legacy","🛡️":"charter","🛡":"charter","⚡":"default","⚡️":"default"};function Ft(i,n=20,s=""){const o=gr[i]||i,r=Xa[o]||Xa.default;return`<svg width="${n}" height="${n}" class="${s}" style="flex-shrink:0; display:inline-block; vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${r}"/></svg>`}const Gc={Movement:{title:"Start a Civic Initiative",shortTitle:"Civic Initiative",description:"Organize citizens around community goals, public spaces, and urban projects.",category:"Community Action",iconKey:"initiative",actionLabel:"Start Initiative"},Grievance:{title:"Report a Civic Problem",shortTitle:"Civic Problem",description:"Report infrastructure defects, sanitation issues, or public safety concerns.",category:"Public Services",iconKey:"grievance",actionLabel:"Report Issue"},"Park Renovation Request":{title:"Park Renovation Request",shortTitle:"Park Renovation",description:"Propose public park upgrades, playground repairs, or green space restoration.",category:"Urban Infrastructure",iconKey:"park",actionLabel:"Request Renovation"},"Citizen Passport":{title:"Citizen Passport & Contribution",shortTitle:"Citizen Passport",description:"Track community contributions, volunteer hours, and civic engagement history.",category:"Civic Identity",iconKey:"passport",actionLabel:"Update Passport"},"Digital Civic Constitution":{title:"Civic Charter & Guidelines",shortTitle:"Civic Charter",description:"Establish community guidelines, governance rules, and transparency terms.",category:"Governance",iconKey:"charter",actionLabel:"Draft Charter"},"Employment Exchange":{title:"Civic Skills & Employment",shortTitle:"Employment Exchange",description:"Post and discover civic project roles, community jobs, and skill opportunities.",category:"Opportunity",iconKey:"employment",actionLabel:"Post Role"},"Volunteer Management":{title:"Volunteer Operations",shortTitle:"Volunteer Drive",description:"Coordinate volunteer tasks, register community helpers, and track activities.",category:"Community Action",iconKey:"volunteer",actionLabel:"Register Volunteer"},"Legacy & Continuity":{title:"Project Continuity & Legacy",shortTitle:"Project Continuity",description:"Transition completed initiatives into permanent NGOs, startups, or civic centers.",category:"Governance",iconKey:"legacy",actionLabel:"Plan Continuity"},"Public Feedback":{title:"Public Feedback",shortTitle:"Public Feedback",description:"Collect structured community feedback on civic initiatives and public services.",category:"Civic Operations",iconKey:"feedback",actionLabel:"Submit Feedback"},"Public Survey":{title:"Public Survey",shortTitle:"Public Survey",description:"Run community surveys and opinion polls for civic decision-making.",category:"Civic Operations",iconKey:"survey",actionLabel:"Start Survey"}};function et(i){var r;if(!i)return{title:"Civic Capability",shortTitle:"Capability",description:"Metadata-driven civic module.",category:"Civic Operations",iconKey:"default",icon:Ft("default",16),iconLarge:Ft("default",24),actionLabel:"Start Action"};const n=i.name||"",s=Gc[n];if(s)return{title:s.title,shortTitle:s.shortTitle,description:i.description||s.description,category:s.category,iconKey:s.iconKey,icon:Ft(s.iconKey,16),iconLarge:Ft(s.iconKey,24),actionLabel:s.actionLabel,rawName:n};const o=i.icon&&gr[i.icon]||(i.icon&&Xa[i.icon]?i.icon:null)||"default";return{title:n,shortTitle:n,description:i.description||"Metadata-configured civic capability module.",category:((r=i.domain)==null?void 0:r.domain_name)||"Civic Operations",iconKey:o,icon:Ft(o,16),iconLarge:Ft(o,24),actionLabel:`Start ${n}`,rawName:n}}function mt(i){if(!i)return"Unknown";switch(i.toLowerCase()){case"draft":return"Draft (Unsubmitted)";case"submitted":return"Submitted (Awaiting Review)";case"coordinator_approved":return"Verified (Pending Approval)";case"verified":return"Verified";case"approved":return"Approved & Active";case"rejected":return"Rejected";case"closed":return"Closed";default:return i.replace(/_/g," ").replace(/\b\w/g,n=>n.toUpperCase())}}const Kc=3e4;let Na=null,Sn=null;function Vi(i){return String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function vr(){const i=He();return`ck_notifications_seen_${i?i.user_id:"anon"}`}function Ha(){try{return Number(localStorage.getItem(vr()))||0}catch{return 0}}function Yc(i){try{localStorage.setItem(vr(),String(i))}catch{}}function Jc(i){const n=Math.max(0,Math.round((Date.now()-new Date(i).getTime())/1e3));return n<60?"just now":n<3600?`${Math.floor(n/60)} min ago`:n<86400?`${Math.floor(n/3600)} h ago`:new Date(i).toLocaleDateString()}const Xc={queue:"Needs your review",status:"Status change",linked:"Linked record"};function Qc(){return`
    <div class="notif-container">
      <button class="notif-bell-btn" id="notif-bell-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Notifications">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0m6 0H9"/></svg>
        <span class="notif-count" id="notif-count" hidden></span>
      </button>
      <div class="notif-panel" id="notif-panel" role="region" aria-label="Notifications">
        <div class="notif-panel-header">Notifications</div>
        <div class="notif-list" id="notif-list" aria-live="polite">
          <div class="notif-empty">Loading…</div>
        </div>
      </div>
    </div>
  `}function Io(i,n){return i.length?i.map(s=>`
      <button type="button" class="notif-item${new Date(s.datetime).getTime()>n?" unread":""}" data-entity-id="${Number(s.entity_id)}">
        <span class="notif-kind notif-kind-${Vi(s.kind)}">${Vi(Xc[s.kind]||"Update")}</span>
        <span class="notif-message">${Vi(s.message)}</span>
        <span class="notif-meta">${Vi(s.actor?`${s.actor} · `:"")}${Vi(Jc(s.datetime))}</span>
      </button>`).join(""):'<div class="notif-empty">Nothing yet. Status changes and records waiting for you appear here.</div>'}function ed(){const i=document.getElementById("notif-bell-btn"),n=document.getElementById("notif-panel"),s=document.getElementById("notif-list"),o=document.getElementById("notif-count");if(!i||!n||!s||!o)return;let r=[];const c=()=>{const u=Ha(),h=r.filter(m=>new Date(m.datetime).getTime()>u).length;o.textContent=h>9?"9+":String(h),o.hidden=h===0,i.setAttribute("aria-label",h?`Notifications, ${h} new`:"Notifications"),s.innerHTML=Io(r,u)},d=async()=>{if(document.body.contains(i))try{const u=await fe.notifications();r=Array.isArray(u.data)?u.data:[],c()}catch{s.innerHTML='<div class="notif-empty">Notifications could not be loaded.</div>'}};i.addEventListener("click",u=>{u.stopPropagation();const h=n.classList.toggle("show");if(i.setAttribute("aria-expanded",String(h)),h){const m=r.length?new Date(r[0].datetime).getTime():Date.now();s.innerHTML=Io(r,Ha()),Yc(Math.max(m,Ha())),o.hidden=!0}}),s.addEventListener("click",u=>{const h=u.target.closest(".notif-item");h&&(n.classList.remove("show"),ne(`/entities/${h.getAttribute("data-entity-id")}`))}),Sn&&document.removeEventListener("click",Sn),Sn=u=>{const h=document.getElementById("notif-panel"),m=document.getElementById("notif-bell-btn");h&&m&&!h.contains(u.target)&&!m.contains(u.target)&&(h.classList.remove("show"),m.setAttribute("aria-expanded","false"))},document.addEventListener("click",Sn),Na&&clearInterval(Na),Na=setInterval(d,Kc),d()}function Ee(i,n="",s=[]){const o=He(),r=Gn();if(!o)return i;const c=window.location.pathname,d=window.location.search;let u=[];r==="citizen"?u=[{path:"/dashboard",label:"Home",icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},{path:"/nearby",label:"Near me",icon:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"},{path:"/entities?type=initiative",label:"Initiatives",icon:"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"},{path:"/buzz",label:"Civic Buzz",icon:"M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"},{path:"/entities",label:"My requests",icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"},{path:"/agent/chat",label:"Assistant",icon:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"}]:r==="coordinator_area"||r==="coordinator_general"?u=[{path:"/dashboard",label:"My desk",icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},{path:"/entities",label:"All records",icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"},{path:"/reports",label:"Reports",icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"}]:r==="director"?u=[{path:"/dashboard",label:"Approvals",icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},{path:"/governance",label:"Governance Intelligence",icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"},{path:"/entities",label:"All records",icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"},{path:"/module-builder",label:"Module builder",icon:"M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"},{path:"/reports",label:"Reports",icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"}]:u=[{path:"/dashboard",label:"Platform",icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},{path:"/governance",label:"Governance Intelligence",icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"},{path:"/modules",label:"Modules",icon:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"},{path:"/module-builder",label:"Module builder",icon:"M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"},{path:"/entities",label:"All records",icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"},{path:"/reports",label:"Reports",icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"},{path:"/admin",label:"Users and roles",icon:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"}];const h=v=>v.map(b=>{let w=!1;if(b.path.includes("?")){const[$,x]=b.path.split("?");w=c===$&&d==="?"+x}else w=c===b.path&&!d;return`
    <li class="sidebar-nav-item">
      <a href="${b.path}" class="sidebar-nav-link ${w?"active":""}">
        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${b.icon}"></path></svg>
        ${st(b.label)}
      </a>
    </li>
  `}).join("");let m="";r!=="citizen"&&Array.isArray(s)&&s.length>0&&(m=s.map(v=>{var x;const b=et(v),w=`/entities?entity_type_id=${v.entity_type_id}`,$=d.includes(`entity_type_id=${v.entity_type_id}`);return`
        <li class="sidebar-nav-item">
          <a href="${w}" class="sidebar-nav-link ${$?"active":""}">
            <span class="sidebar-cap-icon" style="display:inline-flex; align-items:center; justify-content:center; width:18px; height:18px; margin-right:8px; flex-shrink:0; opacity:0.85;">
              ${Ft(b.iconKey,16)}
            </span>
            <span class="truncate" style="flex:1;">${st(b.shortTitle)}</span>
            ${(x=v._count)!=null&&x.entities?`<span class="sidebar-nav-count">${v._count.entities}</span>`:""}
          </a>
        </li>
      `}).join(""));const g=r==="coordinator_area"&&o.assignedArea?`${Ki(r)} • ${o.assignedArea}`:Ki(r);return`
    <div class="app-layout">
      <!-- Sidebar -->
      <aside class="sidebar" id="sidebar">
        <a href="/dashboard" class="sidebar-brand">
          <img src="/logo.png" alt="CivicKalki" class="sidebar-brand-img" />
        </a>

        ${r==="citizen"?`
          <div class="sidebar-new-request-wrap" style="padding: 10px 14px 4px 14px;">
            <button type="button" class="btn btn-primary ck-sidebar-new-btn" id="sidebar-new-request-btn" style="width:100%; justify-content:center; gap:8px; font-weight:700; font-size:0.95rem; border-radius:10px; background:var(--primary); border-color:var(--primary); box-shadow:0 2px 8px rgba(var(--primary-rgb),0.3); height:40px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
              <span>New request</span>
            </button>
          </div>
        `:""}
        
        <div class="sidebar-section">
          <ul class="sidebar-nav">
            ${h(u)}
          </ul>
        </div>

        ${m?`
          <details class="sidebar-modules" ${d.includes("entity_type_id=")?"open":""}>
            <summary>Records by module</summary>
            <ul class="sidebar-nav">
              ${m}
            </ul>
          </details>
        `:""}
        
        <div class="sidebar-footer">
          <div class="sidebar-user" id="sidebar-user-card" style="cursor:pointer;">
            <div class="user-avatar">${st(o.name.charAt(0).toUpperCase())}</div>
            <div style="flex:1; overflow:hidden;">
              <div class="user-name truncate">${st(o.name)}</div>
              <div class="user-role truncate" title="${st(g)}">${st(g)}</div>
            </div>
          </div>
        </div>
      </aside>

      <div class="sidebar-scrim" id="sidebar-scrim"></div>

      <!-- Main Content -->
      <main class="main-content">
        <header class="topbar">
          <div style="display:flex; align-items:center; gap:var(--space-3);">
            <button id="mobile-menu-btn" class="btn btn-ghost mobile-menu-btn" type="button" aria-label="Open the menu" aria-controls="sidebar" aria-expanded="false">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <div class="topbar-crumbs">
              <a href="/dashboard" class="topbar-crumb-root">CivicKalki</a>
              <span class="topbar-crumb-sep" aria-hidden="true">/</span>
              <span style="font-weight:600; color:var(--text-primary);">${st(n)}</span>
            </div>
          </div>

          <div class="topbar-actions">
            <!-- Language Selector -->
            ${Yn({idPrefix:"topbar"})}

            <!-- Notifications (derived feed) -->
            ${Qc()}

            <!-- User Dropdown Menu -->
            <div class="user-dropdown-container">
              <button class="user-trigger-btn" id="topbar-user-btn" type="button" aria-haspopup="true" aria-expanded="false">
                <div class="user-avatar" style="width:32px; height:32px; font-size:13px; font-weight:700;">${st(o.name.charAt(0).toUpperCase())}</div>
                <div style="display:flex; flex-direction:column; align-items:flex-start; line-height:1.2;">
                  <span style="font-size:0.88rem; font-weight:600; color:var(--text-primary);">${st(o.name.split(" ")[0])}</span>
                  <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.03em;">${st(Ki(r))}</span>
                </div>
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--text-muted); flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>

              <div class="user-dropdown-menu" id="user-dropdown-menu">
                <div class="user-dropdown-header">
                  <div class="user-dropdown-name">${st(o.name)}</div>
                  <div class="user-dropdown-role">${st(Ki(r))}</div>
                </div>
                <a href="/profile" class="user-dropdown-item">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  Profile & Security
                </a>
                <a href="/reports" class="user-dropdown-item">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  Reports
                </a>
                <button type="button" class="user-dropdown-item danger" id="dropdown-logout-btn">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <div class="page-content" id="page-content">
          ${i}
        </div>
      </main>
    </div>
  `}function Ce(){var u;Sc().catch(()=>{}),Jn("topbar"),ed();const i=document.getElementById("sidebar-new-request-btn");i&&i.addEventListener("click",()=>{if(window.location.pathname==="/dashboard"){const h=document.getElementById("ck-dark-input"),m=document.getElementById("ck-dark-cockpit");m&&m.scrollIntoView({behavior:"smooth",block:"center"}),h&&h.focus()}else ne("/dashboard"),setTimeout(()=>{const h=document.getElementById("ck-dark-input"),m=document.getElementById("ck-dark-cockpit");m&&m.scrollIntoView({behavior:"smooth",block:"center"}),h&&h.focus()},150)});const n=document.getElementById("topbar-user-btn"),s=document.getElementById("user-dropdown-menu");n&&s&&(n.addEventListener("click",h=>{h.stopPropagation(),s.classList.toggle("show")}),document.addEventListener("click",h=>{!s.contains(h.target)&&!n.contains(h.target)&&s.classList.remove("show")}));const o=document.getElementById("dropdown-logout-btn");o&&o.addEventListener("click",async h=>{h.preventDefault();try{await Xn.logout()}catch(m){console.warn("Logout warning:",m)}rs(),ne("/login")});const r=document.getElementById("sidebar-user-card");r&&r.addEventListener("click",()=>{ne("/profile")});const c=document.getElementById("mobile-menu-btn"),d=document.getElementById("sidebar");if(c&&d){const h=m=>{var g;d.classList.toggle("open",m),c.setAttribute("aria-expanded",String(m)),(g=document.getElementById("sidebar-scrim"))==null||g.classList.toggle("show",m)};c.addEventListener("click",m=>{m.stopPropagation(),h(!d.classList.contains("open"))}),(u=document.getElementById("sidebar-scrim"))==null||u.addEventListener("click",()=>h(!1)),document.addEventListener("keydown",m=>{m.key==="Escape"&&h(!1)})}}function st(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const td=1600,id=1024*1024,yr=10*1024*1024;async function br(i){var n,s;if(!i||!/^image\/(jpeg|png|webp|heic|heif)$/i.test(i.type))return i;try{const o=await createImageBitmap(i),r=Math.min(1,td/Math.max(o.width,o.height)),c=/jpe?g/i.test(i.type);if(r===1&&i.size<=id&&c)return(n=o.close)==null||n.call(o),i;const d=document.createElement("canvas");d.width=Math.round(o.width*r),d.height=Math.round(o.height*r),d.getContext("2d").drawImage(o,0,0,d.width,d.height),(s=o.close)==null||s.call(o);const u=await new Promise(m=>d.toBlob(m,"image/jpeg",.82));if(!u||u.size>=i.size&&c)return i;const h=i.name.replace(/\.[^.]+$/,"")+".jpg";return new File([u],h,{type:"image/jpeg",lastModified:Date.now()})}catch{return i}}function Dt(i){return String(i??"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function nd(){if(document.getElementById("summary-editor-styles"))return;const i=document.createElement("style");i.id="summary-editor-styles",i.textContent=`
    .summary-editor { display:flex; flex-direction:column; gap:10px; margin:6px 0 12px; }
    .summary-editor label { display:flex; flex-direction:column; gap:4px; font-size:0.78rem; font-weight:600; opacity:0.85; }
    .summary-editor .se-input { width:100%; box-sizing:border-box; padding:8px 10px; border-radius:8px; font:inherit; font-size:0.875rem;
      color:inherit; background:rgba(127,127,127,0.08); border:1px solid rgba(127,127,127,0.45); }
    .summary-editor .se-input:focus { outline:2px solid rgba(127,127,127,0.6); outline-offset:1px; }
    .summary-editor select.se-input option { color:#111; }
    .summary-editor textarea.se-input { min-height:72px; resize:vertical; }
    .summary-editor .se-hint { font-weight:400; opacity:0.7; }
    /* On the dark home card: light text and fields that stand out. */
    .ck-dark-confirm-card .summary-editor label { color:rgba(255,255,255,0.88); opacity:1; }
    .ck-dark-confirm-card .summary-editor .se-input { color:#fff; background:rgba(255,255,255,0.07); border-color:rgba(255,255,255,0.28); }
    .ck-dark-confirm-card .summary-editor .se-input:focus { outline-color:rgba(255,255,255,0.55); }
    .ck-dark-confirm-card .summary-editor input[type="date"].se-input { color-scheme:dark; }
    /* On the light chat page: the page's own text colours. */
    .agent-confirm-card .summary-editor label { color:var(--text-secondary, #45525b); opacity:1; }
    .agent-confirm-card .summary-editor .se-input { color:var(--text-primary, #14212b); background:var(--surface, #fff); border-color:var(--border-strong, #d3ccc0); }
    /* Parts of the summary card that are switched off while editing (their own CSS sets display). */
    .agent-confirm-card [hidden], .ck-dark-confirm-card [hidden] { display:none !important; }
  `,document.head.appendChild(i)}function ad(i){const n=`class="se-input" data-key="${Dt(i.key)}" data-original="${Dt(i.value)}" data-label="${Dt(i.label)}"`;if(i.type==="choice"&&Array.isArray(i.options)&&i.options.length){const r=i.options.map(d=>`<option value="${Dt(d)}" ${String(d)===String(i.value)?"selected":""}>${Dt(d)}</option>`).join(""),c=i.optional||!i.value?`<option value="" ${i.value?"":"selected"}>${i.optional?"Not given":"Choose…"}</option>`:"";return`<select ${n}>${c}${r}</select>`}if(i.type==="longtext")return`<textarea ${n} maxlength="2000">${Dt(i.value)}</textarea>`;const s={date:"date",number:"number",phone:"tel",email:"email"}[i.type]||"text",o=i.max?` maxlength="${Number(i.max)}"`:' maxlength="2000"';return`<input type="${s}" ${n} value="${Dt(i.value)}"${s==="text"||s==="tel"||s==="email"?o:""}>`}function wr(i){return nd(),`
    <div class="summary-editor" role="group" aria-label="Edit the details before sending">
      ${(Array.isArray(i)?i:[]).map(s=>`
        <label>
          <span>${Dt(s.label)}${s.optional?' <span class="se-hint">(optional)</span>':""}</span>
          ${ad(s)}
        </label>`).join("")}
    </div>`}function xr(i){const n={},s=[];return i.querySelectorAll(".se-input[data-key]").forEach(o=>{const r=String(o.value??"").trim(),c=String(o.getAttribute("data-original")??"").trim();r!==c&&(n[o.getAttribute("data-key")]=r,s.push(`${o.getAttribute("data-label")}: ${r||"(removed)"}`))}),{edits:n,changes:s}}const _r="ck_user_location",kr="ck_location_dismissed",sd="https://nominatim.openstreetmap.org/reverse";function si(){try{const i=sessionStorage.getItem(_r);if(!i)return null;const n=JSON.parse(i);return n&&typeof n.lat=="number"&&typeof n.lng=="number"?n:null}catch{return null}}function od(i){try{sessionStorage.setItem(_r,JSON.stringify({...i,timestamp:Date.now()}))}catch{}}function $r(){return sessionStorage.getItem(kr)==="1"}function rd(){try{sessionStorage.setItem(kr,"1")}catch{}}async function ld(i,n){try{const s=`${sd}?lat=${encodeURIComponent(i)}&lon=${encodeURIComponent(n)}&format=json&zoom=16&addressdetails=1`,o=await fetch(s,{headers:{"User-Agent":"CIVIC-KALKI/1.0 (civic-kalki@example.com)"}});if(!o.ok)throw new Error("Nominatim error");const r=await o.json(),c=r.address||{},d=[c.road||c.pedestrian||c.footway,c.suburb||c.neighbourhood||c.quarter,c.city||c.town||c.village||c.municipality].filter(Boolean);return d.length>0?d.join(", "):r.display_name||`${i.toFixed(4)}, ${n.toFixed(4)}`}catch{return`${i.toFixed(4)}, ${n.toFixed(4)}`}}function On(){return new Promise((i,n)=>{if(!navigator.geolocation){n(new Error("Geolocation not supported by this browser."));return}navigator.geolocation.getCurrentPosition(async s=>{const o=s.coords.latitude,r=s.coords.longitude,c=await ld(o,r),d={lat:o,lng:r,area:c};od(d),i(d)},s=>{n(s)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:6e4})})}function zr(i){if(!i||typeof i.lat!="number")return"";const n=i.lat>=0?"N":"S",s=i.lng>=0?"E":"W";return`[User location: ${i.area} (${Math.abs(i.lat).toFixed(4)}°${n}, ${Math.abs(i.lng).toFixed(4)}°${s})] `}const H={flame:(i=15,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  `,initiative:(i=15,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  `,awareness:(i=15,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="m3 11 18-5v12L3 13v-2z"/>
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
    </svg>
  `,zap:(i=15,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  `,eye:(i=14,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `,handshake:(i=14,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-1.4 1.4"/>
      <path d="m14 14-2.3-2.3a1 1 0 0 0-1.4 0l-4.3 4.3a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l2.6-2.6"/>
      <path d="m18 11 3-3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-3 3"/>
      <path d="m6 13-3 3a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l3-3"/>
    </svg>
  `,user:(i=14,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  `,pin:(i=13,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  `,calendar:(i=14,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  `,alert:(i=15,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  `,sparkles:(i=16,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
    </svg>
  `,smile:(i=16,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" x2="9.01" y1="9" y2="9"/>
      <line x1="15" x2="15.01" y1="9" y2="9"/>
    </svg>
  `,clipboard:(i=16,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <path d="M9 12h6"/>
      <path d="M9 16h6"/>
    </svg>
  `,bot:(i=15,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <rect width="16" height="12" x="4" y="8" rx="2"/>
      <path d="M2 14h2"/>
      <path d="M20 14h2"/>
      <path d="M15 13v2"/>
      <path d="M9 13v2"/>
      <path d="M12 2v6"/>
    </svg>
  `,image:(i=16,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
      <circle cx="9" cy="9" r="2"/>
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  `,link:(i=16,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  `,shareDevice:(i=16,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/>
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
    </svg>
  `,draft:(i=16,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
    </svg>
  `,inbox:(i=32,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
    </svg>
  `,arrowUp:(i=14,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
  `,share:(i=14,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <polyline points="16 6 12 2 8 6"/>
      <line x1="12" y1="2" x2="12" y2="15"/>
    </svg>
  `,check:(i=14,n="currentColor")=>`
    <svg width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="ck-svg-icon" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  `};function cd(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function Qn(i){var c,d,u,h;if(!i||!i.id)return;ve.logEvent(i.id,"share").catch(()=>{});const n=document.getElementById("ck-buzz-share-dialog-root");n&&n.remove();const s=`${window.location.origin}/buzz/${i.id}`,o=document.createElement("div");o.id="ck-buzz-share-dialog-root",o.className="ck-buzz-modal-backdrop",o.innerHTML=`
    <div class="ck-buzz-share-dialog" role="dialog" aria-modal="true">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="display:inline-flex; align-items:center; color:#ff5a36;">${H.share(20,"#ff5a36")}</span>
          <span style="font-weight:800; font-size:1rem; color:#0f172a;">Share Civic Buzz</span>
        </div>
        <button type="button" class="ck-buzz-close-btn" id="ck-share-close-btn" aria-label="Close">✕</button>
      </div>

      <div style="font-size:0.8rem; color:#64748b; margin-top:-4px;">
        Spread civic accountability to your community and social circles.
      </div>

      <!-- Action 1: Download Image -->
      <button type="button" class="ck-buzz-share-item" id="ck-share-download-btn">
        <span style="display:inline-flex; align-items:center; color:#475569;">${H.image(22,"#475569")}</span>
        <div style="text-align:left;">
          <div>Download Card Image</div>
          <div style="font-size:0.72rem; color:#64748b; font-weight:500;">Save high-res PNG to your device</div>
        </div>
      </button>

      <!-- Action 2: Copy Link -->
      <button type="button" class="ck-buzz-share-item" id="ck-share-copy-btn">
        <span style="display:inline-flex; align-items:center; color:#475569;">${H.link(22,"#475569")}</span>
        <div style="text-align:left;">
          <div>Copy Link</div>
          <div style="font-size:0.72rem; color:#64748b; font-weight:500;">${cd(s)}</div>
        </div>
      </button>

      <!-- Action 3: Web Share -->
      <button type="button" class="ck-buzz-share-item" id="ck-share-web-btn">
        <span style="display:inline-flex; align-items:center; color:#475569;">${H.shareDevice(22,"#475569")}</span>
        <div style="text-align:left;">
          <div>Web Share</div>
          <div style="font-size:0.72rem; color:#64748b; font-weight:500;">Share to WhatsApp, X, or other apps</div>
        </div>
      </button>
    </div>
  `,document.body.appendChild(o);const r=()=>o.remove();o.addEventListener("click",m=>{m.target===o&&r()}),(c=o.querySelector("#ck-share-close-btn"))==null||c.addEventListener("click",r),(d=o.querySelector("#ck-share-download-btn"))==null||d.addEventListener("click",async()=>{try{ve.logEvent(i.id,"share").catch(()=>{});const m=i.image_url;if(!m){_t("Post does not have an attached rendered image.");return}const v=await(await fetch(m)).blob(),b=URL.createObjectURL(v),w=document.createElement("a");w.href=b,w.download=`civic-buzz-post-${i.id}.png`,document.body.appendChild(w),w.click(),w.remove(),URL.revokeObjectURL(b),ye("Card image downloaded!"),r()}catch{const m=document.createElement("a");m.href=i.image_url,m.target="_blank",m.download=`civic-buzz-post-${i.id}.png`,document.body.appendChild(m),m.click(),m.remove(),ye("Downloading card image..."),r()}}),(u=o.querySelector("#ck-share-copy-btn"))==null||u.addEventListener("click",async()=>{try{ve.logEvent(i.id,"share").catch(()=>{}),await navigator.clipboard.writeText(s),ye("Link copied to clipboard!"),r()}catch{window.prompt("Copy this Civic Buzz link:",s),r()}}),(h=o.querySelector("#ck-share-web-btn"))==null||h.addEventListener("click",async()=>{if(ve.logEvent(i.id,"share").catch(()=>{}),navigator.share)try{await navigator.share({title:`CIVIC BUZZ: ${i.linked_title||"Civic Issue"}`,text:`"${i.caption}" — Check this civic conversation on CIVIC-KALKI:`,url:s}),ye("Shared successfully!"),r()}catch(g){g.name!=="AbortError"&&m()}else{const g=encodeURIComponent(`CIVIC BUZZ: "${i.caption}"
${s}`);window.open(`https://api.whatsapp.com/send?text=${g}`,"_blank"),r()}function m(){navigator.clipboard.writeText(s).then(()=>{ye("Link copied to clipboard!")}),r()}})}function dd(i,n){if(i.match(/^[a-z]+:\/\//i))return i;if(i.match(/^\/\//))return window.location.protocol+i;if(i.match(/^[a-z]+:/i))return i;const s=document.implementation.createHTMLDocument(),o=s.createElement("base"),r=s.createElement("a");return s.head.appendChild(o),s.body.appendChild(r),n&&(o.href=n),r.href=i,r.href}const ud=(()=>{let i=0;const n=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(i+=1,`u${n()}${i}`)})();function Wt(i){const n=[];for(let s=0,o=i.length;s<o;s++)n.push(i[s]);return n}let wi=null;function Lr(i={}){return wi||(i.includeStyleProperties?(wi=i.includeStyleProperties,wi):(wi=Wt(window.getComputedStyle(document.documentElement)),wi))}function jn(i,n){const o=(i.ownerDocument.defaultView||window).getComputedStyle(i).getPropertyValue(n);return o?parseFloat(o.replace("px","")):0}function pd(i){const n=jn(i,"border-left-width"),s=jn(i,"border-right-width");return i.clientWidth+n+s}function hd(i){const n=jn(i,"border-top-width"),s=jn(i,"border-bottom-width");return i.clientHeight+n+s}function Er(i,n={}){const s=n.width||pd(i),o=n.height||hd(i);return{width:s,height:o}}function md(){let i,n;try{n=process}catch{}const s=n&&n.env?n.env.devicePixelRatio:null;return s&&(i=parseInt(s,10),Number.isNaN(i)&&(i=1)),i||window.devicePixelRatio||1}const Ke=16384;function fd(i){(i.width>Ke||i.height>Ke)&&(i.width>Ke&&i.height>Ke?i.width>i.height?(i.height*=Ke/i.width,i.width=Ke):(i.width*=Ke/i.height,i.height=Ke):i.width>Ke?(i.height*=Ke/i.width,i.width=Ke):(i.width*=Ke/i.height,i.height=Ke))}function Nn(i){return new Promise((n,s)=>{const o=new Image;o.onload=()=>{o.decode().then(()=>{requestAnimationFrame(()=>n(o))})},o.onerror=s,o.crossOrigin="anonymous",o.decoding="async",o.src=i})}async function gd(i){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(i)).then(encodeURIComponent).then(n=>`data:image/svg+xml;charset=utf-8,${n}`)}async function vd(i,n,s){const o="http://www.w3.org/2000/svg",r=document.createElementNS(o,"svg"),c=document.createElementNS(o,"foreignObject");return r.setAttribute("width",`${n}`),r.setAttribute("height",`${s}`),r.setAttribute("viewBox",`0 0 ${n} ${s}`),c.setAttribute("width","100%"),c.setAttribute("height","100%"),c.setAttribute("x","0"),c.setAttribute("y","0"),c.setAttribute("externalResourcesRequired","true"),r.appendChild(c),c.appendChild(i),gd(r)}const Ge=(i,n)=>{if(i instanceof n)return!0;const s=Object.getPrototypeOf(i);return s===null?!1:s.constructor.name===n.name||Ge(s,n)};function yd(i){const n=i.getPropertyValue("content");return`${i.cssText} content: '${n.replace(/'|"/g,"")}';`}function bd(i,n){return Lr(n).map(s=>{const o=i.getPropertyValue(s),r=i.getPropertyPriority(s);return`${s}: ${o}${r?" !important":""};`}).join(" ")}function wd(i,n,s,o){const r=`.${i}:${n}`,c=s.cssText?yd(s):bd(s,o);return document.createTextNode(`${r}{${c}}`)}function Po(i,n,s,o){const r=window.getComputedStyle(i,s),c=r.getPropertyValue("content");if(c===""||c==="none")return;const d=ud();try{n.className=`${n.className} ${d}`}catch{return}const u=document.createElement("style");u.appendChild(wd(d,s,r,o)),n.appendChild(u)}function xd(i,n,s){Po(i,n,":before",s),Po(i,n,":after",s)}const Bo="application/font-woff",Ro="image/jpeg",_d={woff:Bo,woff2:Bo,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:Ro,jpeg:Ro,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml",webp:"image/webp"};function kd(i){const n=/\.([^./]*?)$/g.exec(i);return n?n[1]:""}function ds(i){const n=kd(i).toLowerCase();return _d[n]||""}function $d(i){return i.split(/,/)[1]}function Qa(i){return i.search(/^(data:)/)!==-1}function zd(i,n){return`data:${n};base64,${i}`}async function Cr(i,n,s){const o=await fetch(i,n);if(o.status===404)throw new Error(`Resource "${o.url}" not found`);const r=await o.blob();return new Promise((c,d)=>{const u=new FileReader;u.onerror=d,u.onloadend=()=>{try{c(s({res:o,result:u.result}))}catch(h){d(h)}},u.readAsDataURL(r)})}const Da={};function Ld(i,n,s){let o=i.replace(/\?.*/,"");return s&&(o=i),/ttf|otf|eot|woff2?/i.test(o)&&(o=o.replace(/.*\//,"")),n?`[${n}]${o}`:o}async function us(i,n,s){const o=Ld(i,n,s.includeQueryParams);if(Da[o]!=null)return Da[o];s.cacheBust&&(i+=(/\?/.test(i)?"&":"?")+new Date().getTime());let r;try{const c=await Cr(i,s.fetchRequestInit,({res:d,result:u})=>(n||(n=d.headers.get("Content-Type")||""),$d(u)));r=zd(c,n)}catch(c){r=s.imagePlaceholder||"";let d=`Failed to fetch resource: ${i}`;c&&(d=typeof c=="string"?c:c.message),d&&console.warn(d)}return Da[o]=r,r}async function Ed(i){const n=i.toDataURL();return n==="data:,"?i.cloneNode(!1):Nn(n)}async function Cd(i,n){if(i.currentSrc){const c=document.createElement("canvas"),d=c.getContext("2d");c.width=i.clientWidth,c.height=i.clientHeight,d==null||d.drawImage(i,0,0,c.width,c.height);const u=c.toDataURL();return Nn(u)}const s=i.poster,o=ds(s),r=await us(s,o,n);return Nn(r)}async function Sd(i,n){var s;try{if(!((s=i==null?void 0:i.contentDocument)===null||s===void 0)&&s.body)return await ea(i.contentDocument.body,n,!0)}catch{}return i.cloneNode(!1)}async function Td(i,n){return Ge(i,HTMLCanvasElement)?Ed(i):Ge(i,HTMLVideoElement)?Cd(i,n):Ge(i,HTMLIFrameElement)?Sd(i,n):i.cloneNode(Sr(i))}const Md=i=>i.tagName!=null&&i.tagName.toUpperCase()==="SLOT",Sr=i=>i.tagName!=null&&i.tagName.toUpperCase()==="SVG";async function Ad(i,n,s){var o,r;if(Sr(n))return n;let c=[];return Md(i)&&i.assignedNodes?c=Wt(i.assignedNodes()):Ge(i,HTMLIFrameElement)&&(!((o=i.contentDocument)===null||o===void 0)&&o.body)?c=Wt(i.contentDocument.body.childNodes):c=Wt(((r=i.shadowRoot)!==null&&r!==void 0?r:i).childNodes),c.length===0||Ge(i,HTMLVideoElement)||await c.reduce((d,u)=>d.then(()=>ea(u,s)).then(h=>{h&&n.appendChild(h)}),Promise.resolve()),n}function Id(i,n,s){const o=n.style;if(!o)return;const r=window.getComputedStyle(i);r.cssText?(o.cssText=r.cssText,o.transformOrigin=r.transformOrigin):Lr(s).forEach(c=>{let d=r.getPropertyValue(c);c==="font-size"&&d.endsWith("px")&&(d=`${Math.floor(parseFloat(d.substring(0,d.length-2)))-.1}px`),Ge(i,HTMLIFrameElement)&&c==="display"&&d==="inline"&&(d="block"),c==="d"&&n.getAttribute("d")&&(d=`path(${n.getAttribute("d")})`),o.setProperty(c,d,r.getPropertyPriority(c))})}function Pd(i,n){Ge(i,HTMLTextAreaElement)&&(n.innerHTML=i.value),Ge(i,HTMLInputElement)&&n.setAttribute("value",i.value)}function Bd(i,n){if(Ge(i,HTMLSelectElement)){const s=n,o=Array.from(s.children).find(r=>i.value===r.getAttribute("value"));o&&o.setAttribute("selected","")}}function Rd(i,n,s){return Ge(n,Element)&&(Id(i,n,s),xd(i,n,s),Pd(i,n),Bd(i,n)),n}async function Od(i,n){const s=i.querySelectorAll?i.querySelectorAll("use"):[];if(s.length===0)return i;const o={};for(let c=0;c<s.length;c++){const u=s[c].getAttribute("xlink:href");if(u){const h=i.querySelector(u),m=document.querySelector(u);!h&&m&&!o[u]&&(o[u]=await ea(m,n,!0))}}const r=Object.values(o);if(r.length){const c="http://www.w3.org/1999/xhtml",d=document.createElementNS(c,"svg");d.setAttribute("xmlns",c),d.style.position="absolute",d.style.width="0",d.style.height="0",d.style.overflow="hidden",d.style.display="none";const u=document.createElementNS(c,"defs");d.appendChild(u);for(let h=0;h<r.length;h++)u.appendChild(r[h]);i.appendChild(d)}return i}async function ea(i,n,s){return!s&&n.filter&&!n.filter(i)?null:Promise.resolve(i).then(o=>Td(o,n)).then(o=>Ad(i,o,n)).then(o=>Rd(i,o,n)).then(o=>Od(o,n))}const Tr=/url\((['"]?)([^'"]+?)\1\)/g,jd=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,Nd=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function Hd(i){const n=i.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${n})(['"]?\\))`,"g")}function Dd(i){const n=[];return i.replace(Tr,(s,o,r)=>(n.push(r),s)),n.filter(s=>!Qa(s))}async function Fd(i,n,s,o,r){try{const c=s?dd(n,s):n,d=ds(n);let u;return r||(u=await us(c,d,o)),i.replace(Hd(n),`$1${u}$3`)}catch{}return i}function qd(i,{preferredFontFormat:n}){return n?i.replace(Nd,s=>{for(;;){const[o,,r]=jd.exec(s)||[];if(!r)return"";if(r===n)return`src: ${o};`}}):i}function Mr(i){return i.search(Tr)!==-1}async function Ar(i,n,s){if(!Mr(i))return i;const o=qd(i,s);return Dd(o).reduce((c,d)=>c.then(u=>Fd(u,d,n,s)),Promise.resolve(o))}async function xi(i,n,s){var o;const r=(o=n.style)===null||o===void 0?void 0:o.getPropertyValue(i);if(r){const c=await Ar(r,null,s);return n.style.setProperty(i,c,n.style.getPropertyPriority(i)),!0}return!1}async function Ud(i,n){await xi("background",i,n)||await xi("background-image",i,n),await xi("mask",i,n)||await xi("-webkit-mask",i,n)||await xi("mask-image",i,n)||await xi("-webkit-mask-image",i,n)}async function Zd(i,n){const s=Ge(i,HTMLImageElement);if(!(s&&!Qa(i.src))&&!(Ge(i,SVGImageElement)&&!Qa(i.href.baseVal)))return;const o=s?i.src:i.href.baseVal,r=await us(o,ds(o),n);await new Promise((c,d)=>{i.onload=c,i.onerror=n.onImageErrorHandler?(...h)=>{try{c(n.onImageErrorHandler(...h))}catch(m){d(m)}}:d;const u=i;u.decode&&(u.decode=c),u.loading==="lazy"&&(u.loading="eager"),s?(i.srcset="",i.src=r):i.href.baseVal=r})}async function Vd(i,n){const o=Wt(i.childNodes).map(r=>Ir(r,n));await Promise.all(o).then(()=>i)}async function Ir(i,n){Ge(i,Element)&&(await Ud(i,n),await Zd(i,n),await Vd(i,n))}function Wd(i,n){const{style:s}=i;n.backgroundColor&&(s.backgroundColor=n.backgroundColor),n.width&&(s.width=`${n.width}px`),n.height&&(s.height=`${n.height}px`);const o=n.style;return o!=null&&Object.keys(o).forEach(r=>{s[r]=o[r]}),i}const Oo={};async function jo(i){let n=Oo[i];if(n!=null)return n;const o=await(await fetch(i)).text();return n={url:i,cssText:o},Oo[i]=n,n}async function No(i,n){let s=i.cssText;const o=/url\(["']?([^"')]+)["']?\)/g,c=(s.match(/url\([^)]+\)/g)||[]).map(async d=>{let u=d.replace(o,"$1");return u.startsWith("https://")||(u=new URL(u,i.url).href),Cr(u,n.fetchRequestInit,({result:h})=>(s=s.replace(d,`url(${h})`),[d,h]))});return Promise.all(c).then(()=>s)}function Ho(i){if(i==null)return[];const n=[],s=/(\/\*[\s\S]*?\*\/)/gi;let o=i.replace(s,"");const r=new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi");for(;;){const h=r.exec(o);if(h===null)break;n.push(h[0])}o=o.replace(r,"");const c=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,d="((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",u=new RegExp(d,"gi");for(;;){let h=c.exec(o);if(h===null){if(h=u.exec(o),h===null)break;c.lastIndex=u.lastIndex}else u.lastIndex=c.lastIndex;n.push(h[0])}return n}async function Gd(i,n){const s=[],o=[];return i.forEach(r=>{if("cssRules"in r)try{Wt(r.cssRules||[]).forEach((c,d)=>{if(c.type===CSSRule.IMPORT_RULE){let u=d+1;const h=c.href,m=jo(h).then(g=>No(g,n)).then(g=>Ho(g).forEach(v=>{try{r.insertRule(v,v.startsWith("@import")?u+=1:r.cssRules.length)}catch(b){console.error("Error inserting rule from remote css",{rule:v,error:b})}})).catch(g=>{console.error("Error loading remote css",g.toString())});o.push(m)}})}catch(c){const d=i.find(u=>u.href==null)||document.styleSheets[0];r.href!=null&&o.push(jo(r.href).then(u=>No(u,n)).then(u=>Ho(u).forEach(h=>{d.insertRule(h,d.cssRules.length)})).catch(u=>{console.error("Error loading remote stylesheet",u)})),console.error("Error inlining remote css file",c)}}),Promise.all(o).then(()=>(i.forEach(r=>{if("cssRules"in r)try{Wt(r.cssRules||[]).forEach(c=>{s.push(c)})}catch(c){console.error(`Error while reading CSS rules from ${r.href}`,c)}}),s))}function Kd(i){return i.filter(n=>n.type===CSSRule.FONT_FACE_RULE).filter(n=>Mr(n.style.getPropertyValue("src")))}async function Yd(i,n){if(i.ownerDocument==null)throw new Error("Provided element is not within a Document");const s=Wt(i.ownerDocument.styleSheets),o=await Gd(s,n);return Kd(o)}function Pr(i){return i.trim().replace(/["']/g,"")}function Jd(i){const n=new Set;function s(o){(o.style.fontFamily||getComputedStyle(o).fontFamily).split(",").forEach(c=>{n.add(Pr(c))}),Array.from(o.children).forEach(c=>{c instanceof HTMLElement&&s(c)})}return s(i),n}async function Xd(i,n){const s=await Yd(i,n),o=Jd(i);return(await Promise.all(s.filter(c=>o.has(Pr(c.style.fontFamily))).map(c=>{const d=c.parentStyleSheet?c.parentStyleSheet.href:null;return Ar(c.cssText,d,n)}))).join(`
`)}async function Qd(i,n){const s=n.fontEmbedCSS!=null?n.fontEmbedCSS:n.skipFonts?null:await Xd(i,n);if(s){const o=document.createElement("style"),r=document.createTextNode(s);o.appendChild(r),i.firstChild?i.insertBefore(o,i.firstChild):i.appendChild(o)}}async function eu(i,n={}){const{width:s,height:o}=Er(i,n),r=await ea(i,n,!0);return await Qd(r,n),await Ir(r,n),Wd(r,n),await vd(r,s,o)}async function tu(i,n={}){const{width:s,height:o}=Er(i,n),r=await eu(i,n),c=await Nn(r),d=document.createElement("canvas"),u=d.getContext("2d"),h=n.pixelRatio||md(),m=n.canvasWidth||s,g=n.canvasHeight||o;return d.width=m*h,d.height=g*h,n.skipAutoScale||fd(d),d.style.width=`${m}`,d.style.height=`${g}`,n.backgroundColor&&(u.fillStyle=n.backgroundColor,u.fillRect(0,0,d.width,d.height)),u.drawImage(c,0,0,d.width,d.height),d}async function iu(i,n={}){return(await tu(i,n)).toDataURL()}function ze(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const Hn='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230f172a"/><stop offset="50%" stop-color="%231e293b"/><stop offset="100%" stop-color="%23ea580c"/></linearGradient><pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 20 L40 20 M20 0 L20 40" stroke="rgba(255,255,255,0.04)" stroke-width="1"/></pattern></defs><rect width="800" height="800" fill="url(%23g)"/><rect width="800" height="800" fill="url(%23p)"/><circle cx="400" cy="400" r="260" fill="none" stroke="rgba(255,90,54,0.15)" stroke-width="3" stroke-dasharray="8 8"/><text x="400" y="415" font-family="system-ui,-apple-system,sans-serif" font-weight="900" font-size="32" fill="rgba(255,255,255,0.2)" text-anchor="middle" letter-spacing="4">CIVIC KALKI</text></svg>';function nu(i=""){const n=String(i).trim();if(!n)return{top:"",bottom:""};if(n.includes(`
`)){const c=n.split(`
`).filter(Boolean);return{top:c[0]||"",bottom:c.slice(1).join(" ")||""}}if(n.includes(" // ")){const[c,...d]=n.split(" // ");return{top:c,bottom:d.join(" // ")}}const s=n.split(new RegExp("(?<=[.?!])\\s+"));if(s.length>=2)return{top:s[0],bottom:s.slice(1).join(" ")};const o=n.split(/\s+/);if(o.length<=4)return{top:"",bottom:n};const r=Math.ceil(o.length/2);return{top:o.slice(0,r).join(" "),bottom:o.slice(r).join(" ")}}function Br({template:i="meme",style:n="funny",caption:s="",cta_text:o="",issue:r={},imageUrl:c=null}){const d=c||r.image_url||Hn,u=r.name||r.title||"Civic Issue",h=r.area||"City Ward",m=r.status||"Active",g=r.entity_id||r.id||"—";i==="initiative"||r.entity_type_id===2||r.type;const v=`
    <div class="ck-card-watermark">
      <span class="ck-wm-flame">${H.flame(14,"#ff5a36")}</span>
      <span class="ck-wm-brand">CIVIC-KALKI</span>
    </div>
  `;if(i==="meme"){const{top:w,bottom:$}=nu(s),x=o||"Take Civic Action";return`
      <div class="ck-card-canvas ck-template-meme" data-template="meme" data-style="${ze(n)}">
        <div class="ck-card-bg-layer" style="background-image: url('${ze(d)}');"></div>
        <div class="ck-card-meme-overlay"></div>
        
        ${v}

        <div class="ck-meme-top-bar">
          <span class="ck-meme-issue-tag" style="display:inline-flex; align-items:center; gap:4px;">${H.pin(12,"currentColor")} ${ze(h)} · #${ze(g)}</span>
        </div>

        <div class="ck-meme-text-top">
          ${ze(w)}
        </div>

        <div class="ck-meme-bottom-wrap">
          <div class="ck-meme-text-bottom">
            ${ze($||w?$:s)}
          </div>
          ${x?`<div class="ck-meme-cta-pill" style="display:inline-flex; align-items:center; gap:5px;">${H.zap(12,"#ea580c")} ${ze(x)}</div>`:""}
        </div>
      </div>
    `}if(i==="awareness"){const w=o||"Demand Immediate Fix";return`
      <div class="ck-card-canvas ck-template-awareness" data-template="awareness" data-style="${ze(n)}">
        <div class="ck-card-bg-layer" style="background-image: url('${ze(d)}');"></div>
        <div class="ck-awareness-scrim"></div>

        ${v}

        <!-- Top Header Banner -->
        <div class="ck-awareness-header">
          <div class="ck-awareness-badge">
            <span class="ck-pulse-dot"></span>
            <span>CIVIC AWARENESS BULLETIN</span>
          </div>
          <div class="ck-awareness-id">#${ze(g)}</div>
        </div>

        <!-- Main Caption Headline -->
        <div class="ck-awareness-headline-box">
          <div class="ck-awareness-title">${ze(u)}</div>
          <div class="ck-awareness-caption">"${ze(s)}"</div>
        </div>

        <!-- Fact Strip -->
        <div class="ck-awareness-fact-strip">
          <div class="ck-fact-item">
            <span class="ck-fact-label">LOCATION</span>
            <span class="ck-fact-value" style="display:inline-flex; align-items:center; gap:4px;">${H.pin(12,"#38bdf8")} ${ze(h)}</span>
          </div>
          <div class="ck-fact-item">
            <span class="ck-fact-label">STATUS</span>
            <span class="ck-fact-value ck-status-${ze(m).toLowerCase()}">${ze(m)}</span>
          </div>
          <div class="ck-fact-item">
            <span class="ck-fact-label">JURISDICTION</span>
            <span class="ck-fact-value">Municipal Corp</span>
          </div>
        </div>

        <!-- Call to Action Strip -->
        <div class="ck-awareness-cta-strip">
          <div class="ck-awareness-cta-text" style="display:inline-flex; align-items:center; gap:6px;">
            <span style="display:inline-flex; align-items:center;">${H.awareness(16,"#38bdf8")}</span> ${ze(w)}
          </div>
          <div class="ck-awareness-cta-btn">ACT NOW →</div>
        </div>
      </div>
    `}const b=o||"Join The Community Action";return`
    <div class="ck-card-canvas ck-template-initiative" data-template="initiative" data-style="${ze(n)}">
      <div class="ck-card-bg-layer" style="background-image: url('${ze(d)}');"></div>
      <div class="ck-initiative-scrim"></div>

      ${v}

      <!-- Top Initiative Banner -->
      <div class="ck-initiative-header">
        <div class="ck-initiative-tag" style="display:inline-flex; align-items:center; gap:6px;">
          ${H.initiative(14,"#4ade80")} COMMUNITY INITIATIVE
        </div>
        <span class="ck-initiative-phase">Active Movement</span>
      </div>

      <!-- Main Initiative Callout -->
      <div class="ck-initiative-body">
        <div class="ck-initiative-title">${ze(u)}</div>
        <div class="ck-initiative-caption">"${ze(s)}"</div>
      </div>

      <!-- Date & Place Strip -->
      <div class="ck-initiative-strip">
        <div class="ck-init-info-pill">
          <span class="ck-init-icon" style="display:inline-flex; align-items:center;">${H.calendar(16,"#4ade80")}</span>
          <div>
            <div class="ck-init-sub">TIMELINE</div>
            <div class="ck-init-main">This Weekend & Ongoing</div>
          </div>
        </div>
        <div class="ck-init-info-pill">
          <span class="ck-init-icon" style="display:inline-flex; align-items:center;">${H.pin(16,"#4ade80")}</span>
          <div>
            <div class="ck-init-sub">MEETING POINT</div>
            <div class="ck-init-main">${ze(h)}</div>
          </div>
        </div>
      </div>

      <!-- Prominent "Join" Strip -->
      <div class="ck-initiative-join-strip">
        <div class="ck-join-cta-content">
          <span class="ck-join-badge" style="display:inline-flex; align-items:center; gap:4px;">${H.zap(12,"#15803d")} VOLUNTEER</span>
          <span class="ck-join-text">${ze(b)}</span>
        </div>
        <button type="button" class="ck-join-action-btn" style="display:inline-flex; align-items:center; gap:6px;">
          <span>Join Now</span> <span style="display:inline-flex; align-items:center;">${H.handshake(14,"#ffffff")}</span>
        </button>
      </div>
    </div>
  `}async function au(i){if(!i)throw new Error("DOM node is required for PNG rendering.");return await iu(i,{quality:.95,pixelRatio:2,skipFonts:!1,cacheBust:!0})}function Le(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}async function Rr(i,n=null){var _,P,R,B,V,N;const s=document.getElementById("ck-buzz-detail-modal-root");s&&s.remove();const o=He(),r=i.linked_type==="initiative",c=i.image_url||Hn,d=document.createElement("div");d.id="ck-buzz-detail-modal-root",d.className="ck-buzz-modal-backdrop",d.innerHTML=`
    <div class="ck-buzz-modal-dialog" role="dialog" aria-modal="true">
      <!-- Modal Header -->
      <div class="ck-buzz-modal-topbar">
        <div class="ck-buzz-modal-title-wrap">
          <span class="ck-buzz-fire-tag">${H.flame(13,"#ea580c")} CIVIC BUZZ</span>
          <span class="ck-buzz-status-pill ${Le(i.linked_status||"submitted")}">
            ${Le(i.linked_status||"Active")}
          </span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <!-- Overflow Report Menu -->
          <button type="button" class="ck-buzz-icon-btn" id="ck-modal-report-btn" title="Report this post" aria-label="Report this post">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
          </button>
          <button type="button" class="ck-buzz-close-btn" id="ck-modal-close-btn" aria-label="Close modal">✕</button>
        </div>
      </div>

      <!-- Scrollable Modal Body -->
      <div class="ck-buzz-modal-body">
        <!-- Media / Card Showcase -->
        <div class="ck-buzz-modal-meme-frame">
          <img src="${Le(c)}" alt="${Le(i.caption)}" class="ck-buzz-modal-img" onerror="this.src='${Hn}'" />
          <div class="ck-buzz-modal-scrim"></div>
          <div class="ck-buzz-modal-meme-caption">
            ${Le(i.caption)}
          </div>
          ${i.cta_text?`<div class="ck-buzz-modal-cta-badge">${H.zap(12,"#ea580c")} ${Le(i.cta_text)}</div>`:""}
          <div class="ck-card-watermark">
            <span class="ck-wm-flame">${H.flame(14,"var(--primary)")}</span>
            <span class="ck-wm-brand">CIVIC-KALKI</span>
          </div>
        </div>

        <!-- Meta and Linked Issue Banner -->
        <div class="ck-buzz-modal-linked-box">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--primary); letter-spacing: 0.05em;">
              Linked ${Le(i.linked_type||"Issue")} #${Le(i.linked_id)}
            </div>
            <div style="font-size: 0.96rem; font-weight: 700; color: #0f172a; margin-top: 2px;" class="ck-truncate">
              ${Le(i.linked_title||i.caption)}
            </div>
            ${i.linked_area?`<div style="font-size: 0.75rem; color: #64748b; display:inline-flex; align-items:center; gap:4px;">${H.pin(13,"#64748b")} ${Le(i.linked_area)}</div>`:""}
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="ck-modal-view-issue-btn" style="border-radius: 999px; font-weight: 700;">
            View Issue →
          </button>
        </div>

        <!-- Engagement Action Buttons Row -->
        <div class="ck-buzz-modal-actions-bar">
          ${ri()?`
          <button type="button" class="ck-buzz-act-btn ${i.has_voted?"active":""}" id="ck-modal-upvote-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            <span id="ck-modal-vote-label">${i.has_voted?"Upvoted":"Upvote"}</span>
            <span class="ck-buzz-count-badge" id="ck-modal-vote-count">${i.vote_count||0}</span>
          </button>

          <button type="button" class="ck-buzz-act-btn ${i.is_following?"active":""}" id="ck-modal-follow-btn">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            <span id="ck-modal-follow-label">${i.is_following?"Following Status":"Follow Status"}</span>
          </button>
          `:""}

          <button type="button" class="ck-buzz-act-btn" id="ck-modal-share-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            <span>Share</span>
          </button>

          ${r?`
            <button type="button" class="ck-buzz-act-btn ck-buzz-join-btn" id="ck-modal-join-btn">
              ${H.handshake(15,"#15803d")} <span>Join / Volunteer</span>
            </button>
          `:""}

          <button type="button" class="ck-buzz-act-btn" id="ck-modal-report-issue-btn" title="Report or escalate this civic issue via Civic Assistant">
            ${H.alert(14,"#ef4444")} <span>Report Issue</span>
          </button>
        </div>

        <!-- Community Comments Section -->
        <div class="ck-buzz-comments-section">
          <div class="ck-buzz-comments-head">
            <h4 style="margin: 0; font-size: 0.92rem; font-weight: 700; color: #0f172a;">Community Comments</h4>
            <span style="font-size: 0.75rem; color: #64748b;" id="ck-modal-comments-count">Loading...</span>
          </div>

          <!-- Comment Input -->
          <div class="ck-buzz-comment-input-row">
            <input
              type="text"
              id="ck-modal-comment-input"
              class="ck-buzz-comment-input"
              placeholder="${o?"Add to the conversation (respectful, problem-focused)...":"Sign in to add a comment..."}"
              ${o?"":"disabled"}
              maxlength="500"
            />
            <button type="button" id="ck-modal-comment-send" class="btn btn-primary btn-sm" style="border-radius: 999px; padding: 6px 14px;" ${o?"":"disabled"}>
              Post
            </button>
          </div>
          <div id="ck-modal-comment-error" class="ck-buzz-inline-alert" style="display: none;"></div>

          <!-- Comments List Container -->
          <div id="ck-modal-comments-list" class="ck-buzz-comments-list">
            <div style="text-align: center; padding: 18px; color: #94a3b8; font-size: 0.8rem;">
              Loading conversation...
            </div>
          </div>
        </div>
      </div>
    </div>
  `,document.body.appendChild(d);const u=()=>d.remove();d.addEventListener("click",A=>{A.target===d&&u()}),(_=d.querySelector("#ck-modal-close-btn"))==null||_.addEventListener("click",u);const h=d.querySelector("#ck-modal-upvote-btn"),m=d.querySelector("#ck-modal-vote-count"),g=d.querySelector("#ck-modal-vote-label");h==null||h.addEventListener("click",async()=>{if(!He()){_t("Please sign in to upvote."),ne("/login");return}try{const A=await ve.vote(i.id);A.voted?(h.classList.add("active"),g.textContent="Upvoted"):(h.classList.remove("active"),g.textContent="Upvote"),m.textContent=A.vote_count,i.has_voted=A.voted,i.vote_count=A.vote_count,typeof n=="function"&&n(i)}catch(A){te(A.message||"Could not register vote")}});const v=d.querySelector("#ck-modal-follow-btn"),b=d.querySelector("#ck-modal-follow-label");v==null||v.addEventListener("click",async()=>{if(!He()){_t("Please sign in to follow this conversation."),ne("/login");return}try{const A=await ve.follow(i.id);A.following?(v.classList.add("active"),b.textContent="Following Status",ye("Now following civic issue updates!")):(v.classList.remove("active"),b.textContent="Follow Status",toast("Unfollowed issue updates.")),i.is_following=A.following,typeof n=="function"&&n(i)}catch(A){te(A.message||"Could not update follow status")}}),(P=d.querySelector("#ck-modal-view-issue-btn"))==null||P.addEventListener("click",()=>{ve.logEvent(i.id,"click_issue").catch(()=>{}),u(),ne(`/entities/${i.linked_id}`)}),(R=d.querySelector("#ck-modal-share-btn"))==null||R.addEventListener("click",()=>{Qn(i)}),(B=d.querySelector("#ck-modal-join-btn"))==null||B.addEventListener("click",async()=>{try{await ve.logEvent(i.id,"join"),ye("Thank you for volunteering! Opening initiative details..."),setTimeout(()=>{u(),ne(`/entities/${i.linked_id}`)},700)}catch{ne(`/entities/${i.linked_id}`)}}),(V=d.querySelector("#ck-modal-report-issue-btn"))==null||V.addEventListener("click",()=>{u(),ne("/dashboard"),setTimeout(()=>{const A=document.getElementById("ck-dark-input");A&&(A.value=`Regarding issue #${i.linked_id} (${i.linked_title||i.caption}): `,A.focus())},200)}),(N=d.querySelector("#ck-modal-report-btn"))==null||N.addEventListener("click",()=>{const A=window.prompt(`Why are you reporting this Civic Buzz post?
(e.g., Offensive language, personal data, misleading claim)`);A&&A.trim()&&ve.report(i.id,A.trim()).then(q=>{ye(q.message||"Report received. Thank you for keeping our community safe.")}).catch(q=>{te(q.message||"Could not submit report")})});async function w(){const A=d.querySelector("#ck-modal-comments-list"),q=d.querySelector("#ck-modal-comments-count");try{const Y=(await ve.getComments(i.id)).data||[];if(q.textContent=`${Y.length} comment${Y.length===1?"":"s"}`,Y.length===0){A.innerHTML=`
          <div style="text-align:center; padding:16px; color:#94a3b8; font-size:0.8rem;">
            No comments yet. Start the conversation!
          </div>
        `;return}A.innerHTML=Y.map(oe=>`
        <div class="ck-buzz-comment-item">
          <div class="ck-buzz-comment-meta">
            <span class="ck-buzz-comment-author" style="display:inline-flex; align-items:center; gap:4px;">${H.user(13,"#64748b")} ${Le(oe.author_name)}</span>
            <span class="ck-buzz-comment-time">${new Date(oe.created_at).toLocaleDateString()}</span>
          </div>
          <div class="ck-buzz-comment-text">${Le(oe.text)}</div>
        </div>
      `).join("")}catch{A.innerHTML='<div style="text-align:center; padding:12px; color:#ef4444; font-size:0.75rem;">Failed to load comments</div>'}}const $=d.querySelector("#ck-modal-comment-input"),x=d.querySelector("#ck-modal-comment-send"),T=d.querySelector("#ck-modal-comment-error");async function E(){var q;const A=$.value.trim();if(A){T.style.display="none",x.disabled=!0;try{await ve.addComment(i.id,A),$.value="",ye("Comment posted!"),await w()}catch(J){T.textContent=((q=J.data)==null?void 0:q.message)||J.message||"Failed to submit comment",T.style.display="block"}finally{x.disabled=!1}}}x==null||x.addEventListener("click",E),$==null||$.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),E())}),await w()}async function en(i=null,n=null,s=null){const o=document.getElementById("ck-buzz-create-modal-root");o&&o.remove();const r=He();if(!r){_t("Please sign in to create a Civic Buzz post."),ne("/login");return}let c=[];try{const[_,P]=await Promise.all([fe.list({owner_user_id:r.user_id,limit:50}).catch(()=>({data:[]})),fe.list({limit:50}).catch(()=>({data:[]}))]),R=new Map;(_.data||[]).forEach(B=>R.set(B.entity_id,{...B,is_mine:!0})),(P.data||[]).forEach(B=>{R.has(B.entity_id)||R.set(B.entity_id,{...B,is_mine:!1})}),c=Array.from(R.values())}catch{c=[]}let d=s?4:1,u=s?s.template==="initiative"?"promote_initiative":s.template==="awareness"?"awareness_card":"meme_issue":"meme_issue",h=null,m=(s==null?void 0:s.style)||"funny",g=[],v=(s==null?void 0:s.caption)||"",b=(s==null?void 0:s.cta_text)||"",w=null;i?h=c.find(_=>String(_.entity_id)===String(i))||null:s!=null&&s.linked_id&&(h=c.find(_=>String(_.entity_id)===String(s.linked_id))||null),!h&&c.length>0&&(h=c[0]);function $(){return u==="promote_initiative"?{template:"initiative",linked_type:"initiative"}:u==="awareness_card"?{template:"awareness",linked_type:"issue"}:u==="share_issue"?{template:"awareness",linked_type:"issue"}:{template:"meme",linked_type:"issue"}}const x=document.createElement("div");x.id="ck-buzz-create-modal-root",x.className="ck-buzz-modal-backdrop",document.body.appendChild(x);const T=()=>x.remove();x.addEventListener("click",_=>{_.target===x&&T()});async function E(){var B,V,N,A,q,J,Y,oe;const{template:_,linked_type:P}=$();x.innerHTML=`
      <div class="ck-buzz-modal-dialog" role="dialog" aria-modal="true" style="max-width: 620px; border-radius: 20px;">
        <!-- Top bar with Title & Close -->
        <div class="ck-buzz-modal-topbar" style="padding: 16px 22px;">
          <div class="ck-buzz-modal-title-wrap">
            <span style="display:inline-flex; align-items:center; color:var(--primary);">${H.sparkles(20,"var(--primary)")}</span>
            <span style="font-weight: 800; font-size: 1.1rem; color: #0f172a;">
              ${s?"Edit Civic Buzz Post":"Create Civic Buzz Post"}
            </span>
          </div>
          <button type="button" class="ck-buzz-close-btn" id="ck-wiz-close-btn" aria-label="Close modal">✕</button>
        </div>

        <!-- 5-Step Progress Tracker -->
        <div class="ck-wizard-step-tracker">
          <div class="ck-wizard-step-node ${d===1?"active":d>1?"completed":""}">
            <div class="ck-wizard-step-badge">${d>1?H.check(13,"#ffffff"):"1"}</div>
            <span>Type</span>
          </div>
          <div class="ck-wizard-step-line ${d>1?"completed":""}"></div>

          <div class="ck-wizard-step-node ${d===2?"active":d>2?"completed":""}">
            <div class="ck-wizard-step-badge">${d>2?H.check(13,"#ffffff"):"2"}</div>
            <span>Issue</span>
          </div>
          <div class="ck-wizard-step-line ${d>2?"completed":""}"></div>

          <div class="ck-wizard-step-node ${d===3?"active":d>3?"completed":""}">
            <div class="ck-wizard-step-badge">${d>3?H.check(13,"#ffffff"):"3"}</div>
            <span>Style</span>
          </div>
          <div class="ck-wizard-step-line ${d>3?"completed":""}"></div>

          <div class="ck-wizard-step-node ${d===4?"active":d>4?"completed":""}">
            <div class="ck-wizard-step-badge">${d>4?H.check(13,"#ffffff"):"4"}</div>
            <span>Caption</span>
          </div>
          <div class="ck-wizard-step-line ${d>4?"completed":""}"></div>

          <div class="ck-wizard-step-node ${d===5?"active":""}">
            <div class="ck-wizard-step-badge">5</div>
            <span>Preview</span>
          </div>
        </div>

        <!-- Step Body Container -->
        <div class="ck-buzz-modal-body" style="padding: 22px; max-height: 520px; overflow-y: auto;">
          <div id="ck-wiz-step-content"></div>
        </div>

        <!-- Step Footer Navigation Bar -->
        <div style="padding: 14px 22px; border-top: 1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center; background:#ffffff; border-bottom-left-radius:20px; border-bottom-right-radius:20px;">
          <button type="button" class="btn btn-secondary" id="ck-wiz-prev-btn" style="border-radius:999px; font-weight:700;" ${d===1?"disabled":""}>
            ← Back
          </button>

          <div style="display:flex; gap:10px;">
            ${d===5?`
              <button type="button" class="btn btn-secondary" id="ck-wiz-draft-btn" style="border-radius:999px; font-weight:700;">
                Save as Draft
              </button>
              <button type="button" class="btn btn-primary" id="ck-wiz-publish-btn" style="border-radius:999px; font-weight:800; padding:10px 22px; background:linear-gradient(135deg, var(--primary), #ea580c); display:inline-flex; align-items:center; gap:6px;">
                <span>Publish to Civic Buzz</span> ${H.flame(16,"#ffffff")}
              </button>
            `:`
              <button type="button" class="btn btn-primary" id="ck-wiz-next-btn" style="border-radius:999px; font-weight:700; padding:10px 24px;">
                Continue →
              </button>
            `}
          </div>
        </div>
      </div>
    `,(B=x.querySelector("#ck-wiz-close-btn"))==null||B.addEventListener("click",T),(V=x.querySelector("#ck-wiz-prev-btn"))==null||V.addEventListener("click",()=>{d>1&&(d--,E())});const R=x.querySelector("#ck-wiz-step-content");if(d===1){R.innerHTML=`
        <div style="margin-bottom: 14px;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 0 0 4px;">
            Step 1: Choose Conversation Type
          </h3>
          <p style="font-size: 0.82rem; color: #64748b; margin: 0;">
            Select the format that best conveys your civic situation to Pune citizens.
          </p>
        </div>

        <div class="ck-wizard-type-grid">
          <!-- Option 1: Meme -->
          <div class="ck-wizard-type-card ${u==="meme_issue"?"active":""}" data-type="meme_issue">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#ea580c;">${H.flame(24,"#ea580c")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Viral / Funny</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Meme about a civic issue</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              High-impact bold meme typography over photo highlighting potholes, water breaks, or city hazards.
            </div>
          </div>

          <!-- Option 2: Awareness Card -->
          <div class="ck-wizard-type-card ${u==="awareness_card"?"active":""}" data-type="awareness_card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#0284c7;">${H.awareness(24,"#0284c7")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Informative</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Awareness card</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              Civic bulletin with verified fact strip (area, status, category) and direct demand for municipal action.
            </div>
          </div>

          <!-- Option 3: Initiative -->
          <div class="ck-wizard-type-card ${u==="promote_initiative"?"active":""}" data-type="promote_initiative">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#16a34a;">${H.initiative(24,"#16a34a")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Movement</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Promote community initiative</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              Rally neighborhood volunteers with meeting point, schedule, and prominent "Join" volunteer strip.
            </div>
          </div>

          <!-- Option 4: Share Issue -->
          <div class="ck-wizard-type-card ${u==="share_issue"?"active":""}" data-type="share_issue">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#eab308;">${H.zap(24,"#eab308")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Civic Case</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Share an existing issue</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              Turn an open CIVIC-KALKI complaint into a viral public post to accelerate official ward response.
            </div>
          </div>
        </div>
      `,R.querySelectorAll(".ck-wizard-type-card").forEach(pe=>{pe.addEventListener("click",()=>{u=pe.getAttribute("data-type"),R.querySelectorAll(".ck-wizard-type-card").forEach(O=>O.classList.remove("active")),pe.classList.add("active")})}),(N=x.querySelector("#ck-wiz-next-btn"))==null||N.addEventListener("click",()=>{d=2,E()});return}if(d===2){let I=function(G=""){const U=G.toLowerCase().trim(),Se=c.filter(j=>{if(!U)return!0;const ae=(j.name||"").toLowerCase().includes(U),de=(j.area||"").toLowerCase().includes(U),we=String(j.entity_id).includes(U);return ae||de||we});if(Se.length===0){O.innerHTML="",K.style.display="block";return}K.style.display="none",O.innerHTML=Se.map(j=>{const ae=h&&h.entity_id===j.entity_id;return j.entity_type_id===1||j.entity_type_id,`
            <div class="ck-wizard-entity-card ${ae?"active":""}" data-id="${j.entity_id}" style="
              border: 1.5px solid ${ae?"var(--primary)":"#e2e8f0"};
              background: ${ae?"#fff7ed":"#ffffff"};
              border-radius: 12px;
              padding: 10px 14px;
              cursor: pointer;
              transition: all 0.15s;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 12px;
            ">
              <div style="flex:1; min-width:0;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:0.7rem; font-weight:800; color:var(--primary);">#${j.entity_id}</span>
                  <span class="badge badge-secondary" style="font-size:0.65rem;">${j.is_mine?"My Item":"Community"}</span>
                  <span class="ck-buzz-status-pill ${Le(j.status||"submitted")}" style="font-size:0.65rem; padding:1px 6px;">
                    ${Le(j.status||"Active")}
                  </span>
                </div>
                <div style="font-weight:700; font-size:0.88rem; color:#0f172a; margin-top:2px;" class="ck-truncate">
                  ${Le(j.name)}
                </div>
                ${j.area?`<div style="font-size:0.75rem; color:#64748b; display:inline-flex; align-items:center; gap:4px;">${H.pin(12,"#64748b")} ${Le(j.area)}</div>`:""}
              </div>
              <div style="display:flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:50%; ${ae?"background:var(--primary); color:#ffffff;":"border:1.5px solid #cbd5e1; color:transparent;"}">
                ${ae?H.check(13,"#ffffff"):""}
              </div>
            </div>
          `}).join(""),O.querySelectorAll(".ck-wizard-entity-card").forEach(j=>{j.addEventListener("click",()=>{const ae=Number(j.getAttribute("data-id"));h=c.find(de=>de.entity_id===ae)||null,I(pe.value)})})};R.innerHTML=`
        <div style="margin-bottom: 12px;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 0 0 4px;">
            Step 2: Pick Linked Issue or Initiative
          </h3>
          <p style="font-size: 0.82rem; color: #64748b; margin: 0;">
            Select from your reported civic items or followed community activities.
          </p>
        </div>

        <!-- Live Search Bar -->
        <div style="margin-bottom: 14px; position:relative;">
          <input
            type="text"
            id="ck-wiz-entity-search"
            class="form-input"
            placeholder="Search by title, area (e.g. Baner, FC Road), or ID..."
            style="width:100%; font-size:0.86rem; padding: 10px 14px; border-radius:10px;"
          />
        </div>

        <!-- Scrollable Candidates List -->
        <div id="ck-wiz-entity-list" style="display:flex; flex-direction:column; gap:8px; max-height:280px; overflow-y:auto; padding-right:4px;">
        </div>

        <div id="ck-wiz-entity-empty" style="display:none; text-align:center; padding:24px; color:#94a3b8; font-size:0.82rem;">
          No matching civic items found. Try a different search keyword.
        </div>
      `;const pe=R.querySelector("#ck-wiz-entity-search"),O=R.querySelector("#ck-wiz-entity-list"),K=R.querySelector("#ck-wiz-entity-empty");I(),pe.addEventListener("input",G=>I(G.target.value)),(A=x.querySelector("#ck-wiz-next-btn"))==null||A.addEventListener("click",()=>{if(!h){_t("Please select an issue or initiative to link.");return}d=3,E()});return}if(d===3){R.innerHTML=`
        <div style="margin-bottom: 14px;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 0 0 4px;">
            Step 3: Choose Conversation Style
          </h3>
          <p style="font-size: 0.82rem; color: #64748b; margin: 0;">
            How should the AI tune the tone and message for this civic post?
          </p>
        </div>

        <div style="display:flex; flex-direction:column; gap:12px;">
          <!-- Style 1: Funny -->
          <div class="ck-wizard-type-card ${m==="funny"?"active":""}" data-style="funny">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#ea580c;">${H.smile(24,"#ea580c")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Viral Relay</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Funny and relatable</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              Witty, self-deprecating street humor mocking the civic obstacle, never mocking people or communities.
            </div>
          </div>

          <!-- Style 2: Informative -->
          <div class="ck-wizard-type-card ${m==="informative"?"active":""}" data-style="informative">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#0284c7;">${H.clipboard(24,"#0284c7")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Direct & Clear</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Informative</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              Sharp, data-driven facts highlighting duration, safety hazards, and exact municipal ward accountability.
            </div>
          </div>

          <!-- Style 3: Emotional -->
          <div class="ck-wizard-type-card ${m==="emotional"?"active":""}" data-style="emotional">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#16a34a;">${H.handshake(24,"#16a34a")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Community Pride</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Emotional-community-focused</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              Heartfelt, neighborhood solidarity calling on citizens to protect senior citizens, children, and our parks.
            </div>
          </div>
        </div>
      `,R.querySelectorAll(".ck-wizard-type-card").forEach(pe=>{pe.addEventListener("click",()=>{m=pe.getAttribute("data-style"),R.querySelectorAll(".ck-wizard-type-card").forEach(O=>O.classList.remove("active")),pe.classList.add("active")})}),(q=x.querySelector("#ck-wiz-next-btn"))==null||q.addEventListener("click",()=>{d=4,E()});return}if(d===4){R.innerHTML=`
        <div style="margin-bottom: 14px;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 0 0 4px;">
            Step 4: AI Captions & Text
          </h3>
          <p style="font-size: 0.82rem; color: #64748b; margin: 0;">
            Pick one of Gemini AI's generated captions or edit freely.
          </p>
        </div>

        <!-- AI Captions Options Container -->
        <div id="ck-wiz-ai-loading" style="text-align:center; padding:24px 0;">
          <div class="spinner" style="margin: 0 auto 10px;"></div>
          <div style="font-size:0.8rem; font-weight:700; color:var(--primary);">Generating 3 smart civic captions with Gemini AI...</div>
          <div style="font-size:0.72rem; color:#64748b; margin-top:2px;">Applying safety rules: no personal data, no mockery of people, mock problem only.</div>
        </div>

        <div id="ck-wiz-caption-cards" style="display:none; flex-direction:column; gap:8px; margin-bottom:16px;">
        </div>

        <!-- Regenerate Button -->
        <div style="display:flex; justify-content:flex-end; margin-bottom:14px;">
          <button type="button" id="ck-wiz-regen-btn" class="btn btn-secondary btn-sm" style="border-radius:999px; font-weight:700; display:inline-flex; align-items:center; gap:6px;">
            <span style="display:inline-flex; align-items:center;">${H.bot(15,"#475569")}</span> Regenerate Captions
          </button>
        </div>

        <!-- Free Edit Form -->
        <div class="form-group" style="margin-bottom:12px;">
          <label style="display:block; font-size:0.82rem; font-weight:700; color:#334155; margin-bottom:4px;">
            Post Caption (Overlay text) *
          </label>
          <textarea
            id="ck-wiz-caption-input"
            rows="2"
            class="form-input"
            placeholder="Edit your caption freely..."
            style="width:100%; font-size:0.88rem; font-family:inherit; padding:8px 12px; border-radius:10px;"
            maxlength="500"
          >${Le(v)}</textarea>
        </div>

        <div class="form-group" style="margin-bottom:8px;">
          <label style="display:block; font-size:0.82rem; font-weight:700; color:#334155; margin-bottom:4px;">
            Call to Action (CTA Text)
          </label>
          <input
            type="text"
            id="ck-wiz-cta-input"
            class="form-input"
            placeholder="e.g. Demand Action, Fix Baner Road, Join Clean-up"
            value="${Le(b)}"
            style="width:100%; font-size:0.86rem; padding:8px 12px; border-radius:10px;"
            maxlength="60"
          />
        </div>
      `;const pe=R.querySelector("#ck-wiz-ai-loading"),O=R.querySelector("#ck-wiz-caption-cards"),K=R.querySelector("#ck-wiz-regen-btn"),I=R.querySelector("#ck-wiz-caption-input"),G=R.querySelector("#ck-wiz-cta-input");async function U(){pe.style.display="block",O.style.display="none";try{const Se=await ve.generateCaptions({linked_id:h.entity_id,linked_type:P,template:_,style:m});if(g=Se.captions||[],pe.style.display="none",O.style.display="flex",g.length===0){O.innerHTML=`<div style="font-size:0.8rem; color:#ef4444; padding:8px;">${Le(Se.reason||"Could not generate AI captions. You can type your own below.")}</div>`;return}O.innerHTML=g.map((j,ae)=>`
            <div class="ck-wiz-caption-opt" data-idx="${ae}" style="
              border: 1.5px solid #e2e8f0;
              background: #f8fafc;
              border-radius: 10px;
              padding: 10px 14px;
              cursor: pointer;
              transition: all 0.15s;
            ">
              <div style="font-weight:700; color:#0f172a; font-size:0.88rem;">"${Le(j.caption)}"</div>
              <div style="font-size:0.72rem; font-weight:700; color:var(--primary); margin-top:3px;">
                CTA: ${Le(j.cta_text||"Take Action")}
              </div>
            </div>
          `).join(""),!I.value&&g[0]&&(I.value=g[0].caption,G.value=g[0].cta_text||"",v=I.value,b=G.value),O.querySelectorAll(".ck-wiz-caption-opt").forEach(j=>{j.addEventListener("click",()=>{const ae=Number(j.getAttribute("data-idx")),de=g[ae];de&&(I.value=de.caption,G.value=de.cta_text||"",v=de.caption,b=de.cta_text||"",ye("Caption applied! You can customize it freely."))})})}catch(Se){pe.style.display="none",O.style.display="flex",O.innerHTML=`<div style="font-size:0.8rem; color:#ef4444; padding:8px;">Failed to generate AI captions: ${Le(Se.message)}. Please enter your caption below.</div>`}}K==null||K.addEventListener("click",U),I.addEventListener("input",()=>{v=I.value}),G.addEventListener("input",()=>{b=G.value}),g.length===0?U():(pe.style.display="none",O.style.display="flex"),(J=x.querySelector("#ck-wiz-next-btn"))==null||J.addEventListener("click",()=>{if(v=I.value.trim(),b=G.value.trim(),!v){_t("Please enter or select a caption.");return}d=5,E()});return}if(d===5){R.innerHTML=`
        <div style="margin-bottom: 12px;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 0 0 4px;">
            Step 5: Preview & Publish
          </h3>
          <p style="font-size: 0.82rem; color: #64748b; margin: 0;">
            The card has been rendered to PNG using the ${_.toUpperCase()} template.
          </p>
        </div>

        <!-- Render Target (Hidden DOM element converted by html-to-image) -->
        <div id="ck-wiz-render-mount" style="position:fixed; left:-9999px; top:-9999px; width:600px; height:600px; pointer-events:none;">
          ${Br({template:_,style:m,caption:v,cta_text:b,issue:h})}
        </div>

        <!-- Live Preview Showcase -->
        <div class="ck-wizard-preview-container">
          <div id="ck-wiz-preview-loading" style="text-align:center; padding:40px; color:#ffffff;">
            <div class="spinner" style="margin: 0 auto 10px; border-color: rgba(255,255,255,0.2); border-top-color: var(--primary);"></div>
            <div style="font-size:0.8rem; font-weight:700;">Rendering PNG in browser...</div>
          </div>
          <div id="ck-wiz-preview-box" class="ck-wizard-preview-scaler" style="display:none;">
            <img id="ck-wiz-preview-img" alt="Civic Buzz Preview" style="width:100%; height:100%; object-fit:contain; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.5);" />
          </div>
        </div>

        <!-- Safety check alert container -->
        <div id="ck-wiz-safety-alert" class="ck-buzz-inline-alert" style="display:none; margin-top:14px;"></div>
      `;const pe=R.querySelector("#ck-wiz-render-mount .ck-card-canvas"),O=R.querySelector("#ck-wiz-preview-loading"),K=R.querySelector("#ck-wiz-preview-box"),I=R.querySelector("#ck-wiz-preview-img"),G=R.querySelector("#ck-wiz-safety-alert");try{w=await au(pe),I.src=w,O.style.display="none",K.style.display="flex"}catch(Se){console.error("html-to-image render error:",Se),O.innerHTML='<div style="color:#fca5a5; font-size:0.8rem;">Preview generated via HTML/CSS layout</div>',K.innerHTML=pe.outerHTML,K.style.display="flex"}async function U(Se){var de;G.style.display="none";const j=x.querySelector("#ck-wiz-publish-btn"),ae=x.querySelector("#ck-wiz-draft-btn");j.disabled=!0,ae.disabled=!0,Se==="published"?j.textContent="Verifying Safety...":ae.textContent="Saving...";try{let we=null;if(w)try{we=(await ve.uploadImage(w)).image_url}catch(se){console.warn("Could not store PNG file, saving data URL fallback:",se),we=w}const xe={linked_type:P,linked_id:Number(h.entity_id),template:_,style:m,caption:v,cta_text:b||null,image_url:we,status:Se};s&&s.id?await ve.update(s.id,xe):await ve.create(xe),ye(Se==="published"?"Civic Buzz post published to community!":"Draft saved under My Civic Activity!"),T(),typeof n=="function"&&n()}catch(we){G.textContent=((de=we.data)==null?void 0:de.message)||we.message||"Submission failed. Please revise.",G.style.display="block"}finally{j.disabled=!1,ae.disabled=!1,j.innerHTML=`<span>Publish to Civic Buzz</span> ${H.flame(16,"#ffffff")}`,ae.textContent="Save as Draft"}}(Y=x.querySelector("#ck-wiz-publish-btn"))==null||Y.addEventListener("click",()=>U("published")),(oe=x.querySelector("#ck-wiz-draft-btn"))==null||oe.addEventListener("click",()=>U("draft"))}}await E()}function jt(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const Do='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="50%" stop-color="%230f172a"/><stop offset="100%" stop-color="%23ea580c"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g)"/><text x="50%" y="46%" font-family="system-ui,-apple-system,sans-serif" font-weight="900" font-size="28" fill="%23ffffff" text-anchor="middle" letter-spacing="1">CIVIC BUZZ</text><text x="50%" y="56%" font-family="system-ui,-apple-system,sans-serif" font-weight="600" font-size="15" fill="%23fdba74" text-anchor="middle">YOUTH-POWERED CIVIC CONVERSATION</text></svg>';function su(){return`
    <div class="ck-rx-sidebar-panel ck-buzz-carousel-panel" id="ck-buzz-carousel-container">
      <!-- Carousel Header (Clickable to open full-page gallery) -->
      <div class="ck-buzz-header-row" id="ck-buzz-header-click" title="Open Civic Buzz Gallery" style="cursor: pointer;">
        <div>
          <div class="ck-buzz-brand-title">
            <span>CIVIC BUZZ</span>
            <span class="ck-buzz-flame" style="display:inline-flex; align-items:center;">${H.flame(15,"var(--primary)")}</span>
          </div>
          <div class="ck-buzz-brand-sub">Youth-powered civic conversations</div>
        </div>
      </div>

      <!-- Viewport & Track (1 card at a time, no duplicate overlay arrows) -->
      <div class="ck-buzz-viewport" id="ck-buzz-viewport">
        <div class="ck-buzz-track" id="ck-buzz-track">
          <!-- Loading State -->
          <div class="ck-buzz-loading-box">
            <div class="spinner" style="width: 22px; height: 22px; margin-bottom: 8px;"></div>
            <span>Loading youth civic buzz...</span>
          </div>
        </div>
      </div>

      <!-- Single Control Set: Dot Indicators + One Pause Button & See All Link -->
      <div class="ck-buzz-footer-row" style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <div class="ck-buzz-dots" id="ck-buzz-dots"></div>
          <button type="button" class="ck-buzz-pause-btn" id="ck-buzz-pause-btn" title="Pause auto-rotate" aria-label="Pause auto-rotate">
            <svg class="ck-buzz-pause-icon" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="4" height="16" rx="1"/><rect x="15" y="4" width="4" height="16" rx="1"/></svg>
            <svg class="ck-buzz-play-icon" style="display:none;" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>
          </button>
        </div>
        <a href="/buzz" class="ck-buzz-gallery-link" id="ck-buzz-explore-link">
          See all →
        </a>
      </div>
    </div>
  `}async function Or(){var T;const i=document.getElementById("ck-buzz-carousel-container"),n=document.getElementById("ck-buzz-track"),s=document.getElementById("ck-buzz-dots"),o=document.getElementById("ck-buzz-pause-btn"),r=document.getElementById("ck-buzz-header-click");if(!i||!n)return;r==null||r.addEventListener("click",()=>{ne("/buzz")});let c=[],d=0,u=null,h=!1;const m=new Set;try{c=(await ve.list({limit:8,sort:"trending"})).data||[]}catch{n.innerHTML=`
      <div style="padding: 16px; text-align: center; color: #ef4444; font-size: 0.78rem;">
        Failed to load Civic Buzz
      </div>
    `;return}if(c.length===0){n.innerHTML=`
      <div class="ck-buzz-empty-card">
        <div style="display:flex; justify-content:center; color:#10b981; margin-bottom: 6px;">${H.initiative(28)}</div>
        <div style="font-weight: 700; font-size: 0.86rem; color: #0f172a;">No Civic Buzz yet</div>
        <p style="font-size: 0.75rem; color: #64748b; margin: 4px 0 10px;">
          Be the first to turn a real civic problem into a viral conversation!
        </p>
        ${ri()?`
        <button type="button" id="ck-buzz-first-create-btn" class="btn btn-primary btn-sm" style="border-radius: 999px; font-weight: 700; font-size: 0.76rem;">
          + Create First Post
        </button>
        `:""}
      </div>
    `,(T=document.getElementById("ck-buzz-first-create-btn"))==null||T.addEventListener("click",()=>{en(null,()=>Or())});return}n.innerHTML=c.map((E,_)=>{const P=E.image_url||Do,R=E.linked_title||E.caption,B=E.linked_area||"",V=E.views_count||0,N=E.vote_count||0,A=E.shares_count||0,q=E.joins_count||0,J=E.template==="initiative"||E.linked_type==="initiative",Y=[];B&&Y.push(jt(B)),V>0&&Y.push(`${V} views`),J&&q>0?Y.push(`${q} joined`):N>0&&Y.push(`${N} upvote${N>1?"s":""}`),A>0&&Y.push(`${A} share${A>1?"s":""}`);const oe=Y.join(" · ");return`
      <div class="ck-buzz-slide" data-index="${_}" data-post-id="${E.id}" data-linked-id="${E.linked_id||""}" style="cursor: pointer;" title="View ${jt(R)}">
        <!-- Image Card with Bold Meme-style Clamped Caption Overlay & Floating Small Share Button -->
        <div class="ck-buzz-img-box" style="position: relative;">
          <img src="${jt(P)}" alt="${jt(E.caption)}" class="ck-buzz-img" onerror="this.src='${Do}'" />
          <div class="ck-buzz-scrim"></div>
          
          <!-- Small Floating Share Button in top-right -->
          <button type="button" class="ck-buzz-share-floating" data-action="share-post" data-post-id="${E.id}" data-caption="${jt(E.caption)}" title="Share" aria-label="Share">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>

          <!-- Clamped Caption inside Card -->
          <div class="ck-buzz-meme-caption" style="display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; text-overflow:ellipsis;">
            ${jt(E.caption)}
          </div>

          <div class="ck-buzz-badge-row">
            <span class="ck-buzz-pill-tag">
              ${J?`<span style="display:inline-flex; align-items:center; gap:4px;">${H.initiative(11)} INITIATIVE</span>`:E.template==="awareness"?`<span style="display:inline-flex; align-items:center; gap:4px;">${H.awareness(11)} AWARENESS</span>`:`<span style="display:inline-flex; align-items:center; gap:4px;">${H.flame(11)} MEME</span>`}
            </span>
          </div>
        </div>

        <!-- Issue Title & Stats & Action Buttons -->
        <div class="ck-buzz-meta-box">
          <div class="ck-buzz-issue-title" title="${jt(R)}">
            ${jt(R)}
          </div>
          <div style="font-size:0.84rem; color:#64748b; margin-top:3px; font-weight:500;" class="ck-truncate">
            ${oe||"Civic Buzz"}
          </div>
          <div class="ck-buzz-actions-row" style="display:flex; align-items:center; justify-content:space-between; margin-top:12px; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
              ${ri()?`
              <button type="button" class="btn btn-secondary btn-sm ck-buzz-action-btn" data-action="upvote-post" data-post-id="${E.id}" style="font-size:0.82rem; font-weight:600; padding:5px 12px; border-radius:6px; display:inline-flex; align-items:center; gap:4px; height:30px; background:#f8fafc; border:1px solid #e2e8f0; color:#334155; cursor:pointer; white-space:nowrap;">
                <span>↑</span> Upvote
              </button>
              <button type="button" class="btn btn-secondary btn-sm ck-buzz-action-btn" data-action="follow-post" data-post-id="${E.id}" style="font-size:0.82rem; font-weight:600; padding:5px 12px; border-radius:6px; display:inline-flex; align-items:center; gap:4px; height:30px; background:#f8fafc; border:1px solid #e2e8f0; color:#334155; cursor:pointer; white-space:nowrap;">
                <span>+</span> Follow
              </button>
              `:""}
            </div>
            <a href="${E.linked_id?`/entities/${E.linked_id}`:`/buzz/${E.id}`}" class="ck-buzz-view-issue-link" data-action="view-issue" style="font-size:0.85rem; color:var(--primary); font-weight:700; text-decoration:none; white-space:nowrap; flex-shrink:0;">
              View issue →
            </a>
          </div>
        </div>
      </div>
    `}).join(""),s.innerHTML=c.map((E,_)=>`
    <span class="ck-buzz-dot ${_===0?"active":""}" data-dot-index="${_}"></span>
  `).join("");function g(E){if(c.length===0)return;d=(E+c.length)%c.length,n.style.transform=`translateX(-${d*100}%)`,i.querySelectorAll(".ck-buzz-dot").forEach((P,R)=>{P.classList.toggle("active",R===d)});const _=c[d];_&&!m.has(_.id)&&(m.add(_.id),ve.logEvent(_.id,"view").catch(()=>{}))}g(0),s.addEventListener("click",E=>{const _=E.target.closest(".ck-buzz-dot");if(!_)return;const P=parseInt(_.getAttribute("data-dot-index"),10);isNaN(P)||g(P)}),o==null||o.addEventListener("click",E=>{E.stopPropagation(),h=!h;const _=o.querySelector(".ck-buzz-pause-icon"),P=o.querySelector(".ck-buzz-play-icon");h?(b(),o.classList.add("paused"),o.title="Play auto-rotate",_&&(_.style.display="none"),P&&(P.style.display="inline-block")):(v(),o.classList.remove("paused"),o.title="Pause auto-rotate",_&&(_.style.display="inline-block"),P&&(P.style.display="none"))});function v(){b(),!h&&(u=setInterval(()=>{g(d+1)},1800))}function b(){u&&(clearInterval(u),u=null)}v(),i.addEventListener("mouseenter",()=>{h||b()}),i.addEventListener("mouseleave",()=>{h||v()});let w=0,$=!1;const x=document.getElementById("ck-buzz-viewport");x==null||x.addEventListener("touchstart",E=>{b(),w=E.touches[0].clientX},{passive:!0}),x==null||x.addEventListener("touchend",E=>{const _=E.changedTouches[0].clientX-w;Math.abs(_)>35&&(_>0?g(d-1):g(d+1)),h||v()},{passive:!0}),x==null||x.addEventListener("mousedown",E=>{$=!0,w=E.clientX,b()}),window.addEventListener("mouseup",E=>{if(!$)return;$=!1;const _=E.clientX-w;Math.abs(_)>40&&(_>0?g(d-1):g(d+1)),h||v()}),n.addEventListener("click",E=>{var N,A;const _=E.target.closest('[data-action="share-post"]');if(_){E.stopPropagation();const q=Number(_.getAttribute("data-post-id")),J=c.find(Y=>Y.id===q)||{id:q,caption:_.getAttribute("data-caption")||"Civic Buzz",image_url:(A=(N=_.closest(".ck-buzz-slide"))==null?void 0:N.querySelector("img"))==null?void 0:A.src};Qn(J);return}const P=E.target.closest('[data-action="upvote-post"]');if(P){E.stopPropagation();const q=Number(P.getAttribute("data-post-id"));ve.vote(q).then(()=>{ye("Upvoted civic buzz!"),P.innerHTML="<span>✓</span> Upvoted",P.style.color="var(--primary)"}).catch(()=>fr("You already supported this post."));return}const R=E.target.closest('[data-action="follow-post"]');if(R){E.stopPropagation(),ye("Following updates on this issue!"),R.innerHTML="<span>✓</span> Following",R.style.color="#10b981";return}const B=E.target.closest('[data-action="view-issue"]');if(B){E.stopPropagation(),E.preventDefault();const q=B.getAttribute("href");q&&ne(q);return}const V=E.target.closest(".ck-buzz-slide");if(V){const q=V.getAttribute("data-linked-id"),J=V.getAttribute("data-post-id");J&&ve.logEvent(Number(J),"click_issue").catch(()=>{}),ne(q&&q!==""&&q!=="null"&&q!=="undefined"?`/entities/${q}`:J?`/buzz/${J}`:"/buzz")}})}function tn(i){return String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const Fo=i=>Number(i.count??i.total_count??0)||0;async function ou(i){var d;const n=Array.isArray((d=i.parsed_config)==null?void 0:d.awaiting_statuses)?i.parsed_config.awaiting_statuses:[],[s,...o]=await Promise.all([li.execute(i.report_id),...n.map(u=>li.execute(i.report_id,{status:u}))]),r=s.data.groupBy||"area",c=new Map;for(const u of s.data.rows||[])c.set(String(u[r]),{ward:String(u[r]),total:Fo(u),awaiting:0});for(const u of o)for(const h of u.data.rows||[]){const m=c.get(String(h[r]));m&&(m.awaiting+=Fo(h))}return[...c.values()]}function ru(i,n){const s=Math.max(1,...i.map(o=>o.total));return i.map(o=>{const r=o.total/s*100,c=o.total?o.awaiting/o.total*100:0;return`
      <a class="ward-row" href="${`/entities?entity_type_id=${Number(n.entity_type_id)}&area=${encodeURIComponent(o.ward)}`}" title="${tn(`${o.ward}: ${o.total} record(s), ${o.awaiting} waiting for approval. Open the list.`)}">
        <span class="ward-name">${tn(o.ward)}</span>
        <span class="ward-track" aria-hidden="true">
          <span class="ward-bar" style="width:${r.toFixed(1)}%">
            <span class="ward-bar-awaiting" style="width:${c.toFixed(1)}%"></span>
          </span>
        </span>
        <span class="ward-numbers"><strong>${o.total}</strong> · ${o.awaiting} waiting</span>
      </a>`}).join("")}function lu(i){return`
    <table class="ward-table">
      <caption class="ward-caption">Same figures as a table. Select a column heading to sort.</caption>
      <thead>
        <tr>
          <th scope="col"><button type="button" class="ward-sort" data-sort="ward">Ward</button></th>
          <th scope="col"><button type="button" class="ward-sort" data-sort="total">Records</button></th>
          <th scope="col"><button type="button" class="ward-sort" data-sort="awaiting">Waiting for approval</button></th>
          <th scope="col"><button type="button" class="ward-sort" data-sort="share">Share waiting</button></th>
        </tr>
      </thead>
      <tbody>
        ${i.map(n=>`
        <tr>
          <th scope="row">${tn(n.ward)}</th>
          <td>${n.total}</td>
          <td>${n.awaiting}</td>
          <td>${n.total?Math.round(n.awaiting/n.total*100):0}%</td>
        </tr>`).join("")}
      </tbody>
    </table>`}async function cu(i){if(!i)return;let n=[];try{n=((await li.list()).data||[]).filter(g=>{var v,b,w;return((v=g.parsed_config)==null?void 0:v.widget)==="ward_activity"&&String(((b=g.parsed_config)==null?void 0:b.groupBy)||((w=g.parsed_config)==null?void 0:w.group_by)||"").toLowerCase()==="area"})}catch{return}if(!n.length)return;i.innerHTML=`
    <section class="card mb-6 ward-card" aria-labelledby="ward-title">
      <div class="card-header border-b ward-header">
        <div>
          <div class="card-title" id="ward-title">Civic activity across wards</div>
          <div class="card-subtitle">Records per ward, and how many are waiting for approval. Select a ward to open its list.</div>
        </div>
        <label class="ward-select-label">Report
          <select id="ward-report-select" class="form-control">
            ${n.map(m=>`<option value="${Number(m.report_id)}">${tn(m.report_name)}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="card-body">
        <ul class="ward-legend" aria-label="Legend">
          <li><span class="ward-swatch"></span> all records in the ward</li>
          <li><span class="ward-swatch ward-swatch-awaiting"></span> waiting for approval</li>
        </ul>
        <div id="ward-bars" class="ward-bars" aria-live="polite"></div>
        <div id="ward-table-wrap" class="table-container ward-table-wrap"></div>
      </div>
    </section>`;const s=i.querySelector("#ward-report-select"),o=i.querySelector("#ward-bars"),r=i.querySelector("#ward-table-wrap");let c=[],d={key:"total",dir:-1};const u=()=>{const m=n.find(b=>String(b.report_id)===s.value),g=b=>d.key==="share"?b.total?b.awaiting/b.total:0:b[d.key],v=[...c].sort((b,w)=>{const[$,x]=[g(b),g(w)];return(typeof $=="string"?$.localeCompare(x):$-x)*d.dir});if(!v.length){o.innerHTML='<div class="text-muted">This report has no records yet.</div>',r.innerHTML="";return}o.innerHTML=ru(v,m),r.innerHTML=lu(v),r.querySelectorAll(".ward-sort").forEach(b=>{const w=b.getAttribute("data-sort")===d.key;b.closest("th").setAttribute("aria-sort",w?d.dir===1?"ascending":"descending":"none"),b.addEventListener("click",()=>{const $=b.getAttribute("data-sort");d={key:$,dir:d.key===$?-d.dir:$==="ward"?1:-1},u()})})},h=async()=>{o.innerHTML='<div class="text-muted">Loading…</div>',r.innerHTML="";try{c=await ou(n.find(m=>String(m.report_id)===s.value)),u()}catch(m){o.innerHTML=`<div class="alert alert-error">Ward activity could not be loaded: ${tn(m.message||m)}</div>`}};s.addEventListener("change",h),await h()}function Fa(i,n){return i&&i.lang&&i.lang!=="en"?`<div class="notranslate" style="display:contents" lang="${ee(i.lang)}">${n}</div>`:n}function ee(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const du={mic:'<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>'},Ne={arrow:'<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>',list:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>',chart:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',shield:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',build:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>',users:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',graph:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',buzz:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/></svg>'};function rn(){const i=new Date().getHours();return i<12?"Good morning":i<17?"Good afternoon":"Good evening"}function ln(i){return String((i==null?void 0:i.name)||"").trim().split(/\s+/)[0]||"there"}function jr(i){if(!i)return"";const n=Math.max(0,Math.round((Date.now()-new Date(i).getTime())/1e3));if(n<60)return"just now";if(n<3600)return`${Math.floor(n/60)} min ago`;if(n<86400)return`${Math.floor(n/3600)} h ago`;const s=Math.floor(n/86400);return s<14?`${s} day${s===1?"":"s"} ago`:new Date(i).toLocaleDateString()}function ps(i){const n=String(i||"").toLowerCase();let s="is-waiting";return["approved","resolved","completed","closed","published","audited","reconciled"].includes(n)?s="is-done":["rejected","deleted","failed"].includes(n)?s="is-stopped":["draft",""].includes(n)&&(s="is-neutral"),`<span class="ws-pill ${s}">${ee(mt(i)||"Draft")}</span>`}function hs(i){const n=(i==null?void 0:i.entityType)||(i!=null&&i.entity_type?{name:i.entity_type}:null);return n&&(et(n).shortTitle||n.name)||""}function nn({id:i,title:n,meta:s=[],side:o="",action:r="Open"}){return`
    <a class="ws-item" href="/entities/${Number(i)}">
      <span style="min-width:0;">
        <span class="ws-item-title" title="${ee(n)}">${ee(n)}</span>
        <span class="ws-item-meta">${s.filter(Boolean).map(c=>`<span>${ee(c)}</span>`).join("")}</span>
      </span>
      <span class="ws-item-side">${o}<span class="ws-item-go">${ee(r)} ${Ne.arrow}</span></span>
    </a>`}function We(i,n,s,o){return`
    <a class="ws-action" href="${i}">
      <span class="ws-action-icon">${n}</span>
      <span><strong>${ee(s)}</strong><small>${ee(o)}</small></span>
    </a>`}function rt(i,n,s=null){const o=`<div class="ws-fact-num">${ee(String(i))}</div><div class="ws-fact-label">${ee(n)}</div>`;return s?`<a class="ws-fact" href="${s}">${o}</a>`:`<div class="ws-fact">${o}</div>`}async function ta(){return((await fe.notifications(100).catch(()=>({data:[]}))).data||[]).filter(n=>n.kind==="queue").reverse()}function ia(i){return nn({id:i.entity_id,title:i.entity_name,meta:[Nr(i.entity_type),i.area||"No ward",i.actor?`from ${i.actor}`:"",`waiting since ${jr(i.datetime)}`],action:"Review"})}function Nr(i){return i?et({name:i}).shortTitle||i:""}function ms({count:i,waitingTitle:n,waitingText:s,clearTitle:o,clearText:r,nextId:c,nextLabel:d="Review next"}){return i?`
    <section class="ws-focus" aria-live="polite">
      <div class="ws-focus-num">${i}</div>
      <div class="ws-focus-text"><strong>${ee(n)}</strong><span>${ee(s)}</span></div>
      ${c?`<a class="btn" href="/entities/${Number(c)}">${ee(d)} ${Ne.arrow}</a>`:""}
    </section>`:`
      <section class="ws-focus is-clear" aria-live="polite">
        <div class="ws-focus-num" aria-hidden="true">✓</div>
        <div class="ws-focus-text"><strong>${ee(o)}</strong><span>${ee(r)}</span></div>
      </section>`}function uu(){return`
    <div class="ws" aria-busy="true" aria-label="Loading your workspace">
      <div>
        <div class="ck-skeleton-shimmer" style="width:260px; height:30px; margin-bottom:8px; border-radius:8px;"></div>
        <div class="ck-skeleton-shimmer" style="width:340px; height:14px; border-radius:6px;"></div>
      </div>
      <div class="ck-skeleton-shimmer" style="width:100%; height:120px; border-radius:20px;"></div>
      <div class="ck-skeleton-shimmer" style="width:100%; height:240px; border-radius:20px;"></div>
    </div>`}async function na(){if(!kt(ne))return;const i=He(),n=i.role==="citizen",o={citizen:"Home",coordinator_area:"Ward desk",coordinator_general:"General desk",director:"Approvals",admin:"Platform"}[i.role]||"Home",r=document.getElementById("app"),c=d=>{r.innerHTML=Ee(`<div id="dash-content">${uu()}</div>`,o,d),Ce()};c([]);try{const u=(await Si.getMetadata().catch(()=>({data:{entityTypes:[],rules:[],domains:[]}}))).data||{entityTypes:[],rules:[],domains:[]};n||c(u.entityTypes);const h=document.getElementById("dash-content");i.role==="citizen"?await pu(h,i,u):i.role==="coordinator_area"?await mu(h,i,u):i.role==="coordinator_general"?await fu(h,i,u):i.role==="director"?await gu(h,i,u):i.role==="admin"&&await vu(h,i,u)}catch{te("Failed to load workspace data");const u=document.getElementById("dash-content");u&&(u.innerHTML='<div class="alert alert-error">Your workspace could not be loaded. Please try again.</div>')}typeof window.civicTranslatePage=="function"&&window.civicTranslatePage()}let Tn=null;async function pu(i,n,s){const[o,r]=await Promise.all([fe.list({owner_user_id:n.user_id,limit:50}).catch(()=>({data:[]})),fe.notifications(6).catch(()=>({data:[]}))]),c=o.data||[],d=(r.data||[]).slice(0,4),u=_=>String(_.status||"").toLowerCase(),h=c.filter(_=>u(_)==="draft"),m=c.filter(_=>["approved","resolved","completed","closed"].includes(u(_))),g=c.filter(_=>["rejected","deleted"].includes(u(_))),v=c.filter(_=>!h.includes(_)&&!m.includes(_)&&!g.includes(_)),b=[...v,...m,...g,...h].slice(0,5),w=b.length?b.map(_=>nn({id:_.entity_id,title:_.name,meta:[hs(_),_.area],side:ps(_.status),action:"Open"})).join(""):`<div class="ws-empty"><strong>You have not asked for anything yet.</strong>
         Tell the assistant above what is wrong, or <a href="/entities/new">fill in a form</a>. You will be able to follow it here.</div>`,$=_=>{if(_.kind==="linked")return"A linked record was created automatically";const P=mt(_.to_status)||_.to_status;return _.from_status?`${mt(_.from_status)||_.from_status} → ${P}`:`Now ${P}`},x=d.length?d.map(_=>`
        <a class="ws-item" href="/entities/${Number(_.entity_id)}" style="grid-template-columns:1fr;">
          <span style="min-width:0;">
            <span class="ws-item-title" style="font-size:0.92rem;">${ee(_.entity_name)}</span>
            <span class="ws-item-update">${ee($(_))}</span>
            <span class="ws-item-meta">${_.actor?`<span>by ${ee(_.actor)}</span>`:""}<span>${ee(jr(_.datetime))}</span></span>
          </span>
        </a>`).join(""):'<div class="ws-empty">Nothing new. When a coordinator or the director acts on one of your requests, it shows here.</div>';i.innerHTML=`
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">Your civic home</div>
          <h1 id="ck-citizen-greeting-title">${rn()}, ${ee(ln(n))}</h1>
          <p id="ck-citizen-greeting-sub">Tell us what needs attention, then follow it until it is decided.</p>
        </div>
      </header>

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ck-agent-dark-card" id="ck-dark-cockpit" aria-label="Civic Assistant AI Chat">
          <div class="ck-dark-ambient"></div>

          <!-- Location permission bar (hidden when already granted or dismissed) -->
          <div class="ck-location-bar" id="ck-location-bar" style="display:none;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink:0;color:var(--primary);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span id="ck-location-bar-text" style="font-size:0.88rem;">Allow location for better results near you</span>
            <button type="button" id="ck-location-grant-btn" class="ck-location-grant-btn" style="font-size:0.84rem;">📍 Use my location</button>
            <button type="button" id="ck-location-dismiss-btn" class="ck-location-dismiss-btn" title="Dismiss" aria-label="Dismiss location bar">×</button>
          </div>
          
          <!-- Header with Avatar, Title, Reset -->
          <div class="ck-dark-header">
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="ck-dark-avatar">
                <svg width="17" height="17" fill="none" stroke="white" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <div>
                <div class="ck-dark-title">
                  <span>Civic Assistant</span>
                </div>
                <div class="ck-dark-sub">
                  Say it in your own words. Nothing is sent until you confirm.
                </div>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:10px;">
              <button type="button" class="ck-dark-reset-btn" id="ck-dark-reset-btn" title="Start fresh conversation" style="display:none; font-size:0.84rem;">
                + New Request
              </button>
            </div>
          </div>

          <!-- Embedded Conversation Thread -->
          <div id="ck-dark-thread" class="ck-dark-thread" style="display:none;" role="log" aria-live="polite"></div>

          <!-- High-End Minimal Pill Input Bar with Single Mic Icon -->
          <div class="ck-dark-input-wrap">
            <div id="ck-dark-file-preview" class="ck-dark-file-preview"></div>

            <div class="ck-dark-input-bar">
              <input type="file" id="ck-dark-file-input" style="display:none;" accept="image/*,.pdf,.doc,.docx,.txt,.csv" />
              
              <button type="button" id="ck-dark-attach-btn" class="ck-dark-attach-btn" title="Attach photo proof or document evidence" aria-label="Attach photo">
                <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
              </button>

              <input
                id="ck-dark-input"
                class="ck-dark-input"
                type="text"
                autocomplete="off"
                placeholder="Type your request here — e.g. 'garbage not collected near FC road'..."
                aria-label="Civic assistant message input"
              />

              <button type="button" id="ck-dark-mic-btn" class="ck-dark-mic-btn" title="Voice dictation" aria-label="Voice dictation">
                ${du.mic}
              </button>

              <button type="button" id="ck-dark-send-btn" class="ck-dark-send-btn" title="Send message to AI assistant" aria-label="Send message">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
                <span>Send</span>
              </button>
            </div>
          </div>

          <!-- Chips including Contribute / Volunteer and Understand an issue -->
          <div class="ck-dark-suggestions" id="ck-dark-suggestions">
            <span class="ck-dark-chip" data-text="garbage not collected near FC road for 4 days">
              🗑️ Garbage complaint
            </span>
            <span class="ck-dark-chip" data-text="streetlights are completely broken and dark on our lane">
              💡 Broken streetlights
            </span>
            <span class="ck-dark-chip" data-text="deep dangerous pothole damaged vehicles on the main road">
              💥 Road pothole
            </span>
            <span class="ck-dark-chip" data-text="clean water pipeline leaking heavily onto the street">
              🚰 Water pipe leak
            </span>
            <span class="ck-dark-chip" data-text="I want to start a community cleanliness and greening drive">
              🌿 Start an initiative
            </span>
            <span class="ck-dark-chip" data-text="I want to contribute skills or volunteer">
              🤝 Contribute / Volunteer
            </span>
            <span class="ck-dark-chip" data-text="I want to understand municipal bylaws and civic issues">
              📖 Understand an issue
            </span>
            <span class="ck-dark-chip" data-text="what is happening with my requests">
              📋 Check my status
            </span>
          </div>

          <!-- Dark Card Footer: Guarantee on left, Prefer a form? on right -->
          <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center;">
            <span style="color:rgba(255,255,255,0.65); font-size:0.84rem; font-weight:400;">
              You review everything before it is submitted.
            </span>
            <a href="/entities/new" class="ck-form-fallback-link" style="color:rgba(255,255,255,0.85); font-size:0.85rem; font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:4px; transition:color 0.15s ease;">
              <span>Prefer a form?</span>
              <span>→</span>
            </a>
          </div>

        </section><!-- /.ck-agent-dark-card -->

          <section class="ws-panel" aria-labelledby="my-requests-title">
            <div class="ws-panel-head">
              <div>
                <h2 id="my-requests-title">Your requests</h2>
                <p>${c.length?`${v.length} in progress · ${m.length} approved${g.length?` · ${g.length} not accepted`:""}${h.length?` · ${h.length} draft${h.length===1?"":"s"}`:""}`:"Everything you file appears here."}</p>
              </div>
              ${c.length?'<a class="ws-panel-link" href="/entities">See all</a>':""}
            </div>
            <div class="ws-list">${w}</div>
          </section>

          <section class="ws-panel" aria-labelledby="nearby-title">
            <div class="ws-panel-head">
              <div>
                <h2 id="nearby-title">Approved near you</h2>
                <p id="ck-around-subtitle">Public civic work within 10 km of you.</p>
              </div>
              <a class="ws-panel-link" href="/nearby">Open the map</a>
            </div>
            <div class="ws-list" id="ck-around-grid"></div>
          </section>
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-labelledby="updates-title">
            <div class="ws-panel-head"><div><h2 id="updates-title">Latest on your requests</h2></div></div>
            <div class="ws-list">${x}</div>
          </section>

          <section class="ws-panel" aria-label="Civic Buzz">
            ${su()}
          </section>
        </aside>
      </div>
    </div>`;const T=document.getElementById("ck-around-grid"),E=async _=>{var B;if(!T)return;if(!_){T.innerHTML=`
        <div class="ws-empty">
          <strong>Share your location to see approved work around you.</strong>
          Your location stays on this device and is only used to find nearby public records.
          <div style="margin-top:12px;"><button type="button" class="btn btn-secondary btn-sm" id="ck-nearby-share-btn">Use my location</button></div>
        </div>`,(B=document.getElementById("ck-nearby-share-btn"))==null||B.addEventListener("click",()=>{var V;(V=document.getElementById("ck-location-grant-btn"))==null||V.click()});return}T.innerHTML='<div class="ws-empty">Looking around you…</div>';const R=((await fe.nearby(_.lat,_.lng,10).catch(()=>({data:[]}))).data||[]).slice(0,5);T.innerHTML=R.length?R.map(V=>nn({id:V.entity_id,title:V.name,meta:[Number.isFinite(V.distance_km)?`${V.distance_km} km away`:""],action:"View"})).join(""):'<div class="ws-empty">No approved public records within 10 km yet.</div>'};Tn&&document.removeEventListener("ck:location",Tn),Tn=_=>E(_.detail),document.addEventListener("ck:location",Tn),si()||E(null),hu(),Or()}function hu(i,n){let s="ck-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,9),o=!1,r=null;const c=document.getElementById("ck-location-bar"),d=document.getElementById("ck-location-bar-text"),u=document.getElementById("ck-location-grant-btn"),h=document.getElementById("ck-location-dismiss-btn"),m=document.getElementById("ck-around-subtitle");function g(O){if(!O)return;const K=O.area?O.area.split(",")[0].trim():"your area";document.getElementById("ck-citizen-greeting-sub"),m&&(m.textContent=`Public civic work within 10 km of ${K}.`),c&&(c.classList.add("ck-location-active"),d&&(d.textContent=`📍 Location: ${O.area}`),u&&(u.style.display="none"),h&&(h.style.display="none"),setTimeout(()=>{c.style.display="none"},3e3)),document.dispatchEvent(new CustomEvent("ck:location",{detail:O}))}const v=si();v?g(v):$r()||c&&(c.style.display="flex"),u==null||u.addEventListener("click",async()=>{u&&(u.textContent="⏳ Detecting…"),u&&(u.disabled=!0);try{const O=await On();g(O)}catch{d&&(d.textContent="Location access was not granted."),u&&(u.style.display="none"),setTimeout(()=>{c&&(c.style.display="none")},2500)}}),h==null||h.addEventListener("click",()=>{rd(),c&&(c.style.display="none")});const b=document.getElementById("ck-dark-input"),w=document.getElementById("ck-dark-send-btn"),$=document.getElementById("ck-dark-attach-btn"),x=document.getElementById("ck-dark-file-input"),T=document.getElementById("ck-dark-mic-btn"),E=document.getElementById("ck-dark-file-preview"),_=document.getElementById("ck-dark-thread"),P=document.getElementById("ck-dark-reset-btn");function R(){var G;if(!E)return;if(!r){E.innerHTML="",E.style.display="none";return}const O=r.type.startsWith("image/"),K=O?URL.createObjectURL(r):null,I=r.size<1024*1024?(r.size/1024).toFixed(1)+" KB":(r.size/(1024*1024)).toFixed(1)+" MB";E.style.display="flex",E.innerHTML=`
      <div class="ck-dark-file-chip">
        ${O?`<img src="${K}" class="ck-dark-file-thumb" alt="Preview"/>`:"<span>📄</span>"}
        <span><strong>${ee(r.name)}</strong> (${I})</span>
        <button type="button" id="ck-dark-remove-file" class="ck-dark-file-remove" title="Remove attachment">&times;</button>
      </div>
    `,(G=document.getElementById("ck-dark-remove-file"))==null||G.addEventListener("click",()=>{r=null,x&&(x.value=""),R()})}$==null||$.addEventListener("click",()=>x==null?void 0:x.click());let B=!1;x==null||x.addEventListener("change",async O=>{var G;const K=(G=O.target.files)==null?void 0:G[0];if(!K)return;const I=await br(K);if(x&&(x.value=""),I.size>yr){V(A("That file is larger than 10 MB, so I cannot take it. Please choose a smaller one.")),B=!1;return}if(B){B=!1,oe("",I);return}r=I,R(),b==null||b.focus()}),T==null||T.addEventListener("click",()=>{T.classList.toggle("active"),T.classList.contains("active")?(b.placeholder="Listening live... say your complaint...",setTimeout(()=>{T.classList.contains("active")&&(b.value="Massive open pothole right outside Ferguson College gate causing traffic jam",T.classList.remove("active"),b.placeholder="Type your request here — e.g. 'garbage not collected near FC road'...",b.focus())},1800)):b.placeholder="Type your request here — e.g. 'garbage not collected near FC road'..."});function V(O){if(!_)return;_.querySelectorAll(".assist-chips").forEach(I=>I.remove()),_.style.display="flex";const K=document.createElement("div");for(K.innerHTML=O;K.firstChild;)_.appendChild(K.firstChild);_.scrollTop=_.scrollHeight}function N(O,K=null){let I="";return K&&(K.isImage&&K.previewUrl?I=`
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
            <img src="${ee(K.previewUrl)}" class="ck-dark-user-img" alt="Proof" />
            <div style="font-size:0.75rem;">
              <div>📷 <strong>${ee(K.name)}</strong></div>
              <div style="opacity:0.8;">${ee(K.sizeStr)}</div>
            </div>
          </div>
        `:I=`
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px; font-size:0.75rem;">
            <span>📄</span>
            <div><strong>${ee(K.name)}</strong> (${ee(K.sizeStr)})</div>
          </div>
        `),`
      <div class="ck-dark-msg-row ck-dark-msg-user">
        <div class="ck-dark-bubble-user">
          ${I}
          <div>${ee(O)}</div>
        </div>
      </div>
    `}function A(O){return`
      <div class="ck-dark-msg-row ck-dark-msg-agent">
        <div class="ck-dark-avatar" style="width:28px; height:28px; box-shadow:none;">
          <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <div class="ck-dark-bubble-agent">
          ${ee(O||"").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br>")}
        </div>
      </div>
    `}function q(){return`
      <div class="ck-dark-msg-row ck-dark-msg-agent" id="ck-dark-thinking">
        <div class="ck-dark-avatar" style="width:28px; height:28px; box-shadow:none;">
          <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <div class="ck-dark-bubble-agent" style="display:flex; align-items:center; gap:8px; padding:10px 16px;">
          <span style="font-size:0.8rem; font-weight:600; color:var(--primary-500);">Civic Assistant analyzing</span>
          <div class="agent-thinking-dots" style="padding:0;"><span></span><span></span><span></span></div>
        </div>
      </div>
    `}function J(O,K,I=[]){const G=Array.isArray(O)?O.map(U=>`
      <div class="ck-dark-confirm-row">
        <span class="ck-dark-confirm-label">${ee(U.label)}</span>
        <span class="ck-dark-confirm-val">${ee(U.value)}</span>
      </div>
    `).join(""):"";return`
      <div class="ck-dark-msg-row ck-dark-msg-agent">
        <div class="ck-dark-avatar" style="width:28px; height:28px; background:#10b981; box-shadow:none;">
          <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div class="ck-dark-confirm-card">
          <div class="ck-dark-confirm-title">
            Ready to send. Is this right?
          </div>
          <p style="font-size:0.82rem; color:rgba(255,255,255,0.85); margin-bottom:12px;">
            ${ee(K.split(`

`)[0]||"Please review your request summary before submitting.")}
          </p>
          <div class="ck-dark-confirm-table">${G}</div>
          <div class="ck-dark-confirm-editor" hidden>
            ${I&&I.length?wr(I):""}
            <div class="ck-dark-confirm-actions">
              <button type="button" class="ck-dark-btn-primary ck-dark-edit-save">Save changes</button>
              <button type="button" class="ck-dark-btn-secondary ck-dark-edit-cancel">Cancel</button>
            </div>
          </div>
          <div class="ck-dark-confirm-actions" id="ck-dark-confirm-actions">
            <button type="button" id="ck-dark-confirm-submit-btn" class="ck-dark-btn-primary">
              Send it
            </button>
            ${I&&I.length?'<button type="button" id="ck-dark-confirm-edit-btn" class="ck-dark-btn-secondary">Edit details</button>':""}
            <button type="button" id="ck-dark-confirm-cancel-btn" class="ck-dark-btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    `}function Y(O){const K=String(O.text||"").split(`
`).slice(1).join(" ").replace(/\*\*/g,"").trim();return`
      <div class="ck-dark-msg-row ck-dark-msg-agent">
        <div class="ck-dark-avatar" style="width:28px; height:28px; background:#16a34a; box-shadow:none;">
          <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
        </div>
        <div class="ck-dark-success-card" role="status">
          <div class="ck-dark-success-badge">Sent · ${ee(O.reference||`#${O.entity_id}`)}</div>
          <p style="font-size:0.9rem; color:#f1f5f9; margin-bottom:6px;"><strong>${ee(O.entity_name||"")}</strong></p>
          ${K?`<p style="font-size:0.84rem; color:rgba(255,255,255,0.8); margin-bottom:12px;">${ee(K)}</p>`:""}
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="/entities/${Number(O.entity_id)}" class="ck-dark-btn-primary">Open my request →</a>
            <button type="button" id="ck-dark-new-case-btn" class="ck-dark-btn-secondary">Something else</button>
          </div>
        </div>
      </div>
    `}_==null||_.addEventListener("click",async O=>{const K=O.target.closest(".assist-chip");if(!K)return;const I=K.getAttribute("data-reply");if(I==="__attach_photo"){B=!0,x==null||x.click();return}if(I==="__share_location"){if(!si())try{await On()}catch{V(A("I could not get your location. You can type a landmark or street name instead."));return}oe("It's right where I am");return}oe(I)});async function oe(O,K=null,I=null){var j,ae;const G=K||r,U=(O||"").trim();if(o||!U&&!G)return;o=!0;let Se=null;if(G){const de=G.type.startsWith("image/");Se={name:G.name,sizeStr:G.size<1024*1024?(G.size/1024).toFixed(1)+" KB":(G.size/(1024*1024)).toFixed(1)+" MB",isImage:de,previewUrl:de?URL.createObjectURL(G):null}}b&&(b.value=""),r=null,x&&(x.value=""),R(),V(N(U||(G?`Attached file: ${G.name}`:""),Se)),V(q()),w&&(w.disabled=!0);try{const de=si(),we=zr(de),xe=await Rn.chat(s,we+U,G,Vt(),I);(j=document.getElementById("ck-dark-thinking"))==null||j.remove();const se=xe.data;if(se.type==="confirm")V(Fa(se,J(se.summary||[],se.lead||"Here is what I will send:",se.editable||[]))),setTimeout(()=>{var ci,Bt,di,cn,Mi;const ie=[...document.querySelectorAll(".ck-dark-confirm-card")].at(-1),ke=ie==null?void 0:ie.querySelector(".ck-dark-confirm-editor"),lt=ie==null?void 0:ie.querySelector(".ck-dark-confirm-table"),Pt=document.getElementById("ck-dark-confirm-actions"),Kt=De=>{var $t;!ke||!lt||!Pt||(ke.hidden=!De,lt.hidden=De,Pt.hidden=De,De&&(($t=ke.querySelector(".se-input"))==null||$t.focus()))};(ci=document.getElementById("ck-dark-confirm-edit-btn"))==null||ci.addEventListener("click",()=>Kt(!0)),(Bt=ke==null?void 0:ke.querySelector(".ck-dark-edit-cancel"))==null||Bt.addEventListener("click",()=>Kt(!1)),(di=ke==null?void 0:ke.querySelector(".ck-dark-edit-save"))==null||di.addEventListener("click",()=>{const{edits:De,changes:$t}=xr(ke);if(!$t.length){Kt(!1);return}ke.remove(),Pt==null||Pt.remove(),oe(`Changed: ${$t.join("; ")}`,null,De)}),(cn=document.getElementById("ck-dark-confirm-submit-btn"))==null||cn.addEventListener("click",()=>{var De;(De=document.getElementById("ck-dark-confirm-actions"))==null||De.remove(),oe("yes")}),(Mi=document.getElementById("ck-dark-confirm-cancel-btn"))==null||Mi.addEventListener("click",()=>{var De;(De=document.getElementById("ck-dark-confirm-actions"))==null||De.remove(),oe("cancel")})},50);else if(se.type==="submitted")V(Fa(se,Y(se))),setTimeout(()=>{var ie;(ie=document.getElementById("ck-dark-new-case-btn"))==null||ie.addEventListener("click",()=>{pe()})},50);else{const ie=Array.isArray(se.options)&&se.options.length?`<div class="assist-chips assist-chips-dark" role="group" aria-label="Suggested answers">${se.options.map(ke=>`<button type="button" class="assist-chip" data-reply="${ee(ke.value)}">${ee(ke.label)}</button>`).join("")}</div>`:"";V(Fa(se,A(se.text||"Tell me a little more.")+ie))}}catch(de){(ae=document.getElementById("ck-dark-thinking"))==null||ae.remove(),V(A("I encountered a connection hiccup with the AI dispatcher. Please try describing your issue again.")),console.error("[Cockpit Agent Error]:",de)}finally{o=!1,w&&(w.disabled=!1),b==null||b.focus()}}w==null||w.addEventListener("click",()=>{oe(b==null?void 0:b.value)}),b==null||b.addEventListener("keydown",O=>{O.key==="Enter"&&!O.shiftKey&&(O.preventDefault(),oe(b.value))}),document.querySelectorAll(".ck-dark-chip").forEach(O=>{O.addEventListener("click",()=>{const K=O.getAttribute("data-text");K&&oe(K)})}),document.querySelectorAll(".ck-gateway-trigger").forEach(O=>{O.addEventListener("click",()=>{const K=O.getAttribute("data-gateway-prompt"),I=document.getElementById("ck-dark-cockpit");I&&I.scrollIntoView({behavior:"smooth",block:"center"}),b&&(b.value=K||"",b.focus())})});function pe(){s&&Rn.clearSession(s),s="ck-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,9),o=!1,r=null,x&&(x.value=""),R(),_&&(_.innerHTML="",_.style.display="none"),b==null||b.focus()}P==null||P.addEventListener("click",pe)}async function mu(i,n){var m;const s=n.assignedArea||"",[o,r]=await Promise.all([ta(),s?fe.list({area:s,limit:100}).catch(()=>({data:[]})):Promise.resolve({data:[]})]),c=r.data||[],d=new Set(o.map(g=>g.entity_id)),u=c.filter(g=>!d.has(g.entity_id)&&String(g.status||"").toLowerCase()!=="draft"),h=g=>c.filter(v=>g.includes(String(v.status||"").toLowerCase())).length;i.innerHTML=`
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">Area coordinator${s?` · ${ee(s)}`:""}</div>
          <h1>${rn()}, ${ee(ln(n))}</h1>
          <p>${s?`You verify what citizens in ${ee(s)} file, and pass it to the director or send it back with a reason.`:"No ward is assigned to your account yet, so nothing can be routed to you. Ask an administrator to assign one."}</p>
        </div>
      </header>

      ${ms({count:o.length,waitingTitle:`${o.length===1?"record is":"records are"} waiting for your review`,waitingText:"Start with the one that has waited longest.",clearTitle:"Nothing is waiting for you",clearText:s?`Every record filed in ${s} has been reviewed.`:"No ward assigned.",nextId:(m=o[0])==null?void 0:m.entity_id})}

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ws-panel" aria-labelledby="queue-title">
            <div class="ws-panel-head">
              <div><h2 id="queue-title">Waiting for you</h2><p>Oldest first. Open a record to verify or reject it.</p></div>
            </div>
            <div class="ws-list">
              ${o.length?o.map(ia).join(""):'<div class="ws-empty"><strong>All caught up.</strong>New submissions from your ward appear here and in the bell.</div>'}
            </div>
          </section>

          <section class="ws-panel" aria-labelledby="ward-title-h">
            <div class="ws-panel-head">
              <div><h2 id="ward-title-h">Your ward at a glance</h2><p>${s?`Every record in ${ee(s)}.`:""}</p></div>
              ${s?`<a class="ws-panel-link" href="/entities?area=${encodeURIComponent(s)}">All ward records</a>`:""}
            </div>
            <div class="ws-facts">
              ${rt(o.length,"Waiting for you")}
              ${rt(h(["coordinator_approved"]),"With the director")}
              ${rt(h(["approved"]),"Approved")}
              ${rt(h(["rejected"]),"Sent back")}
            </div>
            <div class="ws-list">
              ${u.slice(0,5).map(g=>{var v;return nn({id:g.entity_id,title:g.name,meta:[hs(g),(v=g.owner)!=null&&v.name?`from ${g.owner.name}`:""],side:ps(g.status)})}).join("")}
            </div>
          </section>
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-label="Shortcuts">
            <div class="ws-panel-head"><div><h2>Shortcuts</h2></div></div>
            <div class="ws-actions">
              ${s?We(`/entities?area=${encodeURIComponent(s)}`,Ne.list,"Ward records",`Everything filed in ${s}`):""}
              ${We("/buzz?tab=review",Ne.buzz,"Civic Buzz review","Posts waiting for moderation")}
              ${We("/reports",Ne.chart,"Reports","Counts by status and area, with export")}
            </div>
          </section>
        </aside>
      </div>
    </div>`}async function fu(i,n){var m;const[s,o]=await Promise.all([ta(),fe.list({limit:100}).catch(()=>({data:[]}))]),r=g=>{const v=String(g.area||"").trim().toLowerCase();return v===""||v==="unassigned"},c=(o.data||[]).filter(r).filter(g=>g.owner_user_id),d=new Set(s.map(g=>g.entity_id)),u=c.filter(g=>!d.has(g.entity_id)&&String(g.status||"").toLowerCase()!=="draft"),h=g=>c.filter(v=>g.includes(String(v.status||"").toLowerCase())).length;i.innerHTML=`
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">General coordinator · records with no ward</div>
          <h1>${rn()}, ${ee(ln(n))}</h1>
          <p>Records filed without a ward have no area coordinator. They come to you, so that nothing a citizen files is left unanswered.</p>
        </div>
      </header>

      ${ms({count:s.length,waitingTitle:`${s.length===1?"record with no ward is":"records with no ward are"} waiting for your review`,waitingText:"Start with the one that has waited longest.",clearTitle:"Nothing is waiting for you",clearText:"Every record without a ward has been reviewed.",nextId:(m=s[0])==null?void 0:m.entity_id})}

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ws-panel" aria-labelledby="gq-title">
            <div class="ws-panel-head"><div><h2 id="gq-title">Waiting for you</h2><p>Oldest first. Open a record to verify or reject it.</p></div></div>
            <div class="ws-list">
              ${s.length?s.map(ia).join(""):`<div class="ws-empty"><strong>All caught up.</strong>A record reaches you only when it has no ward. Records with a ward go to that ward's coordinator.</div>`}
            </div>
          </section>

          <section class="ws-panel" aria-labelledby="gu-title">
            <div class="ws-panel-head"><div><h2 id="gu-title">Records with no ward</h2><p>What has happened to the ones already reviewed.</p></div></div>
            <div class="ws-facts">
              ${rt(s.length,"Waiting for you")}
              ${rt(h(["coordinator_approved"]),"With the director")}
              ${rt(h(["approved"]),"Approved")}
              ${rt(h(["rejected"]),"Sent back")}
            </div>
            <div class="ws-list">
              ${u.slice(0,5).map(g=>{var v;return nn({id:g.entity_id,title:g.name,meta:[hs(g),(v=g.owner)!=null&&v.name?`from ${g.owner.name}`:""],side:ps(g.status)})}).join("")}
            </div>
          </section>
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-label="Shortcuts">
            <div class="ws-panel-head"><div><h2>Shortcuts</h2></div></div>
            <div class="ws-actions">
              ${We("/entities",Ne.list,"All records","Browse every module and ward")}
              ${We("/buzz?tab=review",Ne.buzz,"Civic Buzz review","Posts waiting for moderation")}
              ${We("/reports",Ne.chart,"Reports","Counts by status and area, with export")}
            </div>
          </section>
        </aside>
      </div>
    </div>`}async function gu(i,n,s){var g,v,b,w,$,x,T,E;const[o,r]=await Promise.all([ta(),fe.list({status:"submitted",limit:1}).catch(()=>({pagination:{total:0}}))]),c=[...new Set(o.map(_=>_.entity_type))];let d=null;const u=_=>o.filter(P=>!_||P.entity_type===_);i.innerHTML=`
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">Director · final approval</div>
          <h1>${rn()}, ${ee(ln(n))}</h1>
          <p>Coordinators have verified these. Your decision is the last step, and it can start follow-up records automatically.</p>
        </div>
      </header>

      ${ms({count:o.length,waitingTitle:`${o.length===1?"decision is":"decisions are"} waiting for you`,waitingText:`${((g=r.pagination)==null?void 0:g.total)||0} more ${(((v=r.pagination)==null?void 0:v.total)||0)===1?"record is":"records are"} still with coordinators.`,clearTitle:"No decisions are waiting",clearText:`${((b=r.pagination)==null?void 0:b.total)||0} ${(((w=r.pagination)==null?void 0:w.total)||0)===1?"record is":"records are"} still with coordinators.`,nextId:($=o[0])==null?void 0:$.entity_id,nextLabel:"Decide next"})}

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ws-panel" aria-labelledby="dq-title">
            <div class="ws-panel-head">
              <div><h2 id="dq-title">Waiting for your decision</h2><p>Oldest first.</p></div>
            </div>
            ${c.length>1?`
              <div class="ws-chips" role="tablist" aria-label="Filter by module" id="dq-chips">
                <button type="button" class="ws-chip is-on" role="tab" aria-selected="true" data-module="">All <span>${o.length}</span></button>
                ${c.map(_=>`<button type="button" class="ws-chip" role="tab" aria-selected="false" data-module="${ee(_)}">${ee(Nr(_))} <span>${u(_).length}</span></button>`).join("")}
              </div>`:""}
            <div class="ws-list" id="dq-list"></div>
          </section>

          <div id="ward-activity-widget"></div>
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-label="Oversight">
            <div class="ws-panel-head"><div><h2>Oversight</h2></div></div>
            <div class="ws-actions">
              ${We("/governance",Ne.shield,"Governance Intelligence","Control gaps and process health")}
              ${We("/reports",Ne.chart,"Reports","Run and export to PDF or Excel")}
              ${We("/entities",Ne.list,"All records","Every module and ward")}
              ${We("/modules",Ne.graph,"Modules and rules",`${((x=s.entityTypes)==null?void 0:x.length)||0} modules, ${((T=s.rules)==null?void 0:T.length)||0} rules`)}
            </div>
          </section>
        </aside>
      </div>
    </div>`;const h=document.getElementById("dq-list"),m=()=>{const _=u(d),P=_.slice(0,8);h.innerHTML=_.length?P.map(ia).join("")+(_.length>P.length?`<div class="ws-empty">${_.length-P.length} more. They move up as you decide these.</div>`:""):'<div class="ws-empty"><strong>All caught up.</strong>Records appear here once a coordinator has verified them.</div>'};(E=document.getElementById("dq-chips"))==null||E.addEventListener("click",_=>{const P=_.target.closest(".ws-chip");P&&(d=P.getAttribute("data-module")||null,document.querySelectorAll("#dq-chips .ws-chip").forEach(R=>{const B=R===P;R.classList.toggle("is-on",B),R.setAttribute("aria-selected",String(B))}),m())}),m(),cu(document.getElementById("ward-activity-widget"))}async function vu(i,n,s){var b;const[o,r,c]=await Promise.all([ta(),fe.list({limit:1}).catch(()=>({pagination:{total:0}})),cs.listUsers({limit:500}).catch(()=>({data:[]}))]),d=s.entityTypes||[],u=s.rules||[],h=c.data||[],m=w=>h.filter($=>$.role===w).length,g=h.filter(w=>w.role==="coordinator_area"&&!String(w.assignedArea||w.assigned_area||"").trim()),v=[...d].sort((w,$)=>{var x,T;return(((x=$._count)==null?void 0:x.entities)||0)-(((T=w._count)==null?void 0:T.entities)||0)}).map(w=>{var E,_;const $=et(w),x=u.filter(P=>P.source_entity_type_id===w.entity_type_id).length,T=((E=w._count)==null?void 0:E.entities)||0;return`
        <a class="ws-item" href="/entities?entity_type_id=${Number(w.entity_type_id)}">
          <span style="min-width:0;">
            <span class="ws-item-title">${ee($.shortTitle||w.name)}</span>
            <span class="ws-item-meta"><span>${T} record${T===1?"":"s"}</span>${x?`<span>${x} rule${x===1?"":"s"}</span>`:""}${(_=w.domain)!=null&&_.domain_name?`<span>${ee(w.domain.domain_name)}</span>`:""}</span>
          </span>
          <span class="ws-item-side"><span class="ws-item-go">Records ${Ne.arrow}</span></span>
        </a>`}).join("");i.innerHTML=`
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">Administrator · platform</div>
          <h1>${rn()}, ${ee(ln(n))}</h1>
          <p>You look after the platform itself: the modules citizens can use, the rules that link them, and who holds which role.</p>
        </div>
        <div class="ws-head-actions">
          <a class="btn btn-primary" href="/module-builder">Build a module</a>
        </div>
      </header>

      <section class="ws-panel" aria-label="Platform at a glance">
        <div class="ws-facts" style="border-top:0;">
          ${rt(d.length,"Modules","/modules")}
          ${rt(u.length,"Rules linking them","/modules")}
          ${rt(h.length,"People","/admin")}
          ${rt(((b=r.pagination)==null?void 0:b.total)||0,"Records","/entities")}
        </div>
      </section>

      ${g.length?`
        <div class="alert alert-warning" role="status">
          <strong>${g.length} area coordinator${g.length===1?" has":"s have"} no ward.</strong>
          Nothing can be routed to them until one is assigned. <a href="/admin">Assign a ward</a>
        </div>`:""}

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ws-panel" aria-labelledby="am-title">
            <div class="ws-panel-head">
              <div><h2 id="am-title">Modules</h2><p>Each one is configuration: a form, a workflow and optional rules.</p></div>
              <a class="ws-panel-link" href="/modules">See how they are linked</a>
            </div>
            <div class="ws-list">${v||'<div class="ws-empty"><strong>No modules yet.</strong>Build the first one with the module builder.</div>'}</div>
          </section>

          ${o.length?`
          <section class="ws-panel" aria-labelledby="aq-title">
            <div class="ws-panel-head"><div><h2 id="aq-title">Waiting for a final decision</h2><p>As an administrator you can also give final approval.</p></div></div>
            <div class="ws-list">${o.slice(0,5).map(ia).join("")}${o.length>5?`<div class="ws-empty">${o.length-5} more.</div>`:""}</div>
          </section>`:""}
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-labelledby="ap-title">
            <div class="ws-panel-head">
              <div><h2 id="ap-title">People</h2></div>
              <a class="ws-panel-link" href="/admin">Manage</a>
            </div>
            <div class="ws-list">
              ${[["citizen","Citizens"],["coordinator_area","Area coordinators"],["coordinator_general","General coordinators"],["director","Directors"],["admin","Administrators"]].map(([w,$])=>`<div class="ws-item" style="padding-top:11px; padding-bottom:11px;"><span class="ws-item-title" style="font-weight:500;">${$}</span><span class="ws-item-side"><strong>${m(w)}</strong></span></div>`).join("")}
            </div>
          </section>

          <section class="ws-panel" aria-label="Tools">
            <div class="ws-panel-head"><div><h2>Tools</h2></div></div>
            <div class="ws-actions">
              ${We("/module-builder",Ne.build,"Module builder","Form, workflow, rule and report, no code")}
              ${We("/admin",Ne.users,"Users and roles","Change a role or assign a ward")}
              ${We("/governance",Ne.shield,"Governance Intelligence","Control gaps and process health")}
              ${We("/reports",Ne.chart,"Reports","Run and export")}
            </div>
          </section>
        </aside>
      </div>
    </div>`}function xt(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}let Q={page:1,limit:20},ti=[];async function yu(i={},n=null){if(!kt(ne))return;const s=n||new URLSearchParams(window.location.search);s.has("status")?Q.status=s.get("status"):delete Q.status,s.has("entity_type_id")?Q.entity_type_id=s.get("entity_type_id"):delete Q.entity_type_id,s.has("name")?Q.name=s.get("name"):delete Q.name,s.has("area")?Q.area=s.get("area"):delete Q.area,s.has("page")?Q.page=Number(s.get("page")):Q.page=1;const o=He(),c=Gn()==="citizen",d=s.get("type")==="initiative",u=s.get("tab")||(s.get("following")?"following":s.get("status")==="draft"?"drafts":s.get("status")==="approved"?"contributions":"requests");c?d?delete Q.owner_user_id:u==="following"?(Q.following=1,delete Q.owner_user_id):u==="contributions"?(Q.owner_user_id=o.user_id,Q.status="approved",delete Q.following):u==="drafts"?(Q.owner_user_id=o.user_id,Q.status="draft",delete Q.following):(Q.owner_user_id=o.user_id,delete Q.following,s.has("status")||delete Q.status):(delete Q.owner_user_id,delete Q.following);try{ti=(await fe.listTypes().catch(()=>({data:[]}))).data||[]}catch{ti=[]}const h=ti.find(x=>String(x.entity_type_id)===String(Q.entity_type_id)),m=et(h);let g="All records",v="Browse, search, and track all civic cases and requests across your workspace.";if(d){if(g="Civic Initiatives",v="Browse, join, or start community civic initiatives and neighborhood drives.",!Q.entity_type_id&&ti.length>0){const x=ti.find(T=>(T.name||"").toLowerCase().includes("movement")||T.entity_type_id===1);x&&(Q.entity_type_id=x.entity_type_id)}}else c?(g=h?`My ${m.title} Requests`:"My requests",v=h?`Tracking cases initiated by you for capability "${m.title}".`:"Track, review, and manage your civic requests, contributions, and community actions."):h&&(g=`${m.title} Cases`,v=`Browsing cases for capability "${m.title}".`);const b=document.getElementById("app");b.innerHTML=Ee(`
    <div class="page-header mb-6">
      <div class="page-header-left">
        <h1 id="entities-header-title">${xt(g)}</h1>
        <p id="entities-header-subtitle">${xt(v)}</p>
      </div>
      <div class="page-header-actions">
        <a href="/entities/new${Q.entity_type_id?`?entity_type_id=${Q.entity_type_id}`:""}" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:6px; background:var(--primary); border-color:var(--primary);">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          ${d?"Start New Initiative":"Start Civic Action"}
        </a>
      </div>
    </div>

    ${c&&!d?`
      <!-- My Activity Tabs: Requests, Following, Contributions, Drafts -->
      <div class="ck-activity-tabs-wrap" style="display:flex; gap:8px; margin-bottom:18px; flex-wrap:wrap;">
        <a href="/entities?tab=requests" class="btn ${u==="requests"?"btn-primary":"btn-secondary"} btn-sm" style="border-radius:20px; font-weight:700; padding:6px 16px; ${u==="requests"?"background:var(--primary); border-color:var(--primary);":""}">Requests</a>
        <a href="/entities?tab=following" class="btn ${u==="following"?"btn-primary":"btn-secondary"} btn-sm" style="border-radius:20px; font-weight:700; padding:6px 16px; ${u==="following"?"background:var(--primary); border-color:var(--primary);":""}">Following</a>
        <a href="/entities?tab=contributions" class="btn ${u==="contributions"?"btn-primary":"btn-secondary"} btn-sm" style="border-radius:20px; font-weight:700; padding:6px 16px; ${u==="contributions"?"background:var(--primary); border-color:var(--primary);":""}">Contributions</a>
        <a href="/entities?tab=drafts" class="btn ${u==="drafts"?"btn-primary":"btn-secondary"} btn-sm" style="border-radius:20px; font-weight:700; padding:6px 16px; ${u==="drafts"?"background:var(--primary); border-color:var(--primary);":""}">Drafts</a>
      </div>
    `:""}
    
    <div class="card mb-6" style="padding: 16px 20px;">
      <div class="filters-bar" style="display:flex; gap:12px; align-items:center; flex-wrap:wrap; width:100%;">
        <!-- Search Box -->
        <div style="flex: 2; min-width: 240px; position: relative;">
          <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; color: var(--text-muted); pointer-events: none;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input type="text" id="filter-search" class="form-control" style="padding-left: 38px; height: 42px; width: 100%; border-radius: var(--radius-md);" placeholder="Search cases by title or location..." value="${xt(Q.name||"")}">
        </div>

        <!-- Dynamic Module Filter -->
        <div style="flex: 1.3; min-width: 210px;">
          <select id="filter-type" class="form-control" style="height: 42px; width: 100%; max-width: none; border-radius: var(--radius-md);">
            <option value="">All Capabilities</option>
            ${ti.map(x=>{const T=et(x);return`<option value="${x.entity_type_id}" ${String(Q.entity_type_id)===String(x.entity_type_id)?"selected":""}>${xt(T.title)}</option>`}).join("")}
          </select>
        </div>

        <!-- Status Filter -->
        <div style="flex: 1.2; min-width: 200px;">
          <select id="filter-status" class="form-control" style="height: 42px; width: 100%; max-width: none; border-radius: var(--radius-md);">
            <option value="">All Statuses</option>
            <option value="draft" ${Q.status==="draft"?"selected":""}>Draft</option>
            <option value="submitted" ${Q.status==="submitted"?"selected":""}>Submitted</option>
            <option value="coordinator_approved" ${Q.status==="coordinator_approved"?"selected":""}>Verified (Pending Approval)</option>
            <option value="approved" ${Q.status==="approved"?"selected":""}>Approved & Active</option>
            <option value="rejected" ${Q.status==="rejected"?"selected":""}>Rejected</option>
            <option value="closed" ${Q.status==="closed"?"selected":""}>Closed</option>
          </select>
        </div>

        <!-- Filter Action Buttons -->
        <div style="display: flex; gap: 8px; align-items: center; flex-shrink: 0;">
          <button id="btn-filter" class="btn btn-primary" style="height: 42px; padding: 0 18px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            Apply Filters
          </button>
          ${Q.status||Q.entity_type_id||Q.name?`
            <button id="btn-clear-filter" class="btn btn-secondary" style="height: 42px; padding: 0 14px; display: inline-flex; align-items: center; gap: 6px;">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              Reset
            </button>
          `:""}
        </div>
      </div>
    </div>
    
    <div id="ck-buzz-drafts-section"></div>
    <div id="entities-content">
      <div class="loading-overlay"><div class="spinner spinner-lg"></div></div>
    </div>
  `,g,ti),Ce();const w=()=>{const x=document.getElementById("filter-status").value,T=document.getElementById("filter-type").value,E=document.getElementById("filter-search").value.trim(),_=new URLSearchParams;x&&_.set("status",x),T&&_.set("entity_type_id",T),E&&_.set("name",E),ne(`/entities${_.toString()?"?"+_.toString():""}`)};document.getElementById("btn-filter").addEventListener("click",w),document.getElementById("filter-search").addEventListener("keypress",x=>{x.key==="Enter"&&w()});const $=document.getElementById("btn-clear-filter");$&&$.addEventListener("click",()=>{ne("/entities")}),await Hr()}async function Hr(){const i=document.getElementById("entities-content");if(!i)return;es();const s=Gn()==="citizen";try{const o=await fe.list(Q),{data:r,pagination:c}=o;if(!r||r.length===0){i.innerHTML=`
        <div class="card p-8 text-center" style="padding:48px 24px; text-align:center;">
          <div style="display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:50%; background:var(--gray-100); color:var(--text-muted); margin:0 auto 12px;">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </div>
          <h3 style="font-size:1.15rem; font-weight:600; margin-bottom:6px; color:var(--text-primary);">
            ${s?"No civic activity yet":"No cases found"}
          </h3>
          <p style="font-size:0.875rem; color:var(--text-muted); max-width:420px; margin:0 auto 20px;">
            ${s?"You have not initiated any civic cases, reports, or applications yet. Start a new civic action to get started.":"No civic cases match your filter. Try adjusting your query or starting a new civic action."}
          </p>
          <div style="display:flex; gap:12px; justify-content:center;">
            ${Q.status||Q.entity_type_id||Q.name?`
              <a href="/entities" class="btn btn-secondary">Clear Filters</a>
            `:""}
            <a href="/entities/new${Q.entity_type_id?`?entity_type_id=${Q.entity_type_id}`:""}" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:6px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Start Civic Action
            </a>
          </div>
        </div>
      `;return}const d=r.map(v=>{var w;const b=et(v.entityType);return`
        <tr>
          <td><a href="/entities/${v.entity_id}" class="text-link font-medium">#PR-${String(v.entity_id).padStart(5,"0")}</a></td>
          <td>
            <a href="/entities/${v.entity_id}" style="color:var(--text-primary); text-decoration:none; font-weight:600;">
              ${xt(v.name)}
            </a>
          </td>
          <td><span class="badge badge-secondary">${xt(b.shortTitle)}</span></td>
          ${s?"":`<td>${xt(((w=v.owner)==null?void 0:w.name)||"System")}</td>`}
          <td>${xt(v.area||"—")}</td>
          <td><span class="badge badge-${v.status}">${mt(v.status)}</span></td>
          <td>
            <a href="/entities/${v.entity_id}" class="btn btn-secondary btn-sm">${s?"View Details →":"Review Case →"}</a>
          </td>
        </tr>
      `}).join(""),u=Math.ceil(c.total/c.limit);let h="";u>1&&(h=`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; padding:0 8px;">
          <div style="font-size:0.85rem; color:var(--text-muted);">
            Showing page ${c.page} of ${u} (${c.total} total cases)
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary btn-sm" id="btn-prev" ${c.page<=1?"disabled":""}>← Previous</button>
            <button class="btn btn-secondary btn-sm" id="btn-next" ${c.page>=u?"disabled":""}>Next →</button>
          </div>
        </div>
      `),i.innerHTML=`
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Title</th>
                <th>Capability Type</th>
                ${s?"":"<th>Submitted By</th>"}
                <th>Area / Jurisdiction</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${d}
            </tbody>
          </table>
        </div>
      </div>
      ${h}
    `;const m=document.getElementById("btn-prev"),g=document.getElementById("btn-next");m&&m.addEventListener("click",()=>{const v=new URLSearchParams(window.location.search);v.set("page",String(Q.page-1)),ne(`/entities?${v.toString()}`)}),g&&g.addEventListener("click",()=>{const v=new URLSearchParams(window.location.search);v.set("page",String(Q.page+1)),ne(`/entities?${v.toString()}`)}),typeof window.civicTranslatePage=="function"&&window.civicTranslatePage()}catch{te("Failed to load cases"),i.innerHTML='<div class="alert alert-error">Error loading cases. Please try again.</div>',typeof window.civicTranslatePage=="function"&&window.civicTranslatePage()}}async function es(){var s;const i=document.getElementById("ck-buzz-drafts-section");if(!i)return;const n=He();if(!n||n.role!=="citizen"){i.innerHTML="";return}try{const r=(await ve.list({status:"draft",limit:10})).data||[];if(r.length===0){i.innerHTML="";return}i.innerHTML=`
      <div class="ck-buzz-drafts-card">
        <div class="ck-buzz-drafts-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="display:inline-flex; align-items:center; color:var(--primary);">${H.draft(22,"var(--primary)")}</span>
            <div>
              <h3 style="font-size:1.05rem; font-weight:800; color:#0f172a; margin:0;">
                My Civic Buzz Drafts (${r.length})
              </h3>
              <p style="font-size:0.78rem; color:#64748b; margin:2px 0 0;">
                Saved Civic Buzz cards waiting to be published to your community.
              </p>
            </div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="ck-draft-new-btn" style="border-radius:999px; font-weight:700;">
            + Create Buzz
          </button>
        </div>

        <div class="ck-buzz-drafts-grid">
          ${r.map(c=>`
            <div class="ck-buzz-draft-item">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <span class="ck-buzz-badge-pill" style="font-size:0.65rem; display:inline-flex; align-items:center; gap:4px;">
                    ${c.template==="initiative"?`${H.initiative(12,"#16a34a")} INITIATIVE`:c.template==="awareness"?`${H.awareness(12,"#0284c7")} AWARENESS`:`${H.flame(12,"#ea580c")} MEME`}
                  </span>
                  <span style="font-size:0.7rem; color:#94a3b8;">${new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <div style="font-weight:700; font-size:0.9rem; color:#0f172a; line-height:1.3; margin-bottom:4px;">
                  "${xt(c.caption)}"
                </div>
                ${c.linked_title?`
                  <div style="font-size:0.75rem; color:#64748b;">
                    Linked: #${c.linked_id} ${xt(c.linked_title)}
                  </div>
                `:""}
              </div>

              <div style="display:flex; justify-content:flex-end; gap:8px; border-top:1px solid #e2e8f0; padding-top:10px;">
                <button type="button" class="btn btn-primary btn-sm ck-draft-edit-btn" data-id="${c.id}" style="border-radius:999px; font-weight:700;">
                  Edit / Publish →
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `,(s=i.querySelector("#ck-draft-new-btn"))==null||s.addEventListener("click",()=>{en(null,()=>es())}),i.querySelectorAll(".ck-draft-edit-btn").forEach(c=>{c.addEventListener("click",()=>{const d=Number(c.getAttribute("data-id")),u=r.find(h=>h.id===d);u&&en(u.linked_id,()=>{es(),Hr()},u)})})}catch{i.innerHTML=""}}let Dn=null;function Fn({title:i,content:n,footer:s="",onClose:o=()=>{}}){Ut();const r=document.getElementById("modal-container"),c=`
    <div class="modal-backdrop" id="modal-backdrop"></div>
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>${bu(i)}</h3>
        <button class="modal-close" id="modal-close-btn">&times;</button>
      </div>
      <div class="modal-body">
        ${n}
      </div>
      ${s?`<div class="modal-footer">${s}</div>`:""}
    </div>
  `;r.innerHTML=c,r.style.pointerEvents="auto";const d=()=>{r.innerHTML="",r.style.pointerEvents="none",Dn=null,o()};Dn=d,document.getElementById("modal-close-btn").addEventListener("click",d),document.getElementById("modal-backdrop").addEventListener("click",d);const u=h=>{h.key==="Escape"&&(d(),document.removeEventListener("keydown",u))};document.addEventListener("keydown",u)}function Ut(){Dn&&Dn()}function bu(i){return String(i).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}var wu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function xu(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var ts={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(i,n){(function(s,o){o(n)})(wu,function(s){var o="1.9.4";function r(e){var t,a,l,p;for(a=1,l=arguments.length;a<l;a++){p=arguments[a];for(t in p)e[t]=p[t]}return e}var c=Object.create||function(){function e(){}return function(t){return e.prototype=t,new e}}();function d(e,t){var a=Array.prototype.slice;if(e.bind)return e.bind.apply(e,a.call(arguments,1));var l=a.call(arguments,2);return function(){return e.apply(t,l.length?l.concat(a.call(arguments)):arguments)}}var u=0;function h(e){return"_leaflet_id"in e||(e._leaflet_id=++u),e._leaflet_id}function m(e,t,a){var l,p,f,y;return y=function(){l=!1,p&&(f.apply(a,p),p=!1)},f=function(){l?p=arguments:(e.apply(a,arguments),setTimeout(y,t),l=!0)},f}function g(e,t,a){var l=t[1],p=t[0],f=l-p;return e===l&&a?e:((e-p)%f+f)%f+p}function v(){return!1}function b(e,t){if(t===!1)return e;var a=Math.pow(10,t===void 0?6:t);return Math.round(e*a)/a}function w(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function $(e){return w(e).split(/\s+/)}function x(e,t){Object.prototype.hasOwnProperty.call(e,"options")||(e.options=e.options?c(e.options):{});for(var a in t)e.options[a]=t[a];return e.options}function T(e,t,a){var l=[];for(var p in e)l.push(encodeURIComponent(a?p.toUpperCase():p)+"="+encodeURIComponent(e[p]));return(!t||t.indexOf("?")===-1?"?":"&")+l.join("&")}var E=/\{ *([\w_ -]+) *\}/g;function _(e,t){return e.replace(E,function(a,l){var p=t[l];if(p===void 0)throw new Error("No value provided for variable "+a);return typeof p=="function"&&(p=p(t)),p})}var P=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"};function R(e,t){for(var a=0;a<e.length;a++)if(e[a]===t)return a;return-1}var B="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function V(e){return window["webkit"+e]||window["moz"+e]||window["ms"+e]}var N=0;function A(e){var t=+new Date,a=Math.max(0,16-(t-N));return N=t+a,window.setTimeout(e,a)}var q=window.requestAnimationFrame||V("RequestAnimationFrame")||A,J=window.cancelAnimationFrame||V("CancelAnimationFrame")||V("CancelRequestAnimationFrame")||function(e){window.clearTimeout(e)};function Y(e,t,a){if(a&&q===A)e.call(t);else return q.call(window,d(e,t))}function oe(e){e&&J.call(window,e)}var pe={__proto__:null,extend:r,create:c,bind:d,get lastId(){return u},stamp:h,throttle:m,wrapNum:g,falseFn:v,formatNum:b,trim:w,splitWords:$,setOptions:x,getParamString:T,template:_,isArray:P,indexOf:R,emptyImageUrl:B,requestFn:q,cancelFn:J,requestAnimFrame:Y,cancelAnimFrame:oe};function O(){}O.extend=function(e){var t=function(){x(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},a=t.__super__=this.prototype,l=c(a);l.constructor=t,t.prototype=l;for(var p in this)Object.prototype.hasOwnProperty.call(this,p)&&p!=="prototype"&&p!=="__super__"&&(t[p]=this[p]);return e.statics&&r(t,e.statics),e.includes&&(K(e.includes),r.apply(null,[l].concat(e.includes))),r(l,e),delete l.statics,delete l.includes,l.options&&(l.options=a.options?c(a.options):{},r(l.options,e.options)),l._initHooks=[],l.callInitHooks=function(){if(!this._initHooksCalled){a.callInitHooks&&a.callInitHooks.call(this),this._initHooksCalled=!0;for(var f=0,y=l._initHooks.length;f<y;f++)l._initHooks[f].call(this)}},t},O.include=function(e){var t=this.prototype.options;return r(this.prototype,e),e.options&&(this.prototype.options=t,this.mergeOptions(e.options)),this},O.mergeOptions=function(e){return r(this.prototype.options,e),this},O.addInitHook=function(e){var t=Array.prototype.slice.call(arguments,1),a=typeof e=="function"?e:function(){this[e].apply(this,t)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(a),this};function K(e){if(!(typeof L>"u"||!L||!L.Mixin)){e=P(e)?e:[e];for(var t=0;t<e.length;t++)e[t]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var I={on:function(e,t,a){if(typeof e=="object")for(var l in e)this._on(l,e[l],t);else{e=$(e);for(var p=0,f=e.length;p<f;p++)this._on(e[p],t,a)}return this},off:function(e,t,a){if(!arguments.length)delete this._events;else if(typeof e=="object")for(var l in e)this._off(l,e[l],t);else{e=$(e);for(var p=arguments.length===1,f=0,y=e.length;f<y;f++)p?this._off(e[f]):this._off(e[f],t,a)}return this},_on:function(e,t,a,l){if(typeof t!="function"){console.warn("wrong listener type: "+typeof t);return}if(this._listens(e,t,a)===!1){a===this&&(a=void 0);var p={fn:t,ctx:a};l&&(p.once=!0),this._events=this._events||{},this._events[e]=this._events[e]||[],this._events[e].push(p)}},_off:function(e,t,a){var l,p,f;if(this._events&&(l=this._events[e],!!l)){if(arguments.length===1){if(this._firingCount)for(p=0,f=l.length;p<f;p++)l[p].fn=v;delete this._events[e];return}if(typeof t!="function"){console.warn("wrong listener type: "+typeof t);return}var y=this._listens(e,t,a);if(y!==!1){var k=l[y];this._firingCount&&(k.fn=v,this._events[e]=l=l.slice()),l.splice(y,1)}}},fire:function(e,t,a){if(!this.listens(e,a))return this;var l=r({},t,{type:e,target:this,sourceTarget:t&&t.sourceTarget||this});if(this._events){var p=this._events[e];if(p){this._firingCount=this._firingCount+1||1;for(var f=0,y=p.length;f<y;f++){var k=p[f],z=k.fn;k.once&&this.off(e,z,k.ctx),z.call(k.ctx||this,l)}this._firingCount--}}return a&&this._propagateEvent(l),this},listens:function(e,t,a,l){typeof e!="string"&&console.warn('"string" type argument expected');var p=t;typeof t!="function"&&(l=!!t,p=void 0,a=void 0);var f=this._events&&this._events[e];if(f&&f.length&&this._listens(e,p,a)!==!1)return!0;if(l){for(var y in this._eventParents)if(this._eventParents[y].listens(e,t,a,l))return!0}return!1},_listens:function(e,t,a){if(!this._events)return!1;var l=this._events[e]||[];if(!t)return!!l.length;a===this&&(a=void 0);for(var p=0,f=l.length;p<f;p++)if(l[p].fn===t&&l[p].ctx===a)return p;return!1},once:function(e,t,a){if(typeof e=="object")for(var l in e)this._on(l,e[l],t,!0);else{e=$(e);for(var p=0,f=e.length;p<f;p++)this._on(e[p],t,a,!0)}return this},addEventParent:function(e){return this._eventParents=this._eventParents||{},this._eventParents[h(e)]=e,this},removeEventParent:function(e){return this._eventParents&&delete this._eventParents[h(e)],this},_propagateEvent:function(e){for(var t in this._eventParents)this._eventParents[t].fire(e.type,r({layer:e.target,propagatedFrom:e.target},e),!0)}};I.addEventListener=I.on,I.removeEventListener=I.clearAllEventListeners=I.off,I.addOneTimeEventListener=I.once,I.fireEvent=I.fire,I.hasEventListeners=I.listens;var G=O.extend(I);function U(e,t,a){this.x=a?Math.round(e):e,this.y=a?Math.round(t):t}var Se=Math.trunc||function(e){return e>0?Math.floor(e):Math.ceil(e)};U.prototype={clone:function(){return new U(this.x,this.y)},add:function(e){return this.clone()._add(j(e))},_add:function(e){return this.x+=e.x,this.y+=e.y,this},subtract:function(e){return this.clone()._subtract(j(e))},_subtract:function(e){return this.x-=e.x,this.y-=e.y,this},divideBy:function(e){return this.clone()._divideBy(e)},_divideBy:function(e){return this.x/=e,this.y/=e,this},multiplyBy:function(e){return this.clone()._multiplyBy(e)},_multiplyBy:function(e){return this.x*=e,this.y*=e,this},scaleBy:function(e){return new U(this.x*e.x,this.y*e.y)},unscaleBy:function(e){return new U(this.x/e.x,this.y/e.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=Se(this.x),this.y=Se(this.y),this},distanceTo:function(e){e=j(e);var t=e.x-this.x,a=e.y-this.y;return Math.sqrt(t*t+a*a)},equals:function(e){return e=j(e),e.x===this.x&&e.y===this.y},contains:function(e){return e=j(e),Math.abs(e.x)<=Math.abs(this.x)&&Math.abs(e.y)<=Math.abs(this.y)},toString:function(){return"Point("+b(this.x)+", "+b(this.y)+")"}};function j(e,t,a){return e instanceof U?e:P(e)?new U(e[0],e[1]):e==null?e:typeof e=="object"&&"x"in e&&"y"in e?new U(e.x,e.y):new U(e,t,a)}function ae(e,t){if(e)for(var a=t?[e,t]:e,l=0,p=a.length;l<p;l++)this.extend(a[l])}ae.prototype={extend:function(e){var t,a;if(!e)return this;if(e instanceof U||typeof e[0]=="number"||"x"in e)t=a=j(e);else if(e=de(e),t=e.min,a=e.max,!t||!a)return this;return!this.min&&!this.max?(this.min=t.clone(),this.max=a.clone()):(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(a.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(a.y,this.max.y)),this},getCenter:function(e){return j((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,e)},getBottomLeft:function(){return j(this.min.x,this.max.y)},getTopRight:function(){return j(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(e){var t,a;return typeof e[0]=="number"||e instanceof U?e=j(e):e=de(e),e instanceof ae?(t=e.min,a=e.max):t=a=e,t.x>=this.min.x&&a.x<=this.max.x&&t.y>=this.min.y&&a.y<=this.max.y},intersects:function(e){e=de(e);var t=this.min,a=this.max,l=e.min,p=e.max,f=p.x>=t.x&&l.x<=a.x,y=p.y>=t.y&&l.y<=a.y;return f&&y},overlaps:function(e){e=de(e);var t=this.min,a=this.max,l=e.min,p=e.max,f=p.x>t.x&&l.x<a.x,y=p.y>t.y&&l.y<a.y;return f&&y},isValid:function(){return!!(this.min&&this.max)},pad:function(e){var t=this.min,a=this.max,l=Math.abs(t.x-a.x)*e,p=Math.abs(t.y-a.y)*e;return de(j(t.x-l,t.y-p),j(a.x+l,a.y+p))},equals:function(e){return e?(e=de(e),this.min.equals(e.getTopLeft())&&this.max.equals(e.getBottomRight())):!1}};function de(e,t){return!e||e instanceof ae?e:new ae(e,t)}function we(e,t){if(e)for(var a=t?[e,t]:e,l=0,p=a.length;l<p;l++)this.extend(a[l])}we.prototype={extend:function(e){var t=this._southWest,a=this._northEast,l,p;if(e instanceof se)l=e,p=e;else if(e instanceof we){if(l=e._southWest,p=e._northEast,!l||!p)return this}else return e?this.extend(ie(e)||xe(e)):this;return!t&&!a?(this._southWest=new se(l.lat,l.lng),this._northEast=new se(p.lat,p.lng)):(t.lat=Math.min(l.lat,t.lat),t.lng=Math.min(l.lng,t.lng),a.lat=Math.max(p.lat,a.lat),a.lng=Math.max(p.lng,a.lng)),this},pad:function(e){var t=this._southWest,a=this._northEast,l=Math.abs(t.lat-a.lat)*e,p=Math.abs(t.lng-a.lng)*e;return new we(new se(t.lat-l,t.lng-p),new se(a.lat+l,a.lng+p))},getCenter:function(){return new se((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new se(this.getNorth(),this.getWest())},getSouthEast:function(){return new se(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(e){typeof e[0]=="number"||e instanceof se||"lat"in e?e=ie(e):e=xe(e);var t=this._southWest,a=this._northEast,l,p;return e instanceof we?(l=e.getSouthWest(),p=e.getNorthEast()):l=p=e,l.lat>=t.lat&&p.lat<=a.lat&&l.lng>=t.lng&&p.lng<=a.lng},intersects:function(e){e=xe(e);var t=this._southWest,a=this._northEast,l=e.getSouthWest(),p=e.getNorthEast(),f=p.lat>=t.lat&&l.lat<=a.lat,y=p.lng>=t.lng&&l.lng<=a.lng;return f&&y},overlaps:function(e){e=xe(e);var t=this._southWest,a=this._northEast,l=e.getSouthWest(),p=e.getNorthEast(),f=p.lat>t.lat&&l.lat<a.lat,y=p.lng>t.lng&&l.lng<a.lng;return f&&y},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(e,t){return e?(e=xe(e),this._southWest.equals(e.getSouthWest(),t)&&this._northEast.equals(e.getNorthEast(),t)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function xe(e,t){return e instanceof we?e:new we(e,t)}function se(e,t,a){if(isNaN(e)||isNaN(t))throw new Error("Invalid LatLng object: ("+e+", "+t+")");this.lat=+e,this.lng=+t,a!==void 0&&(this.alt=+a)}se.prototype={equals:function(e,t){if(!e)return!1;e=ie(e);var a=Math.max(Math.abs(this.lat-e.lat),Math.abs(this.lng-e.lng));return a<=(t===void 0?1e-9:t)},toString:function(e){return"LatLng("+b(this.lat,e)+", "+b(this.lng,e)+")"},distanceTo:function(e){return lt.distance(this,ie(e))},wrap:function(){return lt.wrapLatLng(this)},toBounds:function(e){var t=180*e/40075017,a=t/Math.cos(Math.PI/180*this.lat);return xe([this.lat-t,this.lng-a],[this.lat+t,this.lng+a])},clone:function(){return new se(this.lat,this.lng,this.alt)}};function ie(e,t,a){return e instanceof se?e:P(e)&&typeof e[0]!="object"?e.length===3?new se(e[0],e[1],e[2]):e.length===2?new se(e[0],e[1]):null:e==null?e:typeof e=="object"&&"lat"in e?new se(e.lat,"lng"in e?e.lng:e.lon,e.alt):t===void 0?null:new se(e,t,a)}var ke={latLngToPoint:function(e,t){var a=this.projection.project(e),l=this.scale(t);return this.transformation._transform(a,l)},pointToLatLng:function(e,t){var a=this.scale(t),l=this.transformation.untransform(e,a);return this.projection.unproject(l)},project:function(e){return this.projection.project(e)},unproject:function(e){return this.projection.unproject(e)},scale:function(e){return 256*Math.pow(2,e)},zoom:function(e){return Math.log(e/256)/Math.LN2},getProjectedBounds:function(e){if(this.infinite)return null;var t=this.projection.bounds,a=this.scale(e),l=this.transformation.transform(t.min,a),p=this.transformation.transform(t.max,a);return new ae(l,p)},infinite:!1,wrapLatLng:function(e){var t=this.wrapLng?g(e.lng,this.wrapLng,!0):e.lng,a=this.wrapLat?g(e.lat,this.wrapLat,!0):e.lat,l=e.alt;return new se(a,t,l)},wrapLatLngBounds:function(e){var t=e.getCenter(),a=this.wrapLatLng(t),l=t.lat-a.lat,p=t.lng-a.lng;if(l===0&&p===0)return e;var f=e.getSouthWest(),y=e.getNorthEast(),k=new se(f.lat-l,f.lng-p),z=new se(y.lat-l,y.lng-p);return new we(k,z)}},lt=r({},ke,{wrapLng:[-180,180],R:6371e3,distance:function(e,t){var a=Math.PI/180,l=e.lat*a,p=t.lat*a,f=Math.sin((t.lat-e.lat)*a/2),y=Math.sin((t.lng-e.lng)*a/2),k=f*f+Math.cos(l)*Math.cos(p)*y*y,z=2*Math.atan2(Math.sqrt(k),Math.sqrt(1-k));return this.R*z}}),Pt=6378137,Kt={R:Pt,MAX_LATITUDE:85.0511287798,project:function(e){var t=Math.PI/180,a=this.MAX_LATITUDE,l=Math.max(Math.min(a,e.lat),-a),p=Math.sin(l*t);return new U(this.R*e.lng*t,this.R*Math.log((1+p)/(1-p))/2)},unproject:function(e){var t=180/Math.PI;return new se((2*Math.atan(Math.exp(e.y/this.R))-Math.PI/2)*t,e.x*t/this.R)},bounds:function(){var e=Pt*Math.PI;return new ae([-e,-e],[e,e])}()};function ci(e,t,a,l){if(P(e)){this._a=e[0],this._b=e[1],this._c=e[2],this._d=e[3];return}this._a=e,this._b=t,this._c=a,this._d=l}ci.prototype={transform:function(e,t){return this._transform(e.clone(),t)},_transform:function(e,t){return t=t||1,e.x=t*(this._a*e.x+this._b),e.y=t*(this._c*e.y+this._d),e},untransform:function(e,t){return t=t||1,new U((e.x/t-this._b)/this._a,(e.y/t-this._d)/this._c)}};function Bt(e,t,a,l){return new ci(e,t,a,l)}var di=r({},lt,{code:"EPSG:3857",projection:Kt,transformation:function(){var e=.5/(Math.PI*Kt.R);return Bt(e,.5,-e,.5)}()}),cn=r({},di,{code:"EPSG:900913"});function Mi(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function De(e,t){var a="",l,p,f,y,k,z;for(l=0,f=e.length;l<f;l++){for(k=e[l],p=0,y=k.length;p<y;p++)z=k[p],a+=(p?"L":"M")+z.x+" "+z.y;a+=t?W.svg?"z":"x":""}return a||"M0 0"}var $t=document.documentElement.style,dn="ActiveXObject"in window,tl=dn&&!document.addEventListener,xs="msLaunchUri"in navigator&&!("documentMode"in document),sa=ft("webkit"),_s=ft("android"),ks=ft("android 2")||ft("android 3"),il=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),nl=_s&&ft("Google")&&il<537&&!("AudioNode"in window),oa=!!window.opera,$s=!xs&&ft("chrome"),zs=ft("gecko")&&!sa&&!oa&&!dn,al=!$s&&ft("safari"),Ls=ft("phantom"),Es="OTransition"in $t,sl=navigator.platform.indexOf("Win")===0,Cs=dn&&"transition"in $t,ra="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!ks,Ss="MozPerspective"in $t,ol=!window.L_DISABLE_3D&&(Cs||ra||Ss)&&!Es&&!Ls,Ai=typeof orientation<"u"||ft("mobile"),rl=Ai&&sa,ll=Ai&&ra,Ts=!window.PointerEvent&&window.MSPointerEvent,Ms=!!(window.PointerEvent||Ts),As="ontouchstart"in window||!!window.TouchEvent,cl=!window.L_NO_TOUCH&&(As||Ms),dl=Ai&&oa,ul=Ai&&zs,pl=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,hl=function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("testPassiveEventSupport",v,t),window.removeEventListener("testPassiveEventSupport",v,t)}catch{}return e}(),ml=function(){return!!document.createElement("canvas").getContext}(),la=!!(document.createElementNS&&Mi("svg").createSVGRect),fl=!!la&&function(){var e=document.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),gl=!la&&function(){try{var e=document.createElement("div");e.innerHTML='<v:shape adj="1"/>';var t=e.firstChild;return t.style.behavior="url(#default#VML)",t&&typeof t.adj=="object"}catch{return!1}}(),vl=navigator.platform.indexOf("Mac")===0,yl=navigator.platform.indexOf("Linux")===0;function ft(e){return navigator.userAgent.toLowerCase().indexOf(e)>=0}var W={ie:dn,ielt9:tl,edge:xs,webkit:sa,android:_s,android23:ks,androidStock:nl,opera:oa,chrome:$s,gecko:zs,safari:al,phantom:Ls,opera12:Es,win:sl,ie3d:Cs,webkit3d:ra,gecko3d:Ss,any3d:ol,mobile:Ai,mobileWebkit:rl,mobileWebkit3d:ll,msPointer:Ts,pointer:Ms,touch:cl,touchNative:As,mobileOpera:dl,mobileGecko:ul,retina:pl,passiveEvents:hl,canvas:ml,svg:la,vml:gl,inlineSvg:fl,mac:vl,linux:yl},Is=W.msPointer?"MSPointerDown":"pointerdown",Ps=W.msPointer?"MSPointerMove":"pointermove",Bs=W.msPointer?"MSPointerUp":"pointerup",Rs=W.msPointer?"MSPointerCancel":"pointercancel",ca={touchstart:Is,touchmove:Ps,touchend:Bs,touchcancel:Rs},Os={touchstart:$l,touchmove:un,touchend:un,touchcancel:un},ui={},js=!1;function bl(e,t,a){return t==="touchstart"&&kl(),Os[t]?(a=Os[t].bind(this,a),e.addEventListener(ca[t],a,!1),a):(console.warn("wrong event specified:",t),v)}function wl(e,t,a){if(!ca[t]){console.warn("wrong event specified:",t);return}e.removeEventListener(ca[t],a,!1)}function xl(e){ui[e.pointerId]=e}function _l(e){ui[e.pointerId]&&(ui[e.pointerId]=e)}function Ns(e){delete ui[e.pointerId]}function kl(){js||(document.addEventListener(Is,xl,!0),document.addEventListener(Ps,_l,!0),document.addEventListener(Bs,Ns,!0),document.addEventListener(Rs,Ns,!0),js=!0)}function un(e,t){if(t.pointerType!==(t.MSPOINTER_TYPE_MOUSE||"mouse")){t.touches=[];for(var a in ui)t.touches.push(ui[a]);t.changedTouches=[t],e(t)}}function $l(e,t){t.MSPOINTER_TYPE_TOUCH&&t.pointerType===t.MSPOINTER_TYPE_TOUCH&&je(t),un(e,t)}function zl(e){var t={},a,l;for(l in e)a=e[l],t[l]=a&&a.bind?a.bind(e):a;return e=t,t.type="dblclick",t.detail=2,t.isTrusted=!1,t._simulated=!0,t}var Ll=200;function El(e,t){e.addEventListener("dblclick",t);var a=0,l;function p(f){if(f.detail!==1){l=f.detail;return}if(!(f.pointerType==="mouse"||f.sourceCapabilities&&!f.sourceCapabilities.firesTouchEvents)){var y=Us(f);if(!(y.some(function(z){return z instanceof HTMLLabelElement&&z.attributes.for})&&!y.some(function(z){return z instanceof HTMLInputElement||z instanceof HTMLSelectElement}))){var k=Date.now();k-a<=Ll?(l++,l===2&&t(zl(f))):l=1,a=k}}}return e.addEventListener("click",p),{dblclick:t,simDblclick:p}}function Cl(e,t){e.removeEventListener("dblclick",t.dblclick),e.removeEventListener("click",t.simDblclick)}var da=mn(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),Ii=mn(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),Hs=Ii==="webkitTransition"||Ii==="OTransition"?Ii+"End":"transitionend";function Ds(e){return typeof e=="string"?document.getElementById(e):e}function Pi(e,t){var a=e.style[t]||e.currentStyle&&e.currentStyle[t];if((!a||a==="auto")&&document.defaultView){var l=document.defaultView.getComputedStyle(e,null);a=l?l[t]:null}return a==="auto"?null:a}function me(e,t,a){var l=document.createElement(e);return l.className=t||"",a&&a.appendChild(l),l}function $e(e){var t=e.parentNode;t&&t.removeChild(e)}function pn(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function pi(e){var t=e.parentNode;t&&t.lastChild!==e&&t.appendChild(e)}function hi(e){var t=e.parentNode;t&&t.firstChild!==e&&t.insertBefore(e,t.firstChild)}function ua(e,t){if(e.classList!==void 0)return e.classList.contains(t);var a=hn(e);return a.length>0&&new RegExp("(^|\\s)"+t+"(\\s|$)").test(a)}function le(e,t){if(e.classList!==void 0)for(var a=$(t),l=0,p=a.length;l<p;l++)e.classList.add(a[l]);else if(!ua(e,t)){var f=hn(e);pa(e,(f?f+" ":"")+t)}}function Te(e,t){e.classList!==void 0?e.classList.remove(t):pa(e,w((" "+hn(e)+" ").replace(" "+t+" "," ")))}function pa(e,t){e.className.baseVal===void 0?e.className=t:e.className.baseVal=t}function hn(e){return e.correspondingElement&&(e=e.correspondingElement),e.className.baseVal===void 0?e.className:e.className.baseVal}function tt(e,t){"opacity"in e.style?e.style.opacity=t:"filter"in e.style&&Sl(e,t)}function Sl(e,t){var a=!1,l="DXImageTransform.Microsoft.Alpha";try{a=e.filters.item(l)}catch{if(t===1)return}t=Math.round(t*100),a?(a.Enabled=t!==100,a.Opacity=t):e.style.filter+=" progid:"+l+"(opacity="+t+")"}function mn(e){for(var t=document.documentElement.style,a=0;a<e.length;a++)if(e[a]in t)return e[a];return!1}function Yt(e,t,a){var l=t||new U(0,0);e.style[da]=(W.ie3d?"translate("+l.x+"px,"+l.y+"px)":"translate3d("+l.x+"px,"+l.y+"px,0)")+(a?" scale("+a+")":"")}function Me(e,t){e._leaflet_pos=t,W.any3d?Yt(e,t):(e.style.left=t.x+"px",e.style.top=t.y+"px")}function Jt(e){return e._leaflet_pos||new U(0,0)}var Bi,Ri,ha;if("onselectstart"in document)Bi=function(){re(window,"selectstart",je)},Ri=function(){be(window,"selectstart",je)};else{var Oi=mn(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);Bi=function(){if(Oi){var e=document.documentElement.style;ha=e[Oi],e[Oi]="none"}},Ri=function(){Oi&&(document.documentElement.style[Oi]=ha,ha=void 0)}}function ma(){re(window,"dragstart",je)}function fa(){be(window,"dragstart",je)}var fn,ga;function va(e){for(;e.tabIndex===-1;)e=e.parentNode;e.style&&(gn(),fn=e,ga=e.style.outlineStyle,e.style.outlineStyle="none",re(window,"keydown",gn))}function gn(){fn&&(fn.style.outlineStyle=ga,fn=void 0,ga=void 0,be(window,"keydown",gn))}function Fs(e){do e=e.parentNode;while((!e.offsetWidth||!e.offsetHeight)&&e!==document.body);return e}function ya(e){var t=e.getBoundingClientRect();return{x:t.width/e.offsetWidth||1,y:t.height/e.offsetHeight||1,boundingClientRect:t}}var Tl={__proto__:null,TRANSFORM:da,TRANSITION:Ii,TRANSITION_END:Hs,get:Ds,getStyle:Pi,create:me,remove:$e,empty:pn,toFront:pi,toBack:hi,hasClass:ua,addClass:le,removeClass:Te,setClass:pa,getClass:hn,setOpacity:tt,testProp:mn,setTransform:Yt,setPosition:Me,getPosition:Jt,get disableTextSelection(){return Bi},get enableTextSelection(){return Ri},disableImageDrag:ma,enableImageDrag:fa,preventOutline:va,restoreOutline:gn,getSizedParentNode:Fs,getScale:ya};function re(e,t,a,l){if(t&&typeof t=="object")for(var p in t)wa(e,p,t[p],a);else{t=$(t);for(var f=0,y=t.length;f<y;f++)wa(e,t[f],a,l)}return this}var gt="_leaflet_events";function be(e,t,a,l){if(arguments.length===1)qs(e),delete e[gt];else if(t&&typeof t=="object")for(var p in t)xa(e,p,t[p],a);else if(t=$(t),arguments.length===2)qs(e,function(k){return R(t,k)!==-1});else for(var f=0,y=t.length;f<y;f++)xa(e,t[f],a,l);return this}function qs(e,t){for(var a in e[gt]){var l=a.split(/\d/)[0];(!t||t(l))&&xa(e,l,null,null,a)}}var ba={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function wa(e,t,a,l){var p=t+h(a)+(l?"_"+h(l):"");if(e[gt]&&e[gt][p])return this;var f=function(k){return a.call(l||e,k||window.event)},y=f;!W.touchNative&&W.pointer&&t.indexOf("touch")===0?f=bl(e,t,f):W.touch&&t==="dblclick"?f=El(e,f):"addEventListener"in e?t==="touchstart"||t==="touchmove"||t==="wheel"||t==="mousewheel"?e.addEventListener(ba[t]||t,f,W.passiveEvents?{passive:!1}:!1):t==="mouseenter"||t==="mouseleave"?(f=function(k){k=k||window.event,ka(e,k)&&y(k)},e.addEventListener(ba[t],f,!1)):e.addEventListener(t,y,!1):e.attachEvent("on"+t,f),e[gt]=e[gt]||{},e[gt][p]=f}function xa(e,t,a,l,p){p=p||t+h(a)+(l?"_"+h(l):"");var f=e[gt]&&e[gt][p];if(!f)return this;!W.touchNative&&W.pointer&&t.indexOf("touch")===0?wl(e,t,f):W.touch&&t==="dblclick"?Cl(e,f):"removeEventListener"in e?e.removeEventListener(ba[t]||t,f,!1):e.detachEvent("on"+t,f),e[gt][p]=null}function Xt(e){return e.stopPropagation?e.stopPropagation():e.originalEvent?e.originalEvent._stopped=!0:e.cancelBubble=!0,this}function _a(e){return wa(e,"wheel",Xt),this}function ji(e){return re(e,"mousedown touchstart dblclick contextmenu",Xt),e._leaflet_disable_click=!0,this}function je(e){return e.preventDefault?e.preventDefault():e.returnValue=!1,this}function Qt(e){return je(e),Xt(e),this}function Us(e){if(e.composedPath)return e.composedPath();for(var t=[],a=e.target;a;)t.push(a),a=a.parentNode;return t}function Zs(e,t){if(!t)return new U(e.clientX,e.clientY);var a=ya(t),l=a.boundingClientRect;return new U((e.clientX-l.left)/a.x-t.clientLeft,(e.clientY-l.top)/a.y-t.clientTop)}var Ml=W.linux&&W.chrome?window.devicePixelRatio:W.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Vs(e){return W.edge?e.wheelDeltaY/2:e.deltaY&&e.deltaMode===0?-e.deltaY/Ml:e.deltaY&&e.deltaMode===1?-e.deltaY*20:e.deltaY&&e.deltaMode===2?-e.deltaY*60:e.deltaX||e.deltaZ?0:e.wheelDelta?(e.wheelDeltaY||e.wheelDelta)/2:e.detail&&Math.abs(e.detail)<32765?-e.detail*20:e.detail?e.detail/-32765*60:0}function ka(e,t){var a=t.relatedTarget;if(!a)return!0;try{for(;a&&a!==e;)a=a.parentNode}catch{return!1}return a!==e}var Al={__proto__:null,on:re,off:be,stopPropagation:Xt,disableScrollPropagation:_a,disableClickPropagation:ji,preventDefault:je,stop:Qt,getPropagationPath:Us,getMousePosition:Zs,getWheelDelta:Vs,isExternalTarget:ka,addListener:re,removeListener:be},Ws=G.extend({run:function(e,t,a,l){this.stop(),this._el=e,this._inProgress=!0,this._duration=a||.25,this._easeOutPower=1/Math.max(l||.5,.2),this._startPos=Jt(e),this._offset=t.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=Y(this._animate,this),this._step()},_step:function(e){var t=+new Date-this._startTime,a=this._duration*1e3;t<a?this._runFrame(this._easeOut(t/a),e):(this._runFrame(1),this._complete())},_runFrame:function(e,t){var a=this._startPos.add(this._offset.multiplyBy(e));t&&a._round(),Me(this._el,a),this.fire("step")},_complete:function(){oe(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(e){return 1-Math.pow(1-e,this._easeOutPower)}}),ue=G.extend({options:{crs:di,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(e,t){t=x(this,t),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(e),this._initLayout(),this._onResize=d(this._onResize,this),this._initEvents(),t.maxBounds&&this.setMaxBounds(t.maxBounds),t.zoom!==void 0&&(this._zoom=this._limitZoom(t.zoom)),t.center&&t.zoom!==void 0&&this.setView(ie(t.center),t.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=Ii&&W.any3d&&!W.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),re(this._proxy,Hs,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(e,t,a){if(t=t===void 0?this._zoom:this._limitZoom(t),e=this._limitCenter(ie(e),t,this.options.maxBounds),a=a||{},this._stop(),this._loaded&&!a.reset&&a!==!0){a.animate!==void 0&&(a.zoom=r({animate:a.animate},a.zoom),a.pan=r({animate:a.animate,duration:a.duration},a.pan));var l=this._zoom!==t?this._tryAnimatedZoom&&this._tryAnimatedZoom(e,t,a.zoom):this._tryAnimatedPan(e,a.pan);if(l)return clearTimeout(this._sizeTimer),this}return this._resetView(e,t,a.pan&&a.pan.noMoveStart),this},setZoom:function(e,t){return this._loaded?this.setView(this.getCenter(),e,{zoom:t}):(this._zoom=e,this)},zoomIn:function(e,t){return e=e||(W.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+e,t)},zoomOut:function(e,t){return e=e||(W.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-e,t)},setZoomAround:function(e,t,a){var l=this.getZoomScale(t),p=this.getSize().divideBy(2),f=e instanceof U?e:this.latLngToContainerPoint(e),y=f.subtract(p).multiplyBy(1-1/l),k=this.containerPointToLatLng(p.add(y));return this.setView(k,t,{zoom:a})},_getBoundsCenterZoom:function(e,t){t=t||{},e=e.getBounds?e.getBounds():xe(e);var a=j(t.paddingTopLeft||t.padding||[0,0]),l=j(t.paddingBottomRight||t.padding||[0,0]),p=this.getBoundsZoom(e,!1,a.add(l));if(p=typeof t.maxZoom=="number"?Math.min(t.maxZoom,p):p,p===1/0)return{center:e.getCenter(),zoom:p};var f=l.subtract(a).divideBy(2),y=this.project(e.getSouthWest(),p),k=this.project(e.getNorthEast(),p),z=this.unproject(y.add(k).divideBy(2).add(f),p);return{center:z,zoom:p}},fitBounds:function(e,t){if(e=xe(e),!e.isValid())throw new Error("Bounds are not valid.");var a=this._getBoundsCenterZoom(e,t);return this.setView(a.center,a.zoom,t)},fitWorld:function(e){return this.fitBounds([[-90,-180],[90,180]],e)},panTo:function(e,t){return this.setView(e,this._zoom,{pan:t})},panBy:function(e,t){if(e=j(e).round(),t=t||{},!e.x&&!e.y)return this.fire("moveend");if(t.animate!==!0&&!this.getSize().contains(e))return this._resetView(this.unproject(this.project(this.getCenter()).add(e)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Ws,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),t.noMoveStart||this.fire("movestart"),t.animate!==!1){le(this._mapPane,"leaflet-pan-anim");var a=this._getMapPanePos().subtract(e).round();this._panAnim.run(this._mapPane,a,t.duration||.25,t.easeLinearity)}else this._rawPanBy(e),this.fire("move").fire("moveend");return this},flyTo:function(e,t,a){if(a=a||{},a.animate===!1||!W.any3d)return this.setView(e,t,a);this._stop();var l=this.project(this.getCenter()),p=this.project(e),f=this.getSize(),y=this._zoom;e=ie(e),t=t===void 0?y:t;var k=Math.max(f.x,f.y),z=k*this.getZoomScale(y,t),M=p.distanceTo(l)||1,F=1.42,X=F*F;function ce(Ae){var Cn=Ae?-1:1,wc=Ae?z:k,xc=z*z-k*k+Cn*X*X*M*M,_c=2*wc*X*M,Pa=xc/_c,Co=Math.sqrt(Pa*Pa+1)-Pa,kc=Co<1e-9?-18:Math.log(Co);return kc}function Fe(Ae){return(Math.exp(Ae)-Math.exp(-Ae))/2}function Re(Ae){return(Math.exp(Ae)+Math.exp(-Ae))/2}function nt(Ae){return Fe(Ae)/Re(Ae)}var Ue=ce(0);function bi(Ae){return k*(Re(Ue)/Re(Ue+F*Ae))}function gc(Ae){return k*(Re(Ue)*nt(Ue+F*Ae)-Fe(Ue))/X}function vc(Ae){return 1-Math.pow(1-Ae,1.5)}var yc=Date.now(),Lo=(ce(1)-Ue)/F,bc=a.duration?1e3*a.duration:1e3*Lo*.8;function Eo(){var Ae=(Date.now()-yc)/bc,Cn=vc(Ae)*Lo;Ae<=1?(this._flyToFrame=Y(Eo,this),this._move(this.unproject(l.add(p.subtract(l).multiplyBy(gc(Cn)/M)),y),this.getScaleZoom(k/bi(Cn),y),{flyTo:!0})):this._move(e,t)._moveEnd(!0)}return this._moveStart(!0,a.noMoveStart),Eo.call(this),this},flyToBounds:function(e,t){var a=this._getBoundsCenterZoom(e,t);return this.flyTo(a.center,a.zoom,t)},setMaxBounds:function(e){return e=xe(e),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),e.isValid()?(this.options.maxBounds=e,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(e){var t=this.options.minZoom;return this.options.minZoom=e,this._loaded&&t!==e&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(e):this},setMaxZoom:function(e){var t=this.options.maxZoom;return this.options.maxZoom=e,this._loaded&&t!==e&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(e):this},panInsideBounds:function(e,t){this._enforcingBounds=!0;var a=this.getCenter(),l=this._limitCenter(a,this._zoom,xe(e));return a.equals(l)||this.panTo(l,t),this._enforcingBounds=!1,this},panInside:function(e,t){t=t||{};var a=j(t.paddingTopLeft||t.padding||[0,0]),l=j(t.paddingBottomRight||t.padding||[0,0]),p=this.project(this.getCenter()),f=this.project(e),y=this.getPixelBounds(),k=de([y.min.add(a),y.max.subtract(l)]),z=k.getSize();if(!k.contains(f)){this._enforcingBounds=!0;var M=f.subtract(k.getCenter()),F=k.extend(f).getSize().subtract(z);p.x+=M.x<0?-F.x:F.x,p.y+=M.y<0?-F.y:F.y,this.panTo(this.unproject(p),t),this._enforcingBounds=!1}return this},invalidateSize:function(e){if(!this._loaded)return this;e=r({animate:!1,pan:!0},e===!0?{animate:!0}:e);var t=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var a=this.getSize(),l=t.divideBy(2).round(),p=a.divideBy(2).round(),f=l.subtract(p);return!f.x&&!f.y?this:(e.animate&&e.pan?this.panBy(f):(e.pan&&this._rawPanBy(f),this.fire("move"),e.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(d(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:t,newSize:a}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(e){if(e=this._locateOptions=r({timeout:1e4,watch:!1},e),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var t=d(this._handleGeolocationResponse,this),a=d(this._handleGeolocationError,this);return e.watch?this._locationWatchId=navigator.geolocation.watchPosition(t,a,e):navigator.geolocation.getCurrentPosition(t,a,e),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(e){if(this._container._leaflet_id){var t=e.code,a=e.message||(t===1?"permission denied":t===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:t,message:"Geolocation error: "+a+"."})}},_handleGeolocationResponse:function(e){if(this._container._leaflet_id){var t=e.coords.latitude,a=e.coords.longitude,l=new se(t,a),p=l.toBounds(e.coords.accuracy*2),f=this._locateOptions;if(f.setView){var y=this.getBoundsZoom(p);this.setView(l,f.maxZoom?Math.min(y,f.maxZoom):y)}var k={latlng:l,bounds:p,timestamp:e.timestamp};for(var z in e.coords)typeof e.coords[z]=="number"&&(k[z]=e.coords[z]);this.fire("locationfound",k)}},addHandler:function(e,t){if(!t)return this;var a=this[e]=new t(this);return this._handlers.push(a),this.options[e]&&a.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),$e(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(oe(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var e;for(e in this._layers)this._layers[e].remove();for(e in this._panes)$e(this._panes[e]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(e,t){var a="leaflet-pane"+(e?" leaflet-"+e.replace("Pane","")+"-pane":""),l=me("div",a,t||this._mapPane);return e&&(this._panes[e]=l),l},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var e=this.getPixelBounds(),t=this.unproject(e.getBottomLeft()),a=this.unproject(e.getTopRight());return new we(t,a)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(e,t,a){e=xe(e),a=j(a||[0,0]);var l=this.getZoom()||0,p=this.getMinZoom(),f=this.getMaxZoom(),y=e.getNorthWest(),k=e.getSouthEast(),z=this.getSize().subtract(a),M=de(this.project(k,l),this.project(y,l)).getSize(),F=W.any3d?this.options.zoomSnap:1,X=z.x/M.x,ce=z.y/M.y,Fe=t?Math.max(X,ce):Math.min(X,ce);return l=this.getScaleZoom(Fe,l),F&&(l=Math.round(l/(F/100))*(F/100),l=t?Math.ceil(l/F)*F:Math.floor(l/F)*F),Math.max(p,Math.min(f,l))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new U(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(e,t){var a=this._getTopLeftPoint(e,t);return new ae(a,a.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(e){return this.options.crs.getProjectedBounds(e===void 0?this.getZoom():e)},getPane:function(e){return typeof e=="string"?this._panes[e]:e},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(e,t){var a=this.options.crs;return t=t===void 0?this._zoom:t,a.scale(e)/a.scale(t)},getScaleZoom:function(e,t){var a=this.options.crs;t=t===void 0?this._zoom:t;var l=a.zoom(e*a.scale(t));return isNaN(l)?1/0:l},project:function(e,t){return t=t===void 0?this._zoom:t,this.options.crs.latLngToPoint(ie(e),t)},unproject:function(e,t){return t=t===void 0?this._zoom:t,this.options.crs.pointToLatLng(j(e),t)},layerPointToLatLng:function(e){var t=j(e).add(this.getPixelOrigin());return this.unproject(t)},latLngToLayerPoint:function(e){var t=this.project(ie(e))._round();return t._subtract(this.getPixelOrigin())},wrapLatLng:function(e){return this.options.crs.wrapLatLng(ie(e))},wrapLatLngBounds:function(e){return this.options.crs.wrapLatLngBounds(xe(e))},distance:function(e,t){return this.options.crs.distance(ie(e),ie(t))},containerPointToLayerPoint:function(e){return j(e).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(e){return j(e).add(this._getMapPanePos())},containerPointToLatLng:function(e){var t=this.containerPointToLayerPoint(j(e));return this.layerPointToLatLng(t)},latLngToContainerPoint:function(e){return this.layerPointToContainerPoint(this.latLngToLayerPoint(ie(e)))},mouseEventToContainerPoint:function(e){return Zs(e,this._container)},mouseEventToLayerPoint:function(e){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e))},mouseEventToLatLng:function(e){return this.layerPointToLatLng(this.mouseEventToLayerPoint(e))},_initContainer:function(e){var t=this._container=Ds(e);if(t){if(t._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");re(t,"scroll",this._onScroll,this),this._containerId=h(t)},_initLayout:function(){var e=this._container;this._fadeAnimated=this.options.fadeAnimation&&W.any3d,le(e,"leaflet-container"+(W.touch?" leaflet-touch":"")+(W.retina?" leaflet-retina":"")+(W.ielt9?" leaflet-oldie":"")+(W.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var t=Pi(e,"position");t!=="absolute"&&t!=="relative"&&t!=="fixed"&&t!=="sticky"&&(e.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var e=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Me(this._mapPane,new U(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(le(e.markerPane,"leaflet-zoom-hide"),le(e.shadowPane,"leaflet-zoom-hide"))},_resetView:function(e,t,a){Me(this._mapPane,new U(0,0));var l=!this._loaded;this._loaded=!0,t=this._limitZoom(t),this.fire("viewprereset");var p=this._zoom!==t;this._moveStart(p,a)._move(e,t)._moveEnd(p),this.fire("viewreset"),l&&this.fire("load")},_moveStart:function(e,t){return e&&this.fire("zoomstart"),t||this.fire("movestart"),this},_move:function(e,t,a,l){t===void 0&&(t=this._zoom);var p=this._zoom!==t;return this._zoom=t,this._lastCenter=e,this._pixelOrigin=this._getNewPixelOrigin(e),l?a&&a.pinch&&this.fire("zoom",a):((p||a&&a.pinch)&&this.fire("zoom",a),this.fire("move",a)),this},_moveEnd:function(e){return e&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return oe(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(e){Me(this._mapPane,this._getMapPanePos().subtract(e))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(e){this._targets={},this._targets[h(this._container)]=this;var t=e?be:re;t(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&t(window,"resize",this._onResize,this),W.any3d&&this.options.transform3DLimit&&(e?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){oe(this._resizeRequest),this._resizeRequest=Y(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var e=this._getMapPanePos();Math.max(Math.abs(e.x),Math.abs(e.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(e,t){for(var a=[],l,p=t==="mouseout"||t==="mouseover",f=e.target||e.srcElement,y=!1;f;){if(l=this._targets[h(f)],l&&(t==="click"||t==="preclick")&&this._draggableMoved(l)){y=!0;break}if(l&&l.listens(t,!0)&&(p&&!ka(f,e)||(a.push(l),p))||f===this._container)break;f=f.parentNode}return!a.length&&!y&&!p&&this.listens(t,!0)&&(a=[this]),a},_isClickDisabled:function(e){for(;e&&e!==this._container;){if(e._leaflet_disable_click)return!0;e=e.parentNode}},_handleDOMEvent:function(e){var t=e.target||e.srcElement;if(!(!this._loaded||t._leaflet_disable_events||e.type==="click"&&this._isClickDisabled(t))){var a=e.type;a==="mousedown"&&va(t),this._fireDOMEvent(e,a)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(e,t,a){if(e.type==="click"){var l=r({},e);l.type="preclick",this._fireDOMEvent(l,l.type,a)}var p=this._findEventTargets(e,t);if(a){for(var f=[],y=0;y<a.length;y++)a[y].listens(t,!0)&&f.push(a[y]);p=f.concat(p)}if(p.length){t==="contextmenu"&&je(e);var k=p[0],z={originalEvent:e};if(e.type!=="keypress"&&e.type!=="keydown"&&e.type!=="keyup"){var M=k.getLatLng&&(!k._radius||k._radius<=10);z.containerPoint=M?this.latLngToContainerPoint(k.getLatLng()):this.mouseEventToContainerPoint(e),z.layerPoint=this.containerPointToLayerPoint(z.containerPoint),z.latlng=M?k.getLatLng():this.layerPointToLatLng(z.layerPoint)}for(y=0;y<p.length;y++)if(p[y].fire(t,z,!0),z.originalEvent._stopped||p[y].options.bubblingMouseEvents===!1&&R(this._mouseEvents,t)!==-1)return}},_draggableMoved:function(e){return e=e.dragging&&e.dragging.enabled()?e:this,e.dragging&&e.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var e=0,t=this._handlers.length;e<t;e++)this._handlers[e].disable()},whenReady:function(e,t){return this._loaded?e.call(t||this,{target:this}):this.on("load",e,t),this},_getMapPanePos:function(){return Jt(this._mapPane)||new U(0,0)},_moved:function(){var e=this._getMapPanePos();return e&&!e.equals([0,0])},_getTopLeftPoint:function(e,t){var a=e&&t!==void 0?this._getNewPixelOrigin(e,t):this.getPixelOrigin();return a.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(e,t){var a=this.getSize()._divideBy(2);return this.project(e,t)._subtract(a)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(e,t,a){var l=this._getNewPixelOrigin(a,t);return this.project(e,t)._subtract(l)},_latLngBoundsToNewLayerBounds:function(e,t,a){var l=this._getNewPixelOrigin(a,t);return de([this.project(e.getSouthWest(),t)._subtract(l),this.project(e.getNorthWest(),t)._subtract(l),this.project(e.getSouthEast(),t)._subtract(l),this.project(e.getNorthEast(),t)._subtract(l)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(e){return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint())},_limitCenter:function(e,t,a){if(!a)return e;var l=this.project(e,t),p=this.getSize().divideBy(2),f=new ae(l.subtract(p),l.add(p)),y=this._getBoundsOffset(f,a,t);return Math.abs(y.x)<=1&&Math.abs(y.y)<=1?e:this.unproject(l.add(y),t)},_limitOffset:function(e,t){if(!t)return e;var a=this.getPixelBounds(),l=new ae(a.min.add(e),a.max.add(e));return e.add(this._getBoundsOffset(l,t))},_getBoundsOffset:function(e,t,a){var l=de(this.project(t.getNorthEast(),a),this.project(t.getSouthWest(),a)),p=l.min.subtract(e.min),f=l.max.subtract(e.max),y=this._rebound(p.x,-f.x),k=this._rebound(p.y,-f.y);return new U(y,k)},_rebound:function(e,t){return e+t>0?Math.round(e-t)/2:Math.max(0,Math.ceil(e))-Math.max(0,Math.floor(t))},_limitZoom:function(e){var t=this.getMinZoom(),a=this.getMaxZoom(),l=W.any3d?this.options.zoomSnap:1;return l&&(e=Math.round(e/l)*l),Math.max(t,Math.min(a,e))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){Te(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(e,t){var a=this._getCenterOffset(e)._trunc();return(t&&t.animate)!==!0&&!this.getSize().contains(a)?!1:(this.panBy(a,t),!0)},_createAnimProxy:function(){var e=this._proxy=me("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(e),this.on("zoomanim",function(t){var a=da,l=this._proxy.style[a];Yt(this._proxy,this.project(t.center,t.zoom),this.getZoomScale(t.zoom,1)),l===this._proxy.style[a]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){$e(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var e=this.getCenter(),t=this.getZoom();Yt(this._proxy,this.project(e,t),this.getZoomScale(t,1))},_catchTransitionEnd:function(e){this._animatingZoom&&e.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(e,t,a){if(this._animatingZoom)return!0;if(a=a||{},!this._zoomAnimated||a.animate===!1||this._nothingToAnimate()||Math.abs(t-this._zoom)>this.options.zoomAnimationThreshold)return!1;var l=this.getZoomScale(t),p=this._getCenterOffset(e)._divideBy(1-1/l);return a.animate!==!0&&!this.getSize().contains(p)?!1:(Y(function(){this._moveStart(!0,a.noMoveStart||!1)._animateZoom(e,t,!0)},this),!0)},_animateZoom:function(e,t,a,l){this._mapPane&&(a&&(this._animatingZoom=!0,this._animateToCenter=e,this._animateToZoom=t,le(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:e,zoom:t,noUpdate:l}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(d(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&Te(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function Il(e,t){return new ue(e,t)}var ct=O.extend({options:{position:"topright"},initialize:function(e){x(this,e)},getPosition:function(){return this.options.position},setPosition:function(e){var t=this._map;return t&&t.removeControl(this),this.options.position=e,t&&t.addControl(this),this},getContainer:function(){return this._container},addTo:function(e){this.remove(),this._map=e;var t=this._container=this.onAdd(e),a=this.getPosition(),l=e._controlCorners[a];return le(t,"leaflet-control"),a.indexOf("bottom")!==-1?l.insertBefore(t,l.firstChild):l.appendChild(t),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?($e(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(e){this._map&&e&&e.screenX>0&&e.screenY>0&&this._map.getContainer().focus()}}),Ni=function(e){return new ct(e)};ue.include({addControl:function(e){return e.addTo(this),this},removeControl:function(e){return e.remove(),this},_initControlPos:function(){var e=this._controlCorners={},t="leaflet-",a=this._controlContainer=me("div",t+"control-container",this._container);function l(p,f){var y=t+p+" "+t+f;e[p+f]=me("div",y,a)}l("top","left"),l("top","right"),l("bottom","left"),l("bottom","right")},_clearControlPos:function(){for(var e in this._controlCorners)$e(this._controlCorners[e]);$e(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var Gs=ct.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(e,t,a,l){return a<l?-1:l<a?1:0}},initialize:function(e,t,a){x(this,a),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var l in e)this._addLayer(e[l],l);for(l in t)this._addLayer(t[l],l,!0)},onAdd:function(e){this._initLayout(),this._update(),this._map=e,e.on("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(e){return ct.prototype.addTo.call(this,e),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(e,t){return this._addLayer(e,t),this._map?this._update():this},addOverlay:function(e,t){return this._addLayer(e,t,!0),this._map?this._update():this},removeLayer:function(e){e.off("add remove",this._onLayerChange,this);var t=this._getLayer(h(e));return t&&this._layers.splice(this._layers.indexOf(t),1),this._map?this._update():this},expand:function(){le(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var e=this._map.getSize().y-(this._container.offsetTop+50);return e<this._section.clientHeight?(le(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=e+"px"):Te(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return Te(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var e="leaflet-control-layers",t=this._container=me("div",e),a=this.options.collapsed;t.setAttribute("aria-haspopup",!0),ji(t),_a(t);var l=this._section=me("section",e+"-list");a&&(this._map.on("click",this.collapse,this),re(t,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var p=this._layersLink=me("a",e+"-toggle",t);p.href="#",p.title="Layers",p.setAttribute("role","button"),re(p,{keydown:function(f){f.keyCode===13&&this._expandSafely()},click:function(f){je(f),this._expandSafely()}},this),a||this.expand(),this._baseLayersList=me("div",e+"-base",l),this._separator=me("div",e+"-separator",l),this._overlaysList=me("div",e+"-overlays",l),t.appendChild(l)},_getLayer:function(e){for(var t=0;t<this._layers.length;t++)if(this._layers[t]&&h(this._layers[t].layer)===e)return this._layers[t]},_addLayer:function(e,t,a){this._map&&e.on("add remove",this._onLayerChange,this),this._layers.push({layer:e,name:t,overlay:a}),this.options.sortLayers&&this._layers.sort(d(function(l,p){return this.options.sortFunction(l.layer,p.layer,l.name,p.name)},this)),this.options.autoZIndex&&e.setZIndex&&(this._lastZIndex++,e.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;pn(this._baseLayersList),pn(this._overlaysList),this._layerControlInputs=[];var e,t,a,l,p=0;for(a=0;a<this._layers.length;a++)l=this._layers[a],this._addItem(l),t=t||l.overlay,e=e||!l.overlay,p+=l.overlay?0:1;return this.options.hideSingleBase&&(e=e&&p>1,this._baseLayersList.style.display=e?"":"none"),this._separator.style.display=t&&e?"":"none",this},_onLayerChange:function(e){this._handlingClick||this._update();var t=this._getLayer(h(e.target)),a=t.overlay?e.type==="add"?"overlayadd":"overlayremove":e.type==="add"?"baselayerchange":null;a&&this._map.fire(a,t)},_createRadioElement:function(e,t){var a='<input type="radio" class="leaflet-control-layers-selector" name="'+e+'"'+(t?' checked="checked"':"")+"/>",l=document.createElement("div");return l.innerHTML=a,l.firstChild},_addItem:function(e){var t=document.createElement("label"),a=this._map.hasLayer(e.layer),l;e.overlay?(l=document.createElement("input"),l.type="checkbox",l.className="leaflet-control-layers-selector",l.defaultChecked=a):l=this._createRadioElement("leaflet-base-layers_"+h(this),a),this._layerControlInputs.push(l),l.layerId=h(e.layer),re(l,"click",this._onInputClick,this);var p=document.createElement("span");p.innerHTML=" "+e.name;var f=document.createElement("span");t.appendChild(f),f.appendChild(l),f.appendChild(p);var y=e.overlay?this._overlaysList:this._baseLayersList;return y.appendChild(t),this._checkDisabledLayers(),t},_onInputClick:function(){if(!this._preventClick){var e=this._layerControlInputs,t,a,l=[],p=[];this._handlingClick=!0;for(var f=e.length-1;f>=0;f--)t=e[f],a=this._getLayer(t.layerId).layer,t.checked?l.push(a):t.checked||p.push(a);for(f=0;f<p.length;f++)this._map.hasLayer(p[f])&&this._map.removeLayer(p[f]);for(f=0;f<l.length;f++)this._map.hasLayer(l[f])||this._map.addLayer(l[f]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var e=this._layerControlInputs,t,a,l=this._map.getZoom(),p=e.length-1;p>=0;p--)t=e[p],a=this._getLayer(t.layerId).layer,t.disabled=a.options.minZoom!==void 0&&l<a.options.minZoom||a.options.maxZoom!==void 0&&l>a.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var e=this._section;this._preventClick=!0,re(e,"click",je),this.expand();var t=this;setTimeout(function(){be(e,"click",je),t._preventClick=!1})}}),Pl=function(e,t,a){return new Gs(e,t,a)},$a=ct.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(e){var t="leaflet-control-zoom",a=me("div",t+" leaflet-bar"),l=this.options;return this._zoomInButton=this._createButton(l.zoomInText,l.zoomInTitle,t+"-in",a,this._zoomIn),this._zoomOutButton=this._createButton(l.zoomOutText,l.zoomOutTitle,t+"-out",a,this._zoomOut),this._updateDisabled(),e.on("zoomend zoomlevelschange",this._updateDisabled,this),a},onRemove:function(e){e.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(e){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(e.shiftKey?3:1))},_zoomOut:function(e){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(e.shiftKey?3:1))},_createButton:function(e,t,a,l,p){var f=me("a",a,l);return f.innerHTML=e,f.href="#",f.title=t,f.setAttribute("role","button"),f.setAttribute("aria-label",t),ji(f),re(f,"click",Qt),re(f,"click",p,this),re(f,"click",this._refocusOnMap,this),f},_updateDisabled:function(){var e=this._map,t="leaflet-disabled";Te(this._zoomInButton,t),Te(this._zoomOutButton,t),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||e._zoom===e.getMinZoom())&&(le(this._zoomOutButton,t),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||e._zoom===e.getMaxZoom())&&(le(this._zoomInButton,t),this._zoomInButton.setAttribute("aria-disabled","true"))}});ue.mergeOptions({zoomControl:!0}),ue.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new $a,this.addControl(this.zoomControl))});var Bl=function(e){return new $a(e)},Ks=ct.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(e){var t="leaflet-control-scale",a=me("div",t),l=this.options;return this._addScales(l,t+"-line",a),e.on(l.updateWhenIdle?"moveend":"move",this._update,this),e.whenReady(this._update,this),a},onRemove:function(e){e.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(e,t,a){e.metric&&(this._mScale=me("div",t,a)),e.imperial&&(this._iScale=me("div",t,a))},_update:function(){var e=this._map,t=e.getSize().y/2,a=e.distance(e.containerPointToLatLng([0,t]),e.containerPointToLatLng([this.options.maxWidth,t]));this._updateScales(a)},_updateScales:function(e){this.options.metric&&e&&this._updateMetric(e),this.options.imperial&&e&&this._updateImperial(e)},_updateMetric:function(e){var t=this._getRoundNum(e),a=t<1e3?t+" m":t/1e3+" km";this._updateScale(this._mScale,a,t/e)},_updateImperial:function(e){var t=e*3.2808399,a,l,p;t>5280?(a=t/5280,l=this._getRoundNum(a),this._updateScale(this._iScale,l+" mi",l/a)):(p=this._getRoundNum(t),this._updateScale(this._iScale,p+" ft",p/t))},_updateScale:function(e,t,a){e.style.width=Math.round(this.options.maxWidth*a)+"px",e.innerHTML=t},_getRoundNum:function(e){var t=Math.pow(10,(Math.floor(e)+"").length-1),a=e/t;return a=a>=10?10:a>=5?5:a>=3?3:a>=2?2:1,t*a}}),Rl=function(e){return new Ks(e)},Ol='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',za=ct.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(W.inlineSvg?Ol+" ":"")+"Leaflet</a>"},initialize:function(e){x(this,e),this._attributions={}},onAdd:function(e){e.attributionControl=this,this._container=me("div","leaflet-control-attribution"),ji(this._container);for(var t in e._layers)e._layers[t].getAttribution&&this.addAttribution(e._layers[t].getAttribution());return this._update(),e.on("layeradd",this._addAttribution,this),this._container},onRemove:function(e){e.off("layeradd",this._addAttribution,this)},_addAttribution:function(e){e.layer.getAttribution&&(this.addAttribution(e.layer.getAttribution()),e.layer.once("remove",function(){this.removeAttribution(e.layer.getAttribution())},this))},setPrefix:function(e){return this.options.prefix=e,this._update(),this},addAttribution:function(e){return e?(this._attributions[e]||(this._attributions[e]=0),this._attributions[e]++,this._update(),this):this},removeAttribution:function(e){return e?(this._attributions[e]&&(this._attributions[e]--,this._update()),this):this},_update:function(){if(this._map){var e=[];for(var t in this._attributions)this._attributions[t]&&e.push(t);var a=[];this.options.prefix&&a.push(this.options.prefix),e.length&&a.push(e.join(", ")),this._container.innerHTML=a.join(' <span aria-hidden="true">|</span> ')}}});ue.mergeOptions({attributionControl:!0}),ue.addInitHook(function(){this.options.attributionControl&&new za().addTo(this)});var jl=function(e){return new za(e)};ct.Layers=Gs,ct.Zoom=$a,ct.Scale=Ks,ct.Attribution=za,Ni.layers=Pl,Ni.zoom=Bl,Ni.scale=Rl,Ni.attribution=jl;var vt=O.extend({initialize:function(e){this._map=e},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});vt.addTo=function(e,t){return e.addHandler(t,this),this};var Nl={Events:I},Ys=W.touch?"touchstart mousedown":"mousedown",Rt=G.extend({options:{clickTolerance:3},initialize:function(e,t,a,l){x(this,l),this._element=e,this._dragStartTarget=t||e,this._preventOutline=a},enable:function(){this._enabled||(re(this._dragStartTarget,Ys,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(Rt._dragging===this&&this.finishDrag(!0),be(this._dragStartTarget,Ys,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(e){if(this._enabled&&(this._moved=!1,!ua(this._element,"leaflet-zoom-anim"))){if(e.touches&&e.touches.length!==1){Rt._dragging===this&&this.finishDrag();return}if(!(Rt._dragging||e.shiftKey||e.which!==1&&e.button!==1&&!e.touches)&&(Rt._dragging=this,this._preventOutline&&va(this._element),ma(),Bi(),!this._moving)){this.fire("down");var t=e.touches?e.touches[0]:e,a=Fs(this._element);this._startPoint=new U(t.clientX,t.clientY),this._startPos=Jt(this._element),this._parentScale=ya(a);var l=e.type==="mousedown";re(document,l?"mousemove":"touchmove",this._onMove,this),re(document,l?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(e){if(this._enabled){if(e.touches&&e.touches.length>1){this._moved=!0;return}var t=e.touches&&e.touches.length===1?e.touches[0]:e,a=new U(t.clientX,t.clientY)._subtract(this._startPoint);!a.x&&!a.y||Math.abs(a.x)+Math.abs(a.y)<this.options.clickTolerance||(a.x/=this._parentScale.x,a.y/=this._parentScale.y,je(e),this._moved||(this.fire("dragstart"),this._moved=!0,le(document.body,"leaflet-dragging"),this._lastTarget=e.target||e.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),le(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(a),this._moving=!0,this._lastEvent=e,this._updatePosition())}},_updatePosition:function(){var e={originalEvent:this._lastEvent};this.fire("predrag",e),Me(this._element,this._newPos),this.fire("drag",e)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(e){Te(document.body,"leaflet-dragging"),this._lastTarget&&(Te(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),be(document,"mousemove touchmove",this._onMove,this),be(document,"mouseup touchend touchcancel",this._onUp,this),fa(),Ri();var t=this._moved&&this._moving;this._moving=!1,Rt._dragging=!1,t&&this.fire("dragend",{noInertia:e,distance:this._newPos.distanceTo(this._startPos)})}});function Js(e,t,a){var l,p=[1,4,2,8],f,y,k,z,M,F,X,ce;for(f=0,F=e.length;f<F;f++)e[f]._code=ei(e[f],t);for(k=0;k<4;k++){for(X=p[k],l=[],f=0,F=e.length,y=F-1;f<F;y=f++)z=e[f],M=e[y],z._code&X?M._code&X||(ce=vn(M,z,X,t,a),ce._code=ei(ce,t),l.push(ce)):(M._code&X&&(ce=vn(M,z,X,t,a),ce._code=ei(ce,t),l.push(ce)),l.push(z));e=l}return e}function Xs(e,t){var a,l,p,f,y,k,z,M,F;if(!e||e.length===0)throw new Error("latlngs not passed");it(e)||(console.warn("latlngs are not flat! Only the first ring will be used"),e=e[0]);var X=ie([0,0]),ce=xe(e),Fe=ce.getNorthWest().distanceTo(ce.getSouthWest())*ce.getNorthEast().distanceTo(ce.getNorthWest());Fe<1700&&(X=La(e));var Re=e.length,nt=[];for(a=0;a<Re;a++){var Ue=ie(e[a]);nt.push(t.project(ie([Ue.lat-X.lat,Ue.lng-X.lng])))}for(k=z=M=0,a=0,l=Re-1;a<Re;l=a++)p=nt[a],f=nt[l],y=p.y*f.x-f.y*p.x,z+=(p.x+f.x)*y,M+=(p.y+f.y)*y,k+=y*3;k===0?F=nt[0]:F=[z/k,M/k];var bi=t.unproject(j(F));return ie([bi.lat+X.lat,bi.lng+X.lng])}function La(e){for(var t=0,a=0,l=0,p=0;p<e.length;p++){var f=ie(e[p]);t+=f.lat,a+=f.lng,l++}return ie([t/l,a/l])}var Hl={__proto__:null,clipPolygon:Js,polygonCenter:Xs,centroid:La};function Qs(e,t){if(!t||!e.length)return e.slice();var a=t*t;return e=ql(e,a),e=Fl(e,a),e}function eo(e,t,a){return Math.sqrt(Hi(e,t,a,!0))}function Dl(e,t,a){return Hi(e,t,a)}function Fl(e,t){var a=e.length,l=typeof Uint8Array<"u"?Uint8Array:Array,p=new l(a);p[0]=p[a-1]=1,Ea(e,p,t,0,a-1);var f,y=[];for(f=0;f<a;f++)p[f]&&y.push(e[f]);return y}function Ea(e,t,a,l,p){var f=0,y,k,z;for(k=l+1;k<=p-1;k++)z=Hi(e[k],e[l],e[p],!0),z>f&&(y=k,f=z);f>a&&(t[y]=1,Ea(e,t,a,l,y),Ea(e,t,a,y,p))}function ql(e,t){for(var a=[e[0]],l=1,p=0,f=e.length;l<f;l++)Ul(e[l],e[p])>t&&(a.push(e[l]),p=l);return p<f-1&&a.push(e[f-1]),a}var to;function io(e,t,a,l,p){var f=l?to:ei(e,a),y=ei(t,a),k,z,M;for(to=y;;){if(!(f|y))return[e,t];if(f&y)return!1;k=f||y,z=vn(e,t,k,a,p),M=ei(z,a),k===f?(e=z,f=M):(t=z,y=M)}}function vn(e,t,a,l,p){var f=t.x-e.x,y=t.y-e.y,k=l.min,z=l.max,M,F;return a&8?(M=e.x+f*(z.y-e.y)/y,F=z.y):a&4?(M=e.x+f*(k.y-e.y)/y,F=k.y):a&2?(M=z.x,F=e.y+y*(z.x-e.x)/f):a&1&&(M=k.x,F=e.y+y*(k.x-e.x)/f),new U(M,F,p)}function ei(e,t){var a=0;return e.x<t.min.x?a|=1:e.x>t.max.x&&(a|=2),e.y<t.min.y?a|=4:e.y>t.max.y&&(a|=8),a}function Ul(e,t){var a=t.x-e.x,l=t.y-e.y;return a*a+l*l}function Hi(e,t,a,l){var p=t.x,f=t.y,y=a.x-p,k=a.y-f,z=y*y+k*k,M;return z>0&&(M=((e.x-p)*y+(e.y-f)*k)/z,M>1?(p=a.x,f=a.y):M>0&&(p+=y*M,f+=k*M)),y=e.x-p,k=e.y-f,l?y*y+k*k:new U(p,f)}function it(e){return!P(e[0])||typeof e[0][0]!="object"&&typeof e[0][0]<"u"}function no(e){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),it(e)}function ao(e,t){var a,l,p,f,y,k,z,M;if(!e||e.length===0)throw new Error("latlngs not passed");it(e)||(console.warn("latlngs are not flat! Only the first ring will be used"),e=e[0]);var F=ie([0,0]),X=xe(e),ce=X.getNorthWest().distanceTo(X.getSouthWest())*X.getNorthEast().distanceTo(X.getNorthWest());ce<1700&&(F=La(e));var Fe=e.length,Re=[];for(a=0;a<Fe;a++){var nt=ie(e[a]);Re.push(t.project(ie([nt.lat-F.lat,nt.lng-F.lng])))}for(a=0,l=0;a<Fe-1;a++)l+=Re[a].distanceTo(Re[a+1])/2;if(l===0)M=Re[0];else for(a=0,f=0;a<Fe-1;a++)if(y=Re[a],k=Re[a+1],p=y.distanceTo(k),f+=p,f>l){z=(f-l)/p,M=[k.x-z*(k.x-y.x),k.y-z*(k.y-y.y)];break}var Ue=t.unproject(j(M));return ie([Ue.lat+F.lat,Ue.lng+F.lng])}var Zl={__proto__:null,simplify:Qs,pointToSegmentDistance:eo,closestPointOnSegment:Dl,clipSegment:io,_getEdgeIntersection:vn,_getBitCode:ei,_sqClosestPointOnSegment:Hi,isFlat:it,_flat:no,polylineCenter:ao},Ca={project:function(e){return new U(e.lng,e.lat)},unproject:function(e){return new se(e.y,e.x)},bounds:new ae([-180,-90],[180,90])},Sa={R:6378137,R_MINOR:6356752314245179e-9,bounds:new ae([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(e){var t=Math.PI/180,a=this.R,l=e.lat*t,p=this.R_MINOR/a,f=Math.sqrt(1-p*p),y=f*Math.sin(l),k=Math.tan(Math.PI/4-l/2)/Math.pow((1-y)/(1+y),f/2);return l=-a*Math.log(Math.max(k,1e-10)),new U(e.lng*t*a,l)},unproject:function(e){for(var t=180/Math.PI,a=this.R,l=this.R_MINOR/a,p=Math.sqrt(1-l*l),f=Math.exp(-e.y/a),y=Math.PI/2-2*Math.atan(f),k=0,z=.1,M;k<15&&Math.abs(z)>1e-7;k++)M=p*Math.sin(y),M=Math.pow((1-M)/(1+M),p/2),z=Math.PI/2-2*Math.atan(f*M)-y,y+=z;return new se(y*t,e.x*t/a)}},Vl={__proto__:null,LonLat:Ca,Mercator:Sa,SphericalMercator:Kt},Wl=r({},lt,{code:"EPSG:3395",projection:Sa,transformation:function(){var e=.5/(Math.PI*Sa.R);return Bt(e,.5,-e,.5)}()}),so=r({},lt,{code:"EPSG:4326",projection:Ca,transformation:Bt(1/180,1,-1/180,.5)}),Gl=r({},ke,{projection:Ca,transformation:Bt(1,0,-1,0),scale:function(e){return Math.pow(2,e)},zoom:function(e){return Math.log(e)/Math.LN2},distance:function(e,t){var a=t.lng-e.lng,l=t.lat-e.lat;return Math.sqrt(a*a+l*l)},infinite:!0});ke.Earth=lt,ke.EPSG3395=Wl,ke.EPSG3857=di,ke.EPSG900913=cn,ke.EPSG4326=so,ke.Simple=Gl;var dt=G.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(e){return e.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(e){return e&&e.removeLayer(this),this},getPane:function(e){return this._map.getPane(e?this.options[e]||e:this.options.pane)},addInteractiveTarget:function(e){return this._map._targets[h(e)]=this,this},removeInteractiveTarget:function(e){return delete this._map._targets[h(e)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(e){var t=e.target;if(t.hasLayer(this)){if(this._map=t,this._zoomAnimated=t._zoomAnimated,this.getEvents){var a=this.getEvents();t.on(a,this),this.once("remove",function(){t.off(a,this)},this)}this.onAdd(t),this.fire("add"),t.fire("layeradd",{layer:this})}}});ue.include({addLayer:function(e){if(!e._layerAdd)throw new Error("The provided object is not a Layer.");var t=h(e);return this._layers[t]?this:(this._layers[t]=e,e._mapToAdd=this,e.beforeAdd&&e.beforeAdd(this),this.whenReady(e._layerAdd,e),this)},removeLayer:function(e){var t=h(e);return this._layers[t]?(this._loaded&&e.onRemove(this),delete this._layers[t],this._loaded&&(this.fire("layerremove",{layer:e}),e.fire("remove")),e._map=e._mapToAdd=null,this):this},hasLayer:function(e){return h(e)in this._layers},eachLayer:function(e,t){for(var a in this._layers)e.call(t,this._layers[a]);return this},_addLayers:function(e){e=e?P(e)?e:[e]:[];for(var t=0,a=e.length;t<a;t++)this.addLayer(e[t])},_addZoomLimit:function(e){(!isNaN(e.options.maxZoom)||!isNaN(e.options.minZoom))&&(this._zoomBoundLayers[h(e)]=e,this._updateZoomLevels())},_removeZoomLimit:function(e){var t=h(e);this._zoomBoundLayers[t]&&(delete this._zoomBoundLayers[t],this._updateZoomLevels())},_updateZoomLevels:function(){var e=1/0,t=-1/0,a=this._getZoomSpan();for(var l in this._zoomBoundLayers){var p=this._zoomBoundLayers[l].options;e=p.minZoom===void 0?e:Math.min(e,p.minZoom),t=p.maxZoom===void 0?t:Math.max(t,p.maxZoom)}this._layersMaxZoom=t===-1/0?void 0:t,this._layersMinZoom=e===1/0?void 0:e,a!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var mi=dt.extend({initialize:function(e,t){x(this,t),this._layers={};var a,l;if(e)for(a=0,l=e.length;a<l;a++)this.addLayer(e[a])},addLayer:function(e){var t=this.getLayerId(e);return this._layers[t]=e,this._map&&this._map.addLayer(e),this},removeLayer:function(e){var t=e in this._layers?e:this.getLayerId(e);return this._map&&this._layers[t]&&this._map.removeLayer(this._layers[t]),delete this._layers[t],this},hasLayer:function(e){var t=typeof e=="number"?e:this.getLayerId(e);return t in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(e){var t=Array.prototype.slice.call(arguments,1),a,l;for(a in this._layers)l=this._layers[a],l[e]&&l[e].apply(l,t);return this},onAdd:function(e){this.eachLayer(e.addLayer,e)},onRemove:function(e){this.eachLayer(e.removeLayer,e)},eachLayer:function(e,t){for(var a in this._layers)e.call(t,this._layers[a]);return this},getLayer:function(e){return this._layers[e]},getLayers:function(){var e=[];return this.eachLayer(e.push,e),e},setZIndex:function(e){return this.invoke("setZIndex",e)},getLayerId:function(e){return h(e)}}),Kl=function(e,t){return new mi(e,t)},zt=mi.extend({addLayer:function(e){return this.hasLayer(e)?this:(e.addEventParent(this),mi.prototype.addLayer.call(this,e),this.fire("layeradd",{layer:e}))},removeLayer:function(e){return this.hasLayer(e)?(e in this._layers&&(e=this._layers[e]),e.removeEventParent(this),mi.prototype.removeLayer.call(this,e),this.fire("layerremove",{layer:e})):this},setStyle:function(e){return this.invoke("setStyle",e)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var e=new we;for(var t in this._layers){var a=this._layers[t];e.extend(a.getBounds?a.getBounds():a.getLatLng())}return e}}),Yl=function(e,t){return new zt(e,t)},fi=O.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(e){x(this,e)},createIcon:function(e){return this._createIcon("icon",e)},createShadow:function(e){return this._createIcon("shadow",e)},_createIcon:function(e,t){var a=this._getIconUrl(e);if(!a){if(e==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var l=this._createImg(a,t&&t.tagName==="IMG"?t:null);return this._setIconStyles(l,e),(this.options.crossOrigin||this.options.crossOrigin==="")&&(l.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),l},_setIconStyles:function(e,t){var a=this.options,l=a[t+"Size"];typeof l=="number"&&(l=[l,l]);var p=j(l),f=j(t==="shadow"&&a.shadowAnchor||a.iconAnchor||p&&p.divideBy(2,!0));e.className="leaflet-marker-"+t+" "+(a.className||""),f&&(e.style.marginLeft=-f.x+"px",e.style.marginTop=-f.y+"px"),p&&(e.style.width=p.x+"px",e.style.height=p.y+"px")},_createImg:function(e,t){return t=t||document.createElement("img"),t.src=e,t},_getIconUrl:function(e){return W.retina&&this.options[e+"RetinaUrl"]||this.options[e+"Url"]}});function Jl(e){return new fi(e)}var Di=fi.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(e){return typeof Di.imagePath!="string"&&(Di.imagePath=this._detectIconPath()),(this.options.imagePath||Di.imagePath)+fi.prototype._getIconUrl.call(this,e)},_stripUrl:function(e){var t=function(a,l,p){var f=l.exec(a);return f&&f[p]};return e=t(e,/^url\((['"])?(.+)\1\)$/,2),e&&t(e,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var e=me("div","leaflet-default-icon-path",document.body),t=Pi(e,"background-image")||Pi(e,"backgroundImage");if(document.body.removeChild(e),t=this._stripUrl(t),t)return t;var a=document.querySelector('link[href$="leaflet.css"]');return a?a.href.substring(0,a.href.length-11-1):""}}),oo=vt.extend({initialize:function(e){this._marker=e},addHooks:function(){var e=this._marker._icon;this._draggable||(this._draggable=new Rt(e,e,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),le(e,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&Te(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(e){var t=this._marker,a=t._map,l=this._marker.options.autoPanSpeed,p=this._marker.options.autoPanPadding,f=Jt(t._icon),y=a.getPixelBounds(),k=a.getPixelOrigin(),z=de(y.min._subtract(k).add(p),y.max._subtract(k).subtract(p));if(!z.contains(f)){var M=j((Math.max(z.max.x,f.x)-z.max.x)/(y.max.x-z.max.x)-(Math.min(z.min.x,f.x)-z.min.x)/(y.min.x-z.min.x),(Math.max(z.max.y,f.y)-z.max.y)/(y.max.y-z.max.y)-(Math.min(z.min.y,f.y)-z.min.y)/(y.min.y-z.min.y)).multiplyBy(l);a.panBy(M,{animate:!1}),this._draggable._newPos._add(M),this._draggable._startPos._add(M),Me(t._icon,this._draggable._newPos),this._onDrag(e),this._panRequest=Y(this._adjustPan.bind(this,e))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(e){this._marker.options.autoPan&&(oe(this._panRequest),this._panRequest=Y(this._adjustPan.bind(this,e)))},_onDrag:function(e){var t=this._marker,a=t._shadow,l=Jt(t._icon),p=t._map.layerPointToLatLng(l);a&&Me(a,l),t._latlng=p,e.latlng=p,e.oldLatLng=this._oldLatLng,t.fire("move",e).fire("drag",e)},_onDragEnd:function(e){oe(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",e)}}),yn=dt.extend({options:{icon:new Di,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(e,t){x(this,t),this._latlng=ie(e)},onAdd:function(e){this._zoomAnimated=this._zoomAnimated&&e.options.markerZoomAnimation,this._zoomAnimated&&e.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(e){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&e.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(e){var t=this._latlng;return this._latlng=ie(e),this.update(),this.fire("move",{oldLatLng:t,latlng:this._latlng})},setZIndexOffset:function(e){return this.options.zIndexOffset=e,this.update()},getIcon:function(){return this.options.icon},setIcon:function(e){return this.options.icon=e,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var e=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(e)}return this},_initIcon:function(){var e=this.options,t="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),a=e.icon.createIcon(this._icon),l=!1;a!==this._icon&&(this._icon&&this._removeIcon(),l=!0,e.title&&(a.title=e.title),a.tagName==="IMG"&&(a.alt=e.alt||"")),le(a,t),e.keyboard&&(a.tabIndex="0",a.setAttribute("role","button")),this._icon=a,e.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&re(a,"focus",this._panOnFocus,this);var p=e.icon.createShadow(this._shadow),f=!1;p!==this._shadow&&(this._removeShadow(),f=!0),p&&(le(p,t),p.alt=""),this._shadow=p,e.opacity<1&&this._updateOpacity(),l&&this.getPane().appendChild(this._icon),this._initInteraction(),p&&f&&this.getPane(e.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&be(this._icon,"focus",this._panOnFocus,this),$e(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&$e(this._shadow),this._shadow=null},_setPos:function(e){this._icon&&Me(this._icon,e),this._shadow&&Me(this._shadow,e),this._zIndex=e.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(e){this._icon&&(this._icon.style.zIndex=this._zIndex+e)},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center).round();this._setPos(t)},_initInteraction:function(){if(this.options.interactive&&(le(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),oo)){var e=this.options.draggable;this.dragging&&(e=this.dragging.enabled(),this.dragging.disable()),this.dragging=new oo(this),e&&this.dragging.enable()}},setOpacity:function(e){return this.options.opacity=e,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var e=this.options.opacity;this._icon&&tt(this._icon,e),this._shadow&&tt(this._shadow,e)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var e=this._map;if(e){var t=this.options.icon.options,a=t.iconSize?j(t.iconSize):j(0,0),l=t.iconAnchor?j(t.iconAnchor):j(0,0);e.panInside(this._latlng,{paddingTopLeft:l,paddingBottomRight:a.subtract(l)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function Xl(e,t){return new yn(e,t)}var Ot=dt.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(e){this._renderer=e.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(e){return x(this,e),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&e&&Object.prototype.hasOwnProperty.call(e,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),bn=Ot.extend({options:{fill:!0,radius:10},initialize:function(e,t){x(this,t),this._latlng=ie(e),this._radius=this.options.radius},setLatLng:function(e){var t=this._latlng;return this._latlng=ie(e),this.redraw(),this.fire("move",{oldLatLng:t,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(e){return this.options.radius=this._radius=e,this.redraw()},getRadius:function(){return this._radius},setStyle:function(e){var t=e&&e.radius||this._radius;return Ot.prototype.setStyle.call(this,e),this.setRadius(t),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var e=this._radius,t=this._radiusY||e,a=this._clickTolerance(),l=[e+a,t+a];this._pxBounds=new ae(this._point.subtract(l),this._point.add(l))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(e){return e.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function Ql(e,t){return new bn(e,t)}var Ta=bn.extend({initialize:function(e,t,a){if(typeof t=="number"&&(t=r({},a,{radius:t})),x(this,t),this._latlng=ie(e),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(e){return this._mRadius=e,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var e=[this._radius,this._radiusY||this._radius];return new we(this._map.layerPointToLatLng(this._point.subtract(e)),this._map.layerPointToLatLng(this._point.add(e)))},setStyle:Ot.prototype.setStyle,_project:function(){var e=this._latlng.lng,t=this._latlng.lat,a=this._map,l=a.options.crs;if(l.distance===lt.distance){var p=Math.PI/180,f=this._mRadius/lt.R/p,y=a.project([t+f,e]),k=a.project([t-f,e]),z=y.add(k).divideBy(2),M=a.unproject(z).lat,F=Math.acos((Math.cos(f*p)-Math.sin(t*p)*Math.sin(M*p))/(Math.cos(t*p)*Math.cos(M*p)))/p;(isNaN(F)||F===0)&&(F=f/Math.cos(Math.PI/180*t)),this._point=z.subtract(a.getPixelOrigin()),this._radius=isNaN(F)?0:z.x-a.project([M,e-F]).x,this._radiusY=z.y-y.y}else{var X=l.unproject(l.project(this._latlng).subtract([this._mRadius,0]));this._point=a.latLngToLayerPoint(this._latlng),this._radius=this._point.x-a.latLngToLayerPoint(X).x}this._updateBounds()}});function ec(e,t,a){return new Ta(e,t,a)}var Lt=Ot.extend({options:{smoothFactor:1,noClip:!1},initialize:function(e,t){x(this,t),this._setLatLngs(e)},getLatLngs:function(){return this._latlngs},setLatLngs:function(e){return this._setLatLngs(e),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(e){for(var t=1/0,a=null,l=Hi,p,f,y=0,k=this._parts.length;y<k;y++)for(var z=this._parts[y],M=1,F=z.length;M<F;M++){p=z[M-1],f=z[M];var X=l(e,p,f,!0);X<t&&(t=X,a=l(e,p,f))}return a&&(a.distance=Math.sqrt(t)),a},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return ao(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(e,t){return t=t||this._defaultShape(),e=ie(e),t.push(e),this._bounds.extend(e),this.redraw()},_setLatLngs:function(e){this._bounds=new we,this._latlngs=this._convertLatLngs(e)},_defaultShape:function(){return it(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(e){for(var t=[],a=it(e),l=0,p=e.length;l<p;l++)a?(t[l]=ie(e[l]),this._bounds.extend(t[l])):t[l]=this._convertLatLngs(e[l]);return t},_project:function(){var e=new ae;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,e),this._bounds.isValid()&&e.isValid()&&(this._rawPxBounds=e,this._updateBounds())},_updateBounds:function(){var e=this._clickTolerance(),t=new U(e,e);this._rawPxBounds&&(this._pxBounds=new ae([this._rawPxBounds.min.subtract(t),this._rawPxBounds.max.add(t)]))},_projectLatlngs:function(e,t,a){var l=e[0]instanceof se,p=e.length,f,y;if(l){for(y=[],f=0;f<p;f++)y[f]=this._map.latLngToLayerPoint(e[f]),a.extend(y[f]);t.push(y)}else for(f=0;f<p;f++)this._projectLatlngs(e[f],t,a)},_clipPoints:function(){var e=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(e))){if(this.options.noClip){this._parts=this._rings;return}var t=this._parts,a,l,p,f,y,k,z;for(a=0,p=0,f=this._rings.length;a<f;a++)for(z=this._rings[a],l=0,y=z.length;l<y-1;l++)k=io(z[l],z[l+1],e,l,!0),k&&(t[p]=t[p]||[],t[p].push(k[0]),(k[1]!==z[l+1]||l===y-2)&&(t[p].push(k[1]),p++))}},_simplifyPoints:function(){for(var e=this._parts,t=this.options.smoothFactor,a=0,l=e.length;a<l;a++)e[a]=Qs(e[a],t)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(e,t){var a,l,p,f,y,k,z=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(e))return!1;for(a=0,f=this._parts.length;a<f;a++)for(k=this._parts[a],l=0,y=k.length,p=y-1;l<y;p=l++)if(!(!t&&l===0)&&eo(e,k[p],k[l])<=z)return!0;return!1}});function tc(e,t){return new Lt(e,t)}Lt._flat=no;var gi=Lt.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Xs(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(e){var t=Lt.prototype._convertLatLngs.call(this,e),a=t.length;return a>=2&&t[0]instanceof se&&t[0].equals(t[a-1])&&t.pop(),t},_setLatLngs:function(e){Lt.prototype._setLatLngs.call(this,e),it(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return it(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var e=this._renderer._bounds,t=this.options.weight,a=new U(t,t);if(e=new ae(e.min.subtract(a),e.max.add(a)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(e))){if(this.options.noClip){this._parts=this._rings;return}for(var l=0,p=this._rings.length,f;l<p;l++)f=Js(this._rings[l],e,!0),f.length&&this._parts.push(f)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(e){var t=!1,a,l,p,f,y,k,z,M;if(!this._pxBounds||!this._pxBounds.contains(e))return!1;for(f=0,z=this._parts.length;f<z;f++)for(a=this._parts[f],y=0,M=a.length,k=M-1;y<M;k=y++)l=a[y],p=a[k],l.y>e.y!=p.y>e.y&&e.x<(p.x-l.x)*(e.y-l.y)/(p.y-l.y)+l.x&&(t=!t);return t||Lt.prototype._containsPoint.call(this,e,!0)}});function ic(e,t){return new gi(e,t)}var Et=zt.extend({initialize:function(e,t){x(this,t),this._layers={},e&&this.addData(e)},addData:function(e){var t=P(e)?e:e.features,a,l,p;if(t){for(a=0,l=t.length;a<l;a++)p=t[a],(p.geometries||p.geometry||p.features||p.coordinates)&&this.addData(p);return this}var f=this.options;if(f.filter&&!f.filter(e))return this;var y=wn(e,f);return y?(y.feature=kn(e),y.defaultOptions=y.options,this.resetStyle(y),f.onEachFeature&&f.onEachFeature(e,y),this.addLayer(y)):this},resetStyle:function(e){return e===void 0?this.eachLayer(this.resetStyle,this):(e.options=r({},e.defaultOptions),this._setLayerStyle(e,this.options.style),this)},setStyle:function(e){return this.eachLayer(function(t){this._setLayerStyle(t,e)},this)},_setLayerStyle:function(e,t){e.setStyle&&(typeof t=="function"&&(t=t(e.feature)),e.setStyle(t))}});function wn(e,t){var a=e.type==="Feature"?e.geometry:e,l=a?a.coordinates:null,p=[],f=t&&t.pointToLayer,y=t&&t.coordsToLatLng||Ma,k,z,M,F;if(!l&&!a)return null;switch(a.type){case"Point":return k=y(l),ro(f,e,k,t);case"MultiPoint":for(M=0,F=l.length;M<F;M++)k=y(l[M]),p.push(ro(f,e,k,t));return new zt(p);case"LineString":case"MultiLineString":return z=xn(l,a.type==="LineString"?0:1,y),new Lt(z,t);case"Polygon":case"MultiPolygon":return z=xn(l,a.type==="Polygon"?1:2,y),new gi(z,t);case"GeometryCollection":for(M=0,F=a.geometries.length;M<F;M++){var X=wn({geometry:a.geometries[M],type:"Feature",properties:e.properties},t);X&&p.push(X)}return new zt(p);case"FeatureCollection":for(M=0,F=a.features.length;M<F;M++){var ce=wn(a.features[M],t);ce&&p.push(ce)}return new zt(p);default:throw new Error("Invalid GeoJSON object.")}}function ro(e,t,a,l){return e?e(t,a):new yn(a,l&&l.markersInheritOptions&&l)}function Ma(e){return new se(e[1],e[0],e[2])}function xn(e,t,a){for(var l=[],p=0,f=e.length,y;p<f;p++)y=t?xn(e[p],t-1,a):(a||Ma)(e[p]),l.push(y);return l}function Aa(e,t){return e=ie(e),e.alt!==void 0?[b(e.lng,t),b(e.lat,t),b(e.alt,t)]:[b(e.lng,t),b(e.lat,t)]}function _n(e,t,a,l){for(var p=[],f=0,y=e.length;f<y;f++)p.push(t?_n(e[f],it(e[f])?0:t-1,a,l):Aa(e[f],l));return!t&&a&&p.length>0&&p.push(p[0].slice()),p}function vi(e,t){return e.feature?r({},e.feature,{geometry:t}):kn(t)}function kn(e){return e.type==="Feature"||e.type==="FeatureCollection"?e:{type:"Feature",properties:{},geometry:e}}var Ia={toGeoJSON:function(e){return vi(this,{type:"Point",coordinates:Aa(this.getLatLng(),e)})}};yn.include(Ia),Ta.include(Ia),bn.include(Ia),Lt.include({toGeoJSON:function(e){var t=!it(this._latlngs),a=_n(this._latlngs,t?1:0,!1,e);return vi(this,{type:(t?"Multi":"")+"LineString",coordinates:a})}}),gi.include({toGeoJSON:function(e){var t=!it(this._latlngs),a=t&&!it(this._latlngs[0]),l=_n(this._latlngs,a?2:t?1:0,!0,e);return t||(l=[l]),vi(this,{type:(a?"Multi":"")+"Polygon",coordinates:l})}}),mi.include({toMultiPoint:function(e){var t=[];return this.eachLayer(function(a){t.push(a.toGeoJSON(e).geometry.coordinates)}),vi(this,{type:"MultiPoint",coordinates:t})},toGeoJSON:function(e){var t=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(t==="MultiPoint")return this.toMultiPoint(e);var a=t==="GeometryCollection",l=[];return this.eachLayer(function(p){if(p.toGeoJSON){var f=p.toGeoJSON(e);if(a)l.push(f.geometry);else{var y=kn(f);y.type==="FeatureCollection"?l.push.apply(l,y.features):l.push(y)}}}),a?vi(this,{geometries:l,type:"GeometryCollection"}):{type:"FeatureCollection",features:l}}});function lo(e,t){return new Et(e,t)}var nc=lo,$n=dt.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(e,t,a){this._url=e,this._bounds=xe(t),x(this,a)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(le(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){$e(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(e){return this.options.opacity=e,this._image&&this._updateOpacity(),this},setStyle:function(e){return e.opacity&&this.setOpacity(e.opacity),this},bringToFront:function(){return this._map&&pi(this._image),this},bringToBack:function(){return this._map&&hi(this._image),this},setUrl:function(e){return this._url=e,this._image&&(this._image.src=e),this},setBounds:function(e){return this._bounds=xe(e),this._map&&this._reset(),this},getEvents:function(){var e={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},setZIndex:function(e){return this.options.zIndex=e,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var e=this._url.tagName==="IMG",t=this._image=e?this._url:me("img");if(le(t,"leaflet-image-layer"),this._zoomAnimated&&le(t,"leaflet-zoom-animated"),this.options.className&&le(t,this.options.className),t.onselectstart=v,t.onmousemove=v,t.onload=d(this.fire,this,"load"),t.onerror=d(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(t.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),e){this._url=t.src;return}t.src=this._url,t.alt=this.options.alt},_animateZoom:function(e){var t=this._map.getZoomScale(e.zoom),a=this._map._latLngBoundsToNewLayerBounds(this._bounds,e.zoom,e.center).min;Yt(this._image,a,t)},_reset:function(){var e=this._image,t=new ae(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),a=t.getSize();Me(e,t.min),e.style.width=a.x+"px",e.style.height=a.y+"px"},_updateOpacity:function(){tt(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var e=this.options.errorOverlayUrl;e&&this._url!==e&&(this._url=e,this._image.src=e)},getCenter:function(){return this._bounds.getCenter()}}),ac=function(e,t,a){return new $n(e,t,a)},co=$n.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var e=this._url.tagName==="VIDEO",t=this._image=e?this._url:me("video");if(le(t,"leaflet-image-layer"),this._zoomAnimated&&le(t,"leaflet-zoom-animated"),this.options.className&&le(t,this.options.className),t.onselectstart=v,t.onmousemove=v,t.onloadeddata=d(this.fire,this,"load"),e){for(var a=t.getElementsByTagName("source"),l=[],p=0;p<a.length;p++)l.push(a[p].src);this._url=a.length>0?l:[t.src];return}P(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(t.style,"objectFit")&&(t.style.objectFit="fill"),t.autoplay=!!this.options.autoplay,t.loop=!!this.options.loop,t.muted=!!this.options.muted,t.playsInline=!!this.options.playsInline;for(var f=0;f<this._url.length;f++){var y=me("source");y.src=this._url[f],t.appendChild(y)}}});function sc(e,t,a){return new co(e,t,a)}var uo=$n.extend({_initImage:function(){var e=this._image=this._url;le(e,"leaflet-image-layer"),this._zoomAnimated&&le(e,"leaflet-zoom-animated"),this.options.className&&le(e,this.options.className),e.onselectstart=v,e.onmousemove=v}});function oc(e,t,a){return new uo(e,t,a)}var yt=dt.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(e,t){e&&(e instanceof se||P(e))?(this._latlng=ie(e),x(this,t)):(x(this,e),this._source=t),this.options.content&&(this._content=this.options.content)},openOn:function(e){return e=arguments.length?e:this._source._map,e.hasLayer(this)||e.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(e){return this._map?this.close():(arguments.length?this._source=e:e=this._source,this._prepareOpen(),this.openOn(e._map)),this},onAdd:function(e){this._zoomAnimated=e._zoomAnimated,this._container||this._initLayout(),e._fadeAnimated&&tt(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),e._fadeAnimated&&tt(this._container,1),this.bringToFront(),this.options.interactive&&(le(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(e){e._fadeAnimated?(tt(this._container,0),this._removeTimeout=setTimeout(d($e,void 0,this._container),200)):$e(this._container),this.options.interactive&&(Te(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(e){return this._latlng=ie(e),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(e){return this._content=e,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var e={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&pi(this._container),this},bringToBack:function(){return this._map&&hi(this._container),this},_prepareOpen:function(e){var t=this._source;if(!t._map)return!1;if(t instanceof zt){t=null;var a=this._source._layers;for(var l in a)if(a[l]._map){t=a[l];break}if(!t)return!1;this._source=t}if(!e)if(t.getCenter)e=t.getCenter();else if(t.getLatLng)e=t.getLatLng();else if(t.getBounds)e=t.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(e),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var e=this._contentNode,t=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof t=="string")e.innerHTML=t;else{for(;e.hasChildNodes();)e.removeChild(e.firstChild);e.appendChild(t)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var e=this._map.latLngToLayerPoint(this._latlng),t=j(this.options.offset),a=this._getAnchor();this._zoomAnimated?Me(this._container,e.add(a)):t=t.add(e).add(a);var l=this._containerBottom=-t.y,p=this._containerLeft=-Math.round(this._containerWidth/2)+t.x;this._container.style.bottom=l+"px",this._container.style.left=p+"px"}},_getAnchor:function(){return[0,0]}});ue.include({_initOverlay:function(e,t,a,l){var p=t;return p instanceof e||(p=new e(l).setContent(t)),a&&p.setLatLng(a),p}}),dt.include({_initOverlay:function(e,t,a,l){var p=a;return p instanceof e?(x(p,l),p._source=this):(p=t&&!l?t:new e(l,this),p.setContent(a)),p}});var zn=yt.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(e){return e=arguments.length?e:this._source._map,!e.hasLayer(this)&&e._popup&&e._popup.options.autoClose&&e.removeLayer(e._popup),e._popup=this,yt.prototype.openOn.call(this,e)},onAdd:function(e){yt.prototype.onAdd.call(this,e),e.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Ot||this._source.on("preclick",Xt))},onRemove:function(e){yt.prototype.onRemove.call(this,e),e.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Ot||this._source.off("preclick",Xt))},getEvents:function(){var e=yt.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(e.preclick=this.close),this.options.keepInView&&(e.moveend=this._adjustPan),e},_initLayout:function(){var e="leaflet-popup",t=this._container=me("div",e+" "+(this.options.className||"")+" leaflet-zoom-animated"),a=this._wrapper=me("div",e+"-content-wrapper",t);if(this._contentNode=me("div",e+"-content",a),ji(t),_a(this._contentNode),re(t,"contextmenu",Xt),this._tipContainer=me("div",e+"-tip-container",t),this._tip=me("div",e+"-tip",this._tipContainer),this.options.closeButton){var l=this._closeButton=me("a",e+"-close-button",t);l.setAttribute("role","button"),l.setAttribute("aria-label","Close popup"),l.href="#close",l.innerHTML='<span aria-hidden="true">&#215;</span>',re(l,"click",function(p){je(p),this.close()},this)}},_updateLayout:function(){var e=this._contentNode,t=e.style;t.width="",t.whiteSpace="nowrap";var a=e.offsetWidth;a=Math.min(a,this.options.maxWidth),a=Math.max(a,this.options.minWidth),t.width=a+1+"px",t.whiteSpace="",t.height="";var l=e.offsetHeight,p=this.options.maxHeight,f="leaflet-popup-scrolled";p&&l>p?(t.height=p+"px",le(e,f)):Te(e,f),this._containerWidth=this._container.offsetWidth},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center),a=this._getAnchor();Me(this._container,t.add(a))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var e=this._map,t=parseInt(Pi(this._container,"marginBottom"),10)||0,a=this._container.offsetHeight+t,l=this._containerWidth,p=new U(this._containerLeft,-a-this._containerBottom);p._add(Jt(this._container));var f=e.layerPointToContainerPoint(p),y=j(this.options.autoPanPadding),k=j(this.options.autoPanPaddingTopLeft||y),z=j(this.options.autoPanPaddingBottomRight||y),M=e.getSize(),F=0,X=0;f.x+l+z.x>M.x&&(F=f.x+l-M.x+z.x),f.x-F-k.x<0&&(F=f.x-k.x),f.y+a+z.y>M.y&&(X=f.y+a-M.y+z.y),f.y-X-k.y<0&&(X=f.y-k.y),(F||X)&&(this.options.keepInView&&(this._autopanning=!0),e.fire("autopanstart").panBy([F,X]))}},_getAnchor:function(){return j(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),rc=function(e,t){return new zn(e,t)};ue.mergeOptions({closePopupOnClick:!0}),ue.include({openPopup:function(e,t,a){return this._initOverlay(zn,e,t,a).openOn(this),this},closePopup:function(e){return e=arguments.length?e:this._popup,e&&e.close(),this}}),dt.include({bindPopup:function(e,t){return this._popup=this._initOverlay(zn,this._popup,e,t),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(e){return this._popup&&(this instanceof zt||(this._popup._source=this),this._popup._prepareOpen(e||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(e){return this._popup&&this._popup.setContent(e),this},getPopup:function(){return this._popup},_openPopup:function(e){if(!(!this._popup||!this._map)){Qt(e);var t=e.layer||e.target;if(this._popup._source===t&&!(t instanceof Ot)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(e.latlng);return}this._popup._source=t,this.openPopup(e.latlng)}},_movePopup:function(e){this._popup.setLatLng(e.latlng)},_onKeyPress:function(e){e.originalEvent.keyCode===13&&this._openPopup(e)}});var Ln=yt.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(e){yt.prototype.onAdd.call(this,e),this.setOpacity(this.options.opacity),e.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(e){yt.prototype.onRemove.call(this,e),e.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var e=yt.prototype.getEvents.call(this);return this.options.permanent||(e.preclick=this.close),e},_initLayout:function(){var e="leaflet-tooltip",t=e+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=me("div",t),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+h(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(e){var t,a,l=this._map,p=this._container,f=l.latLngToContainerPoint(l.getCenter()),y=l.layerPointToContainerPoint(e),k=this.options.direction,z=p.offsetWidth,M=p.offsetHeight,F=j(this.options.offset),X=this._getAnchor();k==="top"?(t=z/2,a=M):k==="bottom"?(t=z/2,a=0):k==="center"?(t=z/2,a=M/2):k==="right"?(t=0,a=M/2):k==="left"?(t=z,a=M/2):y.x<f.x?(k="right",t=0,a=M/2):(k="left",t=z+(F.x+X.x)*2,a=M/2),e=e.subtract(j(t,a,!0)).add(F).add(X),Te(p,"leaflet-tooltip-right"),Te(p,"leaflet-tooltip-left"),Te(p,"leaflet-tooltip-top"),Te(p,"leaflet-tooltip-bottom"),le(p,"leaflet-tooltip-"+k),Me(p,e)},_updatePosition:function(){var e=this._map.latLngToLayerPoint(this._latlng);this._setPosition(e)},setOpacity:function(e){this.options.opacity=e,this._container&&tt(this._container,e)},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center);this._setPosition(t)},_getAnchor:function(){return j(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),lc=function(e,t){return new Ln(e,t)};ue.include({openTooltip:function(e,t,a){return this._initOverlay(Ln,e,t,a).openOn(this),this},closeTooltip:function(e){return e.close(),this}}),dt.include({bindTooltip:function(e,t){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Ln,this._tooltip,e,t),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(e){if(!(!e&&this._tooltipHandlersAdded)){var t=e?"off":"on",a={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?a.add=this._openTooltip:(a.mouseover=this._openTooltip,a.mouseout=this.closeTooltip,a.click=this._openTooltip,this._map?this._addFocusListeners():a.add=this._addFocusListeners),this._tooltip.options.sticky&&(a.mousemove=this._moveTooltip),this[t](a),this._tooltipHandlersAdded=!e}},openTooltip:function(e){return this._tooltip&&(this instanceof zt||(this._tooltip._source=this),this._tooltip._prepareOpen(e)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(e){return this._tooltip&&this._tooltip.setContent(e),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(e){var t=typeof e.getElement=="function"&&e.getElement();t&&(re(t,"focus",function(){this._tooltip._source=e,this.openTooltip()},this),re(t,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(e){var t=typeof e.getElement=="function"&&e.getElement();t&&t.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(e){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var t=this;this._map.once("moveend",function(){t._openOnceFlag=!1,t._openTooltip(e)});return}this._tooltip._source=e.layer||e.target,this.openTooltip(this._tooltip.options.sticky?e.latlng:void 0)}},_moveTooltip:function(e){var t=e.latlng,a,l;this._tooltip.options.sticky&&e.originalEvent&&(a=this._map.mouseEventToContainerPoint(e.originalEvent),l=this._map.containerPointToLayerPoint(a),t=this._map.layerPointToLatLng(l)),this._tooltip.setLatLng(t)}});var po=fi.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(e){var t=e&&e.tagName==="DIV"?e:document.createElement("div"),a=this.options;if(a.html instanceof Element?(pn(t),t.appendChild(a.html)):t.innerHTML=a.html!==!1?a.html:"",a.bgPos){var l=j(a.bgPos);t.style.backgroundPosition=-l.x+"px "+-l.y+"px"}return this._setIconStyles(t,"icon"),t},createShadow:function(){return null}});function cc(e){return new po(e)}fi.Default=Di;var Fi=dt.extend({options:{tileSize:256,opacity:1,updateWhenIdle:W.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(e){x(this,e)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(e){e._addZoomLimit(this)},onRemove:function(e){this._removeAllTiles(),$e(this._container),e._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(pi(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(hi(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(e){return this.options.opacity=e,this._updateOpacity(),this},setZIndex:function(e){return this.options.zIndex=e,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var e=this._clampZoom(this._map.getZoom());e!==this._tileZoom&&(this._tileZoom=e,this._updateLevels()),this._update()}return this},getEvents:function(){var e={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=m(this._onMoveEnd,this.options.updateInterval,this)),e.move=this._onMove),this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},createTile:function(){return document.createElement("div")},getTileSize:function(){var e=this.options.tileSize;return e instanceof U?e:new U(e,e)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(e){for(var t=this.getPane().children,a=-e(-1/0,1/0),l=0,p=t.length,f;l<p;l++)f=t[l].style.zIndex,t[l]!==this._container&&f&&(a=e(a,+f));isFinite(a)&&(this.options.zIndex=a+e(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!W.ielt9){tt(this._container,this.options.opacity);var e=+new Date,t=!1,a=!1;for(var l in this._tiles){var p=this._tiles[l];if(!(!p.current||!p.loaded)){var f=Math.min(1,(e-p.loaded)/200);tt(p.el,f),f<1?t=!0:(p.active?a=!0:this._onOpaqueTile(p),p.active=!0)}}a&&!this._noPrune&&this._pruneTiles(),t&&(oe(this._fadeFrame),this._fadeFrame=Y(this._updateOpacity,this))}},_onOpaqueTile:v,_initContainer:function(){this._container||(this._container=me("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var e=this._tileZoom,t=this.options.maxZoom;if(e!==void 0){for(var a in this._levels)a=Number(a),this._levels[a].el.children.length||a===e?(this._levels[a].el.style.zIndex=t-Math.abs(e-a),this._onUpdateLevel(a)):($e(this._levels[a].el),this._removeTilesAtZoom(a),this._onRemoveLevel(a),delete this._levels[a]);var l=this._levels[e],p=this._map;return l||(l=this._levels[e]={},l.el=me("div","leaflet-tile-container leaflet-zoom-animated",this._container),l.el.style.zIndex=t,l.origin=p.project(p.unproject(p.getPixelOrigin()),e).round(),l.zoom=e,this._setZoomTransform(l,p.getCenter(),p.getZoom()),v(l.el.offsetWidth),this._onCreateLevel(l)),this._level=l,l}},_onUpdateLevel:v,_onRemoveLevel:v,_onCreateLevel:v,_pruneTiles:function(){if(this._map){var e,t,a=this._map.getZoom();if(a>this.options.maxZoom||a<this.options.minZoom){this._removeAllTiles();return}for(e in this._tiles)t=this._tiles[e],t.retain=t.current;for(e in this._tiles)if(t=this._tiles[e],t.current&&!t.active){var l=t.coords;this._retainParent(l.x,l.y,l.z,l.z-5)||this._retainChildren(l.x,l.y,l.z,l.z+2)}for(e in this._tiles)this._tiles[e].retain||this._removeTile(e)}},_removeTilesAtZoom:function(e){for(var t in this._tiles)this._tiles[t].coords.z===e&&this._removeTile(t)},_removeAllTiles:function(){for(var e in this._tiles)this._removeTile(e)},_invalidateAll:function(){for(var e in this._levels)$e(this._levels[e].el),this._onRemoveLevel(Number(e)),delete this._levels[e];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(e,t,a,l){var p=Math.floor(e/2),f=Math.floor(t/2),y=a-1,k=new U(+p,+f);k.z=+y;var z=this._tileCoordsToKey(k),M=this._tiles[z];return M&&M.active?(M.retain=!0,!0):(M&&M.loaded&&(M.retain=!0),y>l?this._retainParent(p,f,y,l):!1)},_retainChildren:function(e,t,a,l){for(var p=2*e;p<2*e+2;p++)for(var f=2*t;f<2*t+2;f++){var y=new U(p,f);y.z=a+1;var k=this._tileCoordsToKey(y),z=this._tiles[k];if(z&&z.active){z.retain=!0;continue}else z&&z.loaded&&(z.retain=!0);a+1<l&&this._retainChildren(p,f,a+1,l)}},_resetView:function(e){var t=e&&(e.pinch||e.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),t,t)},_animateZoom:function(e){this._setView(e.center,e.zoom,!0,e.noUpdate)},_clampZoom:function(e){var t=this.options;return t.minNativeZoom!==void 0&&e<t.minNativeZoom?t.minNativeZoom:t.maxNativeZoom!==void 0&&t.maxNativeZoom<e?t.maxNativeZoom:e},_setView:function(e,t,a,l){var p=Math.round(t);this.options.maxZoom!==void 0&&p>this.options.maxZoom||this.options.minZoom!==void 0&&p<this.options.minZoom?p=void 0:p=this._clampZoom(p);var f=this.options.updateWhenZooming&&p!==this._tileZoom;(!l||f)&&(this._tileZoom=p,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),p!==void 0&&this._update(e),a||this._pruneTiles(),this._noPrune=!!a),this._setZoomTransforms(e,t)},_setZoomTransforms:function(e,t){for(var a in this._levels)this._setZoomTransform(this._levels[a],e,t)},_setZoomTransform:function(e,t,a){var l=this._map.getZoomScale(a,e.zoom),p=e.origin.multiplyBy(l).subtract(this._map._getNewPixelOrigin(t,a)).round();W.any3d?Yt(e.el,p,l):Me(e.el,p)},_resetGrid:function(){var e=this._map,t=e.options.crs,a=this._tileSize=this.getTileSize(),l=this._tileZoom,p=this._map.getPixelWorldBounds(this._tileZoom);p&&(this._globalTileRange=this._pxBoundsToTileRange(p)),this._wrapX=t.wrapLng&&!this.options.noWrap&&[Math.floor(e.project([0,t.wrapLng[0]],l).x/a.x),Math.ceil(e.project([0,t.wrapLng[1]],l).x/a.y)],this._wrapY=t.wrapLat&&!this.options.noWrap&&[Math.floor(e.project([t.wrapLat[0],0],l).y/a.x),Math.ceil(e.project([t.wrapLat[1],0],l).y/a.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(e){var t=this._map,a=t._animatingZoom?Math.max(t._animateToZoom,t.getZoom()):t.getZoom(),l=t.getZoomScale(a,this._tileZoom),p=t.project(e,this._tileZoom).floor(),f=t.getSize().divideBy(l*2);return new ae(p.subtract(f),p.add(f))},_update:function(e){var t=this._map;if(t){var a=this._clampZoom(t.getZoom());if(e===void 0&&(e=t.getCenter()),this._tileZoom!==void 0){var l=this._getTiledPixelBounds(e),p=this._pxBoundsToTileRange(l),f=p.getCenter(),y=[],k=this.options.keepBuffer,z=new ae(p.getBottomLeft().subtract([k,-k]),p.getTopRight().add([k,-k]));if(!(isFinite(p.min.x)&&isFinite(p.min.y)&&isFinite(p.max.x)&&isFinite(p.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var M in this._tiles){var F=this._tiles[M].coords;(F.z!==this._tileZoom||!z.contains(new U(F.x,F.y)))&&(this._tiles[M].current=!1)}if(Math.abs(a-this._tileZoom)>1){this._setView(e,a);return}for(var X=p.min.y;X<=p.max.y;X++)for(var ce=p.min.x;ce<=p.max.x;ce++){var Fe=new U(ce,X);if(Fe.z=this._tileZoom,!!this._isValidTile(Fe)){var Re=this._tiles[this._tileCoordsToKey(Fe)];Re?Re.current=!0:y.push(Fe)}}if(y.sort(function(Ue,bi){return Ue.distanceTo(f)-bi.distanceTo(f)}),y.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var nt=document.createDocumentFragment();for(ce=0;ce<y.length;ce++)this._addTile(y[ce],nt);this._level.el.appendChild(nt)}}}},_isValidTile:function(e){var t=this._map.options.crs;if(!t.infinite){var a=this._globalTileRange;if(!t.wrapLng&&(e.x<a.min.x||e.x>a.max.x)||!t.wrapLat&&(e.y<a.min.y||e.y>a.max.y))return!1}if(!this.options.bounds)return!0;var l=this._tileCoordsToBounds(e);return xe(this.options.bounds).overlaps(l)},_keyToBounds:function(e){return this._tileCoordsToBounds(this._keyToTileCoords(e))},_tileCoordsToNwSe:function(e){var t=this._map,a=this.getTileSize(),l=e.scaleBy(a),p=l.add(a),f=t.unproject(l,e.z),y=t.unproject(p,e.z);return[f,y]},_tileCoordsToBounds:function(e){var t=this._tileCoordsToNwSe(e),a=new we(t[0],t[1]);return this.options.noWrap||(a=this._map.wrapLatLngBounds(a)),a},_tileCoordsToKey:function(e){return e.x+":"+e.y+":"+e.z},_keyToTileCoords:function(e){var t=e.split(":"),a=new U(+t[0],+t[1]);return a.z=+t[2],a},_removeTile:function(e){var t=this._tiles[e];t&&($e(t.el),delete this._tiles[e],this.fire("tileunload",{tile:t.el,coords:this._keyToTileCoords(e)}))},_initTile:function(e){le(e,"leaflet-tile");var t=this.getTileSize();e.style.width=t.x+"px",e.style.height=t.y+"px",e.onselectstart=v,e.onmousemove=v,W.ielt9&&this.options.opacity<1&&tt(e,this.options.opacity)},_addTile:function(e,t){var a=this._getTilePos(e),l=this._tileCoordsToKey(e),p=this.createTile(this._wrapCoords(e),d(this._tileReady,this,e));this._initTile(p),this.createTile.length<2&&Y(d(this._tileReady,this,e,null,p)),Me(p,a),this._tiles[l]={el:p,coords:e,current:!0},t.appendChild(p),this.fire("tileloadstart",{tile:p,coords:e})},_tileReady:function(e,t,a){t&&this.fire("tileerror",{error:t,tile:a,coords:e});var l=this._tileCoordsToKey(e);a=this._tiles[l],a&&(a.loaded=+new Date,this._map._fadeAnimated?(tt(a.el,0),oe(this._fadeFrame),this._fadeFrame=Y(this._updateOpacity,this)):(a.active=!0,this._pruneTiles()),t||(le(a.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:a.el,coords:e})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),W.ielt9||!this._map._fadeAnimated?Y(this._pruneTiles,this):setTimeout(d(this._pruneTiles,this),250)))},_getTilePos:function(e){return e.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(e){var t=new U(this._wrapX?g(e.x,this._wrapX):e.x,this._wrapY?g(e.y,this._wrapY):e.y);return t.z=e.z,t},_pxBoundsToTileRange:function(e){var t=this.getTileSize();return new ae(e.min.unscaleBy(t).floor(),e.max.unscaleBy(t).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var e in this._tiles)if(!this._tiles[e].loaded)return!1;return!0}});function dc(e){return new Fi(e)}var yi=Fi.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(e,t){this._url=e,t=x(this,t),t.detectRetina&&W.retina&&t.maxZoom>0?(t.tileSize=Math.floor(t.tileSize/2),t.zoomReverse?(t.zoomOffset--,t.minZoom=Math.min(t.maxZoom,t.minZoom+1)):(t.zoomOffset++,t.maxZoom=Math.max(t.minZoom,t.maxZoom-1)),t.minZoom=Math.max(0,t.minZoom)):t.zoomReverse?t.minZoom=Math.min(t.maxZoom,t.minZoom):t.maxZoom=Math.max(t.minZoom,t.maxZoom),typeof t.subdomains=="string"&&(t.subdomains=t.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(e,t){return this._url===e&&t===void 0&&(t=!0),this._url=e,t||this.redraw(),this},createTile:function(e,t){var a=document.createElement("img");return re(a,"load",d(this._tileOnLoad,this,t,a)),re(a,"error",d(this._tileOnError,this,t,a)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(a.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(a.referrerPolicy=this.options.referrerPolicy),a.alt="",a.src=this.getTileUrl(e),a},getTileUrl:function(e){var t={r:W.retina?"@2x":"",s:this._getSubdomain(e),x:e.x,y:e.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var a=this._globalTileRange.max.y-e.y;this.options.tms&&(t.y=a),t["-y"]=a}return _(this._url,r(t,this.options))},_tileOnLoad:function(e,t){W.ielt9?setTimeout(d(e,this,null,t),0):e(null,t)},_tileOnError:function(e,t,a){var l=this.options.errorTileUrl;l&&t.getAttribute("src")!==l&&(t.src=l),e(a,t)},_onTileRemove:function(e){e.tile.onload=null},_getZoomForUrl:function(){var e=this._tileZoom,t=this.options.maxZoom,a=this.options.zoomReverse,l=this.options.zoomOffset;return a&&(e=t-e),e+l},_getSubdomain:function(e){var t=Math.abs(e.x+e.y)%this.options.subdomains.length;return this.options.subdomains[t]},_abortLoading:function(){var e,t;for(e in this._tiles)if(this._tiles[e].coords.z!==this._tileZoom&&(t=this._tiles[e].el,t.onload=v,t.onerror=v,!t.complete)){t.src=B;var a=this._tiles[e].coords;$e(t),delete this._tiles[e],this.fire("tileabort",{tile:t,coords:a})}},_removeTile:function(e){var t=this._tiles[e];if(t)return t.el.setAttribute("src",B),Fi.prototype._removeTile.call(this,e)},_tileReady:function(e,t,a){if(!(!this._map||a&&a.getAttribute("src")===B))return Fi.prototype._tileReady.call(this,e,t,a)}});function ho(e,t){return new yi(e,t)}var mo=yi.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(e,t){this._url=e;var a=r({},this.defaultWmsParams);for(var l in t)l in this.options||(a[l]=t[l]);t=x(this,t);var p=t.detectRetina&&W.retina?2:1,f=this.getTileSize();a.width=f.x*p,a.height=f.y*p,this.wmsParams=a},onAdd:function(e){this._crs=this.options.crs||e.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var t=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[t]=this._crs.code,yi.prototype.onAdd.call(this,e)},getTileUrl:function(e){var t=this._tileCoordsToNwSe(e),a=this._crs,l=de(a.project(t[0]),a.project(t[1])),p=l.min,f=l.max,y=(this._wmsVersion>=1.3&&this._crs===so?[p.y,p.x,f.y,f.x]:[p.x,p.y,f.x,f.y]).join(","),k=yi.prototype.getTileUrl.call(this,e);return k+T(this.wmsParams,k,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+y},setParams:function(e,t){return r(this.wmsParams,e),t||this.redraw(),this}});function uc(e,t){return new mo(e,t)}yi.WMS=mo,ho.wms=uc;var Ct=dt.extend({options:{padding:.1},initialize:function(e){x(this,e),h(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),le(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var e={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(e.zoomanim=this._onAnimZoom),e},_onAnimZoom:function(e){this._updateTransform(e.center,e.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(e,t){var a=this._map.getZoomScale(t,this._zoom),l=this._map.getSize().multiplyBy(.5+this.options.padding),p=this._map.project(this._center,t),f=l.multiplyBy(-a).add(p).subtract(this._map._getNewPixelOrigin(e,t));W.any3d?Yt(this._container,f,a):Me(this._container,f)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var e in this._layers)this._layers[e]._reset()},_onZoomEnd:function(){for(var e in this._layers)this._layers[e]._project()},_updatePaths:function(){for(var e in this._layers)this._layers[e]._update()},_update:function(){var e=this.options.padding,t=this._map.getSize(),a=this._map.containerPointToLayerPoint(t.multiplyBy(-e)).round();this._bounds=new ae(a,a.add(t.multiplyBy(1+e*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),fo=Ct.extend({options:{tolerance:0},getEvents:function(){var e=Ct.prototype.getEvents.call(this);return e.viewprereset=this._onViewPreReset,e},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){Ct.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var e=this._container=document.createElement("canvas");re(e,"mousemove",this._onMouseMove,this),re(e,"click dblclick mousedown mouseup contextmenu",this._onClick,this),re(e,"mouseout",this._handleMouseOut,this),e._leaflet_disable_events=!0,this._ctx=e.getContext("2d")},_destroyContainer:function(){oe(this._redrawRequest),delete this._ctx,$e(this._container),be(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var e;this._redrawBounds=null;for(var t in this._layers)e=this._layers[t],e._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Ct.prototype._update.call(this);var e=this._bounds,t=this._container,a=e.getSize(),l=W.retina?2:1;Me(t,e.min),t.width=l*a.x,t.height=l*a.y,t.style.width=a.x+"px",t.style.height=a.y+"px",W.retina&&this._ctx.scale(2,2),this._ctx.translate(-e.min.x,-e.min.y),this.fire("update")}},_reset:function(){Ct.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(e){this._updateDashArray(e),this._layers[h(e)]=e;var t=e._order={layer:e,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=t),this._drawLast=t,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(e){this._requestRedraw(e)},_removePath:function(e){var t=e._order,a=t.next,l=t.prev;a?a.prev=l:this._drawLast=l,l?l.next=a:this._drawFirst=a,delete e._order,delete this._layers[h(e)],this._requestRedraw(e)},_updatePath:function(e){this._extendRedrawBounds(e),e._project(),e._update(),this._requestRedraw(e)},_updateStyle:function(e){this._updateDashArray(e),this._requestRedraw(e)},_updateDashArray:function(e){if(typeof e.options.dashArray=="string"){var t=e.options.dashArray.split(/[, ]+/),a=[],l,p;for(p=0;p<t.length;p++){if(l=Number(t[p]),isNaN(l))return;a.push(l)}e.options._dashArray=a}else e.options._dashArray=e.options.dashArray},_requestRedraw:function(e){this._map&&(this._extendRedrawBounds(e),this._redrawRequest=this._redrawRequest||Y(this._redraw,this))},_extendRedrawBounds:function(e){if(e._pxBounds){var t=(e.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new ae,this._redrawBounds.extend(e._pxBounds.min.subtract([t,t])),this._redrawBounds.extend(e._pxBounds.max.add([t,t]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var e=this._redrawBounds;if(e){var t=e.getSize();this._ctx.clearRect(e.min.x,e.min.y,t.x,t.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var e,t=this._redrawBounds;if(this._ctx.save(),t){var a=t.getSize();this._ctx.beginPath(),this._ctx.rect(t.min.x,t.min.y,a.x,a.y),this._ctx.clip()}this._drawing=!0;for(var l=this._drawFirst;l;l=l.next)e=l.layer,(!t||e._pxBounds&&e._pxBounds.intersects(t))&&e._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(e,t){if(this._drawing){var a,l,p,f,y=e._parts,k=y.length,z=this._ctx;if(k){for(z.beginPath(),a=0;a<k;a++){for(l=0,p=y[a].length;l<p;l++)f=y[a][l],z[l?"lineTo":"moveTo"](f.x,f.y);t&&z.closePath()}this._fillStroke(z,e)}}},_updateCircle:function(e){if(!(!this._drawing||e._empty())){var t=e._point,a=this._ctx,l=Math.max(Math.round(e._radius),1),p=(Math.max(Math.round(e._radiusY),1)||l)/l;p!==1&&(a.save(),a.scale(1,p)),a.beginPath(),a.arc(t.x,t.y/p,l,0,Math.PI*2,!1),p!==1&&a.restore(),this._fillStroke(a,e)}},_fillStroke:function(e,t){var a=t.options;a.fill&&(e.globalAlpha=a.fillOpacity,e.fillStyle=a.fillColor||a.color,e.fill(a.fillRule||"evenodd")),a.stroke&&a.weight!==0&&(e.setLineDash&&e.setLineDash(t.options&&t.options._dashArray||[]),e.globalAlpha=a.opacity,e.lineWidth=a.weight,e.strokeStyle=a.color,e.lineCap=a.lineCap,e.lineJoin=a.lineJoin,e.stroke())},_onClick:function(e){for(var t=this._map.mouseEventToLayerPoint(e),a,l,p=this._drawFirst;p;p=p.next)a=p.layer,a.options.interactive&&a._containsPoint(t)&&(!(e.type==="click"||e.type==="preclick")||!this._map._draggableMoved(a))&&(l=a);this._fireEvent(l?[l]:!1,e)},_onMouseMove:function(e){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var t=this._map.mouseEventToLayerPoint(e);this._handleMouseHover(e,t)}},_handleMouseOut:function(e){var t=this._hoveredLayer;t&&(Te(this._container,"leaflet-interactive"),this._fireEvent([t],e,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(e,t){if(!this._mouseHoverThrottled){for(var a,l,p=this._drawFirst;p;p=p.next)a=p.layer,a.options.interactive&&a._containsPoint(t)&&(l=a);l!==this._hoveredLayer&&(this._handleMouseOut(e),l&&(le(this._container,"leaflet-interactive"),this._fireEvent([l],e,"mouseover"),this._hoveredLayer=l)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,e),this._mouseHoverThrottled=!0,setTimeout(d(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(e,t,a){this._map._fireDOMEvent(t,a||t.type,e)},_bringToFront:function(e){var t=e._order;if(t){var a=t.next,l=t.prev;if(a)a.prev=l;else return;l?l.next=a:a&&(this._drawFirst=a),t.prev=this._drawLast,this._drawLast.next=t,t.next=null,this._drawLast=t,this._requestRedraw(e)}},_bringToBack:function(e){var t=e._order;if(t){var a=t.next,l=t.prev;if(l)l.next=a;else return;a?a.prev=l:l&&(this._drawLast=l),t.prev=null,t.next=this._drawFirst,this._drawFirst.prev=t,this._drawFirst=t,this._requestRedraw(e)}}});function go(e){return W.canvas?new fo(e):null}var qi=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(e){return document.createElement("<lvml:"+e+' class="lvml">')}}catch{}return function(e){return document.createElement("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),pc={_initContainer:function(){this._container=me("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(Ct.prototype._update.call(this),this.fire("update"))},_initPath:function(e){var t=e._container=qi("shape");le(t,"leaflet-vml-shape "+(this.options.className||"")),t.coordsize="1 1",e._path=qi("path"),t.appendChild(e._path),this._updateStyle(e),this._layers[h(e)]=e},_addPath:function(e){var t=e._container;this._container.appendChild(t),e.options.interactive&&e.addInteractiveTarget(t)},_removePath:function(e){var t=e._container;$e(t),e.removeInteractiveTarget(t),delete this._layers[h(e)]},_updateStyle:function(e){var t=e._stroke,a=e._fill,l=e.options,p=e._container;p.stroked=!!l.stroke,p.filled=!!l.fill,l.stroke?(t||(t=e._stroke=qi("stroke")),p.appendChild(t),t.weight=l.weight+"px",t.color=l.color,t.opacity=l.opacity,l.dashArray?t.dashStyle=P(l.dashArray)?l.dashArray.join(" "):l.dashArray.replace(/( *, *)/g," "):t.dashStyle="",t.endcap=l.lineCap.replace("butt","flat"),t.joinstyle=l.lineJoin):t&&(p.removeChild(t),e._stroke=null),l.fill?(a||(a=e._fill=qi("fill")),p.appendChild(a),a.color=l.fillColor||l.color,a.opacity=l.fillOpacity):a&&(p.removeChild(a),e._fill=null)},_updateCircle:function(e){var t=e._point.round(),a=Math.round(e._radius),l=Math.round(e._radiusY||a);this._setPath(e,e._empty()?"M0 0":"AL "+t.x+","+t.y+" "+a+","+l+" 0,"+65535*360)},_setPath:function(e,t){e._path.v=t},_bringToFront:function(e){pi(e._container)},_bringToBack:function(e){hi(e._container)}},En=W.vml?qi:Mi,Ui=Ct.extend({_initContainer:function(){this._container=En("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=En("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){$e(this._container),be(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Ct.prototype._update.call(this);var e=this._bounds,t=e.getSize(),a=this._container;(!this._svgSize||!this._svgSize.equals(t))&&(this._svgSize=t,a.setAttribute("width",t.x),a.setAttribute("height",t.y)),Me(a,e.min),a.setAttribute("viewBox",[e.min.x,e.min.y,t.x,t.y].join(" ")),this.fire("update")}},_initPath:function(e){var t=e._path=En("path");e.options.className&&le(t,e.options.className),e.options.interactive&&le(t,"leaflet-interactive"),this._updateStyle(e),this._layers[h(e)]=e},_addPath:function(e){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(e._path),e.addInteractiveTarget(e._path)},_removePath:function(e){$e(e._path),e.removeInteractiveTarget(e._path),delete this._layers[h(e)]},_updatePath:function(e){e._project(),e._update()},_updateStyle:function(e){var t=e._path,a=e.options;t&&(a.stroke?(t.setAttribute("stroke",a.color),t.setAttribute("stroke-opacity",a.opacity),t.setAttribute("stroke-width",a.weight),t.setAttribute("stroke-linecap",a.lineCap),t.setAttribute("stroke-linejoin",a.lineJoin),a.dashArray?t.setAttribute("stroke-dasharray",a.dashArray):t.removeAttribute("stroke-dasharray"),a.dashOffset?t.setAttribute("stroke-dashoffset",a.dashOffset):t.removeAttribute("stroke-dashoffset")):t.setAttribute("stroke","none"),a.fill?(t.setAttribute("fill",a.fillColor||a.color),t.setAttribute("fill-opacity",a.fillOpacity),t.setAttribute("fill-rule",a.fillRule||"evenodd")):t.setAttribute("fill","none"))},_updatePoly:function(e,t){this._setPath(e,De(e._parts,t))},_updateCircle:function(e){var t=e._point,a=Math.max(Math.round(e._radius),1),l=Math.max(Math.round(e._radiusY),1)||a,p="a"+a+","+l+" 0 1,0 ",f=e._empty()?"M0 0":"M"+(t.x-a)+","+t.y+p+a*2+",0 "+p+-a*2+",0 ";this._setPath(e,f)},_setPath:function(e,t){e._path.setAttribute("d",t)},_bringToFront:function(e){pi(e._path)},_bringToBack:function(e){hi(e._path)}});W.vml&&Ui.include(pc);function vo(e){return W.svg||W.vml?new Ui(e):null}ue.include({getRenderer:function(e){var t=e.options.renderer||this._getPaneRenderer(e.options.pane)||this.options.renderer||this._renderer;return t||(t=this._renderer=this._createRenderer()),this.hasLayer(t)||this.addLayer(t),t},_getPaneRenderer:function(e){if(e==="overlayPane"||e===void 0)return!1;var t=this._paneRenderers[e];return t===void 0&&(t=this._createRenderer({pane:e}),this._paneRenderers[e]=t),t},_createRenderer:function(e){return this.options.preferCanvas&&go(e)||vo(e)}});var yo=gi.extend({initialize:function(e,t){gi.prototype.initialize.call(this,this._boundsToLatLngs(e),t)},setBounds:function(e){return this.setLatLngs(this._boundsToLatLngs(e))},_boundsToLatLngs:function(e){return e=xe(e),[e.getSouthWest(),e.getNorthWest(),e.getNorthEast(),e.getSouthEast()]}});function hc(e,t){return new yo(e,t)}Ui.create=En,Ui.pointsToPath=De,Et.geometryToLayer=wn,Et.coordsToLatLng=Ma,Et.coordsToLatLngs=xn,Et.latLngToCoords=Aa,Et.latLngsToCoords=_n,Et.getFeature=vi,Et.asFeature=kn,ue.mergeOptions({boxZoom:!0});var bo=vt.extend({initialize:function(e){this._map=e,this._container=e._container,this._pane=e._panes.overlayPane,this._resetStateTimeout=0,e.on("unload",this._destroy,this)},addHooks:function(){re(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){be(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){$e(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(e){if(!e.shiftKey||e.which!==1&&e.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),Bi(),ma(),this._startPoint=this._map.mouseEventToContainerPoint(e),re(document,{contextmenu:Qt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(e){this._moved||(this._moved=!0,this._box=me("div","leaflet-zoom-box",this._container),le(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(e);var t=new ae(this._point,this._startPoint),a=t.getSize();Me(this._box,t.min),this._box.style.width=a.x+"px",this._box.style.height=a.y+"px"},_finish:function(){this._moved&&($e(this._box),Te(this._container,"leaflet-crosshair")),Ri(),fa(),be(document,{contextmenu:Qt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(e){if(!(e.which!==1&&e.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(d(this._resetState,this),0);var t=new we(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(t).fire("boxzoomend",{boxZoomBounds:t})}},_onKeyDown:function(e){e.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});ue.addInitHook("addHandler","boxZoom",bo),ue.mergeOptions({doubleClickZoom:!0});var wo=vt.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(e){var t=this._map,a=t.getZoom(),l=t.options.zoomDelta,p=e.originalEvent.shiftKey?a-l:a+l;t.options.doubleClickZoom==="center"?t.setZoom(p):t.setZoomAround(e.containerPoint,p)}});ue.addInitHook("addHandler","doubleClickZoom",wo),ue.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var xo=vt.extend({addHooks:function(){if(!this._draggable){var e=this._map;this._draggable=new Rt(e._mapPane,e._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),e.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),e.on("zoomend",this._onZoomEnd,this),e.whenReady(this._onZoomEnd,this))}le(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){Te(this._map._container,"leaflet-grab"),Te(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var e=this._map;if(e._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var t=xe(this._map.options.maxBounds);this._offsetLimit=de(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;e.fire("movestart").fire("dragstart"),e.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(e){if(this._map.options.inertia){var t=this._lastTime=+new Date,a=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(a),this._times.push(t),this._prunePositions(t)}this._map.fire("move",e).fire("drag",e)},_prunePositions:function(e){for(;this._positions.length>1&&e-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var e=this._map.getSize().divideBy(2),t=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=t.subtract(e).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(e,t){return e-(e-t)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var e=this._draggable._newPos.subtract(this._draggable._startPos),t=this._offsetLimit;e.x<t.min.x&&(e.x=this._viscousLimit(e.x,t.min.x)),e.y<t.min.y&&(e.y=this._viscousLimit(e.y,t.min.y)),e.x>t.max.x&&(e.x=this._viscousLimit(e.x,t.max.x)),e.y>t.max.y&&(e.y=this._viscousLimit(e.y,t.max.y)),this._draggable._newPos=this._draggable._startPos.add(e)}},_onPreDragWrap:function(){var e=this._worldWidth,t=Math.round(e/2),a=this._initialWorldOffset,l=this._draggable._newPos.x,p=(l-t+a)%e+t-a,f=(l+t+a)%e-t-a,y=Math.abs(p+a)<Math.abs(f+a)?p:f;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=y},_onDragEnd:function(e){var t=this._map,a=t.options,l=!a.inertia||e.noInertia||this._times.length<2;if(t.fire("dragend",e),l)t.fire("moveend");else{this._prunePositions(+new Date);var p=this._lastPos.subtract(this._positions[0]),f=(this._lastTime-this._times[0])/1e3,y=a.easeLinearity,k=p.multiplyBy(y/f),z=k.distanceTo([0,0]),M=Math.min(a.inertiaMaxSpeed,z),F=k.multiplyBy(M/z),X=M/(a.inertiaDeceleration*y),ce=F.multiplyBy(-X/2).round();!ce.x&&!ce.y?t.fire("moveend"):(ce=t._limitOffset(ce,t.options.maxBounds),Y(function(){t.panBy(ce,{duration:X,easeLinearity:y,noMoveStart:!0,animate:!0})}))}}});ue.addInitHook("addHandler","dragging",xo),ue.mergeOptions({keyboard:!0,keyboardPanDelta:80});var _o=vt.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(e){this._map=e,this._setPanDelta(e.options.keyboardPanDelta),this._setZoomDelta(e.options.zoomDelta)},addHooks:function(){var e=this._map._container;e.tabIndex<=0&&(e.tabIndex="0"),re(e,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),be(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var e=document.body,t=document.documentElement,a=e.scrollTop||t.scrollTop,l=e.scrollLeft||t.scrollLeft;this._map._container.focus(),window.scrollTo(l,a)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(e){var t=this._panKeys={},a=this.keyCodes,l,p;for(l=0,p=a.left.length;l<p;l++)t[a.left[l]]=[-1*e,0];for(l=0,p=a.right.length;l<p;l++)t[a.right[l]]=[e,0];for(l=0,p=a.down.length;l<p;l++)t[a.down[l]]=[0,e];for(l=0,p=a.up.length;l<p;l++)t[a.up[l]]=[0,-1*e]},_setZoomDelta:function(e){var t=this._zoomKeys={},a=this.keyCodes,l,p;for(l=0,p=a.zoomIn.length;l<p;l++)t[a.zoomIn[l]]=e;for(l=0,p=a.zoomOut.length;l<p;l++)t[a.zoomOut[l]]=-e},_addHooks:function(){re(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){be(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(e){if(!(e.altKey||e.ctrlKey||e.metaKey)){var t=e.keyCode,a=this._map,l;if(t in this._panKeys){if(!a._panAnim||!a._panAnim._inProgress)if(l=this._panKeys[t],e.shiftKey&&(l=j(l).multiplyBy(3)),a.options.maxBounds&&(l=a._limitOffset(j(l),a.options.maxBounds)),a.options.worldCopyJump){var p=a.wrapLatLng(a.unproject(a.project(a.getCenter()).add(l)));a.panTo(p)}else a.panBy(l)}else if(t in this._zoomKeys)a.setZoom(a.getZoom()+(e.shiftKey?3:1)*this._zoomKeys[t]);else if(t===27&&a._popup&&a._popup.options.closeOnEscapeKey)a.closePopup();else return;Qt(e)}}});ue.addInitHook("addHandler","keyboard",_o),ue.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var ko=vt.extend({addHooks:function(){re(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){be(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(e){var t=Vs(e),a=this._map.options.wheelDebounceTime;this._delta+=t,this._lastMousePos=this._map.mouseEventToContainerPoint(e),this._startTime||(this._startTime=+new Date);var l=Math.max(a-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(d(this._performZoom,this),l),Qt(e)},_performZoom:function(){var e=this._map,t=e.getZoom(),a=this._map.options.zoomSnap||0;e._stop();var l=this._delta/(this._map.options.wheelPxPerZoomLevel*4),p=4*Math.log(2/(1+Math.exp(-Math.abs(l))))/Math.LN2,f=a?Math.ceil(p/a)*a:p,y=e._limitZoom(t+(this._delta>0?f:-f))-t;this._delta=0,this._startTime=null,y&&(e.options.scrollWheelZoom==="center"?e.setZoom(t+y):e.setZoomAround(this._lastMousePos,t+y))}});ue.addInitHook("addHandler","scrollWheelZoom",ko);var mc=600;ue.mergeOptions({tapHold:W.touchNative&&W.safari&&W.mobile,tapTolerance:15});var $o=vt.extend({addHooks:function(){re(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){be(this._map._container,"touchstart",this._onDown,this)},_onDown:function(e){if(clearTimeout(this._holdTimeout),e.touches.length===1){var t=e.touches[0];this._startPos=this._newPos=new U(t.clientX,t.clientY),this._holdTimeout=setTimeout(d(function(){this._cancel(),this._isTapValid()&&(re(document,"touchend",je),re(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",t))},this),mc),re(document,"touchend touchcancel contextmenu",this._cancel,this),re(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function e(){be(document,"touchend",je),be(document,"touchend touchcancel",e)},_cancel:function(){clearTimeout(this._holdTimeout),be(document,"touchend touchcancel contextmenu",this._cancel,this),be(document,"touchmove",this._onMove,this)},_onMove:function(e){var t=e.touches[0];this._newPos=new U(t.clientX,t.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(e,t){var a=new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window,screenX:t.screenX,screenY:t.screenY,clientX:t.clientX,clientY:t.clientY});a._simulated=!0,t.target.dispatchEvent(a)}});ue.addInitHook("addHandler","tapHold",$o),ue.mergeOptions({touchZoom:W.touch,bounceAtZoomLimits:!0});var zo=vt.extend({addHooks:function(){le(this._map._container,"leaflet-touch-zoom"),re(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){Te(this._map._container,"leaflet-touch-zoom"),be(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(e){var t=this._map;if(!(!e.touches||e.touches.length!==2||t._animatingZoom||this._zooming)){var a=t.mouseEventToContainerPoint(e.touches[0]),l=t.mouseEventToContainerPoint(e.touches[1]);this._centerPoint=t.getSize()._divideBy(2),this._startLatLng=t.containerPointToLatLng(this._centerPoint),t.options.touchZoom!=="center"&&(this._pinchStartLatLng=t.containerPointToLatLng(a.add(l)._divideBy(2))),this._startDist=a.distanceTo(l),this._startZoom=t.getZoom(),this._moved=!1,this._zooming=!0,t._stop(),re(document,"touchmove",this._onTouchMove,this),re(document,"touchend touchcancel",this._onTouchEnd,this),je(e)}},_onTouchMove:function(e){if(!(!e.touches||e.touches.length!==2||!this._zooming)){var t=this._map,a=t.mouseEventToContainerPoint(e.touches[0]),l=t.mouseEventToContainerPoint(e.touches[1]),p=a.distanceTo(l)/this._startDist;if(this._zoom=t.getScaleZoom(p,this._startZoom),!t.options.bounceAtZoomLimits&&(this._zoom<t.getMinZoom()&&p<1||this._zoom>t.getMaxZoom()&&p>1)&&(this._zoom=t._limitZoom(this._zoom)),t.options.touchZoom==="center"){if(this._center=this._startLatLng,p===1)return}else{var f=a._add(l)._divideBy(2)._subtract(this._centerPoint);if(p===1&&f.x===0&&f.y===0)return;this._center=t.unproject(t.project(this._pinchStartLatLng,this._zoom).subtract(f),this._zoom)}this._moved||(t._moveStart(!0,!1),this._moved=!0),oe(this._animRequest);var y=d(t._move,t,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=Y(y,this,!0),je(e)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,oe(this._animRequest),be(document,"touchmove",this._onTouchMove,this),be(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});ue.addInitHook("addHandler","touchZoom",zo),ue.BoxZoom=bo,ue.DoubleClickZoom=wo,ue.Drag=xo,ue.Keyboard=_o,ue.ScrollWheelZoom=ko,ue.TapHold=$o,ue.TouchZoom=zo,s.Bounds=ae,s.Browser=W,s.CRS=ke,s.Canvas=fo,s.Circle=Ta,s.CircleMarker=bn,s.Class=O,s.Control=ct,s.DivIcon=po,s.DivOverlay=yt,s.DomEvent=Al,s.DomUtil=Tl,s.Draggable=Rt,s.Evented=G,s.FeatureGroup=zt,s.GeoJSON=Et,s.GridLayer=Fi,s.Handler=vt,s.Icon=fi,s.ImageOverlay=$n,s.LatLng=se,s.LatLngBounds=we,s.Layer=dt,s.LayerGroup=mi,s.LineUtil=Zl,s.Map=ue,s.Marker=yn,s.Mixin=Nl,s.Path=Ot,s.Point=U,s.PolyUtil=Hl,s.Polygon=gi,s.Polyline=Lt,s.Popup=zn,s.PosAnimation=Ws,s.Projection=Vl,s.Rectangle=yo,s.Renderer=Ct,s.SVG=Ui,s.SVGOverlay=uo,s.TileLayer=yi,s.Tooltip=Ln,s.Transformation=ci,s.Util=pe,s.VideoOverlay=co,s.bind=d,s.bounds=de,s.canvas=go,s.circle=ec,s.circleMarker=Ql,s.control=Ni,s.divIcon=cc,s.extend=r,s.featureGroup=Yl,s.geoJSON=lo,s.geoJson=nc,s.gridLayer=dc,s.icon=Jl,s.imageOverlay=ac,s.latLng=ie,s.latLngBounds=xe,s.layerGroup=Kl,s.map=Il,s.marker=Xl,s.point=j,s.polygon=ic,s.polyline=tc,s.popup=rc,s.rectangle=hc,s.setOptions=x,s.stamp=h,s.svg=vo,s.svgOverlay=oc,s.tileLayer=ho,s.tooltip=lc,s.transformation=Bt,s.version=o,s.videoOverlay=sc;var fc=window.L;s.noConflict=function(){return window.L=fc,this},window.L=s})})(ts,ts.exports);var _u=ts.exports;const Ie=xu(_u),fs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcYBeBeoQIhRAkLlRDGrhIgY3BJL8CVeKzuyXFzzjkn5ZxzzuScg3PO8cKzu70JkO0LfxdTU//pM9vTu7Xgf6KqOVTb9X7toRrVEfBf1HTVjZccrT/2by1VV928Yty9ZbVuucdz90frG8DBjl9pVApbOstvmMuvVgaNXSfAAd6pGxpy6yxf5ph43pS/4f3uoaGm2rdu72S9xzOvMymkZFq/ptDrk90mhW7e4zl7HLzhxGWPR20xmSxJ/VqldG5m9XhaVOA1DadsNh3Pu5L2N6QtPO/32JpqQBVVk20oy/Pi2s23WEvyfHbe1thadVQttvm7Llf65gGmXK67XtupyoM7HQhmXdLS8oGWJNeOJ3C5fG5XCEJnkez3/oFdsvgJ4l2ANZwhrJKk/7OSXa+3Vw2WJMlKnGkobouYk6T0TyX30klOUnTD9HJ5qpckL3EW/w4XF3Xd0FGywXUrstrclVsqz5Pd/sXFYyDnPdrLcQODmGOK47IZb4CmibmMn+MYRzFZ5jg33ZL/EJrWcszHmANy3ARBK/IXtciJy8VsitPSdE3uuHxzougojcUdr8/32atnz/ev3f/K5wtpxUTpcaI45zusVDpYtZi+jg0oU9b3x74h7+n9ABvYEZeKaVq0sh0AtLKsFtqNBdeT0MrSzwwlq9+x6xAO4tgOtSzbCjrNQQiNvQUbUEubvzBUeGw26yDCsRHCoLkTHDa7IdOLIThs/gHvChszh2CimE8peRs47cxANI0lYNB5y1DljpOF0IhzBDPOZnDOqYYbeGKECbPzWnXludPphw5c2YBq5zlwXphIbO4VDCZ0gnPfUO1TwZoYwAs2ExPCedAu9DAjfQUjzITQb3jNj0KG2Sgt6BHaQUdYzWz+XmBktOHwanXjaSTcwwziBcuMOtwBmqPrTOxFQR/DRKKPqyur0aiW6cULYsx6tBm0jXpR/AUWR6HRq9WVW6MRhIq5jLyjbaCTDCijyYJNpCajdyobP/eTw0iexBAKkJ3gA5KcQb2zBXsIBckn+xVv8jkZSaEFHE+jFEleAEfayRU0MouNoBmB/L50Ai/HSLIHxcrpCvnhSQAuakKp2C/YbCylJjXRVy/z3+Kv/RrNcCo+WUzlVEhzKffnTQnxeN9fWF88fiNCUdSTsaufaChKWInHeysygfpIqagoakW+vV20J8uyl6TyNKEZWV4oRSPyCkWpgOLSbkCObT8o2r6tlG58HQquf6O0v50tB7JM7F4EORd2dx/K0w/KHsVkLPaoYrwgP/y7krr3SSMA4zj+OBgmjYkxcdIJQyQRKgg2viX9Hddi9UBb29LrKR7CVVEEEXWojUkXNyfTNDE14W9gbHJNuhjDettN3ZvbOvdOqCD3Jp/9l+/wJE+9PkYGjx/fqkys3S2rMozM/o2106rfMUINo6hVqz+eu/hd1c4xTg0TAfy5kV+4UG6+IthHTU9woWmxuKNbTfuCSfovBCxq7EtHqvYL4Sm6F8GVxsSXHMQ07TOi1DKtZxjWaaIyi4CXWjxPccUw8WVbMYY5wxC1mzEyXMJWkllpRloi+Kkoq69sxBTlElF6aAxYUbjXNlhlDZilDnM4U5SlN5biRsRHnbx3mbeWjEh4mEyiuJDl5XcWVmX5GvNkFgLWZM5qwsop4/AWfLhU1cR7k1VVvcYCWRkOI6Xy5gmnphCYIkvzuNYzHzosq2oNk2RtSs8khfUOfHIDgR6ysYBaMpl4uEgk2U/oJTs9AaTSwma7dT69geAE2ZpEjUsn2ieJNHeKfrI3EcAGJ2ZaNgVuC8EBctCLc57P5u5led6IOBkIYkuQMrmmjChs4VkfOerHqSBkPzZlhe06RslZ3zMjk2sscqKwY0RcjKK+LWbzd7KiHhkncs/siFJ+V5eXxD34B8nVuJEpGJNmxN2gH3vSvp7J70tF+D1Ej8qUJD1TkErAND2GZwTFg/LubvmgiBG3SOvdlsqFQrkEzJCL1rstlnVFROixZoDDSuXQFHESwVGlcuQcMb/b42NgjLowh5MTDFE3vNB5qStRIErdCQEh6pLPR92anSUb/wAIhldAaDMpGgAAAABJRU5ErkJggg==",gs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",vs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC";delete Ie.Icon.Default.prototype._getIconUrl;Ie.Icon.Default.mergeOptions({iconRetinaUrl:fs,iconUrl:gs,shadowUrl:vs});const ku="https://tile.openstreetmap.org/{z}/{x}/{y}.png",$u='© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';function zu(i){if(!i||i.latitude==null||i.longitude==null)return"";const n=Number(i.latitude),s=Number(i.longitude);if(isNaN(n)||isNaN(s))return"";const o=i.maps_url||`https://www.google.com/maps/search/?api=1&query=${n},${s}`,r=`readonly-map-${i.entity_id||"preview"}-${Math.random().toString(36).substring(2,7)}`;return`
    <div class="card mb-6" style="border-top:3px solid var(--primary);">
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
        <div class="card-title" style="display:flex; align-items:center; gap:8px;">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--primary);">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Location & Geo-Coordinates
        </div>
        <a href="${o}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Open in Google Maps
        </a>
      </div>
      <div class="card-body" style="padding:16px;">
        <div id="${r}" data-lat="${n}" data-lng="${s}" class="entity-readonly-map-instance" style="height:220px; width:100%; border-radius:6px; border:1px solid var(--border); background:#f1f5f9; z-index:1;"></div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:12px; color:var(--text-muted);">
          <span>Latitude: <strong>${n.toFixed(6)}</strong> • Longitude: <strong>${s.toFixed(6)}</strong></span>
          <span class="badge badge-success" style="font-size:11px;">Verified Coordinates</span>
        </div>
      </div>
    </div>
  `}function Lu(){document.querySelectorAll(".entity-readonly-map-instance").forEach(n=>{if(n.dataset.initialized)return;const s=parseFloat(n.dataset.lat),o=parseFloat(n.dataset.lng);if(!(isNaN(s)||isNaN(o))){n.dataset.initialized="true";try{const r=Ie.map(n,{center:[s,o],zoom:14,zoomControl:!0,attributionControl:!0,scrollWheelZoom:!1});Ie.tileLayer(ku,{attribution:$u,maxZoom:19}).addTo(r),Ie.marker([s,o]).addTo(r),setTimeout(()=>{r.invalidateSize()},200)}catch(r){console.warn("[ReadOnlyMap] Failed to initialize map container:",r)}}})}function Z(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}async function aa({id:i}){var r;const n=String(i||"").split("?")[0].split("#")[0];if(!n||n==="new"){ne("/entities/new"+(window.location.search||""));return}if(!kt(ne))return;const s=He(),o=document.getElementById("app");o.innerHTML=Ee(`
    <div class="page-header mb-4" style="display:flex; justify-content:space-between; align-items:flex-start;">
      <div class="page-header-left">
        <div class="topbar-breadcrumb mb-2"><a href="/entities" class="text-link">My Requests</a> / Case #${n}</div>
        <h1 id="header-title">Loading Case...</h1>
      </div>
      <div id="header-extra-actions" style="display:flex; gap:10px;"></div>
    </div>
    
    <div id="detail-content">
      <div class="loading-overlay"><div class="spinner spinner-lg"></div></div>
    </div>
  `,`Case #${n}`),Ce();try{const[c,d,u,h,m]=await Promise.all([fe.get(n),mr.list(n).catch(()=>({data:[]})),fe.audit(n).catch(()=>({data:{auditLogs:[],approvalHistory:[]}})),fe.getLineage(n).catch(()=>({data:{current:null,parent:null,children:[],rules:[]}})),fe.workflow(n).catch(()=>({data:{allowedTransitions:[]}}))]),g=c.data,v=d.data||[],b=u.data||{auditLogs:[],approvalHistory:[]},w=h.data||{current:null,parent:null,children:[],rules:[]},$=m.data||{allowedTransitions:[]};let x=[];try{x=(await li.list({entity_type_id:g.entity_type_id})).data||[]}catch{x=[]}if(document.getElementById("header-title").textContent=g.name,["approved","coordinator_approved","verified","in_progress","resolved","closed"].includes(String(g.status||"").toLowerCase())&&((r=g.entityType)==null?void 0:r.name)!=="Civic Campaign"){const _=document.getElementById("header-extra-actions");_&&(_.innerHTML=`
          <a href="/meme/studio/${g.entity_id}" class="btn btn-secondary" style="display:inline-flex; align-items:center; gap:6px; font-weight:700; border-color:#f59e0b; color:#d97706; background:#fffbeb;">
            <span>⚡</span> Create Civic Meme
          </a>
        `)}Eu(document.getElementById("detail-content"),g,v,b,w,$,x,s)}catch(c){console.error("Failed to load case detail:",c),te("Failed to load case details"),document.getElementById("detail-content").innerHTML=`<div class="alert alert-error">Failed to load case #${n}. It may not exist.</div>`}}function Eu(i,n,s,o,r,c,d,u){var O,K;const h=et(n.entityType),m=["draft","submitted","coordinator_approved","approved"],g=m.indexOf(n.status)!==-1?m.indexOf(n.status):-1,v=n.status==="rejected";let b='<div class="workflow-steps mt-4 mb-2">';m.forEach((I,G)=>{const U=G<g||G===g&&!v&&n.status==="approved",Se=G===g&&n.status!=="approved";b+=`
      <div class="workflow-step">
        <div class="workflow-step-node">
          <div class="workflow-step-circle ${v&&G===g?"rejected":U?"done":Se?"current":""}">${G+1}</div>
          <div class="workflow-step-label mt-1">${Su(I)}</div>
        </div>
        ${G<m.length-1?`<div class="workflow-step-connector ${U?"done":""}"></div>`:""}
      </div>
    `}),v&&(b+=`
      <div class="workflow-step">
        <div class="workflow-step-connector"></div>
        <div class="workflow-step-node">
          <div class="workflow-step-circle rejected">!</div>
          <div class="workflow-step-label mt-1 text-red-600">Rejected</div>
        </div>
      </div>
    `),b+="</div>";const w=Cu(n,c.allowedTransitions||[],u),$=u&&["coordinator_area","coordinator_general","director","admin"].includes(u.role);let x="";$&&n.status!=="deleted"&&(x=`
      <div class="card mb-6" id="case-panel-card" style="border:1px solid var(--primary-border);">
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; padding:0.85rem 1.25rem;">
          <h3 class="card-title" style="margin:0;">Case panel</h3>
          <span style="font-size:12px; color:var(--text-muted);">Only the summary is AI; everything else follows rules.</span>
        </div>
        <div class="card-body" id="case-panel-body" style="padding:1rem 1.25rem;">
          <div class="text-muted text-sm">Loading case panel…</div>
        </div>
        <details id="case-deeper" style="border-top:1px solid var(--border); padding:0.75rem 1.25rem;">
          <summary style="cursor:pointer; font-size:13px; font-weight:600; color:var(--text-secondary);">Deeper analysis (optional, general commentary)</summary>
          <div style="font-size:12px; color:var(--text-muted); margin:8px 0;">
            General AI commentary on this case. It is not checked against the record, is not used for the checklist, flags or suggested action, and may contain statements that do not come from this case.
          </div>
          <div id="ai-report-source" style="font-size:12px; color:var(--text-muted); margin-bottom:8px;"></div>
          <span id="ai-report-badge" class="badge badge-pending" style="display:none;"></span>
          <div id="ai-report-body">
            <button id="btn-generate-ai" class="btn btn-secondary btn-sm">Run deeper analysis</button>
          </div>
        </details>
      </div>
    `);let T="";r.children&&r.children.length>0&&(T=`
      <div class="card mb-6" style="border-top:4px solid var(--green-600); background:#f0fdf4; border-color:#bbf7d0;">
        <div class="card-body" style="padding:16px;">
          <div style="display:flex; align-items:flex-start; gap:12px;">
            <div style="display:flex; align-items:center; padding-top:2px; color:#16a34a;">
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div style="flex:1;">
              <h4 style="font-size:1rem; font-weight:700; color:#166534; margin-bottom:4px;">
                Civic Automation Executed
              </h4>
              <p style="font-size:0.875rem; color:#15803d; margin-bottom:12px;">
                This case approval automatically triggered <strong>${r.children.length} related civic record(s)</strong> via configured metadata automation rules.
              </p>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${r.children.map(I=>`
                  <div style="padding:10px 14px; background:#ffffff; border:1px solid #a7f3d0; border-radius:6px; font-size:0.875rem; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                      <strong style="color:var(--text-primary);">#PR-${String(I.entity_id).padStart(5,"0")} ${Z(I.name)}</strong>
                      <span class="badge badge-secondary ml-2">${Z(I.type_name)}</span>
                    </div>
                    <a href="/entities/${I.entity_id}" class="btn btn-secondary btn-sm" style="font-size:12px;">View Related Record →</a>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `);const E=s.map(I=>{var G,U;return`
    <tr>
      <td class="param-key" style="font-weight:600; width:35%; font-size:0.875rem;">${Z(((G=I.parameterMaster)==null?void 0:G.label)||((U=I.parameterMaster)==null?void 0:U.field_key)||`Parameter #${I.parameter_id}`)}</td>
      <td class="param-val" style="font-size:0.875rem;">${Z(I.value||"—")}</td>
    </tr>
  `}).join(""),_=s.length>0?`<div class="table-container"><table class="table"><tbody>${E}</tbody></table></div>`:'<div class="text-muted p-4">No custom parameter values submitted for this case.</div>',P=o.auditLogs||[];o.approvalHistory;const R=P.map(I=>`
    <div class="timeline-item mb-3" style="padding:12px; border-left:3px solid var(--primary); background:var(--gray-50); border-radius:4px;">
      <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-muted);">
        <span><strong>${Z(I.user||"System")}</strong> (${Z(I.role||"User")})</span>
        <span>${new Date(I.datetime).toLocaleString()}</span>
      </div>
      <div style="font-size:0.875rem; color:var(--text-primary); margin-top:4px; font-weight:500;">
        ${I.action==="status_transition"?`Status Transition: <strong>${mt(I.old_status)}</strong> → <strong>${mt(I.new_status)}</strong>`:`Action Executed: <strong>${I.action}</strong>`}
      </div>
      ${I.reason?`<div style="font-size:0.8rem; color:var(--text-secondary); font-style:italic; margin-top:4px; background:#fff; padding:6px; border-radius:4px; border:1px solid var(--border);">"${Z(I.reason)}"</div>`:""}
    </div>
  `).join(""),B=P.length>0?`<div>${R}</div>`:'<div class="text-muted p-4">No audit logs recorded yet for this case.</div>';let V="";u&&["director","admin"].includes(u.role)&&d.length>0&&(V=`
      <div class="card mb-6" style="border-top:3px solid var(--green-600);">
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
          <div class="card-title" style="display:flex; align-items:center; gap:8px;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Civic Reports
          </div>
          <span class="badge badge-success">${d.length} Reports</span>
        </div>
        <div class="card-body" style="padding:16px;">
          <div style="display:flex; flex-wrap:wrap; gap:10px;">
            ${d.map(I=>`
              <button type="button" class="btn btn-secondary btn-sm execute-rep-btn" data-repid="${I.report_id}" style="display:inline-flex; align-items:center; gap:6px;">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Execute "${Z(I.report_name)}"
              </button>
            `).join("")}
          </div>
          <div id="report-result-output" class="mt-4" style="display:none;"></div>
        </div>
      </div>
    `);let A="";(r.parent||r.children&&r.children.length>0)&&(A=`
      <div class="card mb-6" style="border-top:3px solid var(--primary);">
        <div class="card-header">
          <div class="card-title" style="display:flex; align-items:center; gap:8px;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            Civic Lineage
          </div>
          <div class="card-subtitle">Connected parent and auto-created child civic activities</div>
        </div>
        <div class="card-body" style="padding:16px;">
          ${r.parent?`
            <div style="margin-bottom:12px; padding:12px; background:var(--primary-light); border:1px solid var(--primary-border); border-radius:6px; font-size:13px;">
              <div style="font-size:0.75rem; color:var(--primary); font-weight:700; text-transform:uppercase; margin-bottom:2px;">Parent Case</div>
              <a href="/entities/${r.parent.entity_id}" class="text-link font-medium">#PR-${String(r.parent.entity_id).padStart(5,"0")} ${Z(r.parent.name)} (${Z(((O=r.parent.entityType)==null?void 0:O.name)||"Capability")})</a>
            </div>
          `:""}
          ${r.children&&r.children.length>0?`
            <div style="font-size:13px; font-weight:600; color:var(--text-primary); margin-bottom:8px;">Linked Child Activities:</div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${r.children.map(I=>`
                <div style="padding:10px; background:var(--surface); border:1px solid var(--border); border-radius:6px; font-size:13px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <a href="/entities/${I.entity_id}" class="text-link font-medium">#PR-${String(I.entity_id).padStart(5,"0")} ${Z(I.name)}</a>
                    <span class="badge badge-secondary ml-2">${Z(I.type_name)}</span>
                  </div>
                  <span class="badge badge-${I.status}">${mt(I.status)}</span>
                </div>
              `).join("")}
            </div>
          `:""}
        </div>
      </div>
    `),i.innerHTML=`
    <!-- Top Case Summary Card -->
    <div class="card mb-6">
      <div class="card-body" style="padding: 1.5rem;">
        <div class="flex justify-between items-start flex-wrap gap-4 mb-2">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="badge badge-primary font-semibold">${Z(h.title)}</span>
              <span class="badge badge-${n.status}">${mt(n.status)}</span>
            </div>
            <h2 style="font-size:1.5rem; font-weight:800; color:var(--text-primary); margin:4px 0;">${Z(n.name)}</h2>
            <div style="font-size:13px; color:var(--text-muted);">
              Submitted by <strong>${Z(((K=n.owner)==null?void 0:K.name)||(n.source_entity_id?"System":"a citizen"))}</strong> • Jurisdiction Area: <strong>${Z(n.area||"—")}</strong> • Location: <strong>${Z(n.location||"—")}</strong>
            </div>
          </div>
        </div>
        ${b}
      </div>
    </div>

    ${T}
    ${x}
    ${zu(n)}
    ${V}
    ${A}

    <!-- Main Detail & Actions Layout -->
    <div class="entity-detail-layout" style="display:grid; grid-template-columns: 2fr 1fr; gap: 20px;">
      <div>
        <div class="card">
          <div class="card-header border-b">
            <div class="tabs">
              <button class="tab-btn active" id="tab-info">Case Details & Parameters</button>
              <button class="tab-btn" id="tab-audit">Activity & Accountability Log</button>
            </div>
          </div>
          <div class="card-body" id="tab-content">
            ${_}
          </div>
        </div>
      </div>

      <div>
        <!-- Dynamic Workflow Actions Box -->
        <div class="card" style="border-top: 4px solid var(--primary);">
          <div class="card-header">
            <div class="card-title" style="display:flex; align-items:center; gap:8px;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Available Actions
          </div>
            <div class="card-subtitle">Role-permitted workflow actions</div>
          </div>
          <div class="card-body" style="padding:16px;">
            <div class="workflow-actions flex-col gap-2">
              ${w}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;const q=document.getElementById("tab-info"),J=document.getElementById("tab-audit"),Y=document.getElementById("tab-content");q&&J&&Y&&(q.addEventListener("click",()=>{q.classList.add("active"),J.classList.remove("active"),Y.innerHTML=_}),J.addEventListener("click",()=>{J.classList.add("active"),q.classList.remove("active"),Y.innerHTML=B}));const oe=document.getElementById("btn-generate-ai");oe&&oe.addEventListener("click",()=>Ru(n,s)),document.querySelectorAll(".execute-rep-btn").forEach(I=>{I.addEventListener("click",()=>{const G=I.getAttribute("data-repid");Au(G)})}),Tu(n.entity_id),document.getElementById("case-panel-body")&&Dr(n),Lu(),typeof window.civicTranslatePage=="function"&&window.civicTranslatePage()}function Cu(i,n,s){const o=[],r=String(i.status||"draft").trim().toLowerCase(),c=new Set;if(Array.isArray(n)&&n.length>0&&n.forEach(d=>{const u=d.action||d.to||d.to_status;if(!u||c.has(u))return;c.add(u);const h=u==="rejected",m=ys(r,u),g=h?"btn-danger":"btn-primary";o.push(`
        <button class="btn ${g} btn-full wf-action-btn mt-2" 
          data-to="${Z(u)}" 
          data-label="${Z(m)}"
          data-reason="${h?"true":"false"}">
          ${Z(m)}
        </button>
      `)}),s&&s.role==="admin"&&o.push(`
      <button class="btn btn-secondary btn-full mt-3" id="btn-fire-rules" data-rule="true" style="display:inline-flex; align-items:center; gap:8px; justify-content:center;">
        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        Execute Automation Rules
      </button>
    `),o.length===0){if(s&&s.role==="coordinator_area"){const d=s.assignedArea||s.assigned_area,u=i.area;if(d&&u&&d.toLowerCase()!==u.toLowerCase())return`
          <div style="padding:14px; background:#fff7ed; border:1px solid #fed7aa; border-radius:8px; font-size:13px; color:#9a3412; line-height:1.4;">
            <div style="font-weight:700; color:#c2410c; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              Jurisdiction Boundary Constraint
            </div>
            Your coordinator account is assigned to <strong>"${Z(d)}"</strong>, but this case belongs to <strong>"${Z(u)}"</strong>.
            <div style="margin-top:8px; font-size:12px; color:#7c2d12;">
              Area Coordinators are strictly authorized to verify cases within their own jurisdiction. Only a Coordinator assigned to <strong>${Z(u)}</strong> (or a General Coordinator) can verify this case.
            </div>
          </div>
        `}return`<div class="text-muted text-sm text-center py-2">No workflow actions currently permitted for your role (${Z((s==null?void 0:s.role)||"user")}) at status "${Z(mt(r))}".</div>`}return o.join("")}function ys(i,n){const s=String(n||"").toLowerCase(),o=String(i||"").toLowerCase();return o==="draft"&&s==="submitted"?"Submit Request":o==="submitted"&&(s==="coordinator_approved"||s==="verified")?"Verify & Recommend Approval":o==="coordinator_approved"&&s==="approved"||o==="verified"&&s==="approved"?"Executive Approval (Director)":s==="rejected"?"Reject Request":`Transition to ${n}`}function Su(i){return i==="draft"?"Draft":i==="submitted"?"Submitted":i==="coordinator_approved"?"Coord Approved":i==="verified"?"Verified":i==="approved"?"Approved":i==="rejected"?"Rejected":i}function Tu(i){const n=o=>{const r=o.getAttribute("data-to"),c=o.getAttribute("data-label")||`Transition to ${r}`,d=o.getAttribute("data-reason")==="true";if(o.getAttribute("data-rule")==="true"){Mu(i);return}d?(Fn({title:"Provide Reason for Rejection",content:`
          <div class="form-group mb-4">
            <label class="form-label" for="action-reason">Reason for Rejection <span class="required">*</span></label>
            <textarea id="action-reason" class="form-control" rows="3" placeholder="Please state rationale for rejecting this case..." required></textarea>
          </div>
        `,footer:`
          <button class="btn btn-ghost" id="cancel-modal-btn">Cancel</button>
          <button class="btn btn-danger" id="confirm-action-btn">Confirm Rejection</button>
        `,onClose:()=>{}}),document.getElementById("cancel-modal-btn").addEventListener("click",Ut),document.getElementById("confirm-action-btn").addEventListener("click",async()=>{const h=document.getElementById("action-reason").value.trim();if(!h){te("Reason is required for rejection");return}Ut(),qo(i,r,h)})):(Fn({title:`Confirm Action: ${c}`,content:`
          <p style="font-size:0.9rem; color:var(--text-secondary);">
            Are you sure you want to execute <strong>${Z(c)}</strong> for case #${i}?
          </p>
        `,footer:`
          <button class="btn btn-ghost" id="cancel-modal-btn">Cancel</button>
          <button class="btn btn-primary" id="confirm-action-btn">Confirm Transition</button>
        `,onClose:()=>{}}),document.getElementById("cancel-modal-btn").addEventListener("click",Ut),document.getElementById("confirm-action-btn").addEventListener("click",async()=>{Ut(),qo(i,r,null)}))};document.querySelectorAll(".wf-action-btn, #btn-fire-rules").forEach(o=>{o.addEventListener("click",()=>n(o))})}async function qo(i,n,s){try{const o=await fe.transition(i,n,s);ye(o.message||`Status updated to ${n}`),aa({id:i})}catch(o){te(o.message||"Transition failed")}}async function Mu(i){var n,s;try{const o=await fe.fireRules(i,"approved");ye(`Rule Engine executed! ${((s=(n=o.data)==null?void 0:n.createdEntities)==null?void 0:s.length)||0} entity created.`),aa({id:i})}catch(o){te(o.message||"Rule trigger failed")}}async function Au(i){const n=document.getElementById("report-result-output");if(n){n.style.display="block",n.innerHTML='<div class="spinner spinner-sm"></div> Running report...';try{const o=(await li.execute(i)).data;let r=(o.rows||[]).map(c=>{var d;return`
      <tr>
        <td>${Z(c[o.groupBy]||c.area||"Total")}</td>
        <td style="font-weight:bold;">${c[(d=o.metric)==null?void 0:d.toLowerCase()]||c.count||c.total_count||0}</td>
      </tr>
    `}).join("");n.innerHTML=`
      <div style="background:var(--green-50); border:1px solid var(--green-100); border-radius:6px; padding:12px; font-size:13px;">
        <div style="font-weight:bold; color:var(--green-700); margin-bottom:6px; display:flex; align-items:center; gap:6px;">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10"/></svg>
          Execution Result: "${Z(o.reportName)}"
        </div>
        <table class="table-sm" style="width:100%; font-size:12px;">
          <thead><tr><th>${Z(o.groupBy||"Group")}</th><th>${Z(o.metric)}</th></tr></thead>
          <tbody>${r}</tbody>
        </table>
      </div>
    `}catch(s){n.innerHTML=`<div class="alert alert-error">Report execution failed: ${Z(s.message)}</div>`}}}async function Dr(i){const n=document.getElementById("case-panel-body");if(!n)return;let s;try{s=(await fe.casePanel(i.entity_id)).data}catch(o){n.innerHTML=o.status===403?`<div class="text-muted text-sm">${Z(o.message||"This case is outside your scope.")}</div>`:`<div class="alert alert-error">Case panel could not be loaded: ${Z(o.message||"")}</div>`;const r=document.getElementById("case-deeper");r&&o.status===403&&r.remove();return}if(n.innerHTML=Pu(s,i),Bu(s,i),!s.brief&&s.brief_pending)try{const o=(await fe.caseBrief(i.entity_id)).data,r=document.getElementById("case-brief");r&&(r.innerHTML=is(o.brief,o.unavailable_reason,!1))}catch{const r=document.getElementById("case-brief");r&&(r.innerHTML=is(null,"The AI brief could not be generated.",!1))}}function qn(i,n){return`${i} ${n}${i===1?"":"s"}`}function is(i,n,s){return i?`
      <ul class="cp-brief-lines">
        ${i.lines.map(o=>`<li>${Z(o)}</li>`).join("")}
      </ul>
      <div class="cp-foot">Written from this record only · review before acting · ${Z(i.model||"")}</div>`:s?'<div class="cp-brief-wait"><span class="spinner" style="width:14px;height:14px;border-width:2px;"></span> Writing a short summary of this case…</div>':`<div class="cp-muted">No AI summary: ${Z(String(n||"not available").replace(/\.$/,""))}. Everything else in this panel is rule-based and unaffected.</div>`}function Iu(i,n){const s=i.suggestion,o=i.checklist.filter(c=>c.required&&!c.present);if(!s)return{tone:"idle",icon:"•",title:"No action for you right now",detail:i.suggestion_none_reason||"No rule points to a single action."};if(s.outcome==="dismissed")return{tone:"idle",icon:"•",title:"Suggestion dismissed",detail:"All workflow actions are still available in the actions box."};const r=ys(n.status,s.to_status);return s.to_status==="rejected"?{tone:"stop",icon:"!",title:`${qn(o.length||1,"required item")} missing`,detail:s.reason,label:r}:i.flags.length?{tone:"review",icon:"?",title:`Complete, but ${qn(i.flags.length,"flag")} to check`,detail:s.reason,label:r}:{tone:"go",icon:"✓",title:"Complete and ready",detail:s.reason,label:r}}function Pu(i,n){const s=Iu(i,n),o=i.suggestion,r=o&&o.outcome!=="dismissed",c=`
    <div class="cp-verdict cp-${s.tone}">
      <div class="cp-verdict-icon" aria-hidden="true">${s.icon}</div>
      <div class="cp-verdict-text">
        <div class="cp-verdict-title">${Z(s.title)}</div>
        <div class="cp-verdict-detail">${Z(s.detail)}</div>
        ${r?'<div class="cp-foot">Rule-based suggestion · nothing happens until you confirm · your choice is logged</div>':""}
      </div>
      ${r?`
      <div class="cp-verdict-actions">
        <button class="btn ${o.to_status==="rejected"?"btn-danger":"btn-primary"} btn-sm" id="case-suggestion-act">${Z(s.label)}…</button>
        <button class="btn btn-ghost btn-sm" id="case-suggestion-dismiss">Dismiss</button>
      </div>`:""}
    </div>`,d=i.checklist.filter(B=>B.required),u=d.filter(B=>B.present).length,h=i.days_in_status,m=(B,V,N,A)=>`
    <div class="cp-stat ${N?`cp-stat-${N}`:""}" ${A?`title="${Z(A)}"`:""}>
      <div class="cp-stat-value">${B}</div>
      <div class="cp-stat-label">${V}</div>
    </div>`,g=d.length?u<d.length?"stop":"go":"",v=`
    <div class="cp-stats">
      ${m(d.length?`${u}/${d.length}`:"—","Required items",g)}
      ${m(i.flags.length,i.flags.length===1?"Flag":"Flags",i.flags.length?"review":"",`${qn(i.flag_rules_configured,"configured rule")} for this service`)}
      ${m(i.similar_cases.length,"Similar nearby","",`Same service and area, last ${i.similar_window_days} days`)}
      ${m(h==null?"—":`${h}d`,`In "${Z(mt(n.status))}"`,"",i.filed_at?`Filed ${new Date(i.filed_at).toLocaleDateString()}`:"")}
    </div>`,b=`
    <div class="cp-block cp-brief">
      <div class="cp-block-head"><span>Case summary</span><span class="cp-tag cp-tag-ai">AI</span></div>
      <div id="case-brief">${is(i.brief,i.brief_unavailable_reason,i.brief_pending)}</div>
    </div>`,w=B=>B.present?2:B.required?0:1,$=[...i.checklist].sort((B,V)=>w(B)-w(V)),x=B=>{const V=B.present?"ok":B.required?"miss":"opt",N=B.present?"✓":B.required?"✕":"–",A=[B.kind==="document"?B.present&&B.count?qn(B.count,"file"):"document":null,B.required?null:"optional"].filter(Boolean).join(" · ");return`
      <li class="cp-item cp-item-${V}">
        <span class="cp-mark" aria-hidden="true">${N}</span>
        <span class="cp-item-label">${Z(B.label)}</span>
        ${A?`<span class="cp-item-meta">${Z(A)}</span>`:""}
      </li>`},T=`
    <div class="cp-block">
      <div class="cp-block-head"><span>Checklist</span><span class="cp-tag">Rule-based</span></div>
      ${$.length?`<ul class="cp-list">${$.map(x).join("")}</ul>`:'<div class="cp-muted">This form defines no required fields or documents.</div>'}
    </div>`,E=i.flags.map(B=>`
    <li class="cp-flag">
      <div class="cp-flag-label">${Z(B.label)}</div>
      <div class="cp-item-meta">${Z(B.source_label)}: ${Z(B.value)}</div>
    </li>`).join(""),_=`
    <div class="cp-block">
      <div class="cp-block-head"><span>Flags</span><span class="cp-tag">Rule-based</span></div>
      ${i.flags.length?`<ul class="cp-list">${E}</ul>`:`<div class="cp-muted">${i.flag_rules_configured?"Nothing raised.":"No flag rules set up for this service."}</div>`}
    </div>`,P=i.similar_cases.map(B=>`
    <li class="cp-similar">
      <a href="/entities/${B.entity_id}" data-link>#${B.entity_id} ${Z(B.name)}</a>
      <span class="badge badge-${Z(String(B.status||"").toLowerCase())}">${Z(mt(B.status))}</span>
    </li>`).join(""),R=`
    <div class="cp-block">
      <div class="cp-block-head"><span>Similar nearby</span><span class="cp-item-meta">last ${i.similar_window_days} days</span></div>
      ${i.similar_cases.length?`<ul class="cp-list">${P}</ul>`:'<div class="cp-muted">None in this area.</div>'}
    </div>`;return`${c}${v}${b}<div class="cp-grid">${T}<div class="cp-col">${_}${R}</div></div>`}function Bu(i,n){var c,d;const s=i.suggestion;if(!s)return;const o=n.entity_id,r=(u,h)=>fe.caseSuggestionOutcome(o,{suggestion_id:s.suggestion_id,outcome:u,final_reason:h}).catch(()=>{});(c=document.getElementById("case-suggestion-dismiss"))==null||c.addEventListener("click",async()=>{await r("dismissed"),Dr(n)}),(d=document.getElementById("case-suggestion-act"))==null||d.addEventListener("click",()=>{const u=s.to_status==="rejected",h=ys(n.status,s.to_status);Fn({title:`Confirm: ${h}`,content:u?`
        <div class="form-group mb-4">
          <label class="form-label" for="case-suggestion-reason">Reason for rejection <span class="required">*</span></label>
          <textarea id="case-suggestion-reason" class="form-control" rows="3" required>${Z(s.reason)}</textarea>
          <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">Suggested by rule. Edit it before confirming if it is not right; the citizen sees this reason.</div>
        </div>`:`
        <p style="font-size:0.9rem; color:var(--text-secondary);">
          Execute <strong>${Z(h)}</strong> for case #${o}?
        </p>`,footer:`
        <button class="btn btn-ghost" id="cancel-modal-btn">Cancel</button>
        <button class="btn ${u?"btn-danger":"btn-primary"}" id="confirm-action-btn">Confirm</button>`,onClose:()=>{}}),document.getElementById("cancel-modal-btn").addEventListener("click",Ut),document.getElementById("confirm-action-btn").addEventListener("click",async()=>{const m=u?document.getElementById("case-suggestion-reason").value.trim():null;if(u&&!m){te("Reason is required for rejection");return}Ut();try{const g=await fe.transition(o,s.to_status,m),v=u&&m!==s.reason;await r(v?"edited":"accepted",v?m:void 0),ye(g.message||`Status updated to ${s.to_status}`),aa({id:o})}catch(g){te(g.message||"Transition failed")}})})}async function Ru(i,n=[]){const s=i.entity_id,o=document.getElementById("ai-report-body");if(o){o.innerHTML=`
    <div style="text-align:center; padding: 2rem 1rem;">
      <div class="spinner spinner-lg mb-3" style="border-top-color:var(--primary); margin:0 auto 12px auto;"></div>
      <div style="font-weight:600; color:var(--text-primary); font-size:15px;">Running deeper analysis...</div>
      <div style="color:var(--text-muted); font-size:13px; margin-top:4px;">Evaluating observations, patterns, recommendations, and evidence.</div>
    </div>
  `;try{const r=await fe.aiAnalysis(s);Uo("ai"),o.innerHTML=ju(r.data)}catch(r){const c=String(r.message||"").includes("GEMINI_API_KEY")||String(r.message||"").includes("Gemini API key");c||r.status===503?(te(`${c?"AI is not configured.":"The AI service could not be reached."} Showing a deterministic summary of the case fields instead.`),Uo("deterministic"),o.innerHTML=Ou(i,n,c?"no-key":"unreachable")):(te(r.message||"Could not generate AI report"),o.innerHTML=`<div class="alert alert-error">AI Analysis failed: ${Z(r.message)}</div>`)}}}function Uo(i){const n=document.getElementById("ai-report-source"),s=document.getElementById("ai-report-badge");!n||!s||(i==="deterministic"?(n.textContent="Deterministic summary — not AI output",s.textContent="Not AI",s.style.display="",s.className="badge badge-pending"):(n.textContent="AI-generated general commentary — review before acting",s.textContent="AI output",s.style.display="",s.className="badge badge-primary"))}function Ou(i,n=[],s="no-key"){var d,u;const o=[["Record",`#${i.entity_id} ${i.name||""}`],["Type",(d=i.entityType)==null?void 0:d.name],["Status",i.status],["Area",i.area],["Location",i.location],["Submitted by",(u=i.owner)==null?void 0:u.name]].filter(([,h])=>h!=null&&String(h).trim()!==""),r=(Array.isArray(n)?n:[]).filter(h=>h&&h.value!==null&&h.value!==void 0&&String(h.value).trim()!=="").map(h=>{var m,g;return[((m=h.parameterMaster)==null?void 0:m.label)||((g=h.parameterMaster)==null?void 0:g.field_key)||`Field ${h.parameter_id}`,h.value]}),c=h=>h.map(([m,g])=>`
        <tr>
          <th scope="row" style="text-align:left; width:34%; font-weight:600; color:var(--text-secondary); padding:6px 10px; vertical-align:top;">${Z(String(m))}</th>
          <td style="padding:6px 10px;">${Z(String(g))}</td>
        </tr>`).join("");return`
    <div style="font-size:13px; color:var(--text-primary); line-height:1.5;">
      <div style="margin-bottom:12px; padding:10px 12px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; font-size:12px; color:#1e40af;">
        <strong>Deterministic summary, not AI output.</strong>
        ${s==="unreachable"?"The AI service could not be reached, so this lists the record's own fields exactly as submitted.":"No AI key is configured, so this lists the record's own fields exactly as submitted."}
        It contains no analysis, risks or recommendations.
        ${s==="unreachable"?"Try again when the network is back for an AI-generated report.":"Set GEMINI_API_KEY in backend/.env for an AI-generated report."}
      </div>
      <div class="table-container">
        <table>
          <tbody>${c(o)}</tbody>
        </table>
      </div>
      <h4 style="margin:16px 0 8px; font-size:13px;">Submitted fields (${r.length})</h4>
      ${r.length?`<div class="table-container"><table><tbody>${c(r)}</tbody></table></div>`:'<div class="text-muted">No field values were submitted with this record.</div>'}
    </div>
  `}function ju(i){const n=Array.isArray(i.recommendation)?i.recommendation:Array.isArray(i.actionable_recommendations)?i.actionable_recommendations:[i.recommendation||i.actionable_recommendations||"Proceed with field verification."],s=Array.isArray(i.root_cause_analysis)?i.root_cause_analysis:[i.root_cause_analysis||"No root cause factors recorded."],o=Array.isArray(i.stakeholder_analysis)?i.stakeholder_analysis:[],r=Array.isArray(i.risk_register)?i.risk_register:[];return`
    <div style="font-size:13px; color:var(--text-primary); line-height:1.5;">
      ${i.notice?`
        <div style="margin-bottom:12px; padding:10px 12px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; font-size:12px; color:#1e40af; display:flex; align-items:center; gap:8px;">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>Notice:</strong> ${Z(i.notice)}</div>
        </div>
      `:""}

      <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
        <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">1. Observations & Problem Scope</strong>
        <p style="margin:0; color:var(--text-secondary);">${Z(i.problem_summary)}</p>
      </div>
      
      <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
        <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">2. Patterns & Root Cause Analysis</strong>
        <ul style="margin:0; padding-left:18px; color:var(--text-secondary);">
          ${s.map(c=>`<li style="margin-bottom:4px;">${Z(c)}</li>`).join("")}
        </ul>
      </div>

      ${o.length>0?`
        <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
          <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">3. Stakeholder Impact Analysis</strong>
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${o.map(c=>`
              <div style="font-size:12px; background:var(--surface); padding:6px 10px; border-radius:4px; border:1px solid var(--border);">
                <strong style="color:var(--text-primary);">${Z(c.group||"Stakeholder")}:</strong>
                <span style="color:var(--text-secondary); margin-left:4px;">${Z(c.interest||"")}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `:""}

      ${r.length>0?`
        <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
          <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">4. Risk Register & Feasibility</strong>
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${r.map(c=>{const d=String(c.severity||"Medium").toLowerCase(),u=d==="high"?"background:#fee2e2; color:#b91c1c; border:1px solid #fca5a5;":d==="low"?"background:#dcfce7; color:#15803d; border:1px solid #86efac;":"background:#fef3c7; color:#b45309; border:1px solid #fcd34d;";return`
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; background:var(--surface); padding:6px 10px; border-radius:4px; border:1px solid var(--border);">
                  <span style="color:var(--text-primary);">${Z(c.risk||"")}</span>
                  <span style="padding:2px 8px; border-radius:12px; font-weight:700; font-size:11px; ${u}">${Z(c.severity||"Medium")}</span>
                </div>
              `}).join("")}
          </div>
        </div>
      `:""}

      <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
        <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">5. Recommendations for Coordinator / Executive Action</strong>
        <ul style="margin:0; padding-left:18px; color:var(--text-secondary);">
          ${n.map(c=>`<li style="margin-bottom:4px;">${Z(c)}</li>`).join("")}
        </ul>
      </div>

      <div style="padding:10px 12px; background:var(--yellow-50); border:1px solid var(--yellow-100); border-radius:6px; font-size:12px; color:var(--yellow-700); display:flex; align-items:center; gap:8px;">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        <span><strong>Civic Intelligence Protocol:</strong> This automated advisory report is generated to assist municipal coordinators and directors. Ground evidence and field verification must precede final sanction.</span>
      </div>
    </div>
  `}const _i=[{type:"country",label:"Country"},{type:"state",label:"State / Province"},{type:"city",label:"City / District"},{type:"ward",label:"Ward / Local Area"}];function Ji(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function Nu(i,n){if(!n)return Ji(i);const s=new RegExp(`(${n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");return Ji(i).replace(s,'<strong style="color:var(--primary,var(--primary));">$1</strong>')}class Hu{constructor(n,s={}){this._container=n,this._required=s.required||!1,this._onChange=s.onChange||null,this._prefix=s.labelPrefix||"jsel",this._levelStates=[],this._hiddenInput=null,this._destroyed=!1,this._onDocumentClick=this._handleDocumentClick.bind(this),document.addEventListener("click",this._onDocumentClick)}async init(){this._render(),await this._loadLevel(0,null)}getValue(){const n=this._levelStates.map(o=>o.selectedItem).filter(Boolean);return n.length===0?null:{jurisdiction_id:n[n.length-1].jurisdiction_id,display_path:n.map(o=>o.name).join(" › ")}}getMissingLevel(){const n=this._levelStates.reduce((o,r,c)=>r.selectedItem?c:o,-1),s=this._levelStates[n+1];return s&&Array.isArray(s.items)&&s.items.length>0?s.meta.label:null}async setValue(n){if(n)try{const s=await Bn.get(n),{path:o}=s.data;if(!Array.isArray(o)||o.length===0)return;for(let c=0;c<o.length;c++){const d=c===0?null:o[c-1].jurisdiction_id;await this._loadLevel(c,d);const u=o[c],h=this._levelStates[c].items.find(m=>m.jurisdiction_id===u.jurisdiction_id)||u;this._setSelection(c,h,!1)}this._syncHidden(),this._notifyChange();const r=o.length;if(r<_i.length){const c=o[o.length-1].jurisdiction_id;await this._loadLevel(r,c)}}catch(s){console.warn("[JurisdictionSelector] setValue failed:",s)}}destroy(){this._destroyed=!0,document.removeEventListener("click",this._onDocumentClick),this._container.innerHTML="",this._levelStates=[],this._hiddenInput=null}_render(){this._container.innerHTML="",this._container.classList.add("jurisdiction-selector");const n=document.createElement("div");n.className="jurisdiction-selector-grid",_i.forEach((o,r)=>{const c=document.createElement("div");c.className="form-group jsel-group",c.id=`${this._prefix}-group-${r}`;const d=this._required&&r===0?'<span class="required">*</span>':"",u=document.createElement("label");u.className="form-label",u.innerHTML=`${Ji(o.label)} ${d}`;const h=document.createElement("div");h.className="jsel-combobox",h.id=`${this._prefix}-combobox-${r}`;const m=document.createElement("div");m.className="jsel-trigger is-disabled",m.setAttribute("tabindex",r===0?"0":"-1"),m.setAttribute("role","combobox"),m.setAttribute("aria-expanded","false"),m.setAttribute("aria-label",o.label);const g=document.createElement("span");g.className="jsel-trigger-text is-placeholder",g.textContent=r===0?`-- Search or Select ${o.label} --`:`-- Select ${_i[r-1].label} first --`;const v=document.createElement("div");v.className="jsel-trigger-actions";const b=document.createElement("button");b.type="button",b.className="jsel-clear-btn",b.title="Clear selection",b.style.display="none",b.innerHTML="&#x2715;";const w=document.createElement("span");w.className="jsel-chevron",w.innerHTML='<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>',v.appendChild(b),v.appendChild(w),m.appendChild(g),m.appendChild(v);const $=document.createElement("div");$.className="jsel-dropdown";const x=document.createElement("div");x.className="jsel-search-wrapper",x.innerHTML=`
        <svg class="jsel-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      `;const T=document.createElement("input");T.type="text",T.className="jsel-search-input",T.placeholder=`Search ${o.label}...`,T.setAttribute("autocomplete","off"),x.appendChild(T);const E=document.createElement("ul");E.className="jsel-options-list",E.setAttribute("role","listbox"),$.appendChild(x),$.appendChild(E),h.appendChild(m),h.appendChild($),c.appendChild(u),c.appendChild(h),n.appendChild(c),this._levelStates[r]={meta:o,groupEl:c,comboboxEl:h,triggerEl:m,triggerTextEl:g,clearBtnEl:b,dropdownEl:$,searchInputEl:T,optionsListEl:E,items:[],filteredItems:[],selectedItem:null,focusedIdx:-1,isOpen:!1,disabled:r!==0},m.addEventListener("click",_=>{_.target.closest(".jsel-clear-btn")||this._toggleDropdown(r)}),m.addEventListener("keydown",_=>{this._levelStates[r].disabled||(_.key==="Enter"||_.key===" "||_.key==="ArrowDown")&&(_.preventDefault(),this._openDropdown(r))}),b.addEventListener("click",_=>{_.stopPropagation(),this._clearSelection(r)}),T.addEventListener("input",_=>{this._filterOptions(r,_.target.value)}),T.addEventListener("keydown",_=>{this._handleSearchKeydown(r,_)})}),this._container.appendChild(n);const s=document.createElement("input");s.type="hidden",s.name="_jurisdiction_id",s.id=`${this._prefix}-hidden`,s.value="",this._container.appendChild(s),this._hiddenInput=s}async _loadLevel(n,s){if(this._destroyed)return;const o=this._levelStates[n];if(o){o.disabled=!0,o.triggerEl.classList.add("is-disabled"),o.triggerEl.setAttribute("tabindex","-1"),o.triggerTextEl.className="jsel-trigger-text is-placeholder",o.triggerTextEl.textContent=`Loading ${o.meta.label}…`,o.optionsListEl.innerHTML=`<li class="jsel-loading"><div class="spinner" style="width:14px;height:14px;border-width:2px;"></div> Loading ${o.meta.label}...</li>`;try{const r=s==null?{}:{parent_id:String(s)},d=(await Bn.list(r)).data||[];if(this._destroyed)return;if(o.items=d,o.filteredItems=d,d.length===0){o.disabled=!0,o.triggerEl.classList.add("is-disabled"),o.triggerEl.setAttribute("tabindex","-1"),o.triggerTextEl.textContent=`-- No ${o.meta.label} available --`,this._clearLevelsFrom(n+1);return}o.disabled=!1,o.triggerEl.classList.remove("is-disabled"),o.triggerEl.setAttribute("tabindex","0"),o.triggerTextEl.textContent=`-- Search or Select ${o.meta.label} --`,this._renderOptionsList(n,"")}catch(r){console.warn("[JurisdictionSelector] Failed to load level",n,r),o.disabled=!0,o.triggerEl.classList.add("is-disabled"),o.triggerTextEl.textContent=`-- Error loading ${o.meta.label} --`}}}_renderOptionsList(n,s){const o=this._levelStates[n],r=o.optionsListEl;r.innerHTML="",o.focusedIdx=-1;const c=(s||"").trim().toLowerCase();let d=o.items;if(c&&(d=o.items.filter(h=>h.name&&h.name.toLowerCase().includes(c)||h.code&&h.code.toLowerCase().includes(c))),o.filteredItems=d,d.length===0){r.innerHTML=`<li class="jsel-empty">No ${Ji(o.meta.label)} found matching "${Ji(s)}"</li>`;return}if(n===0&&!c){const h=o.items.find(m=>m.name==="India");if(h){const m=document.createElement("li");m.className="jsel-divider",m.textContent="★ Pinned / Quick Select",r.appendChild(m);const g=this._createOptionElement(n,h,c,0);r.appendChild(g);const v=document.createElement("li");v.className="jsel-divider",v.textContent=`All Countries (${o.items.length})`,r.appendChild(v)}}if(d.slice(0,150).forEach((h,m)=>{const g=this._createOptionElement(n,h,c,m);r.appendChild(g)}),d.length>150){const h=document.createElement("li");h.className="jsel-empty",h.style.fontSize="0.78rem",h.style.padding="8px",h.textContent=`Showing top 150 of ${d.length} matches — type to narrow down`,r.appendChild(h)}}_createOptionElement(n,s,o,r){const c=this._levelStates[n],d=c.selectedItem&&c.selectedItem.jurisdiction_id===s.jurisdiction_id,u=document.createElement("li");u.className=`jsel-option ${d?"is-selected":""}`,u.setAttribute("role","option"),u.setAttribute("aria-selected",d?"true":"false"),u.dataset.index=String(r);const h=document.createElement("span");if(h.innerHTML=Nu(s.name,o),u.appendChild(h),s.code){const m=document.createElement("span");m.className="jsel-option-badge",m.textContent=s.code,u.appendChild(m)}return u.addEventListener("click",m=>{m.stopPropagation(),this._selectItem(n,s)}),u}_toggleDropdown(n){const s=this._levelStates[n];s.disabled||(s.isOpen?this._closeDropdown(n):this._openDropdown(n))}_openDropdown(n){this._levelStates.forEach((o,r)=>{r!==n&&o.isOpen&&this._closeDropdown(r)});const s=this._levelStates[n];s.disabled||(s.isOpen=!0,s.comboboxEl.classList.add("is-open"),s.triggerEl.classList.add("is-active"),s.triggerEl.setAttribute("aria-expanded","true"),s.searchInputEl.value="",this._renderOptionsList(n,""),setTimeout(()=>{s.searchInputEl.focus()},50))}_closeDropdown(n){const s=this._levelStates[n];s.isOpen&&(s.isOpen=!1,s.comboboxEl.classList.remove("is-open"),s.triggerEl.classList.remove("is-active"),s.triggerEl.setAttribute("aria-expanded","false"))}_filterOptions(n,s){this._renderOptionsList(n,s)}_handleSearchKeydown(n,s){const o=this._levelStates[n],r=o.optionsListEl.querySelectorAll(".jsel-option");r.length!==0&&(s.key==="ArrowDown"?(s.preventDefault(),o.focusedIdx=Math.min(o.focusedIdx+1,r.length-1),this._updateFocus(r,o.focusedIdx)):s.key==="ArrowUp"?(s.preventDefault(),o.focusedIdx=Math.max(o.focusedIdx-1,0),this._updateFocus(r,o.focusedIdx)):s.key==="Enter"?(s.preventDefault(),o.focusedIdx>=0&&o.focusedIdx<r.length?r[o.focusedIdx].click():r.length>0&&r[0].click()):s.key==="Escape"&&(this._closeDropdown(n),o.triggerEl.focus()))}_updateFocus(n,s){n.forEach((o,r)=>{r===s?(o.classList.add("is-focused"),o.scrollIntoView({block:"nearest"})):o.classList.remove("is-focused")})}_selectItem(n,s){this._setSelection(n,s,!0),this._closeDropdown(n);const o=n+1;o<_i.length&&this._loadLevel(o,s.jurisdiction_id)}_setSelection(n,s,o=!0){const r=this._levelStates[n];r.selectedItem=s,r.triggerTextEl.className="jsel-trigger-text",r.triggerTextEl.textContent=s.name,r.clearBtnEl.style.display="flex",o&&(this._clearLevelsFrom(n+1),this._syncHidden(),this._notifyChange())}_clearSelection(n){const s=this._levelStates[n];s.selectedItem=null,s.triggerTextEl.className="jsel-trigger-text is-placeholder",s.triggerTextEl.textContent=`-- Search or Select ${s.meta.label} --`,s.clearBtnEl.style.display="none",this._clearLevelsFrom(n+1),this._syncHidden(),this._notifyChange()}_clearLevelsFrom(n){for(let s=n;s<_i.length;s++){const o=this._levelStates[s];o&&(o.selectedItem=null,o.disabled=!0,o.items=[],o.filteredItems=[],o.triggerEl.classList.add("is-disabled"),o.triggerEl.setAttribute("tabindex","-1"),o.triggerTextEl.className="jsel-trigger-text is-placeholder",o.triggerTextEl.textContent=`-- Select ${_i[s-1].label} first --`,o.clearBtnEl.style.display="none",o.optionsListEl.innerHTML="",this._closeDropdown(s))}}_handleDocumentClick(n){this._destroyed||this._levelStates.forEach((s,o)=>{s.isOpen&&!s.comboboxEl.contains(n.target)&&this._closeDropdown(o)})}_syncHidden(){if(!this._hiddenInput)return;const n=this.getValue();this._hiddenInput.value=n?String(n.jurisdiction_id):""}_notifyChange(){const n=this.getValue();this._onChange&&this._onChange(n),this._container.dispatchEvent(new CustomEvent("jurisdiction:change",{bubbles:!0,detail:n}))}}delete Ie.Icon.Default.prototype._getIconUrl;Ie.Icon.Default.mergeOptions({iconRetinaUrl:fs,iconUrl:gs,shadowUrl:vs});const Du="https://tile.openstreetmap.org/{z}/{x}/{y}.png",Fu='© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',qu=[28.6139,77.209],Uu=13;function Zu(i,n={}){const s=typeof i=="string"?document.getElementById(i):i;if(!s)return console.error("[LocationPicker] Mount target not found:",i),null;let o={latitude:n.initialLat?Number(n.initialLat):null,longitude:n.initialLng?Number(n.initialLng):null,area:n.initialArea?String(n.initialArea).trim():"",address:""},r=null,c=null,d=0;const u="loc-picker-"+Math.random().toString(36).substring(2,9);s.innerHTML=`
    <div class="location-picker-box card" id="${u}" style="border:1px solid var(--border); background:var(--surface); padding:16px; border-radius:8px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <label style="font-weight:600; font-size:14px; color:var(--text-primary); display:flex; align-items:center; gap:6px;">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--primary);">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Select Location & Coordinates
        </label>
        <button type="button" class="btn btn-secondary btn-sm" id="${u}-btn-geolocate" style="display:inline-flex; align-items:center; gap:6px;">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Use My Current Location
        </button>
      </div>

      <!-- Search Box & Area Input -->
      <div style="display:grid; grid-template-columns: 2fr 1fr; gap:10px; margin-bottom:12px;" class="loc-input-grid">
        <div style="display:flex; gap:6px;">
          <input type="text" id="${u}-search-input" class="form-control" placeholder="Search landmark, address, street..." style="flex:1;">
          <button type="button" class="btn btn-primary" id="${u}-btn-search" style="padding:6px 14px; font-weight:600; flex-shrink:0;">
            Search
          </button>
        </div>
        <div>
          <input type="text" id="${u}-area-input" class="form-control" placeholder="Locality / Ward (optional)" value="${qa(o.area)}">
        </div>
      </div>

      <!-- Feedback Banner -->
      <div id="${u}-feedback" style="display:none; padding:8px 12px; border-radius:6px; font-size:13px; margin-bottom:10px;"></div>

      <!-- Map Display -->
      <div id="${u}-map" style="height:280px; width:100%; border-radius:6px; border:1px solid var(--border); background:#f1f5f9; z-index:1;"></div>

      <!-- Selected Coordinates Display -->
      <div id="${u}-coords-bar" style="margin-top:10px; display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--text-muted); background:var(--gray-50); padding:8px 12px; border-radius:6px;">
        <span id="${u}-coords-text">
          ${o.latitude&&o.longitude?`Selected: <strong>${o.latitude.toFixed(6)}, ${o.longitude.toFixed(6)}</strong>`:"Click on the map or drag the pin to set exact coordinates"}
        </span>
        <span style="font-size:11px; color:var(--text-secondary);">Drag marker to fine-tune</span>
      </div>
    </div>
  `;const h=document.getElementById(`${u}-map`),m=document.getElementById(`${u}-feedback`),g=document.getElementById(`${u}-search-input`),v=document.getElementById(`${u}-btn-search`),b=document.getElementById(`${u}-btn-geolocate`),w=document.getElementById(`${u}-area-input`),$=document.getElementById(`${u}-coords-text`);function x(A,q="error"){m&&(m.style.display="block",q==="error"?(m.style.background="#fef2f2",m.style.border="1px solid #fecaca",m.style.color="#dc2626"):q==="info"?(m.style.background="#eff6ff",m.style.border="1px solid #bfdbfe",m.style.color="#1d4ed8"):(m.style.background="#f0fdf4",m.style.border="1px solid #bbf7d0",m.style.color="#16a34a"),m.textContent=A)}function T(){m&&(m.style.display="none",m.textContent="")}function E(){$&&(o.latitude!=null&&o.longitude!=null?$.innerHTML=`Coordinates: <strong>${o.latitude.toFixed(6)}, ${o.longitude.toFixed(6)}</strong> ${o.address?` • <span title="${qa(o.address)}">${qa(o.address)}</span>`:""}`:$.textContent="Click on the map or drag the pin to set exact coordinates")}function _(A,q,J="",Y=!0){o.latitude=Math.round(A*1e6)/1e6,o.longitude=Math.round(q*1e6)/1e6,J&&(o.address=J),E(),!c&&r?(c=Ie.marker([o.latitude,o.longitude],{draggable:!0}).addTo(r),c.on("dragend",oe=>{const pe=oe.target.getLatLng();_(pe.lat,pe.lng,"",!1)})):c&&c.setLatLng([o.latitude,o.longitude]),Y&&r&&r.setView([o.latitude,o.longitude],Math.max(r.getZoom(),14)),n.onChange&&n.onChange(V())}function P(){if(!h)return;const A=o.latitude&&o.longitude?[o.latitude,o.longitude]:qu,q=o.latitude&&o.longitude?14:Uu;r=Ie.map(h,{center:A,zoom:q,zoomControl:!0,attributionControl:!0}),Ie.tileLayer(Du,{attribution:Fu,maxZoom:19}).addTo(r),o.latitude&&o.longitude&&(c=Ie.marker([o.latitude,o.longitude],{draggable:!0}).addTo(r),c.on("dragend",J=>{const Y=J.target.getLatLng();_(Y.lat,Y.lng,"",!1)})),r.on("click",J=>{_(J.latlng.lat,J.latlng.lng,"",!1)}),setTimeout(()=>{r&&r.invalidateSize()},250)}async function R(){if(T(),!navigator.geolocation){x("Geolocation is not supported by your browser. Please search or pick manually on the map.","error");return}b.disabled=!0;const A=b.innerHTML;b.innerHTML='<span class="spinner" style="width:14px;height:14px;border-width:2px;margin-right:6px;"></span> Locating...',navigator.geolocation.getCurrentPosition(q=>{b.disabled=!1,b.innerHTML=A;const J=q.coords.latitude,Y=q.coords.longitude;_(J,Y,"Current Location",!0),x("Location retrieved successfully from GPS.","success"),setTimeout(T,3500)},q=>{b.disabled=!1,b.innerHTML=A;let J="Could not retrieve your location. Please use the search bar or click on the map.";q.code===1?J="Location permission was denied. Please use the search box or click on the map.":q.code===2?J="Location unavailable. Please search for your location.":q.code===3&&(J="Location request timed out. Please try searching for your area."),x(J,"error")},{timeout:1e4,enableHighAccuracy:!0,maximumAge:0})}async function B(){T();const A=String(g.value||"").trim();if(!A){x("Please enter an address, city, or landmark to search.","error");return}const q=Date.now();if(q-d<1e3){x("Please wait a second before searching again.","info");return}d=q,v.disabled=!0;const J=v.textContent;v.textContent="Searching...";try{const Y=`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(A)}&limit=1`,oe=await fetch(Y,{headers:{Accept:"application/json"}});if(!oe.ok)throw new Error(`Geocoding failed with status ${oe.status}`);const pe=await oe.json();if(!Array.isArray(pe)||pe.length===0){x(`No location found for "${A}". Try a broader address or landmark.`,"error");return}const O=pe[0],K=parseFloat(O.lat),I=parseFloat(O.lon),G=O.display_name||A;_(K,I,G,!0),x(`Found: ${G}`,"success"),setTimeout(T,4e3)}catch(Y){console.warn("[LocationPicker] Nominatim search error:",Y),x("Failed to lookup address. Please click directly on the map to set coordinates.","error")}finally{v.disabled=!1,v.textContent=J}}b&&b.addEventListener("click",R),v&&v.addEventListener("click",B),g&&g.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),B())}),w&&w.addEventListener("input",A=>{o.area=A.target.value.trim(),n.onChange&&n.onChange(V())}),P();function V(){return{latitude:o.latitude,longitude:o.longitude,area:o.area?o.area:null,address:o.address||null}}function N(){r&&(r.remove(),r=null),s.innerHTML=""}return{getValue:V,setCoordinates:_,destroy:N}}function qa(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const Vu="/api";function Ve(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}let Ei=null,pt=null,Nt=[],$i=null,Gt=null,Xi=new Map;const Wu=new Set(["title","name","movement_title","area","jurisdiction","jurisdiction_id","location","landmark","reported_date","reported_on","contact_person","contact_phone","contact_email","priority_level","volunteer_coordinator"]);function Fr(i){const n=String(i.field_key||"").trim().toLowerCase();return Wu.has(n)}async function qr(i={},n=null){if(!kt(ne))return;try{Nt=(await fe.listTypes().catch(()=>({data:[]}))).data||[]}catch{Nt=[]}const s=n||new URLSearchParams(window.location.search);s.has("entity_type_id")?pt=Number(s.get("entity_type_id")):Nt.length>0&&(pt=Nt[0].entity_type_id);const o=Nt.find(d=>Number(d.entity_type_id)===Number(pt));$i=et(o);const r=document.getElementById("app");r.innerHTML=Ee(`
    <div class="page-header mb-6">
      <div class="page-header-left">
        <h1 id="page-capability-title">${Ve($i.title)}</h1>
        <p id="page-capability-sub">Tell us what is happening and where.</p>
      </div>
    </div>
    
    <div class="card mb-6">
      <div class="card-body" style="padding:16px;">
        <div class="form-group" style="max-width: 450px; margin-bottom: 0;">
          <label class="form-label" for="entity-type-select">Target Civic Capability <span class="required">*</span></label>
          <select id="entity-type-select" class="form-control">
            <option value="">-- Select Capability --</option>
            ${Nt.map(d=>{const u=et(d);return`<option value="${d.entity_type_id}" ${Number(pt)===Number(d.entity_type_id)?"selected":""}>${Ve(u.title)}</option>`}).join("")}
          </select>
        </div>
      </div>
    </div>
    
    <div id="dynamic-form-container"></div>
  `,$i.title,Nt),Ce(),document.getElementById("entity-type-select").addEventListener("change",async d=>{const u=d.target.value;if(!u){document.getElementById("dynamic-form-container").innerHTML="",Ei=null;return}pt=Number(u);const h=Nt.find(m=>Number(m.entity_type_id)===Number(pt));$i=et(h),document.getElementById("page-capability-title").textContent=$i.title,window.history.replaceState({},"",`/entities/new?entity_type_id=${pt}`),await Zo(pt)}),pt&&await Zo(pt)}async function Zo(i){Gt&&(Gt.destroy(),Gt=null);const n=document.getElementById("dynamic-form-container");n.innerHTML='<div class="loading-overlay"><div class="spinner spinner-lg"></div></div>';try{Ei=(await Si.schema(i)).data,Yu(n,Ei),await Gu()}catch(s){console.error("Form schema load error:",s),te("Failed to load form schema"),n.innerHTML='<div class="alert alert-error">Unable to load form for selected capability. No form configuration exists.</div>'}}async function Gu(){const i=document.getElementById("jurisdiction-selector-mount");i&&(Gt=new Hu(i,{required:!0,labelPrefix:"ent-jsel"}),await Gt.init())}function Ku(i){var $;const n=i.mandatory||i.is_mandatory,s=n?"required":"",o=n?'<span class="required">*</span>':"",r=`param_${i.parameter_id}`,c=(i.field_type||i.data_type||"text").toLowerCase(),d=Ve(i.label||i.field_key),u=($=i.options)==null?void 0:$.depends_on;let h="",m="",g="";u&&u.field_key&&(h=`data-depends-key="${Ve(u.field_key)}" data-depends-val="${Ve(u.value)}"`,m="conditional-field",g="display:none;");const b=["textarea","file","location"].includes(c)?"flex:1 1 100%; min-width:100%;":"flex:1 1 calc(50% - 8px); min-width:200px;";let w="";switch(c){case"location":w=`
        <div id="location-picker-mount-${i.parameter_id}" class="location-picker-field-mount" data-parameter-id="${i.parameter_id}"></div>
      `;break;case"textarea":w=`<textarea name="${r}" class="form-control" rows="3" ${s} placeholder="Enter ${d.toLowerCase()}..."></textarea>`;break;case"number":w=`<input type="number" name="${r}" class="form-control" ${s} placeholder="0">`;break;case"date":w=`<input type="date" name="${r}" class="form-control" ${s}>`;break;case"email":w=`<input type="email" name="${r}" class="form-control" ${s} placeholder="email@example.com">`;break;case"phone":w=`<input type="tel" name="${r}" class="form-control" ${s} placeholder="+91 XXXXX XXXXX">`;break;case"checkbox":w=`
        <div class="check-group mt-2">
          <input type="checkbox" name="${r}" id="${r}" value="true">
          <label for="${r}">Yes</label>
        </div>
      `;break;case"select":{const x=i.meta_options||(i.options?Array.isArray(i.options)?i.options:i.options.choices:null)||["Option 1","Option 2"],T=i.options&&i.options.default?i.options.default:"";w=`<select name="${r}" class="form-control" ${s}>
        <option value="">-- Select --</option>
        ${x.map(E=>`<option value="${Ve(E)}" ${E===T?"selected":""}>${Ve(E)}</option>`).join("")}
      </select>`;break}case"file":w=`
        <div class="file-upload-wrapper" id="file-wrap-${i.parameter_id}">
          <input type="file" name="${r}" id="file-${i.parameter_id}" 
            class="form-control file-input" 
            data-parameter-id="${i.parameter_id}"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp,.csv,.txt,.zip"
            ${s}>
          <div class="file-upload-info mt-1" style="font-size:0.75rem; color:var(--text-muted);">
            Max 10MB • PDF, Word, Excel, Images, CSV, ZIP
          </div>
          <div id="file-status-${i.parameter_id}" class="file-upload-status mt-1" style="display:none;"></div>
        </div>
      `;break;default:w=`<input type="text" name="${r}" class="form-control" ${s} placeholder="Enter ${d.toLowerCase()}...">`;break}return`<div class="form-group ${m}" ${h} style="${g} ${b}">
    <label class="form-label">${d} ${o}</label>
    ${w}
  </div>`}function Yu(i,n){if(!n||!n.sections||n.sections.length===0){i.innerHTML='<div class="alert alert-warning">This capability has no form fields configured yet.</div>';return}let s=`
    <div class="card">
      <div class="card-header border-b">
        <div class="card-title">${Ve($i.title)}</div>
        <div class="card-subtitle">Complete all required parameter fields for your submission.</div>
      </div>
      
      <div id="form-validation-alert" class="alert alert-danger hidden m-4"></div>
      ${Array.isArray(n.configuration_errors)&&n.configuration_errors.length>0?`<div class="alert alert-warning m-4">${Ve(n.configuration_errors.join(" "))}</div>`:""}

      <form id="dynamic-form" style="padding:24px;">
  `,o=!1,r=!1;n.sections.forEach((u,h)=>{const m=(u.section_name||u.title||"").trim(),g=h===0,v=m.toLowerCase().includes("where")||m.toLowerCase().includes("location");s+=`
      <div class="form-section mb-6" data-section-name="${Ve(m)}">
        <div class="form-section-title">${Ve(m)}</div>
        ${u.description?`<div class="form-section-subtitle">${Ve(u.description)}</div>`:""}
    `,g&&!o&&(s+=`
        <div class="form-row mt-4" style="display:flex; flex-wrap:wrap; gap:16px;">
          <div class="form-group" style="flex:1 1 100%; min-width:100%;">
            <label class="form-label" for="base_name">Title / Summary <span class="required">*</span></label>
            <input type="text" id="base_name" name="_base_name" class="form-control" required placeholder="Brief title summarizing the initiative">
          </div>
        </div>
      `,o=!0),v&&!r&&(s+=`
        <div class="form-row mt-4" style="display:flex; flex-direction:column; gap:16px;">
          <div class="form-group" style="width:100%;">
            <label class="form-label">Jurisdiction <span class="required">*</span></label>
            <div id="jurisdiction-selector-mount"></div>
          </div>
          <div class="form-group" style="width:100%;">
            <label class="form-label" for="base_location">Specific Location / Address</label>
            <input type="text" id="base_location" name="_base_location" class="form-control" placeholder="Specific street address or building/area (optional)">
          </div>
        </div>
      `,r=!0),(u.subsections||[]).forEach(b=>{b.subsection_name&&b.subsection_name!=="Main"&&(s+=`<div class="form-subsection mt-3"><div class="form-subsection-title">${Ve(b.subsection_name)}</div>`);const $=[...b.parameters||[]].sort((x,T)=>(x.display_order||0)-(T.display_order||0)).filter(x=>!Fr(x)&&String(x.field_key||"").trim()&&String(x.label||"").trim());$.length>0&&(s+='<div class="form-row mt-3" style="display:flex; flex-wrap:wrap; gap:16px;">',$.forEach(x=>{s+=Ku(x)}),s+="</div>"),b.subsection_name&&b.subsection_name!=="Main"&&(s+="</div>")}),s+="</div>"}),r||(s+=`
      <div class="form-section mb-6" data-section-name="Where is it?">
        <div class="form-section-title">Where is it?</div>
        <div class="form-row mt-4" style="display:flex; flex-direction:column; gap:16px;">
          <div class="form-group" style="width:100%;">
            <label class="form-label">Jurisdiction <span class="required">*</span></label>
            <div id="jurisdiction-selector-mount"></div>
          </div>
          <div class="form-group" style="width:100%;">
            <label class="form-label" for="base_location">Specific Location / Address</label>
            <input type="text" id="base_location" name="_base_location" class="form-control" placeholder="Specific street address or building/area (optional)">
          </div>
        </div>
      </div>
    `),s+=`
        <div class="form-section mt-6" style="border-bottom:none; margin-bottom:0; padding-bottom:0;">
          <div class="flex items-center justify-between">
            <div class="text-sm text-muted">Submissions enter the workflow for review by jurisdiction coordinators.</div>
            <button type="submit" id="submit-form-btn" class="btn btn-primary btn-lg" style="box-shadow:var(--shadow-md); display:inline-flex; align-items:center; gap:8px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </div>
  `,i.innerHTML=s,Xi.forEach(u=>u.destroy&&u.destroy()),Xi.clear(),i.querySelectorAll(".location-picker-field-mount").forEach(u=>{const h=u.getAttribute("data-parameter-id"),m=Zu(u);m&&Xi.set(String(h),m)});const d=document.getElementById("dynamic-form");d.addEventListener("submit",Xu),Ju(d,n)}function Ju(i,n){const s=[];(n.sections||[]).forEach(c=>{(c.subsections||[]).forEach(d=>{(d.parameters||[]).forEach(u=>s.push(u))})});const o=i.querySelectorAll(".conditional-field");if(o.length===0)return;function r(){o.forEach(c=>{const d=c.getAttribute("data-depends-key"),u=c.getAttribute("data-depends-val");if(!d)return;const h=s.find(b=>b.field_key===d);if(!h)return;const m=i.querySelector(`[name="param_${h.parameter_id}"]`);if(!m)return;String(m.value||"").trim().toLowerCase()===String(u).toLowerCase()?(c.style.display="",c.querySelectorAll("input, select, textarea").forEach(b=>{b.disabled=!1})):(c.style.display="none",c.querySelectorAll("input, select, textarea").forEach(b=>{b.disabled=!0,b.value=""}))})}i.addEventListener("change",r),i.addEventListener("input",r),r()}async function Xu(i){i.preventDefault();const n=document.getElementById("form-validation-alert");n&&(n.classList.add("hidden"),n.textContent="");const s=document.getElementById("submit-form-btn");s.disabled=!0,s.innerHTML='<div class="spinner" style="width:16px;height:16px;border-width:2px;margin-right:8px;"></div> Submitting...';try{const o=new FormData(i.target),r=Object.fromEntries(o.entries());if(!r._base_name||!r._base_name.trim()){const w=document.getElementById("base_name");throw w&&w.focus(),new Error("Title / Summary is a required field.")}const c=Gt?Gt.getValue():null;if(!c)throw new Error("Please choose where this is, down to the ward, before submitting.");const d=Gt.getMissingLevel();if(d)throw new Error(`Please also choose the ${d}. A request needs a ward so that it reaches the right coordinator.`);if(Ei&&Ei.sections){for(const w of Ei.sections)for(const $ of w.subsections||[])for(const x of $.parameters||[])if(!Fr(x)&&(x.mandatory||x.is_mandatory)){const T=i.target.querySelector(`[name="param_${x.parameter_id}"]`);if(T&&!T.disabled&&!(T.type==="file"?T.files&&T.files.length>0:String(T.value||"").trim()))throw T.focus(),new Error(`"${x.label||x.field_key}" is a required field.`)}}let u=null;for(const[w,$]of Xi.entries()){const x=$.getValue();if(x&&x.latitude!=null&&x.longitude!=null){u=x;break}}const h={entity_type_id:pt,name:r._base_name.trim(),jurisdiction_id:c.jurisdiction_id,area:u&&u.area?u.area:c.display_path,location:r._base_location?r._base_location.trim():u&&u.address?u.address:null,status:"submitted",...u?{latitude:u.latitude,longitude:u.longitude}:{}},g=(await fe.create(h)).data.entity_id;u&&u.latitude!=null&&u.longitude!=null&&await fe.update(g,{latitude:u.latitude,longitude:u.longitude,...u.area?{area:u.area}:{}});const v=[];for(const[w,$]of o.entries())if(w.startsWith("param_")){const x=Number(w.replace("param_",""));if(Xi.has(String(x)))continue;const T=i.target.querySelector(`[name="${w}"]`);if(T&&(T.type==="file"||T.disabled))continue;$!=null&&String($).trim()!==""&&v.push({parameter_id:x,value:String($).trim()})}v.length>0&&await mr.create(g,v);const b=i.target.querySelectorAll('input[type="file"]');for(const w of b)if(w.files&&w.files.length>0){const $=w.getAttribute("data-parameter-id");if(!$)continue;const x=new FormData;x.append("entity_id",g),x.append("parameter_id",$);for(const T of w.files)x.append("files",T);try{await fetch(`${Vu}/files/upload`,{method:"POST",headers:{"X-Requested-With":"ck-web"},credentials:"include",body:x})}catch(T){console.warn("File upload warning:",T)}}ye("Request submitted successfully!"),Qu(g,r._base_name)}catch(o){const r=o.message||"Failed to submit request";n&&(n.textContent=r,n.classList.remove("hidden")),te(r),s.disabled=!1,s.innerHTML='<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:8px"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg> Submit Request'}}function Qu(i,n){const s=document.getElementById("dynamic-form-container"),o=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});s.innerHTML=`
    <div class="card p-8 text-center" style="padding:48px 24px; text-align:center; max-width:640px; margin:0 auto;">
      <div style="width:64px; height:64px; border-radius:50%; background:var(--green-50); border:2px solid var(--green-100); color:var(--green-600); display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
        <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
      </div>

      <h2 style="font-size:1.5rem; font-weight:800; color:var(--text-primary); margin-bottom:6px;">
        Request Submitted
      </h2>
      <p style="font-size:0.95rem; color:var(--text-secondary); margin-bottom:24px;">
        Your request has been recorded and entered into the civic workflow for jurisdiction review.
      </p>

      <div style="background:var(--gray-50); border:1px solid var(--border); border-radius:var(--radius-lg); padding:20px; text-align:left; margin-bottom:32px;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; font-size:0.875rem;">
          <div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Request ID</div>
            <div style="font-weight:700; color:var(--primary); font-family:var(--font-mono); margin-top:2px;">#PR-${String(i).padStart(5,"0")}</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Status</div>
            <div style="margin-top:2px;"><span class="badge badge-submitted">Submitted</span></div>
          </div>
          <div style="grid-column: span 2;">
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Title</div>
            <div style="font-weight:600; color:var(--text-primary); margin-top:2px;">${Ve(n)}</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Submission Date</div>
            <div style="color:var(--text-secondary); margin-top:2px;">${o}</div>
          </div>
        </div>
      </div>

      <div style="display:flex; gap:12px; justify-content:center;">
        <a href="/entities/${i}" class="btn btn-primary btn-lg" style="display:inline-flex; align-items:center; gap:8px;">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          View Request Details
        </a>
        <a href="/dashboard" class="btn btn-secondary btn-lg">Back to My Workspace</a>
      </div>
    </div>
  `}let Un=[],ii=null,oi="";async function ep(){if(!ls(["admin"],ne))return;const i=document.getElementById("app");i.innerHTML=Ee(`
    <div class="page-header mb-6">
      <div class="page-header-left">
        <h1>Users and roles</h1>
        <p>Manage system users, search accounts, assign roles, and allocate areas to coordinators.</p>
      </div>
    </div>
    
    <!-- User Search Filter Bar -->
    <div class="card mb-6" style="padding: 14px 18px;">
      <div style="position: relative; display: flex; align-items: center;">
        <span style="position: absolute; left: 14px; display: flex; align-items: center; color: var(--text-muted); pointer-events: none;">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </span>
        <input type="text" id="user-search-input" class="form-control" style="padding-left: 42px; height: 42px; width: 100%; border-radius: var(--radius-md);" placeholder="Search users by email (e.g. demo.coord.area@example.com), name, or assigned area..." value="${Je(oi)}">
        ${oi?'<button id="clear-search-btn" class="btn btn-ghost btn-sm" style="position:absolute; right:10px; padding:4px 8px; font-size:12px;">Clear</button>':""}
      </div>
    </div>

    <div id="admin-content">
      <div class="loading-overlay"><div class="spinner spinner-lg"></div></div>
    </div>
  `,"Users and roles"),Ce(),tp(),await Zn()}let Vo=null;function tp(){const i=document.getElementById("user-search-input");if(!i)return;i.addEventListener("input",s=>{oi=s.target.value.trim(),clearTimeout(Vo),Vo=setTimeout(()=>{Zn(oi)},200)});const n=document.getElementById("clear-search-btn");n&&n.addEventListener("click",()=>{oi="",i.value="",n.remove(),Zn("")})}async function Zn(i=oi){const n=document.getElementById("admin-content");if(n)try{const s={limit:100};i&&(s.search=i),Un=(await cs.listUsers(s)).data,ip(n,Un)}catch{te("Failed to load users"),n.innerHTML='<div class="alert alert-error">Failed to load users data.</div>'}}function ip(i,n=Un){if(n.length===0){i.innerHTML=`
      <div class="card">
        <div class="card-header">
          <div class="card-title">System Users & Regional Allocations (${n.length})</div>
        </div>
        <div class="table-empty py-6 text-center text-muted">
          No users found matching "${Je(oi)}".
        </div>
      </div>
    `;return}const s=n.map(o=>`
    <tr>
      <td>${o.user_id}</td>
      <td class="font-medium">${Je(o.name)}</td>
      <td class="text-muted">${Je(o.email)}</td>
      <td><span class="badge badge-role-${o.role}">${ap(o.role)}</span></td>
      <td>${o.assignedArea?`<span class="badge badge-primary font-semibold" style="font-size:12px;">${Je(o.assignedArea)}</span>`:'<span class="text-muted">—</span>'}</td>
      <td><button class="btn btn-secondary btn-sm" onclick="window.editUserRole(${o.user_id})">Change Role / Area</button></td>
    </tr>
  `).join("");i.innerHTML=`
    <div class="card">
      <div class="card-header flex justify-between items-center">
        <div class="card-title">System Users & Regional Allocations (${n.length})</div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Assigned Area / Ward</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${s}
          </tbody>
        </table>
      </div>
    </div>
  `}async function np(){if(ii&&ii.length>0)return ii;try{const i=await Bn.tree();i.data&&Array.isArray(i.data)&&(ii=Ur(i.data))}catch(i){console.warn("Failed to load jurisdiction tree for admin, falling back to flat list",i);try{ii=((await Bn.list({parent_id:"all"})).data||[]).map(s=>({jurisdiction_id:s.jurisdiction_id,name:s.name,type:s.type,fullPath:s.name}))}catch{ii=[]}}return ii||[]}function Ur(i,n=""){let s=[];for(const o of i){const r=n?`${n} › ${o.name}`:o.name;s.push({jurisdiction_id:o.jurisdiction_id,name:o.name,type:o.type,fullPath:r}),o.children&&o.children.length>0&&(s=s.concat(Ur(o.children,r)))}return s}window.editUserRole=async i=>{const n=Un.find(w=>w.user_id===i);if(!n)return;const s=await np(),o=s.filter(w=>w.type==="ward"),r=s.filter(w=>w.type==="city"),c=s.filter(w=>w.type!=="ward"&&w.type!=="city");let d=!1,u="";o.length>0&&(u+='<optgroup label="Wards / Local Areas (Recommended)">',o.forEach(w=>{const $=n.assignedArea===w.name;$&&(d=!0),u+=`<option value="${Je(w.name)}" ${$?"selected":""}>${Je(w.fullPath)}</option>`}),u+="</optgroup>"),r.length>0&&(u+='<optgroup label="Cities / Districts">',r.forEach(w=>{const $=n.assignedArea===w.name;$&&(d=!0),u+=`<option value="${Je(w.name)}" ${$?"selected":""}>${Je(w.fullPath)}</option>`}),u+="</optgroup>"),c.length>0&&(u+='<optgroup label="States / Regions">',c.forEach(w=>{const $=n.assignedArea===w.name;$&&(d=!0),u+=`<option value="${Je(w.name)}" ${$?"selected":""}>${Je(w.fullPath)}</option>`}),u+="</optgroup>"),n.assignedArea&&!d&&n.assignedArea!=="Unassigned"&&(u=`<option value="${Je(n.assignedArea)}" selected>${Je(n.assignedArea)} (Currently Assigned)</option>`+u),Fn({title:`User Role & Area Allocation: ${n.name}`,content:`
      <form id="role-form">
        <div class="form-group">
          <label class="form-label font-semibold">User Role</label>
          <select id="new-role" class="form-control">
            <option value="citizen" ${n.role==="citizen"?"selected":""}>Citizen</option>
            <option value="coordinator_area" ${n.role==="coordinator_area"?"selected":""}>Area Coordinator</option>
            <option value="coordinator_general" ${n.role==="coordinator_general"?"selected":""}>General Coordinator</option>
            <option value="director" ${n.role==="director"?"selected":""}>Director</option>
            <option value="admin" ${n.role==="admin"?"selected":""}>Admin</option>
          </select>
        </div>
        <div class="form-group" id="area-group" style="${n.role==="coordinator_area"?"":"display:none;"}">
          <label class="form-label font-semibold">Allocated Region / Ward <span class="required">*</span></label>
          <select id="new-area" class="form-control">
            <option value="">-- Select Allocated Area / Jurisdiction --</option>
            ${u}
            <option value="__custom__">➕ Other / Custom Area Name...</option>
          </select>
          <div id="custom-area-wrapper" style="display:none; margin-top:8px;">
            <input type="text" id="custom-area-input" class="form-control" placeholder="Type custom jurisdiction or ward name (e.g. Kothrud, Sector 5)..." />
          </div>
          <div class="form-hint" style="margin-top:6px;">
            Area Coordinators only have workflow authority to review and approve cases located in their allocated jurisdiction.
          </div>
        </div>
      </form>
    `,footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-close-btn').click()">Cancel</button>
      <button class="btn btn-primary" id="save-role-btn">Save Allocation</button>
    `,onClose:()=>{}});const h=document.getElementById("new-role"),m=document.getElementById("area-group"),g=document.getElementById("new-area"),v=document.getElementById("custom-area-wrapper"),b=document.getElementById("custom-area-input");h.addEventListener("change",w=>{const $=w.target.value==="coordinator_area";m.style.display=$?"block":"none"}),g.addEventListener("change",w=>{w.target.value==="__custom__"?(v.style.display="block",b.focus()):v.style.display="none"}),document.getElementById("save-role-btn").addEventListener("click",async()=>{const w=h.value;let $=g.value;if(w==="coordinator_area"&&($==="__custom__"&&($=b.value.trim()),!$)){te("Please select or enter an allocated area for the coordinator");return}const x=document.getElementById("save-role-btn");x.disabled=!0,x.textContent="Saving...";try{await cs.setRole(i,w,w==="coordinator_area"?$:null),ye(`Updated role & area allocation for ${n.name}`),Ut(),Zn()}catch(T){te(T.message||"Failed to update role"),x.disabled=!1,x.textContent="Save Allocation"}})};function ap(i){return i?i.split("_").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" "):"Unknown"}function Je(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function sp(){if(!kt(ne))return;const i=He(),n=document.getElementById("app");n.innerHTML=Ee(`
    <div class="page-header mb-6">
      <div class="page-header-left">
        <h1>Profile & Security Settings</h1>
        <p>Manage your account credentials, view role permissions, and update password.</p>
      </div>
    </div>
    
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap:24px; width:100%;">
      <!-- Profile Info Card -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">User Account Details</div>
        </div>
        <div class="card-body p-6">
          <div class="flex items-center gap-4 mb-6">
            <div style="width:64px; height:64px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:700;">
              ${i.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style="font-size:1.25rem; font-weight:700; color:var(--text-primary);">${Ua(i.name)}</h2>
              <p style="font-size:0.875rem; color:var(--text-muted);">${Ua(i.email)}</p>
            </div>
          </div>
          
          <div class="form-group mb-4">
            <label class="form-label">User ID</label>
            <div class="font-mono text-muted" style="font-size:0.9rem;">#${i.user_id}</div>
          </div>

          <div class="form-group mb-4">
            <label class="form-label">Assigned Role</label>
            <div><span class="badge badge-primary">${Ki(i.role)}</span></div>
          </div>
          
          ${i.assignedArea?`
            <div class="form-group">
              <label class="form-label">Jurisdiction Area</label>
              <div style="font-weight:600; color:var(--text-primary);">${Ua(i.assignedArea)}</div>
            </div>
          `:""}
        </div>
      </div>

      <!-- Password Change Card -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Password & Security</div>
          <div class="card-subtitle">Update your system login password</div>
        </div>
        <div class="card-body p-6">
          <div id="password-alert" class="alert alert-danger hidden mb-4"></div>

          <form id="change-password-form">
            <div class="form-group mb-4">
              <label class="form-label" for="current_password">Current Password <span class="required">*</span></label>
              <input type="password" id="current_password" name="current_password" class="form-control" required placeholder="Enter current password">
            </div>

            <div class="form-group mb-4">
              <label class="form-label" for="new_password">New Password <span class="required">*</span></label>
              <input type="password" id="new_password" name="new_password" class="form-control" required minlength="8" placeholder="At least 8 characters">
            </div>

            <div class="form-group mb-6">
              <label class="form-label" for="confirm_password">Confirm New Password <span class="required">*</span></label>
              <input type="password" id="confirm_password" name="confirm_password" class="form-control" required minlength="8" placeholder="Re-enter new password">
            </div>

            <button type="submit" id="btn-change-pwd" class="btn btn-primary btn-full" style="display:inline-flex; align-items:center; justify-content:center; gap:8px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  `,"Profile"),Ce();const s=document.getElementById("change-password-form");s&&s.addEventListener("submit",async o=>{o.preventDefault();const r=document.getElementById("password-alert");r.classList.add("hidden"),r.textContent="";const c=document.getElementById("current_password").value,d=document.getElementById("new_password").value,u=document.getElementById("confirm_password").value;if(d!==u){r.textContent="New password and confirmation do not match.",r.classList.remove("hidden");return}const h=document.getElementById("btn-change-pwd");h.disabled=!0,h.innerHTML='<div class="spinner" style="width:16px;height:16px;border-width:2px;margin-right:8px;"></div> Updating...';try{await Xn.changePassword(c,d),ye("Password updated successfully!"),s.reset(),h.disabled=!1,h.innerHTML='<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> Update Password'}catch(m){const g=m.message||"Failed to update password";r.textContent=g,r.classList.remove("hidden"),te(g),h.disabled=!1,h.innerHTML='<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> Update Password'}})}function Ua(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function he(i){return i?String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}let S={step:1,basics:{name:"",description:"",icon:"📋",domain_id:1},form:{name:"",sections:[{id:"sec_1",name:"General Information",parameters:[{id:"param_1",label:"Title",field_key:"title",field_type:"text",mandatory:!0,options:[]},{id:"param_2",label:"Description",field_key:"description",field_type:"textarea",mandatory:!0,options:[],chat:{role:"description"}}]}]},workflow:{transitions:[{from:"draft",to:"submitted",role:"citizen"},{from:"submitted",to:"coordinator_approved",role:"coordinator_area"},{from:"submitted",to:"rejected",role:"coordinator_area"},{from:"coordinator_approved",to:"approved",role:"director"},{from:"coordinator_approved",to:"rejected",role:"director"}]},rule:{enabled:!1,target_entity_type_id:"",event:"approved"},report:{enabled:!0,name:"",groupBy:"area",metric:"COUNT",metricField:"",publicStats:!0},assistant:{ask_area:!0,ask_spot:!0,ask_photo:!0},existingTypes:[],domains:[],isSubmitting:!1};const Zr=[{value:"",label:"None",types:null},{value:"description",label:"The problem in their words",types:["textarea","text"]},{value:"severity",label:"How serious (the resident decides)",types:["select"]},{value:"person_name",label:"The resident's name",types:["text"]},{value:"contact_phone",label:"Call-back number",types:["phone","text"]},{value:"photo",label:"Photo of the problem",types:["file"]}];function op(i,n,s){const o=i.chat||{},r=Zr.filter(c=>!c.types||c.types.includes(i.field_type));return`
    <div style="margin-top:8px; padding-top:8px; border-top:1px dashed var(--gray-200);">
      <div style="font-size:12px; font-weight:600; color:var(--gray-700); margin-bottom:6px;">Civic assistant</div>
      <div class="form-row">
        <div class="form-group" style="flex:1.4;">
          <label class="form-label" style="font-size:12px;">This field is</label>
          <select class="form-control" onchange="window.updateParamChat(${n}, ${s}, 'role', this.value)">
            ${r.map(c=>`<option value="${c.value}" ${String(o.role||"")===c.value?"selected":""}>${he(c.label)}</option>`).join("")}
          </select>
        </div>
        ${i.mandatory?"":`
        <div class="form-group" style="flex:1; display:flex; align-items:flex-end; padding-bottom:8px;">
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;">
            <input type="checkbox" ${o.ask?"checked":""} onchange="window.updateParamChat(${n}, ${s}, 'ask', this.checked)">
            Ask in chat (can be skipped)
          </label>
        </div>`}
      </div>
      ${(i.mandatory||o.ask)&&i.field_type!=="file"?`
      <div class="form-group">
        <label class="form-label" style="font-size:12px;">How the assistant asks it (optional)</label>
        <input type="text" class="form-control" maxlength="300" value="${he(o.question||"")}" onchange="window.updateParamChat(${n}, ${s}, 'question', this.value)" placeholder="e.g. Since when has this been happening?">
      </div>`:""}
    </div>
  `}async function rp(){var i;if(ls(["admin","director"],ne)){try{const[n,s]=await Promise.all([fe.listTypes().catch(()=>({data:[]})),Si.getMetadata().catch(()=>({data:{domains:[]}}))]);S.existingTypes=n.data||[],S.domains=((i=s.data)==null?void 0:i.domains)||[]}catch(n){console.warn("Could not load metadata for module builder:",n)}Oe()}}function Oe(){const i=document.getElementById("app");let n="";S.step===1?n=lp():S.step===2?n=cp():S.step===3?n=up():S.step===4?n=pp():S.step===5?n=hp():S.step===6?n=mp():S.step===7&&(n=fp());const s=[{num:1,label:"Basics"},{num:2,label:"Form & Fields"},{num:3,label:"Workflow"},{num:4,label:"Rules"},{num:5,label:"Reports"},{num:6,label:"Review"}],o=s.map((r,c)=>`
    <div style="display:flex; align-items:center; gap:0.4rem; color:${S.step>=r.num?"var(--primary)":"var(--gray-400)"}; font-weight:${S.step===r.num?"bold":"normal"}; font-size:13px;">
      <span style="width:24px; height:24px; border-radius:50%; background:${S.step>=r.num?"var(--primary)":"#e5e7eb"}; color:${S.step>=r.num?"#fff":"#4b5563"}; display:flex; align-items:center; justify-content:center; font-size:12px;">${r.num}</span>
      ${r.label}
    </div>
    ${c<s.length-1?`<div style="flex:1; height:2px; background:${S.step>r.num?"var(--primary)":"#e5e7eb"}; margin:0 4px;"></div>`:""}
  `).join("");i.innerHTML=Ee(`
    <div class="page-header">
      <div class="page-header-left">
        <h1>Module builder</h1>
        <p>Design and deploy brand-new civic governance capabilities purely through metadata.</p>
      </div>
    </div>

    <!-- Stepper Navigation -->
    <div class="card mb-6" style="padding: 0.8rem 1.2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; overflow-x:auto;">
        ${o}
      </div>
    </div>

    ${n}
  `,"Module builder"),Ce(),gp()}function lp(){const i=S.domains&&S.domains.length>0?S.domains.map(n=>`<option value="${n.domain_id}" ${S.basics.domain_id==n.domain_id?"selected":""}>${he(n.domain_name)}</option>`).join(""):'<option value="1">Civic Operations</option>';return`
    <div class="card" style="max-width: 700px; margin: 0 auto;">
      <div class="card-header">
        <div class="card-title">Step 1: Module Basics</div>
        <div class="card-subtitle">Define the name, domain, and description for your new civic capability.</div>
      </div>
      <div class="card-body">
        <form id="step1-form">
          <div class="form-group">
            <label class="form-label">Module / Entity Type Name <span class="required">*</span></label>
            <input type="text" id="module-name" class="form-control" placeholder="e.g. Park Renovation Request, Public Grievance" value="${he(S.basics.name)}" required>
            <div class="form-hint">Must be unique across the platform.</div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea id="module-desc" class="form-control" rows="3" placeholder="Briefly describe what this module governs...">${he(S.basics.description)}</textarea>
          </div>

          <div class="form-row">
            <div class="form-group" style="flex:1;">
              <label class="form-label">Civic Domain</label>
              <select id="module-domain" class="form-control" onchange="state.basics.domain_id = Number(this.value)">
                ${i}
              </select>
            </div>
            <div class="form-group" style="flex:1;">
              <label class="form-label">Icon Identifier</label>
              <select id="module-icon" class="form-control">
                <option value="📋" ${S.basics.icon==="📋"?"selected":""}>📋 Form / Registration</option>
                <option value="📢" ${S.basics.icon==="📢"?"selected":""}>📢 Notice / Alert</option>
                <option value="🛡️" ${S.basics.icon==="🛡️"?"selected":""}>🛡️ Governance / Policy</option>
                <option value="💼" ${S.basics.icon==="💼"?"selected":""}>💼 Employment / Exchange</option>
                <option value="🤝" ${S.basics.icon==="🤝"?"selected":""}>🤝 Volunteer / Community</option>
                <option value="🌳" ${S.basics.icon==="🌳"?"selected":""}>🌳 Parks / Environment</option>
                <option value="🏗️" ${S.basics.icon==="🏗️"?"selected":""}>🏗️ Infrastructure</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button type="submit" class="btn btn-primary">Next: Form & Fields →</button>
          </div>
        </form>
      </div>
    </div>
  `}function cp(){const i=S.basics.name?`${S.basics.name} Form`:"Module Registration Form",n=S.form.sections.map((s,o)=>{const r=s.parameters.map((c,d)=>{const u=c.field_type==="select";return`
        <div style="background:var(--gray-50, #f9fafb); border:1px solid var(--gray-200, #e5e7eb); border-radius:8px; padding:12px; margin-bottom:10px; position:relative;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-weight:600; font-size:13px; color:var(--gray-700);">Field #${d+1} (${he(c.field_key||"field")})</span>
            <button type="button" class="btn btn-ghost btn-sm text-error" onclick="window.removeParam(${o}, ${d})" style="padding:2px 6px;">✕ Remove</button>
          </div>
          <div class="form-row">
            <div class="form-group" style="flex:2;">
              <label class="form-label" style="font-size:12px;">Field Label <span class="required">*</span></label>
              <input type="text" class="form-control" value="${he(c.label)}" onchange="window.updateParam(${o}, ${d}, 'label', this.value)" placeholder="e.g. Budget, Location" required>
            </div>
            <div class="form-group" style="flex:1.5;">
              <label class="form-label" style="font-size:12px;">Data Type</label>
              <select class="form-control" onchange="window.updateParam(${o}, ${d}, 'field_type', this.value)">
                <option value="text" ${c.field_type==="text"?"selected":""}>Text Input</option>
                <option value="textarea" ${c.field_type==="textarea"?"selected":""}>Long Text (Textarea)</option>
                <option value="number" ${c.field_type==="number"?"selected":""}>Number (Metric)</option>
                <option value="date" ${c.field_type==="date"?"selected":""}>Date</option>
                <option value="select" ${c.field_type==="select"?"selected":""}>Dropdown Select</option>
                <option value="phone" ${c.field_type==="phone"?"selected":""}>Phone Number</option>
                <option value="file" ${c.field_type==="file"?"selected":""}>Photo / File</option>
              </select>
            </div>
            <div class="form-group" style="flex:1; display:flex; align-items:flex-end; padding-bottom:8px;">
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;">
                <input type="checkbox" ${c.mandatory?"checked":""} onchange="window.updateParam(${o}, ${d}, 'mandatory', this.checked)">
                Required?
              </label>
            </div>
          </div>

          ${u?`
            <div style="margin-top:8px; padding-top:8px; border-top:1px dashed var(--gray-200);">
              <label class="form-label" style="font-size:12px;">Dropdown Choices (comma-separated)</label>
              <input type="text" class="form-control" value="${he((c.options||[]).join(", "))}" onchange="window.updateParamOptions(${o}, ${d}, this.value)" placeholder="Choice 1, Choice 2, Choice 3">
            </div>
          `:""}
          ${op(c,o,d)}
        </div>
      `}).join("");return`
      <div class="card mb-4" style="border:1px solid var(--gray-300);">
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc;">
          <input type="text" class="form-control" style="font-weight:bold; max-width:300px;" value="${he(s.name)}" onchange="window.updateSectionName(${o}, this.value)">
          <button type="button" class="btn btn-ghost btn-sm text-error" onclick="window.removeSection(${o})">Delete Section</button>
        </div>
        <div class="card-body">
          ${r}
          <button type="button" class="btn btn-secondary btn-sm mt-2" onclick="window.addParam(${o})">+ Add Field</button>
        </div>
      </div>
    `}).join("");return`
    <div style="display:grid; grid-template-columns: 1.2fr 0.8fr; gap: 20px;">
      <div>
        <div class="card mb-4">
          <div class="card-header">
            <div class="card-title">Step 2: Form & Field Configuration</div>
            <div class="card-subtitle">Define parameters and form sections for "${he(S.basics.name)}".</div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Form Title</label>
              <input type="text" id="form-name-input" class="form-control" value="${he(i)}" onchange="state.form.name = this.value">
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Civic assistant also asks for</label>
              <div style="display:flex; gap:16px; flex-wrap:wrap; font-size:13px;">
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" ${S.assistant.ask_area?"checked":""} onchange="window.updateAssistant('ask_area', this.checked)"> The area (ward)</label>
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" ${S.assistant.ask_spot?"checked":""} onchange="window.updateAssistant('ask_spot', this.checked)"> The exact spot</label>
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" ${S.assistant.ask_photo?"checked":""} onchange="window.updateAssistant('ask_photo', this.checked)"> A photo (needs a field marked "Photo of the problem")</label>
              </div>
            </div>
          </div>
        </div>

        ${n}

        <div class="mb-6">
          <button type="button" class="btn btn-secondary" onclick="window.addSection()">+ Add Section</button>
        </div>

        <div class="flex justify-between mt-6">
          <button type="button" class="btn btn-ghost" onclick="state.step=1; renderWizard();">← Back</button>
          <button type="button" class="btn btn-primary" onclick="window.validateAndGoStep3()">Next: Workflow →</button>
        </div>
      </div>

      <!-- Right Column: Live Interactive Preview -->
      <div>
        <div class="card" style="position:sticky; top:20px; border-top: 4px solid var(--primary);">
          <div class="card-header flex justify-between align-center">
            <div class="card-title" style="display:flex; align-items:center; gap:8px;">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              Live Form Preview
            </div>
            <span class="badge badge-role-citizen">Generic FormEngine</span>
          </div>
          <div class="card-body" style="max-height:80vh; overflow-y:auto;">
            ${dp()}
          </div>
        </div>
      </div>
    </div>
  `}function dp(){const i=S.basics.name?`${S.basics.name} Form`:"Untitled Form";let n=`<div style="font-weight:bold; font-size:1.1rem; margin-bottom:12px; color:var(--gray-900);">${he(i)}</div>`;return S.form.sections.forEach(s=>{n+=`
      <div style="margin-bottom:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
        <div style="font-weight:600; font-size:14px; color:var(--primary); margin-bottom:8px;">${he(s.name)}</div>
    `,s.parameters.forEach(o=>{const r=o.mandatory?'<span style="color:red">*</span>':"";if(n+=`<div style="margin-bottom:10px;">
        <label style="display:block; font-size:12px; font-weight:500; margin-bottom:4px;">${he(o.label||"Unlabelled")} ${r}</label>`,o.field_type==="textarea")n+='<textarea class="form-control" rows="2" disabled placeholder="Text response..."></textarea>';else if(o.field_type==="number")n+='<input type="number" class="form-control" disabled placeholder="0">';else if(o.field_type==="date")n+='<input type="date" class="form-control" disabled>';else if(o.field_type==="select"){const c=o.options&&o.options.length?o.options:["Option 1","Option 2"];n+=`<select class="form-control" disabled>
          ${c.map(d=>`<option>${he(d)}</option>`).join("")}
        </select>`}else n+='<input type="text" class="form-control" disabled placeholder="Text response...">';n+="</div>"}),n+="</div>"}),n}function up(){const i=[{value:"citizen",label:"Citizen (Owner)"},{value:"coordinator_area",label:"Area Coordinator"},{value:"coordinator_general",label:"General Coordinator"},{value:"director",label:"Director"},{value:"admin",label:"Administrator"}],n=S.workflow.transitions.map((s,o)=>`
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-bottom:10px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:600; font-size:13px; color:#1e293b;">Transition #${o+1}</span>
        <button type="button" class="btn btn-ghost btn-sm text-error" onclick="window.removeTransition(${o})">✕ Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group" style="flex:1;">
          <label class="form-label" style="font-size:12px;">From Status</label>
          <input type="text" class="form-control" value="${he(s.from)}" onchange="window.updateTransition(${o}, 'from', this.value)" placeholder="e.g. draft, submitted" required>
        </div>
        <div style="display:flex; align-items:center; padding-top:16px; font-weight:bold; color:#64748b;">→</div>
        <div class="form-group" style="flex:1;">
          <label class="form-label" style="font-size:12px;">To Status</label>
          <input type="text" class="form-control" value="${he(s.to)}" onchange="window.updateTransition(${o}, 'to', this.value)" placeholder="e.g. submitted, approved" required>
        </div>
        <div class="form-group" style="flex:1.2;">
          <label class="form-label" style="font-size:12px;">Allowed Role</label>
          <select class="form-control" onchange="window.updateTransition(${o}, 'role', this.value)">
            ${i.map(r=>`<option value="${r.value}" ${s.role===r.value?"selected":""}>${r.label}</option>`).join("")}
          </select>
        </div>
      </div>
    </div>
  `).join("");return`
    <div class="card" style="max-width: 750px; margin: 0 auto;">
      <div class="card-header">
        <div class="card-title">Step 3: Workflow & State Transitions</div>
        <div class="card-subtitle">Configure the state machine and permitted actor roles for "${he(S.basics.name)}".</div>
      </div>
      <div class="card-body">
        <p style="font-size:13px; color:#64748b; margin-bottom:16px;">
          Define which roles can transition entities of this module from one state to another. These will be generated into <code>WorkflowMaster</code>.
        </p>

        ${n}

        <button type="button" class="btn btn-secondary btn-sm mb-6" onclick="window.addTransition()">+ Add Transition</button>

        <div class="flex justify-between mt-6">
          <button type="button" class="btn btn-ghost" onclick="state.step=2; renderWizard();">← Back</button>
          <button type="button" class="btn btn-primary" onclick="window.validateAndGoStep4()">Next: Rules →</button>
        </div>
      </div>
    </div>
  `}function pp(){return S.existingTypes.map(i=>`<option value="${i.entity_type_id}" ${S.rule.target_entity_type_id==i.entity_type_id?"selected":""}>${he(i.name)}</option>`).join(""),`
    <div class="card" style="max-width: 700px; margin: 0 auto;">
      <div class="card-header">
        <div class="card-title">Step 4: Relationship Rules (Optional)</div>
        <div class="card-subtitle">Configure cascading auto-creation when entities are approved or submitted.</div>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label class="form-label" style="font-size:15px; font-weight:600;">Enable Auto-Creation Rule?</label>
          <div style="display:flex; gap:16px; margin-top:8px;">
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
              <input type="radio" name="rule-enable" value="false" checked onchange="state.rule.enabled = false; renderWizard();">
              No rule (Standalone module)
            </label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
              <input type="radio" name="rule-enable" value="true"  onchange="state.rule.enabled = true; renderWizard();">
              Yes, auto-create linked entity
            </label>
          </div>
        </div>

        

        <div class="flex justify-between mt-6">
          <button type="button" class="btn btn-ghost" onclick="state.step=3; renderWizard();">← Back</button>
          <button type="button" class="btn btn-primary" onclick="state.step=5; renderWizard();">Next: Reports →</button>
        </div>
      </div>
    </div>
  `}function hp(){const i=[];S.form.sections.forEach(r=>r.parameters.forEach(c=>i.push(c)));const n=S.basics.name?`${S.basics.name}s by Area`:"Module Report",s=i.filter(r=>r.field_type==="number"),o=['<option value="area">area (Native Area)</option>','<option value="status">status (Workflow Status)</option>',...i.map(r=>`<option value="${he(r.field_key||r.label)}" ${S.report.groupBy===(r.field_key||r.label)?"selected":""}>${he(r.label)} (${r.field_type})</option>`)].join("");return s.map(r=>`
    <option value="${he(r.field_key||r.label)}" ${S.report.metricField===(r.field_key||r.label)?"selected":""}>${he(r.label)}</option>
  `).join(""),`
    <div class="card" style="max-width: 700px; margin: 0 auto;">
      <div class="card-header">
        <div class="card-title">Step 5: Reporting Definition</div>
        <div class="card-subtitle">Configure dynamic analytical reporting for "${he(S.basics.name)}" via ReportMaster.</div>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label style="display:flex; align-items:center; gap:8px; font-weight:600; cursor:pointer;">
            <input type="checkbox" checked onchange="state.report.enabled = this.checked; renderWizard();">
            Generate Default Analytical Report
          </label>
        </div>

        ${`
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px;">
            <div class="form-group">
              <label class="form-label">Report Name <span class="required">*</span></label>
              <input type="text" class="form-control" value="${he(n)}" onchange="state.report.name = this.value" placeholder="e.g. Park Requests by Area">
            </div>

            <div class="form-row">
              <div class="form-group" style="flex:1;">
                <label class="form-label">Group By Field</label>
                <select class="form-control" onchange="state.report.groupBy = this.value">
                  ${o}
                </select>
              </div>

              <div class="form-group" style="flex:1;">
                <label class="form-label">Aggregation Metric</label>
                <select class="form-control" onchange="state.report.metric = this.value; renderWizard();">
                  <option value="COUNT" selected>COUNT (Entity Count)</option>
                  <option value="SUM" >SUM (Sum of Numeric Field)</option>
                  <option value="AVG" >AVG (Average)</option>
                  <option value="MIN" >MIN (Minimum)</option>
                  <option value="MAX" >MAX (Maximum)</option>
                </select>
              </div>
            </div>

            

            <div class="form-group mb-0">
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;">
                <input type="checkbox" checked onchange="state.report.publicStats = this.checked">
                Public Statistics? (Allows citizens to view aggregated summary without row-level access)
              </label>
            </div>
          </div>
        `}

        <div class="flex justify-between mt-6">
          <button type="button" class="btn btn-ghost" onclick="state.step=4; renderWizard();">← Back</button>
          <button type="button" class="btn btn-primary" onclick="state.step=6; renderWizard();">Next: Review & Deploy →</button>
        </div>
      </div>
    </div>
  `}function mp(){const i=`${S.basics.name} Form`,n=S.form.sections.reduce((o,r)=>o+r.parameters.length,0),s=`${S.basics.name}s by Area`;return`
    <div class="card" style="max-width: 750px; margin: 0 auto;">
      <div class="card-header">
        <div class="card-title">Step 6: Review & Deploy Module</div>
        <div class="card-subtitle">Review the complete declarative metadata definition before atomic deployment.</div>
      </div>
      <div class="card-body">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px; margin-bottom:20px;">
          <!-- Module & Form Header -->
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
            <span style="font-size:2.2rem;">${S.basics.icon}</span>
            <div>
              <div style="font-weight:bold; font-size:1.2rem; color:#0f172a;">${he(S.basics.name)}</div>
              <div style="color:#64748b; font-size:13px;">${he(S.basics.description||"Civic Operating System Module")}</div>
            </div>
          </div>
          
          <div style="border-top:1px solid #cbd5e1; padding-top:12px; font-size:13px; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <div style="font-weight:600; color:#1e293b; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                Form Definition
              </div>
              <div>Title: <strong>${he(i)}</strong></div>
              <div>Sections: <strong>${S.form.sections.length}</strong></div>
              <div>Total Parameters: <strong>${n}</strong></div>
            </div>
            <div>
              <div style="font-weight:600; color:#1e293b; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                Workflow (${S.workflow.transitions.length} transitions)
              </div>
              ${S.workflow.transitions.map(o=>`<div style="font-size:12px;">• <code>${he(o.from)}</code> → <code>${he(o.to)}</code> (${he(o.role)})</div>`).join("")}
            </div>
          </div>

          <div style="border-top:1px solid #cbd5e1; margin-top:12px; padding-top:12px; font-size:13px; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <div style="font-weight:600; color:#1e293b; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Automation Rule
              </div>
              <div>None</div>
            </div>
            <div>
              <div style="font-weight:600; color:#1e293b; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                Reporting
              </div>
              <div>${`${he(s)} (${S.report.metric} by ${S.report.groupBy})`}</div>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button type="button" class="btn btn-ghost" onclick="state.step=5; renderWizard();" ${S.isSubmitting?"disabled":""}>← Back</button>
          <button type="button" class="btn btn-primary btn-lg" id="create-module-btn" onclick="window.submitModuleCreation()" style="display:inline-flex; align-items:center; gap:8px;">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            Deploy Module via Metadata
          </button>
        </div>
      </div>
    </div>
  `}function fp(){return`
    <div class="card" style="max-width: 650px; margin: 0 auto; text-align: center; padding: 40px 20px;">
      <div style="display:inline-flex; align-items:center; justify-content:center; width:64px; height:64px; border-radius:50%; background:#dcfce7; color:#16a34a; margin:0 auto 16px;">
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      </div>
      <h2 style="font-size: 1.8rem; color: var(--gray-900); margin-bottom: 10px;">Module Successfully Deployed!</h2>
      <p style="color: var(--gray-600); margin-bottom: 24px;">
        <strong>"${he(S.basics.name)}"</strong> has been generated atomically with complete Form, Workflow, Rule, and Report metadata.
      </p>

      <div style="display: flex; justify-content: center; gap: 12px;">
        <button class="btn btn-secondary btn-lg" onclick="state.step=1; state.basics.name=''; renderWizard();">Create Another Module</button>
        <button class="btn btn-primary btn-lg" onclick="navigate('/entities/new')">Test New Module Form →</button>
      </div>
    </div>
  `}function gp(){const i=document.getElementById("step1-form");i&&i.addEventListener("submit",n=>{n.preventDefault();const s=document.getElementById("module-name").value.trim(),o=document.getElementById("module-desc").value.trim(),r=document.getElementById("module-icon").value;if(!s){te("Module name is required");return}if(S.existingTypes.some(d=>d.name.toLowerCase()===s.toLowerCase())){te(`Module "${s}" already exists. Please choose a different name.`);return}S.basics.name=s,S.basics.description=o,S.basics.icon=r,S.step=2,Oe()})}Object.defineProperty(window,"state",{get:()=>S,configurable:!0});window.renderWizard=Oe;window.navigate=ne;window.addSection=()=>{const i=S.form.sections.length+1;S.form.sections.push({id:`sec_${Date.now()}`,name:`Section ${i}`,parameters:[{id:`param_${Date.now()}`,label:"New Field",field_key:`field_${Date.now()}`,field_type:"text",mandatory:!1,options:[]}]}),Oe()};window.removeSection=i=>{if(S.form.sections.length<=1){te("Form must have at least one section");return}S.form.sections.splice(i,1),Oe()};window.updateSectionName=(i,n)=>{S.form.sections[i].name=n,Oe()};window.addParam=i=>{const n=S.form.sections[i].parameters.length+1;S.form.sections[i].parameters.push({id:`param_${Date.now()}`,label:`Field ${n}`,field_key:`field_${Date.now()}`,field_type:"text",mandatory:!1,options:[]}),Oe()};window.removeParam=(i,n)=>{S.form.sections[i].parameters.splice(n,1),Oe()};window.updateParam=(i,n,s,o)=>{const r=S.form.sections[i].parameters[n];if(r[s]=o,s==="label"&&(r.field_key=o.toLowerCase().replace(/[^a-z0-9]/g,"_")),s==="field_type"&&r.chat&&r.chat.role){const c=Zr.find(d=>d.value===r.chat.role);c&&c.types&&!c.types.includes(o)&&delete r.chat.role}Oe()};window.updateParamChat=(i,n,s,o)=>{const r=S.form.sections[i].parameters[n],c={...r.chat||{}};s==="role"?(o&&S.form.sections.forEach(d=>d.parameters.forEach(u=>{u!==r&&u.chat&&u.chat.role===o&&delete u.chat.role})),o?c.role=o:delete c.role):s==="ask"?c.ask=!!o:s==="question"&&(String(o).trim()?c.question=String(o).trim().slice(0,300):delete c.question),r.chat=c,Oe()};window.updateAssistant=(i,n)=>{S.assistant[i]=!!n,Oe()};window.updateParamOptions=(i,n,s)=>{const o=s.split(",").map(r=>r.trim()).filter(Boolean);S.form.sections[i].parameters[n].options=o,Oe()};window.validateAndGoStep3=()=>{for(const i of S.form.sections){if(!i.name.trim()){te("All sections must have a title");return}for(const n of i.parameters)if(!n.label.trim()){te("All fields must have a label");return}}S.step=3,Oe()};window.addTransition=()=>{S.workflow.transitions.push({from:"draft",to:"submitted",role:"citizen"}),Oe()};window.removeTransition=i=>{if(S.workflow.transitions.length<=1){te("Workflow must have at least one transition");return}S.workflow.transitions.splice(i,1),Oe()};window.updateTransition=(i,n,s)=>{S.workflow.transitions[i][n]=s,Oe()};window.validateAndGoStep4=()=>{for(let i=0;i<S.workflow.transitions.length;i++){const n=S.workflow.transitions[i];if(!n.from.trim()||!n.to.trim()){te(`Transition #${i+1} must have both from and to states.`);return}}S.step=4,Oe()};window.submitModuleCreation=async()=>{const i=document.getElementById("create-module-btn");i&&(i.disabled=!0,i.textContent="Deploying Metadata Atomically..."),S.isSubmitting=!0;try{const n=S.form.name||`${S.basics.name} Form`,s=S.report.name||`${S.basics.name}s by Area`,o={module:{name:S.basics.name,description:S.basics.description,domain_id:S.basics.domain_id||1},form:{name:n,sections:S.form.sections.map(c=>({name:c.name,parameters:c.parameters.map(d=>({field_key:d.field_key,label:d.label,field_type:d.field_type,mandatory:!!d.mandatory,options:d.options,chat:d.chat&&Object.keys(d.chat).length?d.chat:void 0}))}))},assistant:{...S.assistant},workflow:{transitions:S.workflow.transitions.map(c=>({from_status:c.from,to_status:c.to,role:c.role}))},rules:S.rule.enabled&&S.rule.target_entity_type_id?[{target_entity_type_id:Number(S.rule.target_entity_type_id),event:S.rule.event||"approved",auto_create:!0,auto_approve:!1}]:[],reports:S.report.enabled?[{report_name:s,output_format:"grouped_count",filters:{groupBy:S.report.groupBy||"area",metric:S.report.metric||"COUNT",metricField:S.report.metricField||void 0,public_stats:S.report.publicStats}}]:[]},r=await Dc.deploy(o);ye(r.message||`Module "${S.basics.name}" deployed successfully!`),S.isSubmitting=!1,S.step=7,Oe()}catch(n){te(n.message||"Failed to deploy module"),S.isSubmitting=!1,i&&(i.disabled=!1,i.innerHTML='<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:6px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Deploy Module via Metadata')}};function vp(i){const n=r=>(r.textContent||"").replace(/\s+/g," ").trim(),s=Array.from(i.querySelectorAll("thead th")).map(n),o=Array.from(i.querySelectorAll("tbody tr")).map(r=>Array.from(r.querySelectorAll("td, th")).map(n));return{headers:s,rows:o}}function yp(i){return/^-?\d+(\.\d+)?$/.test(i)?Number(i):null}function Vr(i){return`${String(i||"report").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)||"report"}-${new Date().toISOString().slice(0,10)}`}async function bp({title:i,subtitle:n,headers:s,rows:o}){const[{jsPDF:r},{autoTable:c}]=await Promise.all([Ci(()=>import("./jspdf.es.min-BVvgsMk_.js").then(m=>m.j),__vite__mapDeps([0,1])),Ci(()=>import("./jspdf.plugin.autotable-DYHf0IZ0.js"),[])]),d=new r({orientation:s.length>5?"landscape":"portrait"});d.setFontSize(14),d.text(String(i||"Report"),14,16),d.setFontSize(9),d.setTextColor(100);const u=[n,`Generated ${new Date().toLocaleString()}`,`${o.length} row(s)`].filter(Boolean);d.text(u.join("  ·  "),14,23,{maxWidth:d.internal.pageSize.getWidth()-28}),c(d,{head:[s],body:o,startY:30,styles:{fontSize:9,cellPadding:2},headStyles:{fillColor:[37,99,235]}});const h=`${Vr(i)}.pdf`;return d.save(h),h}async function wp({title:i,headers:n,rows:s}){const{default:o}=await Ci(async()=>{const{default:u}=await import("./index-CB9BIZx8.js");return{default:u}},__vite__mapDeps([2,1])),r=[n.map(u=>({value:u,fontWeight:"bold"})),...s.map(u=>u.map(h=>{const m=yp(h);return m===null?{value:h,type:String}:{value:m,type:Number}}))],c=n.map((u,h)=>({width:Math.min(60,Math.max(12,u.length+2,...s.map(m=>String(m[h]??"").length+2)))})),d=`${Vr(i)}.xlsx`;return await o(r,{columns:c}).toFile(d),d}function Xe(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}let In=[],Wo=[];async function xp(){if(!kt(ne))return;const i=document.getElementById("app");i.innerHTML=Ee(`
    <div class="page-header mb-6">
      <div class="page-header-left">
        <h1>Reports</h1>
        <p>Analytical summaries and metric aggregations of municipal activity.</p>
      </div>
    </div>
    <div id="reports-container">
      <div class="loading-overlay"><div class="spinner spinner-lg"></div></div>
    </div>
  `,"Reports"),Ce();try{const[n,s]=await Promise.all([li.list().catch(()=>({data:[]})),fe.listTypes().catch(()=>({data:[]}))]);In=n.data||[],Wo=s.data||[],i.innerHTML=Ee(`
      <div class="page-header mb-6">
        <div class="page-header-left">
          <h1>Reports</h1>
          <p style="color:var(--text-secondary); margin-top:2px;">
            Execute analytical query reports configured via ReportMaster metadata.
          </p>
        </div>
      </div>
      
      <div id="reports-container"></div>
    `,"Reports",Wo),Ce(),_p(document.getElementById("reports-container"))}catch{te("Failed to load reports catalog"),document.getElementById("reports-container").innerHTML=`
      <div class="alert alert-error">Unable to load reports. Please try again later.</div>
    `}}function _p(i){if(!In||In.length===0){i.innerHTML=`
      <div class="card p-8 text-center" style="padding:48px 24px; text-align:center;">
        <div style="display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:50%; background:var(--gray-100); color:var(--text-muted); margin:0 auto 12px;">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
        </div>
        <h3 style="font-size:1.15rem; font-weight:600; margin-bottom:6px; color:var(--text-primary);">No configured civic reports available</h3>
        <p style="font-size:0.875rem; color:var(--text-muted); max-width:400px; margin:0 auto;">
          Reports can be defined via ReportMaster metadata configurations in the Capability Builder.
        </p>
      </div>
    `;return}const n=In.map(r=>{const c=et(r.entityType);return`
      <div class="report-card">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <span class="badge badge-primary" style="font-size:11px;">${Xe(c.shortTitle)}</span>
            <span class="badge badge-secondary" style="font-size:10px;">${Xe(r.metric_type||"COUNT")}</span>
          </div>
          <div class="report-card-title">${Xe(r.report_name)}</div>
          <div class="report-card-desc">
            Aggregates <strong>${Xe(c.shortTitle)}</strong> records grouped by <strong>${Xe(r.group_by_field||"area / status")}</strong>.
          </div>
        </div>
        
        <div>
          <div class="report-card-meta mb-3">
            <span>Group By: ${Xe(r.group_by_field||"area")}</span>
            <span>•</span>
            <span>Metric: ${Xe(r.metric_type||"COUNT")}</span>
          </div>
          <button class="btn btn-primary btn-full execute-report-btn" data-repid="${r.report_id}" style="display:inline-flex; align-items:center; justify-content:center; gap:6px;">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Run Report
          </button>
        </div>
      </div>
    `}).join("");i.innerHTML=`
    <div class="reports-grid mb-8">
      ${n}
    </div>

    <!-- Execution Result Output Panel -->
    <div class="card" id="report-execution-panel" style="display:none;">
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
        <div class="card-title" id="execution-title">Report Results</div>
        <button class="btn btn-ghost btn-sm" id="btn-close-result">Close Panel</button>
      </div>
      <div class="card-body p-6" id="execution-body"></div>
    </div>
  `,i.querySelectorAll(".execute-report-btn").forEach(r=>{r.addEventListener("click",()=>{const c=r.getAttribute("data-repid");kp(c)})});const o=document.getElementById("btn-close-result");o&&o.addEventListener("click",()=>{document.getElementById("report-execution-panel").style.display="none"})}async function kp(i){const n=document.getElementById("report-execution-panel"),s=document.getElementById("execution-title"),o=document.getElementById("execution-body");if(!(!n||!o)){n.style.display="block",n.scrollIntoView({behavior:"smooth"}),o.innerHTML='<div class="loading-overlay" style="padding:24px;"><div class="spinner spinner-lg"></div></div>';try{const c=(await li.execute(i)).data;s.textContent=`Report Results: ${c.reportName||"Execution"}`;const d=c.rows||[];if(d.length===0){o.innerHTML='<div class="text-muted text-center p-4">Report executed successfully, but returned 0 data rows.</div>';return}const u=d.map(g=>{var v;return`
      <tr>
        <td style="font-weight:600;">${Xe(g[c.groupBy]||g.area||g.status||"Total")}</td>
        <td style="font-weight:700; color:var(--primary);">${g[(v=c.metric)==null?void 0:v.toLowerCase()]||g.count||g.total_count||0}</td>
      </tr>
    `}).join("");o.innerHTML=`
      <div style="margin-bottom:16px; font-size:0.875rem; color:var(--text-secondary);">
        Metric: <strong>${Xe(c.metric)}</strong> | Grouped By: <strong>${Xe(c.groupBy)}</strong> | Total Groups: <strong>${d.length}</strong>
      </div>

      <div style="display:flex; gap:8px; justify-content:flex-end; margin-bottom:12px;">
        <button class="btn btn-secondary btn-sm" id="btn-export-pdf" type="button">Download PDF</button>
        <button class="btn btn-secondary btn-sm" id="btn-export-excel" type="button">Download Excel</button>
      </div>

      <div class="table-container">
        <table id="report-result-table">
          <thead>
            <tr>
              <th>${Xe(c.groupBy||"Group")}</th>
              <th>Aggregation Metric (${Xe(c.metric)})</th>
            </tr>
          </thead>
          <tbody>
            ${u}
          </tbody>
        </table>
      </div>
    `;const h={title:c.reportName||"Report",subtitle:`Metric: ${c.metric} · Grouped by: ${c.groupBy}`},m=(g,v,b)=>{const w=document.getElementById(g);w&&w.addEventListener("click",async()=>{const $=document.getElementById("report-result-table");if($){w.disabled=!0;try{const x=await v({...h,...vp($)});ye(`${b} downloaded: ${x}`)}catch(x){te(`${b} export failed: ${x.message||x}`)}finally{w.disabled=!1}}})};m("btn-export-pdf",bp,"PDF"),m("btn-export-excel",wp,"Excel")}catch(r){te(r.message||"Report execution failed"),o.innerHTML=`<div class="alert alert-error">Execution Error: ${Xe(r.message)}</div>`}}}const ot=190,At=64,Go=110,Wi=26,zi=24,Mn=20,$p=4,zp=56,Lp=768;let ut=null;function Ep(){try{if(window.innerWidth<Lp||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return!1;const i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}}function Mt(i){return String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ko(i,n){const s=String(i??"");return s.length>n?`${s.slice(0,n-1)}…`:s}function Cp(i,n){const s=i.map(N=>N.entity_type_id),o=new Set(s),r=n.filter(N=>o.has(N.source_entity_type_id)&&o.has(N.target_entity_type_id)),c=new Map(s.map(N=>[N,0]));for(let N=0;N<s.length;N+=1){let A=!1;for(const q of r){if(q.source_entity_type_id===q.target_entity_type_id)continue;const J=c.get(q.source_entity_type_id)+1;J>c.get(q.target_entity_type_id)&&J<s.length&&(c.set(q.target_entity_type_id,J),A=!0)}if(!A)break}const d=new Set(r.flatMap(N=>[N.source_entity_type_id,N.target_entity_type_id])),u=new Map;for(const N of i){if(!d.has(N.entity_type_id))continue;const A=c.get(N.entity_type_id);u.has(A)||u.set(A,[]),u.get(A).push(N)}const h=[...u.keys()].sort((N,A)=>N-A),m=Math.max(0,...[...u.values()].map(N=>N.length)),g=zi+(m?24:0),v=m?m*At+(m-1)*Wi:0,b=h.length*ot+Math.max(0,h.length-1)*Go,w=i.filter(N=>!d.has(N.entity_type_id)),$=Math.max(1,Math.min(w.length,Math.max($p,Math.floor((b+Mn)/(ot+Mn))))),x=Math.ceil(w.length/$),T=w.length?$*ot+($-1)*Mn:0,E=g+v+(m&&w.length?zp:0),_=x?x*At+(x-1)*Wi:0,P=zi*2+Math.max(b,T,ot),R=E+_+zi,B=new Map;h.forEach((N,A)=>{const q=u.get(N),J=q.length*At+(q.length-1)*Wi,Y=g+(v-J)/2;q.forEach((oe,pe)=>{B.set(oe.entity_type_id,{type:oe,x:zi+A*(ot+Go),y:Y+pe*(At+Wi),standalone:!1})})}),w.forEach((N,A)=>{B.set(N.entity_type_id,{type:N,x:zi+A%$*(ot+Mn),y:E+Math.floor(A/$)*(At+Wi),standalone:!0})});const V=w.length&&m?E-14:null;return{nodes:B,edges:r,width:P,height:R,standaloneLabelY:V}}function Sp(i,n){if(i===n){const h=i.x+ot/2;return`M ${h-26} ${i.y} C ${h-60} ${i.y-44}, ${h+60} ${i.y-44}, ${h+26} ${i.y}`}const s=n.x>=i.x,o=s?i.x+ot:i.x,r=s?n.x:n.x+ot,c=i.y+At/2,d=n.y+At/2,u=Math.max(40,Math.abs(r-o)/2)*(s?1:-1);return`M ${o} ${c} C ${o+u} ${c}, ${r-u} ${d}, ${r} ${d}`}function Tp(i){var r,c;const n=((r=i.sourceEntityType)==null?void 0:r.name)||`#${i.source_entity_type_id}`,s=((c=i.targetEntityType)==null?void 0:c.name)||`#${i.target_entity_type_id}`,o=i.auto_create?`a ${s} is created ${i.auto_approve?"and approved automatically":"and waits for review"}`:"nothing is created (rule is switched off)";return`When a ${n} is ${i.event||"changed"}, ${o}.`}function Mp({nodes:i,edges:n,width:s,height:o,standaloneLabelY:r}){const c=n.map(u=>{const h=i.get(u.source_entity_type_id),m=i.get(u.target_entity_type_id),g=Sp(h,m),v=h===m?h.x+ot/2:(h.x+m.x+ot)/2,b=h===m?h.y-38:(h.y+m.y+At)/2-8,w=`rule-edge${u.auto_approve?"":" rule-edge-pending"}${u.auto_create?"":" rule-edge-off"}`;return`
      <g class="rule-edge-group" data-rule-id="${Number(u.rule_id)}">
        <title>${Mt(Tp(u))}</title>
        <path class="rule-edge-hit" d="${g}" />
        <path class="${w}" d="${g}" marker-end="url(#rule-arrow)" />
        <text class="rule-edge-label" x="${v}" y="${b}" text-anchor="middle">on ${Mt(u.event||"change")}</text>
      </g>`}).join(""),d=[...i.values()].map(({type:u,x:h,y:m,standalone:g})=>{var w,$;const v=((w=u._count)==null?void 0:w.entities)??0,b=(($=u.domain)==null?void 0:$.domain_name)||"";return`
      <a class="rule-node${g?" rule-node-standalone":""}" href="/entities?entity_type_id=${Number(u.entity_type_id)}"
         data-entity-type-id="${Number(u.entity_type_id)}" aria-label="${Mt(`${u.name}, ${v} records. Open its records.`)}">
        <title>${Mt(`${u.name} — ${v} record(s)${b?` — ${b}`:""}`)}</title>
        <rect x="${h}" y="${m}" width="${ot}" height="${At}" rx="10" />
        <text class="rule-node-name" x="${h+14}" y="${m+27}">${Mt(Ko(u.name,22))}</text>
        <text class="rule-node-meta" x="${h+14}" y="${m+47}">${v} record${v===1?"":"s"}${b?` · ${Mt(Ko(b,16))}`:""}</text>
      </a>`}).join("");return`
    <svg class="rule-graph-svg" viewBox="0 0 ${s} ${o}" width="${s}" height="${o}"
         role="img" aria-label="Diagram of modules and the rules that link them. The same rules are listed in the table below.">
      <defs>
        <marker id="rule-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" class="rule-arrow-head" />
        </marker>
      </defs>
      ${c}
      ${r!==null?`<text class="rule-section-label" x="${zi}" y="${r}">Modules with no rules</text>`:""}
      ${d}
    </svg>`}function Ap(i){return i.length?`
    <div class="table-container">
      <table id="rule-graph-table">
        <caption class="rule-graph-caption">Rules: what is created when a record reaches a status</caption>
        <thead>
          <tr><th scope="col">When a record of</th><th scope="col">reaches</th><th scope="col">create a</th><th scope="col">Automatic</th><th scope="col">New record</th></tr>
        </thead>
        <tbody>${i.map(s=>{var o,r;return`
        <tr data-rule-id="${Number(s.rule_id)}">
          <td>${Mt(((o=s.sourceEntityType)==null?void 0:o.name)||s.source_entity_type_id)}</td>
          <td>${Mt(s.event||"")}</td>
          <td>${Mt(((r=s.targetEntityType)==null?void 0:r.name)||s.target_entity_type_id)}</td>
          <td>${s.auto_create?"Yes":"No"}</td>
          <td>${s.auto_create?s.auto_approve?"Approved automatically":"Waits for review":"—"}</td>
        </tr>`}).join("")}</tbody>
      </table>
    </div>`:'<div class="text-muted">No rules are defined. Add one to a module in the No-Code Builder and it appears here.</div>'}function Ip(i,n){const s=Array.isArray(n==null?void 0:n.entityTypes)?n.entityTypes:[],o=Array.isArray(n==null?void 0:n.rules)?n.rules:[],r=Cp(s,o);i.innerHTML=`
    <section class="card rule-graph-card" aria-labelledby="rule-graph-title">
      <div class="card-header rule-graph-header">
        <div>
          <h2 class="card-title" id="rule-graph-title">How modules are linked</h2>
          <p class="rule-graph-sub">${s.length} module${s.length===1?"":"s"}, ${r.edges.length} rule${r.edges.length===1?"":"s"}. Read from the module metadata; nothing here is hard-coded.</p>
        </div>
        <div class="rule-graph-controls">
          <ul class="rule-graph-legend" id="rule-graph-legend-2d" aria-label="Legend">
            <li><svg width="44" height="10" aria-hidden="true"><line x1="0" y1="5" x2="44" y2="5" class="rule-edge" /></svg> created and approved automatically</li>
            <li><svg width="44" height="10" aria-hidden="true"><line x1="0" y1="5" x2="44" y2="5" class="rule-edge rule-edge-pending" /></svg> created, waits for review</li>
          </ul>
          <ul class="rule-graph-legend" id="rule-graph-legend-3d" aria-label="Legend" hidden>
            <li>Arrow with moving dots: created and approved automatically</li>
            <li>Arrow without dots: created, waits for review</li>
            <li>Sphere size: number of records. Drag to rotate, scroll to zoom.</li>
          </ul>
          ${s.length&&Ep()?'<button type="button" class="btn btn-secondary btn-sm" id="rule-graph-3d-toggle" aria-pressed="false">View in 3D</button>':""}
        </div>
      </div>
      <div class="card-body">
        <div id="rule-graph-3d-note" class="rule-graph-note" role="status" hidden></div>
        ${s.length?`<div class="rule-graph-scroll" id="rule-graph-2d">${Mp(r)}</div>
             <div class="rule-graph-3d" id="rule-graph-3d" hidden></div>`:'<div class="text-muted">No modules are configured yet.</div>'}
        <div class="rule-graph-table-wrap">${Ap(r.edges)}</div>
      </div>
    </section>`,Pp(i,{entityTypes:s,rules:r.edges});const c=(d,u)=>{i.querySelectorAll(`[data-rule-id="${d}"]`).forEach(h=>h.classList.toggle("is-active",u))};i.querySelectorAll("[data-rule-id]").forEach(d=>{const u=d.getAttribute("data-rule-id");d.addEventListener("mouseenter",()=>c(u,!0)),d.addEventListener("mouseleave",()=>c(u,!1))})}function Pp(i,n){ut&&(ut.destroy(),ut=null);const s=i.querySelector("#rule-graph-3d-toggle");if(!s)return;const o=i.querySelector("#rule-graph-2d"),r=i.querySelector("#rule-graph-3d"),c=i.querySelector("#rule-graph-legend-2d"),d=i.querySelector("#rule-graph-legend-3d"),u=i.querySelector("#rule-graph-3d-note"),h=m=>{ut&&(ut.destroy(),ut=null),r.hidden=!0,o.hidden=!1,d.hidden=!0,c.hidden=!1,s.textContent="View in 3D",s.setAttribute("aria-pressed","false"),m&&(u.textContent=m,u.hidden=!1,s.remove())};s.addEventListener("click",async()=>{if(ut){h();return}s.disabled=!0,s.textContent="Loading 3D…";try{const{mountRuleGraph3d:m,MIN_FPS:g}=await Ci(async()=>{const{mountRuleGraph3d:b,MIN_FPS:w}=await import("./ruleGraph3d-C-jCFC0r.js");return{mountRuleGraph3d:b,MIN_FPS:w}},[]);o.hidden=!0,c.hidden=!0,r.hidden=!1,d.hidden=!1,ut=m(r,n,{onNodeClick:b=>{window.location.assign(`/entities?entity_type_id=${Number(b)}`)}}),s.textContent="View in 2D",s.setAttribute("aria-pressed","true");const v=ut;setTimeout(async()=>{if(ut!==v||document.hidden)return;const b=await v.measureFps();ut===v&&b<g&&h(`The 3D view ran at ${Math.round(b)} frames per second on this device, so the 2D diagram is shown instead.`)},2500)}catch{h("The 3D view could not be loaded; the 2D diagram is shown instead.")}finally{s.disabled=!1}})}function bt(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}async function Bp(){if(!kt(ne))return;const i=document.getElementById("app");i.innerHTML=Ee(`
    <div class="page-header mb-6">
      <div class="page-header-left">
        <h1>Modules</h1>
        <p>Explore all available civic operations, initiatives, and request modules.</p>
      </div>
    </div>
    <div id="modules-container">
      <div class="loading-overlay"><div class="spinner spinner-lg"></div></div>
    </div>
  `,"Modules"),Ce();try{const s=(await fe.listTypes().catch(()=>({data:[]}))).data||[];i.innerHTML=Ee(`
      <div class="page-header mb-6">
        <div class="page-header-left">
          <h1>Modules</h1>
          <p style="color:var(--text-secondary); margin-top:2px;">
            Select a civic capability to initiate requests, grievances, community initiatives, or civic actions.
          </p>
        </div>
      </div>

      <div id="modules-container"></div>
      <div id="assistant-settings-panel"></div>
      <div id="rule-graph-container"></div>
    `,"Modules",s),Ce(),Rp(document.getElementById("modules-container"),s);const o=document.getElementById("rule-graph-container");try{const r=await Si.getMetadata();Ip(o,r.data)}catch{o.innerHTML='<div class="alert alert-error" style="margin-top:24px;">The module link diagram could not be loaded.</div>'}}catch{te("Failed to load civic capabilities"),document.getElementById("modules-container").innerHTML=`
      <div class="alert alert-error">Unable to load capabilities catalog. Please try again.</div>
    `}}function Rp(i,n){if(!n||n.length===0){i.innerHTML=`
      <div class="card p-8 text-center" style="padding:48px 24px; text-align:center;">
        <div style="display:flex; align-items:center; justify-content:center; width:56px; height:56px; border-radius:50%; background:var(--gray-100); color:var(--text-muted); margin:0 auto 12px;">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <h3 style="font-size:1.15rem; font-weight:600; margin-bottom:6px; color:var(--text-primary);">No capabilities configured</h3>
        <p style="font-size:0.875rem; color:var(--text-muted); max-width:400px; margin:0 auto;">
          Administrators can publish new civic capabilities using the No-Code Module Builder.
        </p>
      </div>
    `;return}const s=n.map(o=>{var d;const r=et(o),c=((d=o._count)==null?void 0:d.entities)||0;return`
      <div class="card capability-card" style="padding:24px; border-top:3px solid rgba(var(--primary-rgb), 0.45); display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--shadow-xs);">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <div style="display:flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:12px; background:rgba(var(--primary-rgb), 0.12); color:var(--primary);">
              ${Ft(r.iconKey,24)}
            </div>
            <span class="badge badge-secondary" style="font-size:11px;">${c} Active Cases</span>
          </div>

          <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--primary); margin-bottom:4px;">
            ${bt(r.category)}
          </div>

          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin-bottom:8px;">
            ${bt(r.title)}
          </h3>

          <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:20px; line-height:1.5;">
            ${bt(r.description)}
          </p>
        </div>

        <div style="display:flex; gap:10px; padding-top:16px; border-top:1px solid var(--border);">
          <a href="/entities?entity_type_id=${o.entity_type_id}" class="btn btn-secondary" style="flex:1; text-align:center; font-size:0.85rem;">
            Explore Cases
          </a>
          <a href="/entities/new?entity_type_id=${o.entity_type_id}" class="btn btn-translucent-orange" style="flex:1; text-align:center; font-size:0.85rem;">
            ${bt(r.actionLabel)} →
          </a>
        </div>
        ${jp()?`
        <button type="button" class="btn btn-ghost btn-sm" data-assistant-settings="${o.entity_type_id}" style="margin-top:10px; align-self:flex-start; font-size:0.8rem;">
          Assistant settings
        </button>`:""}
      </div>
    `}).join("");i.innerHTML=`
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:24px;">
      ${s}
    </div>
  `,i.querySelectorAll("[data-assistant-settings]").forEach(o=>{o.addEventListener("click",()=>Np(Number(o.getAttribute("data-assistant-settings"))))})}const Op={"":"None",description:"The problem in their words",severity:"How serious (the resident decides)",person_name:"The resident's name",contact_phone:"Call-back number",photo:"Photo of the problem"};function jp(){const i=(He()||{}).role;return i==="admin"||i==="director"}async function Np(i){const n=document.getElementById("assistant-settings-panel");if(!n)return;n.innerHTML='<div class="card" style="margin-top:24px; padding:24px;"><div class="spinner"></div></div>';let s;try{s=(await Si.getAssistant(i)).data}catch{n.innerHTML="",te("Could not load the assistant settings for this module.");return}const o=(c,d)=>!c||(s.role_types[c]||[]).includes(String(d||"text").toLowerCase()),r=s.fields.map(c=>{const d=c.chat||{},u=["",...s.roles].filter(m=>o(m,c.field_type)).map(m=>`<option value="${m}" ${String(d.role||"")===m?"selected":""}>${bt(Op[m]||m)}</option>`).join(""),h=["file","upload","image","attachment"].includes(String(c.field_type).toLowerCase());return`
      <tr data-param="${c.parameter_id}">
        <td style="padding:8px; vertical-align:top;"><strong>${bt(c.label)}</strong><div style="font-size:0.75rem; color:var(--text-muted);">${bt(c.field_type||"text")}${c.mandatory?" · required":""}</div></td>
        <td style="padding:8px; vertical-align:top;"><select class="form-control" data-k="role">${u}</select></td>
        <td style="padding:8px; vertical-align:top; text-align:center;">${c.mandatory||h?'<span style="font-size:0.75rem; color:var(--text-muted);">'+(c.mandatory?"always":"—")+"</span>":`<input type="checkbox" data-k="ask" ${d.ask?"checked":""} aria-label="Ask ${bt(c.label)} in chat">`}</td>
        <td style="padding:8px; vertical-align:top;">${h?"":`<input type="text" class="form-control" data-k="question" maxlength="300" value="${bt(d.question||"")}" placeholder="Default wording">`}</td>
        <td style="padding:8px; vertical-align:top; width:80px;">${c.mandatory||h?"":`<input type="number" class="form-control" data-k="order" min="0" max="999" value="${d.order??""}" aria-label="Order">`}</td>
      </tr>`}).join("");n.innerHTML=`
    <div class="card" style="margin-top:24px;">
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div class="card-title">Assistant settings: ${bt(s.name)}</div>
          <div class="card-subtitle">What the civic assistant asks for this module. Changes apply to new conversations at once.</div>
        </div>
        <button type="button" class="btn btn-ghost btn-sm" id="assistant-close">Close</button>
      </div>
      <div class="card-body">
        <div style="display:flex; gap:18px; flex-wrap:wrap; margin-bottom:16px; font-size:0.9rem;">
          <span style="font-weight:600;">Also ask for:</span>
          <label style="display:flex; gap:6px; align-items:center;"><input type="checkbox" id="ask-area" ${s.asks.ask_area?"checked":""}> The area (ward)</label>
          <label style="display:flex; gap:6px; align-items:center;"><input type="checkbox" id="ask-spot" ${s.asks.ask_spot?"checked":""}> The exact spot</label>
          <label style="display:flex; gap:6px; align-items:center;"><input type="checkbox" id="ask-photo" ${s.asks.ask_photo?"checked":""}> A photo</label>
        </div>
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:0.875rem;">
            <thead><tr style="text-align:left; border-bottom:1px solid var(--border);">
              <th style="padding:8px;">Field</th><th style="padding:8px;">This field is</th><th style="padding:8px;">Ask in chat</th><th style="padding:8px;">How the assistant asks it</th><th style="padding:8px;">Order</th>
            </tr></thead>
            <tbody>${r}</tbody>
          </table>
        </div>
        <div style="display:flex; gap:10px; margin-top:16px;">
          <button type="button" class="btn btn-primary" id="assistant-save">Save settings</button>
        </div>
      </div>
    </div>`,n.scrollIntoView({behavior:"smooth",block:"start"}),document.getElementById("assistant-close").addEventListener("click",()=>{n.innerHTML=""}),document.getElementById("assistant-save").addEventListener("click",async()=>{const c=[...n.querySelectorAll("tr[data-param]")].map(u=>{const h=g=>u.querySelector(`[data-k="${g}"]`),m={};return h("role")&&h("role").value&&(m.role=h("role").value),h("ask")&&h("ask").checked&&(m.ask=!0),h("question")&&h("question").value.trim()&&(m.question=h("question").value.trim()),h("order")&&h("order").value!==""&&(m.order=Number(h("order").value)),{parameter_id:Number(u.getAttribute("data-param")),chat:Object.keys(m).length?m:null}}),d={ask_area:document.getElementById("ask-area").checked,ask_spot:document.getElementById("ask-spot").checked,ask_photo:document.getElementById("ask-photo").checked};try{await Si.saveAssistant(i,{fields:c,asks:d}),ye("Assistant settings saved.")}catch(u){te(u.message||"Could not save the assistant settings.")}})}function Be(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}let ns=null,Qi=!1,Vn=[];async function Hp(){if(!ls(["director","admin"],ne))return;const i=document.getElementById("app");i.innerHTML=Ee(`
    <div style="padding: 24px 0;">
      <div class="loading-overlay" style="min-height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div class="spinner spinner-lg"></div>
        <div style="margin-top: 16px; color: var(--text-secondary); font-weight: 500;">
          Initializing Governance Intelligence Engine...
        </div>
      </div>
    </div>
  `,"/governance"),Ce();try{Vn=(await fe.listTypes().catch(()=>({data:[]}))).data||[],await Wr()}catch(n){te(n.message||"Failed to load governance intelligence"),Dp(n.message)}}async function Wr(){Qi=!0,Yo();try{const i=await Fc.analyze();if(i&&i.success)ns=i.data,ye("Governance telemetry updated");else throw new Error((i==null?void 0:i.error)||"Analysis returned invalid response")}catch(i){te(i.message||"Governance analysis failed")}finally{Qi=!1,Yo()}}function Yo(){const i=document.getElementById("app");if(!i)return;if(!ns&&Qi){i.innerHTML=Ee(`
      <div style="padding: 32px 0;">
        <div class="loading-overlay" style="min-height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <div class="spinner spinner-lg"></div>
          <div style="margin-top: 16px; color: var(--text-secondary); font-weight: 600;">
            Running Deterministic Rules & Telemetry Pipeline...
          </div>
        </div>
      </div>
    `,"/governance",Vn),Ce();return}const n=ns||{},s=n.summary_metrics||{},o=n.process_health||{pipeline:[]},r=n.exceptions||[],c=n.stakeholder_intelligence||[],d=n.ai_summary||null,u=n.analysis_mode==="AI_ASSISTED",h=`
    <div class="governance-page" style="padding: 20px 0 60px 0;">

      <!-- SIMULATION DISCLAIMER BANNER -->
      <div style="background: linear-gradient(90deg, #eff6ff 0%, #f0fdf4 100%); border: 1px solid #bfdbfe; border-left: 5px solid #3b82f6; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px; display: flex; align-items: flex-start; gap: 14px;">
        <div style="color: #2563eb; flex-shrink: 0; margin-top: 2px;">
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div style="flex: 1; font-size: 13px; line-height: 1.5; color: #1e3a8a;">
          <strong style="font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">
            Simulated Governance Environment (Civic Intelligence Capability)
          </strong>
          All transactions, records, and verification workflows shown here are synthetic simulation scenarios generated to test algorithmic control-gap detection and process health monitoring. No conclusions or allegations regarding real individuals, trusts, or public bodies are made.
        </div>
      </div>

      <!-- PAGE HEADER -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 28px;">
        <div>
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
            <h1 style="font-size: 1.85rem; font-weight: 800; color: var(--text-primary); margin: 0;">
              Governance Intelligence
            </h1>
            <span style="background: ${u?"rgba(147, 51, 234, 0.12)":"rgba(100, 116, 139, 0.12)"}; color: ${u?"#9333ea":"#475569"}; border: 1px solid ${u?"rgba(147, 51, 234, 0.3)":"rgba(100, 116, 139, 0.25)"}; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
              ${u?`
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.986-7.876 4 4 0 017.972 0A4 4 0 0112 14z"></path>
                </svg>
                AI-ASSISTED SYNTHESIS (GEMINI)
              `:`
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                DETERMINISTIC ENGINE ONLY
              `}
            </span>
          </div>
          <p style="color: var(--text-secondary); margin: 0; font-size: 14px;">
            Target Module: <strong style="color: var(--text-primary);">${Be(n.entity_type_name||"Donation Transaction")}</strong> • 
            Telemetry analyzed at ${n.analyzed_at?new Date(n.analyzed_at).toLocaleTimeString():"now"}
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <button id="btn-reanalyze" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 600;" ${Qi?"disabled":""}>
            ${Qi?`
              <div class="spinner spinner-sm" style="border-top-color:#fff;"></div>
              Analyzing Telemetry...
            `:`
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Re-run Intelligence Engine
            `}
          </button>
        </div>
      </div>

      <!-- KPI METRIC CARDS -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 28px;">
        
        <div class="card" style="padding: 18px; border-top: 4px solid var(--primary);">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Total Volume</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--text-primary); margin: 6px 0 2px 0;">${s.total_transactions??0}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Transactions tracked</div>
        </div>

        <div class="card" style="padding: 18px; border-top: 4px solid #16a34a;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Verified</div>
          <div style="font-size: 2rem; font-weight: 800; color: #16a34a; margin: 6px 0 2px 0;">${s.verified_count??0}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Confirmed verification</div>
        </div>

        <div class="card" style="padding: 18px; border-top: 4px solid #ea580c;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Pending Verification</div>
          <div style="font-size: 2rem; font-weight: 800; color: #ea580c; margin: 6px 0 2px 0;">${s.pending_verification_count??0}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Awaiting officer review</div>
        </div>

        <div class="card" style="padding: 18px; border-top: 4px solid #dc2626;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Failed Verification</div>
          <div style="font-size: 2rem; font-weight: 800; color: #dc2626; margin: 6px 0 2px 0;">${s.failed_verification_count??0}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Process failures flagged</div>
        </div>

        <div class="card" style="padding: 18px; border-top: 4px solid #ca8a04;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Unreconciled</div>
          <div style="font-size: 2rem; font-weight: 800; color: #ca8a04; margin: 6px 0 2px 0;">${s.unresolved_reconciliation_count??0}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Bank matching pending</div>
        </div>

        <div class="card" style="padding: 18px; border-top: 4px solid #9333ea;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Exceptions Flagged</div>
          <div style="font-size: 2rem; font-weight: 800; color: #9333ea; margin: 6px 0 2px 0;">${r.length}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Deterministic control gaps</div>
        </div>

      </div>

      <!-- PROCESS HEALTH PIPELINE VISUALIZER -->
      <div class="card" style="padding: 24px; margin-bottom: 28px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
          <div>
            <h2 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin: 0;">
              Process Health Pipeline
            </h2>
            <p style="font-size: 13px; color: var(--text-secondary); margin: 2px 0 0 0;">
              Lifecycle workflow stage velocity and dwell time computed from real AuditLog history
            </p>
          </div>
          <span style="font-size: 12px; font-weight: 600; color: var(--text-muted);">
            Authoritative Workflow: Entity.status
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; position: relative;">
          ${(o.pipeline||[]).map((g,v)=>{const b=g.exception_count>0;return`
              <div style="background: var(--gray-50); border: 1px solid ${b?"#fca5a5":"var(--gray-200)"}; border-radius: 8px; padding: 14px; position: relative;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <span style="font-size: 11px; font-weight: 700; background: var(--gray-200); color: var(--gray-700); padding: 2px 6px; border-radius: 4px;">
                    STAGE ${v+1}
                  </span>
                  ${b?`
                    <span style="font-size: 11px; font-weight: 700; background: #fee2e2; color: #b91c1c; padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                      ⚠️ ${g.exception_count} gap${g.exception_count>1?"s":""}
                    </span>
                  `:`
                    <span style="font-size: 11px; font-weight: 700; background: #dcfce7; color: #15803d; padding: 2px 6px; border-radius: 4px;">
                      ✓ Healthy
                    </span>
                  `}
                </div>
                <div style="font-size: 15px; font-weight: 700; color: var(--text-primary); text-transform: capitalize; margin-bottom: 4px;">
                  ${Be(g.label||g.stage)}
                </div>
                <div style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">
                  ${g.count} <span style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">in stage</span>
                </div>
                <div style="font-size: 12px; color: var(--text-muted); border-top: 1px dashed var(--gray-200); padding-top: 6px; margin-top: 6px;">
                  ⏱ ${g.avg_days_in_stage!==null?`${g.avg_days_in_stage} days avg`:"Terminal stage"}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>

      <!-- AI-ASSISTED EXECUTIVE SYNTHESIS (IF PRESENT) -->
      ${d?`
        <div class="card" style="border: 1px solid #d8b4fe; background: linear-gradient(180deg, #faf5ff 0%, #ffffff 100%); padding: 24px; margin-bottom: 28px; box-shadow: 0 4px 16px rgba(147, 51, 234, 0.06);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px solid #f3e8ff; padding-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="background: #9333ea; color: #ffffff; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h2 style="font-size: 1.2rem; font-weight: 800; color: #581c87; margin: 0;">
                  Executive Synthesis & Risk Assessment
                </h2>
                <div style="font-size: 12px; color: #7e22ce;">
                  Synthesized via Gemini AI from live deterministic exception telemetry
                </div>
              </div>
            </div>
            <span style="background: #9333ea; color: #ffffff; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
              AI: ${Be(d.analysis_mode||"AI")}
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 18px;">
            <div>
              <h3 style="font-size: 13px; font-weight: 700; color: #581c87; text-transform: uppercase; margin-bottom: 6px;">
                Pipeline Velocity Assessment
              </h3>
              <p style="font-size: 13px; line-height: 1.6; color: #374151; margin: 0;">
                ${Be(d.process_health_narrative||"Pipeline telemetry shows operational stages operating within standard thresholds.")}
              </p>
            </div>
            <div>
              <h3 style="font-size: 13px; font-weight: 700; color: #581c87; text-transform: uppercase; margin-bottom: 6px;">
                Control Gap Concentration
              </h3>
              <p style="font-size: 13px; line-height: 1.6; color: #374151; margin: 0;">
                ${Be(d.risk_narrative||"Exceptions detected require periodic verification per standard governance protocols.")}
              </p>
            </div>
          </div>

          ${Array.isArray(d.recommendations)&&d.recommendations.length>0?`
            <div style="background: #ffffff; border: 1px solid #e9d5ff; border-radius: 8px; padding: 14px 18px;">
              <h3 style="font-size: 12px; font-weight: 700; color: #6b21a8; text-transform: uppercase; margin-bottom: 8px;">
                Recommended Corrective Governance Actions
              </h3>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #4b5563;">
                ${d.recommendations.map(g=>`<li>${Be(g)}</li>`).join("")}
              </ul>
            </div>
          `:""}
        </div>
      `:`
        <div style="background: var(--gray-50); border: 1px dashed var(--gray-300); border-radius: 8px; padding: 16px 20px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between;">
          <div style="font-size: 13px; color: var(--text-secondary);">
            <strong>Deterministic Mode Active:</strong> All exception rules, pipeline metrics, and stakeholder mappings are computed via deterministic database queries. AI synthesis is optional.
          </div>
          <span style="font-size: 11px; font-weight: 700; background: var(--gray-200); color: var(--gray-700); padding: 3px 8px; border-radius: 4px;">
            MODE: DETERMINISTIC_ONLY
          </span>
        </div>
      `}

      <!-- DETERMINISTIC EXCEPTION REGISTER -->
      <div class="card" style="padding: 24px; margin-bottom: 28px;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px;">
          <div>
            <h2 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin: 0;">
              Deterministic Exception Register
            </h2>
            <p style="font-size: 13px; color: var(--text-secondary); margin: 2px 0 0 0;">
              Rules-based anomalies detected directly from Entity state, ParameterValues, and AuditLog telemetry
            </p>
          </div>
          <span style="background: #fee2e2; color: #b91c1c; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700;">
            ${r.length} Active Observations
          </span>
        </div>

        ${r.length===0?`
          <div style="text-align: center; padding: 32px; color: var(--text-secondary);">
            <div style="font-size: 2rem; margin-bottom: 8px;">✓</div>
            <strong>Zero Exceptions Detected</strong>
            <p style="font-size: 13px; margin-top: 4px;">All transactions strictly satisfy configured governance and state-sync rules.</p>
          </div>
        `:`
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${r.map(g=>`
              <div style="border: 1px solid var(--gray-200); border-left: 4px solid #f59e0b; border-radius: 8px; padding: 16px; background: #ffffff;">
                <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 11px; font-weight: 700; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-family: monospace;">
                      ${Be(g.trigger_rule)}
                    </span>
                    <strong style="font-size: 14px; color: var(--text-primary);">
                      ${Be(g.observation)}
                    </strong>
                  </div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 10px; font-weight: 700; background: var(--gray-100); color: var(--gray-700); padding: 2px 6px; border-radius: 4px;">
                      MODE: ${Be(g.analysis_mode||"DETERMINISTIC")}
                    </span>
                    ${g.requires_human_review?`
                      <span style="font-size: 10px; font-weight: 700; background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px;">
                        HUMAN REVIEW REQUIRED
                      </span>
                    `:""}
                  </div>
                </div>

                <div style="background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: 6px; padding: 10px 14px; margin-bottom: 10px; font-family: monospace; font-size: 12px; color: #1e293b;">
                  <strong>Evidence:</strong> ${Be(g.evidence)}
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; font-size: 12.5px;">
                  <div>
                    <span style="color: var(--text-secondary); font-weight: 600;">Possible Process Weakness:</span>
                    <div style="color: var(--text-primary); margin-top: 2px;">${Be(g.possible_cause)}</div>
                  </div>
                  <div>
                    <span style="color: var(--text-secondary); font-weight: 600;">Governance Recommendation:</span>
                    <div style="color: var(--text-primary); margin-top: 2px;">${Be(g.recommendation)}</div>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </div>

      <!-- STAKEHOLDER INTELLIGENCE MATRIX -->
      <div class="card" style="padding: 24px;">
        <div style="margin-bottom: 18px;">
          <h2 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin: 0;">
            Stakeholder Intelligence Matrix
          </h2>
          <p style="font-size: 13px; color: var(--text-secondary); margin: 2px 0 0 0;">
            Configured in DashboardMaster metadata and populated dynamically with live telemetry evidence
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
          ${c.map(g=>`
            <div style="border: 1px solid var(--gray-200); border-radius: 8px; padding: 18px; background: var(--gray-50); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <strong style="font-size: 15px; color: var(--text-primary);">
                    ${Be(g.stakeholder)}
                  </strong>
                  <span style="font-size: 10px; font-weight: 700; background: var(--gray-200); color: var(--gray-700); padding: 2px 6px; border-radius: 4px;">
                    ${Be(g.analysis_mode||"DETERMINISTIC")}
                  </span>
                </div>
                
                <div style="margin-bottom: 10px;">
                  <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Core Responsibility</div>
                  <div style="font-size: 13px; color: var(--text-primary); margin-top: 2px;">${Be(g.interest)}</div>
                </div>

                <div style="margin-bottom: 10px;">
                  <div style="font-size: 11px; font-weight: 700; color: #b91c1c; text-transform: uppercase;">Governance Concern</div>
                  <div style="font-size: 13px; color: #7f1d1d; margin-top: 2px;">${Be(g.concern)}</div>
                </div>

                <div style="margin-bottom: 12px;">
                  <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Relevant Process Stage</div>
                  <div style="font-size: 12.5px; color: var(--text-primary); margin-top: 2px; font-family: monospace;">${Be(g.relevant_process)}</div>
                </div>
              </div>

              <div style="background: #ffffff; border: 1px solid var(--gray-200); border-radius: 6px; padding: 10px; font-size: 12px; color: #334155;">
                <strong style="color: var(--text-secondary); display: block; margin-bottom: 2px; font-size: 11px; text-transform: uppercase;">Live Telemetry Evidence:</strong>
                ${Be(g.evidence)}
              </div>
            </div>
          `).join("")}
        </div>
      </div>

    </div>
  `;i.innerHTML=Ee(h,"/governance",Vn),Ce();const m=document.getElementById("btn-reanalyze");m&&m.addEventListener("click",()=>{Wr()})}function Dp(i){const n=document.getElementById("app");n&&(n.innerHTML=Ee(`
    <div style="padding: 40px 0; text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
      <h2 style="font-size: 1.5rem; color: var(--text-primary); margin-bottom: 8px;">Governance Intelligence Error</h2>
      <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 20px auto;">
        ${Be(i||"Unable to execute governance analysis.")}
      </p>
      <button class="btn btn-primary" onclick="window.location.reload()">Retry</button>
    </div>
  `,"/governance",Vn),Ce())}let Yi=null,Pn=!1,as=null,wt=null;function Pe(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function bs(i){return Pe(i).replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br>")}function Gr(i){return!i||isNaN(i)?"":i<1024?i+" B":i<1024*1024?(i/1024).toFixed(1)+" KB":(i/(1024*1024)).toFixed(1)+" MB"}function Fp(i,n=null){let s="";n&&(n.isImage&&n.previewUrl?s=`
        <div class="agent-user-attachment">
          <img src="${Pe(n.previewUrl)}" alt="${Pe(n.name)}" class="agent-attachment-thumb" />
          <div class="agent-attachment-meta">
            <span class="agent-attachment-name">📷 ${Pe(n.name)}</span>
            <span class="agent-attachment-size">${Pe(n.sizeStr)}</span>
          </div>
        </div>
      `:s=`
        <div class="agent-user-attachment agent-attachment-doc">
          <span class="agent-attachment-icon">📄</span>
          <div class="agent-attachment-meta">
            <span class="agent-attachment-name">${Pe(n.name)}</span>
            <span class="agent-attachment-size">${Pe(n.sizeStr)}</span>
          </div>
        </div>
      `);const o=i?`<div class="agent-bubble-text">${Pe(i)}</div>`:"";return`
    <div class="agent-msg-row agent-msg-user">
      <div class="agent-bubble agent-bubble-user">
        ${s}
        ${o}
      </div>
    </div>
  `}function an(i,n=null){return`
    <div class="agent-msg-row agent-msg-agent">
      <div class="agent-bubble-avatar" aria-hidden="true">
        <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      </div>
      <div class="agent-bubble agent-bubble-agent">${bs(i)}${n==="ai"?'<div class="assist-ai-note" title="The question is set by rules; AI only worded it.">AI-worded</div>':""}</div>
    </div>
  `}function qp(i){return!Array.isArray(i)||!i.length?"":`
    <div class="assist-chips" role="group" aria-label="Suggested answers">
      ${i.map(n=>`<button type="button" class="assist-chip" data-reply="${Pe(n.value)}">${Pe(n.label)}</button>`).join("")}
    </div>`}function Up(i,n,s=[]){const o=Array.isArray(i)?i.map(c=>`
        <div class="agent-confirm-row ${c.isFile?"agent-confirm-file-row":""}">
          <span class="agent-confirm-label">${Pe(c.label)}</span>
          <span class="agent-confirm-value">${Pe(c.value)}</span>
        </div>`).join(""):"";return`
    <div class="agent-msg-row agent-msg-agent">
      <div class="agent-bubble-avatar" aria-hidden="true">
        <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <div class="agent-confirm-card">
        <div class="agent-confirm-title">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--primary);flex-shrink:0;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          Ready to send. Is this right?
        </div>
        ${`<p style="color:var(--text-secondary); font-size:0.875rem; margin-bottom:12px;">${bs(n.split(`

`)[0])}</p>`}
        <div class="agent-confirm-table">${o}</div>
        <div class="agent-confirm-editor" hidden>
          ${s&&s.length?wr(s):""}
          <div class="agent-confirm-actions">
            <button type="button" class="btn btn-primary agent-edit-save">Save changes</button>
            <button type="button" class="btn btn-ghost agent-edit-cancel">Cancel</button>
          </div>
        </div>
        <div class="agent-confirm-note">Nothing is sent until you say so.</div>
        <div class="agent-confirm-actions" id="agent-confirm-btns">
          <button id="agent-submit-btn" class="btn btn-primary" style="min-width:120px;">
            Send it
          </button>
          ${s&&s.length?'<button id="agent-edit-btn" class="btn btn-secondary" type="button">Edit details</button>':""}
          <button id="agent-change-btn" class="btn btn-secondary" type="button">Change something</button>
          <button id="agent-cancel-btn" class="btn btn-ghost" type="button">Cancel</button>
        </div>
      </div>
    </div>
  `}function Zp(i){const n=Array.isArray(i.files)&&i.files.length?`<div class="assist-success-meta">Attached: ${i.files.map(Pe).join(", ")}</div>`:"",s=String(i.text||"").split(`
`).slice(1).join(`
`).trim();return`
    <div class="agent-msg-row agent-msg-agent">
      <div class="agent-bubble-avatar assist-avatar-done" aria-hidden="true">
        <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
      </div>
      <div class="agent-success-card" role="status">
        <div class="assist-success-title">Sent</div>
        <div class="assist-success-ref">${Pe(i.reference||`#${i.entity_id}`)}</div>
        <div class="assist-success-name">${Pe(i.entity_name||"")}</div>
        ${n}
        ${s?`<p class="assist-success-next">${bs(s)}</p>`:""}
        <div class="assist-success-actions">
          <a href="/entities/${Number(i.entity_id)}" class="btn btn-sm btn-primary">Open my request</a>
          <button id="agent-new-request-btn" class="btn btn-sm btn-ghost" type="button">Something else</button>
        </div>
      </div>
    </div>
  `}function Vp(){return`
    <div class="agent-msg-row agent-msg-agent" id="agent-thinking">
      <div class="agent-bubble-avatar" aria-hidden="true">
        <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      </div>
      <div class="agent-bubble agent-bubble-agent agent-thinking-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  `}function Za(i,n){return i&&i.lang&&i.lang!=="en"?`<div class="notranslate" style="display:contents" lang="${Pe(i.lang)}">${n}</div>`:n}function ss(){return document.getElementById("agent-thread")}function Wn(){return document.getElementById("agent-input")}function Wp(){return document.getElementById("agent-send-btn")}function Gp(){return document.getElementById("agent-attach-btn")}function Kr(){return document.getElementById("agent-file-input")}function Kp(){return document.getElementById("agent-camera-input")}async function Jo(i){var s;if(!i)return;const n=await br(i);if(n.size>yr){qt(an("That file is larger than 10 MB, so I cannot take it. Please choose a smaller one."));return}wt=n,ws(),(s=Wn())==null||s.focus()}function Xo(i){const n=document.getElementById("agent-form-card");if(!n)return;if(!i||!Array.isArray(i.rows)){n.hidden=!0,n.innerHTML="";return}const s=i.rows.map(r=>`
    <div class="agent-form-card-row"><span>${Pe(r.label)}</span><strong>${Pe(r.value)}</strong></div>`).join(""),o=Number(i.remaining)||0;n.innerHTML=`
    <div class="agent-form-card-head">
      <span>${Pe(i.service||"Your request")}</span>
      <span class="agent-form-card-left">${o===0?"Ready to check":`${o} more to go`}</span>
    </div>
    <div class="agent-form-card-rows">${s}</div>`,n.hidden=!1}function qt(i){var o;(o=ss())==null||o.querySelectorAll(".assist-chips").forEach(r=>r.remove());const n=ss();if(!n)return;const s=document.createElement("div");for(s.innerHTML=i;s.firstChild;)n.appendChild(s.firstChild);n.scrollTop=n.scrollHeight}function Qo(){const i=document.getElementById("agent-thinking");i&&i.remove()}function Va(i){const n=Wn(),s=Wp(),o=Gp();n&&(n.disabled=!i),s&&(s.disabled=!i,s.style.opacity=i?"1":"0.5");for(const r of[o,document.getElementById("agent-camera-btn")])r&&(r.disabled=!i,r.style.opacity=i?"1":"0.5")}function ws(){var o;const i=document.getElementById("agent-file-preview-bar");if(!i)return;if(!wt){i.innerHTML="",i.style.display="none";return}const n=wt.type.startsWith("image/"),s=n?URL.createObjectURL(wt):null;i.style.display="flex",i.innerHTML=`
    <div class="agent-preview-chip">
      ${n?`<img src="${s}" class="agent-preview-thumb" alt="Preview" />`:'<span class="agent-preview-icon">📄</span>'}
      <div class="agent-preview-info">
        <span class="agent-preview-filename">${Pe(wt.name)}</span>
        <span class="agent-preview-filesize">${Gr(wt.size)}</span>
      </div>
      <button type="button" id="agent-remove-file-btn" class="agent-preview-remove" title="Remove attachment" aria-label="Remove attachment">&times;</button>
    </div>
  `,(o=document.getElementById("agent-remove-file-btn"))==null||o.addEventListener("click",()=>{wt=null;const r=Kr();r&&(r.value=""),ws()})}async function It(i,n=null,s=null){const o=n||wt,r=(i||"").trim();if(Pn||!r&&!o)return;Pn=!0;let c=null;if(o){const h=o.type.startsWith("image/");c={name:o.name,sizeStr:Gr(o.size),isImage:h,previewUrl:h?URL.createObjectURL(o):null}}const d=Wn();d&&(d.value="",d.style.height="auto"),wt=null;const u=Kr();u&&(u.value=""),ws(),qt(Fp(r||(o?`Uploaded: ${o.name}`:""),c)),Va(!1),qt(Vp());try{const h=si(),m=zr(h),g=await Rn.chat(Yi,m+r,o,Vt(),s);Qo();const v=g.data;as=null,v.progress?Xo(v.progress):["submitted","cancelled","status"].includes(v.type)&&Xo(null),v.type==="confirm"?(as=v,qt(Za(v,Up(v.summary||[],v.lead||"Here is what I will send:",v.editable||[]))),setTimeout(()=>{var P,R,B,V;const b=document.getElementById("agent-submit-btn"),w=document.getElementById("agent-cancel-btn"),$=[...document.querySelectorAll(".agent-confirm-card")].at(-1),x=$==null?void 0:$.querySelector(".agent-confirm-editor"),T=$==null?void 0:$.querySelector(".agent-confirm-table"),E=document.getElementById("agent-confirm-btns"),_=N=>{var A;!x||!T||!E||(x.hidden=!N,T.hidden=N,E.hidden=N,N&&((A=x.querySelector(".se-input"))==null||A.focus()))};(P=document.getElementById("agent-edit-btn"))==null||P.addEventListener("click",()=>_(!0)),(R=x==null?void 0:x.querySelector(".agent-edit-cancel"))==null||R.addEventListener("click",()=>_(!1)),(B=x==null?void 0:x.querySelector(".agent-edit-save"))==null||B.addEventListener("click",()=>{const{edits:N,changes:A}=xr(x);if(!A.length){_(!1);return}x.remove(),E==null||E.remove(),It(`Changed: ${A.join("; ")}`,null,N)}),(V=document.getElementById("agent-change-btn"))==null||V.addEventListener("click",()=>{var N;(N=document.getElementById("agent-confirm-btns"))==null||N.remove(),It("no")}),b&&b.addEventListener("click",()=>{var N;(N=document.getElementById("agent-confirm-btns"))==null||N.remove(),It("yes")}),w&&w.addEventListener("click",()=>{var N;(N=document.getElementById("agent-confirm-btns"))==null||N.remove(),It("cancel")})},50)):v.type==="submitted"?(qt(Za(v,Zp(v))),Va(!1),setTimeout(()=>{const b=document.getElementById("agent-new-request-btn");b&&b.addEventListener("click",()=>{ne("/agent/chat")})},50)):qt(Za(v,an(v.text||"Something went wrong. Please try again.",v.voice)+qp(v.options)))}catch(h){Qo(),qt(an("Sorry, I could not reach the service just now. Nothing was sent. Please try again in a moment.")),console.error("[Agent Chat] Error:",h)}finally{if(Pn=!1,document.getElementById("agent-input")){Va(!0);const h=Wn();h&&!h.disabled&&h.focus()}}}async function Yp(i={},n=null){var E;if(!kt(ne))return;Yi=null,Pn=!1,as=null,wt=null;const s=n||new URLSearchParams(window.location.search),o=s.get("sessionId"),r=s.get("message");Yi=o||"ck-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,9);const c=document.getElementById("app");c.innerHTML=Ee(`
    <style>
      /* ── Agent chat layout ── */
      .agent-chat-wrap {
        display: flex; flex-direction: column; height: calc(100vh - 140px);
        max-width: 780px; margin: 0 auto;
      }
      .agent-chat-header {
        display:flex; align-items:center; gap:12px;
        padding:16px 20px; background:var(--surface);
        border:1px solid var(--border); border-radius:12px 12px 0 0;
        border-bottom:none;
      }
      .agent-chat-avatar-wrap {
        width:38px;height:38px;border-radius:50%;
        background:linear-gradient(135deg,var(--primary),#e03c22);
        display:flex;align-items:center;justify-content:center;flex-shrink:0;
      }
      #agent-thread {
        flex:1; overflow-y:auto; padding:20px;
        background:var(--surface); border:1px solid var(--border);
        display:flex; flex-direction:column; gap:12px;
      }
      /* Input bar & Attachment preview */
      .agent-input-container {
        display: flex; flex-direction: column;
        background:var(--surface); border:1px solid var(--border);
        border-radius:0 0 12px 12px; border-top: 1px solid var(--border-strong);
      }
      .agent-file-preview-bar {
        display: none; padding: 8px 16px 0 16px;
      }
      .agent-preview-chip {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 5px 10px; background: var(--bg); border: 1px solid var(--border-strong);
        border-radius: 8px; font-size: 0.8rem;
      }
      .agent-preview-thumb {
        width: 28px; height: 28px; object-fit: cover; border-radius: 4px;
      }
      .agent-preview-icon { font-size: 1.1rem; }
      .agent-preview-info { display: flex; flex-direction: column; line-height: 1.2; }
      .agent-preview-filename { font-weight: 600; color: var(--text-primary); max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .agent-preview-filesize { font-size: 0.7rem; color: var(--text-muted); }
      .agent-preview-remove {
        background: none; border: none; font-size: 1rem; color: var(--text-muted);
        cursor: pointer; padding: 0 4px; line-height: 1;
      }
      .agent-preview-remove:hover { color: var(--red-600, #dc2626); }

      .agent-input-bar {
        display:flex; gap:8px; align-items:center;
        padding:12px 16px;
      }
      .agent-attach-btn {
        background: none; border: none; color: var(--text-secondary);
        cursor: pointer; padding: 8px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.2s, color 0.2s;
      }
      .agent-attach-btn:hover {
        background: var(--bg); color: var(--primary);
      }
      .agent-form-card {
        background: var(--surface-2, var(--surface)); border: 1px solid var(--border);
        border-top: none; padding: 10px 20px; font-size: 0.82rem;
      }
      .agent-form-card[hidden] { display: none; }
      .agent-form-card-head {
        display: flex; justify-content: space-between; gap: 12px;
        font-weight: 700; color: var(--text-primary); margin-bottom: 6px;
      }
      .agent-form-card-left { font-weight: 600; color: var(--primary); }
      .agent-form-card-rows { display: flex; flex-wrap: wrap; gap: 4px 18px; }
      .agent-form-card-row { display: flex; gap: 6px; min-width: 0; max-width: 100%; }
      .agent-form-card-row span { color: var(--text-muted); flex-shrink: 0; }
      .agent-form-card-row strong {
        font-weight: 600; color: var(--text-primary);
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 260px;
      }
      @media (max-width: 600px) {
        .agent-form-card { padding: 8px 14px; }
        .agent-form-card-rows { max-height: 64px; overflow-y: auto; }
        .agent-form-card-row strong { max-width: 200px; }
      }
      #agent-input {
        flex:1; padding:10px 14px; border-radius:20px;
        border:1px solid var(--border-strong); background:var(--bg);
        color:var(--text-primary); font-size:0.9rem; font-family:inherit;
        resize:none; outline:none; min-height:40px; max-height:120px;
        transition: border-color 0.2s;
      }
      #agent-input:focus { border-color:var(--primary); }

      /* Message rows */
      .agent-msg-row { display:flex; gap:8px; max-width:88%; }
      .agent-msg-user { align-self:flex-end; flex-direction:row-reverse; max-width:75%; }
      .agent-msg-agent { align-self:flex-start; }
      .agent-bubble {
        padding:10px 16px; border-radius:18px; font-size:0.875rem;
        line-height:1.55; word-break:break-word;
      }
      .agent-bubble-user {
        background:linear-gradient(135deg,var(--primary),#e03c22);
        color:white; border-bottom-right-radius:4px;
      }
      .agent-bubble-agent {
        background:var(--surface-2,#f9f9fb); color:var(--text-primary);
        border:1px solid var(--border); border-bottom-left-radius:4px;
      }
      .agent-bubble-avatar {
        width:28px;height:28px;border-radius:50%;flex-shrink:0;margin-top:2px;
        background:linear-gradient(135deg,var(--primary),#e03c22);
        display:flex;align-items:center;justify-content:center;
      }

      /* Attachment in bubble */
      .agent-user-attachment {
        display: flex; align-items: center; gap: 8px; margin-bottom: 6px;
        background: rgba(0,0,0,0.15); padding: 6px 10px; border-radius: 10px;
      }
      .agent-attachment-thumb {
        width: 48px; height: 48px; object-fit: cover; border-radius: 6px; border: 1px solid rgba(255,255,255,0.4);
      }
      .agent-attachment-icon { font-size: 1.5rem; }
      .agent-attachment-meta { display: flex; flex-direction: column; }
      .agent-attachment-name { font-weight: 600; font-size: 0.8rem; }
      .agent-attachment-size { font-size: 0.7rem; opacity: 0.85; }

      /* Thinking animation */
      .agent-thinking-dots { display:flex; gap:4px; padding:12px 16px; align-items:center; }
      .agent-thinking-dots span {
        width:7px;height:7px;background:var(--text-muted);border-radius:50%;
        animation:agent-dot-bounce 1.2s infinite ease-in-out;
      }
      .agent-thinking-dots span:nth-child(1){animation-delay:0s;}
      .agent-thinking-dots span:nth-child(2){animation-delay:0.2s;}
      .agent-thinking-dots span:nth-child(3){animation-delay:0.4s;}
      @keyframes agent-dot-bounce {
        0%,80%,100%{transform:scale(0.7);opacity:0.5;}
        40%{transform:scale(1);opacity:1;}
      }

      /* Confirm card */
      .agent-confirm-card {
        background:var(--surface); border:2px solid var(--primary);
        border-radius:12px; padding:18px 20px; max-width:480px;
      }
      .agent-confirm-title {
        font-weight:700; font-size:0.9rem; color:var(--text-primary);
        margin-bottom:12px; display:flex; align-items:center; gap:8px;
      }
      .agent-confirm-table { display:flex; flex-direction:column; gap:6px; }
      .agent-confirm-row {
        display:flex; gap:12px; font-size:0.83rem;
        padding:5px 0; border-bottom:1px solid var(--border);
      }
      .agent-confirm-file-row {
        background: rgba(var(--primary-rgb), 0.05); padding: 6px 8px; border-radius: 6px;
      }
      .agent-confirm-row:last-child { border-bottom:none; }
      .agent-confirm-label { font-weight:600; color:var(--text-secondary); min-width:130px; flex-shrink:0; }
      .agent-confirm-value { color:var(--text-primary); font-weight:500; }
      .agent-confirm-actions { display:flex; gap:10px; margin-top:16px; }

      /* Success card */
      .agent-success-card {
        background:var(--green-50,#f0fdf4); border:1px solid var(--green-200,#bbf7d0);
        border-radius:12px; padding:18px 20px; max-width:400px;
      }
    </style>

    <div class="agent-chat-wrap">
      <div class="agent-chat-header">
        <div class="agent-chat-avatar-wrap">
          <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
        <div>
          <div style="font-weight:700; font-size:0.95rem;">Civic assistant</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">
            Say it in your own words. Nothing is sent until you confirm.
          </div>
        </div>
        <div style="margin-left:auto; display:flex; align-items:center; gap:8px;">
          <div id="agent-loc-status" style="display:none; font-size:0.72rem; color:var(--text-muted); align-items:center; gap:4px;">
            <svg width="11" height="11" fill="none" stroke="var(--primary)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span id="agent-loc-text"></span>
          </div>
          <button type="button" id="agent-loc-btn" class="btn btn-ghost btn-sm" title="Share your location for better help" style="font-size:0.72rem; padding:4px 10px; display:none;">
            📍 Share location
          </button>
          <a href="/dashboard" class="btn btn-ghost btn-sm">← Dashboard</a>
        </div>
      </div>

      <div id="agent-form-card" class="agent-form-card" hidden aria-live="polite" aria-label="Details filled in so far"></div>

      <div id="agent-thread" role="log" aria-live="polite" aria-label="Conversation with Civic Assistant">
        <!-- Initial greeting -->
        ${an("Hi. Tell me what is going on, in your own words, for example **there is a pothole outside my building**. I will ask only what I need, read it back to you, and send it when you say yes. You can add a photo with the paperclip, or take one with the camera.")}
      </div>

      <div class="agent-input-container">
        <!-- Attachment preview chip -->
        <div id="agent-file-preview-bar" class="agent-file-preview-bar"></div>

        <div class="agent-input-bar">
          <button
            id="agent-attach-btn"
            type="button"
            class="agent-attach-btn"
            title="Attach photo or document evidence"
            aria-label="Attach photo or document evidence"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            type="file"
            id="agent-file-input"
            style="display:none;"
            accept="image/*,.pdf,.doc,.docx,.txt,.csv"
          />
          <button
            id="agent-camera-btn"
            type="button"
            class="agent-attach-btn"
            title="Take a photo"
            aria-label="Take a photo"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <circle cx="12" cy="13" r="3.5" stroke-width="2" />
            </svg>
          </button>
          <!-- capture opens the rear camera on phones; desktops show a file picker -->
          <input
            type="file"
            id="agent-camera-input"
            style="display:none;"
            accept="image/*"
            capture="environment"
          />

          <textarea
            id="agent-input"
            placeholder="Type your message or attach a photo…"
            rows="1"
            autocomplete="off"
            aria-label="Message to civic assistant"
          ></textarea>

          <button
            id="agent-send-btn"
            class="btn btn-primary"
            style="border-radius:20px; padding:10px 18px; white-space:nowrap;"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  `,"Civic Assistant"),Ce();const d=document.getElementById("agent-loc-btn"),u=document.getElementById("agent-loc-status"),h=document.getElementById("agent-loc-text");function m(_){u&&(u.style.display="flex"),h&&(h.textContent=_.area),d&&(d.style.display="none")}const g=si();g?m(g):$r()||d&&(d.style.display=""),d==null||d.addEventListener("click",async()=>{d&&(d.textContent="⏳ Detecting…",d.disabled=!0);try{const _=await On();m(_)}catch{d&&(d.textContent="📍 Share location",d.disabled=!1)}});const v=document.getElementById("agent-input"),b=document.getElementById("agent-send-btn"),w=document.getElementById("agent-attach-btn"),$=document.getElementById("agent-file-input");if(!v||!b)return;w==null||w.addEventListener("click",()=>{$==null||$.click()}),$==null||$.addEventListener("change",_=>{var P;return Jo((P=_.target.files)==null?void 0:P[0])});const x=document.getElementById("agent-camera-btn"),T=Kp();x==null||x.addEventListener("click",()=>T==null?void 0:T.click()),T==null||T.addEventListener("change",_=>{var P;Jo((P=_.target.files)==null?void 0:P[0]),_.target.value=""}),v.addEventListener("input",()=>{v.style.height="auto",v.style.height=Math.min(v.scrollHeight,120)+"px"}),v.addEventListener("keydown",_=>{_.key==="Enter"&&!_.shiftKey&&(_.preventDefault(),It(v.value))}),b.addEventListener("click",()=>{It(v.value)}),(E=ss())==null||E.addEventListener("click",async _=>{const P=_.target.closest(".assist-chip");if(!P)return;const R=P.getAttribute("data-reply");if(R==="__attach_photo"){$==null||$.click();return}if(R==="__share_location"){if(!si())try{m(await On())}catch{qt(an("I could not get your location. You can type a landmark or street name instead."));return}It("It's right where I am");return}It(R)}),r&&r.trim()?setTimeout(()=>It(decodeURIComponent(r)),120):v.focus(),window.addEventListener("beforeunload",()=>{Yi&&Rn.clearSession(Yi)},{once:!0})}function Ht(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const er={relatable:{primary:"#FF6B35",secondary:"#1A1A2E",accent:"#FFD700",text:"#FFFFFF"},awareness:{primary:"#2E86AB",secondary:"#1A1A2E",accent:"#A8DADC",text:"#FFFFFF"},cta:{primary:"#43AA8B",secondary:"#1A1A2E",accent:"#F8961E",text:"#FFFFFF"}};function Jp(i){const{template_type:n="awareness",headline:s,caption:o,locality:r,category:c,photoUrl:d,exportMode:u=!1}=i,h=er[n]||er.awareness,m=d?`background-image:url('${d}'); background-size:cover; background-position:center;`:`background:linear-gradient(135deg, ${h.secondary} 0%, #2d2d44 100%);`,g={relatable:"?? Relatable",awareness:"?? Awareness",cta:"CTA"}[n]||"?? Awareness",v={relatable:`
      <div style="background:rgba(0,0,0,0.65);backdrop-filter:blur(4px);padding:16px 20px;border-radius:12px;margin:0 0 8px 0;">
        <div style="font-size:22px;font-weight:800;color:${h.accent};letter-spacing:-0.5px;line-height:1.2;margin-bottom:10px;">${Ht(s)}</div>
        <div style="font-size:15px;color:#fff;line-height:1.5;">${Ht(o)}</div>
      </div>
    `,awareness:`
      <div style="background:rgba(46,134,171,0.85);backdrop-filter:blur(4px);padding:16px 20px;border-radius:12px;margin:0 0 8px 0;border-left:4px solid ${h.accent};">
        <div style="font-size:12px;color:${h.accent};font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">CIVIC ISSUE — ${Ht(c||"Infrastructure")}</div>
        <div style="font-size:20px;font-weight:700;color:#fff;line-height:1.2;margin-bottom:8px;">${Ht(s)}</div>
        <div style="font-size:14px;color:#ddd;line-height:1.5;">${Ht(o)}</div>
      </div>
    `,cta:`
      <div style="background:rgba(0,0,0,0.75);backdrop-filter:blur(4px);padding:16px 20px;border-radius:12px;margin:0 0 8px 0;">
        <div style="font-size:20px;font-weight:800;color:${h.accent};line-height:1.2;margin-bottom:8px;">${Ht(s)}</div>
        <div style="font-size:14px;color:#fff;line-height:1.5;margin-bottom:12px;">${Ht(o)}</div>
        <div style="display:inline-block;background:${h.primary};color:#fff;padding:8px 16px;border-radius:20px;font-size:13px;font-weight:700;">Report &amp; Support ?</div>
      </div>
    `}[n]||"";return`
    <div class="${u?"":"ck-meme-card"}" id="meme-preview-canvas" style="
      width:360px;
      min-height:400px;
      border-radius:${u?"0":"16px"};
      overflow:hidden;
      position:relative;
      font-family:'Inter','Segoe UI',sans-serif;
      ${m}
      display:flex;
      flex-direction:column;
      justify-content:flex-end;
    ">
      <!-- Gradient overlay -->
      <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%);"></div>

      <!-- Template label badge -->
      <div style="position:absolute;top:12px;right:12px;background:${h.primary};color:#fff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;z-index:2;">
        ${g}
      </div>

      <!-- Locality badge -->
      <div style="position:absolute;top:12px;left:12px;background:rgba(0,0,0,0.6);color:#fff;padding:4px 10px;border-radius:20px;font-size:11px;z-index:2;">
        ?? ${Ht(r)}
      </div>

      <!-- Content -->
      <div style="position:relative;z-index:2;padding:16px;">
        ${v}

        <!-- Footer (mandatory — never remove) -->
        <div style="font-size:10px;color:rgba(255,255,255,0.55);text-align:center;padding-top:6px;border-top:1px solid rgba(255,255,255,0.15);margin-top:4px;">
          Civic awareness content | Caption AI-assisted
        </div>
      </div>
    </div>
  `}function qe(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}let C={step:1,issueId:null,issue:null,config:null,myIssues:[],category:"",locality:"",photoFile:null,photoPreviewUrl:null,eligibility:null,templateType:null,aiOptions:[],selectedOption:null,editedHeadline:"",editedCaption:"",captionSource:"manual",originalAiSuggestion:null,safetyResult:null,attestationAccepted:!1,submitting:!1};async function Yr({issueId:i}){if(!kt(ne))return;const n=document.getElementById("app");n.innerHTML=Ee(`
    <div class="page-header mb-4">
      <div class="topbar-breadcrumb mb-2">
        ${i?`<a href="/entities/${i}" class="text-link">Back to Issue</a>`:'<a href="/buzz" class="text-link">Back to Civic Buzz</a>'}
      </div>
      <h1>Civic Buzz Studio</h1>
      <p class="text-secondary" style="margin-top:4px;">Create civic awareness content. Every post requires moderator approval before publication.</p>
    </div>
    <div id="meme-studio-body"></div>
  `,"Civic Buzz Studio"),Ce(),C.photoPreviewUrl&&URL.revokeObjectURL(C.photoPreviewUrl),C={...C,step:1,issueId:i?Number(i):null,issue:null,eligibility:null,config:null,myIssues:[],category:"",locality:"",photoFile:null,photoPreviewUrl:null},await Xp(i)}async function Xp(i){const n=document.getElementById("meme-studio-body");n.innerHTML='<div class="loading-overlay"><div class="spinner spinner-lg"></div></div>';try{const[s,o]=await Promise.all([D("GET","/meme/config"),D("GET","/meme/my-issues")]);if(C.config=s.data,C.myIssues=o.data||[],i){if(C.issue=C.myIssues.find(r=>Number(r.issue_id)===Number(i))||null,!C.issue){Qp(n,"Only your own approved issues can be linked.");return}C.category=C.issue.category,C.locality=C.issue.locality}eh(n)}catch(s){n.innerHTML=`<div class="alert alert-error">${qe(s.message||"Failed to load issue.")}</div>`}}function Qp(i,n){i.innerHTML=`
    <div class="alert alert-warning" style="max-width:600px;">
      <strong>? Cannot Create Meme Campaign</strong>
      <p style="margin-top:8px;">${qe(n)}</p>
      <p style="margin-top:8px;color:var(--text-secondary);font-size:0.875rem;">
        If this is a serious matter (crime, harassment, communal issues), please
        <a href="/entities/new" class="text-link">file a Grievance</a> instead.
      </p>
    </div>
  `}function eh(i){var d;const n=C.config.categories||[],s=C.config.localities||[],o=((d=C.issue)==null?void 0:d.issue_id)||"";i.innerHTML=`
    <div class="ck-studio-wizard" style="max-width:720px;">
      <h2 class="mb-2">Start a Civic Buzz post</h2>
      <p class="text-secondary mb-4">Add an issue photo, choose its category and locality, then send it for moderator review.</p>
      <label class="form-label" for="buzz-photo">Photo</label>
      <input id="buzz-photo" class="form-input mb-3" type="file" accept="image/*" capture="environment" />
      <div id="buzz-photo-preview" class="mb-4"></div>
      <label class="form-label" for="buzz-category">Category</label>
      <select id="buzz-category" class="form-input mb-3" ${o?"disabled":""}>
        <option value="">Choose a category</option>
        ${n.map(u=>`<option value="${qe(u)}" ${u===C.category?"selected":""}>${qe(u)}</option>`).join("")}
      </select>
      <label class="form-label" for="buzz-locality">Locality</label>
      <select id="buzz-locality" class="form-input mb-3" ${o?"disabled":""}>
        <option value="">Unassigned</option>
        ${s.map(u=>`<option value="${qe(u)}" ${u===C.locality?"selected":""}>${qe(u)}</option>`).join("")}
      </select>
      <label class="form-label" for="buzz-linked-issue">Link one of my approved issues (optional)</label>
      <select id="buzz-linked-issue" class="form-input mb-3">
        <option value="">Standalone post</option>
        ${C.myIssues.map(u=>`<option value="${u.issue_id}" ${Number(u.issue_id)===Number(o)?"selected":""}>${qe(u.name)} (${qe(u.category)})</option>`).join("")}
      </select>
      <div id="buzz-category-feedback" aria-live="polite" class="mb-3"></div>
      <button id="buzz-details-next" class="btn btn-primary" type="button" disabled onclick="window._memeStartBuzz()">Continue</button>
    </div>
  `;const r=document.getElementById("buzz-photo");r.addEventListener("change",()=>{var h;const u=((h=r.files)==null?void 0:h[0])||null;C.photoFile=u,C.photoPreviewUrl&&URL.revokeObjectURL(C.photoPreviewUrl),C.photoPreviewUrl=u?URL.createObjectURL(u):null,document.getElementById("buzz-photo-preview").innerHTML=C.photoPreviewUrl?`<img src="${C.photoPreviewUrl}" alt="Selected photo preview" style="max-width:100%;max-height:320px;border-radius:12px;" />`:"",c()}),document.getElementById("buzz-category").addEventListener("change",u=>{C.category=u.target.value,c()}),document.getElementById("buzz-locality").addEventListener("change",u=>{C.locality=u.target.value||"Unassigned"}),document.getElementById("buzz-linked-issue").addEventListener("change",u=>{const h=C.myIssues.find(m=>String(m.issue_id)===u.target.value)||null;C.issue=h,C.issueId=(h==null?void 0:h.issue_id)||null,h&&(C.category=h.category,C.locality=h.locality||"Unassigned",document.getElementById("buzz-category").value=C.category,document.getElementById("buzz-locality").value=C.locality==="Unassigned"?"":C.locality),document.getElementById("buzz-category").disabled=!!h,document.getElementById("buzz-locality").disabled=!!h,c()});function c(){const u=C.category.toLowerCase(),h=C.config.no_meme_categories.some(v=>u.includes(v.toLowerCase())),m=C.config.humor_allowed_categories.includes(u),g=h?'<div class="alert alert-error">This category cannot be used for Civic Buzz. Please use the <a href="/entities/new" class="text-link">Grievance form</a>.</div>':C.config.safety_sensitive_categories.some(v=>u.includes(v.toLowerCase()))?'<div class="alert alert-warning">Only neutral Awareness and CTA templates are available for this safety-sensitive category.</div>':!m&&u?'<div class="alert alert-info">Only Awareness and CTA templates are available for this category.</div>':"";document.getElementById("buzz-category-feedback").innerHTML=g,document.getElementById("buzz-details-next").disabled=!C.photoFile||!u||h}window._memeStartBuzz=()=>{const u=C.category.toLowerCase(),h=C.config.no_meme_categories.some(v=>u.includes(v.toLowerCase()));if(!C.photoFile||!u||h)return;const m=C.config.safety_sensitive_categories.some(v=>u.includes(v.toLowerCase())),g=C.config.humor_allowed_categories.includes(u);C.eligibility={eligible:!0,templateTypes:m?["awareness","cta"]:g?["relatable","awareness","cta"]:["awareness","cta"]},Jr(i)}}function Jr(i){C.step=1;const n=C.eligibility.templateTypes||[],s={relatable:{icon:"??",name:"Relatable",desc:`Light situational humor that makes people nod. "We've all been there." Perfect for everyday civic frustrations.`},awareness:{icon:"??",name:"Awareness",desc:"Factual, informative content that raises visibility for an issue. Facts from the actual report only."},cta:{icon:"??",name:"Call to Action",desc:"Energizing content that encourages citizens to report, support, or take action together."}};i.innerHTML=`
    <div class="ck-studio-wizard">
      ${Ti(2)}
      <h2 class="mb-2">Choose a Template</h2>
      <p class="text-secondary mb-4">Pick the tone that best fits this issue.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;max-width:720px;">
        ${n.map(o=>{const r=s[o]||{icon:"??",name:o,desc:""};return`
            <button class="ck-template-card" data-template="${o}" onclick="window._memePickTemplate('${o}')">
              <div style="font-size:2.5rem;margin-bottom:8px;">${r.icon}</div>
              <div style="font-weight:700;font-size:1rem;margin-bottom:6px;">${r.name}</div>
              <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.4;">${r.desc}</div>
            </button>
          `}).join("")}
      </div>
    </div>
  `,window._memePickTemplate=o=>{C.templateType=o,Xr(i)}}async function Xr(i){C.step=2,i.innerHTML=`
    <div class="ck-studio-wizard">
      ${Ti(3)}
      <h2 class="mb-2">Caption Your Meme</h2>
      <div class="loading-overlay" style="position:static;height:80px;"><div class="spinner"></div></div>
      <p class="text-secondary">Generating AI caption suggestions...</p>
    </div>
  `;let n={options:[],ai_unavailable:!1};try{n=(await D("POST","/meme/captions",{issue_id:C.issueId||null,category:C.category,locality:C.locality,template:C.templateType})).data}catch(h){n={options:[],ai_unavailable:!0,reason:h.message||"AI unavailable."}}C.aiOptions=n.options||[];const s=n.ai_unavailable?`<div class="alert alert-warning mb-3" style="max-width:640px;">
        <strong>?? AI Unavailable</strong>
        <p style="margin-top:4px;font-size:0.875rem;">${qe(n.reason||"AI caption service is temporarily unavailable. Please write your own caption below.")}</p>
        <p style="font-size:0.75rem;color:var(--text-secondary);">Note: Automated safety check flagged as "unavailable" — moderator will review manually.</p>
      </div>`:"",o=C.aiOptions.length>0?`
      <div class="mb-3" style="max-width:640px;">
        <label class="form-label mb-2"><strong>AI Suggestions (select one to pre-fill):</strong></label>
        ${C.aiOptions.map((h,m)=>`
          <button class="ck-caption-option" onclick="window._memeSelectOption(${m})" id="capopt-${m}" style="display:block;width:100%;text-align:left;padding:12px 16px;margin-bottom:8px;border-radius:8px;border:2px solid var(--border-color);background:var(--bg-secondary);cursor:pointer;">
            <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);">${qe(h.headline)}</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">${qe(h.caption)}</div>
          </button>
        `).join("")}
      </div>
    `:"";i.innerHTML=`
    <div class="ck-studio-wizard" style="max-width:720px;">
      ${Ti(3)}
      <h2 class="mb-2">Caption Your Meme</h2>
      ${s}
      ${o}

      <div class="mb-3">
        <label class="form-label" for="meme-headline">Headline <span style="color:var(--text-muted);font-size:0.8rem;">(max 60 chars)</span></label>
        <input id="meme-headline" class="form-input" type="text" maxlength="60"
          placeholder="e.g. Pothole life got real"
          value="${qe(C.editedHeadline)}"
          oninput="window._memeSafetyCheck()"
        />
        <div id="headline-chars" style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">0 / 60</div>
      </div>

      <div class="mb-3">
        <label class="form-label" for="meme-caption">Caption <span style="color:var(--text-muted);font-size:0.8rem;">(max 140 chars)</span></label>
        <textarea id="meme-caption" class="form-input" rows="3" maxlength="140"
          placeholder="e.g. Me checking the same pothole every day like it's a long-term relationship."
          oninput="window._memeSafetyCheck()"
        >${qe(C.editedCaption)}</textarea>
        <div id="caption-chars" style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">0 / 140</div>
      </div>

      <div id="safety-feedback" style="min-height:40px;"></div>

      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:16px;">
        <button class="btn btn-secondary" onclick="window._memeGoStep(1)">? Back</button>
        <button class="btn btn-primary" id="step2-next" onclick="window._memeGoStep3()" disabled>
          Next: Preview ?
        </button>
      </div>
    </div>
  `,u(),window._memeSelectOption=h=>{const m=C.aiOptions[h];m&&(C.selectedOption=m,C.editedHeadline=m.headline,C.editedCaption=m.caption,C.captionSource="ai",C.originalAiSuggestion=m,document.getElementById("meme-headline").value=m.headline,document.getElementById("meme-caption").value=m.caption,C.aiOptions.forEach((g,v)=>{const b=document.getElementById(`capopt-${v}`);b&&(b.style.borderColor=v===h?"var(--accent-primary)":"var(--border-color)")}),window._memeSafetyCheck())};let r;window._memeSafetyCheck=()=>{u(),clearTimeout(r),r=setTimeout(c,500)};async function c(){var g,v,b,w,$,x,T,E;const h=((g=document.getElementById("meme-headline"))==null?void 0:g.value)||"",m=((v=document.getElementById("meme-caption"))==null?void 0:v.value)||"";if(!h&&!m){d("",!1);return}C.captionSource==="ai"?(h!==(((b=C.selectedOption)==null?void 0:b.headline)||"")||m!==(((w=C.selectedOption)==null?void 0:w.caption)||""))&&(C.captionSource="ai_edited"):C.captionSource="manual",C.editedHeadline=h,C.editedCaption=m,d('<span style="color:var(--text-muted);">Checking...</span>',!1);try{const _=await D("POST","/meme/safety-check",{headline:h,caption:m,issue_id:C.issueId,category:C.category,template:C.templateType});if(C.safetyResult=_.data,_.data.passed)d('<span style="color:var(--success);">? Caption looks good!</span>',!0);else{const P=[...(($=_.data.deterministic)==null?void 0:$.violations)||[],...((x=_.data.ai_safety)==null?void 0:x.violations)||[]],R=((T=_.data.ai_safety)==null?void 0:T.status)==="unavailable",B=P.map(q=>`<li>${qe(q)}</li>`).join(""),V=R?'<li style="color:var(--warning);">AI safety check unavailable. This post will be flagged for moderator review.</li>':"",N=((E=_.data.deterministic)==null?void 0:E.passed)===!0;d(`<div class="alert ${N&&R?"alert-warning":"alert-error"}" style="margin:0;padding:8px 12px;"><ul style="margin:0;padding-left:18px;">${B}${V}</ul></div>`,N&&R)}}catch{C.safetyResult={passed:!1,deterministic:{passed:!1,violations:["Safety check unavailable."]},ai_safety:{safe:!1,violations:[],status:"unavailable"}},d('<span style="color:var(--warning);">Safety check unavailable. This post will be flagged for moderator review.</span>',!0)}}function d(h,m){const g=document.getElementById("safety-feedback");g&&(g.innerHTML=h);const v=document.getElementById("step2-next");v&&(v.disabled=!m)}function u(){const h=document.getElementById("meme-headline"),m=document.getElementById("meme-caption"),g=document.getElementById("headline-chars"),v=document.getElementById("caption-chars");h&&g&&(g.textContent=`${h.value.length} / 60`),m&&v&&(v.textContent=`${m.value.length} / 140`)}window._memeGoStep=h=>{h===1&&Jr(i)},window._memeGoStep3=()=>{var h,m;C.editedHeadline=((h=document.getElementById("meme-headline"))==null?void 0:h.value)||"",C.editedCaption=((m=document.getElementById("meme-caption"))==null?void 0:m.value)||"",Qr(i)}}function Qr(i){C.step=3,i.innerHTML=`
    <div class="ck-studio-wizard" style="max-width:600px;">
      ${Ti(4)}
      <h2 class="mb-2">Photo Attestation</h2>
      <p class="text-secondary mb-4">
        Confirm that you have permission to share this photo.
      </p>

      <div class="alert alert-info mb-4" style="font-size:0.875rem;line-height:1.6;">
        <strong>Your photo will be visible to the public after moderator approval.</strong>
        Please ensure it does not show:
        <ul style="margin:8px 0 0 18px;">
          <li>Identifiable faces of individuals</li>
          <li>Vehicle number plates</li>
          <li>Private property interiors</li>
          <li>Any person who has not given consent</li>
        </ul>
      </div>

      <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;padding:16px;border:2px solid var(--border-color);border-radius:8px;">
        <input type="checkbox" id="attestation-checkbox" style="margin-top:2px;width:18px;height:18px;flex-shrink:0;"
          onchange="window._memeAttestCheck(this.checked)" />
        <span style="font-size:0.875rem;line-height:1.5;">
          <strong>No identifiable faces, number plates, or private property in my photo, or I have consent.</strong>
        </span>
      </label>

      <div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap;">
        <button class="btn btn-secondary" onclick="window._memeGoStep(2)">? Back</button>
        <button class="btn btn-primary" id="step3-next" onclick="window._memeGoStep4()" disabled>
          Next: Preview ?
        </button>
      </div>
    </div>
  `,window._memeAttestCheck=n=>{C.attestationAccepted=n;const s=document.getElementById("step3-next");s&&(s.disabled=!n)},window._memeGoStep=n=>{n===2&&Xr(i)},window._memeGoStep4=()=>{if(!C.attestationAccepted){te("Please accept the attestation to continue.");return}th(i)}}function th(i){var r,c,d,u;C.step=4;const n=C.photoPreviewUrl,s=Jp({template_type:C.templateType,headline:C.editedHeadline,caption:C.editedCaption,locality:C.locality||"Unassigned",category:C.category,photoUrl:n,shareLink:C.issueId?`/entities/${C.issueId}`:null}),o=((c=(r=C.safetyResult)==null?void 0:r.ai_safety)==null?void 0:c.status)==="unavailable"?'<div class="alert alert-warning" style="font-size:0.8rem;margin-bottom:12px;max-width:420px;">?? AI safety check was unavailable. Your meme will be flagged for manual moderator review.</div>':"";i.innerHTML=`
    <div class="ck-studio-wizard">
      ${Ti(5)}
      <h2 class="mb-2">Preview Your Meme</h2>
      <p class="text-secondary mb-3">This is how your meme will appear in Civic Buzz after approval.</p>

      ${o}

      <div style="display:flex;flex-wrap:wrap;gap:32px;align-items:flex-start;">
        <div>${s}</div>

        <div style="max-width:280px;">
          <div class="mb-3">
            <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Template</div>
            <div style="font-weight:600;">${(d=C.templateType)==null?void 0:d.replace(/_/g," ")}</div>
          </div>
          <div class="mb-3">
            <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Caption Source</div>
            <div>${C.captionSource==="ai"?"?? AI-generated":C.captionSource==="ai_edited"?"?? AI-assisted + edited":"?? Manual"}</div>
          </div>
          <div class="mb-3">
            <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Linked Issue</div>
            ${C.issueId?`<a href="/entities/${C.issueId}" class="text-link">#${C.issueId} - ${qe(((u=C.issue)==null?void 0:u.name)||"")}</a>`:"<span>Standalone civic highlight</span>"}
          </div>
          <div class="alert alert-info" style="font-size:0.8rem;margin-top:12px;">
            This meme will be submitted to a moderator before being published. You can check its status in "My Memes".
          </div>
        </div>
      </div>

      <div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap;">
        <button class="btn btn-secondary" onclick="window._memeGoStep(3)">? Back</button>
        <button class="btn btn-primary" id="step4-submit" onclick="window._memeSubmit()">
          ?? Submit for Review
        </button>
      </div>
    </div>
  `,window._memeGoStep=h=>{h===3&&Qr(i)},window._memeSubmit=async()=>{if(C.submitting)return;C.submitting=!0;const h=document.getElementById("step4-submit");h&&(h.disabled=!0,h.textContent="Submitting...");try{const g=(await D("POST","/meme/campaigns",{issue_id:C.issueId,category:C.category,locality:C.locality,template:C.templateType,headline:C.editedHeadline,caption:C.editedCaption,caption_source:C.captionSource,original_ai_suggestion:C.originalAiSuggestion,attestation_accepted:!0})).data.campaign.entity_id,v=new FormData;v.append("photo",C.photoFile),await D("POST",`/meme/campaigns/${g}/photo`,null,{body:v,headers:{"X-Requested-With":"ck-web"}}),await D("POST",`/meme/campaigns/${g}/submit`),ih(i,g)}catch(m){C.submitting=!1,h&&(h.disabled=!1,h.textContent="?? Submit for Review"),te(m.message||"Submission failed. Please try again.")}}}function ih(i,n){C.step=5,i.innerHTML=`
    <div class="ck-studio-wizard" style="text-align:center;max-width:520px;margin:0 auto;">
      ${Ti(6)}
      <div style="font-size:3rem;margin-bottom:16px;">??</div>
      <h2 class="mb-2">Submitted for Review!</h2>
      <p class="text-secondary mb-4">
        Your meme campaign has been submitted to a moderator for review.
        You will be able to download and share it once it is approved and published.
      </p>
      <div class="alert alert-info mb-4" style="font-size:0.875rem;text-align:left;">
        <strong>What happens next?</strong>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>An area coordinator or admin will review your meme</li>
          <li>If approved, it will appear in Civic Buzz</li>
          <li>If rejected, you will see the reason in "My Memes"</li>
          <li>The campaign links back to your original issue automatically</li>
        </ul>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a href="/buzz" class="btn btn-secondary">View Civic Buzz</a>
        ${C.issueId?`<a href="/entities/${C.issueId}" class="btn btn-primary">Back to Issue</a>`:""}
      </div>
    </div>
  `}function Ti(i){const n=[{n:1,label:"Photo and details"},{n:2,label:"Template"},{n:3,label:"Caption"},{n:4,label:"Attestation"},{n:5,label:"Preview"},{n:6,label:"Done"}];return`
    <div class="ck-studio-steps" style="display:flex;align-items:center;gap:0;margin-bottom:28px;flex-wrap:wrap;">
      ${n.map((s,o)=>`
        <div style="display:flex;align-items:center;">
          <div style="
            width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;
            font-size:0.75rem;font-weight:700;
            background:${s.n<=i?"var(--accent-primary)":"var(--bg-tertiary)"};
            color:${s.n<=i?"#fff":"var(--text-muted)"};
          ">${s.n}</div>
          <div style="font-size:0.75rem;margin-left:6px;color:${s.n===i?"var(--text-primary)":"var(--text-muted)"};">${s.label}</div>
          ${o<n.length-1?'<div style="width:24px;height:2px;background:var(--border-color);margin:0 8px;"></div>':""}
        </div>
      `).join("")}
    </div>
  `}function Tt(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const tr='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="50%" stop-color="%230f172a"/><stop offset="100%" stop-color="%23ea580c"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g)"/><text x="50%" y="46%" font-family="system-ui,-apple-system,sans-serif" font-weight="900" font-size="28" fill="%23ffffff" text-anchor="middle" letter-spacing="1">CIVIC BUZZ</text><text x="50%" y="56%" font-family="system-ui,-apple-system,sans-serif" font-weight="600" font-size="15" fill="%23fdba74" text-anchor="middle">YOUTH-POWERED CIVIC CONVERSATION</text></svg>';let Zt="trending",ni=[];async function nh(){const i=document.getElementById("app"),n=new URLSearchParams(window.location.search),s=n.get("filter");["trending","newest","following"].includes(s)&&(Zt=s);const o=n.get("post");i.innerHTML=Ee(`
    <div class="ck-buzz-gallery-container">
      <!-- Top Hero Banner -->
      <div class="ck-buzz-gallery-hero">
        <div class="ck-buzz-gallery-hero-left">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <a href="/dashboard" class="ck-buzz-back-link">← Dashboard</a>
            <span style="color:#64748b; font-size:0.8rem;">/</span>
            <span style="color:var(--primary); font-size:0.8rem; font-weight:700;">Community</span>
          </div>
          <h1 class="ck-buzz-gallery-title">
            CIVIC BUZZ <span class="ck-buzz-flame" style="display:inline-flex; align-items:center;">${H.flame(22,"var(--primary)")}</span>
          </h1>
          <p class="ck-buzz-gallery-subtitle">
            Youth-powered civic conversations turning everyday problems into visible municipal accountability.
          </p>
        </div>

        <div class="ck-buzz-gallery-hero-right">
          ${ri()?`
          <button type="button" class="btn btn-primary" id="ck-buzz-gallery-create-btn" style="border-radius:999px; font-weight:700; padding:10px 22px; display:inline-flex; align-items:center; gap:8px;">
            <span>+</span> Create Post
          </button>
          `:""}
        </div>
      </div>

      <!-- Action & Filter Bar -->
      <div class="ck-buzz-filter-bar">
        <div class="ck-buzz-filter-chips">
          <button type="button" class="ck-buzz-chip ${Zt==="trending"?"active":""}" data-filter="trending">
            <span style="display:inline-flex; align-items:center; gap:5px;">${H.flame(13)} Trending</span>
          </button>
          <button type="button" class="ck-buzz-chip ${Zt==="newest"?"active":""}" data-filter="newest">
            <span style="display:inline-flex; align-items:center; gap:5px;">${H.zap(13)} Newest</span>
          </button>
          <button type="button" class="ck-buzz-chip ${Zt==="following"?"active":""}" data-filter="following">
            <span style="display:inline-flex; align-items:center; gap:5px;">${H.user(13)} Following</span>
          </button>
        </div>

        <div style="font-size:0.78rem; color:#64748b; font-weight:600;" id="ck-buzz-results-count">
          Loading posts...
        </div>
      </div>

      <!-- Main Gallery Content Grid -->
      <div id="ck-buzz-gallery-content" class="ck-buzz-gallery-grid">
        <!-- Loading skeletons -->
        <div class="ck-buzz-card-skeleton"></div>
        <div class="ck-buzz-card-skeleton"></div>
        <div class="ck-buzz-card-skeleton"></div>
      </div>
    </div>
  `,"Civic Buzz"),Ce(),ah(),await sn(o)}function ah(){var i;(i=document.getElementById("ck-buzz-gallery-create-btn"))==null||i.addEventListener("click",()=>{en(null,()=>sn())}),document.querySelectorAll(".ck-buzz-chip").forEach(n=>{n.addEventListener("click",async()=>{const s=n.getAttribute("data-filter");if(s!==Zt){if(s==="following"&&!He()){_t("Please sign in to view posts you are following."),ne("/login");return}Zt=s,document.querySelectorAll(".ck-buzz-chip").forEach(o=>o.classList.remove("active")),n.classList.add("active"),await sn()}})})}async function sn(i=null){const n=document.getElementById("ck-buzz-gallery-content"),s=document.getElementById("ck-buzz-results-count");if(n){n.innerHTML=`
    <div class="ck-buzz-card-skeleton"></div>
    <div class="ck-buzz-card-skeleton"></div>
    <div class="ck-buzz-card-skeleton"></div>
  `,s&&(s.textContent="Loading...");try{if(ni=(await ve.list({limit:40,sort:Zt})).data||[],s&&(s.textContent=`${ni.length} civic conversation${ni.length===1?"":"s"}`),ni.length===0){sh(n);return}if(rh(n,ni),i){const r=ni.find(c=>String(c.id)===String(i));r&&Rr(r,c=>os(c))}}catch(o){oh(n,o.message)}}}function sh(i){var s;const n=Zt==="following";i.innerHTML=`
    <div class="ck-buzz-empty-state-wrap">
      <div style="display:flex; justify-content:center; margin-bottom:8px;">${n?H.inbox(38,"#94a3b8"):H.initiative(38,"#10b981")}</div>
      <h3 style="font-size:1.15rem; font-weight:800; color:#0f172a; margin-bottom:6px;">
        ${n?"No followed posts yet":"No Civic Buzz posts found"}
      </h3>
      <p style="font-size:0.84rem; color:#64748b; max-width:440px; margin:0 auto 18px;">
        ${n?"Follow posts on the trending or newest feed to track community updates and discussions.":"Be the first to turn a local issue or neighborhood initiative into a viral civic conversation!"}
      </p>
      ${n||ri()?`
      <button type="button" class="btn btn-primary" id="ck-buzz-empty-action-btn" style="border-radius:999px; font-weight:700;">
        ${n?"Explore Trending Posts":"+ Create First Post"}
      </button>
      `:""}
    </div>
  `,(s=document.getElementById("ck-buzz-empty-action-btn"))==null||s.addEventListener("click",()=>{var o;n?(o=document.querySelector('.ck-buzz-chip[data-filter="trending"]'))==null||o.click():en(null,()=>sn())})}function oh(i,n){var s;i.innerHTML=`
    <div class="ck-buzz-empty-state-wrap" style="border-color: rgba(239,68,68,0.25); background: rgba(239,68,68,0.04);">
      <div style="display:flex; justify-content:center; color:#ef4444; margin-bottom:8px;">${H.alert(32)}</div>
      <h3 style="font-size:1.05rem; font-weight:700; color:#991b1b; margin-bottom:6px;">
        Failed to load Civic Buzz
      </h3>
      <p style="font-size:0.8rem; color:#64748b; margin-bottom:14px;">${Tt(n)}</p>
      <button type="button" class="btn btn-secondary btn-sm" id="ck-buzz-retry-btn" style="border-radius:999px;">
        Try Again
      </button>
    </div>
  `,(s=document.getElementById("ck-buzz-retry-btn"))==null||s.addEventListener("click",()=>sn())}function rh(i,n){i.innerHTML=n.map(s=>{const o=s.image_url||tr,r=s.linked_title||s.caption,c=s.views_count||0,d=s.vote_count||0,u=s.shares_count||0;return`
      <div class="ck-buzz-card" data-post-id="${s.id}">
        <!-- Media Image with Bold Meme Caption -->
        <div class="ck-buzz-card-media" data-action="open-detail">
          <img src="${Tt(o)}" alt="${Tt(s.caption)}" class="ck-buzz-card-img" onerror="this.src='${tr}'" />
          <div class="ck-buzz-card-scrim"></div>
          
          <div class="ck-buzz-card-caption">
            ${Tt(s.caption)}
          </div>

          <div class="ck-buzz-card-badges">
            <span class="ck-buzz-badge-pill">
              ${s.template==="initiative"?`<span style="display:inline-flex; align-items:center; gap:4px;">${H.initiative(11)} INITIATIVE</span>`:s.template==="awareness"?`<span style="display:inline-flex; align-items:center; gap:4px;">${H.awareness(11)} AWARENESS</span>`:`<span style="display:inline-flex; align-items:center; gap:4px;">${H.flame(11)} MEME</span>`}
            </span>
            ${s.linked_status?`
              <span class="ck-buzz-status-tag ${Tt(s.linked_status)}">
                ${Tt(s.linked_status)}
              </span>
            `:""}
          </div>
        </div>

        <!-- Details Footer -->
        <div class="ck-buzz-card-details">
          <div class="ck-buzz-card-title-row" data-action="open-detail" style="cursor: pointer;">
            <div class="ck-buzz-card-title" title="${Tt(r)}">
              ${Tt(r)}
            </div>
            ${s.linked_area?`<div class="ck-buzz-card-area" style="display:inline-flex; align-items:center; gap:3px;">${H.pin(11)} ${Tt(s.linked_area)}</div>`:""}
          </div>

          <!-- Stats Line -->
          <div class="ck-buzz-card-stats-line">
            <span style="display:inline-flex; align-items:center; gap:3px;">${H.eye(12)} ${c} views</span>
            <span>·</span>
            <span style="display:inline-flex; align-items:center; gap:3px;">${H.arrowUp(12)} ${d} upvotes</span>
            <span>·</span>
            <span style="display:inline-flex; align-items:center; gap:3px;">${H.share(12)} ${u} shares</span>
          </div>

          <!-- Quick Action Buttons -->
          <div class="ck-buzz-card-bottom-bar">
            ${ri()?`
            <button type="button" class="ck-buzz-quick-vote-btn ${s.has_voted?"active":""}" data-action="quick-vote" data-post-id="${s.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
              <span>${s.has_voted?"Upvoted":"Upvote"}</span>
            </button>
            `:""}

            <button type="button" class="ck-buzz-quick-share-btn" data-action="quick-share" data-post-id="${s.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    `}).join(""),i.addEventListener("click",async s=>{const o=s.target.closest(".ck-buzz-card");if(!o)return;const r=Number(o.getAttribute("data-post-id")),c=ni.find(h=>h.id===r);if(!c)return;if(s.target.closest('[data-action="quick-vote"]')){if(s.stopPropagation(),!He()){_t("Please sign in to upvote.");return}try{const h=await ve.vote(c.id);c.has_voted=h.voted,c.vote_count=h.vote_count,os(c)}catch(h){te(h.message||"Could not vote")}return}if(s.target.closest('[data-action="quick-share"]')){s.stopPropagation(),Qn(c);return}Rr(c,h=>os(h))})}function os(i){const n=document.querySelector(`.ck-buzz-card[data-post-id="${i.id}"]`);if(!n)return;const s=n.querySelector('[data-action="quick-vote"]');s&&(s.classList.toggle("active",i.has_voted),s.querySelector("span").textContent=i.has_voted?"Upvoted":"Upvote");const o=n.querySelector(".ck-buzz-card-stats-line");o&&(o.innerHTML=`
      <span style="display:inline-flex; align-items:center; gap:4px;">${H.eye(13,"#64748b")} ${i.views_count||0} views</span>
      <span>·</span>
      <span style="display:inline-flex; align-items:center; gap:3px;">${H.arrowUp(13,"#64748b")} ${i.vote_count||0} upvotes</span>
      <span>·</span>
      <span style="display:inline-flex; align-items:center; gap:4px;">${H.share(13,"#64748b")} ${i.shares_count||0} shares</span>
    `)}function Ye(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}async function lh(i){const n=document.getElementById("app"),s=i==null?void 0:i.id;if(!s||isNaN(Number(s))){Wa("Invalid Civic Buzz post ID.");return}n.innerHTML=Ee(`
    <div class="ck-buzz-post-page-wrap">
      <div style="text-align:center; padding: 60px 0;">
        <div class="spinner" style="margin: 0 auto 16px;"></div>
        <p style="color:#64748b; font-weight:600;">Loading Civic Buzz conversation...</p>
      </div>
    </div>
  `,"Civic Buzz"),Ce();try{const r=(await ve.get(s)).data;if(!r){Wa("Civic Buzz post not found or no longer available.");return}ve.logEvent(r.id,"view").catch(()=>{});const c=He(),d=r.linked_type==="initiative";let u="";r.image_url?u=`
        <div style="border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.12); position:relative; background:#0f172a; aspect-ratio:1/1; display:flex; align-items:center; justify-content:center;">
          <img src="${Ye(r.image_url)}" alt="${Ye(r.caption)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='${Hn}'" />
          <div class="ck-card-watermark">
            <span class="ck-wm-flame">${H.flame(14,"var(--primary)")}</span>
            <span class="ck-wm-brand">CIVIC-KALKI</span>
          </div>
        </div>
      `:u=`
        <div style="border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.12); aspect-ratio:1/1;">
          ${Br({template:r.template||"meme",style:r.style||"funny",caption:r.caption,cta_text:r.cta_text,issue:{name:r.linked_title,area:r.linked_area,status:r.linked_status,entity_id:r.linked_id}})}
        </div>
      `,n.innerHTML=Ee(`
      <div class="ck-buzz-post-page-wrap">
        <!-- Top Back Navigation -->
        <div style="margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center;">
          <a href="/buzz" class="ck-buzz-back-link" style="display:inline-flex; align-items:center; gap:6px; font-weight:700; color:var(--primary); text-decoration:none;">
            ← Back to Civic Buzz Gallery
          </a>
          <span style="font-size:0.8rem; color:#64748b;">Post #${r.id}</span>
        </div>

        <!-- Main Showcase Card -->
        <div class="ck-buzz-post-view-card">
          <!-- Left: The Visual Card -->
          <div>
            ${u}
          </div>

          <!-- Right: Details, Actions & Conversation -->
          <div style="display:flex; flex-direction:column; justify-content:space-between; gap:20px;">
            <div>
              <!-- Header Badges -->
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="ck-buzz-fire-tag" style="display:inline-flex; align-items:center; gap:4px;">${H.flame(13,"#ea580c")} CIVIC BUZZ</span>
                  <span class="ck-buzz-status-pill ${Ye(r.linked_status||"submitted")}">
                    ${Ye(r.linked_status||"Active")}
                  </span>
                </div>
                <button type="button" class="ck-buzz-icon-btn" id="ck-post-report-btn" title="Report post">
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
                </button>
              </div>

              <!-- Main Caption Headline -->
              <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; line-height: 1.3; margin: 0 0 10px;">
                ${Ye(r.caption)}
              </h2>

              ${r.cta_text?`
                <div style="display:inline-flex; align-items:center; gap:6px; background:#fff7ed; border:1px solid #fed7aa; color:#ea580c; font-weight:700; font-size:0.82rem; padding:4px 12px; border-radius:999px; margin-bottom:14px;">
                  <span style="display:inline-flex; align-items:center;">${H.zap(13,"#ea580c")}</span> CTA: ${Ye(r.cta_text)}
                </div>
              `:""}

              <!-- Linked Entity Details Box -->
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px 16px; margin-bottom:16px;">
                <div style="font-size:0.7rem; font-weight:800; color:var(--primary); text-transform:uppercase; letter-spacing:0.06em;">
                  Linked ${Ye(r.linked_type)} #${Ye(r.linked_id)}
                </div>
                <div style="font-size:0.95rem; font-weight:700; color:#1e293b; margin-top:2px;">
                  ${Ye(r.linked_title||r.caption)}
                </div>
                ${r.linked_area?`<div style="font-size:0.78rem; color:#64748b; margin-top:2px;">${H.pin(13,"#64748b")} ${Ye(r.linked_area)}</div>`:""}
              </div>

              <!-- Metrics Row -->
              <div style="font-size: 0.8rem; color: #64748b; font-weight: 600; display:flex; gap:14px; margin-bottom:18px;">
                <span>${H.eye(14,"#64748b")} ${r.views_count} views</span>
                <span>${H.arrowUp(14,"#64748b")} <span id="ck-post-vote-count">${r.vote_count}</span> upvotes</span>
                <span>${H.share(14,"#64748b")} ${r.shares_count} shares</span>
              </div>

              <!-- Key CTA Buttons -->
              <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:20px;">
                <!-- View Issue Button (Mandatory) -->
                <button type="button" class="btn btn-primary" id="ck-post-view-issue-btn" style="flex:1; min-width:140px; font-weight:700; border-radius:999px; padding:10px 18px;">
                  View Issue →
                </button>

                <!-- Share Button (Mandatory) -->
                <button type="button" class="btn btn-secondary" id="ck-post-share-btn" style="border-radius:999px; font-weight:700; padding:10px 18px; display:inline-flex; align-items:center; gap:6px;">
                  <span style="display:inline-flex; align-items:center;">${H.share(14,"currentColor")}</span> Share
                </button>

                <!-- Upvote Toggle -->
                ${ri()?`
                <button type="button" class="ck-buzz-act-btn ${r.has_voted?"active":""}" id="ck-post-upvote-btn" style="border-radius:999px;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                  <span id="ck-post-vote-label">${r.has_voted?"Upvoted":"Upvote"}</span>
                </button>
                `:""}

                ${d?`
                  <button type="button" class="btn btn-secondary" id="ck-post-join-btn" style="border-radius:999px; font-weight:700; color:#059669; border-color:#a7f3d0; background:#ecfdf5; display:inline-flex; align-items:center; gap:6px;">
                    <span style="display:inline-flex; align-items:center;">${H.handshake(15,"#059669")}</span> <span>Join Initiative</span>
                  </button>
                `:""}
              </div>
            </div>

            <!-- Comments Section -->
            <div style="border-top:1px solid #e2e8f0; padding-top:16px;">
              <h4 style="font-size:0.9rem; font-weight:700; margin:0 0 10px; color:#0f172a;">
                Community Conversation
              </h4>

              <div class="ck-buzz-comment-input-row" style="margin-bottom:12px;">
                <input
                  type="text"
                  id="ck-post-comment-input"
                  class="ck-buzz-comment-input"
                  placeholder="${c?"Add to the conversation...":"Sign in to comment..."}"
                  ${c?"":"disabled"}
                  maxlength="500"
                />
                <button type="button" id="ck-post-comment-send" class="btn btn-primary btn-sm" style="border-radius:999px;" ${c?"":"disabled"}>
                  Post
                </button>
              </div>

              <div id="ck-post-comments-list" class="ck-buzz-comments-list" style="max-height:220px;">
                <div style="text-align:center; padding:12px; color:#94a3b8; font-size:0.8rem;">
                  Loading comments...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,`Civic Buzz #${r.id}`),Ce(),ch(r),dh(r.id)}catch(o){Wa(o.message||"Error loading post.")}}function Wa(i){const n=document.getElementById("app");n.innerHTML=Ee(`
    <div class="ck-buzz-post-page-wrap" style="text-align:center; padding:60px 20px;">
      <div style="font-size:3rem; margin-bottom:12px; display:flex; justify-content:center; color:var(--primary);">${H.flame(52,"var(--primary)")}</div>
      <h2 style="font-size:1.5rem; font-weight:800; color:#0f172a; margin-bottom:8px;">Civic Buzz Post Not Found</h2>
      <p style="color:#64748b; max-width:440px; margin:0 auto 20px;">${Ye(i)}</p>
      <a href="/buzz" class="btn btn-primary" style="border-radius:999px; font-weight:700;">Explore Civic Buzz Gallery</a>
    </div>
  `,"Post Not Found"),Ce()}function ch(i){var r,c,d,u;(r=document.getElementById("ck-post-view-issue-btn"))==null||r.addEventListener("click",()=>{ve.logEvent(i.id,"click_issue").catch(()=>{}),ne(`/entities/${i.linked_id}`)}),(c=document.getElementById("ck-post-share-btn"))==null||c.addEventListener("click",()=>{Qn(i)});const n=document.getElementById("ck-post-upvote-btn"),s=document.getElementById("ck-post-vote-count"),o=document.getElementById("ck-post-vote-label");n==null||n.addEventListener("click",async()=>{if(!He()){_t("Please sign in to upvote."),ne("/login");return}try{const h=await ve.vote(i.id);h.voted?(n.classList.add("active"),o.textContent="Upvoted"):(n.classList.remove("active"),o.textContent="Upvote"),s.textContent=h.vote_count}catch(h){te(h.message||"Could not vote")}}),(d=document.getElementById("ck-post-report-btn"))==null||d.addEventListener("click",()=>{const h=window.prompt(`Why are you reporting this Civic Buzz post?
(e.g., Offensive language, personal data, misleading claim)`);h&&h.trim()&&ve.report(i.id,h.trim()).then(m=>{ye(m.message||"Report received. Thank you for keeping our community safe.")}).catch(m=>{te(m.message||"Could not report post")})}),(u=document.getElementById("ck-post-join-btn"))==null||u.addEventListener("click",()=>{ve.logEvent(i.id,"join").catch(()=>{}),ye("Thanks for raising your hand! Redirecting to initiative..."),setTimeout(()=>ne(`/entities/${i.linked_id}`),800)})}async function dh(i){const n=document.getElementById("ck-post-comments-list"),s=document.getElementById("ck-post-comment-send"),o=document.getElementById("ck-post-comment-input");if(!n)return;async function r(){try{const d=(await ve.getComments(i)).data||[];if(d.length===0){n.innerHTML='<div style="text-align:center; padding:12px; color:#94a3b8; font-size:0.8rem;">No comments yet. Start the conversation!</div>';return}n.innerHTML=d.map(u=>`
        <div class="ck-buzz-comment-item">
          <div class="ck-buzz-comment-meta">
            <span class="ck-buzz-comment-author" style="display:inline-flex; align-items:center; gap:4px;">${H.user(13,"#64748b")} ${Ye(u.author_name)}</span>
            <span class="ck-buzz-comment-time">${new Date(u.created_at).toLocaleDateString()}</span>
          </div>
          <div class="ck-buzz-comment-text">${Ye(u.text)}</div>
        </div>
      `).join("")}catch{n.innerHTML='<div style="text-align:center; padding:10px; color:#ef4444; font-size:0.75rem;">Failed to load comments</div>'}}s==null||s.addEventListener("click",async()=>{var d;const c=o==null?void 0:o.value.trim();if(c){s.disabled=!0;try{await ve.addComment(i,c),o.value="",ye("Comment posted!"),await r()}catch(u){te(((d=u.data)==null?void 0:d.message)||u.message||"Failed to post comment")}finally{s.disabled=!1}}}),await r()}delete Ie.Icon.Default.prototype._getIconUrl;Ie.Icon.Default.mergeOptions({iconRetinaUrl:fs,iconUrl:gs,shadowUrl:vs});const uh="https://tile.openstreetmap.org/{z}/{x}/{y}.png",ph='© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';let Ze=null,An=null,Gi=null;async function el(){const i=document.getElementById("app"),n=`
    <div style="max-width:1200px; margin:0 auto; padding-bottom:40px;">
      <!-- Hero Banner -->
      <div class="card mb-6" style="background:linear-gradient(150deg, #0f3b40 0%, #0b2f36 55%, #0a2530 100%); color:#fff; border:none; padding:28px; border-radius:20px; box-shadow:var(--shadow-lg);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
          <div style="max-width:650px;">
            <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(var(--primary-rgb),0.2); border:1px solid rgba(var(--primary-rgb),0.4); padding:4px 12px; border-radius:20px; font-size:12px; font-weight:700; color:var(--primary-500); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:12px;">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Civic Geo-Intelligence
            </div>
            <h1 style="font-size:2rem; font-weight:800; line-height:1.2; margin-bottom:10px; color:#ffffff;">Nearby Civic Protests & Operations</h1>
            <p style="color:#94a3b8; font-size:14px; margin-bottom:0; line-height:1.6;">
              Locate public, approved civic rallies, protests, and community campaigns within your vicinity.
              Location coordinates are verified and publicly accessible once officially authorized.
            </p>
          </div>
          
          <div style="display:flex; flex-direction:column; gap:10px; align-items:flex-end;">
            <button id="btn-detect-location" class="btn btn-primary" style="padding:12px 24px; font-size:15px; font-weight:700; box-shadow:0 4px 14px rgba(var(--primary-rgb),0.4); display:inline-flex; align-items:center; gap:8px;">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Find Protests Near Me
            </button>
            <div style="display:flex; align-items:center; gap:12px; font-size:12px; color:#cbd5e1; flex-wrap:wrap;">
              <div style="display:flex; align-items:center; gap:6px;">
                <span>Filter:</span>
                <select id="select-filter-mode" style="background:#334155; color:#fff; border:1px solid #475569; border-radius:6px; padding:4px 8px; font-size:12px; font-weight:600; cursor:pointer;">
                  <option value="all">All Nearby</option>
                  <option value="trending">🔥 Trending</option>
                </select>
              </div>
              <div style="display:flex; align-items:center; gap:6px;">
                <span>Search Radius:</span>
                <select id="select-radius" style="background:#334155; color:#fff; border:1px solid #475569; border-radius:6px; padding:4px 8px; font-size:12px; font-weight:600; cursor:pointer;">
                  <option value="5">5 km</option>
                  <option value="10" selected>10 km (Default)</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km (Max)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Grid: Map & Results List -->
      <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:20px;" class="nearby-grid">
        <!-- Interactive Leaflet Map Container -->
        <div class="card" style="padding:0; overflow:hidden; border-radius:10px; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; height:580px;">
          <div style="padding:14px 18px; background:var(--surface); border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center;">
            <div style="font-weight:700; font-size:14px; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--primary);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
              Live Map Radar
            </div>
            <div id="map-status-pill" style="font-size:11px; color:var(--text-muted);">
              Awaiting location permission
            </div>
          </div>
          <div id="nearby-map" style="flex:1; width:100%; background:#e2e8f0; z-index:1;"></div>
        </div>

        <!-- Protests List Container -->
        <div class="card" style="padding:0; overflow:hidden; border-radius:10px; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; height:580px;">
          <div style="padding:14px 18px; background:var(--surface); border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center;">
            <div style="font-weight:700; font-size:14px; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--primary);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
              Nearby Records
            </div>
            <span id="results-count-badge" class="badge badge-secondary" style="font-weight:700;">0 found</span>
          </div>

          <div id="nearby-results-list" style="flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px; background:var(--gray-50);">
            <!-- Empty state default -->
            <div style="text-align:center; padding:60px 20px; color:var(--text-muted);">
              <div style="width:48px; height:48px; border-radius:50%; background:var(--surface); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; margin:0 auto 12px auto; color:var(--text-muted);">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div style="font-weight:600; color:var(--text-primary); margin-bottom:4px;">No Search Initiated</div>
              <div style="font-size:13px; max-width:320px; margin:0 auto;">Click "Find Protests Near Me" above to discover verified civic events around your current location.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;i.innerHTML=Ee(n,"Nearby Civic Protests"),Ce(),hh()}function hh(){const i=document.getElementById("nearby-map"),n=document.getElementById("btn-detect-location"),s=document.getElementById("select-radius"),o=document.getElementById("select-filter-mode"),r=document.getElementById("nearby-results-list"),c=document.getElementById("results-count-badge"),d=document.getElementById("map-status-pill");new URLSearchParams(window.location.search).get("filter")==="trending"&&o&&(o.value="trending");let h=null,m=[];i&&(Ze&&(Ze.remove(),Ze=null),Ze=Ie.map(i,{center:[28.6139,77.209],zoom:12,zoomControl:!0,attributionControl:!0}),Ie.tileLayer(uh,{attribution:ph,maxZoom:19}).addTo(Ze),Gi=Ie.layerGroup().addTo(Ze),setTimeout(()=>{Ze&&Ze.invalidateSize()},200));async function g(b,w,$){r&&(r.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:var(--text-muted);">
          <div class="spinner" style="width:32px; height:32px; border-width:3px; margin-bottom:12px;"></div>
          <div style="font-size:13px;">Scanning within ${$} km radius...</div>
        </div>
      `);try{m=(await fe.nearby(b,w,$)).data||[];const E=(o==null?void 0:o.value)==="trending"?[...m].sort((_,P)=>(P.citizens_count||P.entity_id)-(_.citizens_count||_.entity_id)):m;c&&(c.textContent=`${E.length} found`,c.className=E.length>0?"badge badge-primary":"badge badge-secondary"),d&&(d.textContent=`Showing ${E.length} records within ${$} km`),v(E,b,w)}catch(x){console.error("[NearbyProtests] Fetch error:",x),te(x.message||"Failed to search nearby events"),r&&(r.innerHTML=`
          <div style="padding:40px 20px; text-align:center; color:#dc2626;">
            <div style="font-weight:600; margin-bottom:4px;">Search Error</div>
            <div style="font-size:13px;">${ki(x.message||"Could not load nearby events")}</div>
          </div>
        `)}}function v(b,w,$){if(!r)return;Gi&&Gi.clearLayers(),An&&Ze&&Ze.removeLayer(An);const x=Ie.divIcon({className:"user-radar-pin",html:'<div style="background:#2563eb; width:18px; height:18px; border-radius:50%; border:3px solid #ffffff; box-shadow:0 0 10px rgba(37,99,235,0.8); animation:pulse 2s infinite;"></div>',iconSize:[18,18],iconAnchor:[9,9]});if(An=Ie.marker([w,$],{icon:x}).addTo(Ze),An.bindPopup("<strong>Your Location</strong>"),b.length===0){r.innerHTML=`
        <div style="text-align:center; padding:60px 20px; color:var(--text-muted);">
          <div style="font-weight:600; color:var(--text-primary); margin-bottom:4px;">No Approved Protests Found</div>
          <div style="font-size:13px; max-width:320px; margin:0 auto;">
            There are currently no public, approved civic rallies or protests within ${s.value} km.
            Try expanding the search radius.
          </div>
        </div>
      `,Ze.setView([w,$],13);return}const T=Ie.latLngBounds([[w,$]]),E=b.map(_=>{var N,A;const P=_.latitude,R=_.longitude,B=_.distance_km!=null?`${Number(_.distance_km).toFixed(1)} km away`:"",V=_.maps_url||`https://www.google.com/maps/search/?api=1&query=${P},${R}`;return P!=null&&R!=null&&Gi&&(T.extend([P,R]),Ie.marker([P,R]).addTo(Gi).bindPopup(`
          <div style="padding:4px; max-width:220px;">
            <div style="font-weight:700; font-size:13px; color:#0f172a; margin-bottom:4px;">${ki(_.name)}</div>
            <div style="font-size:11px; color:#64748b; margin-bottom:6px;">${ki(((N=_.entityType)==null?void 0:N.name)||"Civic Event")} • ${B}</div>
            <a href="${V}" target="_blank" rel="noopener noreferrer" style="display:inline-block; font-size:11px; color:var(--primary); font-weight:600; text-decoration:none;">Open in Google Maps →</a>
          </div>
        `)),`
        <div class="card" style="padding:14px; border:1px solid var(--border); background:var(--surface); border-radius:8px; transition:all 0.2s ease;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:6px;">
            <div>
              <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700; letter-spacing:0.04em;">
                ${ki(((A=_.entityType)==null?void 0:A.name)||"Event")}
              </div>
              <a href="/entities/${_.entity_id}" class="text-link" style="font-size:15px; font-weight:700; color:var(--text-primary); text-decoration:none;">
                ${ki(_.name)}
              </a>
            </div>
            <span class="badge badge-success" style="font-size:11px; flex-shrink:0;">Approved</span>
          </div>

          <div style="font-size:12px; color:var(--text-secondary); margin-bottom:10px;">
            ${_.area?`<span>Area: <strong>${ki(_.area)}</strong></span> • `:""}
            <span>Distance: <strong style="color:var(--primary);">${B}</strong></span>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:10px; font-size:12px;">
            <a href="/entities/${_.entity_id}" class="btn btn-secondary btn-sm" style="font-size:12px; padding:4px 10px;">
              View Details
            </a>
            <a href="${V}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="font-size:12px; padding:4px 10px; display:inline-flex; align-items:center; gap:4px;">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              Open in Maps
            </a>
          </div>
        </div>
      `}).join("");r.innerHTML=E,Ze&&T.isValid()&&Ze.fitBounds(T,{padding:[40,40],maxZoom:15})}n&&n.addEventListener("click",()=>{if(!navigator.geolocation){te("Geolocation is not supported by your browser.");return}n.disabled=!0;const b=n.innerHTML;n.innerHTML='<span class="spinner" style="width:16px;height:16px;border-width:2px;margin-right:8px;"></span> Locating...',navigator.geolocation.getCurrentPosition(w=>{n.disabled=!1,n.innerHTML=b,h={latitude:w.coords.latitude,longitude:w.coords.longitude},ye("Location detected! Searching nearby records...");const $=Number(s?s.value:10);g(h.latitude,h.longitude,$)},w=>{n.disabled=!1,n.innerHTML=b;let $="Could not access your location.";w.code===1?$="Location permission was denied. Please allow location access in your browser.":w.code===2?$="Location unavailable.":w.code===3&&($="Location request timed out."),te($)},{timeout:1e4,enableHighAccuracy:!0})}),s&&s.addEventListener("change",()=>{h&&g(h.latitude,h.longitude,Number(s.value))})}function ki(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}_e("/",Oc);_e("/login",Vc);_e("/signup",Wc);_e("/dashboard",na);_e("/governance",Hp);_e("/modules",Bp);_e("/entities",yu);_e("/entities/new",qr);_e("/report",qr);_e("/entities/:id",aa);_e("/nearby",el);_e("/protests/nearby",el);_e("/admin",ep);_e("/module-builder",rp);_e("/reports",xp);_e("/profile",sp);_e("/director",na);_e("/coordinator",na);_e("/workspace",na);_e("/agent/chat",Yp);_e("/meme/studio",Yr);_e("/meme/studio/:issueId",Yr);_e("/buzz",nh);_e("/buzz/:id",lh);ar(()=>{document.getElementById("app").innerHTML=`
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; text-align:center; padding:24px;">
      <h1 style="font-size:4rem; color:var(--text-muted); font-weight:800;">404</h1>
      <h2 style="margin-bottom:var(--space-4); color:var(--text-primary);">Page Not Found</h2>
      <p style="color:var(--text-secondary); margin-bottom:var(--space-6);">The requested page does not exist or has been moved.</p>
      <a href="/" class="btn btn-primary">Go to CIVIC-KALKI Home</a>
    </div>
  `});window.addEventListener("auth:expired",()=>{Ci(()=>Promise.resolve().then(()=>Zc),void 0).then(i=>{i.toastWarning("Your session has expired. Please sign in again.")}),Ci(()=>Promise.resolve().then(()=>Ec),void 0).then(i=>i.navigate("/login"))});const Ga=document.getElementById("app");Ga&&!Ga.innerHTML.trim()&&(Ga.innerHTML=`
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; gap:16px;">
      <div class="spinner" style="width:36px; height:36px; border-width:3px;"></div>
      <div style="font-size:14px; font-weight:600; color:var(--text-secondary);">Loading CIVIC-KALKI...</div>
    </div>
  `);Cc().finally(()=>{sr(),Rc()});export{Ci as _,wu as c,xu as g};
