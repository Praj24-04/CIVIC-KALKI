const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-DK5CIhWu.js","assets/browser-CIZFGh__.js","assets/index-CB9BIZx8.js"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function o(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=o(l);fetch(l.href,c)}})();const ld="modulepreload",dd=function(i){return"/"+i},ys={},gi=function(n,o,s){let l=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));l=Promise.allSettled(o.map(h=>{if(h=dd(h),h in ys)return;ys[h]=!0;const f=h.endsWith(".css"),g=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${g}`))return;const v=document.createElement("link");if(v.rel=f?"stylesheet":ld,f||(v.as="script"),v.crossOrigin="",v.href=h,p&&v.setAttribute("nonce",p),document.head.appendChild(v),f)return new Promise((b,w)=>{v.addEventListener("load",b),v.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${h}`)))})}))}function c(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return l.then(u=>{for(const p of u||[])p.status==="rejected"&&c(p.reason);return n().catch(c)})},qs=[];let Us=()=>{};function _e(i,n){qs.push({path:i,handler:n})}function Zs(i){Us=i}function cd(i){const n=[...qs].sort((o,s)=>{const l=o.path.includes(":"),c=s.path.includes(":");return!l&&c?-1:l&&!c?1:0});for(const o of n){const s=[],l=o.path.replace(/:([^/]+)/g,(p,h)=>(s.push(h),"([^/]+)")).replace(/\//g,"\\/"),c=new RegExp(`^${l}$`),u=i.match(c);if(u){const p={};return s.forEach((h,f)=>{p[h]=decodeURIComponent(u[f+1])}),{handler:o.handler,params:p,path:o.path}}}return null}function X(i){window.history.pushState({},"",i),Oa(window.location.href)}function Oa(i=window.location.href){const n=new URL(i,window.location.origin);let o=n.pathname;o.length>1&&o.endsWith("/")&&(o=o.slice(0,-1));const s=cd(o);if(s){const l=s.handler(s.params,n.searchParams);l&&typeof l.then=="function"&&l.then(()=>{window.dispatchEvent(new CustomEvent("civic:route-rendered",{detail:{pathname:o,async:!0}}))}).catch(c=>{console.error("[Router Error]:",c)})}else Us();window.dispatchEvent(new CustomEvent("civic:route-rendered",{detail:{pathname:o}}))}function Vs(){window.navigate=X,window.addEventListener("popstate",()=>Oa(window.location.href));const i=document.getElementById("app");i&&i.addEventListener("click",n=>{const o=n.target.closest("a[href]");if(!o)return;const s=o.getAttribute("href");!s||s.startsWith("http")||s.startsWith("mailto:")||s.startsWith("#")||(n.preventDefault(),X(s))}),Oa(window.location.href)}const ud=Object.freeze(Object.defineProperty({__proto__:null,addRoute:_e,initRouter:Vs,navigate:X,onNotFound:Zs},Symbol.toStringTag,{value:"Module"}));let Je=null,ct=null,Vt=null,Ii=null;async function Ws(){try{const i=await fetch("/api/auth/me",{credentials:"include",headers:{"X-Requested-With":"ck-web"}});if(!i.ok)return Je=null,ct=null,null;const n=await i.json();return n.success&&n.data?(Je=n.data.user||null,ct=n.data.expires_at||null,Gs(),Je):(Je=null,ct=null,null)}catch{return Je=null,ct=null,null}}function Gs(){if(Vt&&clearTimeout(Vt),!ct)return;const i=new Date(ct).getTime()-Date.now();i>0&&(Vt=setTimeout(()=>{Je=null,ct=null,Vt=null},i))}async function pd(){return Ii||(Ii=Ws().finally(()=>{Ii=null}),Ii)}function He(){return Je}function Pn(){return(Je==null?void 0:Je.role)||null}function Bn(){return Je?ct?new Date(ct).getTime()>Date.now():!0:!1}function Ks(i){i&&(Je=i.user||(i.user_id?i:null),ct=i.expires_at||null,Gs())}function Ya(){Je=null,ct=null,Vt&&(clearTimeout(Vt),Vt=null)}async function hd(){return Ws()}function yt(i){return Bn()?!0:(i("/login"),!1)}function Ja(i,n){if(!yt(n))return!1;const o=Pn();return i.includes(o)?!0:(n("/dashboard"),!1)}const md={citizen:"Citizen",coordinator_area:"Area Coordinator",coordinator_general:"General Coordinator",director:"Director",admin:"Administrator"};function Ri(i){return md[i]||i}const Na=[{code:"en",name:"English",nativeName:"English",region:"Pan-India / Official",popular:!0},{code:"hi",name:"Hindi",nativeName:"हिन्दी",region:"North & Central India",popular:!0},{code:"mr",name:"Marathi",nativeName:"मराठी",region:"Maharashtra",popular:!0},{code:"ta",name:"Tamil",nativeName:"தமிழ்",region:"Tamil Nadu & Puducherry",popular:!0},{code:"te",name:"Telugu",nativeName:"తెలుగు",region:"Andhra Pradesh & Telangana",popular:!0},{code:"bn",name:"Bengali",nativeName:"বাংলা",region:"West Bengal & Tripura",popular:!0},{code:"gu",name:"Gujarati",nativeName:"ગુજરાતી",region:"Gujarat",popular:!0},{code:"kn",name:"Kannada",nativeName:"ಕನ್ನಡ",region:"Karnataka",popular:!0},{code:"ml",name:"Malayalam",nativeName:"മലയാളം",region:"Kerala & Lakshadweep",popular:!0},{code:"pa",name:"Punjabi",nativeName:"ਪੰਜਾਬੀ",region:"Punjab",popular:!0},{code:"ur",name:"Urdu",nativeName:"اردو",region:"Pan-India",popular:!0},{code:"as",name:"Assamese",nativeName:"অসমীয়া",region:"Assam"},{code:"bho",name:"Bhojpuri",nativeName:"भोजपुरी",region:"Bihar & Uttar Pradesh"},{code:"doi",name:"Dogri",nativeName:"डोगरी",region:"Jammu & Kashmir"},{code:"gom",name:"Konkani",nativeName:"कोंकणी",region:"Goa & Konkan"},{code:"mai",name:"Maithili",nativeName:"मैथिली",region:"Bihar & Jharkhand"},{code:"mni-Mtei",name:"Meiteilon (Manipuri)",nativeName:"ꯃꯤꯇꯩꯂꯣꯟ",region:"Manipur"},{code:"lus",name:"Mizo",nativeName:"Mizo ṭawng",region:"Mizoram"},{code:"ne",name:"Nepali",nativeName:"नेपाली",region:"Sikkim & West Bengal"},{code:"or",name:"Odia",nativeName:"ଓଡ଼ିଆ",region:"Odisha"},{code:"sa",name:"Sanskrit",nativeName:"संस्कृतम्",region:"Classical Language"},{code:"sd",name:"Sindhi",nativeName:"سنڌي",region:"Sindhi"}],Ys="civic_kalki_lang";function hi(){return localStorage.getItem(Ys)||"en"}function Js(i){return Na.find(n=>n.code.toLowerCase()===(i||"").toLowerCase())||{code:i||"en",name:"English",nativeName:"English",region:"Official"}}function Xs(i){try{const n=localStorage.getItem(`civic_trans_${i}`);return n?JSON.parse(n):{}}catch{return{}}}function fd(i,n){try{const s={...Xs(i),...n};localStorage.setItem(`civic_trans_${i}`,JSON.stringify(s))}catch{}}function Qs(){["googtrans","googtrans_opt","__googtrans"].forEach(n=>{document.cookie=`${n}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`,window.location.hostname&&(document.cookie=`${n}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`,document.cookie=`${n}=; path=/; domain=.${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`)}),document.querySelectorAll(".goog-te-banner-frame, iframe.goog-te-banner-frame, #google_translate_element, #goog-gt-tt, .goog-te-balloon-frame").forEach(n=>{try{n.remove()}catch{}}),document.body&&(document.body.style.top="0px",document.body.style.position="static")}function gd(i){const n=[],o=[],s=[],l=new Set,c=document.createTreeWalker(i,NodeFilter.SHOW_TEXT,{acceptNode(u){if(!u.nodeValue)return NodeFilter.FILTER_REJECT;const p=u.parentElement;if(!p)return NodeFilter.FILTER_REJECT;const h=p.tagName.toLowerCase();if(["script","style","code","pre","textarea"].includes(h)||p.closest(".notranslate, .lang-dropdown-container, .lang-dropdown-menu"))return NodeFilter.FILTER_REJECT;const f=(u._civicOriginal!==void 0?u._civicOriginal:u.nodeValue).trim();return!f||/^[\d\s\-_.,/\\:;!@#$%^&*()=+~`|<>?"'’]+$/.test(f)||/^#?[A-Za-z]{1,5}-\d+$/.test(f)||/^#\d+$/.test(f)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});for(;c.nextNode();){const u=c.currentNode;u._civicOriginal===void 0&&(u._civicOriginal=u.nodeValue);const p=u._civicOriginal.trim();p&&(n.push({node:u,original:p}),l.add(p))}return i.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(u=>{if(u.closest(".notranslate, .lang-dropdown-container, .lang-dropdown-menu"))return;u._civicOriginalPlaceholder===void 0&&(u._civicOriginalPlaceholder=u.placeholder);const p=(u._civicOriginalPlaceholder||"").trim();p&&!/^[\d\s]+$/.test(p)&&(o.push({element:u,original:p}),l.add(p))}),i.querySelectorAll("[title]").forEach(u=>{if(u.closest(".notranslate, .lang-dropdown-container, .lang-dropdown-menu"))return;u._civicOriginalTitle===void 0&&(u._civicOriginalTitle=u.title);const p=(u._civicOriginalTitle||"").trim();p&&!/^[\d\s]+$/.test(p)&&(s.push({element:u,original:p}),l.add(p))}),{textItems:n,placeholderItems:o,titleItems:s,uniqueStrings:Array.from(l)}}function vd(i=document.getElementById("app")){if(!i)return;const n=document.createTreeWalker(i,NodeFilter.SHOW_TEXT,null);for(;n.nextNode();){const o=n.currentNode;o._civicOriginal!==void 0&&(o.nodeValue=o._civicOriginal)}i.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(o=>{o._civicOriginalPlaceholder!==void 0&&(o.placeholder=o._civicOriginalPlaceholder)}),i.querySelectorAll("[title]").forEach(o=>{o._civicOriginalTitle!==void 0&&(o.title=o._civicOriginalTitle)})}let La=!1,$a=!1,ja=!1;async function mi(i){const n=i||hi(),o=document.getElementById("app")||document.body;if(!o)return;if(n==="en"){vd(o);return}const{textItems:s,placeholderItems:l,titleItems:c,uniqueStrings:u}=gd(o);if(u.length===0)return;const p=Xs(n),h=[],f=()=>{ja=!0;try{s.forEach(({node:g,original:v})=>{if(p[v])if(g._civicOriginal&&g._civicOriginal.trim()===v){const b=g._civicOriginal.match(/^\s*/)[0],w=g._civicOriginal.match(/\s*$/)[0];g.nodeValue=b+p[v]+w}else g._civicOriginal&&(g.nodeValue=g._civicOriginal.replace(v,p[v]))}),l.forEach(({element:g,original:v})=>{p[v]&&(g.placeholder=p[v])}),c.forEach(({element:g,original:v})=>{p[v]&&(g.title=p[v])})}finally{setTimeout(()=>{ja=!1},40)}};if(f(),u.forEach(g=>{p[g]||h.push(g)}),h.length!==0){if(La){$a=!0;return}La=!0;try{const g=await fetch("/api/translate",{method:"POST",headers:{"Content-Type":"application/json","X-Requested-With":"ck-web"},body:JSON.stringify({texts:h,targetLang:n})});if(g.ok){const v=await g.json();v&&v.translations&&(fd(n,v.translations),Object.assign(p,v.translations),f())}}catch(g){console.error("[Translation Service Error]:",g)}finally{La=!1,$a&&($a=!1,setTimeout(()=>{mi(n)},50))}}}function bs(i){const n=(i||"en").trim();localStorage.setItem(Ys,n),Qs(),yd(n),mi(n)}function Rn(i={}){const n=i.idPrefix||"topbar",o=hi(),s=Js(o),l=Na.filter(c=>c.popular);return`
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
          ${it(s.nativeName||s.name)}
        </span>
        <span class="lang-badge">${it(o.toUpperCase().slice(0,5))}</span>
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
            ${l.map(c=>`
              <button 
                type="button" 
                class="lang-chip ${c.code===o?"active":""}" 
                data-lang="${c.code}"
                title="${it(c.name)} (${it(c.region)})"
              >
                ${it(c.nativeName)}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="lang-section-label" style="padding: 6px 14px 2px;">Official & Regional Languages</div>

        <!-- Full Scrollable List -->
        <div class="lang-options-scroll" id="${n}-lang-list">
          ${Na.map(c=>{const u=c.code===o;return`
              <div 
                class="lang-option-row ${u?"selected":""}" 
                data-lang="${c.code}" 
                data-name="${it(c.name.toLowerCase())}" 
                data-native="${it(c.nativeName.toLowerCase())}"
                data-region="${it((c.region||"").toLowerCase())}"
                role="button"
                tabindex="0"
              >
                <div class="lang-names-wrap">
                  <span class="lang-native-name">${it(c.nativeName)}</span>
                  <span class="lang-english-name">${it(c.name)} • <span style="opacity:0.75;">${it(c.region)}</span></span>
                </div>
                <div class="lang-code-pill">${it(c.code)}</div>
                ${u?`
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
  `}function On(i="topbar"){const n=document.getElementById(`${i}-lang-container`),o=document.getElementById(`${i}-lang-btn`),s=document.getElementById(`${i}-lang-dropdown`),l=document.getElementById(`${i}-lang-search`),c=document.getElementById(`${i}-lang-clear`),u=document.getElementById(`${i}-lang-list`),p=document.getElementById(`${i}-lang-reset`),h=document.getElementById(`${i}-lang-popular-section`);if(!(!n||!o||!s)){if(o.addEventListener("click",f=>{f.stopPropagation();const g=s.classList.contains("show");document.querySelectorAll(".lang-dropdown-menu.show").forEach(v=>{v!==s&&v.classList.remove("show")}),s.classList.toggle("show",!g),o.setAttribute("aria-expanded",String(!g)),!g&&l&&setTimeout(()=>l.focus(),50)}),s.addEventListener("click",f=>{f.stopPropagation();const g=f.target.closest("[data-lang]");if(g){const v=g.getAttribute("data-lang");v&&(s.classList.remove("show"),o.setAttribute("aria-expanded","false"),bs(v))}}),l&&u){const f=Array.from(u.querySelectorAll(".lang-option-row")),g=()=>{const v=(l.value||"").trim().toLowerCase();c==null||c.classList.toggle("hidden",v.length===0),h&&(h.style.display=v.length>0?"none":"block");let b=0;f.forEach(z=>{const x=z.getAttribute("data-name")||"",I=z.getAttribute("data-native")||"",C=z.getAttribute("data-region")||"",_=(z.getAttribute("data-lang")||"").toLowerCase(),B=!v||x.includes(v)||I.includes(v)||C.includes(v)||_.includes(v);z.style.display=B?"flex":"none",B&&b++});let w=u.querySelector(".lang-no-match");b===0?(w||(w=document.createElement("div"),w.className="lang-no-match",w.textContent="No Indian language found matching your search",u.appendChild(w)),w.style.display="block"):w&&(w.style.display="none")};l.addEventListener("input",g),c&&c.addEventListener("click",v=>{v.stopPropagation(),l.value="",g(),l.focus()})}p&&p.addEventListener("click",f=>{f.stopPropagation(),s.classList.remove("show"),o.setAttribute("aria-expanded","false"),bs("en")}),document.addEventListener("click",f=>{n.contains(f.target)||(s.classList.remove("show"),o.setAttribute("aria-expanded","false"))}),document.addEventListener("keydown",f=>{f.key==="Escape"&&s.classList.contains("show")&&(s.classList.remove("show"),o.setAttribute("aria-expanded","false"),o.focus())})}}function yd(i){const n=Js(i);document.querySelectorAll(".lang-btn-label").forEach(o=>{o.textContent=n.nativeName||n.name}),document.querySelectorAll(".lang-badge").forEach(o=>{o.textContent=(i||"EN").toUpperCase().slice(0,5)}),document.querySelectorAll(".lang-chip").forEach(o=>{const s=o.getAttribute("data-lang")===i;o.classList.toggle("active",s)}),document.querySelectorAll(".lang-option-row").forEach(o=>{const s=o.getAttribute("data-lang")===i;o.classList.toggle("selected",s);let l=o.querySelector(".lang-check-icon");if(s&&!l){const c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.setAttribute("class","lang-check-icon"),c.setAttribute("width","16"),c.setAttribute("height","16"),c.setAttribute("fill","none"),c.setAttribute("stroke","currentColor"),c.setAttribute("viewBox","0 0 24 24"),c.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>',o.appendChild(c)}else!s&&l&&l.remove()})}let Ea=null,Ca=null;function bd(){if(Ea)return;const i=document.getElementById("app")||document.body;i&&(Ea=new MutationObserver(n=>{if(ja)return;const o=hi();if(o==="en")return;let s=!1;for(const l of n){if(l.type==="childList"&&l.addedNodes.length>0){for(const c of l.addedNodes)if(c.nodeType===Node.ELEMENT_NODE){if(c.closest&&c.closest(".notranslate, .lang-dropdown-menu, .lang-dropdown-container"))continue;s=!0;break}}if(s)break}s&&(Ca&&clearTimeout(Ca),Ca=setTimeout(()=>{mi(o)},70))}),Ea.observe(i,{childList:!0,subtree:!0}))}function wd(){Qs(),window.civicTranslatePage=n=>mi(n||hi()),bd();const i=hi();i!=="en"&&setTimeout(()=>{mi(i)},100),window.addEventListener("civic:route-rendered",()=>{const n=hi();n!=="en"&&setTimeout(()=>{mi(n)},60)})}function it(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const fe={tool:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',sprout:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>',users:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',activity:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',message:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',zap:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',grid:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',workflow:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>',chart:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',shield:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',bot:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="6" rx="2"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/><path d="M12 2v4"/><path d="M8 2h8"/></svg>',tree:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-7"/><path d="M8 15h8l-2-4h3l-2-4h2L12 2 7 7h2l-2 4h3z"/></svg>',school:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v6a6 3 0 0 0 12 0v-6"/><path d="M22 13v6"/></svg>',water:'<svg class="ck-icon ck-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',clock:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',chatLarge:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',botLarge:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="6" rx="2"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><path d="M12 2v4"/><path d="M8 2h8"/><path d="M2 13h1"/><path d="M21 13h1"/></svg>',gearLarge:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',checkLarge:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',flame:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',target:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',layers:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',heartHand:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',lock:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',database:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>',sparkles:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',toolBox:'<svg class="ck-icon ck-icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',heartFill:'<svg class="ck-icon ck-icon-xs" viewBox="0 0 24 24" fill="var(--primary)" stroke="var(--primary)" stroke-width="1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>'};function xd(){const i=Bn(),n=document.getElementById("app");n&&(n.innerHTML=`
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
            ${Rn({idPrefix:"home"})}
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
          <span class="ck-float-badge ck-fb-orange">${fe.tool} REPORT</span>
        </div>
        <div class="ck-hero-float ck-float-2" aria-hidden="true">
          <span class="ck-float-badge ck-fb-green">${fe.sprout} INITIATIVE</span>
        </div>
        <div class="ck-hero-float ck-float-3" aria-hidden="true">
          <span class="ck-float-badge ck-fb-blue">${fe.users} VOLUNTEER</span>
        </div>
        <div class="ck-hero-float ck-float-4" aria-hidden="true">
          <span class="ck-float-badge ck-fb-purple">${fe.activity} TRACK</span>
        </div>
        <div class="ck-hero-float ck-float-5" aria-hidden="true">
          <span class="ck-float-badge ck-fb-pink">${fe.message} SPEAK UP</span>
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

          <!-- Mascot: eyes follow the pointer (decorative) -->
          <div class="ck-hero-mascot" aria-hidden="true">
            <div class="ck-mascot-body">
              <div class="ck-mascot-eye"><div class="ck-mascot-pupil" id="ck-pupil-l"></div></div>
              <div class="ck-mascot-eye"><div class="ck-mascot-pupil" id="ck-pupil-r"></div></div>
            </div>
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
      </section>

      <!-- ═══════════ FEATURES — TABBED ═══════════ -->
      <section class="ck-home-section ck-section-features" id="features">
        <div class="ck-section-inner">
          <div class="ck-section-label">PLATFORM CAPABILITIES</div>
          <h2 class="ck-section-heading">Everything civic.<br>One intelligent platform.</h2>
          <p class="ck-section-sub">From reporting a broken streetlight to tracking city-wide governance — CIVIC-KALKI is the operating system your city didn't know it needed.</p>

          <div class="ck-tabs" id="ck-feature-tabs">
            <div class="ck-tabs-nav">
              <button class="ck-tab-btn active" data-tab="tab-report">${fe.zap} Report</button>
              <button class="ck-tab-btn" data-tab="tab-organize">${fe.grid} Organize</button>
              <button class="ck-tab-btn" data-tab="tab-execute">${fe.workflow} Execute</button>
              <button class="ck-tab-btn" data-tab="tab-understand">${fe.chart} Understand</button>
              <button class="ck-tab-btn" data-tab="tab-accountable">${fe.shield} Accountable</button>
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
                          <span class="ck-ai-badge">${fe.bot} KALKI AI</span>
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
                          <div class="ck-org-icon-pill">${fe.tree}</div>
                          <div>
                            Tree Plantation Drive
                            <div class="ck-org-meta">42 volunteers • Sector 7</div>
                          </div>
                        </div>
                        <div class="ck-org-card">
                          <div class="ck-org-icon-pill">${fe.school}</div>
                          <div>
                            School Renovation Fund
                            <div class="ck-org-meta">₹2.4L raised • Ward 12</div>
                          </div>
                        </div>
                        <div class="ck-org-card">
                          <div class="ck-org-icon-pill">${fe.water}</div>
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
                        <div class="ck-wf-step active"><span>${fe.clock}</span> Director Approval</div>
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
                <div class="ck-how-icon-box">${fe.chatLarge}</div>
              </div>
              <h3>Tell us what's wrong</h3>
              <p>Type or speak in plain language. Our AI understands civic issues — no bureaucratic forms.</p>
            </div>
            <div class="ck-how-card">
              <div class="ck-how-top">
                <div class="ck-how-num">02</div>
                <div class="ck-how-icon-box">${fe.botLarge}</div>
              </div>
              <h3>AI classifies & routes</h3>
              <p>KALKI AI auto-categorizes, sets priority, and routes to the right department instantly.</p>
            </div>
            <div class="ck-how-card">
              <div class="ck-how-top">
                <div class="ck-how-num">03</div>
                <div class="ck-how-icon-box">${fe.gearLarge}</div>
              </div>
              <h3>Workflows kick in</h3>
              <p>Multi-stage approvals, inspections, and assignments — automated, transparent, and tracked.</p>
            </div>
            <div class="ck-how-card">
              <div class="ck-how-top">
                <div class="ck-how-num">04</div>
                <div class="ck-how-icon-box">${fe.checkLarge}</div>
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
          <div class="ck-section-label">${fe.flame} CIVIC BUZZ</div>
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
              <h2 class="ck-section-heading" style="text-align:left;">Built by citizens.<br>For citizens.</h2>
              <p class="ck-about-body">
                CIVIC-KALKI isn't just another government portal that nobody uses. It's a <strong>metadata-driven civic operating system</strong> that transforms how cities work — from the ground up.
              </p>
              <p class="ck-about-body">
                We believe civic governance shouldn't require a PhD in bureaucracy. Our AI-powered platform lets any citizen report, track, and contribute to their city's improvement — while giving municipal teams the tools to actually respond efficiently.
              </p>
              <div class="ck-about-values">
                <div class="ck-value-chip">${fe.target} Transparent</div>
                <div class="ck-value-chip">${fe.zap} AI-First</div>
                <div class="ck-value-chip">${fe.layers} No-Code</div>
                <div class="ck-value-chip">${fe.heartHand} Citizen-Centric</div>
                <div class="ck-value-chip">${fe.chart} Data-Driven</div>
                <div class="ck-value-chip">${fe.lock} Accountable</div>
              </div>
            </div>
            <div class="ck-about-visual">
              <div class="ck-about-card-stack">
                <div class="ck-acard ck-acard-1">
                  <div class="ck-acard-icon-box">${fe.database}</div>
                  <div>
                    <div class="ck-acard-text">20+ Database Tables</div>
                    <div class="ck-acard-sub">Powering civic intelligence</div>
                  </div>
                </div>
                <div class="ck-acard ck-acard-2">
                  <div class="ck-acard-icon-box">${fe.sparkles}</div>
                  <div>
                    <div class="ck-acard-text">Gemini AI Agent</div>
                    <div class="ck-acard-sub">Understands civic context</div>
                  </div>
                </div>
                <div class="ck-acard ck-acard-3">
                  <div class="ck-acard-icon-box">${fe.toolBox}</div>
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
          <span style="display:inline-flex; align-items:center; gap:6px;">Made with ${fe.heartFill} in India</span>
        </div>
      </footer>
    </div>
  `,On("home"),zd())}async function _d(){var u,p;const i=h=>fetch(h,{credentials:"include"}).then(f=>f.ok?f.json():null).catch(()=>null),[n,o]=await Promise.all([i("/api/forms/metadata"),i("/api/jurisdictions?tree=true")]);let s=0;const l=h=>(h||[]).forEach(f=>{f.type==="ward"&&f.status!=="inactive"&&(s+=1),l(f.children)});l(Array.isArray(o==null?void 0:o.data)?o.data:[]);const c=(h,f)=>{const g=document.getElementById(h);g&&(g.textContent=String(f))};n&&(c("ck-fact-modules",(((u=n.data)==null?void 0:u.entityTypes)||[]).length),c("ck-fact-rules",(((p=n.data)==null?void 0:p.rules)||[]).length)),o&&c("ck-fact-wards",s)}let zt=null;function kd(){zt&&(zt(),zt=null);const i=[document.getElementById("ck-pupil-l"),document.getElementById("ck-pupil-r")].filter(Boolean);if(i.length!==2)return;const n=window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)"):null;if(n&&n.matches)return;let o=0,s=0,l=0,c=0;const u=()=>{if(l=0,!i[0].isConnected){zt&&zt();return}for(const f of i){const g=f.parentElement.getBoundingClientRect(),v=o-(g.left+g.width/2),b=s-(g.top+g.height/2),w=Math.min(g.width,g.height)*.24,z=Math.hypot(v,b)||1,x=Math.min(z*.15,w);f.style.transform=`translate(${v/z*x}px, ${b/z*x}px)`}},p=f=>{const g=performance.now();g-c<32||(c=g,o=f.clientX,s=f.clientY,l||(l=requestAnimationFrame(u)))},h=()=>{n.matches&&(i.forEach(f=>{f.style.transform=""}),zt&&zt())};document.addEventListener("pointermove",p,{passive:!0}),n&&n.addEventListener&&n.addEventListener("change",h),zt=()=>{document.removeEventListener("pointermove",p),n&&n.removeEventListener&&n.removeEventListener("change",h),l&&cancelAnimationFrame(l),l=0,zt=null}}function zd(){_d(),kd();const i=document.getElementById("ck-home-header");i&&window.addEventListener("scroll",()=>{i.classList.toggle("scrolled",window.scrollY>40)},{passive:!0});const n=document.getElementById("ck-home-burger"),o=document.getElementById("ck-home-nav");n&&o&&n.addEventListener("click",()=>{o.classList.toggle("open"),n.classList.toggle("open")});const s=document.getElementById("ck-feature-tabs");s&&s.addEventListener("click",p=>{const h=p.target.closest(".ck-tab-btn");if(!h)return;const f=h.dataset.tab;s.querySelectorAll(".ck-tab-btn").forEach(v=>v.classList.remove("active")),s.querySelectorAll(".ck-tab-panel").forEach(v=>v.classList.remove("active")),h.classList.add("active");const g=document.getElementById(f);g&&g.classList.add("active")});const l=document.getElementById("ck-faq-list");l&&l.addEventListener("click",p=>{const h=p.target.closest(".ck-faq-q");if(!h)return;const f=h.closest(".ck-faq-item"),g=f.classList.contains("open");l.querySelectorAll(".ck-faq-item").forEach(v=>v.classList.remove("open")),g||f.classList.add("open")}),document.querySelectorAll('.ck-home a[href^="#"]').forEach(p=>{p.addEventListener("click",h=>{h.preventDefault();const f=document.querySelector(p.getAttribute("href"));if(f){f.scrollIntoView({behavior:"smooth",block:"start"});const g=document.getElementById("ck-home-nav"),v=document.getElementById("ck-home-burger");g&&g.classList.remove("open"),v&&v.classList.remove("open")}})});const c=p=>{p.forEach(h=>{h.isIntersecting&&h.target.classList.add("ck-visible")})},u=new IntersectionObserver(c,{threshold:.1,rootMargin:"0px 0px -60px 0px"});document.querySelectorAll(".ck-how-card, .ck-buzz-meme, .ck-about-text, .ck-about-visual, .ck-faq-item").forEach(p=>{u.observe(p)})}const er="/api";async function D(i,n,o=null,s={}){const c={method:i,headers:{"Content-Type":"application/json","X-Requested-With":"ck-web"},credentials:"include",...s};o!==null&&(c.body=JSON.stringify(o));const u=await fetch(`${er}${n}`,c);u.status===401&&(Ya(),window.dispatchEvent(new CustomEvent("auth:expired")));const p=await u.json().catch(()=>({success:!1,error:"Invalid server response"}));if(!u.ok){const h=new Error(p.error||`HTTP ${u.status}`);throw h.status=u.status,h.data=p,h}return p}const Nn={login:(i,n)=>D("POST","/auth/login",{email:i,password:n}),signup:(i,n,o)=>D("POST","/auth/signup",{name:i,email:n,password:o}),changePassword:(i,n)=>D("POST","/auth/change-password",{current_password:i,new_password:n}),me:()=>D("GET","/auth/me"),logout:()=>D("POST","/auth/logout")},Xa={listUsers:(i={})=>{const n=new URLSearchParams(i).toString();return D("GET",`/admin/users${n?"?"+n:""}`)},getUser:i=>D("GET",`/admin/users/${i}`),setRole:(i,n,o)=>D("POST",`/admin/users/${i}/role`,{role:n,assignedArea:o})},be={list:(i={})=>{const n=new URLSearchParams(i).toString();return D("GET",`/entities${n?"?"+n:""}`)},listTypes:()=>D("GET","/entities/entity-types"),createType:i=>D("POST","/entities/entity-types",i),createRule:i=>D("POST","/entities/rules",i),get:i=>D("GET",`/entities/${i}`),create:i=>D("POST","/entities",i),update:(i,n)=>D("PUT",`/entities/${i}`,n),softDelete:i=>D("DELETE",`/entities/${i}`),transition:(i,n,o)=>D("POST",`/entities/${i}/transition`,{to_status:n,reason:o}),fireRules:(i,n)=>D("POST",`/entities/${i}/fire-rules`,{eventType:n}),aiAnalysis:i=>D("POST",`/entities/${i}/ai-analysis`),audit:i=>D("GET",`/entities/${i}/audit`),getLineage:i=>D("GET",`/entities/${i}/lineage`),workflow:i=>D("GET",`/entities/${i}/workflow`),notifications:(i=30)=>D("GET",`/entities/notifications?limit=${encodeURIComponent(i)}`),nearby:(i,n,o=10)=>D("GET",`/entities/nearby?lat=${encodeURIComponent(i)}&lng=${encodeURIComponent(n)}&radius_km=${encodeURIComponent(o)}`)},tr={list:i=>D("GET",`/entities/${i}/values`),create:(i,n)=>D("POST",`/entities/${i}/values`,{values:n}),upsert:(i,n)=>D("PUT",`/entities/${i}/values`,{values:n})},jn={getMetadata:()=>D("GET","/forms/metadata"),schema:i=>D("GET",`/forms/${i}/schema`),create:i=>D("POST","/forms",i),addSection:(i,n)=>D("POST",`/forms/${i}/sections`,n),addSubsection:(i,n)=>D("POST",`/sections/${i}/subsections`,n),addParameter:(i,n)=>D("POST",`/subsections/${i}/parameters`,n)},Kt={list:(i={})=>{const n=new URLSearchParams(i).toString();return D("GET",`/reports${n?"?"+n:""}`)},get:i=>D("GET",`/reports/${i}`),create:i=>D("POST","/reports",i),execute:(i,n={})=>{const o=new URLSearchParams(n).toString();return D("GET",`/reports/${i}/execute${o?"?"+o:""}`)}},Ld={validate:i=>D("POST","/module-builder/validate",i),deploy:i=>D("POST","/module-builder/deploy",i)},kn={list:(i={})=>{const n=new URLSearchParams(i).toString();return D("GET",`/jurisdictions${n?"?"+n:""}`)},tree:()=>D("GET","/jurisdictions?tree=true"),get:i=>D("GET",`/jurisdictions/${i}`),create:i=>D("POST","/jurisdictions",i),update:(i,n)=>D("PUT",`/jurisdictions/${i}`,n),deactivate:i=>D("DELETE",`/jurisdictions/${i}`)},$d={getConfig:()=>D("GET","/governance/config"),analyze:i=>D("POST","/governance/analyze",i?{entity_type_id:i}:{})},zn={chat:async(i,n,o=null)=>{if(!o)return D("POST","/agent/chat",{sessionId:i,message:n});const s=new FormData;s.append("sessionId",i),s.append("message",n||""),s.append("attachment",o);const l={"X-Requested-With":"ck-web"},c=await fetch(`${er}/agent/chat`,{method:"POST",headers:l,credentials:"include",body:s});c.status===401&&(Ya(),window.dispatchEvent(new CustomEvent("auth:expired")));const u=await c.json().catch(()=>({success:!1,error:"Invalid server response"}));if(!c.ok){const p=new Error(u.error||`HTTP ${c.status}`);throw p.status=c.status,p.data=u,p}return u},clearSession:i=>D("DELETE",`/agent/chat/${i}`).catch(()=>{})},ge={list:(i={})=>{const n=new URLSearchParams(i).toString();return D("GET",`/buzz${n?"?"+n:""}`)},get:i=>D("GET",`/buzz/${i}`),create:i=>D("POST","/buzz",i),update:(i,n)=>D("PATCH",`/buzz/${i}`,n),vote:i=>D("POST",`/buzz/${i}/vote`),follow:i=>D("POST",`/buzz/${i}/follow`),getComments:(i,n={})=>{const o=new URLSearchParams(n).toString();return D("GET",`/buzz/${i}/comments${o?"?"+o:""}`)},addComment:(i,n)=>D("POST",`/buzz/${i}/comments`,{text:n}),logEvent:(i,n)=>D("POST",`/buzz/${i}/event`,{type:n}),getStats:i=>D("GET",`/buzz/${i}/stats`),generateCaptions:i=>D("POST","/buzz/captions",i),uploadImage:i=>D("POST","/buzz/upload-image",{image_data:i}),report:(i,n)=>D("POST",`/buzz/${i}/report`,{reason:n})};let Ed=0;function Wi(i,n="default",o=3500){const s=document.getElementById("toast-container"),l=++Ed,c=document.createElement("div");return c.className=`toast toast-${n}`,c.id=`toast-${l}`,c.innerHTML=`
    <span>${Cd(i)}</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:8px;font-size:1rem;line-height:1;opacity:.7">×</button>
  `,s.appendChild(c),setTimeout(()=>{c.remove()},o),l}function ir(i){return Wi(i,"default")}function we(i){return Wi(i,"success")}function ee(i){return Wi(i,"error")}function vt(i){return Wi(i,"warning")}function Cd(i){return String(i).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const Sd=Object.freeze(Object.defineProperty({__proto__:null,showToast:Wi,toast:ir,toastError:ee,toastSuccess:we,toastWarning:vt},Symbol.toStringTag,{value:"Module"}));function ws(i,n="/dashboard"){const o=i&&i.get("redirect");return typeof o=="string"&&o.startsWith("/")&&!o.startsWith("//")&&!o.startsWith("/\\")&&!o.includes("://")&&!o.toLowerCase().includes("javascript:")&&!/[\x00-\x1F\x7F]/.test(o)?o:n}function Td(i,n){if(Bn()){X(ws(n));return}const o=document.getElementById("app");o.innerHTML=`
    <div class="auth-layout">
      <div class="auth-card">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--space-4);">
          <a href="/" style="font-size:0.8125rem; color:var(--text-muted); display:inline-flex; align-items:center; gap:4px; text-decoration:none;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Home
          </a>
          ${Rn({idPrefix:"login"})}
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
  `;const s=document.getElementById("password"),l=document.getElementById("toggle-password-btn"),c='<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>',u='<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>';l&&s&&l.addEventListener("click",()=>{const h=s.getAttribute("type")==="password"?"text":"password";s.setAttribute("type",h),l.setAttribute("aria-label",h==="password"?"Show password":"Hide password"),l.innerHTML=h==="password"?c:u});const p=document.getElementById("login-error-alert");document.getElementById("login-form").addEventListener("submit",async h=>{h.preventDefault(),p&&(p.classList.add("hidden"),p.textContent="");const f=document.getElementById("login-btn"),g=document.getElementById("email").value.trim(),v=s.value;if(!g||!v){p&&(p.textContent="Please enter both email address and password.",p.classList.remove("hidden"));return}f.disabled=!0,f.innerHTML='<div class="spinner" style="width:16px;height:16px;border-width:2px;margin-right:8px;"></div> Signing in...';try{const b=await Nn.login(g,v);Ks(b.data),X(ws(n))}catch(b){const w=b.message||"Invalid email or password. Please check your credentials.";p&&(p.textContent=w,p.classList.remove("hidden")),ee(w),f.disabled=!1,f.innerHTML="Sign In"}}),On("login")}function xs(i,n="/dashboard"){const o=i&&i.get("redirect");return typeof o=="string"&&o.startsWith("/")&&!o.startsWith("//")&&!o.startsWith("/\\")&&!o.includes("://")&&!o.toLowerCase().includes("javascript:")&&!/[\x00-\x1F\x7F]/.test(o)?o:n}function Md(i,n){if(Bn()){X(xs(n));return}const o=document.getElementById("app");o.innerHTML=`
    <div class="auth-layout">
      <div class="auth-card">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--space-4);">
          <a href="/" style="font-size:0.8125rem; color:var(--text-muted); display:inline-flex; align-items:center; gap:4px; text-decoration:none;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Home
          </a>
          ${Rn({idPrefix:"signup"})}
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
  `,document.getElementById("signup-form").addEventListener("submit",async s=>{s.preventDefault();const l=document.getElementById("signup-btn"),c=document.getElementById("name").value.trim(),u=document.getElementById("email").value.trim(),p=document.getElementById("password").value;if(!(!c||!u||!p)){l.disabled=!0,l.innerHTML='<div class="spinner" style="width:16px;height:16px;border-width:2px;margin-right:8px;"></div> Creating account...';try{const h=await Nn.signup(c,u,p);Ks(h.data),X(xs(n))}catch(h){ee(h.message||"Signup failed"),l.disabled=!1,l.innerHTML="Create Account"}}}),On("signup")}const Ha={initiative:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",grievance:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",park:"M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",passport:"M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",charter:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",employment:"M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",volunteer:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",legacy:"M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",feedback:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",survey:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",default:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"},nr={"🌱":"initiative","🚨":"grievance","⚠️":"grievance","🪪":"passport","📜":"charter","💼":"employment","🤝":"volunteer","🏛️":"legacy","🏛":"legacy","💬":"feedback","📢":"feedback","📊":"survey","📋":"survey","🌳":"park","🏞️":"park","🏞":"park","🏗️":"legacy","🏗":"legacy","🛡️":"charter","🛡":"charter","⚡":"default","⚡️":"default"};function Bt(i,n=20,o=""){const s=nr[i]||i,l=Ha[s]||Ha.default;return`<svg width="${n}" height="${n}" class="${o}" style="flex-shrink:0; display:inline-block; vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${l}"/></svg>`}const Id={Movement:{title:"Start a Civic Initiative",shortTitle:"Civic Initiative",description:"Organize citizens around community goals, public spaces, and urban projects.",category:"Community Action",iconKey:"initiative",actionLabel:"Start Initiative"},Grievance:{title:"Report a Civic Problem",shortTitle:"Civic Problem",description:"Report infrastructure defects, sanitation issues, or public safety concerns.",category:"Public Services",iconKey:"grievance",actionLabel:"Report Issue"},"Park Renovation Request":{title:"Park Renovation Request",shortTitle:"Park Renovation",description:"Propose public park upgrades, playground repairs, or green space restoration.",category:"Urban Infrastructure",iconKey:"park",actionLabel:"Request Renovation"},"Citizen Passport":{title:"Citizen Passport & Contribution",shortTitle:"Citizen Passport",description:"Track community contributions, volunteer hours, and civic engagement history.",category:"Civic Identity",iconKey:"passport",actionLabel:"Update Passport"},"Digital Civic Constitution":{title:"Civic Charter & Guidelines",shortTitle:"Civic Charter",description:"Establish community guidelines, governance rules, and transparency terms.",category:"Governance",iconKey:"charter",actionLabel:"Draft Charter"},"Employment Exchange":{title:"Civic Skills & Employment",shortTitle:"Employment Exchange",description:"Post and discover civic project roles, community jobs, and skill opportunities.",category:"Opportunity",iconKey:"employment",actionLabel:"Post Role"},"Volunteer Management":{title:"Volunteer Operations",shortTitle:"Volunteer Drive",description:"Coordinate volunteer tasks, register community helpers, and track activities.",category:"Community Action",iconKey:"volunteer",actionLabel:"Register Volunteer"},"Legacy & Continuity":{title:"Project Continuity & Legacy",shortTitle:"Project Continuity",description:"Transition completed initiatives into permanent NGOs, startups, or civic centers.",category:"Governance",iconKey:"legacy",actionLabel:"Plan Continuity"},"Public Feedback":{title:"Public Feedback",shortTitle:"Public Feedback",description:"Collect structured community feedback on civic initiatives and public services.",category:"Civic Operations",iconKey:"feedback",actionLabel:"Submit Feedback"},"Public Survey":{title:"Public Survey",shortTitle:"Public Survey",description:"Run community surveys and opinion polls for civic decision-making.",category:"Civic Operations",iconKey:"survey",actionLabel:"Start Survey"}};function Xe(i){var l;if(!i)return{title:"Civic Capability",shortTitle:"Capability",description:"Metadata-driven civic module.",category:"Civic Operations",iconKey:"default",icon:Bt("default",16),iconLarge:Bt("default",24),actionLabel:"Start Action"};const n=i.name||"",o=Id[n];if(o)return{title:o.title,shortTitle:o.shortTitle,description:i.description||o.description,category:o.category,iconKey:o.iconKey,icon:Bt(o.iconKey,16),iconLarge:Bt(o.iconKey,24),actionLabel:o.actionLabel,rawName:n};const s=i.icon&&nr[i.icon]||(i.icon&&Ha[i.icon]?i.icon:null)||"default";return{title:n,shortTitle:n,description:i.description||"Metadata-configured civic capability module.",category:((l=i.domain)==null?void 0:l.domain_name)||"Civic Operations",iconKey:s,icon:Bt(s,16),iconLarge:Bt(s,24),actionLabel:`Start ${n}`,rawName:n}}function Ct(i){if(!i)return"Unknown";switch(i.toLowerCase()){case"draft":return"Draft (Unsubmitted)";case"submitted":return"Submitted (Awaiting Review)";case"coordinator_approved":return"Verified (Pending Approval)";case"verified":return"Verified";case"approved":return"Approved & Active";case"rejected":return"Rejected";case"closed":return"Closed";default:return i.replace(/_/g," ").replace(/\b\w/g,n=>n.toUpperCase())}}const Ad=3e4;let Sa=null,gn=null;function Ai(i){return String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ar(){const i=He();return`ck_notifications_seen_${i?i.user_id:"anon"}`}function Ta(){try{return Number(localStorage.getItem(ar()))||0}catch{return 0}}function Pd(i){try{localStorage.setItem(ar(),String(i))}catch{}}function Bd(i){const n=Math.max(0,Math.round((Date.now()-new Date(i).getTime())/1e3));return n<60?"just now":n<3600?`${Math.floor(n/60)} min ago`:n<86400?`${Math.floor(n/3600)} h ago`:new Date(i).toLocaleDateString()}const Rd={queue:"Needs your review",status:"Status change",linked:"Linked record"};function Od(){return`
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
  `}function _s(i,n){return i.length?i.map(o=>`
      <button type="button" class="notif-item${new Date(o.datetime).getTime()>n?" unread":""}" data-entity-id="${Number(o.entity_id)}">
        <span class="notif-kind notif-kind-${Ai(o.kind)}">${Ai(Rd[o.kind]||"Update")}</span>
        <span class="notif-message">${Ai(o.message)}</span>
        <span class="notif-meta">${Ai(o.actor?`${o.actor} · `:"")}${Ai(Bd(o.datetime))}</span>
      </button>`).join(""):'<div class="notif-empty">Nothing yet. Status changes and records waiting for you appear here.</div>'}function Nd(){const i=document.getElementById("notif-bell-btn"),n=document.getElementById("notif-panel"),o=document.getElementById("notif-list"),s=document.getElementById("notif-count");if(!i||!n||!o||!s)return;let l=[];const c=()=>{const p=Ta(),h=l.filter(f=>new Date(f.datetime).getTime()>p).length;s.textContent=h>9?"9+":String(h),s.hidden=h===0,i.setAttribute("aria-label",h?`Notifications, ${h} new`:"Notifications"),o.innerHTML=_s(l,p)},u=async()=>{if(document.body.contains(i))try{const p=await be.notifications();l=Array.isArray(p.data)?p.data:[],c()}catch{o.innerHTML='<div class="notif-empty">Notifications could not be loaded.</div>'}};i.addEventListener("click",p=>{p.stopPropagation();const h=n.classList.toggle("show");if(i.setAttribute("aria-expanded",String(h)),h){const f=l.length?new Date(l[0].datetime).getTime():Date.now();o.innerHTML=_s(l,Ta()),Pd(Math.max(f,Ta())),s.hidden=!0}}),o.addEventListener("click",p=>{const h=p.target.closest(".notif-item");h&&(n.classList.remove("show"),X(`/entities/${h.getAttribute("data-entity-id")}`))}),gn&&document.removeEventListener("click",gn),gn=p=>{const h=document.getElementById("notif-panel"),f=document.getElementById("notif-bell-btn");h&&f&&!h.contains(p.target)&&!f.contains(p.target)&&(h.classList.remove("show"),f.setAttribute("aria-expanded","false"))},document.addEventListener("click",gn),Sa&&clearInterval(Sa),Sa=setInterval(u,Ad),u()}function $e(i,n="",o=[]){const s=He(),l=Pn();if(!s)return i;const c=window.location.pathname,u=window.location.search;let p=[];l==="citizen"?p=[{path:"/dashboard",label:"Home",icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},{path:"/nearby",label:"Near me",icon:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"},{path:"/entities?type=initiative",label:"Initiatives",icon:"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"},{path:"/buzz",label:"Civic Buzz",icon:"M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"},{path:"/entities",label:"My requests",icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"},{path:"/agent/chat?message=I+want+to+understand+a+civic+issue",label:"Help",icon:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"}]:l==="coordinator_area"||l==="coordinator_general"?p=[{path:"/dashboard",label:"My desk",icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},{path:"/entities",label:"All records",icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"},{path:"/reports",label:"Reports",icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"}]:l==="director"?p=[{path:"/dashboard",label:"Approvals",icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},{path:"/governance",label:"Governance Intelligence",icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"},{path:"/entities",label:"All records",icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"},{path:"/module-builder",label:"Module builder",icon:"M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"},{path:"/reports",label:"Reports",icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"}]:p=[{path:"/dashboard",label:"Platform",icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},{path:"/governance",label:"Governance Intelligence",icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"},{path:"/modules",label:"Modules",icon:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"},{path:"/module-builder",label:"Module builder",icon:"M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"},{path:"/entities",label:"All records",icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"},{path:"/reports",label:"Reports",icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"},{path:"/admin",label:"Users and roles",icon:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"}];const h=v=>v.map(b=>{let w=!1;if(b.path.includes("?")){const[z,x]=b.path.split("?");w=c===z&&u==="?"+x}else w=c===b.path&&!u;return`
    <li class="sidebar-nav-item">
      <a href="${b.path}" class="sidebar-nav-link ${w?"active":""}">
        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${b.icon}"></path></svg>
        ${nt(b.label)}
      </a>
    </li>
  `}).join("");let f="";l!=="citizen"&&Array.isArray(o)&&o.length>0&&(f=o.map(v=>{var x;const b=Xe(v),w=`/entities?entity_type_id=${v.entity_type_id}`,z=u.includes(`entity_type_id=${v.entity_type_id}`);return`
        <li class="sidebar-nav-item">
          <a href="${w}" class="sidebar-nav-link ${z?"active":""}">
            <span class="sidebar-cap-icon" style="display:inline-flex; align-items:center; justify-content:center; width:18px; height:18px; margin-right:8px; flex-shrink:0; opacity:0.85;">
              ${Bt(b.iconKey,16)}
            </span>
            <span class="truncate" style="flex:1;">${nt(b.shortTitle)}</span>
            ${(x=v._count)!=null&&x.entities?`<span class="sidebar-nav-count">${v._count.entities}</span>`:""}
          </a>
        </li>
      `}).join(""));const g=l==="coordinator_area"&&s.assignedArea?`${Ri(l)} • ${s.assignedArea}`:Ri(l);return`
    <div class="app-layout">
      <!-- Sidebar -->
      <aside class="sidebar" id="sidebar">
        <a href="/dashboard" class="sidebar-brand">
          <img src="/logo.png" alt="CivicKalki" class="sidebar-brand-img" />
        </a>

        ${l==="citizen"?`
          <div class="sidebar-new-request-wrap" style="padding: 10px 14px 4px 14px;">
            <button type="button" class="btn btn-primary ck-sidebar-new-btn" id="sidebar-new-request-btn" style="width:100%; justify-content:center; gap:8px; font-weight:700; font-size:0.95rem; border-radius:10px; background:var(--primary); border-color:var(--primary); box-shadow:0 2px 8px rgba(var(--primary-rgb),0.3); height:40px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
              <span>New request</span>
            </button>
          </div>
        `:""}
        
        <div class="sidebar-section">
          <ul class="sidebar-nav">
            ${h(p)}
          </ul>
        </div>

        ${f?`
          <details class="sidebar-modules" ${u.includes("entity_type_id=")?"open":""}>
            <summary>Records by module</summary>
            <ul class="sidebar-nav">
              ${f}
            </ul>
          </details>
        `:""}
        
        <div class="sidebar-footer">
          <div class="sidebar-user" id="sidebar-user-card" style="cursor:pointer;">
            <div class="user-avatar">${nt(s.name.charAt(0).toUpperCase())}</div>
            <div style="flex:1; overflow:hidden;">
              <div class="user-name truncate">${nt(s.name)}</div>
              <div class="user-role truncate" title="${nt(g)}">${nt(g)}</div>
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
              <span style="font-weight:600; color:var(--text-primary);">${nt(n)}</span>
            </div>
          </div>

          <div class="topbar-actions">
            <!-- Language Selector -->
            ${Rn({idPrefix:"topbar"})}

            <!-- Notifications (derived feed) -->
            ${Od()}

            <!-- User Dropdown Menu -->
            <div class="user-dropdown-container">
              <button class="user-trigger-btn" id="topbar-user-btn" type="button" aria-haspopup="true" aria-expanded="false">
                <div class="user-avatar" style="width:32px; height:32px; font-size:13px; font-weight:700;">${nt(s.name.charAt(0).toUpperCase())}</div>
                <div style="display:flex; flex-direction:column; align-items:flex-start; line-height:1.2;">
                  <span style="font-size:0.88rem; font-weight:600; color:var(--text-primary);">${nt(s.name.split(" ")[0])}</span>
                  <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.03em;">${nt(Ri(l))}</span>
                </div>
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--text-muted); flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>

              <div class="user-dropdown-menu" id="user-dropdown-menu">
                <div class="user-dropdown-header">
                  <div class="user-dropdown-name">${nt(s.name)}</div>
                  <div class="user-dropdown-role">${nt(Ri(l))}</div>
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
  `}function Ee(){var p;hd().catch(()=>{}),On("topbar"),Nd();const i=document.getElementById("sidebar-new-request-btn");i&&i.addEventListener("click",()=>{if(window.location.pathname==="/dashboard"){const h=document.getElementById("ck-dark-input"),f=document.getElementById("ck-dark-cockpit");f&&f.scrollIntoView({behavior:"smooth",block:"center"}),h&&h.focus()}else X("/dashboard"),setTimeout(()=>{const h=document.getElementById("ck-dark-input"),f=document.getElementById("ck-dark-cockpit");f&&f.scrollIntoView({behavior:"smooth",block:"center"}),h&&h.focus()},150)});const n=document.getElementById("topbar-user-btn"),o=document.getElementById("user-dropdown-menu");n&&o&&(n.addEventListener("click",h=>{h.stopPropagation(),o.classList.toggle("show")}),document.addEventListener("click",h=>{!o.contains(h.target)&&!n.contains(h.target)&&o.classList.remove("show")}));const s=document.getElementById("dropdown-logout-btn");s&&s.addEventListener("click",async h=>{h.preventDefault();try{await Nn.logout()}catch(f){console.warn("Logout warning:",f)}Ya(),X("/login")});const l=document.getElementById("sidebar-user-card");l&&l.addEventListener("click",()=>{X("/profile")});const c=document.getElementById("mobile-menu-btn"),u=document.getElementById("sidebar");if(c&&u){const h=f=>{var g;u.classList.toggle("open",f),c.setAttribute("aria-expanded",String(f)),(g=document.getElementById("sidebar-scrim"))==null||g.classList.toggle("show",f)};c.addEventListener("click",f=>{f.stopPropagation(),h(!u.classList.contains("open"))}),(p=document.getElementById("sidebar-scrim"))==null||p.addEventListener("click",()=>h(!1)),document.addEventListener("keydown",f=>{f.key==="Escape"&&h(!1)})}}function nt(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const or="ck_user_location",sr="ck_location_dismissed",jd="https://nominatim.openstreetmap.org/reverse";function Fi(){try{const i=sessionStorage.getItem(or);if(!i)return null;const n=JSON.parse(i);return n&&typeof n.lat=="number"&&typeof n.lng=="number"?n:null}catch{return null}}function Hd(i){try{sessionStorage.setItem(or,JSON.stringify({...i,timestamp:Date.now()}))}catch{}}function rr(){return sessionStorage.getItem(sr)==="1"}function Dd(){try{sessionStorage.setItem(sr,"1")}catch{}}async function Fd(i,n){try{const o=`${jd}?lat=${encodeURIComponent(i)}&lon=${encodeURIComponent(n)}&format=json&zoom=16&addressdetails=1`,s=await fetch(o,{headers:{"User-Agent":"CIVIC-KALKI/1.0 (civic-kalki@example.com)"}});if(!s.ok)throw new Error("Nominatim error");const l=await s.json(),c=l.address||{},u=[c.road||c.pedestrian||c.footway,c.suburb||c.neighbourhood||c.quarter,c.city||c.town||c.village||c.municipality].filter(Boolean);return u.length>0?u.join(", "):l.display_name||`${i.toFixed(4)}, ${n.toFixed(4)}`}catch{return`${i.toFixed(4)}, ${n.toFixed(4)}`}}function lr(){return new Promise((i,n)=>{if(!navigator.geolocation){n(new Error("Geolocation not supported by this browser."));return}navigator.geolocation.getCurrentPosition(async o=>{const s=o.coords.latitude,l=o.coords.longitude,c=await Fd(s,l),u={lat:s,lng:l,area:c};Hd(u),i(u)},o=>{n(o)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:6e4})})}function dr(i){if(!i||typeof i.lat!="number")return"";const n=i.lat>=0?"N":"S",o=i.lng>=0?"E":"W";return`[User location: ${i.area} (${Math.abs(i.lat).toFixed(4)}°${n}, ${Math.abs(i.lng).toFixed(4)}°${o})] `}const R={flame:(i=15,n="currentColor")=>`
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
  `};function qd(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function Hn(i){var c,u,p,h;if(!i||!i.id)return;ge.logEvent(i.id,"share").catch(()=>{});const n=document.getElementById("ck-buzz-share-dialog-root");n&&n.remove();const o=`${window.location.origin}/buzz/${i.id}`,s=document.createElement("div");s.id="ck-buzz-share-dialog-root",s.className="ck-buzz-modal-backdrop",s.innerHTML=`
    <div class="ck-buzz-share-dialog" role="dialog" aria-modal="true">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="display:inline-flex; align-items:center; color:#ff5a36;">${R.share(20,"#ff5a36")}</span>
          <span style="font-weight:800; font-size:1rem; color:#0f172a;">Share Civic Buzz</span>
        </div>
        <button type="button" class="ck-buzz-close-btn" id="ck-share-close-btn" aria-label="Close">✕</button>
      </div>

      <div style="font-size:0.8rem; color:#64748b; margin-top:-4px;">
        Spread civic accountability to your community and social circles.
      </div>

      <!-- Action 1: Download Image -->
      <button type="button" class="ck-buzz-share-item" id="ck-share-download-btn">
        <span style="display:inline-flex; align-items:center; color:#475569;">${R.image(22,"#475569")}</span>
        <div style="text-align:left;">
          <div>Download Card Image</div>
          <div style="font-size:0.72rem; color:#64748b; font-weight:500;">Save high-res PNG to your device</div>
        </div>
      </button>

      <!-- Action 2: Copy Link -->
      <button type="button" class="ck-buzz-share-item" id="ck-share-copy-btn">
        <span style="display:inline-flex; align-items:center; color:#475569;">${R.link(22,"#475569")}</span>
        <div style="text-align:left;">
          <div>Copy Link</div>
          <div style="font-size:0.72rem; color:#64748b; font-weight:500;">${qd(o)}</div>
        </div>
      </button>

      <!-- Action 3: Web Share -->
      <button type="button" class="ck-buzz-share-item" id="ck-share-web-btn">
        <span style="display:inline-flex; align-items:center; color:#475569;">${R.shareDevice(22,"#475569")}</span>
        <div style="text-align:left;">
          <div>Web Share</div>
          <div style="font-size:0.72rem; color:#64748b; font-weight:500;">Share to WhatsApp, X, or other apps</div>
        </div>
      </button>
    </div>
  `,document.body.appendChild(s);const l=()=>s.remove();s.addEventListener("click",f=>{f.target===s&&l()}),(c=s.querySelector("#ck-share-close-btn"))==null||c.addEventListener("click",l),(u=s.querySelector("#ck-share-download-btn"))==null||u.addEventListener("click",async()=>{try{ge.logEvent(i.id,"share").catch(()=>{});const f=i.image_url;if(!f){vt("Post does not have an attached rendered image.");return}const v=await(await fetch(f)).blob(),b=URL.createObjectURL(v),w=document.createElement("a");w.href=b,w.download=`civic-buzz-post-${i.id}.png`,document.body.appendChild(w),w.click(),w.remove(),URL.revokeObjectURL(b),we("Card image downloaded!"),l()}catch{const f=document.createElement("a");f.href=i.image_url,f.target="_blank",f.download=`civic-buzz-post-${i.id}.png`,document.body.appendChild(f),f.click(),f.remove(),we("Downloading card image..."),l()}}),(p=s.querySelector("#ck-share-copy-btn"))==null||p.addEventListener("click",async()=>{try{ge.logEvent(i.id,"share").catch(()=>{}),await navigator.clipboard.writeText(o),we("Link copied to clipboard!"),l()}catch{window.prompt("Copy this Civic Buzz link:",o),l()}}),(h=s.querySelector("#ck-share-web-btn"))==null||h.addEventListener("click",async()=>{if(ge.logEvent(i.id,"share").catch(()=>{}),navigator.share)try{await navigator.share({title:`CIVIC BUZZ: ${i.linked_title||"Civic Issue"}`,text:`"${i.caption}" — Check this civic conversation on CIVIC-KALKI:`,url:o}),we("Shared successfully!"),l()}catch(g){g.name!=="AbortError"&&f()}else{const g=encodeURIComponent(`CIVIC BUZZ: "${i.caption}"
${o}`);window.open(`https://api.whatsapp.com/send?text=${g}`,"_blank"),l()}function f(){navigator.clipboard.writeText(o).then(()=>{we("Link copied to clipboard!")}),l()}})}function Ud(i,n){if(i.match(/^[a-z]+:\/\//i))return i;if(i.match(/^\/\//))return window.location.protocol+i;if(i.match(/^[a-z]+:/i))return i;const o=document.implementation.createHTMLDocument(),s=o.createElement("base"),l=o.createElement("a");return o.head.appendChild(s),o.body.appendChild(l),n&&(s.href=n),l.href=i,l.href}const Zd=(()=>{let i=0;const n=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(i+=1,`u${n()}${i}`)})();function Ot(i){const n=[];for(let o=0,s=i.length;o<s;o++)n.push(i[o]);return n}let oi=null;function cr(i={}){return oi||(i.includeStyleProperties?(oi=i.includeStyleProperties,oi):(oi=Ot(window.getComputedStyle(document.documentElement)),oi))}function Ln(i,n){const s=(i.ownerDocument.defaultView||window).getComputedStyle(i).getPropertyValue(n);return s?parseFloat(s.replace("px","")):0}function Vd(i){const n=Ln(i,"border-left-width"),o=Ln(i,"border-right-width");return i.clientWidth+n+o}function Wd(i){const n=Ln(i,"border-top-width"),o=Ln(i,"border-bottom-width");return i.clientHeight+n+o}function ur(i,n={}){const o=n.width||Vd(i),s=n.height||Wd(i);return{width:o,height:s}}function Gd(){let i,n;try{n=process}catch{}const o=n&&n.env?n.env.devicePixelRatio:null;return o&&(i=parseInt(o,10),Number.isNaN(i)&&(i=1)),i||window.devicePixelRatio||1}const We=16384;function Kd(i){(i.width>We||i.height>We)&&(i.width>We&&i.height>We?i.width>i.height?(i.height*=We/i.width,i.width=We):(i.width*=We/i.height,i.height=We):i.width>We?(i.height*=We/i.width,i.width=We):(i.width*=We/i.height,i.height=We))}function $n(i){return new Promise((n,o)=>{const s=new Image;s.onload=()=>{s.decode().then(()=>{requestAnimationFrame(()=>n(s))})},s.onerror=o,s.crossOrigin="anonymous",s.decoding="async",s.src=i})}async function Yd(i){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(i)).then(encodeURIComponent).then(n=>`data:image/svg+xml;charset=utf-8,${n}`)}async function Jd(i,n,o){const s="http://www.w3.org/2000/svg",l=document.createElementNS(s,"svg"),c=document.createElementNS(s,"foreignObject");return l.setAttribute("width",`${n}`),l.setAttribute("height",`${o}`),l.setAttribute("viewBox",`0 0 ${n} ${o}`),c.setAttribute("width","100%"),c.setAttribute("height","100%"),c.setAttribute("x","0"),c.setAttribute("y","0"),c.setAttribute("externalResourcesRequired","true"),l.appendChild(c),c.appendChild(i),Yd(l)}const Ve=(i,n)=>{if(i instanceof n)return!0;const o=Object.getPrototypeOf(i);return o===null?!1:o.constructor.name===n.name||Ve(o,n)};function Xd(i){const n=i.getPropertyValue("content");return`${i.cssText} content: '${n.replace(/'|"/g,"")}';`}function Qd(i,n){return cr(n).map(o=>{const s=i.getPropertyValue(o),l=i.getPropertyPriority(o);return`${o}: ${s}${l?" !important":""};`}).join(" ")}function ec(i,n,o,s){const l=`.${i}:${n}`,c=o.cssText?Xd(o):Qd(o,s);return document.createTextNode(`${l}{${c}}`)}function ks(i,n,o,s){const l=window.getComputedStyle(i,o),c=l.getPropertyValue("content");if(c===""||c==="none")return;const u=Zd();try{n.className=`${n.className} ${u}`}catch{return}const p=document.createElement("style");p.appendChild(ec(u,o,l,s)),n.appendChild(p)}function tc(i,n,o){ks(i,n,":before",o),ks(i,n,":after",o)}const zs="application/font-woff",Ls="image/jpeg",ic={woff:zs,woff2:zs,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:Ls,jpeg:Ls,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml",webp:"image/webp"};function nc(i){const n=/\.([^./]*?)$/g.exec(i);return n?n[1]:""}function Qa(i){const n=nc(i).toLowerCase();return ic[n]||""}function ac(i){return i.split(/,/)[1]}function Da(i){return i.search(/^(data:)/)!==-1}function oc(i,n){return`data:${n};base64,${i}`}async function pr(i,n,o){const s=await fetch(i,n);if(s.status===404)throw new Error(`Resource "${s.url}" not found`);const l=await s.blob();return new Promise((c,u)=>{const p=new FileReader;p.onerror=u,p.onloadend=()=>{try{c(o({res:s,result:p.result}))}catch(h){u(h)}},p.readAsDataURL(l)})}const Ma={};function sc(i,n,o){let s=i.replace(/\?.*/,"");return o&&(s=i),/ttf|otf|eot|woff2?/i.test(s)&&(s=s.replace(/.*\//,"")),n?`[${n}]${s}`:s}async function eo(i,n,o){const s=sc(i,n,o.includeQueryParams);if(Ma[s]!=null)return Ma[s];o.cacheBust&&(i+=(/\?/.test(i)?"&":"?")+new Date().getTime());let l;try{const c=await pr(i,o.fetchRequestInit,({res:u,result:p})=>(n||(n=u.headers.get("Content-Type")||""),ac(p)));l=oc(c,n)}catch(c){l=o.imagePlaceholder||"";let u=`Failed to fetch resource: ${i}`;c&&(u=typeof c=="string"?c:c.message),u&&console.warn(u)}return Ma[s]=l,l}async function rc(i){const n=i.toDataURL();return n==="data:,"?i.cloneNode(!1):$n(n)}async function lc(i,n){if(i.currentSrc){const c=document.createElement("canvas"),u=c.getContext("2d");c.width=i.clientWidth,c.height=i.clientHeight,u==null||u.drawImage(i,0,0,c.width,c.height);const p=c.toDataURL();return $n(p)}const o=i.poster,s=Qa(o),l=await eo(o,s,n);return $n(l)}async function dc(i,n){var o;try{if(!((o=i==null?void 0:i.contentDocument)===null||o===void 0)&&o.body)return await Dn(i.contentDocument.body,n,!0)}catch{}return i.cloneNode(!1)}async function cc(i,n){return Ve(i,HTMLCanvasElement)?rc(i):Ve(i,HTMLVideoElement)?lc(i,n):Ve(i,HTMLIFrameElement)?dc(i,n):i.cloneNode(hr(i))}const uc=i=>i.tagName!=null&&i.tagName.toUpperCase()==="SLOT",hr=i=>i.tagName!=null&&i.tagName.toUpperCase()==="SVG";async function pc(i,n,o){var s,l;if(hr(n))return n;let c=[];return uc(i)&&i.assignedNodes?c=Ot(i.assignedNodes()):Ve(i,HTMLIFrameElement)&&(!((s=i.contentDocument)===null||s===void 0)&&s.body)?c=Ot(i.contentDocument.body.childNodes):c=Ot(((l=i.shadowRoot)!==null&&l!==void 0?l:i).childNodes),c.length===0||Ve(i,HTMLVideoElement)||await c.reduce((u,p)=>u.then(()=>Dn(p,o)).then(h=>{h&&n.appendChild(h)}),Promise.resolve()),n}function hc(i,n,o){const s=n.style;if(!s)return;const l=window.getComputedStyle(i);l.cssText?(s.cssText=l.cssText,s.transformOrigin=l.transformOrigin):cr(o).forEach(c=>{let u=l.getPropertyValue(c);c==="font-size"&&u.endsWith("px")&&(u=`${Math.floor(parseFloat(u.substring(0,u.length-2)))-.1}px`),Ve(i,HTMLIFrameElement)&&c==="display"&&u==="inline"&&(u="block"),c==="d"&&n.getAttribute("d")&&(u=`path(${n.getAttribute("d")})`),s.setProperty(c,u,l.getPropertyPriority(c))})}function mc(i,n){Ve(i,HTMLTextAreaElement)&&(n.innerHTML=i.value),Ve(i,HTMLInputElement)&&n.setAttribute("value",i.value)}function fc(i,n){if(Ve(i,HTMLSelectElement)){const o=n,s=Array.from(o.children).find(l=>i.value===l.getAttribute("value"));s&&s.setAttribute("selected","")}}function gc(i,n,o){return Ve(n,Element)&&(hc(i,n,o),tc(i,n,o),mc(i,n),fc(i,n)),n}async function vc(i,n){const o=i.querySelectorAll?i.querySelectorAll("use"):[];if(o.length===0)return i;const s={};for(let c=0;c<o.length;c++){const p=o[c].getAttribute("xlink:href");if(p){const h=i.querySelector(p),f=document.querySelector(p);!h&&f&&!s[p]&&(s[p]=await Dn(f,n,!0))}}const l=Object.values(s);if(l.length){const c="http://www.w3.org/1999/xhtml",u=document.createElementNS(c,"svg");u.setAttribute("xmlns",c),u.style.position="absolute",u.style.width="0",u.style.height="0",u.style.overflow="hidden",u.style.display="none";const p=document.createElementNS(c,"defs");u.appendChild(p);for(let h=0;h<l.length;h++)p.appendChild(l[h]);i.appendChild(u)}return i}async function Dn(i,n,o){return!o&&n.filter&&!n.filter(i)?null:Promise.resolve(i).then(s=>cc(s,n)).then(s=>pc(i,s,n)).then(s=>gc(i,s,n)).then(s=>vc(s,n))}const mr=/url\((['"]?)([^'"]+?)\1\)/g,yc=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,bc=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function wc(i){const n=i.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${n})(['"]?\\))`,"g")}function xc(i){const n=[];return i.replace(mr,(o,s,l)=>(n.push(l),o)),n.filter(o=>!Da(o))}async function _c(i,n,o,s,l){try{const c=o?Ud(n,o):n,u=Qa(n);let p;return l||(p=await eo(c,u,s)),i.replace(wc(n),`$1${p}$3`)}catch{}return i}function kc(i,{preferredFontFormat:n}){return n?i.replace(bc,o=>{for(;;){const[s,,l]=yc.exec(o)||[];if(!l)return"";if(l===n)return`src: ${s};`}}):i}function fr(i){return i.search(mr)!==-1}async function gr(i,n,o){if(!fr(i))return i;const s=kc(i,o);return xc(s).reduce((c,u)=>c.then(p=>_c(p,u,n,o)),Promise.resolve(s))}async function si(i,n,o){var s;const l=(s=n.style)===null||s===void 0?void 0:s.getPropertyValue(i);if(l){const c=await gr(l,null,o);return n.style.setProperty(i,c,n.style.getPropertyPriority(i)),!0}return!1}async function zc(i,n){await si("background",i,n)||await si("background-image",i,n),await si("mask",i,n)||await si("-webkit-mask",i,n)||await si("mask-image",i,n)||await si("-webkit-mask-image",i,n)}async function Lc(i,n){const o=Ve(i,HTMLImageElement);if(!(o&&!Da(i.src))&&!(Ve(i,SVGImageElement)&&!Da(i.href.baseVal)))return;const s=o?i.src:i.href.baseVal,l=await eo(s,Qa(s),n);await new Promise((c,u)=>{i.onload=c,i.onerror=n.onImageErrorHandler?(...h)=>{try{c(n.onImageErrorHandler(...h))}catch(f){u(f)}}:u;const p=i;p.decode&&(p.decode=c),p.loading==="lazy"&&(p.loading="eager"),o?(i.srcset="",i.src=l):i.href.baseVal=l})}async function $c(i,n){const s=Ot(i.childNodes).map(l=>vr(l,n));await Promise.all(s).then(()=>i)}async function vr(i,n){Ve(i,Element)&&(await zc(i,n),await Lc(i,n),await $c(i,n))}function Ec(i,n){const{style:o}=i;n.backgroundColor&&(o.backgroundColor=n.backgroundColor),n.width&&(o.width=`${n.width}px`),n.height&&(o.height=`${n.height}px`);const s=n.style;return s!=null&&Object.keys(s).forEach(l=>{o[l]=s[l]}),i}const $s={};async function Es(i){let n=$s[i];if(n!=null)return n;const s=await(await fetch(i)).text();return n={url:i,cssText:s},$s[i]=n,n}async function Cs(i,n){let o=i.cssText;const s=/url\(["']?([^"')]+)["']?\)/g,c=(o.match(/url\([^)]+\)/g)||[]).map(async u=>{let p=u.replace(s,"$1");return p.startsWith("https://")||(p=new URL(p,i.url).href),pr(p,n.fetchRequestInit,({result:h})=>(o=o.replace(u,`url(${h})`),[u,h]))});return Promise.all(c).then(()=>o)}function Ss(i){if(i==null)return[];const n=[],o=/(\/\*[\s\S]*?\*\/)/gi;let s=i.replace(o,"");const l=new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi");for(;;){const h=l.exec(s);if(h===null)break;n.push(h[0])}s=s.replace(l,"");const c=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,u="((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",p=new RegExp(u,"gi");for(;;){let h=c.exec(s);if(h===null){if(h=p.exec(s),h===null)break;c.lastIndex=p.lastIndex}else p.lastIndex=c.lastIndex;n.push(h[0])}return n}async function Cc(i,n){const o=[],s=[];return i.forEach(l=>{if("cssRules"in l)try{Ot(l.cssRules||[]).forEach((c,u)=>{if(c.type===CSSRule.IMPORT_RULE){let p=u+1;const h=c.href,f=Es(h).then(g=>Cs(g,n)).then(g=>Ss(g).forEach(v=>{try{l.insertRule(v,v.startsWith("@import")?p+=1:l.cssRules.length)}catch(b){console.error("Error inserting rule from remote css",{rule:v,error:b})}})).catch(g=>{console.error("Error loading remote css",g.toString())});s.push(f)}})}catch(c){const u=i.find(p=>p.href==null)||document.styleSheets[0];l.href!=null&&s.push(Es(l.href).then(p=>Cs(p,n)).then(p=>Ss(p).forEach(h=>{u.insertRule(h,u.cssRules.length)})).catch(p=>{console.error("Error loading remote stylesheet",p)})),console.error("Error inlining remote css file",c)}}),Promise.all(s).then(()=>(i.forEach(l=>{if("cssRules"in l)try{Ot(l.cssRules||[]).forEach(c=>{o.push(c)})}catch(c){console.error(`Error while reading CSS rules from ${l.href}`,c)}}),o))}function Sc(i){return i.filter(n=>n.type===CSSRule.FONT_FACE_RULE).filter(n=>fr(n.style.getPropertyValue("src")))}async function Tc(i,n){if(i.ownerDocument==null)throw new Error("Provided element is not within a Document");const o=Ot(i.ownerDocument.styleSheets),s=await Cc(o,n);return Sc(s)}function yr(i){return i.trim().replace(/["']/g,"")}function Mc(i){const n=new Set;function o(s){(s.style.fontFamily||getComputedStyle(s).fontFamily).split(",").forEach(c=>{n.add(yr(c))}),Array.from(s.children).forEach(c=>{c instanceof HTMLElement&&o(c)})}return o(i),n}async function Ic(i,n){const o=await Tc(i,n),s=Mc(i);return(await Promise.all(o.filter(c=>s.has(yr(c.style.fontFamily))).map(c=>{const u=c.parentStyleSheet?c.parentStyleSheet.href:null;return gr(c.cssText,u,n)}))).join(`
`)}async function Ac(i,n){const o=n.fontEmbedCSS!=null?n.fontEmbedCSS:n.skipFonts?null:await Ic(i,n);if(o){const s=document.createElement("style"),l=document.createTextNode(o);s.appendChild(l),i.firstChild?i.insertBefore(s,i.firstChild):i.appendChild(s)}}async function Pc(i,n={}){const{width:o,height:s}=ur(i,n),l=await Dn(i,n,!0);return await Ac(l,n),await vr(l,n),Ec(l,n),await Jd(l,o,s)}async function Bc(i,n={}){const{width:o,height:s}=ur(i,n),l=await Pc(i,n),c=await $n(l),u=document.createElement("canvas"),p=u.getContext("2d"),h=n.pixelRatio||Gd(),f=n.canvasWidth||o,g=n.canvasHeight||s;return u.width=f*h,u.height=g*h,n.skipAutoScale||Kd(u),u.style.width=`${f}`,u.style.height=`${g}`,n.backgroundColor&&(p.fillStyle=n.backgroundColor,p.fillRect(0,0,u.width,u.height)),p.drawImage(c,0,0,u.width,u.height),u}async function Rc(i,n={}){return(await Bc(i,n)).toDataURL()}function ze(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const En='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230f172a"/><stop offset="50%" stop-color="%231e293b"/><stop offset="100%" stop-color="%23ea580c"/></linearGradient><pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 20 L40 20 M20 0 L20 40" stroke="rgba(255,255,255,0.04)" stroke-width="1"/></pattern></defs><rect width="800" height="800" fill="url(%23g)"/><rect width="800" height="800" fill="url(%23p)"/><circle cx="400" cy="400" r="260" fill="none" stroke="rgba(255,90,54,0.15)" stroke-width="3" stroke-dasharray="8 8"/><text x="400" y="415" font-family="system-ui,-apple-system,sans-serif" font-weight="900" font-size="32" fill="rgba(255,255,255,0.2)" text-anchor="middle" letter-spacing="4">CIVIC KALKI</text></svg>';function Oc(i=""){const n=String(i).trim();if(!n)return{top:"",bottom:""};if(n.includes(`
`)){const c=n.split(`
`).filter(Boolean);return{top:c[0]||"",bottom:c.slice(1).join(" ")||""}}if(n.includes(" // ")){const[c,...u]=n.split(" // ");return{top:c,bottom:u.join(" // ")}}const o=n.split(new RegExp("(?<=[.?!])\\s+"));if(o.length>=2)return{top:o[0],bottom:o.slice(1).join(" ")};const s=n.split(/\s+/);if(s.length<=4)return{top:"",bottom:n};const l=Math.ceil(s.length/2);return{top:s.slice(0,l).join(" "),bottom:s.slice(l).join(" ")}}function br({template:i="meme",style:n="funny",caption:o="",cta_text:s="",issue:l={},imageUrl:c=null}){const u=c||l.image_url||En,p=l.name||l.title||"Civic Issue",h=l.area||"City Ward",f=l.status||"Active",g=l.entity_id||l.id||"—";i==="initiative"||l.entity_type_id===2||l.type;const v=`
    <div class="ck-card-watermark">
      <span class="ck-wm-flame">${R.flame(14,"#ff5a36")}</span>
      <span class="ck-wm-brand">CIVIC-KALKI</span>
    </div>
  `;if(i==="meme"){const{top:w,bottom:z}=Oc(o),x=s||"Take Civic Action";return`
      <div class="ck-card-canvas ck-template-meme" data-template="meme" data-style="${ze(n)}">
        <div class="ck-card-bg-layer" style="background-image: url('${ze(u)}');"></div>
        <div class="ck-card-meme-overlay"></div>
        
        ${v}

        <div class="ck-meme-top-bar">
          <span class="ck-meme-issue-tag" style="display:inline-flex; align-items:center; gap:4px;">${R.pin(12,"currentColor")} ${ze(h)} · #${ze(g)}</span>
        </div>

        <div class="ck-meme-text-top">
          ${ze(w)}
        </div>

        <div class="ck-meme-bottom-wrap">
          <div class="ck-meme-text-bottom">
            ${ze(z||w?z:o)}
          </div>
          ${x?`<div class="ck-meme-cta-pill" style="display:inline-flex; align-items:center; gap:5px;">${R.zap(12,"#ea580c")} ${ze(x)}</div>`:""}
        </div>
      </div>
    `}if(i==="awareness"){const w=s||"Demand Immediate Fix";return`
      <div class="ck-card-canvas ck-template-awareness" data-template="awareness" data-style="${ze(n)}">
        <div class="ck-card-bg-layer" style="background-image: url('${ze(u)}');"></div>
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
          <div class="ck-awareness-title">${ze(p)}</div>
          <div class="ck-awareness-caption">"${ze(o)}"</div>
        </div>

        <!-- Fact Strip -->
        <div class="ck-awareness-fact-strip">
          <div class="ck-fact-item">
            <span class="ck-fact-label">LOCATION</span>
            <span class="ck-fact-value" style="display:inline-flex; align-items:center; gap:4px;">${R.pin(12,"#38bdf8")} ${ze(h)}</span>
          </div>
          <div class="ck-fact-item">
            <span class="ck-fact-label">STATUS</span>
            <span class="ck-fact-value ck-status-${ze(f).toLowerCase()}">${ze(f)}</span>
          </div>
          <div class="ck-fact-item">
            <span class="ck-fact-label">JURISDICTION</span>
            <span class="ck-fact-value">Municipal Corp</span>
          </div>
        </div>

        <!-- Call to Action Strip -->
        <div class="ck-awareness-cta-strip">
          <div class="ck-awareness-cta-text" style="display:inline-flex; align-items:center; gap:6px;">
            <span style="display:inline-flex; align-items:center;">${R.awareness(16,"#38bdf8")}</span> ${ze(w)}
          </div>
          <div class="ck-awareness-cta-btn">ACT NOW →</div>
        </div>
      </div>
    `}const b=s||"Join The Community Action";return`
    <div class="ck-card-canvas ck-template-initiative" data-template="initiative" data-style="${ze(n)}">
      <div class="ck-card-bg-layer" style="background-image: url('${ze(u)}');"></div>
      <div class="ck-initiative-scrim"></div>

      ${v}

      <!-- Top Initiative Banner -->
      <div class="ck-initiative-header">
        <div class="ck-initiative-tag" style="display:inline-flex; align-items:center; gap:6px;">
          ${R.initiative(14,"#4ade80")} COMMUNITY INITIATIVE
        </div>
        <span class="ck-initiative-phase">Active Movement</span>
      </div>

      <!-- Main Initiative Callout -->
      <div class="ck-initiative-body">
        <div class="ck-initiative-title">${ze(p)}</div>
        <div class="ck-initiative-caption">"${ze(o)}"</div>
      </div>

      <!-- Date & Place Strip -->
      <div class="ck-initiative-strip">
        <div class="ck-init-info-pill">
          <span class="ck-init-icon" style="display:inline-flex; align-items:center;">${R.calendar(16,"#4ade80")}</span>
          <div>
            <div class="ck-init-sub">TIMELINE</div>
            <div class="ck-init-main">This Weekend & Ongoing</div>
          </div>
        </div>
        <div class="ck-init-info-pill">
          <span class="ck-init-icon" style="display:inline-flex; align-items:center;">${R.pin(16,"#4ade80")}</span>
          <div>
            <div class="ck-init-sub">MEETING POINT</div>
            <div class="ck-init-main">${ze(h)}</div>
          </div>
        </div>
      </div>

      <!-- Prominent "Join" Strip -->
      <div class="ck-initiative-join-strip">
        <div class="ck-join-cta-content">
          <span class="ck-join-badge" style="display:inline-flex; align-items:center; gap:4px;">${R.zap(12,"#15803d")} VOLUNTEER</span>
          <span class="ck-join-text">${ze(b)}</span>
        </div>
        <button type="button" class="ck-join-action-btn" style="display:inline-flex; align-items:center; gap:6px;">
          <span>Join Now</span> <span style="display:inline-flex; align-items:center;">${R.handshake(14,"#ffffff")}</span>
        </button>
      </div>
    </div>
  `}async function Nc(i){if(!i)throw new Error("DOM node is required for PNG rendering.");return await Rc(i,{quality:.95,pixelRatio:2,skipFonts:!1,cacheBust:!0})}function Le(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}async function wr(i,n=null){var _,B,O,G,ae,U;const o=document.getElementById("ck-buzz-detail-modal-root");o&&o.remove();const s=He(),l=i.linked_type==="initiative",c=i.image_url||En,u=document.createElement("div");u.id="ck-buzz-detail-modal-root",u.className="ck-buzz-modal-backdrop",u.innerHTML=`
    <div class="ck-buzz-modal-dialog" role="dialog" aria-modal="true">
      <!-- Modal Header -->
      <div class="ck-buzz-modal-topbar">
        <div class="ck-buzz-modal-title-wrap">
          <span class="ck-buzz-fire-tag">${R.flame(13,"#ea580c")} CIVIC BUZZ</span>
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
          <img src="${Le(c)}" alt="${Le(i.caption)}" class="ck-buzz-modal-img" onerror="this.src='${En}'" />
          <div class="ck-buzz-modal-scrim"></div>
          <div class="ck-buzz-modal-meme-caption">
            ${Le(i.caption)}
          </div>
          ${i.cta_text?`<div class="ck-buzz-modal-cta-badge">${R.zap(12,"#ea580c")} ${Le(i.cta_text)}</div>`:""}
          <div class="ck-card-watermark">
            <span class="ck-wm-flame">${R.flame(14,"var(--primary)")}</span>
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
            ${i.linked_area?`<div style="font-size: 0.75rem; color: #64748b; display:inline-flex; align-items:center; gap:4px;">${R.pin(13,"#64748b")} ${Le(i.linked_area)}</div>`:""}
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="ck-modal-view-issue-btn" style="border-radius: 999px; font-weight: 700;">
            View Issue →
          </button>
        </div>

        <!-- Engagement Action Buttons Row -->
        <div class="ck-buzz-modal-actions-bar">
          <button type="button" class="ck-buzz-act-btn ${i.has_voted?"active":""}" id="ck-modal-upvote-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            <span id="ck-modal-vote-label">${i.has_voted?"Upvoted":"Upvote"}</span>
            <span class="ck-buzz-count-badge" id="ck-modal-vote-count">${i.vote_count||0}</span>
          </button>

          <button type="button" class="ck-buzz-act-btn ${i.is_following?"active":""}" id="ck-modal-follow-btn">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            <span id="ck-modal-follow-label">${i.is_following?"Following Status":"Follow Status"}</span>
          </button>

          <button type="button" class="ck-buzz-act-btn" id="ck-modal-share-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            <span>Share</span>
          </button>

          ${l?`
            <button type="button" class="ck-buzz-act-btn ck-buzz-join-btn" id="ck-modal-join-btn">
              ${R.handshake(15,"#15803d")} <span>Join / Volunteer</span>
            </button>
          `:""}

          <button type="button" class="ck-buzz-act-btn" id="ck-modal-report-issue-btn" title="Report or escalate this civic issue via Civic Assistant">
            ${R.alert(14,"#ef4444")} <span>Report Issue</span>
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
              placeholder="${s?"Add to the conversation (respectful, problem-focused)...":"Sign in to add a comment..."}"
              ${s?"":"disabled"}
              maxlength="500"
            />
            <button type="button" id="ck-modal-comment-send" class="btn btn-primary btn-sm" style="border-radius: 999px; padding: 6px 14px;" ${s?"":"disabled"}>
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
  `,document.body.appendChild(u);const p=()=>u.remove();u.addEventListener("click",M=>{M.target===u&&p()}),(_=u.querySelector("#ck-modal-close-btn"))==null||_.addEventListener("click",p);const h=u.querySelector("#ck-modal-upvote-btn"),f=u.querySelector("#ck-modal-vote-count"),g=u.querySelector("#ck-modal-vote-label");h==null||h.addEventListener("click",async()=>{if(!He()){vt("Please sign in to upvote."),X("/login");return}try{const M=await ge.vote(i.id);M.voted?(h.classList.add("active"),g.textContent="Upvoted"):(h.classList.remove("active"),g.textContent="Upvote"),f.textContent=M.vote_count,i.has_voted=M.voted,i.vote_count=M.vote_count,typeof n=="function"&&n(i)}catch(M){ee(M.message||"Could not register vote")}});const v=u.querySelector("#ck-modal-follow-btn"),b=u.querySelector("#ck-modal-follow-label");v==null||v.addEventListener("click",async()=>{if(!He()){vt("Please sign in to follow this conversation."),X("/login");return}try{const M=await ge.follow(i.id);M.following?(v.classList.add("active"),b.textContent="Following Status",we("Now following civic issue updates!")):(v.classList.remove("active"),b.textContent="Follow Status",toast("Unfollowed issue updates.")),i.is_following=M.following,typeof n=="function"&&n(i)}catch(M){ee(M.message||"Could not update follow status")}}),(B=u.querySelector("#ck-modal-view-issue-btn"))==null||B.addEventListener("click",()=>{ge.logEvent(i.id,"click_issue").catch(()=>{}),p(),X(`/entities/${i.linked_id}`)}),(O=u.querySelector("#ck-modal-share-btn"))==null||O.addEventListener("click",()=>{Hn(i)}),(G=u.querySelector("#ck-modal-join-btn"))==null||G.addEventListener("click",async()=>{try{await ge.logEvent(i.id,"join"),we("Thank you for volunteering! Opening initiative details..."),setTimeout(()=>{p(),X(`/entities/${i.linked_id}`)},700)}catch{X(`/entities/${i.linked_id}`)}}),(ae=u.querySelector("#ck-modal-report-issue-btn"))==null||ae.addEventListener("click",()=>{p(),X("/dashboard"),setTimeout(()=>{const M=document.getElementById("ck-dark-input");M&&(M.value=`Regarding issue #${i.linked_id} (${i.linked_title||i.caption}): `,M.focus())},200)}),(U=u.querySelector("#ck-modal-report-btn"))==null||U.addEventListener("click",()=>{const M=window.prompt(`Why are you reporting this Civic Buzz post?
(e.g., Offensive language, personal data, misleading claim)`);M&&M.trim()&&ge.report(i.id,M.trim()).then(H=>{we(H.message||"Report received. Thank you for keeping our community safe.")}).catch(H=>{ee(H.message||"Could not submit report")})});async function w(){const M=u.querySelector("#ck-modal-comments-list"),H=u.querySelector("#ck-modal-comments-count");try{const V=(await ge.getComments(i.id)).data||[];if(H.textContent=`${V.length} comment${V.length===1?"":"s"}`,V.length===0){M.innerHTML=`
          <div style="text-align:center; padding:16px; color:#94a3b8; font-size:0.8rem;">
            No comments yet. Start the conversation!
          </div>
        `;return}M.innerHTML=V.map(le=>`
        <div class="ck-buzz-comment-item">
          <div class="ck-buzz-comment-meta">
            <span class="ck-buzz-comment-author" style="display:inline-flex; align-items:center; gap:4px;">${R.user(13,"#64748b")} ${Le(le.author_name)}</span>
            <span class="ck-buzz-comment-time">${new Date(le.created_at).toLocaleDateString()}</span>
          </div>
          <div class="ck-buzz-comment-text">${Le(le.text)}</div>
        </div>
      `).join("")}catch{M.innerHTML='<div style="text-align:center; padding:12px; color:#ef4444; font-size:0.75rem;">Failed to load comments</div>'}}const z=u.querySelector("#ck-modal-comment-input"),x=u.querySelector("#ck-modal-comment-send"),I=u.querySelector("#ck-modal-comment-error");async function C(){var H;const M=z.value.trim();if(M){I.style.display="none",x.disabled=!0;try{await ge.addComment(i.id,M),z.value="",we("Comment posted!"),await w()}catch(Y){I.textContent=((H=Y.data)==null?void 0:H.message)||Y.message||"Failed to submit comment",I.style.display="block"}finally{x.disabled=!1}}}x==null||x.addEventListener("click",C),z==null||z.addEventListener("keydown",M=>{M.key==="Enter"&&(M.preventDefault(),C())}),await w()}async function qi(i=null,n=null,o=null){const s=document.getElementById("ck-buzz-create-modal-root");s&&s.remove();const l=He();if(!l){vt("Please sign in to create a Civic Buzz post."),X("/login");return}let c=[];try{const[_,B]=await Promise.all([be.list({owner_user_id:l.user_id,limit:50}).catch(()=>({data:[]})),be.list({limit:50}).catch(()=>({data:[]}))]),O=new Map;(_.data||[]).forEach(G=>O.set(G.entity_id,{...G,is_mine:!0})),(B.data||[]).forEach(G=>{O.has(G.entity_id)||O.set(G.entity_id,{...G,is_mine:!1})}),c=Array.from(O.values())}catch{c=[]}let u=o?4:1,p=o?o.template==="initiative"?"promote_initiative":o.template==="awareness"?"awareness_card":"meme_issue":"meme_issue",h=null,f=(o==null?void 0:o.style)||"funny",g=[],v=(o==null?void 0:o.caption)||"",b=(o==null?void 0:o.cta_text)||"",w=null;i?h=c.find(_=>String(_.entity_id)===String(i))||null:o!=null&&o.linked_id&&(h=c.find(_=>String(_.entity_id)===String(o.linked_id))||null),!h&&c.length>0&&(h=c[0]);function z(){return p==="promote_initiative"?{template:"initiative",linked_type:"initiative"}:p==="awareness_card"?{template:"awareness",linked_type:"issue"}:p==="share_issue"?{template:"awareness",linked_type:"issue"}:{template:"meme",linked_type:"issue"}}const x=document.createElement("div");x.id="ck-buzz-create-modal-root",x.className="ck-buzz-modal-backdrop",document.body.appendChild(x);const I=()=>x.remove();x.addEventListener("click",_=>{_.target===x&&I()});async function C(){var G,ae,U,M,H,Y,V,le;const{template:_,linked_type:B}=z();x.innerHTML=`
      <div class="ck-buzz-modal-dialog" role="dialog" aria-modal="true" style="max-width: 620px; border-radius: 20px;">
        <!-- Top bar with Title & Close -->
        <div class="ck-buzz-modal-topbar" style="padding: 16px 22px;">
          <div class="ck-buzz-modal-title-wrap">
            <span style="display:inline-flex; align-items:center; color:var(--primary);">${R.sparkles(20,"var(--primary)")}</span>
            <span style="font-weight: 800; font-size: 1.1rem; color: #0f172a;">
              ${o?"Edit Civic Buzz Post":"Create Civic Buzz Post"}
            </span>
          </div>
          <button type="button" class="ck-buzz-close-btn" id="ck-wiz-close-btn" aria-label="Close modal">✕</button>
        </div>

        <!-- 5-Step Progress Tracker -->
        <div class="ck-wizard-step-tracker">
          <div class="ck-wizard-step-node ${u===1?"active":u>1?"completed":""}">
            <div class="ck-wizard-step-badge">${u>1?R.check(13,"#ffffff"):"1"}</div>
            <span>Type</span>
          </div>
          <div class="ck-wizard-step-line ${u>1?"completed":""}"></div>

          <div class="ck-wizard-step-node ${u===2?"active":u>2?"completed":""}">
            <div class="ck-wizard-step-badge">${u>2?R.check(13,"#ffffff"):"2"}</div>
            <span>Issue</span>
          </div>
          <div class="ck-wizard-step-line ${u>2?"completed":""}"></div>

          <div class="ck-wizard-step-node ${u===3?"active":u>3?"completed":""}">
            <div class="ck-wizard-step-badge">${u>3?R.check(13,"#ffffff"):"3"}</div>
            <span>Style</span>
          </div>
          <div class="ck-wizard-step-line ${u>3?"completed":""}"></div>

          <div class="ck-wizard-step-node ${u===4?"active":u>4?"completed":""}">
            <div class="ck-wizard-step-badge">${u>4?R.check(13,"#ffffff"):"4"}</div>
            <span>Caption</span>
          </div>
          <div class="ck-wizard-step-line ${u>4?"completed":""}"></div>

          <div class="ck-wizard-step-node ${u===5?"active":""}">
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
          <button type="button" class="btn btn-secondary" id="ck-wiz-prev-btn" style="border-radius:999px; font-weight:700;" ${u===1?"disabled":""}>
            ← Back
          </button>

          <div style="display:flex; gap:10px;">
            ${u===5?`
              <button type="button" class="btn btn-secondary" id="ck-wiz-draft-btn" style="border-radius:999px; font-weight:700;">
                Save as Draft
              </button>
              <button type="button" class="btn btn-primary" id="ck-wiz-publish-btn" style="border-radius:999px; font-weight:800; padding:10px 22px; background:linear-gradient(135deg, var(--primary), #ea580c); display:inline-flex; align-items:center; gap:6px;">
                <span>Publish to Civic Buzz</span> ${R.flame(16,"#ffffff")}
              </button>
            `:`
              <button type="button" class="btn btn-primary" id="ck-wiz-next-btn" style="border-radius:999px; font-weight:700; padding:10px 24px;">
                Continue →
              </button>
            `}
          </div>
        </div>
      </div>
    `,(G=x.querySelector("#ck-wiz-close-btn"))==null||G.addEventListener("click",I),(ae=x.querySelector("#ck-wiz-prev-btn"))==null||ae.addEventListener("click",()=>{u>1&&(u--,C())});const O=x.querySelector("#ck-wiz-step-content");if(u===1){O.innerHTML=`
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
          <div class="ck-wizard-type-card ${p==="meme_issue"?"active":""}" data-type="meme_issue">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#ea580c;">${R.flame(24,"#ea580c")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Viral / Funny</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Meme about a civic issue</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              High-impact bold meme typography over photo highlighting potholes, water breaks, or city hazards.
            </div>
          </div>

          <!-- Option 2: Awareness Card -->
          <div class="ck-wizard-type-card ${p==="awareness_card"?"active":""}" data-type="awareness_card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#0284c7;">${R.awareness(24,"#0284c7")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Informative</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Awareness card</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              Civic bulletin with verified fact strip (area, status, category) and direct demand for municipal action.
            </div>
          </div>

          <!-- Option 3: Initiative -->
          <div class="ck-wizard-type-card ${p==="promote_initiative"?"active":""}" data-type="promote_initiative">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#16a34a;">${R.initiative(24,"#16a34a")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Movement</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Promote community initiative</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              Rally neighborhood volunteers with meeting point, schedule, and prominent "Join" volunteer strip.
            </div>
          </div>

          <!-- Option 4: Share Issue -->
          <div class="ck-wizard-type-card ${p==="share_issue"?"active":""}" data-type="share_issue">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#eab308;">${R.zap(24,"#eab308")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Civic Case</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Share an existing issue</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              Turn an open CIVIC-KALKI complaint into a viral public post to accelerate official ward response.
            </div>
          </div>
        </div>
      `,O.querySelectorAll(".ck-wizard-type-card").forEach(N=>{N.addEventListener("click",()=>{p=N.getAttribute("data-type"),O.querySelectorAll(".ck-wizard-type-card").forEach(F=>F.classList.remove("active")),N.classList.add("active")})}),(U=x.querySelector("#ck-wiz-next-btn"))==null||U.addEventListener("click",()=>{u=2,C()});return}if(u===2){let W=function(ue=""){const q=ue.toLowerCase().trim(),Se=c.filter(A=>{if(!q)return!0;const Q=(A.name||"").toLowerCase().includes(q),ve=(A.area||"").toLowerCase().includes(q),pe=String(A.entity_id).includes(q);return Q||ve||pe});if(Se.length===0){F.innerHTML="",P.style.display="block";return}P.style.display="none",F.innerHTML=Se.map(A=>{const Q=h&&h.entity_id===A.entity_id;return A.entity_type_id===1||A.entity_type_id,`
            <div class="ck-wizard-entity-card ${Q?"active":""}" data-id="${A.entity_id}" style="
              border: 1.5px solid ${Q?"var(--primary)":"#e2e8f0"};
              background: ${Q?"#fff7ed":"#ffffff"};
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
                  <span style="font-size:0.7rem; font-weight:800; color:var(--primary);">#${A.entity_id}</span>
                  <span class="badge badge-secondary" style="font-size:0.65rem;">${A.is_mine?"My Item":"Community"}</span>
                  <span class="ck-buzz-status-pill ${Le(A.status||"submitted")}" style="font-size:0.65rem; padding:1px 6px;">
                    ${Le(A.status||"Active")}
                  </span>
                </div>
                <div style="font-weight:700; font-size:0.88rem; color:#0f172a; margin-top:2px;" class="ck-truncate">
                  ${Le(A.name)}
                </div>
                ${A.area?`<div style="font-size:0.75rem; color:#64748b; display:inline-flex; align-items:center; gap:4px;">${R.pin(12,"#64748b")} ${Le(A.area)}</div>`:""}
              </div>
              <div style="display:flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:50%; ${Q?"background:var(--primary); color:#ffffff;":"border:1.5px solid #cbd5e1; color:transparent;"}">
                ${Q?R.check(13,"#ffffff"):""}
              </div>
            </div>
          `}).join(""),F.querySelectorAll(".ck-wizard-entity-card").forEach(A=>{A.addEventListener("click",()=>{const Q=Number(A.getAttribute("data-id"));h=c.find(ve=>ve.entity_id===Q)||null,W(N.value)})})};O.innerHTML=`
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
      `;const N=O.querySelector("#ck-wiz-entity-search"),F=O.querySelector("#ck-wiz-entity-list"),P=O.querySelector("#ck-wiz-entity-empty");W(),N.addEventListener("input",ue=>W(ue.target.value)),(M=x.querySelector("#ck-wiz-next-btn"))==null||M.addEventListener("click",()=>{if(!h){vt("Please select an issue or initiative to link.");return}u=3,C()});return}if(u===3){O.innerHTML=`
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
          <div class="ck-wizard-type-card ${f==="funny"?"active":""}" data-style="funny">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#ea580c;">${R.smile(24,"#ea580c")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Viral Relay</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Funny and relatable</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              Witty, self-deprecating street humor mocking the civic obstacle, never mocking people or communities.
            </div>
          </div>

          <!-- Style 2: Informative -->
          <div class="ck-wizard-type-card ${f==="informative"?"active":""}" data-style="informative">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#0284c7;">${R.clipboard(24,"#0284c7")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Direct & Clear</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Informative</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              Sharp, data-driven facts highlighting duration, safety hazards, and exact municipal ward accountability.
            </div>
          </div>

          <!-- Style 3: Emotional -->
          <div class="ck-wizard-type-card ${f==="emotional"?"active":""}" data-style="emotional">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; color:#16a34a;">${R.handshake(24,"#16a34a")}</span>
              <span class="badge badge-secondary" style="font-size:0.65rem;">Community Pride</span>
            </div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">Emotional-community-focused</div>
            <div style="font-size: 0.78rem; color: #64748b;">
              Heartfelt, neighborhood solidarity calling on citizens to protect senior citizens, children, and our parks.
            </div>
          </div>
        </div>
      `,O.querySelectorAll(".ck-wizard-type-card").forEach(N=>{N.addEventListener("click",()=>{f=N.getAttribute("data-style"),O.querySelectorAll(".ck-wizard-type-card").forEach(F=>F.classList.remove("active")),N.classList.add("active")})}),(H=x.querySelector("#ck-wiz-next-btn"))==null||H.addEventListener("click",()=>{u=4,C()});return}if(u===4){O.innerHTML=`
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
            <span style="display:inline-flex; align-items:center;">${R.bot(15,"#475569")}</span> Regenerate Captions
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
      `;const N=O.querySelector("#ck-wiz-ai-loading"),F=O.querySelector("#ck-wiz-caption-cards"),P=O.querySelector("#ck-wiz-regen-btn"),W=O.querySelector("#ck-wiz-caption-input"),ue=O.querySelector("#ck-wiz-cta-input");async function q(){N.style.display="block",F.style.display="none";try{const Se=await ge.generateCaptions({linked_id:h.entity_id,linked_type:B,template:_,style:f});if(g=Se.captions||[],N.style.display="none",F.style.display="flex",g.length===0){F.innerHTML=`<div style="font-size:0.8rem; color:#ef4444; padding:8px;">${Le(Se.reason||"Could not generate AI captions. You can type your own below.")}</div>`;return}F.innerHTML=g.map((A,Q)=>`
            <div class="ck-wiz-caption-opt" data-idx="${Q}" style="
              border: 1.5px solid #e2e8f0;
              background: #f8fafc;
              border-radius: 10px;
              padding: 10px 14px;
              cursor: pointer;
              transition: all 0.15s;
            ">
              <div style="font-weight:700; color:#0f172a; font-size:0.88rem;">"${Le(A.caption)}"</div>
              <div style="font-size:0.72rem; font-weight:700; color:var(--primary); margin-top:3px;">
                CTA: ${Le(A.cta_text||"Take Action")}
              </div>
            </div>
          `).join(""),!W.value&&g[0]&&(W.value=g[0].caption,ue.value=g[0].cta_text||"",v=W.value,b=ue.value),F.querySelectorAll(".ck-wiz-caption-opt").forEach(A=>{A.addEventListener("click",()=>{const Q=Number(A.getAttribute("data-idx")),ve=g[Q];ve&&(W.value=ve.caption,ue.value=ve.cta_text||"",v=ve.caption,b=ve.cta_text||"",we("Caption applied! You can customize it freely."))})})}catch(Se){N.style.display="none",F.style.display="flex",F.innerHTML=`<div style="font-size:0.8rem; color:#ef4444; padding:8px;">Failed to generate AI captions: ${Le(Se.message)}. Please enter your caption below.</div>`}}P==null||P.addEventListener("click",q),W.addEventListener("input",()=>{v=W.value}),ue.addEventListener("input",()=>{b=ue.value}),g.length===0?q():(N.style.display="none",F.style.display="flex"),(Y=x.querySelector("#ck-wiz-next-btn"))==null||Y.addEventListener("click",()=>{if(v=W.value.trim(),b=ue.value.trim(),!v){vt("Please enter or select a caption.");return}u=5,C()});return}if(u===5){O.innerHTML=`
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
          ${br({template:_,style:f,caption:v,cta_text:b,issue:h})}
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
      `;const N=O.querySelector("#ck-wiz-render-mount .ck-card-canvas"),F=O.querySelector("#ck-wiz-preview-loading"),P=O.querySelector("#ck-wiz-preview-box"),W=O.querySelector("#ck-wiz-preview-img"),ue=O.querySelector("#ck-wiz-safety-alert");try{w=await Nc(N),W.src=w,F.style.display="none",P.style.display="flex"}catch(Se){console.error("html-to-image render error:",Se),F.innerHTML='<div style="color:#fca5a5; font-size:0.8rem;">Preview generated via HTML/CSS layout</div>',P.innerHTML=N.outerHTML,P.style.display="flex"}async function q(Se){var ve;ue.style.display="none";const A=x.querySelector("#ck-wiz-publish-btn"),Q=x.querySelector("#ck-wiz-draft-btn");A.disabled=!0,Q.disabled=!0,Se==="published"?A.textContent="Verifying Safety...":Q.textContent="Saving...";try{let pe=null;if(w)try{pe=(await ge.uploadImage(w)).image_url}catch(de){console.warn("Could not store PNG file, saving data URL fallback:",de),pe=w}const ye={linked_type:B,linked_id:Number(h.entity_id),template:_,style:f,caption:v,cta_text:b||null,image_url:pe,status:Se};o&&o.id?await ge.update(o.id,ye):await ge.create(ye),we(Se==="published"?"Civic Buzz post published to community!":"Draft saved under My Civic Activity!"),I(),typeof n=="function"&&n()}catch(pe){ue.textContent=((ve=pe.data)==null?void 0:ve.message)||pe.message||"Submission failed. Please revise.",ue.style.display="block"}finally{A.disabled=!1,Q.disabled=!1,A.innerHTML=`<span>Publish to Civic Buzz</span> ${R.flame(16,"#ffffff")}`,Q.textContent="Save as Draft"}}(V=x.querySelector("#ck-wiz-publish-btn"))==null||V.addEventListener("click",()=>q("published")),(le=x.querySelector("#ck-wiz-draft-btn"))==null||le.addEventListener("click",()=>q("draft"))}}await C()}function It(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const Ts='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="50%" stop-color="%230f172a"/><stop offset="100%" stop-color="%23ea580c"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g)"/><text x="50%" y="46%" font-family="system-ui,-apple-system,sans-serif" font-weight="900" font-size="28" fill="%23ffffff" text-anchor="middle" letter-spacing="1">CIVIC BUZZ</text><text x="50%" y="56%" font-family="system-ui,-apple-system,sans-serif" font-weight="600" font-size="15" fill="%23fdba74" text-anchor="middle">YOUTH-POWERED CIVIC CONVERSATION</text></svg>';function jc(){return`
    <div class="ck-rx-sidebar-panel ck-buzz-carousel-panel" id="ck-buzz-carousel-container">
      <!-- Carousel Header (Clickable to open full-page gallery) -->
      <div class="ck-buzz-header-row" id="ck-buzz-header-click" title="Open Civic Buzz Gallery" style="cursor: pointer;">
        <div>
          <div class="ck-buzz-brand-title">
            <span>CIVIC BUZZ</span>
            <span class="ck-buzz-flame" style="display:inline-flex; align-items:center;">${R.flame(15,"var(--primary)")}</span>
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
  `}async function xr(){var I;const i=document.getElementById("ck-buzz-carousel-container"),n=document.getElementById("ck-buzz-track"),o=document.getElementById("ck-buzz-dots"),s=document.getElementById("ck-buzz-pause-btn"),l=document.getElementById("ck-buzz-header-click");if(!i||!n)return;l==null||l.addEventListener("click",()=>{X("/buzz")});let c=[],u=0,p=null,h=!1;const f=new Set;try{c=(await ge.list({limit:8,sort:"trending"})).data||[]}catch{n.innerHTML=`
      <div style="padding: 16px; text-align: center; color: #ef4444; font-size: 0.78rem;">
        Failed to load Civic Buzz
      </div>
    `;return}if(c.length===0){n.innerHTML=`
      <div class="ck-buzz-empty-card">
        <div style="display:flex; justify-content:center; color:#10b981; margin-bottom: 6px;">${R.initiative(28)}</div>
        <div style="font-weight: 700; font-size: 0.86rem; color: #0f172a;">No Civic Buzz yet</div>
        <p style="font-size: 0.75rem; color: #64748b; margin: 4px 0 10px;">
          Be the first to turn a real civic problem into a viral conversation!
        </p>
        <button type="button" id="ck-buzz-first-create-btn" class="btn btn-primary btn-sm" style="border-radius: 999px; font-weight: 700; font-size: 0.76rem;">
          + Create First Post
        </button>
      </div>
    `,(I=document.getElementById("ck-buzz-first-create-btn"))==null||I.addEventListener("click",()=>{qi(null,()=>xr())});return}n.innerHTML=c.map((C,_)=>{const B=C.image_url||Ts,O=C.linked_title||C.caption,G=C.linked_area||"",ae=C.views_count||0,U=C.vote_count||0,M=C.shares_count||0,H=C.joins_count||0,Y=C.template==="initiative"||C.linked_type==="initiative",V=[];G&&V.push(It(G)),ae>0&&V.push(`${ae} views`),Y&&H>0?V.push(`${H} joined`):U>0&&V.push(`${U} upvote${U>1?"s":""}`),M>0&&V.push(`${M} share${M>1?"s":""}`);const le=V.join(" · ");return`
      <div class="ck-buzz-slide" data-index="${_}" data-post-id="${C.id}" data-linked-id="${C.linked_id||""}" style="cursor: pointer;" title="View ${It(O)}">
        <!-- Image Card with Bold Meme-style Clamped Caption Overlay & Floating Small Share Button -->
        <div class="ck-buzz-img-box" style="position: relative;">
          <img src="${It(B)}" alt="${It(C.caption)}" class="ck-buzz-img" onerror="this.src='${Ts}'" />
          <div class="ck-buzz-scrim"></div>
          
          <!-- Small Floating Share Button in top-right -->
          <button type="button" class="ck-buzz-share-floating" data-action="share-post" data-post-id="${C.id}" data-caption="${It(C.caption)}" title="Share" aria-label="Share">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>

          <!-- Clamped Caption inside Card -->
          <div class="ck-buzz-meme-caption" style="display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; text-overflow:ellipsis;">
            ${It(C.caption)}
          </div>

          <div class="ck-buzz-badge-row">
            <span class="ck-buzz-pill-tag">
              ${Y?`<span style="display:inline-flex; align-items:center; gap:4px;">${R.initiative(11)} INITIATIVE</span>`:C.template==="awareness"?`<span style="display:inline-flex; align-items:center; gap:4px;">${R.awareness(11)} AWARENESS</span>`:`<span style="display:inline-flex; align-items:center; gap:4px;">${R.flame(11)} MEME</span>`}
            </span>
          </div>
        </div>

        <!-- Issue Title & Stats & Action Buttons -->
        <div class="ck-buzz-meta-box">
          <div class="ck-buzz-issue-title" title="${It(O)}">
            ${It(O)}
          </div>
          <div style="font-size:0.84rem; color:#64748b; margin-top:3px; font-weight:500;" class="ck-truncate">
            ${le||"Civic Buzz"}
          </div>
          <div class="ck-buzz-actions-row" style="display:flex; align-items:center; justify-content:space-between; margin-top:12px; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
              <button type="button" class="btn btn-secondary btn-sm ck-buzz-action-btn" data-action="upvote-post" data-post-id="${C.id}" style="font-size:0.82rem; font-weight:600; padding:5px 12px; border-radius:6px; display:inline-flex; align-items:center; gap:4px; height:30px; background:#f8fafc; border:1px solid #e2e8f0; color:#334155; cursor:pointer; white-space:nowrap;">
                <span>↑</span> Upvote
              </button>
              <button type="button" class="btn btn-secondary btn-sm ck-buzz-action-btn" data-action="follow-post" data-post-id="${C.id}" style="font-size:0.82rem; font-weight:600; padding:5px 12px; border-radius:6px; display:inline-flex; align-items:center; gap:4px; height:30px; background:#f8fafc; border:1px solid #e2e8f0; color:#334155; cursor:pointer; white-space:nowrap;">
                <span>+</span> Follow
              </button>
            </div>
            <a href="${C.linked_id?`/entities/${C.linked_id}`:`/buzz/${C.id}`}" class="ck-buzz-view-issue-link" data-action="view-issue" style="font-size:0.85rem; color:var(--primary); font-weight:700; text-decoration:none; white-space:nowrap; flex-shrink:0;">
              View issue →
            </a>
          </div>
        </div>
      </div>
    `}).join(""),o.innerHTML=c.map((C,_)=>`
    <span class="ck-buzz-dot ${_===0?"active":""}" data-dot-index="${_}"></span>
  `).join("");function g(C){if(c.length===0)return;u=(C+c.length)%c.length,n.style.transform=`translateX(-${u*100}%)`,i.querySelectorAll(".ck-buzz-dot").forEach((B,O)=>{B.classList.toggle("active",O===u)});const _=c[u];_&&!f.has(_.id)&&(f.add(_.id),ge.logEvent(_.id,"view").catch(()=>{}))}g(0),o.addEventListener("click",C=>{const _=C.target.closest(".ck-buzz-dot");if(!_)return;const B=parseInt(_.getAttribute("data-dot-index"),10);isNaN(B)||g(B)}),s==null||s.addEventListener("click",C=>{C.stopPropagation(),h=!h;const _=s.querySelector(".ck-buzz-pause-icon"),B=s.querySelector(".ck-buzz-play-icon");h?(b(),s.classList.add("paused"),s.title="Play auto-rotate",_&&(_.style.display="none"),B&&(B.style.display="inline-block")):(v(),s.classList.remove("paused"),s.title="Pause auto-rotate",_&&(_.style.display="inline-block"),B&&(B.style.display="none"))});function v(){b(),!h&&(p=setInterval(()=>{g(u+1)},1800))}function b(){p&&(clearInterval(p),p=null)}v(),i.addEventListener("mouseenter",()=>{h||b()}),i.addEventListener("mouseleave",()=>{h||v()});let w=0,z=!1;const x=document.getElementById("ck-buzz-viewport");x==null||x.addEventListener("touchstart",C=>{b(),w=C.touches[0].clientX},{passive:!0}),x==null||x.addEventListener("touchend",C=>{const _=C.changedTouches[0].clientX-w;Math.abs(_)>35&&(_>0?g(u-1):g(u+1)),h||v()},{passive:!0}),x==null||x.addEventListener("mousedown",C=>{z=!0,w=C.clientX,b()}),window.addEventListener("mouseup",C=>{if(!z)return;z=!1;const _=C.clientX-w;Math.abs(_)>40&&(_>0?g(u-1):g(u+1)),h||v()}),n.addEventListener("click",C=>{var U,M;const _=C.target.closest('[data-action="share-post"]');if(_){C.stopPropagation();const H=Number(_.getAttribute("data-post-id")),Y=c.find(V=>V.id===H)||{id:H,caption:_.getAttribute("data-caption")||"Civic Buzz",image_url:(M=(U=_.closest(".ck-buzz-slide"))==null?void 0:U.querySelector("img"))==null?void 0:M.src};Hn(Y);return}const B=C.target.closest('[data-action="upvote-post"]');if(B){C.stopPropagation();const H=Number(B.getAttribute("data-post-id"));ge.vote(H).then(()=>{we("Upvoted civic buzz!"),B.innerHTML="<span>✓</span> Upvoted",B.style.color="var(--primary)"}).catch(()=>ir("You already supported this post."));return}const O=C.target.closest('[data-action="follow-post"]');if(O){C.stopPropagation(),we("Following updates on this issue!"),O.innerHTML="<span>✓</span> Following",O.style.color="#10b981";return}const G=C.target.closest('[data-action="view-issue"]');if(G){C.stopPropagation(),C.preventDefault();const H=G.getAttribute("href");H&&X(H);return}const ae=C.target.closest(".ck-buzz-slide");if(ae){const H=ae.getAttribute("data-linked-id"),Y=ae.getAttribute("data-post-id");Y&&ge.logEvent(Number(Y),"click_issue").catch(()=>{}),X(H&&H!==""&&H!=="null"&&H!=="undefined"?`/entities/${H}`:Y?`/buzz/${Y}`:"/buzz")}})}function Ui(i){return String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const Ms=i=>Number(i.count??i.total_count??0)||0;async function Hc(i){var u;const n=Array.isArray((u=i.parsed_config)==null?void 0:u.awaiting_statuses)?i.parsed_config.awaiting_statuses:[],[o,...s]=await Promise.all([Kt.execute(i.report_id),...n.map(p=>Kt.execute(i.report_id,{status:p}))]),l=o.data.groupBy||"area",c=new Map;for(const p of o.data.rows||[])c.set(String(p[l]),{ward:String(p[l]),total:Ms(p),awaiting:0});for(const p of s)for(const h of p.data.rows||[]){const f=c.get(String(h[l]));f&&(f.awaiting+=Ms(h))}return[...c.values()]}function Dc(i,n){const o=Math.max(1,...i.map(s=>s.total));return i.map(s=>{const l=s.total/o*100,c=s.total?s.awaiting/s.total*100:0;return`
      <a class="ward-row" href="${`/entities?entity_type_id=${Number(n.entity_type_id)}&area=${encodeURIComponent(s.ward)}`}" title="${Ui(`${s.ward}: ${s.total} record(s), ${s.awaiting} waiting for approval. Open the list.`)}">
        <span class="ward-name">${Ui(s.ward)}</span>
        <span class="ward-track" aria-hidden="true">
          <span class="ward-bar" style="width:${l.toFixed(1)}%">
            <span class="ward-bar-awaiting" style="width:${c.toFixed(1)}%"></span>
          </span>
        </span>
        <span class="ward-numbers"><strong>${s.total}</strong> · ${s.awaiting} waiting</span>
      </a>`}).join("")}function Fc(i){return`
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
          <th scope="row">${Ui(n.ward)}</th>
          <td>${n.total}</td>
          <td>${n.awaiting}</td>
          <td>${n.total?Math.round(n.awaiting/n.total*100):0}%</td>
        </tr>`).join("")}
      </tbody>
    </table>`}async function qc(i){if(!i)return;let n=[];try{n=((await Kt.list()).data||[]).filter(g=>{var v,b,w;return((v=g.parsed_config)==null?void 0:v.widget)==="ward_activity"&&String(((b=g.parsed_config)==null?void 0:b.groupBy)||((w=g.parsed_config)==null?void 0:w.group_by)||"").toLowerCase()==="area"})}catch{return}if(!n.length)return;i.innerHTML=`
    <section class="card mb-6 ward-card" aria-labelledby="ward-title">
      <div class="card-header border-b ward-header">
        <div>
          <div class="card-title" id="ward-title">Civic activity across wards</div>
          <div class="card-subtitle">Records per ward, and how many are waiting for approval. Select a ward to open its list.</div>
        </div>
        <label class="ward-select-label">Report
          <select id="ward-report-select" class="form-control">
            ${n.map(f=>`<option value="${Number(f.report_id)}">${Ui(f.report_name)}</option>`).join("")}
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
    </section>`;const o=i.querySelector("#ward-report-select"),s=i.querySelector("#ward-bars"),l=i.querySelector("#ward-table-wrap");let c=[],u={key:"total",dir:-1};const p=()=>{const f=n.find(b=>String(b.report_id)===o.value),g=b=>u.key==="share"?b.total?b.awaiting/b.total:0:b[u.key],v=[...c].sort((b,w)=>{const[z,x]=[g(b),g(w)];return(typeof z=="string"?z.localeCompare(x):z-x)*u.dir});if(!v.length){s.innerHTML='<div class="text-muted">This report has no records yet.</div>',l.innerHTML="";return}s.innerHTML=Dc(v,f),l.innerHTML=Fc(v),l.querySelectorAll(".ward-sort").forEach(b=>{const w=b.getAttribute("data-sort")===u.key;b.closest("th").setAttribute("aria-sort",w?u.dir===1?"ascending":"descending":"none"),b.addEventListener("click",()=>{const z=b.getAttribute("data-sort");u={key:z,dir:u.key===z?-u.dir:z==="ward"?1:-1},p()})})},h=async()=>{s.innerHTML='<div class="text-muted">Loading…</div>',l.innerHTML="";try{c=await Hc(n.find(f=>String(f.report_id)===o.value)),p()}catch(f){s.innerHTML=`<div class="alert alert-error">Ward activity could not be loaded: ${Ui(f.message||f)}</div>`}};o.addEventListener("change",h),await h()}function ne(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const Uc={mic:'<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>'},Re={arrow:'<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>',list:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>',chart:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',shield:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',build:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>',users:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',graph:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',buzz:'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/></svg>'};function Gi(){const i=new Date().getHours();return i<12?"Good morning":i<17?"Good afternoon":"Good evening"}function Ki(i){return String((i==null?void 0:i.name)||"").trim().split(/\s+/)[0]||"there"}function _r(i){if(!i)return"";const n=Math.max(0,Math.round((Date.now()-new Date(i).getTime())/1e3));if(n<60)return"just now";if(n<3600)return`${Math.floor(n/60)} min ago`;if(n<86400)return`${Math.floor(n/3600)} h ago`;const o=Math.floor(n/86400);return o<14?`${o} day${o===1?"":"s"} ago`:new Date(i).toLocaleDateString()}function Cn(i){const n=String(i||"").toLowerCase();let o="is-waiting";return["approved","resolved","completed","closed","published","audited","reconciled"].includes(n)?o="is-done":["rejected","deleted","failed"].includes(n)?o="is-stopped":["draft",""].includes(n)&&(o="is-neutral"),`<span class="ws-pill ${o}">${ne(Ct(i)||"Draft")}</span>`}function Sn(i){const n=(i==null?void 0:i.entityType)||(i!=null&&i.entity_type?{name:i.entity_type}:null);return n&&(Xe(n).shortTitle||n.name)||""}function Zi({id:i,title:n,meta:o=[],side:s="",action:l="Open"}){return`
    <a class="ws-item" href="/entities/${Number(i)}">
      <span style="min-width:0;">
        <span class="ws-item-title" title="${ne(n)}">${ne(n)}</span>
        <span class="ws-item-meta">${o.filter(Boolean).map(c=>`<span>${ne(c)}</span>`).join("")}</span>
      </span>
      <span class="ws-item-side">${s}<span class="ws-item-go">${ne(l)} ${Re.arrow}</span></span>
    </a>`}function Ze(i,n,o,s){return`
    <a class="ws-action" href="${i}">
      <span class="ws-action-icon">${n}</span>
      <span><strong>${ne(o)}</strong><small>${ne(s)}</small></span>
    </a>`}function ot(i,n,o=null){const s=`<div class="ws-fact-num">${ne(String(i))}</div><div class="ws-fact-label">${ne(n)}</div>`;return o?`<a class="ws-fact" href="${o}">${s}</a>`:`<div class="ws-fact">${s}</div>`}async function Fn(){return((await be.notifications(100).catch(()=>({data:[]}))).data||[]).filter(n=>n.kind==="queue").reverse()}function qn(i){return Zi({id:i.entity_id,title:i.entity_name,meta:[kr(i.entity_type),i.area||"No ward",i.actor?`from ${i.actor}`:"",`waiting since ${_r(i.datetime)}`],action:"Review"})}function kr(i){return i?Xe({name:i}).shortTitle||i:""}function to({count:i,waitingTitle:n,waitingText:o,clearTitle:s,clearText:l,nextId:c,nextLabel:u="Review next"}){return i?`
    <section class="ws-focus" aria-live="polite">
      <div class="ws-focus-num">${i}</div>
      <div class="ws-focus-text"><strong>${ne(n)}</strong><span>${ne(o)}</span></div>
      ${c?`<a class="btn" href="/entities/${Number(c)}">${ne(u)} ${Re.arrow}</a>`:""}
    </section>`:`
      <section class="ws-focus is-clear" aria-live="polite">
        <div class="ws-focus-num" aria-hidden="true">✓</div>
        <div class="ws-focus-text"><strong>${ne(s)}</strong><span>${ne(l)}</span></div>
      </section>`}function Zc(){return`
    <div class="ws" aria-busy="true" aria-label="Loading your workspace">
      <div>
        <div class="ck-skeleton-shimmer" style="width:260px; height:30px; margin-bottom:8px; border-radius:8px;"></div>
        <div class="ck-skeleton-shimmer" style="width:340px; height:14px; border-radius:6px;"></div>
      </div>
      <div class="ck-skeleton-shimmer" style="width:100%; height:120px; border-radius:20px;"></div>
      <div class="ck-skeleton-shimmer" style="width:100%; height:240px; border-radius:20px;"></div>
    </div>`}async function Un(){if(!yt(X))return;const i=He(),n=i.role==="citizen",s={citizen:"Home",coordinator_area:"Ward desk",coordinator_general:"General desk",director:"Approvals",admin:"Platform"}[i.role]||"Home",l=document.getElementById("app"),c=u=>{l.innerHTML=$e(`<div id="dash-content">${Zc()}</div>`,s,u),Ee()};c([]);try{const p=(await jn.getMetadata().catch(()=>({data:{entityTypes:[],rules:[],domains:[]}}))).data||{entityTypes:[],rules:[],domains:[]};n||c(p.entityTypes);const h=document.getElementById("dash-content");i.role==="citizen"?await Vc(h,i,p):i.role==="coordinator_area"?await Gc(h,i,p):i.role==="coordinator_general"?await Kc(h,i,p):i.role==="director"?await Yc(h,i,p):i.role==="admin"&&await Jc(h,i,p)}catch{ee("Failed to load workspace data");const p=document.getElementById("dash-content");p&&(p.innerHTML='<div class="alert alert-error">Your workspace could not be loaded. Please try again.</div>')}typeof window.civicTranslatePage=="function"&&window.civicTranslatePage()}let vn=null;async function Vc(i,n,o){const[s,l]=await Promise.all([be.list({owner_user_id:n.user_id,limit:50}).catch(()=>({data:[]})),be.notifications(6).catch(()=>({data:[]}))]),c=s.data||[],u=(l.data||[]).slice(0,4),p=_=>String(_.status||"").toLowerCase(),h=c.filter(_=>p(_)==="draft"),f=c.filter(_=>["approved","resolved","completed","closed"].includes(p(_))),g=c.filter(_=>["rejected","deleted"].includes(p(_))),v=c.filter(_=>!h.includes(_)&&!f.includes(_)&&!g.includes(_)),b=[...v,...f,...g,...h].slice(0,5),w=b.length?b.map(_=>Zi({id:_.entity_id,title:_.name,meta:[Sn(_),_.area],side:Cn(_.status),action:"Open"})).join(""):`<div class="ws-empty"><strong>You have not asked for anything yet.</strong>
         Tell the assistant above what is wrong, or <a href="/entities/new">fill in a form</a>. You will be able to follow it here.</div>`,z=_=>{if(_.kind==="linked")return"A linked record was created automatically";const B=Ct(_.to_status)||_.to_status;return _.from_status?`${Ct(_.from_status)||_.from_status} → ${B}`:`Now ${B}`},x=u.length?u.map(_=>`
        <a class="ws-item" href="/entities/${Number(_.entity_id)}" style="grid-template-columns:1fr;">
          <span style="min-width:0;">
            <span class="ws-item-title" style="font-size:0.92rem;">${ne(_.entity_name)}</span>
            <span class="ws-item-update">${ne(z(_))}</span>
            <span class="ws-item-meta">${_.actor?`<span>by ${ne(_.actor)}</span>`:""}<span>${ne(_r(_.datetime))}</span></span>
          </span>
        </a>`).join(""):'<div class="ws-empty">Nothing new. When a coordinator or the director acts on one of your requests, it shows here.</div>';i.innerHTML=`
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">Your civic home</div>
          <h1 id="ck-citizen-greeting-title">${Gi()}, ${ne(Ki(n))}</h1>
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
                  Report issues · Start initiatives · Check request status
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
                ${Uc.mic}
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
                <p>${c.length?`${v.length} in progress · ${f.length} approved${g.length?` · ${g.length} not accepted`:""}${h.length?` · ${h.length} draft${h.length===1?"":"s"}`:""}`:"Everything you file appears here."}</p>
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
            ${jc()}
          </section>
        </aside>
      </div>
    </div>`;const I=document.getElementById("ck-around-grid"),C=async _=>{var G;if(!I)return;if(!_){I.innerHTML=`
        <div class="ws-empty">
          <strong>Share your location to see approved work around you.</strong>
          Your location stays on this device and is only used to find nearby public records.
          <div style="margin-top:12px;"><button type="button" class="btn btn-secondary btn-sm" id="ck-nearby-share-btn">Use my location</button></div>
        </div>`,(G=document.getElementById("ck-nearby-share-btn"))==null||G.addEventListener("click",()=>{var ae;(ae=document.getElementById("ck-location-grant-btn"))==null||ae.click()});return}I.innerHTML='<div class="ws-empty">Looking around you…</div>';const O=((await be.nearby(_.lat,_.lng,10).catch(()=>({data:[]}))).data||[]).slice(0,5);I.innerHTML=O.length?O.map(ae=>Zi({id:ae.entity_id,title:ae.name,meta:[Sn(ae),ae.area],side:Cn(ae.status),action:"View"})).join(""):'<div class="ws-empty">No approved public records within 10 km yet.</div>'};vn&&document.removeEventListener("ck:location",vn),vn=_=>C(_.detail),document.addEventListener("ck:location",vn),Fi()||C(null),Wc(),xr()}function Wc(i,n){let o="ck-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,9),s=!1,l=null;const c=document.getElementById("ck-location-bar"),u=document.getElementById("ck-location-bar-text"),p=document.getElementById("ck-location-grant-btn"),h=document.getElementById("ck-location-dismiss-btn"),f=document.getElementById("ck-around-subtitle");function g(N){if(!N)return;const F=N.area?N.area.split(",")[0].trim():"your area";document.getElementById("ck-citizen-greeting-sub"),f&&(f.textContent=`Public civic work within 10 km of ${F}.`),c&&(c.classList.add("ck-location-active"),u&&(u.textContent=`📍 Location: ${N.area}`),p&&(p.style.display="none"),h&&(h.style.display="none"),setTimeout(()=>{c.style.display="none"},3e3)),document.dispatchEvent(new CustomEvent("ck:location",{detail:N}))}const v=Fi();v?g(v):rr()||c&&(c.style.display="flex"),p==null||p.addEventListener("click",async()=>{p&&(p.textContent="⏳ Detecting…"),p&&(p.disabled=!0);try{const N=await lr();g(N)}catch{u&&(u.textContent="Location access was not granted."),p&&(p.style.display="none"),setTimeout(()=>{c&&(c.style.display="none")},2500)}}),h==null||h.addEventListener("click",()=>{Dd(),c&&(c.style.display="none")});const b=document.getElementById("ck-dark-input"),w=document.getElementById("ck-dark-send-btn"),z=document.getElementById("ck-dark-attach-btn"),x=document.getElementById("ck-dark-file-input"),I=document.getElementById("ck-dark-mic-btn"),C=document.getElementById("ck-dark-file-preview"),_=document.getElementById("ck-dark-thread"),B=document.getElementById("ck-dark-reset-btn");function O(){var W;if(!C)return;if(!l){C.innerHTML="",C.style.display="none";return}const N=l.type.startsWith("image/"),F=N?URL.createObjectURL(l):null,P=l.size<1024*1024?(l.size/1024).toFixed(1)+" KB":(l.size/(1024*1024)).toFixed(1)+" MB";C.style.display="flex",C.innerHTML=`
      <div class="ck-dark-file-chip">
        ${N?`<img src="${F}" class="ck-dark-file-thumb" alt="Preview"/>`:"<span>📄</span>"}
        <span><strong>${ne(l.name)}</strong> (${P})</span>
        <button type="button" id="ck-dark-remove-file" class="ck-dark-file-remove" title="Remove attachment">&times;</button>
      </div>
    `,(W=document.getElementById("ck-dark-remove-file"))==null||W.addEventListener("click",()=>{l=null,x&&(x.value=""),O()})}z==null||z.addEventListener("click",()=>x==null?void 0:x.click()),x==null||x.addEventListener("change",N=>{var P;const F=(P=N.target.files)==null?void 0:P[0];F&&(l=F,O(),b==null||b.focus())}),I==null||I.addEventListener("click",()=>{I.classList.toggle("active"),I.classList.contains("active")?(b.placeholder="Listening live... say your complaint...",setTimeout(()=>{I.classList.contains("active")&&(b.value="Massive open pothole right outside Ferguson College gate causing traffic jam",I.classList.remove("active"),b.placeholder="Type your request here — e.g. 'garbage not collected near FC road'...",b.focus())},1800)):b.placeholder="Type your request here — e.g. 'garbage not collected near FC road'..."});function G(N){if(!_)return;_.style.display="flex";const F=document.createElement("div");for(F.innerHTML=N;F.firstChild;)_.appendChild(F.firstChild);_.scrollTop=_.scrollHeight}function ae(N,F=null){let P="";return F&&(F.isImage&&F.previewUrl?P=`
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
            <img src="${ne(F.previewUrl)}" class="ck-dark-user-img" alt="Proof" />
            <div style="font-size:0.75rem;">
              <div>📷 <strong>${ne(F.name)}</strong></div>
              <div style="opacity:0.8;">${ne(F.sizeStr)}</div>
            </div>
          </div>
        `:P=`
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px; font-size:0.75rem;">
            <span>📄</span>
            <div><strong>${ne(F.name)}</strong> (${ne(F.sizeStr)})</div>
          </div>
        `),`
      <div class="ck-dark-msg-row ck-dark-msg-user">
        <div class="ck-dark-bubble-user">
          ${P}
          <div>${ne(N)}</div>
        </div>
      </div>
    `}function U(N){return`
      <div class="ck-dark-msg-row ck-dark-msg-agent">
        <div class="ck-dark-avatar" style="width:28px; height:28px; box-shadow:none;">
          <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <div class="ck-dark-bubble-agent">
          ${ne(N||"").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br>")}
        </div>
      </div>
    `}function M(){return`
      <div class="ck-dark-msg-row ck-dark-msg-agent" id="ck-dark-thinking">
        <div class="ck-dark-avatar" style="width:28px; height:28px; box-shadow:none;">
          <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <div class="ck-dark-bubble-agent" style="display:flex; align-items:center; gap:8px; padding:10px 16px;">
          <span style="font-size:0.8rem; font-weight:600; color:var(--primary-500);">Civic Assistant analyzing</span>
          <div class="agent-thinking-dots" style="padding:0;"><span></span><span></span><span></span></div>
        </div>
      </div>
    `}function H(N,F){const P=Array.isArray(N)?N.map(W=>`
      <div class="ck-dark-confirm-row">
        <span class="ck-dark-confirm-label">${ne(W.label)}</span>
        <span class="ck-dark-confirm-val">${ne(W.value)}</span>
      </div>
    `).join(""):"";return`
      <div class="ck-dark-msg-row ck-dark-msg-agent">
        <div class="ck-dark-avatar" style="width:28px; height:28px; background:#10b981; box-shadow:none;">
          <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div class="ck-dark-confirm-card">
          <div class="ck-dark-confirm-title">
            <span>📝</span> Review your request — Ready to submit
          </div>
          <p style="font-size:0.82rem; color:rgba(255,255,255,0.85); margin-bottom:12px;">
            ${ne((F||"").split(`

`)[0]||"Please review your request summary before submitting.")}
          </p>
          <div class="ck-dark-confirm-table">${P}</div>
          <div class="ck-dark-confirm-actions" id="ck-dark-confirm-actions">
            <button type="button" id="ck-dark-confirm-submit-btn" class="ck-dark-btn-primary">
              ✓ Submit Request
            </button>
            <button type="button" id="ck-dark-confirm-cancel-btn" class="ck-dark-btn-secondary">
              ✗ Modify / Cancel
            </button>
          </div>
        </div>
      </div>
    `}function Y(N,F,P){return`
      <div class="ck-dark-msg-row ck-dark-msg-agent">
        <div class="ck-dark-avatar" style="width:28px; height:28px; background:#16a34a; box-shadow:none;">
          <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
        </div>
        <div class="ck-dark-success-card">
          <div class="ck-dark-success-badge">
            <span>🎉</span> Request #${N} Submitted!
          </div>
          <p style="font-size:0.85rem; color:#f1f5f9; margin-bottom:12px;">
            <strong>${ne(F||P)}</strong> has been submitted and shared with your local team in Shivajinagar.
          </p>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="/entities/${N}" class="ck-dark-btn-primary">
              View My Request →
            </a>
            <button type="button" id="ck-dark-new-case-btn" class="ck-dark-btn-secondary">
              + File Another Issue
            </button>
          </div>
        </div>
      </div>
    `}async function V(N,F=null){var q,Se;const P=F||l,W=(N||"").trim();if(s||!W&&!P)return;s=!0;let ue=null;if(P){const A=P.type.startsWith("image/");ue={name:P.name,sizeStr:P.size<1024*1024?(P.size/1024).toFixed(1)+" KB":(P.size/(1024*1024)).toFixed(1)+" MB",isImage:A,previewUrl:A?URL.createObjectURL(P):null}}b&&(b.value=""),l=null,x&&(x.value=""),O(),G(ae(W||(P?`Attached file: ${P.name}`:""),ue)),G(M()),w&&(w.disabled=!0);try{const A=Fi(),Q=dr(A),ve=await zn.chat(o,Q+W,P);(q=document.getElementById("ck-dark-thinking"))==null||q.remove();const pe=ve.data;pe.type==="confirm"?(G(H(pe.summary||[],pe.text)),setTimeout(()=>{var ye,de;(ye=document.getElementById("ck-dark-confirm-submit-btn"))==null||ye.addEventListener("click",()=>{var oe;(oe=document.getElementById("ck-dark-confirm-actions"))==null||oe.remove(),V("yes")}),(de=document.getElementById("ck-dark-confirm-cancel-btn"))==null||de.addEventListener("click",()=>{var oe;(oe=document.getElementById("ck-dark-confirm-actions"))==null||oe.remove(),V("cancel")})},50)):pe.type==="submitted"?(G(Y(pe.entity_id,pe.entity_name,pe.capability)),setTimeout(()=>{var ye;(ye=document.getElementById("ck-dark-new-case-btn"))==null||ye.addEventListener("click",()=>{le()})},50)):G(U(pe.text||"Understood. Please provide additional details or landmarks."))}catch(A){(Se=document.getElementById("ck-dark-thinking"))==null||Se.remove(),G(U("I encountered a connection hiccup with the AI dispatcher. Please try describing your issue again.")),console.error("[Cockpit Agent Error]:",A)}finally{s=!1,w&&(w.disabled=!1),b==null||b.focus()}}w==null||w.addEventListener("click",()=>{V(b==null?void 0:b.value)}),b==null||b.addEventListener("keydown",N=>{N.key==="Enter"&&!N.shiftKey&&(N.preventDefault(),V(b.value))}),document.querySelectorAll(".ck-dark-chip").forEach(N=>{N.addEventListener("click",()=>{const F=N.getAttribute("data-text");F&&V(F)})}),document.querySelectorAll(".ck-gateway-trigger").forEach(N=>{N.addEventListener("click",()=>{const F=N.getAttribute("data-gateway-prompt"),P=document.getElementById("ck-dark-cockpit");P&&P.scrollIntoView({behavior:"smooth",block:"center"}),b&&(b.value=F||"",b.focus())})});function le(){o&&zn.clearSession(o),o="ck-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,9),s=!1,l=null,x&&(x.value=""),O(),_&&(_.innerHTML="",_.style.display="none"),b==null||b.focus()}B==null||B.addEventListener("click",le)}async function Gc(i,n){var f;const o=n.assignedArea||"",[s,l]=await Promise.all([Fn(),o?be.list({area:o,limit:100}).catch(()=>({data:[]})):Promise.resolve({data:[]})]),c=l.data||[],u=new Set(s.map(g=>g.entity_id)),p=c.filter(g=>!u.has(g.entity_id)&&String(g.status||"").toLowerCase()!=="draft"),h=g=>c.filter(v=>g.includes(String(v.status||"").toLowerCase())).length;i.innerHTML=`
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">Area coordinator${o?` · ${ne(o)}`:""}</div>
          <h1>${Gi()}, ${ne(Ki(n))}</h1>
          <p>${o?`You verify what citizens in ${ne(o)} file, and pass it to the director or send it back with a reason.`:"No ward is assigned to your account yet, so nothing can be routed to you. Ask an administrator to assign one."}</p>
        </div>
      </header>

      ${to({count:s.length,waitingTitle:`${s.length===1?"record is":"records are"} waiting for your review`,waitingText:"Start with the one that has waited longest.",clearTitle:"Nothing is waiting for you",clearText:o?`Every record filed in ${o} has been reviewed.`:"No ward assigned.",nextId:(f=s[0])==null?void 0:f.entity_id})}

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ws-panel" aria-labelledby="queue-title">
            <div class="ws-panel-head">
              <div><h2 id="queue-title">Waiting for you</h2><p>Oldest first. Open a record to verify or reject it.</p></div>
            </div>
            <div class="ws-list">
              ${s.length?s.map(qn).join(""):'<div class="ws-empty"><strong>All caught up.</strong>New submissions from your ward appear here and in the bell.</div>'}
            </div>
          </section>

          <section class="ws-panel" aria-labelledby="ward-title-h">
            <div class="ws-panel-head">
              <div><h2 id="ward-title-h">Your ward at a glance</h2><p>${o?`Every record in ${ne(o)}.`:""}</p></div>
              ${o?`<a class="ws-panel-link" href="/entities?area=${encodeURIComponent(o)}">All ward records</a>`:""}
            </div>
            <div class="ws-facts">
              ${ot(s.length,"Waiting for you")}
              ${ot(h(["coordinator_approved"]),"With the director")}
              ${ot(h(["approved"]),"Approved")}
              ${ot(h(["rejected"]),"Sent back")}
            </div>
            <div class="ws-list">
              ${p.slice(0,5).map(g=>{var v;return Zi({id:g.entity_id,title:g.name,meta:[Sn(g),(v=g.owner)!=null&&v.name?`from ${g.owner.name}`:""],side:Cn(g.status)})}).join("")}
            </div>
          </section>
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-label="Shortcuts">
            <div class="ws-panel-head"><div><h2>Shortcuts</h2></div></div>
            <div class="ws-actions">
              ${o?Ze(`/entities?area=${encodeURIComponent(o)}`,Re.list,"Ward records",`Everything filed in ${o}`):""}
              ${Ze("/buzz?tab=review",Re.buzz,"Civic Buzz review","Posts waiting for moderation")}
              ${Ze("/reports",Re.chart,"Reports","Counts by status and area, with export")}
            </div>
          </section>
        </aside>
      </div>
    </div>`}async function Kc(i,n){var f;const[o,s]=await Promise.all([Fn(),be.list({limit:100}).catch(()=>({data:[]}))]),l=g=>{const v=String(g.area||"").trim().toLowerCase();return v===""||v==="unassigned"},c=(s.data||[]).filter(l).filter(g=>g.owner_user_id),u=new Set(o.map(g=>g.entity_id)),p=c.filter(g=>!u.has(g.entity_id)&&String(g.status||"").toLowerCase()!=="draft"),h=g=>c.filter(v=>g.includes(String(v.status||"").toLowerCase())).length;i.innerHTML=`
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">General coordinator · records with no ward</div>
          <h1>${Gi()}, ${ne(Ki(n))}</h1>
          <p>Records filed without a ward have no area coordinator. They come to you, so that nothing a citizen files is left unanswered.</p>
        </div>
      </header>

      ${to({count:o.length,waitingTitle:`${o.length===1?"record with no ward is":"records with no ward are"} waiting for your review`,waitingText:"Start with the one that has waited longest.",clearTitle:"Nothing is waiting for you",clearText:"Every record without a ward has been reviewed.",nextId:(f=o[0])==null?void 0:f.entity_id})}

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ws-panel" aria-labelledby="gq-title">
            <div class="ws-panel-head"><div><h2 id="gq-title">Waiting for you</h2><p>Oldest first. Open a record to verify or reject it.</p></div></div>
            <div class="ws-list">
              ${o.length?o.map(qn).join(""):`<div class="ws-empty"><strong>All caught up.</strong>A record reaches you only when it has no ward. Records with a ward go to that ward's coordinator.</div>`}
            </div>
          </section>

          <section class="ws-panel" aria-labelledby="gu-title">
            <div class="ws-panel-head"><div><h2 id="gu-title">Records with no ward</h2><p>What has happened to the ones already reviewed.</p></div></div>
            <div class="ws-facts">
              ${ot(o.length,"Waiting for you")}
              ${ot(h(["coordinator_approved"]),"With the director")}
              ${ot(h(["approved"]),"Approved")}
              ${ot(h(["rejected"]),"Sent back")}
            </div>
            <div class="ws-list">
              ${p.slice(0,5).map(g=>{var v;return Zi({id:g.entity_id,title:g.name,meta:[Sn(g),(v=g.owner)!=null&&v.name?`from ${g.owner.name}`:""],side:Cn(g.status)})}).join("")}
            </div>
          </section>
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-label="Shortcuts">
            <div class="ws-panel-head"><div><h2>Shortcuts</h2></div></div>
            <div class="ws-actions">
              ${Ze("/entities",Re.list,"All records","Browse every module and ward")}
              ${Ze("/buzz?tab=review",Re.buzz,"Civic Buzz review","Posts waiting for moderation")}
              ${Ze("/reports",Re.chart,"Reports","Counts by status and area, with export")}
            </div>
          </section>
        </aside>
      </div>
    </div>`}async function Yc(i,n,o){var g,v,b,w,z,x,I,C;const[s,l]=await Promise.all([Fn(),be.list({status:"submitted",limit:1}).catch(()=>({pagination:{total:0}}))]),c=[...new Set(s.map(_=>_.entity_type))];let u=null;const p=_=>s.filter(B=>!_||B.entity_type===_);i.innerHTML=`
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">Director · final approval</div>
          <h1>${Gi()}, ${ne(Ki(n))}</h1>
          <p>Coordinators have verified these. Your decision is the last step, and it can start follow-up records automatically.</p>
        </div>
      </header>

      ${to({count:s.length,waitingTitle:`${s.length===1?"decision is":"decisions are"} waiting for you`,waitingText:`${((g=l.pagination)==null?void 0:g.total)||0} more ${(((v=l.pagination)==null?void 0:v.total)||0)===1?"record is":"records are"} still with coordinators.`,clearTitle:"No decisions are waiting",clearText:`${((b=l.pagination)==null?void 0:b.total)||0} ${(((w=l.pagination)==null?void 0:w.total)||0)===1?"record is":"records are"} still with coordinators.`,nextId:(z=s[0])==null?void 0:z.entity_id,nextLabel:"Decide next"})}

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ws-panel" aria-labelledby="dq-title">
            <div class="ws-panel-head">
              <div><h2 id="dq-title">Waiting for your decision</h2><p>Oldest first.</p></div>
            </div>
            ${c.length>1?`
              <div class="ws-chips" role="tablist" aria-label="Filter by module" id="dq-chips">
                <button type="button" class="ws-chip is-on" role="tab" aria-selected="true" data-module="">All <span>${s.length}</span></button>
                ${c.map(_=>`<button type="button" class="ws-chip" role="tab" aria-selected="false" data-module="${ne(_)}">${ne(kr(_))} <span>${p(_).length}</span></button>`).join("")}
              </div>`:""}
            <div class="ws-list" id="dq-list"></div>
          </section>

          <div id="ward-activity-widget"></div>
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-label="Oversight">
            <div class="ws-panel-head"><div><h2>Oversight</h2></div></div>
            <div class="ws-actions">
              ${Ze("/governance",Re.shield,"Governance Intelligence","Control gaps and process health")}
              ${Ze("/reports",Re.chart,"Reports","Run and export to PDF or Excel")}
              ${Ze("/entities",Re.list,"All records","Every module and ward")}
              ${Ze("/modules",Re.graph,"Modules and rules",`${((x=o.entityTypes)==null?void 0:x.length)||0} modules, ${((I=o.rules)==null?void 0:I.length)||0} rules`)}
            </div>
          </section>
        </aside>
      </div>
    </div>`;const h=document.getElementById("dq-list"),f=()=>{const _=p(u),B=_.slice(0,8);h.innerHTML=_.length?B.map(qn).join("")+(_.length>B.length?`<div class="ws-empty">${_.length-B.length} more. They move up as you decide these.</div>`:""):'<div class="ws-empty"><strong>All caught up.</strong>Records appear here once a coordinator has verified them.</div>'};(C=document.getElementById("dq-chips"))==null||C.addEventListener("click",_=>{const B=_.target.closest(".ws-chip");B&&(u=B.getAttribute("data-module")||null,document.querySelectorAll("#dq-chips .ws-chip").forEach(O=>{const G=O===B;O.classList.toggle("is-on",G),O.setAttribute("aria-selected",String(G))}),f())}),f(),qc(document.getElementById("ward-activity-widget"))}async function Jc(i,n,o){var b;const[s,l,c]=await Promise.all([Fn(),be.list({limit:1}).catch(()=>({pagination:{total:0}})),Xa.listUsers({limit:500}).catch(()=>({data:[]}))]),u=o.entityTypes||[],p=o.rules||[],h=c.data||[],f=w=>h.filter(z=>z.role===w).length,g=h.filter(w=>w.role==="coordinator_area"&&!String(w.assignedArea||w.assigned_area||"").trim()),v=[...u].sort((w,z)=>{var x,I;return(((x=z._count)==null?void 0:x.entities)||0)-(((I=w._count)==null?void 0:I.entities)||0)}).map(w=>{var C,_;const z=Xe(w),x=p.filter(B=>B.source_entity_type_id===w.entity_type_id).length,I=((C=w._count)==null?void 0:C.entities)||0;return`
        <a class="ws-item" href="/entities?entity_type_id=${Number(w.entity_type_id)}">
          <span style="min-width:0;">
            <span class="ws-item-title">${ne(z.shortTitle||w.name)}</span>
            <span class="ws-item-meta"><span>${I} record${I===1?"":"s"}</span>${x?`<span>${x} rule${x===1?"":"s"}</span>`:""}${(_=w.domain)!=null&&_.domain_name?`<span>${ne(w.domain.domain_name)}</span>`:""}</span>
          </span>
          <span class="ws-item-side"><span class="ws-item-go">Records ${Re.arrow}</span></span>
        </a>`}).join("");i.innerHTML=`
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">Administrator · platform</div>
          <h1>${Gi()}, ${ne(Ki(n))}</h1>
          <p>You look after the platform itself: the modules citizens can use, the rules that link them, and who holds which role.</p>
        </div>
        <div class="ws-head-actions">
          <a class="btn btn-primary" href="/module-builder">Build a module</a>
        </div>
      </header>

      <section class="ws-panel" aria-label="Platform at a glance">
        <div class="ws-facts" style="border-top:0;">
          ${ot(u.length,"Modules","/modules")}
          ${ot(p.length,"Rules linking them","/modules")}
          ${ot(h.length,"People","/admin")}
          ${ot(((b=l.pagination)==null?void 0:b.total)||0,"Records","/entities")}
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

          ${s.length?`
          <section class="ws-panel" aria-labelledby="aq-title">
            <div class="ws-panel-head"><div><h2 id="aq-title">Waiting for a final decision</h2><p>As an administrator you can also give final approval.</p></div></div>
            <div class="ws-list">${s.slice(0,5).map(qn).join("")}${s.length>5?`<div class="ws-empty">${s.length-5} more.</div>`:""}</div>
          </section>`:""}
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-labelledby="ap-title">
            <div class="ws-panel-head">
              <div><h2 id="ap-title">People</h2></div>
              <a class="ws-panel-link" href="/admin">Manage</a>
            </div>
            <div class="ws-list">
              ${[["citizen","Citizens"],["coordinator_area","Area coordinators"],["coordinator_general","General coordinators"],["director","Directors"],["admin","Administrators"]].map(([w,z])=>`<div class="ws-item" style="padding-top:11px; padding-bottom:11px;"><span class="ws-item-title" style="font-weight:500;">${z}</span><span class="ws-item-side"><strong>${f(w)}</strong></span></div>`).join("")}
            </div>
          </section>

          <section class="ws-panel" aria-label="Tools">
            <div class="ws-panel-head"><div><h2>Tools</h2></div></div>
            <div class="ws-actions">
              ${Ze("/module-builder",Re.build,"Module builder","Form, workflow, rule and report, no code")}
              ${Ze("/admin",Re.users,"Users and roles","Change a role or assign a ward")}
              ${Ze("/governance",Re.shield,"Governance Intelligence","Control gaps and process health")}
              ${Ze("/reports",Re.chart,"Reports","Run and export")}
            </div>
          </section>
        </aside>
      </div>
    </div>`}function gt(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}let J={page:1,limit:20},qt=[];async function Xc(i={},n=null){if(!yt(X))return;const o=n||new URLSearchParams(window.location.search);o.has("status")?J.status=o.get("status"):delete J.status,o.has("entity_type_id")?J.entity_type_id=o.get("entity_type_id"):delete J.entity_type_id,o.has("name")?J.name=o.get("name"):delete J.name,o.has("area")?J.area=o.get("area"):delete J.area,o.has("page")?J.page=Number(o.get("page")):J.page=1;const s=He(),c=Pn()==="citizen",u=o.get("type")==="initiative",p=o.get("tab")||(o.get("following")?"following":o.get("status")==="draft"?"drafts":o.get("status")==="approved"?"contributions":"requests");c?u?delete J.owner_user_id:p==="following"?(J.following=1,delete J.owner_user_id):p==="contributions"?(J.owner_user_id=s.user_id,J.status="approved",delete J.following):p==="drafts"?(J.owner_user_id=s.user_id,J.status="draft",delete J.following):(J.owner_user_id=s.user_id,delete J.following,o.has("status")||delete J.status):(delete J.owner_user_id,delete J.following);try{qt=(await be.listTypes().catch(()=>({data:[]}))).data||[]}catch{qt=[]}const h=qt.find(x=>String(x.entity_type_id)===String(J.entity_type_id)),f=Xe(h);let g="All records",v="Browse, search, and track all civic cases and requests across your workspace.";if(u){if(g="Civic Initiatives",v="Browse, join, or start community civic initiatives and neighborhood drives.",!J.entity_type_id&&qt.length>0){const x=qt.find(I=>(I.name||"").toLowerCase().includes("movement")||I.entity_type_id===1);x&&(J.entity_type_id=x.entity_type_id)}}else c?(g=h?`My ${f.title} Requests`:"My requests",v=h?`Tracking cases initiated by you for capability "${f.title}".`:"Track, review, and manage your civic requests, contributions, and community actions."):h&&(g=`${f.title} Cases`,v=`Browsing cases for capability "${f.title}".`);const b=document.getElementById("app");b.innerHTML=$e(`
    <div class="page-header mb-6">
      <div class="page-header-left">
        <h1 id="entities-header-title">${gt(g)}</h1>
        <p id="entities-header-subtitle">${gt(v)}</p>
      </div>
      <div class="page-header-actions">
        <a href="/entities/new${J.entity_type_id?`?entity_type_id=${J.entity_type_id}`:""}" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:6px; background:var(--primary); border-color:var(--primary);">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          ${u?"Start New Initiative":"Start Civic Action"}
        </a>
      </div>
    </div>

    ${c&&!u?`
      <!-- My Activity Tabs: Requests, Following, Contributions, Drafts -->
      <div class="ck-activity-tabs-wrap" style="display:flex; gap:8px; margin-bottom:18px; flex-wrap:wrap;">
        <a href="/entities?tab=requests" class="btn ${p==="requests"?"btn-primary":"btn-secondary"} btn-sm" style="border-radius:20px; font-weight:700; padding:6px 16px; ${p==="requests"?"background:var(--primary); border-color:var(--primary);":""}">Requests</a>
        <a href="/entities?tab=following" class="btn ${p==="following"?"btn-primary":"btn-secondary"} btn-sm" style="border-radius:20px; font-weight:700; padding:6px 16px; ${p==="following"?"background:var(--primary); border-color:var(--primary);":""}">Following</a>
        <a href="/entities?tab=contributions" class="btn ${p==="contributions"?"btn-primary":"btn-secondary"} btn-sm" style="border-radius:20px; font-weight:700; padding:6px 16px; ${p==="contributions"?"background:var(--primary); border-color:var(--primary);":""}">Contributions</a>
        <a href="/entities?tab=drafts" class="btn ${p==="drafts"?"btn-primary":"btn-secondary"} btn-sm" style="border-radius:20px; font-weight:700; padding:6px 16px; ${p==="drafts"?"background:var(--primary); border-color:var(--primary);":""}">Drafts</a>
      </div>
    `:""}
    
    <div class="card mb-6" style="padding: 16px 20px;">
      <div class="filters-bar" style="display:flex; gap:12px; align-items:center; flex-wrap:wrap; width:100%;">
        <!-- Search Box -->
        <div style="flex: 2; min-width: 240px; position: relative;">
          <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; color: var(--text-muted); pointer-events: none;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input type="text" id="filter-search" class="form-control" style="padding-left: 38px; height: 42px; width: 100%; border-radius: var(--radius-md);" placeholder="Search cases by title or location..." value="${gt(J.name||"")}">
        </div>

        <!-- Dynamic Module Filter -->
        <div style="flex: 1.3; min-width: 210px;">
          <select id="filter-type" class="form-control" style="height: 42px; width: 100%; max-width: none; border-radius: var(--radius-md);">
            <option value="">All Capabilities</option>
            ${qt.map(x=>{const I=Xe(x);return`<option value="${x.entity_type_id}" ${String(J.entity_type_id)===String(x.entity_type_id)?"selected":""}>${gt(I.title)}</option>`}).join("")}
          </select>
        </div>

        <!-- Status Filter -->
        <div style="flex: 1.2; min-width: 200px;">
          <select id="filter-status" class="form-control" style="height: 42px; width: 100%; max-width: none; border-radius: var(--radius-md);">
            <option value="">All Statuses</option>
            <option value="draft" ${J.status==="draft"?"selected":""}>Draft</option>
            <option value="submitted" ${J.status==="submitted"?"selected":""}>Submitted</option>
            <option value="coordinator_approved" ${J.status==="coordinator_approved"?"selected":""}>Verified (Pending Approval)</option>
            <option value="approved" ${J.status==="approved"?"selected":""}>Approved & Active</option>
            <option value="rejected" ${J.status==="rejected"?"selected":""}>Rejected</option>
            <option value="closed" ${J.status==="closed"?"selected":""}>Closed</option>
          </select>
        </div>

        <!-- Filter Action Buttons -->
        <div style="display: flex; gap: 8px; align-items: center; flex-shrink: 0;">
          <button id="btn-filter" class="btn btn-primary" style="height: 42px; padding: 0 18px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            Apply Filters
          </button>
          ${J.status||J.entity_type_id||J.name?`
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
  `,g,qt),Ee();const w=()=>{const x=document.getElementById("filter-status").value,I=document.getElementById("filter-type").value,C=document.getElementById("filter-search").value.trim(),_=new URLSearchParams;x&&_.set("status",x),I&&_.set("entity_type_id",I),C&&_.set("name",C),X(`/entities${_.toString()?"?"+_.toString():""}`)};document.getElementById("btn-filter").addEventListener("click",w),document.getElementById("filter-search").addEventListener("keypress",x=>{x.key==="Enter"&&w()});const z=document.getElementById("btn-clear-filter");z&&z.addEventListener("click",()=>{X("/entities")}),await zr()}async function zr(){const i=document.getElementById("entities-content");if(!i)return;Fa();const o=Pn()==="citizen";try{const s=await be.list(J),{data:l,pagination:c}=s;if(!l||l.length===0){i.innerHTML=`
        <div class="card p-8 text-center" style="padding:48px 24px; text-align:center;">
          <div style="display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:50%; background:var(--gray-100); color:var(--text-muted); margin:0 auto 12px;">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </div>
          <h3 style="font-size:1.15rem; font-weight:600; margin-bottom:6px; color:var(--text-primary);">
            ${o?"No civic activity yet":"No cases found"}
          </h3>
          <p style="font-size:0.875rem; color:var(--text-muted); max-width:420px; margin:0 auto 20px;">
            ${o?"You have not initiated any civic cases, reports, or applications yet. Start a new civic action to get started.":"No civic cases match your filter. Try adjusting your query or starting a new civic action."}
          </p>
          <div style="display:flex; gap:12px; justify-content:center;">
            ${J.status||J.entity_type_id||J.name?`
              <a href="/entities" class="btn btn-secondary">Clear Filters</a>
            `:""}
            <a href="/entities/new${J.entity_type_id?`?entity_type_id=${J.entity_type_id}`:""}" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:6px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Start Civic Action
            </a>
          </div>
        </div>
      `;return}const u=l.map(v=>{var w;const b=Xe(v.entityType);return`
        <tr>
          <td><a href="/entities/${v.entity_id}" class="text-link font-medium">#PR-${String(v.entity_id).padStart(5,"0")}</a></td>
          <td>
            <a href="/entities/${v.entity_id}" style="color:var(--text-primary); text-decoration:none; font-weight:600;">
              ${gt(v.name)}
            </a>
          </td>
          <td><span class="badge badge-secondary">${gt(b.shortTitle)}</span></td>
          ${o?"":`<td>${gt(((w=v.owner)==null?void 0:w.name)||"System")}</td>`}
          <td>${gt(v.area||"—")}</td>
          <td><span class="badge badge-${v.status}">${Ct(v.status)}</span></td>
          <td>
            <a href="/entities/${v.entity_id}" class="btn btn-secondary btn-sm">${o?"View Details →":"Review Case →"}</a>
          </td>
        </tr>
      `}).join(""),p=Math.ceil(c.total/c.limit);let h="";p>1&&(h=`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; padding:0 8px;">
          <div style="font-size:0.85rem; color:var(--text-muted);">
            Showing page ${c.page} of ${p} (${c.total} total cases)
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary btn-sm" id="btn-prev" ${c.page<=1?"disabled":""}>← Previous</button>
            <button class="btn btn-secondary btn-sm" id="btn-next" ${c.page>=p?"disabled":""}>Next →</button>
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
                ${o?"":"<th>Submitted By</th>"}
                <th>Area / Jurisdiction</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${u}
            </tbody>
          </table>
        </div>
      </div>
      ${h}
    `;const f=document.getElementById("btn-prev"),g=document.getElementById("btn-next");f&&f.addEventListener("click",()=>{const v=new URLSearchParams(window.location.search);v.set("page",String(J.page-1)),X(`/entities?${v.toString()}`)}),g&&g.addEventListener("click",()=>{const v=new URLSearchParams(window.location.search);v.set("page",String(J.page+1)),X(`/entities?${v.toString()}`)}),typeof window.civicTranslatePage=="function"&&window.civicTranslatePage()}catch{ee("Failed to load cases"),i.innerHTML='<div class="alert alert-error">Error loading cases. Please try again.</div>',typeof window.civicTranslatePage=="function"&&window.civicTranslatePage()}}async function Fa(){var o;const i=document.getElementById("ck-buzz-drafts-section");if(!i)return;if(!He()){i.innerHTML="";return}try{const l=(await ge.list({status:"draft",limit:10})).data||[];if(l.length===0){i.innerHTML="";return}i.innerHTML=`
      <div class="ck-buzz-drafts-card">
        <div class="ck-buzz-drafts-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="display:inline-flex; align-items:center; color:var(--primary);">${R.draft(22,"var(--primary)")}</span>
            <div>
              <h3 style="font-size:1.05rem; font-weight:800; color:#0f172a; margin:0;">
                My Civic Buzz Drafts (${l.length})
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
          ${l.map(c=>`
            <div class="ck-buzz-draft-item">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <span class="ck-buzz-badge-pill" style="font-size:0.65rem; display:inline-flex; align-items:center; gap:4px;">
                    ${c.template==="initiative"?`${R.initiative(12,"#16a34a")} INITIATIVE`:c.template==="awareness"?`${R.awareness(12,"#0284c7")} AWARENESS`:`${R.flame(12,"#ea580c")} MEME`}
                  </span>
                  <span style="font-size:0.7rem; color:#94a3b8;">${new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <div style="font-weight:700; font-size:0.9rem; color:#0f172a; line-height:1.3; margin-bottom:4px;">
                  "${gt(c.caption)}"
                </div>
                ${c.linked_title?`
                  <div style="font-size:0.75rem; color:#64748b;">
                    Linked: #${c.linked_id} ${gt(c.linked_title)}
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
    `,(o=i.querySelector("#ck-draft-new-btn"))==null||o.addEventListener("click",()=>{qi(null,()=>Fa())}),i.querySelectorAll(".ck-draft-edit-btn").forEach(c=>{c.addEventListener("click",()=>{const u=Number(c.getAttribute("data-id")),p=l.find(h=>h.id===u);p&&qi(p.linked_id,()=>{Fa(),zr()},p)})})}catch{i.innerHTML=""}}let Tn=null;function qa({title:i,content:n,footer:o="",onClose:s=()=>{}}){pi();const l=document.getElementById("modal-container"),c=`
    <div class="modal-backdrop" id="modal-backdrop"></div>
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>${Qc(i)}</h3>
        <button class="modal-close" id="modal-close-btn">&times;</button>
      </div>
      <div class="modal-body">
        ${n}
      </div>
      ${o?`<div class="modal-footer">${o}</div>`:""}
    </div>
  `;l.innerHTML=c,l.style.pointerEvents="auto";const u=()=>{l.innerHTML="",l.style.pointerEvents="none",Tn=null,s()};Tn=u,document.getElementById("modal-close-btn").addEventListener("click",u),document.getElementById("modal-backdrop").addEventListener("click",u);const p=h=>{h.key==="Escape"&&(u(),document.removeEventListener("keydown",p))};document.addEventListener("keydown",p)}function pi(){Tn&&Tn()}function Qc(i){return String(i).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}var eu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function tu(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Ua={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(i,n){(function(o,s){s(n)})(eu,function(o){var s="1.9.4";function l(e){var t,a,r,d;for(a=1,r=arguments.length;a<r;a++){d=arguments[a];for(t in d)e[t]=d[t]}return e}var c=Object.create||function(){function e(){}return function(t){return e.prototype=t,new e}}();function u(e,t){var a=Array.prototype.slice;if(e.bind)return e.bind.apply(e,a.call(arguments,1));var r=a.call(arguments,2);return function(){return e.apply(t,r.length?r.concat(a.call(arguments)):arguments)}}var p=0;function h(e){return"_leaflet_id"in e||(e._leaflet_id=++p),e._leaflet_id}function f(e,t,a){var r,d,m,y;return y=function(){r=!1,d&&(m.apply(a,d),d=!1)},m=function(){r?d=arguments:(e.apply(a,arguments),setTimeout(y,t),r=!0)},m}function g(e,t,a){var r=t[1],d=t[0],m=r-d;return e===r&&a?e:((e-d)%m+m)%m+d}function v(){return!1}function b(e,t){if(t===!1)return e;var a=Math.pow(10,t===void 0?6:t);return Math.round(e*a)/a}function w(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function z(e){return w(e).split(/\s+/)}function x(e,t){Object.prototype.hasOwnProperty.call(e,"options")||(e.options=e.options?c(e.options):{});for(var a in t)e.options[a]=t[a];return e.options}function I(e,t,a){var r=[];for(var d in e)r.push(encodeURIComponent(a?d.toUpperCase():d)+"="+encodeURIComponent(e[d]));return(!t||t.indexOf("?")===-1?"?":"&")+r.join("&")}var C=/\{ *([\w_ -]+) *\}/g;function _(e,t){return e.replace(C,function(a,r){var d=t[r];if(d===void 0)throw new Error("No value provided for variable "+a);return typeof d=="function"&&(d=d(t)),d})}var B=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"};function O(e,t){for(var a=0;a<e.length;a++)if(e[a]===t)return a;return-1}var G="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function ae(e){return window["webkit"+e]||window["moz"+e]||window["ms"+e]}var U=0;function M(e){var t=+new Date,a=Math.max(0,16-(t-U));return U=t+a,window.setTimeout(e,a)}var H=window.requestAnimationFrame||ae("RequestAnimationFrame")||M,Y=window.cancelAnimationFrame||ae("CancelAnimationFrame")||ae("CancelRequestAnimationFrame")||function(e){window.clearTimeout(e)};function V(e,t,a){if(a&&H===M)e.call(t);else return H.call(window,u(e,t))}function le(e){e&&Y.call(window,e)}var N={__proto__:null,extend:l,create:c,bind:u,get lastId(){return p},stamp:h,throttle:f,wrapNum:g,falseFn:v,formatNum:b,trim:w,splitWords:z,setOptions:x,getParamString:I,template:_,isArray:B,indexOf:O,emptyImageUrl:G,requestFn:H,cancelFn:Y,requestAnimFrame:V,cancelAnimFrame:le};function F(){}F.extend=function(e){var t=function(){x(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},a=t.__super__=this.prototype,r=c(a);r.constructor=t,t.prototype=r;for(var d in this)Object.prototype.hasOwnProperty.call(this,d)&&d!=="prototype"&&d!=="__super__"&&(t[d]=this[d]);return e.statics&&l(t,e.statics),e.includes&&(P(e.includes),l.apply(null,[r].concat(e.includes))),l(r,e),delete r.statics,delete r.includes,r.options&&(r.options=a.options?c(a.options):{},l(r.options,e.options)),r._initHooks=[],r.callInitHooks=function(){if(!this._initHooksCalled){a.callInitHooks&&a.callInitHooks.call(this),this._initHooksCalled=!0;for(var m=0,y=r._initHooks.length;m<y;m++)r._initHooks[m].call(this)}},t},F.include=function(e){var t=this.prototype.options;return l(this.prototype,e),e.options&&(this.prototype.options=t,this.mergeOptions(e.options)),this},F.mergeOptions=function(e){return l(this.prototype.options,e),this},F.addInitHook=function(e){var t=Array.prototype.slice.call(arguments,1),a=typeof e=="function"?e:function(){this[e].apply(this,t)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(a),this};function P(e){if(!(typeof L>"u"||!L||!L.Mixin)){e=B(e)?e:[e];for(var t=0;t<e.length;t++)e[t]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var W={on:function(e,t,a){if(typeof e=="object")for(var r in e)this._on(r,e[r],t);else{e=z(e);for(var d=0,m=e.length;d<m;d++)this._on(e[d],t,a)}return this},off:function(e,t,a){if(!arguments.length)delete this._events;else if(typeof e=="object")for(var r in e)this._off(r,e[r],t);else{e=z(e);for(var d=arguments.length===1,m=0,y=e.length;m<y;m++)d?this._off(e[m]):this._off(e[m],t,a)}return this},_on:function(e,t,a,r){if(typeof t!="function"){console.warn("wrong listener type: "+typeof t);return}if(this._listens(e,t,a)===!1){a===this&&(a=void 0);var d={fn:t,ctx:a};r&&(d.once=!0),this._events=this._events||{},this._events[e]=this._events[e]||[],this._events[e].push(d)}},_off:function(e,t,a){var r,d,m;if(this._events&&(r=this._events[e],!!r)){if(arguments.length===1){if(this._firingCount)for(d=0,m=r.length;d<m;d++)r[d].fn=v;delete this._events[e];return}if(typeof t!="function"){console.warn("wrong listener type: "+typeof t);return}var y=this._listens(e,t,a);if(y!==!1){var k=r[y];this._firingCount&&(k.fn=v,this._events[e]=r=r.slice()),r.splice(y,1)}}},fire:function(e,t,a){if(!this.listens(e,a))return this;var r=l({},t,{type:e,target:this,sourceTarget:t&&t.sourceTarget||this});if(this._events){var d=this._events[e];if(d){this._firingCount=this._firingCount+1||1;for(var m=0,y=d.length;m<y;m++){var k=d[m],$=k.fn;k.once&&this.off(e,$,k.ctx),$.call(k.ctx||this,r)}this._firingCount--}}return a&&this._propagateEvent(r),this},listens:function(e,t,a,r){typeof e!="string"&&console.warn('"string" type argument expected');var d=t;typeof t!="function"&&(r=!!t,d=void 0,a=void 0);var m=this._events&&this._events[e];if(m&&m.length&&this._listens(e,d,a)!==!1)return!0;if(r){for(var y in this._eventParents)if(this._eventParents[y].listens(e,t,a,r))return!0}return!1},_listens:function(e,t,a){if(!this._events)return!1;var r=this._events[e]||[];if(!t)return!!r.length;a===this&&(a=void 0);for(var d=0,m=r.length;d<m;d++)if(r[d].fn===t&&r[d].ctx===a)return d;return!1},once:function(e,t,a){if(typeof e=="object")for(var r in e)this._on(r,e[r],t,!0);else{e=z(e);for(var d=0,m=e.length;d<m;d++)this._on(e[d],t,a,!0)}return this},addEventParent:function(e){return this._eventParents=this._eventParents||{},this._eventParents[h(e)]=e,this},removeEventParent:function(e){return this._eventParents&&delete this._eventParents[h(e)],this},_propagateEvent:function(e){for(var t in this._eventParents)this._eventParents[t].fire(e.type,l({layer:e.target,propagatedFrom:e.target},e),!0)}};W.addEventListener=W.on,W.removeEventListener=W.clearAllEventListeners=W.off,W.addOneTimeEventListener=W.once,W.fireEvent=W.fire,W.hasEventListeners=W.listens;var ue=F.extend(W);function q(e,t,a){this.x=a?Math.round(e):e,this.y=a?Math.round(t):t}var Se=Math.trunc||function(e){return e>0?Math.floor(e):Math.ceil(e)};q.prototype={clone:function(){return new q(this.x,this.y)},add:function(e){return this.clone()._add(A(e))},_add:function(e){return this.x+=e.x,this.y+=e.y,this},subtract:function(e){return this.clone()._subtract(A(e))},_subtract:function(e){return this.x-=e.x,this.y-=e.y,this},divideBy:function(e){return this.clone()._divideBy(e)},_divideBy:function(e){return this.x/=e,this.y/=e,this},multiplyBy:function(e){return this.clone()._multiplyBy(e)},_multiplyBy:function(e){return this.x*=e,this.y*=e,this},scaleBy:function(e){return new q(this.x*e.x,this.y*e.y)},unscaleBy:function(e){return new q(this.x/e.x,this.y/e.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=Se(this.x),this.y=Se(this.y),this},distanceTo:function(e){e=A(e);var t=e.x-this.x,a=e.y-this.y;return Math.sqrt(t*t+a*a)},equals:function(e){return e=A(e),e.x===this.x&&e.y===this.y},contains:function(e){return e=A(e),Math.abs(e.x)<=Math.abs(this.x)&&Math.abs(e.y)<=Math.abs(this.y)},toString:function(){return"Point("+b(this.x)+", "+b(this.y)+")"}};function A(e,t,a){return e instanceof q?e:B(e)?new q(e[0],e[1]):e==null?e:typeof e=="object"&&"x"in e&&"y"in e?new q(e.x,e.y):new q(e,t,a)}function Q(e,t){if(e)for(var a=t?[e,t]:e,r=0,d=a.length;r<d;r++)this.extend(a[r])}Q.prototype={extend:function(e){var t,a;if(!e)return this;if(e instanceof q||typeof e[0]=="number"||"x"in e)t=a=A(e);else if(e=ve(e),t=e.min,a=e.max,!t||!a)return this;return!this.min&&!this.max?(this.min=t.clone(),this.max=a.clone()):(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(a.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(a.y,this.max.y)),this},getCenter:function(e){return A((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,e)},getBottomLeft:function(){return A(this.min.x,this.max.y)},getTopRight:function(){return A(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(e){var t,a;return typeof e[0]=="number"||e instanceof q?e=A(e):e=ve(e),e instanceof Q?(t=e.min,a=e.max):t=a=e,t.x>=this.min.x&&a.x<=this.max.x&&t.y>=this.min.y&&a.y<=this.max.y},intersects:function(e){e=ve(e);var t=this.min,a=this.max,r=e.min,d=e.max,m=d.x>=t.x&&r.x<=a.x,y=d.y>=t.y&&r.y<=a.y;return m&&y},overlaps:function(e){e=ve(e);var t=this.min,a=this.max,r=e.min,d=e.max,m=d.x>t.x&&r.x<a.x,y=d.y>t.y&&r.y<a.y;return m&&y},isValid:function(){return!!(this.min&&this.max)},pad:function(e){var t=this.min,a=this.max,r=Math.abs(t.x-a.x)*e,d=Math.abs(t.y-a.y)*e;return ve(A(t.x-r,t.y-d),A(a.x+r,a.y+d))},equals:function(e){return e?(e=ve(e),this.min.equals(e.getTopLeft())&&this.max.equals(e.getBottomRight())):!1}};function ve(e,t){return!e||e instanceof Q?e:new Q(e,t)}function pe(e,t){if(e)for(var a=t?[e,t]:e,r=0,d=a.length;r<d;r++)this.extend(a[r])}pe.prototype={extend:function(e){var t=this._southWest,a=this._northEast,r,d;if(e instanceof de)r=e,d=e;else if(e instanceof pe){if(r=e._southWest,d=e._northEast,!r||!d)return this}else return e?this.extend(oe(e)||ye(e)):this;return!t&&!a?(this._southWest=new de(r.lat,r.lng),this._northEast=new de(d.lat,d.lng)):(t.lat=Math.min(r.lat,t.lat),t.lng=Math.min(r.lng,t.lng),a.lat=Math.max(d.lat,a.lat),a.lng=Math.max(d.lng,a.lng)),this},pad:function(e){var t=this._southWest,a=this._northEast,r=Math.abs(t.lat-a.lat)*e,d=Math.abs(t.lng-a.lng)*e;return new pe(new de(t.lat-r,t.lng-d),new de(a.lat+r,a.lng+d))},getCenter:function(){return new de((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new de(this.getNorth(),this.getWest())},getSouthEast:function(){return new de(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(e){typeof e[0]=="number"||e instanceof de||"lat"in e?e=oe(e):e=ye(e);var t=this._southWest,a=this._northEast,r,d;return e instanceof pe?(r=e.getSouthWest(),d=e.getNorthEast()):r=d=e,r.lat>=t.lat&&d.lat<=a.lat&&r.lng>=t.lng&&d.lng<=a.lng},intersects:function(e){e=ye(e);var t=this._southWest,a=this._northEast,r=e.getSouthWest(),d=e.getNorthEast(),m=d.lat>=t.lat&&r.lat<=a.lat,y=d.lng>=t.lng&&r.lng<=a.lng;return m&&y},overlaps:function(e){e=ye(e);var t=this._southWest,a=this._northEast,r=e.getSouthWest(),d=e.getNorthEast(),m=d.lat>t.lat&&r.lat<a.lat,y=d.lng>t.lng&&r.lng<a.lng;return m&&y},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(e,t){return e?(e=ye(e),this._southWest.equals(e.getSouthWest(),t)&&this._northEast.equals(e.getNorthEast(),t)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function ye(e,t){return e instanceof pe?e:new pe(e,t)}function de(e,t,a){if(isNaN(e)||isNaN(t))throw new Error("Invalid LatLng object: ("+e+", "+t+")");this.lat=+e,this.lng=+t,a!==void 0&&(this.alt=+a)}de.prototype={equals:function(e,t){if(!e)return!1;e=oe(e);var a=Math.max(Math.abs(this.lat-e.lat),Math.abs(this.lng-e.lng));return a<=(t===void 0?1e-9:t)},toString:function(e){return"LatLng("+b(this.lat,e)+", "+b(this.lng,e)+")"},distanceTo:function(e){return St.distance(this,oe(e))},wrap:function(){return St.wrapLatLng(this)},toBounds:function(e){var t=180*e/40075017,a=t/Math.cos(Math.PI/180*this.lat);return ye([this.lat-t,this.lng-a],[this.lat+t,this.lng+a])},clone:function(){return new de(this.lat,this.lng,this.alt)}};function oe(e,t,a){return e instanceof de?e:B(e)&&typeof e[0]!="object"?e.length===3?new de(e[0],e[1],e[2]):e.length===2?new de(e[0],e[1]):null:e==null?e:typeof e=="object"&&"lat"in e?new de(e.lat,"lng"in e?e.lng:e.lon,e.alt):t===void 0?null:new de(e,t,a)}var bt={latLngToPoint:function(e,t){var a=this.projection.project(e),r=this.scale(t);return this.transformation._transform(a,r)},pointToLatLng:function(e,t){var a=this.scale(t),r=this.transformation.untransform(e,a);return this.projection.unproject(r)},project:function(e){return this.projection.project(e)},unproject:function(e){return this.projection.unproject(e)},scale:function(e){return 256*Math.pow(2,e)},zoom:function(e){return Math.log(e/256)/Math.LN2},getProjectedBounds:function(e){if(this.infinite)return null;var t=this.projection.bounds,a=this.scale(e),r=this.transformation.transform(t.min,a),d=this.transformation.transform(t.max,a);return new Q(r,d)},infinite:!1,wrapLatLng:function(e){var t=this.wrapLng?g(e.lng,this.wrapLng,!0):e.lng,a=this.wrapLat?g(e.lat,this.wrapLat,!0):e.lat,r=e.alt;return new de(a,t,r)},wrapLatLngBounds:function(e){var t=e.getCenter(),a=this.wrapLatLng(t),r=t.lat-a.lat,d=t.lng-a.lng;if(r===0&&d===0)return e;var m=e.getSouthWest(),y=e.getNorthEast(),k=new de(m.lat-r,m.lng-d),$=new de(y.lat-r,y.lng-d);return new pe(k,$)}},St=l({},bt,{wrapLng:[-180,180],R:6371e3,distance:function(e,t){var a=Math.PI/180,r=e.lat*a,d=t.lat*a,m=Math.sin((t.lat-e.lat)*a/2),y=Math.sin((t.lng-e.lng)*a/2),k=m*m+Math.cos(r)*Math.cos(d)*y*y,$=2*Math.atan2(Math.sqrt(k),Math.sqrt(1-k));return this.R*$}}),ro=6378137,Zn={R:ro,MAX_LATITUDE:85.0511287798,project:function(e){var t=Math.PI/180,a=this.MAX_LATITUDE,r=Math.max(Math.min(a,e.lat),-a),d=Math.sin(r*t);return new q(this.R*e.lng*t,this.R*Math.log((1+d)/(1-d))/2)},unproject:function(e){var t=180/Math.PI;return new de((2*Math.atan(Math.exp(e.y/this.R))-Math.PI/2)*t,e.x*t/this.R)},bounds:function(){var e=ro*Math.PI;return new Q([-e,-e],[e,e])}()};function Vn(e,t,a,r){if(B(e)){this._a=e[0],this._b=e[1],this._c=e[2],this._d=e[3];return}this._a=e,this._b=t,this._c=a,this._d=r}Vn.prototype={transform:function(e,t){return this._transform(e.clone(),t)},_transform:function(e,t){return t=t||1,e.x=t*(this._a*e.x+this._b),e.y=t*(this._c*e.y+this._d),e},untransform:function(e,t){return t=t||1,new q((e.x/t-this._b)/this._a,(e.y/t-this._d)/this._c)}};function yi(e,t,a,r){return new Vn(e,t,a,r)}var Wn=l({},St,{code:"EPSG:3857",projection:Zn,transformation:function(){var e=.5/(Math.PI*Zn.R);return yi(e,.5,-e,.5)}()}),Nr=l({},Wn,{code:"EPSG:900913"});function lo(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function co(e,t){var a="",r,d,m,y,k,$;for(r=0,m=e.length;r<m;r++){for(k=e[r],d=0,y=k.length;d<y;d++)$=k[d],a+=(d?"L":"M")+$.x+" "+$.y;a+=t?Z.svg?"z":"x":""}return a||"M0 0"}var Gn=document.documentElement.style,Yi="ActiveXObject"in window,jr=Yi&&!document.addEventListener,uo="msLaunchUri"in navigator&&!("documentMode"in document),Kn=ut("webkit"),po=ut("android"),ho=ut("android 2")||ut("android 3"),Hr=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),Dr=po&&ut("Google")&&Hr<537&&!("AudioNode"in window),Yn=!!window.opera,mo=!uo&&ut("chrome"),fo=ut("gecko")&&!Kn&&!Yn&&!Yi,Fr=!mo&&ut("safari"),go=ut("phantom"),vo="OTransition"in Gn,qr=navigator.platform.indexOf("Win")===0,yo=Yi&&"transition"in Gn,Jn="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!ho,bo="MozPerspective"in Gn,Ur=!window.L_DISABLE_3D&&(yo||Jn||bo)&&!vo&&!go,bi=typeof orientation<"u"||ut("mobile"),Zr=bi&&Kn,Vr=bi&&Jn,wo=!window.PointerEvent&&window.MSPointerEvent,xo=!!(window.PointerEvent||wo),_o="ontouchstart"in window||!!window.TouchEvent,Wr=!window.L_NO_TOUCH&&(_o||xo),Gr=bi&&Yn,Kr=bi&&fo,Yr=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,Jr=function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("testPassiveEventSupport",v,t),window.removeEventListener("testPassiveEventSupport",v,t)}catch{}return e}(),Xr=function(){return!!document.createElement("canvas").getContext}(),Xn=!!(document.createElementNS&&lo("svg").createSVGRect),Qr=!!Xn&&function(){var e=document.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),el=!Xn&&function(){try{var e=document.createElement("div");e.innerHTML='<v:shape adj="1"/>';var t=e.firstChild;return t.style.behavior="url(#default#VML)",t&&typeof t.adj=="object"}catch{return!1}}(),tl=navigator.platform.indexOf("Mac")===0,il=navigator.platform.indexOf("Linux")===0;function ut(e){return navigator.userAgent.toLowerCase().indexOf(e)>=0}var Z={ie:Yi,ielt9:jr,edge:uo,webkit:Kn,android:po,android23:ho,androidStock:Dr,opera:Yn,chrome:mo,gecko:fo,safari:Fr,phantom:go,opera12:vo,win:qr,ie3d:yo,webkit3d:Jn,gecko3d:bo,any3d:Ur,mobile:bi,mobileWebkit:Zr,mobileWebkit3d:Vr,msPointer:wo,pointer:xo,touch:Wr,touchNative:_o,mobileOpera:Gr,mobileGecko:Kr,retina:Yr,passiveEvents:Jr,canvas:Xr,svg:Xn,vml:el,inlineSvg:Qr,mac:tl,linux:il},ko=Z.msPointer?"MSPointerDown":"pointerdown",zo=Z.msPointer?"MSPointerMove":"pointermove",Lo=Z.msPointer?"MSPointerUp":"pointerup",$o=Z.msPointer?"MSPointerCancel":"pointercancel",Qn={touchstart:ko,touchmove:zo,touchend:Lo,touchcancel:$o},Eo={touchstart:ll,touchmove:Ji,touchend:Ji,touchcancel:Ji},Yt={},Co=!1;function nl(e,t,a){return t==="touchstart"&&rl(),Eo[t]?(a=Eo[t].bind(this,a),e.addEventListener(Qn[t],a,!1),a):(console.warn("wrong event specified:",t),v)}function al(e,t,a){if(!Qn[t]){console.warn("wrong event specified:",t);return}e.removeEventListener(Qn[t],a,!1)}function ol(e){Yt[e.pointerId]=e}function sl(e){Yt[e.pointerId]&&(Yt[e.pointerId]=e)}function So(e){delete Yt[e.pointerId]}function rl(){Co||(document.addEventListener(ko,ol,!0),document.addEventListener(zo,sl,!0),document.addEventListener(Lo,So,!0),document.addEventListener($o,So,!0),Co=!0)}function Ji(e,t){if(t.pointerType!==(t.MSPOINTER_TYPE_MOUSE||"mouse")){t.touches=[];for(var a in Yt)t.touches.push(Yt[a]);t.changedTouches=[t],e(t)}}function ll(e,t){t.MSPOINTER_TYPE_TOUCH&&t.pointerType===t.MSPOINTER_TYPE_TOUCH&&Be(t),Ji(e,t)}function dl(e){var t={},a,r;for(r in e)a=e[r],t[r]=a&&a.bind?a.bind(e):a;return e=t,t.type="dblclick",t.detail=2,t.isTrusted=!1,t._simulated=!0,t}var cl=200;function ul(e,t){e.addEventListener("dblclick",t);var a=0,r;function d(m){if(m.detail!==1){r=m.detail;return}if(!(m.pointerType==="mouse"||m.sourceCapabilities&&!m.sourceCapabilities.firesTouchEvents)){var y=Po(m);if(!(y.some(function($){return $ instanceof HTMLLabelElement&&$.attributes.for})&&!y.some(function($){return $ instanceof HTMLInputElement||$ instanceof HTMLSelectElement}))){var k=Date.now();k-a<=cl?(r++,r===2&&t(dl(m))):r=1,a=k}}}return e.addEventListener("click",d),{dblclick:t,simDblclick:d}}function pl(e,t){e.removeEventListener("dblclick",t.dblclick),e.removeEventListener("click",t.simDblclick)}var ea=en(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),wi=en(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),To=wi==="webkitTransition"||wi==="OTransition"?wi+"End":"transitionend";function Mo(e){return typeof e=="string"?document.getElementById(e):e}function xi(e,t){var a=e.style[t]||e.currentStyle&&e.currentStyle[t];if((!a||a==="auto")&&document.defaultView){var r=document.defaultView.getComputedStyle(e,null);a=r?r[t]:null}return a==="auto"?null:a}function he(e,t,a){var r=document.createElement(e);return r.className=t||"",a&&a.appendChild(r),r}function ke(e){var t=e.parentNode;t&&t.removeChild(e)}function Xi(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function Jt(e){var t=e.parentNode;t&&t.lastChild!==e&&t.appendChild(e)}function Xt(e){var t=e.parentNode;t&&t.firstChild!==e&&t.insertBefore(e,t.firstChild)}function ta(e,t){if(e.classList!==void 0)return e.classList.contains(t);var a=Qi(e);return a.length>0&&new RegExp("(^|\\s)"+t+"(\\s|$)").test(a)}function se(e,t){if(e.classList!==void 0)for(var a=z(t),r=0,d=a.length;r<d;r++)e.classList.add(a[r]);else if(!ta(e,t)){var m=Qi(e);ia(e,(m?m+" ":"")+t)}}function Ce(e,t){e.classList!==void 0?e.classList.remove(t):ia(e,w((" "+Qi(e)+" ").replace(" "+t+" "," ")))}function ia(e,t){e.className.baseVal===void 0?e.className=t:e.className.baseVal=t}function Qi(e){return e.correspondingElement&&(e=e.correspondingElement),e.className.baseVal===void 0?e.className:e.className.baseVal}function Qe(e,t){"opacity"in e.style?e.style.opacity=t:"filter"in e.style&&hl(e,t)}function hl(e,t){var a=!1,r="DXImageTransform.Microsoft.Alpha";try{a=e.filters.item(r)}catch{if(t===1)return}t=Math.round(t*100),a?(a.Enabled=t!==100,a.Opacity=t):e.style.filter+=" progid:"+r+"(opacity="+t+")"}function en(e){for(var t=document.documentElement.style,a=0;a<e.length;a++)if(e[a]in t)return e[a];return!1}function Nt(e,t,a){var r=t||new q(0,0);e.style[ea]=(Z.ie3d?"translate("+r.x+"px,"+r.y+"px)":"translate3d("+r.x+"px,"+r.y+"px,0)")+(a?" scale("+a+")":"")}function Te(e,t){e._leaflet_pos=t,Z.any3d?Nt(e,t):(e.style.left=t.x+"px",e.style.top=t.y+"px")}function jt(e){return e._leaflet_pos||new q(0,0)}var _i,ki,na;if("onselectstart"in document)_i=function(){te(window,"selectstart",Be)},ki=function(){xe(window,"selectstart",Be)};else{var zi=en(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);_i=function(){if(zi){var e=document.documentElement.style;na=e[zi],e[zi]="none"}},ki=function(){zi&&(document.documentElement.style[zi]=na,na=void 0)}}function aa(){te(window,"dragstart",Be)}function oa(){xe(window,"dragstart",Be)}var tn,sa;function ra(e){for(;e.tabIndex===-1;)e=e.parentNode;e.style&&(nn(),tn=e,sa=e.style.outlineStyle,e.style.outlineStyle="none",te(window,"keydown",nn))}function nn(){tn&&(tn.style.outlineStyle=sa,tn=void 0,sa=void 0,xe(window,"keydown",nn))}function Io(e){do e=e.parentNode;while((!e.offsetWidth||!e.offsetHeight)&&e!==document.body);return e}function la(e){var t=e.getBoundingClientRect();return{x:t.width/e.offsetWidth||1,y:t.height/e.offsetHeight||1,boundingClientRect:t}}var ml={__proto__:null,TRANSFORM:ea,TRANSITION:wi,TRANSITION_END:To,get:Mo,getStyle:xi,create:he,remove:ke,empty:Xi,toFront:Jt,toBack:Xt,hasClass:ta,addClass:se,removeClass:Ce,setClass:ia,getClass:Qi,setOpacity:Qe,testProp:en,setTransform:Nt,setPosition:Te,getPosition:jt,get disableTextSelection(){return _i},get enableTextSelection(){return ki},disableImageDrag:aa,enableImageDrag:oa,preventOutline:ra,restoreOutline:nn,getSizedParentNode:Io,getScale:la};function te(e,t,a,r){if(t&&typeof t=="object")for(var d in t)ca(e,d,t[d],a);else{t=z(t);for(var m=0,y=t.length;m<y;m++)ca(e,t[m],a,r)}return this}var pt="_leaflet_events";function xe(e,t,a,r){if(arguments.length===1)Ao(e),delete e[pt];else if(t&&typeof t=="object")for(var d in t)ua(e,d,t[d],a);else if(t=z(t),arguments.length===2)Ao(e,function(k){return O(t,k)!==-1});else for(var m=0,y=t.length;m<y;m++)ua(e,t[m],a,r);return this}function Ao(e,t){for(var a in e[pt]){var r=a.split(/\d/)[0];(!t||t(r))&&ua(e,r,null,null,a)}}var da={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function ca(e,t,a,r){var d=t+h(a)+(r?"_"+h(r):"");if(e[pt]&&e[pt][d])return this;var m=function(k){return a.call(r||e,k||window.event)},y=m;!Z.touchNative&&Z.pointer&&t.indexOf("touch")===0?m=nl(e,t,m):Z.touch&&t==="dblclick"?m=ul(e,m):"addEventListener"in e?t==="touchstart"||t==="touchmove"||t==="wheel"||t==="mousewheel"?e.addEventListener(da[t]||t,m,Z.passiveEvents?{passive:!1}:!1):t==="mouseenter"||t==="mouseleave"?(m=function(k){k=k||window.event,ha(e,k)&&y(k)},e.addEventListener(da[t],m,!1)):e.addEventListener(t,y,!1):e.attachEvent("on"+t,m),e[pt]=e[pt]||{},e[pt][d]=m}function ua(e,t,a,r,d){d=d||t+h(a)+(r?"_"+h(r):"");var m=e[pt]&&e[pt][d];if(!m)return this;!Z.touchNative&&Z.pointer&&t.indexOf("touch")===0?al(e,t,m):Z.touch&&t==="dblclick"?pl(e,m):"removeEventListener"in e?e.removeEventListener(da[t]||t,m,!1):e.detachEvent("on"+t,m),e[pt][d]=null}function Ht(e){return e.stopPropagation?e.stopPropagation():e.originalEvent?e.originalEvent._stopped=!0:e.cancelBubble=!0,this}function pa(e){return ca(e,"wheel",Ht),this}function Li(e){return te(e,"mousedown touchstart dblclick contextmenu",Ht),e._leaflet_disable_click=!0,this}function Be(e){return e.preventDefault?e.preventDefault():e.returnValue=!1,this}function Dt(e){return Be(e),Ht(e),this}function Po(e){if(e.composedPath)return e.composedPath();for(var t=[],a=e.target;a;)t.push(a),a=a.parentNode;return t}function Bo(e,t){if(!t)return new q(e.clientX,e.clientY);var a=la(t),r=a.boundingClientRect;return new q((e.clientX-r.left)/a.x-t.clientLeft,(e.clientY-r.top)/a.y-t.clientTop)}var fl=Z.linux&&Z.chrome?window.devicePixelRatio:Z.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Ro(e){return Z.edge?e.wheelDeltaY/2:e.deltaY&&e.deltaMode===0?-e.deltaY/fl:e.deltaY&&e.deltaMode===1?-e.deltaY*20:e.deltaY&&e.deltaMode===2?-e.deltaY*60:e.deltaX||e.deltaZ?0:e.wheelDelta?(e.wheelDeltaY||e.wheelDelta)/2:e.detail&&Math.abs(e.detail)<32765?-e.detail*20:e.detail?e.detail/-32765*60:0}function ha(e,t){var a=t.relatedTarget;if(!a)return!0;try{for(;a&&a!==e;)a=a.parentNode}catch{return!1}return a!==e}var gl={__proto__:null,on:te,off:xe,stopPropagation:Ht,disableScrollPropagation:pa,disableClickPropagation:Li,preventDefault:Be,stop:Dt,getPropagationPath:Po,getMousePosition:Bo,getWheelDelta:Ro,isExternalTarget:ha,addListener:te,removeListener:xe},Oo=ue.extend({run:function(e,t,a,r){this.stop(),this._el=e,this._inProgress=!0,this._duration=a||.25,this._easeOutPower=1/Math.max(r||.5,.2),this._startPos=jt(e),this._offset=t.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=V(this._animate,this),this._step()},_step:function(e){var t=+new Date-this._startTime,a=this._duration*1e3;t<a?this._runFrame(this._easeOut(t/a),e):(this._runFrame(1),this._complete())},_runFrame:function(e,t){var a=this._startPos.add(this._offset.multiplyBy(e));t&&a._round(),Te(this._el,a),this.fire("step")},_complete:function(){le(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(e){return 1-Math.pow(1-e,this._easeOutPower)}}),ce=ue.extend({options:{crs:Wn,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(e,t){t=x(this,t),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(e),this._initLayout(),this._onResize=u(this._onResize,this),this._initEvents(),t.maxBounds&&this.setMaxBounds(t.maxBounds),t.zoom!==void 0&&(this._zoom=this._limitZoom(t.zoom)),t.center&&t.zoom!==void 0&&this.setView(oe(t.center),t.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=wi&&Z.any3d&&!Z.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),te(this._proxy,To,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(e,t,a){if(t=t===void 0?this._zoom:this._limitZoom(t),e=this._limitCenter(oe(e),t,this.options.maxBounds),a=a||{},this._stop(),this._loaded&&!a.reset&&a!==!0){a.animate!==void 0&&(a.zoom=l({animate:a.animate},a.zoom),a.pan=l({animate:a.animate,duration:a.duration},a.pan));var r=this._zoom!==t?this._tryAnimatedZoom&&this._tryAnimatedZoom(e,t,a.zoom):this._tryAnimatedPan(e,a.pan);if(r)return clearTimeout(this._sizeTimer),this}return this._resetView(e,t,a.pan&&a.pan.noMoveStart),this},setZoom:function(e,t){return this._loaded?this.setView(this.getCenter(),e,{zoom:t}):(this._zoom=e,this)},zoomIn:function(e,t){return e=e||(Z.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+e,t)},zoomOut:function(e,t){return e=e||(Z.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-e,t)},setZoomAround:function(e,t,a){var r=this.getZoomScale(t),d=this.getSize().divideBy(2),m=e instanceof q?e:this.latLngToContainerPoint(e),y=m.subtract(d).multiplyBy(1-1/r),k=this.containerPointToLatLng(d.add(y));return this.setView(k,t,{zoom:a})},_getBoundsCenterZoom:function(e,t){t=t||{},e=e.getBounds?e.getBounds():ye(e);var a=A(t.paddingTopLeft||t.padding||[0,0]),r=A(t.paddingBottomRight||t.padding||[0,0]),d=this.getBoundsZoom(e,!1,a.add(r));if(d=typeof t.maxZoom=="number"?Math.min(t.maxZoom,d):d,d===1/0)return{center:e.getCenter(),zoom:d};var m=r.subtract(a).divideBy(2),y=this.project(e.getSouthWest(),d),k=this.project(e.getNorthEast(),d),$=this.unproject(y.add(k).divideBy(2).add(m),d);return{center:$,zoom:d}},fitBounds:function(e,t){if(e=ye(e),!e.isValid())throw new Error("Bounds are not valid.");var a=this._getBoundsCenterZoom(e,t);return this.setView(a.center,a.zoom,t)},fitWorld:function(e){return this.fitBounds([[-90,-180],[90,180]],e)},panTo:function(e,t){return this.setView(e,this._zoom,{pan:t})},panBy:function(e,t){if(e=A(e).round(),t=t||{},!e.x&&!e.y)return this.fire("moveend");if(t.animate!==!0&&!this.getSize().contains(e))return this._resetView(this.unproject(this.project(this.getCenter()).add(e)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Oo,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),t.noMoveStart||this.fire("movestart"),t.animate!==!1){se(this._mapPane,"leaflet-pan-anim");var a=this._getMapPanePos().subtract(e).round();this._panAnim.run(this._mapPane,a,t.duration||.25,t.easeLinearity)}else this._rawPanBy(e),this.fire("move").fire("moveend");return this},flyTo:function(e,t,a){if(a=a||{},a.animate===!1||!Z.any3d)return this.setView(e,t,a);this._stop();var r=this.project(this.getCenter()),d=this.project(e),m=this.getSize(),y=this._zoom;e=oe(e),t=t===void 0?y:t;var k=Math.max(m.x,m.y),$=k*this.getZoomScale(y,t),T=d.distanceTo(r)||1,j=1.42,K=j*j;function re(Me){var fn=Me?-1:1,ad=Me?$:k,od=$*$-k*k+fn*K*K*T*T,sd=2*ad*K*T,za=od/sd,vs=Math.sqrt(za*za+1)-za,rd=vs<1e-9?-18:Math.log(vs);return rd}function Ne(Me){return(Math.exp(Me)-Math.exp(-Me))/2}function Pe(Me){return(Math.exp(Me)+Math.exp(-Me))/2}function tt(Me){return Ne(Me)/Pe(Me)}var De=re(0);function ai(Me){return k*(Pe(De)/Pe(De+j*Me))}function ed(Me){return k*(Pe(De)*tt(De+j*Me)-Ne(De))/K}function td(Me){return 1-Math.pow(1-Me,1.5)}var id=Date.now(),fs=(re(1)-De)/j,nd=a.duration?1e3*a.duration:1e3*fs*.8;function gs(){var Me=(Date.now()-id)/nd,fn=td(Me)*fs;Me<=1?(this._flyToFrame=V(gs,this),this._move(this.unproject(r.add(d.subtract(r).multiplyBy(ed(fn)/T)),y),this.getScaleZoom(k/ai(fn),y),{flyTo:!0})):this._move(e,t)._moveEnd(!0)}return this._moveStart(!0,a.noMoveStart),gs.call(this),this},flyToBounds:function(e,t){var a=this._getBoundsCenterZoom(e,t);return this.flyTo(a.center,a.zoom,t)},setMaxBounds:function(e){return e=ye(e),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),e.isValid()?(this.options.maxBounds=e,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(e){var t=this.options.minZoom;return this.options.minZoom=e,this._loaded&&t!==e&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(e):this},setMaxZoom:function(e){var t=this.options.maxZoom;return this.options.maxZoom=e,this._loaded&&t!==e&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(e):this},panInsideBounds:function(e,t){this._enforcingBounds=!0;var a=this.getCenter(),r=this._limitCenter(a,this._zoom,ye(e));return a.equals(r)||this.panTo(r,t),this._enforcingBounds=!1,this},panInside:function(e,t){t=t||{};var a=A(t.paddingTopLeft||t.padding||[0,0]),r=A(t.paddingBottomRight||t.padding||[0,0]),d=this.project(this.getCenter()),m=this.project(e),y=this.getPixelBounds(),k=ve([y.min.add(a),y.max.subtract(r)]),$=k.getSize();if(!k.contains(m)){this._enforcingBounds=!0;var T=m.subtract(k.getCenter()),j=k.extend(m).getSize().subtract($);d.x+=T.x<0?-j.x:j.x,d.y+=T.y<0?-j.y:j.y,this.panTo(this.unproject(d),t),this._enforcingBounds=!1}return this},invalidateSize:function(e){if(!this._loaded)return this;e=l({animate:!1,pan:!0},e===!0?{animate:!0}:e);var t=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var a=this.getSize(),r=t.divideBy(2).round(),d=a.divideBy(2).round(),m=r.subtract(d);return!m.x&&!m.y?this:(e.animate&&e.pan?this.panBy(m):(e.pan&&this._rawPanBy(m),this.fire("move"),e.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(u(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:t,newSize:a}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(e){if(e=this._locateOptions=l({timeout:1e4,watch:!1},e),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var t=u(this._handleGeolocationResponse,this),a=u(this._handleGeolocationError,this);return e.watch?this._locationWatchId=navigator.geolocation.watchPosition(t,a,e):navigator.geolocation.getCurrentPosition(t,a,e),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(e){if(this._container._leaflet_id){var t=e.code,a=e.message||(t===1?"permission denied":t===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:t,message:"Geolocation error: "+a+"."})}},_handleGeolocationResponse:function(e){if(this._container._leaflet_id){var t=e.coords.latitude,a=e.coords.longitude,r=new de(t,a),d=r.toBounds(e.coords.accuracy*2),m=this._locateOptions;if(m.setView){var y=this.getBoundsZoom(d);this.setView(r,m.maxZoom?Math.min(y,m.maxZoom):y)}var k={latlng:r,bounds:d,timestamp:e.timestamp};for(var $ in e.coords)typeof e.coords[$]=="number"&&(k[$]=e.coords[$]);this.fire("locationfound",k)}},addHandler:function(e,t){if(!t)return this;var a=this[e]=new t(this);return this._handlers.push(a),this.options[e]&&a.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),ke(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(le(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var e;for(e in this._layers)this._layers[e].remove();for(e in this._panes)ke(this._panes[e]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(e,t){var a="leaflet-pane"+(e?" leaflet-"+e.replace("Pane","")+"-pane":""),r=he("div",a,t||this._mapPane);return e&&(this._panes[e]=r),r},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var e=this.getPixelBounds(),t=this.unproject(e.getBottomLeft()),a=this.unproject(e.getTopRight());return new pe(t,a)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(e,t,a){e=ye(e),a=A(a||[0,0]);var r=this.getZoom()||0,d=this.getMinZoom(),m=this.getMaxZoom(),y=e.getNorthWest(),k=e.getSouthEast(),$=this.getSize().subtract(a),T=ve(this.project(k,r),this.project(y,r)).getSize(),j=Z.any3d?this.options.zoomSnap:1,K=$.x/T.x,re=$.y/T.y,Ne=t?Math.max(K,re):Math.min(K,re);return r=this.getScaleZoom(Ne,r),j&&(r=Math.round(r/(j/100))*(j/100),r=t?Math.ceil(r/j)*j:Math.floor(r/j)*j),Math.max(d,Math.min(m,r))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new q(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(e,t){var a=this._getTopLeftPoint(e,t);return new Q(a,a.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(e){return this.options.crs.getProjectedBounds(e===void 0?this.getZoom():e)},getPane:function(e){return typeof e=="string"?this._panes[e]:e},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(e,t){var a=this.options.crs;return t=t===void 0?this._zoom:t,a.scale(e)/a.scale(t)},getScaleZoom:function(e,t){var a=this.options.crs;t=t===void 0?this._zoom:t;var r=a.zoom(e*a.scale(t));return isNaN(r)?1/0:r},project:function(e,t){return t=t===void 0?this._zoom:t,this.options.crs.latLngToPoint(oe(e),t)},unproject:function(e,t){return t=t===void 0?this._zoom:t,this.options.crs.pointToLatLng(A(e),t)},layerPointToLatLng:function(e){var t=A(e).add(this.getPixelOrigin());return this.unproject(t)},latLngToLayerPoint:function(e){var t=this.project(oe(e))._round();return t._subtract(this.getPixelOrigin())},wrapLatLng:function(e){return this.options.crs.wrapLatLng(oe(e))},wrapLatLngBounds:function(e){return this.options.crs.wrapLatLngBounds(ye(e))},distance:function(e,t){return this.options.crs.distance(oe(e),oe(t))},containerPointToLayerPoint:function(e){return A(e).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(e){return A(e).add(this._getMapPanePos())},containerPointToLatLng:function(e){var t=this.containerPointToLayerPoint(A(e));return this.layerPointToLatLng(t)},latLngToContainerPoint:function(e){return this.layerPointToContainerPoint(this.latLngToLayerPoint(oe(e)))},mouseEventToContainerPoint:function(e){return Bo(e,this._container)},mouseEventToLayerPoint:function(e){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e))},mouseEventToLatLng:function(e){return this.layerPointToLatLng(this.mouseEventToLayerPoint(e))},_initContainer:function(e){var t=this._container=Mo(e);if(t){if(t._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");te(t,"scroll",this._onScroll,this),this._containerId=h(t)},_initLayout:function(){var e=this._container;this._fadeAnimated=this.options.fadeAnimation&&Z.any3d,se(e,"leaflet-container"+(Z.touch?" leaflet-touch":"")+(Z.retina?" leaflet-retina":"")+(Z.ielt9?" leaflet-oldie":"")+(Z.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var t=xi(e,"position");t!=="absolute"&&t!=="relative"&&t!=="fixed"&&t!=="sticky"&&(e.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var e=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Te(this._mapPane,new q(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(se(e.markerPane,"leaflet-zoom-hide"),se(e.shadowPane,"leaflet-zoom-hide"))},_resetView:function(e,t,a){Te(this._mapPane,new q(0,0));var r=!this._loaded;this._loaded=!0,t=this._limitZoom(t),this.fire("viewprereset");var d=this._zoom!==t;this._moveStart(d,a)._move(e,t)._moveEnd(d),this.fire("viewreset"),r&&this.fire("load")},_moveStart:function(e,t){return e&&this.fire("zoomstart"),t||this.fire("movestart"),this},_move:function(e,t,a,r){t===void 0&&(t=this._zoom);var d=this._zoom!==t;return this._zoom=t,this._lastCenter=e,this._pixelOrigin=this._getNewPixelOrigin(e),r?a&&a.pinch&&this.fire("zoom",a):((d||a&&a.pinch)&&this.fire("zoom",a),this.fire("move",a)),this},_moveEnd:function(e){return e&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return le(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(e){Te(this._mapPane,this._getMapPanePos().subtract(e))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(e){this._targets={},this._targets[h(this._container)]=this;var t=e?xe:te;t(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&t(window,"resize",this._onResize,this),Z.any3d&&this.options.transform3DLimit&&(e?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){le(this._resizeRequest),this._resizeRequest=V(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var e=this._getMapPanePos();Math.max(Math.abs(e.x),Math.abs(e.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(e,t){for(var a=[],r,d=t==="mouseout"||t==="mouseover",m=e.target||e.srcElement,y=!1;m;){if(r=this._targets[h(m)],r&&(t==="click"||t==="preclick")&&this._draggableMoved(r)){y=!0;break}if(r&&r.listens(t,!0)&&(d&&!ha(m,e)||(a.push(r),d))||m===this._container)break;m=m.parentNode}return!a.length&&!y&&!d&&this.listens(t,!0)&&(a=[this]),a},_isClickDisabled:function(e){for(;e&&e!==this._container;){if(e._leaflet_disable_click)return!0;e=e.parentNode}},_handleDOMEvent:function(e){var t=e.target||e.srcElement;if(!(!this._loaded||t._leaflet_disable_events||e.type==="click"&&this._isClickDisabled(t))){var a=e.type;a==="mousedown"&&ra(t),this._fireDOMEvent(e,a)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(e,t,a){if(e.type==="click"){var r=l({},e);r.type="preclick",this._fireDOMEvent(r,r.type,a)}var d=this._findEventTargets(e,t);if(a){for(var m=[],y=0;y<a.length;y++)a[y].listens(t,!0)&&m.push(a[y]);d=m.concat(d)}if(d.length){t==="contextmenu"&&Be(e);var k=d[0],$={originalEvent:e};if(e.type!=="keypress"&&e.type!=="keydown"&&e.type!=="keyup"){var T=k.getLatLng&&(!k._radius||k._radius<=10);$.containerPoint=T?this.latLngToContainerPoint(k.getLatLng()):this.mouseEventToContainerPoint(e),$.layerPoint=this.containerPointToLayerPoint($.containerPoint),$.latlng=T?k.getLatLng():this.layerPointToLatLng($.layerPoint)}for(y=0;y<d.length;y++)if(d[y].fire(t,$,!0),$.originalEvent._stopped||d[y].options.bubblingMouseEvents===!1&&O(this._mouseEvents,t)!==-1)return}},_draggableMoved:function(e){return e=e.dragging&&e.dragging.enabled()?e:this,e.dragging&&e.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var e=0,t=this._handlers.length;e<t;e++)this._handlers[e].disable()},whenReady:function(e,t){return this._loaded?e.call(t||this,{target:this}):this.on("load",e,t),this},_getMapPanePos:function(){return jt(this._mapPane)||new q(0,0)},_moved:function(){var e=this._getMapPanePos();return e&&!e.equals([0,0])},_getTopLeftPoint:function(e,t){var a=e&&t!==void 0?this._getNewPixelOrigin(e,t):this.getPixelOrigin();return a.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(e,t){var a=this.getSize()._divideBy(2);return this.project(e,t)._subtract(a)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(e,t,a){var r=this._getNewPixelOrigin(a,t);return this.project(e,t)._subtract(r)},_latLngBoundsToNewLayerBounds:function(e,t,a){var r=this._getNewPixelOrigin(a,t);return ve([this.project(e.getSouthWest(),t)._subtract(r),this.project(e.getNorthWest(),t)._subtract(r),this.project(e.getSouthEast(),t)._subtract(r),this.project(e.getNorthEast(),t)._subtract(r)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(e){return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint())},_limitCenter:function(e,t,a){if(!a)return e;var r=this.project(e,t),d=this.getSize().divideBy(2),m=new Q(r.subtract(d),r.add(d)),y=this._getBoundsOffset(m,a,t);return Math.abs(y.x)<=1&&Math.abs(y.y)<=1?e:this.unproject(r.add(y),t)},_limitOffset:function(e,t){if(!t)return e;var a=this.getPixelBounds(),r=new Q(a.min.add(e),a.max.add(e));return e.add(this._getBoundsOffset(r,t))},_getBoundsOffset:function(e,t,a){var r=ve(this.project(t.getNorthEast(),a),this.project(t.getSouthWest(),a)),d=r.min.subtract(e.min),m=r.max.subtract(e.max),y=this._rebound(d.x,-m.x),k=this._rebound(d.y,-m.y);return new q(y,k)},_rebound:function(e,t){return e+t>0?Math.round(e-t)/2:Math.max(0,Math.ceil(e))-Math.max(0,Math.floor(t))},_limitZoom:function(e){var t=this.getMinZoom(),a=this.getMaxZoom(),r=Z.any3d?this.options.zoomSnap:1;return r&&(e=Math.round(e/r)*r),Math.max(t,Math.min(a,e))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){Ce(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(e,t){var a=this._getCenterOffset(e)._trunc();return(t&&t.animate)!==!0&&!this.getSize().contains(a)?!1:(this.panBy(a,t),!0)},_createAnimProxy:function(){var e=this._proxy=he("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(e),this.on("zoomanim",function(t){var a=ea,r=this._proxy.style[a];Nt(this._proxy,this.project(t.center,t.zoom),this.getZoomScale(t.zoom,1)),r===this._proxy.style[a]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){ke(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var e=this.getCenter(),t=this.getZoom();Nt(this._proxy,this.project(e,t),this.getZoomScale(t,1))},_catchTransitionEnd:function(e){this._animatingZoom&&e.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(e,t,a){if(this._animatingZoom)return!0;if(a=a||{},!this._zoomAnimated||a.animate===!1||this._nothingToAnimate()||Math.abs(t-this._zoom)>this.options.zoomAnimationThreshold)return!1;var r=this.getZoomScale(t),d=this._getCenterOffset(e)._divideBy(1-1/r);return a.animate!==!0&&!this.getSize().contains(d)?!1:(V(function(){this._moveStart(!0,a.noMoveStart||!1)._animateZoom(e,t,!0)},this),!0)},_animateZoom:function(e,t,a,r){this._mapPane&&(a&&(this._animatingZoom=!0,this._animateToCenter=e,this._animateToZoom=t,se(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:e,zoom:t,noUpdate:r}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(u(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&Ce(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function vl(e,t){return new ce(e,t)}var st=F.extend({options:{position:"topright"},initialize:function(e){x(this,e)},getPosition:function(){return this.options.position},setPosition:function(e){var t=this._map;return t&&t.removeControl(this),this.options.position=e,t&&t.addControl(this),this},getContainer:function(){return this._container},addTo:function(e){this.remove(),this._map=e;var t=this._container=this.onAdd(e),a=this.getPosition(),r=e._controlCorners[a];return se(t,"leaflet-control"),a.indexOf("bottom")!==-1?r.insertBefore(t,r.firstChild):r.appendChild(t),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(ke(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(e){this._map&&e&&e.screenX>0&&e.screenY>0&&this._map.getContainer().focus()}}),$i=function(e){return new st(e)};ce.include({addControl:function(e){return e.addTo(this),this},removeControl:function(e){return e.remove(),this},_initControlPos:function(){var e=this._controlCorners={},t="leaflet-",a=this._controlContainer=he("div",t+"control-container",this._container);function r(d,m){var y=t+d+" "+t+m;e[d+m]=he("div",y,a)}r("top","left"),r("top","right"),r("bottom","left"),r("bottom","right")},_clearControlPos:function(){for(var e in this._controlCorners)ke(this._controlCorners[e]);ke(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var No=st.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(e,t,a,r){return a<r?-1:r<a?1:0}},initialize:function(e,t,a){x(this,a),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var r in e)this._addLayer(e[r],r);for(r in t)this._addLayer(t[r],r,!0)},onAdd:function(e){this._initLayout(),this._update(),this._map=e,e.on("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(e){return st.prototype.addTo.call(this,e),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(e,t){return this._addLayer(e,t),this._map?this._update():this},addOverlay:function(e,t){return this._addLayer(e,t,!0),this._map?this._update():this},removeLayer:function(e){e.off("add remove",this._onLayerChange,this);var t=this._getLayer(h(e));return t&&this._layers.splice(this._layers.indexOf(t),1),this._map?this._update():this},expand:function(){se(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var e=this._map.getSize().y-(this._container.offsetTop+50);return e<this._section.clientHeight?(se(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=e+"px"):Ce(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return Ce(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var e="leaflet-control-layers",t=this._container=he("div",e),a=this.options.collapsed;t.setAttribute("aria-haspopup",!0),Li(t),pa(t);var r=this._section=he("section",e+"-list");a&&(this._map.on("click",this.collapse,this),te(t,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var d=this._layersLink=he("a",e+"-toggle",t);d.href="#",d.title="Layers",d.setAttribute("role","button"),te(d,{keydown:function(m){m.keyCode===13&&this._expandSafely()},click:function(m){Be(m),this._expandSafely()}},this),a||this.expand(),this._baseLayersList=he("div",e+"-base",r),this._separator=he("div",e+"-separator",r),this._overlaysList=he("div",e+"-overlays",r),t.appendChild(r)},_getLayer:function(e){for(var t=0;t<this._layers.length;t++)if(this._layers[t]&&h(this._layers[t].layer)===e)return this._layers[t]},_addLayer:function(e,t,a){this._map&&e.on("add remove",this._onLayerChange,this),this._layers.push({layer:e,name:t,overlay:a}),this.options.sortLayers&&this._layers.sort(u(function(r,d){return this.options.sortFunction(r.layer,d.layer,r.name,d.name)},this)),this.options.autoZIndex&&e.setZIndex&&(this._lastZIndex++,e.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;Xi(this._baseLayersList),Xi(this._overlaysList),this._layerControlInputs=[];var e,t,a,r,d=0;for(a=0;a<this._layers.length;a++)r=this._layers[a],this._addItem(r),t=t||r.overlay,e=e||!r.overlay,d+=r.overlay?0:1;return this.options.hideSingleBase&&(e=e&&d>1,this._baseLayersList.style.display=e?"":"none"),this._separator.style.display=t&&e?"":"none",this},_onLayerChange:function(e){this._handlingClick||this._update();var t=this._getLayer(h(e.target)),a=t.overlay?e.type==="add"?"overlayadd":"overlayremove":e.type==="add"?"baselayerchange":null;a&&this._map.fire(a,t)},_createRadioElement:function(e,t){var a='<input type="radio" class="leaflet-control-layers-selector" name="'+e+'"'+(t?' checked="checked"':"")+"/>",r=document.createElement("div");return r.innerHTML=a,r.firstChild},_addItem:function(e){var t=document.createElement("label"),a=this._map.hasLayer(e.layer),r;e.overlay?(r=document.createElement("input"),r.type="checkbox",r.className="leaflet-control-layers-selector",r.defaultChecked=a):r=this._createRadioElement("leaflet-base-layers_"+h(this),a),this._layerControlInputs.push(r),r.layerId=h(e.layer),te(r,"click",this._onInputClick,this);var d=document.createElement("span");d.innerHTML=" "+e.name;var m=document.createElement("span");t.appendChild(m),m.appendChild(r),m.appendChild(d);var y=e.overlay?this._overlaysList:this._baseLayersList;return y.appendChild(t),this._checkDisabledLayers(),t},_onInputClick:function(){if(!this._preventClick){var e=this._layerControlInputs,t,a,r=[],d=[];this._handlingClick=!0;for(var m=e.length-1;m>=0;m--)t=e[m],a=this._getLayer(t.layerId).layer,t.checked?r.push(a):t.checked||d.push(a);for(m=0;m<d.length;m++)this._map.hasLayer(d[m])&&this._map.removeLayer(d[m]);for(m=0;m<r.length;m++)this._map.hasLayer(r[m])||this._map.addLayer(r[m]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var e=this._layerControlInputs,t,a,r=this._map.getZoom(),d=e.length-1;d>=0;d--)t=e[d],a=this._getLayer(t.layerId).layer,t.disabled=a.options.minZoom!==void 0&&r<a.options.minZoom||a.options.maxZoom!==void 0&&r>a.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var e=this._section;this._preventClick=!0,te(e,"click",Be),this.expand();var t=this;setTimeout(function(){xe(e,"click",Be),t._preventClick=!1})}}),yl=function(e,t,a){return new No(e,t,a)},ma=st.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(e){var t="leaflet-control-zoom",a=he("div",t+" leaflet-bar"),r=this.options;return this._zoomInButton=this._createButton(r.zoomInText,r.zoomInTitle,t+"-in",a,this._zoomIn),this._zoomOutButton=this._createButton(r.zoomOutText,r.zoomOutTitle,t+"-out",a,this._zoomOut),this._updateDisabled(),e.on("zoomend zoomlevelschange",this._updateDisabled,this),a},onRemove:function(e){e.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(e){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(e.shiftKey?3:1))},_zoomOut:function(e){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(e.shiftKey?3:1))},_createButton:function(e,t,a,r,d){var m=he("a",a,r);return m.innerHTML=e,m.href="#",m.title=t,m.setAttribute("role","button"),m.setAttribute("aria-label",t),Li(m),te(m,"click",Dt),te(m,"click",d,this),te(m,"click",this._refocusOnMap,this),m},_updateDisabled:function(){var e=this._map,t="leaflet-disabled";Ce(this._zoomInButton,t),Ce(this._zoomOutButton,t),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||e._zoom===e.getMinZoom())&&(se(this._zoomOutButton,t),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||e._zoom===e.getMaxZoom())&&(se(this._zoomInButton,t),this._zoomInButton.setAttribute("aria-disabled","true"))}});ce.mergeOptions({zoomControl:!0}),ce.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new ma,this.addControl(this.zoomControl))});var bl=function(e){return new ma(e)},jo=st.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(e){var t="leaflet-control-scale",a=he("div",t),r=this.options;return this._addScales(r,t+"-line",a),e.on(r.updateWhenIdle?"moveend":"move",this._update,this),e.whenReady(this._update,this),a},onRemove:function(e){e.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(e,t,a){e.metric&&(this._mScale=he("div",t,a)),e.imperial&&(this._iScale=he("div",t,a))},_update:function(){var e=this._map,t=e.getSize().y/2,a=e.distance(e.containerPointToLatLng([0,t]),e.containerPointToLatLng([this.options.maxWidth,t]));this._updateScales(a)},_updateScales:function(e){this.options.metric&&e&&this._updateMetric(e),this.options.imperial&&e&&this._updateImperial(e)},_updateMetric:function(e){var t=this._getRoundNum(e),a=t<1e3?t+" m":t/1e3+" km";this._updateScale(this._mScale,a,t/e)},_updateImperial:function(e){var t=e*3.2808399,a,r,d;t>5280?(a=t/5280,r=this._getRoundNum(a),this._updateScale(this._iScale,r+" mi",r/a)):(d=this._getRoundNum(t),this._updateScale(this._iScale,d+" ft",d/t))},_updateScale:function(e,t,a){e.style.width=Math.round(this.options.maxWidth*a)+"px",e.innerHTML=t},_getRoundNum:function(e){var t=Math.pow(10,(Math.floor(e)+"").length-1),a=e/t;return a=a>=10?10:a>=5?5:a>=3?3:a>=2?2:1,t*a}}),wl=function(e){return new jo(e)},xl='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',fa=st.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Z.inlineSvg?xl+" ":"")+"Leaflet</a>"},initialize:function(e){x(this,e),this._attributions={}},onAdd:function(e){e.attributionControl=this,this._container=he("div","leaflet-control-attribution"),Li(this._container);for(var t in e._layers)e._layers[t].getAttribution&&this.addAttribution(e._layers[t].getAttribution());return this._update(),e.on("layeradd",this._addAttribution,this),this._container},onRemove:function(e){e.off("layeradd",this._addAttribution,this)},_addAttribution:function(e){e.layer.getAttribution&&(this.addAttribution(e.layer.getAttribution()),e.layer.once("remove",function(){this.removeAttribution(e.layer.getAttribution())},this))},setPrefix:function(e){return this.options.prefix=e,this._update(),this},addAttribution:function(e){return e?(this._attributions[e]||(this._attributions[e]=0),this._attributions[e]++,this._update(),this):this},removeAttribution:function(e){return e?(this._attributions[e]&&(this._attributions[e]--,this._update()),this):this},_update:function(){if(this._map){var e=[];for(var t in this._attributions)this._attributions[t]&&e.push(t);var a=[];this.options.prefix&&a.push(this.options.prefix),e.length&&a.push(e.join(", ")),this._container.innerHTML=a.join(' <span aria-hidden="true">|</span> ')}}});ce.mergeOptions({attributionControl:!0}),ce.addInitHook(function(){this.options.attributionControl&&new fa().addTo(this)});var _l=function(e){return new fa(e)};st.Layers=No,st.Zoom=ma,st.Scale=jo,st.Attribution=fa,$i.layers=yl,$i.zoom=bl,$i.scale=wl,$i.attribution=_l;var ht=F.extend({initialize:function(e){this._map=e},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});ht.addTo=function(e,t){return e.addHandler(t,this),this};var kl={Events:W},Ho=Z.touch?"touchstart mousedown":"mousedown",Tt=ue.extend({options:{clickTolerance:3},initialize:function(e,t,a,r){x(this,r),this._element=e,this._dragStartTarget=t||e,this._preventOutline=a},enable:function(){this._enabled||(te(this._dragStartTarget,Ho,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(Tt._dragging===this&&this.finishDrag(!0),xe(this._dragStartTarget,Ho,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(e){if(this._enabled&&(this._moved=!1,!ta(this._element,"leaflet-zoom-anim"))){if(e.touches&&e.touches.length!==1){Tt._dragging===this&&this.finishDrag();return}if(!(Tt._dragging||e.shiftKey||e.which!==1&&e.button!==1&&!e.touches)&&(Tt._dragging=this,this._preventOutline&&ra(this._element),aa(),_i(),!this._moving)){this.fire("down");var t=e.touches?e.touches[0]:e,a=Io(this._element);this._startPoint=new q(t.clientX,t.clientY),this._startPos=jt(this._element),this._parentScale=la(a);var r=e.type==="mousedown";te(document,r?"mousemove":"touchmove",this._onMove,this),te(document,r?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(e){if(this._enabled){if(e.touches&&e.touches.length>1){this._moved=!0;return}var t=e.touches&&e.touches.length===1?e.touches[0]:e,a=new q(t.clientX,t.clientY)._subtract(this._startPoint);!a.x&&!a.y||Math.abs(a.x)+Math.abs(a.y)<this.options.clickTolerance||(a.x/=this._parentScale.x,a.y/=this._parentScale.y,Be(e),this._moved||(this.fire("dragstart"),this._moved=!0,se(document.body,"leaflet-dragging"),this._lastTarget=e.target||e.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),se(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(a),this._moving=!0,this._lastEvent=e,this._updatePosition())}},_updatePosition:function(){var e={originalEvent:this._lastEvent};this.fire("predrag",e),Te(this._element,this._newPos),this.fire("drag",e)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(e){Ce(document.body,"leaflet-dragging"),this._lastTarget&&(Ce(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),xe(document,"mousemove touchmove",this._onMove,this),xe(document,"mouseup touchend touchcancel",this._onUp,this),oa(),ki();var t=this._moved&&this._moving;this._moving=!1,Tt._dragging=!1,t&&this.fire("dragend",{noInertia:e,distance:this._newPos.distanceTo(this._startPos)})}});function Do(e,t,a){var r,d=[1,4,2,8],m,y,k,$,T,j,K,re;for(m=0,j=e.length;m<j;m++)e[m]._code=Ft(e[m],t);for(k=0;k<4;k++){for(K=d[k],r=[],m=0,j=e.length,y=j-1;m<j;y=m++)$=e[m],T=e[y],$._code&K?T._code&K||(re=an(T,$,K,t,a),re._code=Ft(re,t),r.push(re)):(T._code&K&&(re=an(T,$,K,t,a),re._code=Ft(re,t),r.push(re)),r.push($));e=r}return e}function Fo(e,t){var a,r,d,m,y,k,$,T,j;if(!e||e.length===0)throw new Error("latlngs not passed");et(e)||(console.warn("latlngs are not flat! Only the first ring will be used"),e=e[0]);var K=oe([0,0]),re=ye(e),Ne=re.getNorthWest().distanceTo(re.getSouthWest())*re.getNorthEast().distanceTo(re.getNorthWest());Ne<1700&&(K=ga(e));var Pe=e.length,tt=[];for(a=0;a<Pe;a++){var De=oe(e[a]);tt.push(t.project(oe([De.lat-K.lat,De.lng-K.lng])))}for(k=$=T=0,a=0,r=Pe-1;a<Pe;r=a++)d=tt[a],m=tt[r],y=d.y*m.x-m.y*d.x,$+=(d.x+m.x)*y,T+=(d.y+m.y)*y,k+=y*3;k===0?j=tt[0]:j=[$/k,T/k];var ai=t.unproject(A(j));return oe([ai.lat+K.lat,ai.lng+K.lng])}function ga(e){for(var t=0,a=0,r=0,d=0;d<e.length;d++){var m=oe(e[d]);t+=m.lat,a+=m.lng,r++}return oe([t/r,a/r])}var zl={__proto__:null,clipPolygon:Do,polygonCenter:Fo,centroid:ga};function qo(e,t){if(!t||!e.length)return e.slice();var a=t*t;return e=El(e,a),e=$l(e,a),e}function Uo(e,t,a){return Math.sqrt(Ei(e,t,a,!0))}function Ll(e,t,a){return Ei(e,t,a)}function $l(e,t){var a=e.length,r=typeof Uint8Array<"u"?Uint8Array:Array,d=new r(a);d[0]=d[a-1]=1,va(e,d,t,0,a-1);var m,y=[];for(m=0;m<a;m++)d[m]&&y.push(e[m]);return y}function va(e,t,a,r,d){var m=0,y,k,$;for(k=r+1;k<=d-1;k++)$=Ei(e[k],e[r],e[d],!0),$>m&&(y=k,m=$);m>a&&(t[y]=1,va(e,t,a,r,y),va(e,t,a,y,d))}function El(e,t){for(var a=[e[0]],r=1,d=0,m=e.length;r<m;r++)Cl(e[r],e[d])>t&&(a.push(e[r]),d=r);return d<m-1&&a.push(e[m-1]),a}var Zo;function Vo(e,t,a,r,d){var m=r?Zo:Ft(e,a),y=Ft(t,a),k,$,T;for(Zo=y;;){if(!(m|y))return[e,t];if(m&y)return!1;k=m||y,$=an(e,t,k,a,d),T=Ft($,a),k===m?(e=$,m=T):(t=$,y=T)}}function an(e,t,a,r,d){var m=t.x-e.x,y=t.y-e.y,k=r.min,$=r.max,T,j;return a&8?(T=e.x+m*($.y-e.y)/y,j=$.y):a&4?(T=e.x+m*(k.y-e.y)/y,j=k.y):a&2?(T=$.x,j=e.y+y*($.x-e.x)/m):a&1&&(T=k.x,j=e.y+y*(k.x-e.x)/m),new q(T,j,d)}function Ft(e,t){var a=0;return e.x<t.min.x?a|=1:e.x>t.max.x&&(a|=2),e.y<t.min.y?a|=4:e.y>t.max.y&&(a|=8),a}function Cl(e,t){var a=t.x-e.x,r=t.y-e.y;return a*a+r*r}function Ei(e,t,a,r){var d=t.x,m=t.y,y=a.x-d,k=a.y-m,$=y*y+k*k,T;return $>0&&(T=((e.x-d)*y+(e.y-m)*k)/$,T>1?(d=a.x,m=a.y):T>0&&(d+=y*T,m+=k*T)),y=e.x-d,k=e.y-m,r?y*y+k*k:new q(d,m)}function et(e){return!B(e[0])||typeof e[0][0]!="object"&&typeof e[0][0]<"u"}function Wo(e){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),et(e)}function Go(e,t){var a,r,d,m,y,k,$,T;if(!e||e.length===0)throw new Error("latlngs not passed");et(e)||(console.warn("latlngs are not flat! Only the first ring will be used"),e=e[0]);var j=oe([0,0]),K=ye(e),re=K.getNorthWest().distanceTo(K.getSouthWest())*K.getNorthEast().distanceTo(K.getNorthWest());re<1700&&(j=ga(e));var Ne=e.length,Pe=[];for(a=0;a<Ne;a++){var tt=oe(e[a]);Pe.push(t.project(oe([tt.lat-j.lat,tt.lng-j.lng])))}for(a=0,r=0;a<Ne-1;a++)r+=Pe[a].distanceTo(Pe[a+1])/2;if(r===0)T=Pe[0];else for(a=0,m=0;a<Ne-1;a++)if(y=Pe[a],k=Pe[a+1],d=y.distanceTo(k),m+=d,m>r){$=(m-r)/d,T=[k.x-$*(k.x-y.x),k.y-$*(k.y-y.y)];break}var De=t.unproject(A(T));return oe([De.lat+j.lat,De.lng+j.lng])}var Sl={__proto__:null,simplify:qo,pointToSegmentDistance:Uo,closestPointOnSegment:Ll,clipSegment:Vo,_getEdgeIntersection:an,_getBitCode:Ft,_sqClosestPointOnSegment:Ei,isFlat:et,_flat:Wo,polylineCenter:Go},ya={project:function(e){return new q(e.lng,e.lat)},unproject:function(e){return new de(e.y,e.x)},bounds:new Q([-180,-90],[180,90])},ba={R:6378137,R_MINOR:6356752314245179e-9,bounds:new Q([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(e){var t=Math.PI/180,a=this.R,r=e.lat*t,d=this.R_MINOR/a,m=Math.sqrt(1-d*d),y=m*Math.sin(r),k=Math.tan(Math.PI/4-r/2)/Math.pow((1-y)/(1+y),m/2);return r=-a*Math.log(Math.max(k,1e-10)),new q(e.lng*t*a,r)},unproject:function(e){for(var t=180/Math.PI,a=this.R,r=this.R_MINOR/a,d=Math.sqrt(1-r*r),m=Math.exp(-e.y/a),y=Math.PI/2-2*Math.atan(m),k=0,$=.1,T;k<15&&Math.abs($)>1e-7;k++)T=d*Math.sin(y),T=Math.pow((1-T)/(1+T),d/2),$=Math.PI/2-2*Math.atan(m*T)-y,y+=$;return new de(y*t,e.x*t/a)}},Tl={__proto__:null,LonLat:ya,Mercator:ba,SphericalMercator:Zn},Ml=l({},St,{code:"EPSG:3395",projection:ba,transformation:function(){var e=.5/(Math.PI*ba.R);return yi(e,.5,-e,.5)}()}),Ko=l({},St,{code:"EPSG:4326",projection:ya,transformation:yi(1/180,1,-1/180,.5)}),Il=l({},bt,{projection:ya,transformation:yi(1,0,-1,0),scale:function(e){return Math.pow(2,e)},zoom:function(e){return Math.log(e)/Math.LN2},distance:function(e,t){var a=t.lng-e.lng,r=t.lat-e.lat;return Math.sqrt(a*a+r*r)},infinite:!0});bt.Earth=St,bt.EPSG3395=Ml,bt.EPSG3857=Wn,bt.EPSG900913=Nr,bt.EPSG4326=Ko,bt.Simple=Il;var rt=ue.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(e){return e.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(e){return e&&e.removeLayer(this),this},getPane:function(e){return this._map.getPane(e?this.options[e]||e:this.options.pane)},addInteractiveTarget:function(e){return this._map._targets[h(e)]=this,this},removeInteractiveTarget:function(e){return delete this._map._targets[h(e)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(e){var t=e.target;if(t.hasLayer(this)){if(this._map=t,this._zoomAnimated=t._zoomAnimated,this.getEvents){var a=this.getEvents();t.on(a,this),this.once("remove",function(){t.off(a,this)},this)}this.onAdd(t),this.fire("add"),t.fire("layeradd",{layer:this})}}});ce.include({addLayer:function(e){if(!e._layerAdd)throw new Error("The provided object is not a Layer.");var t=h(e);return this._layers[t]?this:(this._layers[t]=e,e._mapToAdd=this,e.beforeAdd&&e.beforeAdd(this),this.whenReady(e._layerAdd,e),this)},removeLayer:function(e){var t=h(e);return this._layers[t]?(this._loaded&&e.onRemove(this),delete this._layers[t],this._loaded&&(this.fire("layerremove",{layer:e}),e.fire("remove")),e._map=e._mapToAdd=null,this):this},hasLayer:function(e){return h(e)in this._layers},eachLayer:function(e,t){for(var a in this._layers)e.call(t,this._layers[a]);return this},_addLayers:function(e){e=e?B(e)?e:[e]:[];for(var t=0,a=e.length;t<a;t++)this.addLayer(e[t])},_addZoomLimit:function(e){(!isNaN(e.options.maxZoom)||!isNaN(e.options.minZoom))&&(this._zoomBoundLayers[h(e)]=e,this._updateZoomLevels())},_removeZoomLimit:function(e){var t=h(e);this._zoomBoundLayers[t]&&(delete this._zoomBoundLayers[t],this._updateZoomLevels())},_updateZoomLevels:function(){var e=1/0,t=-1/0,a=this._getZoomSpan();for(var r in this._zoomBoundLayers){var d=this._zoomBoundLayers[r].options;e=d.minZoom===void 0?e:Math.min(e,d.minZoom),t=d.maxZoom===void 0?t:Math.max(t,d.maxZoom)}this._layersMaxZoom=t===-1/0?void 0:t,this._layersMinZoom=e===1/0?void 0:e,a!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Qt=rt.extend({initialize:function(e,t){x(this,t),this._layers={};var a,r;if(e)for(a=0,r=e.length;a<r;a++)this.addLayer(e[a])},addLayer:function(e){var t=this.getLayerId(e);return this._layers[t]=e,this._map&&this._map.addLayer(e),this},removeLayer:function(e){var t=e in this._layers?e:this.getLayerId(e);return this._map&&this._layers[t]&&this._map.removeLayer(this._layers[t]),delete this._layers[t],this},hasLayer:function(e){var t=typeof e=="number"?e:this.getLayerId(e);return t in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(e){var t=Array.prototype.slice.call(arguments,1),a,r;for(a in this._layers)r=this._layers[a],r[e]&&r[e].apply(r,t);return this},onAdd:function(e){this.eachLayer(e.addLayer,e)},onRemove:function(e){this.eachLayer(e.removeLayer,e)},eachLayer:function(e,t){for(var a in this._layers)e.call(t,this._layers[a]);return this},getLayer:function(e){return this._layers[e]},getLayers:function(){var e=[];return this.eachLayer(e.push,e),e},setZIndex:function(e){return this.invoke("setZIndex",e)},getLayerId:function(e){return h(e)}}),Al=function(e,t){return new Qt(e,t)},wt=Qt.extend({addLayer:function(e){return this.hasLayer(e)?this:(e.addEventParent(this),Qt.prototype.addLayer.call(this,e),this.fire("layeradd",{layer:e}))},removeLayer:function(e){return this.hasLayer(e)?(e in this._layers&&(e=this._layers[e]),e.removeEventParent(this),Qt.prototype.removeLayer.call(this,e),this.fire("layerremove",{layer:e})):this},setStyle:function(e){return this.invoke("setStyle",e)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var e=new pe;for(var t in this._layers){var a=this._layers[t];e.extend(a.getBounds?a.getBounds():a.getLatLng())}return e}}),Pl=function(e,t){return new wt(e,t)},ei=F.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(e){x(this,e)},createIcon:function(e){return this._createIcon("icon",e)},createShadow:function(e){return this._createIcon("shadow",e)},_createIcon:function(e,t){var a=this._getIconUrl(e);if(!a){if(e==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var r=this._createImg(a,t&&t.tagName==="IMG"?t:null);return this._setIconStyles(r,e),(this.options.crossOrigin||this.options.crossOrigin==="")&&(r.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),r},_setIconStyles:function(e,t){var a=this.options,r=a[t+"Size"];typeof r=="number"&&(r=[r,r]);var d=A(r),m=A(t==="shadow"&&a.shadowAnchor||a.iconAnchor||d&&d.divideBy(2,!0));e.className="leaflet-marker-"+t+" "+(a.className||""),m&&(e.style.marginLeft=-m.x+"px",e.style.marginTop=-m.y+"px"),d&&(e.style.width=d.x+"px",e.style.height=d.y+"px")},_createImg:function(e,t){return t=t||document.createElement("img"),t.src=e,t},_getIconUrl:function(e){return Z.retina&&this.options[e+"RetinaUrl"]||this.options[e+"Url"]}});function Bl(e){return new ei(e)}var Ci=ei.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(e){return typeof Ci.imagePath!="string"&&(Ci.imagePath=this._detectIconPath()),(this.options.imagePath||Ci.imagePath)+ei.prototype._getIconUrl.call(this,e)},_stripUrl:function(e){var t=function(a,r,d){var m=r.exec(a);return m&&m[d]};return e=t(e,/^url\((['"])?(.+)\1\)$/,2),e&&t(e,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var e=he("div","leaflet-default-icon-path",document.body),t=xi(e,"background-image")||xi(e,"backgroundImage");if(document.body.removeChild(e),t=this._stripUrl(t),t)return t;var a=document.querySelector('link[href$="leaflet.css"]');return a?a.href.substring(0,a.href.length-11-1):""}}),Yo=ht.extend({initialize:function(e){this._marker=e},addHooks:function(){var e=this._marker._icon;this._draggable||(this._draggable=new Tt(e,e,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),se(e,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&Ce(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(e){var t=this._marker,a=t._map,r=this._marker.options.autoPanSpeed,d=this._marker.options.autoPanPadding,m=jt(t._icon),y=a.getPixelBounds(),k=a.getPixelOrigin(),$=ve(y.min._subtract(k).add(d),y.max._subtract(k).subtract(d));if(!$.contains(m)){var T=A((Math.max($.max.x,m.x)-$.max.x)/(y.max.x-$.max.x)-(Math.min($.min.x,m.x)-$.min.x)/(y.min.x-$.min.x),(Math.max($.max.y,m.y)-$.max.y)/(y.max.y-$.max.y)-(Math.min($.min.y,m.y)-$.min.y)/(y.min.y-$.min.y)).multiplyBy(r);a.panBy(T,{animate:!1}),this._draggable._newPos._add(T),this._draggable._startPos._add(T),Te(t._icon,this._draggable._newPos),this._onDrag(e),this._panRequest=V(this._adjustPan.bind(this,e))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(e){this._marker.options.autoPan&&(le(this._panRequest),this._panRequest=V(this._adjustPan.bind(this,e)))},_onDrag:function(e){var t=this._marker,a=t._shadow,r=jt(t._icon),d=t._map.layerPointToLatLng(r);a&&Te(a,r),t._latlng=d,e.latlng=d,e.oldLatLng=this._oldLatLng,t.fire("move",e).fire("drag",e)},_onDragEnd:function(e){le(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",e)}}),on=rt.extend({options:{icon:new Ci,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(e,t){x(this,t),this._latlng=oe(e)},onAdd:function(e){this._zoomAnimated=this._zoomAnimated&&e.options.markerZoomAnimation,this._zoomAnimated&&e.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(e){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&e.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(e){var t=this._latlng;return this._latlng=oe(e),this.update(),this.fire("move",{oldLatLng:t,latlng:this._latlng})},setZIndexOffset:function(e){return this.options.zIndexOffset=e,this.update()},getIcon:function(){return this.options.icon},setIcon:function(e){return this.options.icon=e,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var e=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(e)}return this},_initIcon:function(){var e=this.options,t="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),a=e.icon.createIcon(this._icon),r=!1;a!==this._icon&&(this._icon&&this._removeIcon(),r=!0,e.title&&(a.title=e.title),a.tagName==="IMG"&&(a.alt=e.alt||"")),se(a,t),e.keyboard&&(a.tabIndex="0",a.setAttribute("role","button")),this._icon=a,e.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&te(a,"focus",this._panOnFocus,this);var d=e.icon.createShadow(this._shadow),m=!1;d!==this._shadow&&(this._removeShadow(),m=!0),d&&(se(d,t),d.alt=""),this._shadow=d,e.opacity<1&&this._updateOpacity(),r&&this.getPane().appendChild(this._icon),this._initInteraction(),d&&m&&this.getPane(e.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&xe(this._icon,"focus",this._panOnFocus,this),ke(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&ke(this._shadow),this._shadow=null},_setPos:function(e){this._icon&&Te(this._icon,e),this._shadow&&Te(this._shadow,e),this._zIndex=e.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(e){this._icon&&(this._icon.style.zIndex=this._zIndex+e)},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center).round();this._setPos(t)},_initInteraction:function(){if(this.options.interactive&&(se(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Yo)){var e=this.options.draggable;this.dragging&&(e=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Yo(this),e&&this.dragging.enable()}},setOpacity:function(e){return this.options.opacity=e,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var e=this.options.opacity;this._icon&&Qe(this._icon,e),this._shadow&&Qe(this._shadow,e)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var e=this._map;if(e){var t=this.options.icon.options,a=t.iconSize?A(t.iconSize):A(0,0),r=t.iconAnchor?A(t.iconAnchor):A(0,0);e.panInside(this._latlng,{paddingTopLeft:r,paddingBottomRight:a.subtract(r)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function Rl(e,t){return new on(e,t)}var Mt=rt.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(e){this._renderer=e.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(e){return x(this,e),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&e&&Object.prototype.hasOwnProperty.call(e,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),sn=Mt.extend({options:{fill:!0,radius:10},initialize:function(e,t){x(this,t),this._latlng=oe(e),this._radius=this.options.radius},setLatLng:function(e){var t=this._latlng;return this._latlng=oe(e),this.redraw(),this.fire("move",{oldLatLng:t,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(e){return this.options.radius=this._radius=e,this.redraw()},getRadius:function(){return this._radius},setStyle:function(e){var t=e&&e.radius||this._radius;return Mt.prototype.setStyle.call(this,e),this.setRadius(t),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var e=this._radius,t=this._radiusY||e,a=this._clickTolerance(),r=[e+a,t+a];this._pxBounds=new Q(this._point.subtract(r),this._point.add(r))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(e){return e.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function Ol(e,t){return new sn(e,t)}var wa=sn.extend({initialize:function(e,t,a){if(typeof t=="number"&&(t=l({},a,{radius:t})),x(this,t),this._latlng=oe(e),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(e){return this._mRadius=e,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var e=[this._radius,this._radiusY||this._radius];return new pe(this._map.layerPointToLatLng(this._point.subtract(e)),this._map.layerPointToLatLng(this._point.add(e)))},setStyle:Mt.prototype.setStyle,_project:function(){var e=this._latlng.lng,t=this._latlng.lat,a=this._map,r=a.options.crs;if(r.distance===St.distance){var d=Math.PI/180,m=this._mRadius/St.R/d,y=a.project([t+m,e]),k=a.project([t-m,e]),$=y.add(k).divideBy(2),T=a.unproject($).lat,j=Math.acos((Math.cos(m*d)-Math.sin(t*d)*Math.sin(T*d))/(Math.cos(t*d)*Math.cos(T*d)))/d;(isNaN(j)||j===0)&&(j=m/Math.cos(Math.PI/180*t)),this._point=$.subtract(a.getPixelOrigin()),this._radius=isNaN(j)?0:$.x-a.project([T,e-j]).x,this._radiusY=$.y-y.y}else{var K=r.unproject(r.project(this._latlng).subtract([this._mRadius,0]));this._point=a.latLngToLayerPoint(this._latlng),this._radius=this._point.x-a.latLngToLayerPoint(K).x}this._updateBounds()}});function Nl(e,t,a){return new wa(e,t,a)}var xt=Mt.extend({options:{smoothFactor:1,noClip:!1},initialize:function(e,t){x(this,t),this._setLatLngs(e)},getLatLngs:function(){return this._latlngs},setLatLngs:function(e){return this._setLatLngs(e),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(e){for(var t=1/0,a=null,r=Ei,d,m,y=0,k=this._parts.length;y<k;y++)for(var $=this._parts[y],T=1,j=$.length;T<j;T++){d=$[T-1],m=$[T];var K=r(e,d,m,!0);K<t&&(t=K,a=r(e,d,m))}return a&&(a.distance=Math.sqrt(t)),a},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Go(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(e,t){return t=t||this._defaultShape(),e=oe(e),t.push(e),this._bounds.extend(e),this.redraw()},_setLatLngs:function(e){this._bounds=new pe,this._latlngs=this._convertLatLngs(e)},_defaultShape:function(){return et(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(e){for(var t=[],a=et(e),r=0,d=e.length;r<d;r++)a?(t[r]=oe(e[r]),this._bounds.extend(t[r])):t[r]=this._convertLatLngs(e[r]);return t},_project:function(){var e=new Q;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,e),this._bounds.isValid()&&e.isValid()&&(this._rawPxBounds=e,this._updateBounds())},_updateBounds:function(){var e=this._clickTolerance(),t=new q(e,e);this._rawPxBounds&&(this._pxBounds=new Q([this._rawPxBounds.min.subtract(t),this._rawPxBounds.max.add(t)]))},_projectLatlngs:function(e,t,a){var r=e[0]instanceof de,d=e.length,m,y;if(r){for(y=[],m=0;m<d;m++)y[m]=this._map.latLngToLayerPoint(e[m]),a.extend(y[m]);t.push(y)}else for(m=0;m<d;m++)this._projectLatlngs(e[m],t,a)},_clipPoints:function(){var e=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(e))){if(this.options.noClip){this._parts=this._rings;return}var t=this._parts,a,r,d,m,y,k,$;for(a=0,d=0,m=this._rings.length;a<m;a++)for($=this._rings[a],r=0,y=$.length;r<y-1;r++)k=Vo($[r],$[r+1],e,r,!0),k&&(t[d]=t[d]||[],t[d].push(k[0]),(k[1]!==$[r+1]||r===y-2)&&(t[d].push(k[1]),d++))}},_simplifyPoints:function(){for(var e=this._parts,t=this.options.smoothFactor,a=0,r=e.length;a<r;a++)e[a]=qo(e[a],t)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(e,t){var a,r,d,m,y,k,$=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(e))return!1;for(a=0,m=this._parts.length;a<m;a++)for(k=this._parts[a],r=0,y=k.length,d=y-1;r<y;d=r++)if(!(!t&&r===0)&&Uo(e,k[d],k[r])<=$)return!0;return!1}});function jl(e,t){return new xt(e,t)}xt._flat=Wo;var ti=xt.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Fo(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(e){var t=xt.prototype._convertLatLngs.call(this,e),a=t.length;return a>=2&&t[0]instanceof de&&t[0].equals(t[a-1])&&t.pop(),t},_setLatLngs:function(e){xt.prototype._setLatLngs.call(this,e),et(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return et(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var e=this._renderer._bounds,t=this.options.weight,a=new q(t,t);if(e=new Q(e.min.subtract(a),e.max.add(a)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(e))){if(this.options.noClip){this._parts=this._rings;return}for(var r=0,d=this._rings.length,m;r<d;r++)m=Do(this._rings[r],e,!0),m.length&&this._parts.push(m)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(e){var t=!1,a,r,d,m,y,k,$,T;if(!this._pxBounds||!this._pxBounds.contains(e))return!1;for(m=0,$=this._parts.length;m<$;m++)for(a=this._parts[m],y=0,T=a.length,k=T-1;y<T;k=y++)r=a[y],d=a[k],r.y>e.y!=d.y>e.y&&e.x<(d.x-r.x)*(e.y-r.y)/(d.y-r.y)+r.x&&(t=!t);return t||xt.prototype._containsPoint.call(this,e,!0)}});function Hl(e,t){return new ti(e,t)}var _t=wt.extend({initialize:function(e,t){x(this,t),this._layers={},e&&this.addData(e)},addData:function(e){var t=B(e)?e:e.features,a,r,d;if(t){for(a=0,r=t.length;a<r;a++)d=t[a],(d.geometries||d.geometry||d.features||d.coordinates)&&this.addData(d);return this}var m=this.options;if(m.filter&&!m.filter(e))return this;var y=rn(e,m);return y?(y.feature=cn(e),y.defaultOptions=y.options,this.resetStyle(y),m.onEachFeature&&m.onEachFeature(e,y),this.addLayer(y)):this},resetStyle:function(e){return e===void 0?this.eachLayer(this.resetStyle,this):(e.options=l({},e.defaultOptions),this._setLayerStyle(e,this.options.style),this)},setStyle:function(e){return this.eachLayer(function(t){this._setLayerStyle(t,e)},this)},_setLayerStyle:function(e,t){e.setStyle&&(typeof t=="function"&&(t=t(e.feature)),e.setStyle(t))}});function rn(e,t){var a=e.type==="Feature"?e.geometry:e,r=a?a.coordinates:null,d=[],m=t&&t.pointToLayer,y=t&&t.coordsToLatLng||xa,k,$,T,j;if(!r&&!a)return null;switch(a.type){case"Point":return k=y(r),Jo(m,e,k,t);case"MultiPoint":for(T=0,j=r.length;T<j;T++)k=y(r[T]),d.push(Jo(m,e,k,t));return new wt(d);case"LineString":case"MultiLineString":return $=ln(r,a.type==="LineString"?0:1,y),new xt($,t);case"Polygon":case"MultiPolygon":return $=ln(r,a.type==="Polygon"?1:2,y),new ti($,t);case"GeometryCollection":for(T=0,j=a.geometries.length;T<j;T++){var K=rn({geometry:a.geometries[T],type:"Feature",properties:e.properties},t);K&&d.push(K)}return new wt(d);case"FeatureCollection":for(T=0,j=a.features.length;T<j;T++){var re=rn(a.features[T],t);re&&d.push(re)}return new wt(d);default:throw new Error("Invalid GeoJSON object.")}}function Jo(e,t,a,r){return e?e(t,a):new on(a,r&&r.markersInheritOptions&&r)}function xa(e){return new de(e[1],e[0],e[2])}function ln(e,t,a){for(var r=[],d=0,m=e.length,y;d<m;d++)y=t?ln(e[d],t-1,a):(a||xa)(e[d]),r.push(y);return r}function _a(e,t){return e=oe(e),e.alt!==void 0?[b(e.lng,t),b(e.lat,t),b(e.alt,t)]:[b(e.lng,t),b(e.lat,t)]}function dn(e,t,a,r){for(var d=[],m=0,y=e.length;m<y;m++)d.push(t?dn(e[m],et(e[m])?0:t-1,a,r):_a(e[m],r));return!t&&a&&d.length>0&&d.push(d[0].slice()),d}function ii(e,t){return e.feature?l({},e.feature,{geometry:t}):cn(t)}function cn(e){return e.type==="Feature"||e.type==="FeatureCollection"?e:{type:"Feature",properties:{},geometry:e}}var ka={toGeoJSON:function(e){return ii(this,{type:"Point",coordinates:_a(this.getLatLng(),e)})}};on.include(ka),wa.include(ka),sn.include(ka),xt.include({toGeoJSON:function(e){var t=!et(this._latlngs),a=dn(this._latlngs,t?1:0,!1,e);return ii(this,{type:(t?"Multi":"")+"LineString",coordinates:a})}}),ti.include({toGeoJSON:function(e){var t=!et(this._latlngs),a=t&&!et(this._latlngs[0]),r=dn(this._latlngs,a?2:t?1:0,!0,e);return t||(r=[r]),ii(this,{type:(a?"Multi":"")+"Polygon",coordinates:r})}}),Qt.include({toMultiPoint:function(e){var t=[];return this.eachLayer(function(a){t.push(a.toGeoJSON(e).geometry.coordinates)}),ii(this,{type:"MultiPoint",coordinates:t})},toGeoJSON:function(e){var t=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(t==="MultiPoint")return this.toMultiPoint(e);var a=t==="GeometryCollection",r=[];return this.eachLayer(function(d){if(d.toGeoJSON){var m=d.toGeoJSON(e);if(a)r.push(m.geometry);else{var y=cn(m);y.type==="FeatureCollection"?r.push.apply(r,y.features):r.push(y)}}}),a?ii(this,{geometries:r,type:"GeometryCollection"}):{type:"FeatureCollection",features:r}}});function Xo(e,t){return new _t(e,t)}var Dl=Xo,un=rt.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(e,t,a){this._url=e,this._bounds=ye(t),x(this,a)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(se(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){ke(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(e){return this.options.opacity=e,this._image&&this._updateOpacity(),this},setStyle:function(e){return e.opacity&&this.setOpacity(e.opacity),this},bringToFront:function(){return this._map&&Jt(this._image),this},bringToBack:function(){return this._map&&Xt(this._image),this},setUrl:function(e){return this._url=e,this._image&&(this._image.src=e),this},setBounds:function(e){return this._bounds=ye(e),this._map&&this._reset(),this},getEvents:function(){var e={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},setZIndex:function(e){return this.options.zIndex=e,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var e=this._url.tagName==="IMG",t=this._image=e?this._url:he("img");if(se(t,"leaflet-image-layer"),this._zoomAnimated&&se(t,"leaflet-zoom-animated"),this.options.className&&se(t,this.options.className),t.onselectstart=v,t.onmousemove=v,t.onload=u(this.fire,this,"load"),t.onerror=u(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(t.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),e){this._url=t.src;return}t.src=this._url,t.alt=this.options.alt},_animateZoom:function(e){var t=this._map.getZoomScale(e.zoom),a=this._map._latLngBoundsToNewLayerBounds(this._bounds,e.zoom,e.center).min;Nt(this._image,a,t)},_reset:function(){var e=this._image,t=new Q(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),a=t.getSize();Te(e,t.min),e.style.width=a.x+"px",e.style.height=a.y+"px"},_updateOpacity:function(){Qe(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var e=this.options.errorOverlayUrl;e&&this._url!==e&&(this._url=e,this._image.src=e)},getCenter:function(){return this._bounds.getCenter()}}),Fl=function(e,t,a){return new un(e,t,a)},Qo=un.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var e=this._url.tagName==="VIDEO",t=this._image=e?this._url:he("video");if(se(t,"leaflet-image-layer"),this._zoomAnimated&&se(t,"leaflet-zoom-animated"),this.options.className&&se(t,this.options.className),t.onselectstart=v,t.onmousemove=v,t.onloadeddata=u(this.fire,this,"load"),e){for(var a=t.getElementsByTagName("source"),r=[],d=0;d<a.length;d++)r.push(a[d].src);this._url=a.length>0?r:[t.src];return}B(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(t.style,"objectFit")&&(t.style.objectFit="fill"),t.autoplay=!!this.options.autoplay,t.loop=!!this.options.loop,t.muted=!!this.options.muted,t.playsInline=!!this.options.playsInline;for(var m=0;m<this._url.length;m++){var y=he("source");y.src=this._url[m],t.appendChild(y)}}});function ql(e,t,a){return new Qo(e,t,a)}var es=un.extend({_initImage:function(){var e=this._image=this._url;se(e,"leaflet-image-layer"),this._zoomAnimated&&se(e,"leaflet-zoom-animated"),this.options.className&&se(e,this.options.className),e.onselectstart=v,e.onmousemove=v}});function Ul(e,t,a){return new es(e,t,a)}var mt=rt.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(e,t){e&&(e instanceof de||B(e))?(this._latlng=oe(e),x(this,t)):(x(this,e),this._source=t),this.options.content&&(this._content=this.options.content)},openOn:function(e){return e=arguments.length?e:this._source._map,e.hasLayer(this)||e.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(e){return this._map?this.close():(arguments.length?this._source=e:e=this._source,this._prepareOpen(),this.openOn(e._map)),this},onAdd:function(e){this._zoomAnimated=e._zoomAnimated,this._container||this._initLayout(),e._fadeAnimated&&Qe(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),e._fadeAnimated&&Qe(this._container,1),this.bringToFront(),this.options.interactive&&(se(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(e){e._fadeAnimated?(Qe(this._container,0),this._removeTimeout=setTimeout(u(ke,void 0,this._container),200)):ke(this._container),this.options.interactive&&(Ce(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(e){return this._latlng=oe(e),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(e){return this._content=e,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var e={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Jt(this._container),this},bringToBack:function(){return this._map&&Xt(this._container),this},_prepareOpen:function(e){var t=this._source;if(!t._map)return!1;if(t instanceof wt){t=null;var a=this._source._layers;for(var r in a)if(a[r]._map){t=a[r];break}if(!t)return!1;this._source=t}if(!e)if(t.getCenter)e=t.getCenter();else if(t.getLatLng)e=t.getLatLng();else if(t.getBounds)e=t.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(e),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var e=this._contentNode,t=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof t=="string")e.innerHTML=t;else{for(;e.hasChildNodes();)e.removeChild(e.firstChild);e.appendChild(t)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var e=this._map.latLngToLayerPoint(this._latlng),t=A(this.options.offset),a=this._getAnchor();this._zoomAnimated?Te(this._container,e.add(a)):t=t.add(e).add(a);var r=this._containerBottom=-t.y,d=this._containerLeft=-Math.round(this._containerWidth/2)+t.x;this._container.style.bottom=r+"px",this._container.style.left=d+"px"}},_getAnchor:function(){return[0,0]}});ce.include({_initOverlay:function(e,t,a,r){var d=t;return d instanceof e||(d=new e(r).setContent(t)),a&&d.setLatLng(a),d}}),rt.include({_initOverlay:function(e,t,a,r){var d=a;return d instanceof e?(x(d,r),d._source=this):(d=t&&!r?t:new e(r,this),d.setContent(a)),d}});var pn=mt.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(e){return e=arguments.length?e:this._source._map,!e.hasLayer(this)&&e._popup&&e._popup.options.autoClose&&e.removeLayer(e._popup),e._popup=this,mt.prototype.openOn.call(this,e)},onAdd:function(e){mt.prototype.onAdd.call(this,e),e.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Mt||this._source.on("preclick",Ht))},onRemove:function(e){mt.prototype.onRemove.call(this,e),e.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Mt||this._source.off("preclick",Ht))},getEvents:function(){var e=mt.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(e.preclick=this.close),this.options.keepInView&&(e.moveend=this._adjustPan),e},_initLayout:function(){var e="leaflet-popup",t=this._container=he("div",e+" "+(this.options.className||"")+" leaflet-zoom-animated"),a=this._wrapper=he("div",e+"-content-wrapper",t);if(this._contentNode=he("div",e+"-content",a),Li(t),pa(this._contentNode),te(t,"contextmenu",Ht),this._tipContainer=he("div",e+"-tip-container",t),this._tip=he("div",e+"-tip",this._tipContainer),this.options.closeButton){var r=this._closeButton=he("a",e+"-close-button",t);r.setAttribute("role","button"),r.setAttribute("aria-label","Close popup"),r.href="#close",r.innerHTML='<span aria-hidden="true">&#215;</span>',te(r,"click",function(d){Be(d),this.close()},this)}},_updateLayout:function(){var e=this._contentNode,t=e.style;t.width="",t.whiteSpace="nowrap";var a=e.offsetWidth;a=Math.min(a,this.options.maxWidth),a=Math.max(a,this.options.minWidth),t.width=a+1+"px",t.whiteSpace="",t.height="";var r=e.offsetHeight,d=this.options.maxHeight,m="leaflet-popup-scrolled";d&&r>d?(t.height=d+"px",se(e,m)):Ce(e,m),this._containerWidth=this._container.offsetWidth},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center),a=this._getAnchor();Te(this._container,t.add(a))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var e=this._map,t=parseInt(xi(this._container,"marginBottom"),10)||0,a=this._container.offsetHeight+t,r=this._containerWidth,d=new q(this._containerLeft,-a-this._containerBottom);d._add(jt(this._container));var m=e.layerPointToContainerPoint(d),y=A(this.options.autoPanPadding),k=A(this.options.autoPanPaddingTopLeft||y),$=A(this.options.autoPanPaddingBottomRight||y),T=e.getSize(),j=0,K=0;m.x+r+$.x>T.x&&(j=m.x+r-T.x+$.x),m.x-j-k.x<0&&(j=m.x-k.x),m.y+a+$.y>T.y&&(K=m.y+a-T.y+$.y),m.y-K-k.y<0&&(K=m.y-k.y),(j||K)&&(this.options.keepInView&&(this._autopanning=!0),e.fire("autopanstart").panBy([j,K]))}},_getAnchor:function(){return A(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Zl=function(e,t){return new pn(e,t)};ce.mergeOptions({closePopupOnClick:!0}),ce.include({openPopup:function(e,t,a){return this._initOverlay(pn,e,t,a).openOn(this),this},closePopup:function(e){return e=arguments.length?e:this._popup,e&&e.close(),this}}),rt.include({bindPopup:function(e,t){return this._popup=this._initOverlay(pn,this._popup,e,t),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(e){return this._popup&&(this instanceof wt||(this._popup._source=this),this._popup._prepareOpen(e||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(e){return this._popup&&this._popup.setContent(e),this},getPopup:function(){return this._popup},_openPopup:function(e){if(!(!this._popup||!this._map)){Dt(e);var t=e.layer||e.target;if(this._popup._source===t&&!(t instanceof Mt)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(e.latlng);return}this._popup._source=t,this.openPopup(e.latlng)}},_movePopup:function(e){this._popup.setLatLng(e.latlng)},_onKeyPress:function(e){e.originalEvent.keyCode===13&&this._openPopup(e)}});var hn=mt.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(e){mt.prototype.onAdd.call(this,e),this.setOpacity(this.options.opacity),e.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(e){mt.prototype.onRemove.call(this,e),e.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var e=mt.prototype.getEvents.call(this);return this.options.permanent||(e.preclick=this.close),e},_initLayout:function(){var e="leaflet-tooltip",t=e+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=he("div",t),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+h(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(e){var t,a,r=this._map,d=this._container,m=r.latLngToContainerPoint(r.getCenter()),y=r.layerPointToContainerPoint(e),k=this.options.direction,$=d.offsetWidth,T=d.offsetHeight,j=A(this.options.offset),K=this._getAnchor();k==="top"?(t=$/2,a=T):k==="bottom"?(t=$/2,a=0):k==="center"?(t=$/2,a=T/2):k==="right"?(t=0,a=T/2):k==="left"?(t=$,a=T/2):y.x<m.x?(k="right",t=0,a=T/2):(k="left",t=$+(j.x+K.x)*2,a=T/2),e=e.subtract(A(t,a,!0)).add(j).add(K),Ce(d,"leaflet-tooltip-right"),Ce(d,"leaflet-tooltip-left"),Ce(d,"leaflet-tooltip-top"),Ce(d,"leaflet-tooltip-bottom"),se(d,"leaflet-tooltip-"+k),Te(d,e)},_updatePosition:function(){var e=this._map.latLngToLayerPoint(this._latlng);this._setPosition(e)},setOpacity:function(e){this.options.opacity=e,this._container&&Qe(this._container,e)},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center);this._setPosition(t)},_getAnchor:function(){return A(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),Vl=function(e,t){return new hn(e,t)};ce.include({openTooltip:function(e,t,a){return this._initOverlay(hn,e,t,a).openOn(this),this},closeTooltip:function(e){return e.close(),this}}),rt.include({bindTooltip:function(e,t){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(hn,this._tooltip,e,t),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(e){if(!(!e&&this._tooltipHandlersAdded)){var t=e?"off":"on",a={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?a.add=this._openTooltip:(a.mouseover=this._openTooltip,a.mouseout=this.closeTooltip,a.click=this._openTooltip,this._map?this._addFocusListeners():a.add=this._addFocusListeners),this._tooltip.options.sticky&&(a.mousemove=this._moveTooltip),this[t](a),this._tooltipHandlersAdded=!e}},openTooltip:function(e){return this._tooltip&&(this instanceof wt||(this._tooltip._source=this),this._tooltip._prepareOpen(e)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(e){return this._tooltip&&this._tooltip.setContent(e),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(e){var t=typeof e.getElement=="function"&&e.getElement();t&&(te(t,"focus",function(){this._tooltip._source=e,this.openTooltip()},this),te(t,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(e){var t=typeof e.getElement=="function"&&e.getElement();t&&t.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(e){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var t=this;this._map.once("moveend",function(){t._openOnceFlag=!1,t._openTooltip(e)});return}this._tooltip._source=e.layer||e.target,this.openTooltip(this._tooltip.options.sticky?e.latlng:void 0)}},_moveTooltip:function(e){var t=e.latlng,a,r;this._tooltip.options.sticky&&e.originalEvent&&(a=this._map.mouseEventToContainerPoint(e.originalEvent),r=this._map.containerPointToLayerPoint(a),t=this._map.layerPointToLatLng(r)),this._tooltip.setLatLng(t)}});var ts=ei.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(e){var t=e&&e.tagName==="DIV"?e:document.createElement("div"),a=this.options;if(a.html instanceof Element?(Xi(t),t.appendChild(a.html)):t.innerHTML=a.html!==!1?a.html:"",a.bgPos){var r=A(a.bgPos);t.style.backgroundPosition=-r.x+"px "+-r.y+"px"}return this._setIconStyles(t,"icon"),t},createShadow:function(){return null}});function Wl(e){return new ts(e)}ei.Default=Ci;var Si=rt.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Z.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(e){x(this,e)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(e){e._addZoomLimit(this)},onRemove:function(e){this._removeAllTiles(),ke(this._container),e._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Jt(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Xt(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(e){return this.options.opacity=e,this._updateOpacity(),this},setZIndex:function(e){return this.options.zIndex=e,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var e=this._clampZoom(this._map.getZoom());e!==this._tileZoom&&(this._tileZoom=e,this._updateLevels()),this._update()}return this},getEvents:function(){var e={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=f(this._onMoveEnd,this.options.updateInterval,this)),e.move=this._onMove),this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},createTile:function(){return document.createElement("div")},getTileSize:function(){var e=this.options.tileSize;return e instanceof q?e:new q(e,e)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(e){for(var t=this.getPane().children,a=-e(-1/0,1/0),r=0,d=t.length,m;r<d;r++)m=t[r].style.zIndex,t[r]!==this._container&&m&&(a=e(a,+m));isFinite(a)&&(this.options.zIndex=a+e(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Z.ielt9){Qe(this._container,this.options.opacity);var e=+new Date,t=!1,a=!1;for(var r in this._tiles){var d=this._tiles[r];if(!(!d.current||!d.loaded)){var m=Math.min(1,(e-d.loaded)/200);Qe(d.el,m),m<1?t=!0:(d.active?a=!0:this._onOpaqueTile(d),d.active=!0)}}a&&!this._noPrune&&this._pruneTiles(),t&&(le(this._fadeFrame),this._fadeFrame=V(this._updateOpacity,this))}},_onOpaqueTile:v,_initContainer:function(){this._container||(this._container=he("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var e=this._tileZoom,t=this.options.maxZoom;if(e!==void 0){for(var a in this._levels)a=Number(a),this._levels[a].el.children.length||a===e?(this._levels[a].el.style.zIndex=t-Math.abs(e-a),this._onUpdateLevel(a)):(ke(this._levels[a].el),this._removeTilesAtZoom(a),this._onRemoveLevel(a),delete this._levels[a]);var r=this._levels[e],d=this._map;return r||(r=this._levels[e]={},r.el=he("div","leaflet-tile-container leaflet-zoom-animated",this._container),r.el.style.zIndex=t,r.origin=d.project(d.unproject(d.getPixelOrigin()),e).round(),r.zoom=e,this._setZoomTransform(r,d.getCenter(),d.getZoom()),v(r.el.offsetWidth),this._onCreateLevel(r)),this._level=r,r}},_onUpdateLevel:v,_onRemoveLevel:v,_onCreateLevel:v,_pruneTiles:function(){if(this._map){var e,t,a=this._map.getZoom();if(a>this.options.maxZoom||a<this.options.minZoom){this._removeAllTiles();return}for(e in this._tiles)t=this._tiles[e],t.retain=t.current;for(e in this._tiles)if(t=this._tiles[e],t.current&&!t.active){var r=t.coords;this._retainParent(r.x,r.y,r.z,r.z-5)||this._retainChildren(r.x,r.y,r.z,r.z+2)}for(e in this._tiles)this._tiles[e].retain||this._removeTile(e)}},_removeTilesAtZoom:function(e){for(var t in this._tiles)this._tiles[t].coords.z===e&&this._removeTile(t)},_removeAllTiles:function(){for(var e in this._tiles)this._removeTile(e)},_invalidateAll:function(){for(var e in this._levels)ke(this._levels[e].el),this._onRemoveLevel(Number(e)),delete this._levels[e];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(e,t,a,r){var d=Math.floor(e/2),m=Math.floor(t/2),y=a-1,k=new q(+d,+m);k.z=+y;var $=this._tileCoordsToKey(k),T=this._tiles[$];return T&&T.active?(T.retain=!0,!0):(T&&T.loaded&&(T.retain=!0),y>r?this._retainParent(d,m,y,r):!1)},_retainChildren:function(e,t,a,r){for(var d=2*e;d<2*e+2;d++)for(var m=2*t;m<2*t+2;m++){var y=new q(d,m);y.z=a+1;var k=this._tileCoordsToKey(y),$=this._tiles[k];if($&&$.active){$.retain=!0;continue}else $&&$.loaded&&($.retain=!0);a+1<r&&this._retainChildren(d,m,a+1,r)}},_resetView:function(e){var t=e&&(e.pinch||e.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),t,t)},_animateZoom:function(e){this._setView(e.center,e.zoom,!0,e.noUpdate)},_clampZoom:function(e){var t=this.options;return t.minNativeZoom!==void 0&&e<t.minNativeZoom?t.minNativeZoom:t.maxNativeZoom!==void 0&&t.maxNativeZoom<e?t.maxNativeZoom:e},_setView:function(e,t,a,r){var d=Math.round(t);this.options.maxZoom!==void 0&&d>this.options.maxZoom||this.options.minZoom!==void 0&&d<this.options.minZoom?d=void 0:d=this._clampZoom(d);var m=this.options.updateWhenZooming&&d!==this._tileZoom;(!r||m)&&(this._tileZoom=d,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),d!==void 0&&this._update(e),a||this._pruneTiles(),this._noPrune=!!a),this._setZoomTransforms(e,t)},_setZoomTransforms:function(e,t){for(var a in this._levels)this._setZoomTransform(this._levels[a],e,t)},_setZoomTransform:function(e,t,a){var r=this._map.getZoomScale(a,e.zoom),d=e.origin.multiplyBy(r).subtract(this._map._getNewPixelOrigin(t,a)).round();Z.any3d?Nt(e.el,d,r):Te(e.el,d)},_resetGrid:function(){var e=this._map,t=e.options.crs,a=this._tileSize=this.getTileSize(),r=this._tileZoom,d=this._map.getPixelWorldBounds(this._tileZoom);d&&(this._globalTileRange=this._pxBoundsToTileRange(d)),this._wrapX=t.wrapLng&&!this.options.noWrap&&[Math.floor(e.project([0,t.wrapLng[0]],r).x/a.x),Math.ceil(e.project([0,t.wrapLng[1]],r).x/a.y)],this._wrapY=t.wrapLat&&!this.options.noWrap&&[Math.floor(e.project([t.wrapLat[0],0],r).y/a.x),Math.ceil(e.project([t.wrapLat[1],0],r).y/a.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(e){var t=this._map,a=t._animatingZoom?Math.max(t._animateToZoom,t.getZoom()):t.getZoom(),r=t.getZoomScale(a,this._tileZoom),d=t.project(e,this._tileZoom).floor(),m=t.getSize().divideBy(r*2);return new Q(d.subtract(m),d.add(m))},_update:function(e){var t=this._map;if(t){var a=this._clampZoom(t.getZoom());if(e===void 0&&(e=t.getCenter()),this._tileZoom!==void 0){var r=this._getTiledPixelBounds(e),d=this._pxBoundsToTileRange(r),m=d.getCenter(),y=[],k=this.options.keepBuffer,$=new Q(d.getBottomLeft().subtract([k,-k]),d.getTopRight().add([k,-k]));if(!(isFinite(d.min.x)&&isFinite(d.min.y)&&isFinite(d.max.x)&&isFinite(d.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var T in this._tiles){var j=this._tiles[T].coords;(j.z!==this._tileZoom||!$.contains(new q(j.x,j.y)))&&(this._tiles[T].current=!1)}if(Math.abs(a-this._tileZoom)>1){this._setView(e,a);return}for(var K=d.min.y;K<=d.max.y;K++)for(var re=d.min.x;re<=d.max.x;re++){var Ne=new q(re,K);if(Ne.z=this._tileZoom,!!this._isValidTile(Ne)){var Pe=this._tiles[this._tileCoordsToKey(Ne)];Pe?Pe.current=!0:y.push(Ne)}}if(y.sort(function(De,ai){return De.distanceTo(m)-ai.distanceTo(m)}),y.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var tt=document.createDocumentFragment();for(re=0;re<y.length;re++)this._addTile(y[re],tt);this._level.el.appendChild(tt)}}}},_isValidTile:function(e){var t=this._map.options.crs;if(!t.infinite){var a=this._globalTileRange;if(!t.wrapLng&&(e.x<a.min.x||e.x>a.max.x)||!t.wrapLat&&(e.y<a.min.y||e.y>a.max.y))return!1}if(!this.options.bounds)return!0;var r=this._tileCoordsToBounds(e);return ye(this.options.bounds).overlaps(r)},_keyToBounds:function(e){return this._tileCoordsToBounds(this._keyToTileCoords(e))},_tileCoordsToNwSe:function(e){var t=this._map,a=this.getTileSize(),r=e.scaleBy(a),d=r.add(a),m=t.unproject(r,e.z),y=t.unproject(d,e.z);return[m,y]},_tileCoordsToBounds:function(e){var t=this._tileCoordsToNwSe(e),a=new pe(t[0],t[1]);return this.options.noWrap||(a=this._map.wrapLatLngBounds(a)),a},_tileCoordsToKey:function(e){return e.x+":"+e.y+":"+e.z},_keyToTileCoords:function(e){var t=e.split(":"),a=new q(+t[0],+t[1]);return a.z=+t[2],a},_removeTile:function(e){var t=this._tiles[e];t&&(ke(t.el),delete this._tiles[e],this.fire("tileunload",{tile:t.el,coords:this._keyToTileCoords(e)}))},_initTile:function(e){se(e,"leaflet-tile");var t=this.getTileSize();e.style.width=t.x+"px",e.style.height=t.y+"px",e.onselectstart=v,e.onmousemove=v,Z.ielt9&&this.options.opacity<1&&Qe(e,this.options.opacity)},_addTile:function(e,t){var a=this._getTilePos(e),r=this._tileCoordsToKey(e),d=this.createTile(this._wrapCoords(e),u(this._tileReady,this,e));this._initTile(d),this.createTile.length<2&&V(u(this._tileReady,this,e,null,d)),Te(d,a),this._tiles[r]={el:d,coords:e,current:!0},t.appendChild(d),this.fire("tileloadstart",{tile:d,coords:e})},_tileReady:function(e,t,a){t&&this.fire("tileerror",{error:t,tile:a,coords:e});var r=this._tileCoordsToKey(e);a=this._tiles[r],a&&(a.loaded=+new Date,this._map._fadeAnimated?(Qe(a.el,0),le(this._fadeFrame),this._fadeFrame=V(this._updateOpacity,this)):(a.active=!0,this._pruneTiles()),t||(se(a.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:a.el,coords:e})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Z.ielt9||!this._map._fadeAnimated?V(this._pruneTiles,this):setTimeout(u(this._pruneTiles,this),250)))},_getTilePos:function(e){return e.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(e){var t=new q(this._wrapX?g(e.x,this._wrapX):e.x,this._wrapY?g(e.y,this._wrapY):e.y);return t.z=e.z,t},_pxBoundsToTileRange:function(e){var t=this.getTileSize();return new Q(e.min.unscaleBy(t).floor(),e.max.unscaleBy(t).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var e in this._tiles)if(!this._tiles[e].loaded)return!1;return!0}});function Gl(e){return new Si(e)}var ni=Si.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(e,t){this._url=e,t=x(this,t),t.detectRetina&&Z.retina&&t.maxZoom>0?(t.tileSize=Math.floor(t.tileSize/2),t.zoomReverse?(t.zoomOffset--,t.minZoom=Math.min(t.maxZoom,t.minZoom+1)):(t.zoomOffset++,t.maxZoom=Math.max(t.minZoom,t.maxZoom-1)),t.minZoom=Math.max(0,t.minZoom)):t.zoomReverse?t.minZoom=Math.min(t.maxZoom,t.minZoom):t.maxZoom=Math.max(t.minZoom,t.maxZoom),typeof t.subdomains=="string"&&(t.subdomains=t.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(e,t){return this._url===e&&t===void 0&&(t=!0),this._url=e,t||this.redraw(),this},createTile:function(e,t){var a=document.createElement("img");return te(a,"load",u(this._tileOnLoad,this,t,a)),te(a,"error",u(this._tileOnError,this,t,a)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(a.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(a.referrerPolicy=this.options.referrerPolicy),a.alt="",a.src=this.getTileUrl(e),a},getTileUrl:function(e){var t={r:Z.retina?"@2x":"",s:this._getSubdomain(e),x:e.x,y:e.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var a=this._globalTileRange.max.y-e.y;this.options.tms&&(t.y=a),t["-y"]=a}return _(this._url,l(t,this.options))},_tileOnLoad:function(e,t){Z.ielt9?setTimeout(u(e,this,null,t),0):e(null,t)},_tileOnError:function(e,t,a){var r=this.options.errorTileUrl;r&&t.getAttribute("src")!==r&&(t.src=r),e(a,t)},_onTileRemove:function(e){e.tile.onload=null},_getZoomForUrl:function(){var e=this._tileZoom,t=this.options.maxZoom,a=this.options.zoomReverse,r=this.options.zoomOffset;return a&&(e=t-e),e+r},_getSubdomain:function(e){var t=Math.abs(e.x+e.y)%this.options.subdomains.length;return this.options.subdomains[t]},_abortLoading:function(){var e,t;for(e in this._tiles)if(this._tiles[e].coords.z!==this._tileZoom&&(t=this._tiles[e].el,t.onload=v,t.onerror=v,!t.complete)){t.src=G;var a=this._tiles[e].coords;ke(t),delete this._tiles[e],this.fire("tileabort",{tile:t,coords:a})}},_removeTile:function(e){var t=this._tiles[e];if(t)return t.el.setAttribute("src",G),Si.prototype._removeTile.call(this,e)},_tileReady:function(e,t,a){if(!(!this._map||a&&a.getAttribute("src")===G))return Si.prototype._tileReady.call(this,e,t,a)}});function is(e,t){return new ni(e,t)}var ns=ni.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(e,t){this._url=e;var a=l({},this.defaultWmsParams);for(var r in t)r in this.options||(a[r]=t[r]);t=x(this,t);var d=t.detectRetina&&Z.retina?2:1,m=this.getTileSize();a.width=m.x*d,a.height=m.y*d,this.wmsParams=a},onAdd:function(e){this._crs=this.options.crs||e.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var t=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[t]=this._crs.code,ni.prototype.onAdd.call(this,e)},getTileUrl:function(e){var t=this._tileCoordsToNwSe(e),a=this._crs,r=ve(a.project(t[0]),a.project(t[1])),d=r.min,m=r.max,y=(this._wmsVersion>=1.3&&this._crs===Ko?[d.y,d.x,m.y,m.x]:[d.x,d.y,m.x,m.y]).join(","),k=ni.prototype.getTileUrl.call(this,e);return k+I(this.wmsParams,k,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+y},setParams:function(e,t){return l(this.wmsParams,e),t||this.redraw(),this}});function Kl(e,t){return new ns(e,t)}ni.WMS=ns,is.wms=Kl;var kt=rt.extend({options:{padding:.1},initialize:function(e){x(this,e),h(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),se(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var e={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(e.zoomanim=this._onAnimZoom),e},_onAnimZoom:function(e){this._updateTransform(e.center,e.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(e,t){var a=this._map.getZoomScale(t,this._zoom),r=this._map.getSize().multiplyBy(.5+this.options.padding),d=this._map.project(this._center,t),m=r.multiplyBy(-a).add(d).subtract(this._map._getNewPixelOrigin(e,t));Z.any3d?Nt(this._container,m,a):Te(this._container,m)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var e in this._layers)this._layers[e]._reset()},_onZoomEnd:function(){for(var e in this._layers)this._layers[e]._project()},_updatePaths:function(){for(var e in this._layers)this._layers[e]._update()},_update:function(){var e=this.options.padding,t=this._map.getSize(),a=this._map.containerPointToLayerPoint(t.multiplyBy(-e)).round();this._bounds=new Q(a,a.add(t.multiplyBy(1+e*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),as=kt.extend({options:{tolerance:0},getEvents:function(){var e=kt.prototype.getEvents.call(this);return e.viewprereset=this._onViewPreReset,e},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){kt.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var e=this._container=document.createElement("canvas");te(e,"mousemove",this._onMouseMove,this),te(e,"click dblclick mousedown mouseup contextmenu",this._onClick,this),te(e,"mouseout",this._handleMouseOut,this),e._leaflet_disable_events=!0,this._ctx=e.getContext("2d")},_destroyContainer:function(){le(this._redrawRequest),delete this._ctx,ke(this._container),xe(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var e;this._redrawBounds=null;for(var t in this._layers)e=this._layers[t],e._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){kt.prototype._update.call(this);var e=this._bounds,t=this._container,a=e.getSize(),r=Z.retina?2:1;Te(t,e.min),t.width=r*a.x,t.height=r*a.y,t.style.width=a.x+"px",t.style.height=a.y+"px",Z.retina&&this._ctx.scale(2,2),this._ctx.translate(-e.min.x,-e.min.y),this.fire("update")}},_reset:function(){kt.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(e){this._updateDashArray(e),this._layers[h(e)]=e;var t=e._order={layer:e,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=t),this._drawLast=t,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(e){this._requestRedraw(e)},_removePath:function(e){var t=e._order,a=t.next,r=t.prev;a?a.prev=r:this._drawLast=r,r?r.next=a:this._drawFirst=a,delete e._order,delete this._layers[h(e)],this._requestRedraw(e)},_updatePath:function(e){this._extendRedrawBounds(e),e._project(),e._update(),this._requestRedraw(e)},_updateStyle:function(e){this._updateDashArray(e),this._requestRedraw(e)},_updateDashArray:function(e){if(typeof e.options.dashArray=="string"){var t=e.options.dashArray.split(/[, ]+/),a=[],r,d;for(d=0;d<t.length;d++){if(r=Number(t[d]),isNaN(r))return;a.push(r)}e.options._dashArray=a}else e.options._dashArray=e.options.dashArray},_requestRedraw:function(e){this._map&&(this._extendRedrawBounds(e),this._redrawRequest=this._redrawRequest||V(this._redraw,this))},_extendRedrawBounds:function(e){if(e._pxBounds){var t=(e.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new Q,this._redrawBounds.extend(e._pxBounds.min.subtract([t,t])),this._redrawBounds.extend(e._pxBounds.max.add([t,t]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var e=this._redrawBounds;if(e){var t=e.getSize();this._ctx.clearRect(e.min.x,e.min.y,t.x,t.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var e,t=this._redrawBounds;if(this._ctx.save(),t){var a=t.getSize();this._ctx.beginPath(),this._ctx.rect(t.min.x,t.min.y,a.x,a.y),this._ctx.clip()}this._drawing=!0;for(var r=this._drawFirst;r;r=r.next)e=r.layer,(!t||e._pxBounds&&e._pxBounds.intersects(t))&&e._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(e,t){if(this._drawing){var a,r,d,m,y=e._parts,k=y.length,$=this._ctx;if(k){for($.beginPath(),a=0;a<k;a++){for(r=0,d=y[a].length;r<d;r++)m=y[a][r],$[r?"lineTo":"moveTo"](m.x,m.y);t&&$.closePath()}this._fillStroke($,e)}}},_updateCircle:function(e){if(!(!this._drawing||e._empty())){var t=e._point,a=this._ctx,r=Math.max(Math.round(e._radius),1),d=(Math.max(Math.round(e._radiusY),1)||r)/r;d!==1&&(a.save(),a.scale(1,d)),a.beginPath(),a.arc(t.x,t.y/d,r,0,Math.PI*2,!1),d!==1&&a.restore(),this._fillStroke(a,e)}},_fillStroke:function(e,t){var a=t.options;a.fill&&(e.globalAlpha=a.fillOpacity,e.fillStyle=a.fillColor||a.color,e.fill(a.fillRule||"evenodd")),a.stroke&&a.weight!==0&&(e.setLineDash&&e.setLineDash(t.options&&t.options._dashArray||[]),e.globalAlpha=a.opacity,e.lineWidth=a.weight,e.strokeStyle=a.color,e.lineCap=a.lineCap,e.lineJoin=a.lineJoin,e.stroke())},_onClick:function(e){for(var t=this._map.mouseEventToLayerPoint(e),a,r,d=this._drawFirst;d;d=d.next)a=d.layer,a.options.interactive&&a._containsPoint(t)&&(!(e.type==="click"||e.type==="preclick")||!this._map._draggableMoved(a))&&(r=a);this._fireEvent(r?[r]:!1,e)},_onMouseMove:function(e){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var t=this._map.mouseEventToLayerPoint(e);this._handleMouseHover(e,t)}},_handleMouseOut:function(e){var t=this._hoveredLayer;t&&(Ce(this._container,"leaflet-interactive"),this._fireEvent([t],e,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(e,t){if(!this._mouseHoverThrottled){for(var a,r,d=this._drawFirst;d;d=d.next)a=d.layer,a.options.interactive&&a._containsPoint(t)&&(r=a);r!==this._hoveredLayer&&(this._handleMouseOut(e),r&&(se(this._container,"leaflet-interactive"),this._fireEvent([r],e,"mouseover"),this._hoveredLayer=r)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,e),this._mouseHoverThrottled=!0,setTimeout(u(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(e,t,a){this._map._fireDOMEvent(t,a||t.type,e)},_bringToFront:function(e){var t=e._order;if(t){var a=t.next,r=t.prev;if(a)a.prev=r;else return;r?r.next=a:a&&(this._drawFirst=a),t.prev=this._drawLast,this._drawLast.next=t,t.next=null,this._drawLast=t,this._requestRedraw(e)}},_bringToBack:function(e){var t=e._order;if(t){var a=t.next,r=t.prev;if(r)r.next=a;else return;a?a.prev=r:r&&(this._drawLast=r),t.prev=null,t.next=this._drawFirst,this._drawFirst.prev=t,this._drawFirst=t,this._requestRedraw(e)}}});function os(e){return Z.canvas?new as(e):null}var Ti=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(e){return document.createElement("<lvml:"+e+' class="lvml">')}}catch{}return function(e){return document.createElement("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),Yl={_initContainer:function(){this._container=he("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(kt.prototype._update.call(this),this.fire("update"))},_initPath:function(e){var t=e._container=Ti("shape");se(t,"leaflet-vml-shape "+(this.options.className||"")),t.coordsize="1 1",e._path=Ti("path"),t.appendChild(e._path),this._updateStyle(e),this._layers[h(e)]=e},_addPath:function(e){var t=e._container;this._container.appendChild(t),e.options.interactive&&e.addInteractiveTarget(t)},_removePath:function(e){var t=e._container;ke(t),e.removeInteractiveTarget(t),delete this._layers[h(e)]},_updateStyle:function(e){var t=e._stroke,a=e._fill,r=e.options,d=e._container;d.stroked=!!r.stroke,d.filled=!!r.fill,r.stroke?(t||(t=e._stroke=Ti("stroke")),d.appendChild(t),t.weight=r.weight+"px",t.color=r.color,t.opacity=r.opacity,r.dashArray?t.dashStyle=B(r.dashArray)?r.dashArray.join(" "):r.dashArray.replace(/( *, *)/g," "):t.dashStyle="",t.endcap=r.lineCap.replace("butt","flat"),t.joinstyle=r.lineJoin):t&&(d.removeChild(t),e._stroke=null),r.fill?(a||(a=e._fill=Ti("fill")),d.appendChild(a),a.color=r.fillColor||r.color,a.opacity=r.fillOpacity):a&&(d.removeChild(a),e._fill=null)},_updateCircle:function(e){var t=e._point.round(),a=Math.round(e._radius),r=Math.round(e._radiusY||a);this._setPath(e,e._empty()?"M0 0":"AL "+t.x+","+t.y+" "+a+","+r+" 0,"+65535*360)},_setPath:function(e,t){e._path.v=t},_bringToFront:function(e){Jt(e._container)},_bringToBack:function(e){Xt(e._container)}},mn=Z.vml?Ti:lo,Mi=kt.extend({_initContainer:function(){this._container=mn("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=mn("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){ke(this._container),xe(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){kt.prototype._update.call(this);var e=this._bounds,t=e.getSize(),a=this._container;(!this._svgSize||!this._svgSize.equals(t))&&(this._svgSize=t,a.setAttribute("width",t.x),a.setAttribute("height",t.y)),Te(a,e.min),a.setAttribute("viewBox",[e.min.x,e.min.y,t.x,t.y].join(" ")),this.fire("update")}},_initPath:function(e){var t=e._path=mn("path");e.options.className&&se(t,e.options.className),e.options.interactive&&se(t,"leaflet-interactive"),this._updateStyle(e),this._layers[h(e)]=e},_addPath:function(e){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(e._path),e.addInteractiveTarget(e._path)},_removePath:function(e){ke(e._path),e.removeInteractiveTarget(e._path),delete this._layers[h(e)]},_updatePath:function(e){e._project(),e._update()},_updateStyle:function(e){var t=e._path,a=e.options;t&&(a.stroke?(t.setAttribute("stroke",a.color),t.setAttribute("stroke-opacity",a.opacity),t.setAttribute("stroke-width",a.weight),t.setAttribute("stroke-linecap",a.lineCap),t.setAttribute("stroke-linejoin",a.lineJoin),a.dashArray?t.setAttribute("stroke-dasharray",a.dashArray):t.removeAttribute("stroke-dasharray"),a.dashOffset?t.setAttribute("stroke-dashoffset",a.dashOffset):t.removeAttribute("stroke-dashoffset")):t.setAttribute("stroke","none"),a.fill?(t.setAttribute("fill",a.fillColor||a.color),t.setAttribute("fill-opacity",a.fillOpacity),t.setAttribute("fill-rule",a.fillRule||"evenodd")):t.setAttribute("fill","none"))},_updatePoly:function(e,t){this._setPath(e,co(e._parts,t))},_updateCircle:function(e){var t=e._point,a=Math.max(Math.round(e._radius),1),r=Math.max(Math.round(e._radiusY),1)||a,d="a"+a+","+r+" 0 1,0 ",m=e._empty()?"M0 0":"M"+(t.x-a)+","+t.y+d+a*2+",0 "+d+-a*2+",0 ";this._setPath(e,m)},_setPath:function(e,t){e._path.setAttribute("d",t)},_bringToFront:function(e){Jt(e._path)},_bringToBack:function(e){Xt(e._path)}});Z.vml&&Mi.include(Yl);function ss(e){return Z.svg||Z.vml?new Mi(e):null}ce.include({getRenderer:function(e){var t=e.options.renderer||this._getPaneRenderer(e.options.pane)||this.options.renderer||this._renderer;return t||(t=this._renderer=this._createRenderer()),this.hasLayer(t)||this.addLayer(t),t},_getPaneRenderer:function(e){if(e==="overlayPane"||e===void 0)return!1;var t=this._paneRenderers[e];return t===void 0&&(t=this._createRenderer({pane:e}),this._paneRenderers[e]=t),t},_createRenderer:function(e){return this.options.preferCanvas&&os(e)||ss(e)}});var rs=ti.extend({initialize:function(e,t){ti.prototype.initialize.call(this,this._boundsToLatLngs(e),t)},setBounds:function(e){return this.setLatLngs(this._boundsToLatLngs(e))},_boundsToLatLngs:function(e){return e=ye(e),[e.getSouthWest(),e.getNorthWest(),e.getNorthEast(),e.getSouthEast()]}});function Jl(e,t){return new rs(e,t)}Mi.create=mn,Mi.pointsToPath=co,_t.geometryToLayer=rn,_t.coordsToLatLng=xa,_t.coordsToLatLngs=ln,_t.latLngToCoords=_a,_t.latLngsToCoords=dn,_t.getFeature=ii,_t.asFeature=cn,ce.mergeOptions({boxZoom:!0});var ls=ht.extend({initialize:function(e){this._map=e,this._container=e._container,this._pane=e._panes.overlayPane,this._resetStateTimeout=0,e.on("unload",this._destroy,this)},addHooks:function(){te(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){xe(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){ke(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(e){if(!e.shiftKey||e.which!==1&&e.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),_i(),aa(),this._startPoint=this._map.mouseEventToContainerPoint(e),te(document,{contextmenu:Dt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(e){this._moved||(this._moved=!0,this._box=he("div","leaflet-zoom-box",this._container),se(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(e);var t=new Q(this._point,this._startPoint),a=t.getSize();Te(this._box,t.min),this._box.style.width=a.x+"px",this._box.style.height=a.y+"px"},_finish:function(){this._moved&&(ke(this._box),Ce(this._container,"leaflet-crosshair")),ki(),oa(),xe(document,{contextmenu:Dt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(e){if(!(e.which!==1&&e.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(u(this._resetState,this),0);var t=new pe(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(t).fire("boxzoomend",{boxZoomBounds:t})}},_onKeyDown:function(e){e.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});ce.addInitHook("addHandler","boxZoom",ls),ce.mergeOptions({doubleClickZoom:!0});var ds=ht.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(e){var t=this._map,a=t.getZoom(),r=t.options.zoomDelta,d=e.originalEvent.shiftKey?a-r:a+r;t.options.doubleClickZoom==="center"?t.setZoom(d):t.setZoomAround(e.containerPoint,d)}});ce.addInitHook("addHandler","doubleClickZoom",ds),ce.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var cs=ht.extend({addHooks:function(){if(!this._draggable){var e=this._map;this._draggable=new Tt(e._mapPane,e._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),e.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),e.on("zoomend",this._onZoomEnd,this),e.whenReady(this._onZoomEnd,this))}se(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){Ce(this._map._container,"leaflet-grab"),Ce(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var e=this._map;if(e._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var t=ye(this._map.options.maxBounds);this._offsetLimit=ve(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;e.fire("movestart").fire("dragstart"),e.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(e){if(this._map.options.inertia){var t=this._lastTime=+new Date,a=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(a),this._times.push(t),this._prunePositions(t)}this._map.fire("move",e).fire("drag",e)},_prunePositions:function(e){for(;this._positions.length>1&&e-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var e=this._map.getSize().divideBy(2),t=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=t.subtract(e).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(e,t){return e-(e-t)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var e=this._draggable._newPos.subtract(this._draggable._startPos),t=this._offsetLimit;e.x<t.min.x&&(e.x=this._viscousLimit(e.x,t.min.x)),e.y<t.min.y&&(e.y=this._viscousLimit(e.y,t.min.y)),e.x>t.max.x&&(e.x=this._viscousLimit(e.x,t.max.x)),e.y>t.max.y&&(e.y=this._viscousLimit(e.y,t.max.y)),this._draggable._newPos=this._draggable._startPos.add(e)}},_onPreDragWrap:function(){var e=this._worldWidth,t=Math.round(e/2),a=this._initialWorldOffset,r=this._draggable._newPos.x,d=(r-t+a)%e+t-a,m=(r+t+a)%e-t-a,y=Math.abs(d+a)<Math.abs(m+a)?d:m;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=y},_onDragEnd:function(e){var t=this._map,a=t.options,r=!a.inertia||e.noInertia||this._times.length<2;if(t.fire("dragend",e),r)t.fire("moveend");else{this._prunePositions(+new Date);var d=this._lastPos.subtract(this._positions[0]),m=(this._lastTime-this._times[0])/1e3,y=a.easeLinearity,k=d.multiplyBy(y/m),$=k.distanceTo([0,0]),T=Math.min(a.inertiaMaxSpeed,$),j=k.multiplyBy(T/$),K=T/(a.inertiaDeceleration*y),re=j.multiplyBy(-K/2).round();!re.x&&!re.y?t.fire("moveend"):(re=t._limitOffset(re,t.options.maxBounds),V(function(){t.panBy(re,{duration:K,easeLinearity:y,noMoveStart:!0,animate:!0})}))}}});ce.addInitHook("addHandler","dragging",cs),ce.mergeOptions({keyboard:!0,keyboardPanDelta:80});var us=ht.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(e){this._map=e,this._setPanDelta(e.options.keyboardPanDelta),this._setZoomDelta(e.options.zoomDelta)},addHooks:function(){var e=this._map._container;e.tabIndex<=0&&(e.tabIndex="0"),te(e,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),xe(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var e=document.body,t=document.documentElement,a=e.scrollTop||t.scrollTop,r=e.scrollLeft||t.scrollLeft;this._map._container.focus(),window.scrollTo(r,a)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(e){var t=this._panKeys={},a=this.keyCodes,r,d;for(r=0,d=a.left.length;r<d;r++)t[a.left[r]]=[-1*e,0];for(r=0,d=a.right.length;r<d;r++)t[a.right[r]]=[e,0];for(r=0,d=a.down.length;r<d;r++)t[a.down[r]]=[0,e];for(r=0,d=a.up.length;r<d;r++)t[a.up[r]]=[0,-1*e]},_setZoomDelta:function(e){var t=this._zoomKeys={},a=this.keyCodes,r,d;for(r=0,d=a.zoomIn.length;r<d;r++)t[a.zoomIn[r]]=e;for(r=0,d=a.zoomOut.length;r<d;r++)t[a.zoomOut[r]]=-e},_addHooks:function(){te(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){xe(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(e){if(!(e.altKey||e.ctrlKey||e.metaKey)){var t=e.keyCode,a=this._map,r;if(t in this._panKeys){if(!a._panAnim||!a._panAnim._inProgress)if(r=this._panKeys[t],e.shiftKey&&(r=A(r).multiplyBy(3)),a.options.maxBounds&&(r=a._limitOffset(A(r),a.options.maxBounds)),a.options.worldCopyJump){var d=a.wrapLatLng(a.unproject(a.project(a.getCenter()).add(r)));a.panTo(d)}else a.panBy(r)}else if(t in this._zoomKeys)a.setZoom(a.getZoom()+(e.shiftKey?3:1)*this._zoomKeys[t]);else if(t===27&&a._popup&&a._popup.options.closeOnEscapeKey)a.closePopup();else return;Dt(e)}}});ce.addInitHook("addHandler","keyboard",us),ce.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var ps=ht.extend({addHooks:function(){te(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){xe(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(e){var t=Ro(e),a=this._map.options.wheelDebounceTime;this._delta+=t,this._lastMousePos=this._map.mouseEventToContainerPoint(e),this._startTime||(this._startTime=+new Date);var r=Math.max(a-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(u(this._performZoom,this),r),Dt(e)},_performZoom:function(){var e=this._map,t=e.getZoom(),a=this._map.options.zoomSnap||0;e._stop();var r=this._delta/(this._map.options.wheelPxPerZoomLevel*4),d=4*Math.log(2/(1+Math.exp(-Math.abs(r))))/Math.LN2,m=a?Math.ceil(d/a)*a:d,y=e._limitZoom(t+(this._delta>0?m:-m))-t;this._delta=0,this._startTime=null,y&&(e.options.scrollWheelZoom==="center"?e.setZoom(t+y):e.setZoomAround(this._lastMousePos,t+y))}});ce.addInitHook("addHandler","scrollWheelZoom",ps);var Xl=600;ce.mergeOptions({tapHold:Z.touchNative&&Z.safari&&Z.mobile,tapTolerance:15});var hs=ht.extend({addHooks:function(){te(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){xe(this._map._container,"touchstart",this._onDown,this)},_onDown:function(e){if(clearTimeout(this._holdTimeout),e.touches.length===1){var t=e.touches[0];this._startPos=this._newPos=new q(t.clientX,t.clientY),this._holdTimeout=setTimeout(u(function(){this._cancel(),this._isTapValid()&&(te(document,"touchend",Be),te(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",t))},this),Xl),te(document,"touchend touchcancel contextmenu",this._cancel,this),te(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function e(){xe(document,"touchend",Be),xe(document,"touchend touchcancel",e)},_cancel:function(){clearTimeout(this._holdTimeout),xe(document,"touchend touchcancel contextmenu",this._cancel,this),xe(document,"touchmove",this._onMove,this)},_onMove:function(e){var t=e.touches[0];this._newPos=new q(t.clientX,t.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(e,t){var a=new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window,screenX:t.screenX,screenY:t.screenY,clientX:t.clientX,clientY:t.clientY});a._simulated=!0,t.target.dispatchEvent(a)}});ce.addInitHook("addHandler","tapHold",hs),ce.mergeOptions({touchZoom:Z.touch,bounceAtZoomLimits:!0});var ms=ht.extend({addHooks:function(){se(this._map._container,"leaflet-touch-zoom"),te(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){Ce(this._map._container,"leaflet-touch-zoom"),xe(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(e){var t=this._map;if(!(!e.touches||e.touches.length!==2||t._animatingZoom||this._zooming)){var a=t.mouseEventToContainerPoint(e.touches[0]),r=t.mouseEventToContainerPoint(e.touches[1]);this._centerPoint=t.getSize()._divideBy(2),this._startLatLng=t.containerPointToLatLng(this._centerPoint),t.options.touchZoom!=="center"&&(this._pinchStartLatLng=t.containerPointToLatLng(a.add(r)._divideBy(2))),this._startDist=a.distanceTo(r),this._startZoom=t.getZoom(),this._moved=!1,this._zooming=!0,t._stop(),te(document,"touchmove",this._onTouchMove,this),te(document,"touchend touchcancel",this._onTouchEnd,this),Be(e)}},_onTouchMove:function(e){if(!(!e.touches||e.touches.length!==2||!this._zooming)){var t=this._map,a=t.mouseEventToContainerPoint(e.touches[0]),r=t.mouseEventToContainerPoint(e.touches[1]),d=a.distanceTo(r)/this._startDist;if(this._zoom=t.getScaleZoom(d,this._startZoom),!t.options.bounceAtZoomLimits&&(this._zoom<t.getMinZoom()&&d<1||this._zoom>t.getMaxZoom()&&d>1)&&(this._zoom=t._limitZoom(this._zoom)),t.options.touchZoom==="center"){if(this._center=this._startLatLng,d===1)return}else{var m=a._add(r)._divideBy(2)._subtract(this._centerPoint);if(d===1&&m.x===0&&m.y===0)return;this._center=t.unproject(t.project(this._pinchStartLatLng,this._zoom).subtract(m),this._zoom)}this._moved||(t._moveStart(!0,!1),this._moved=!0),le(this._animRequest);var y=u(t._move,t,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=V(y,this,!0),Be(e)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,le(this._animRequest),xe(document,"touchmove",this._onTouchMove,this),xe(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});ce.addInitHook("addHandler","touchZoom",ms),ce.BoxZoom=ls,ce.DoubleClickZoom=ds,ce.Drag=cs,ce.Keyboard=us,ce.ScrollWheelZoom=ps,ce.TapHold=hs,ce.TouchZoom=ms,o.Bounds=Q,o.Browser=Z,o.CRS=bt,o.Canvas=as,o.Circle=wa,o.CircleMarker=sn,o.Class=F,o.Control=st,o.DivIcon=ts,o.DivOverlay=mt,o.DomEvent=gl,o.DomUtil=ml,o.Draggable=Tt,o.Evented=ue,o.FeatureGroup=wt,o.GeoJSON=_t,o.GridLayer=Si,o.Handler=ht,o.Icon=ei,o.ImageOverlay=un,o.LatLng=de,o.LatLngBounds=pe,o.Layer=rt,o.LayerGroup=Qt,o.LineUtil=Sl,o.Map=ce,o.Marker=on,o.Mixin=kl,o.Path=Mt,o.Point=q,o.PolyUtil=zl,o.Polygon=ti,o.Polyline=xt,o.Popup=pn,o.PosAnimation=Oo,o.Projection=Tl,o.Rectangle=rs,o.Renderer=kt,o.SVG=Mi,o.SVGOverlay=es,o.TileLayer=ni,o.Tooltip=hn,o.Transformation=Vn,o.Util=N,o.VideoOverlay=Qo,o.bind=u,o.bounds=ve,o.canvas=os,o.circle=Nl,o.circleMarker=Ol,o.control=$i,o.divIcon=Wl,o.extend=l,o.featureGroup=Pl,o.geoJSON=Xo,o.geoJson=Dl,o.gridLayer=Gl,o.icon=Bl,o.imageOverlay=Fl,o.latLng=oe,o.latLngBounds=ye,o.layerGroup=Al,o.map=vl,o.marker=Rl,o.point=A,o.polygon=Hl,o.polyline=jl,o.popup=Zl,o.rectangle=Jl,o.setOptions=x,o.stamp=h,o.svg=ss,o.svgOverlay=Ul,o.tileLayer=is,o.tooltip=Vl,o.transformation=yi,o.version=s,o.videoOverlay=ql;var Ql=window.L;o.noConflict=function(){return window.L=Ql,this},window.L=o})})(Ua,Ua.exports);var iu=Ua.exports;const Ie=tu(iu),io="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcYBeBeoQIhRAkLlRDGrhIgY3BJL8CVeKzuyXFzzjkn5ZxzzuScg3PO8cKzu70JkO0LfxdTU//pM9vTu7Xgf6KqOVTb9X7toRrVEfBf1HTVjZccrT/2by1VV928Yty9ZbVuucdz90frG8DBjl9pVApbOstvmMuvVgaNXSfAAd6pGxpy6yxf5ph43pS/4f3uoaGm2rdu72S9xzOvMymkZFq/ptDrk90mhW7e4zl7HLzhxGWPR20xmSxJ/VqldG5m9XhaVOA1DadsNh3Pu5L2N6QtPO/32JpqQBVVk20oy/Pi2s23WEvyfHbe1thadVQttvm7Llf65gGmXK67XtupyoM7HQhmXdLS8oGWJNeOJ3C5fG5XCEJnkez3/oFdsvgJ4l2ANZwhrJKk/7OSXa+3Vw2WJMlKnGkobouYk6T0TyX30klOUnTD9HJ5qpckL3EW/w4XF3Xd0FGywXUrstrclVsqz5Pd/sXFYyDnPdrLcQODmGOK47IZb4CmibmMn+MYRzFZ5jg33ZL/EJrWcszHmANy3ARBK/IXtciJy8VsitPSdE3uuHxzougojcUdr8/32atnz/ev3f/K5wtpxUTpcaI45zusVDpYtZi+jg0oU9b3x74h7+n9ABvYEZeKaVq0sh0AtLKsFtqNBdeT0MrSzwwlq9+x6xAO4tgOtSzbCjrNQQiNvQUbUEubvzBUeGw26yDCsRHCoLkTHDa7IdOLIThs/gHvChszh2CimE8peRs47cxANI0lYNB5y1DljpOF0IhzBDPOZnDOqYYbeGKECbPzWnXludPphw5c2YBq5zlwXphIbO4VDCZ0gnPfUO1TwZoYwAs2ExPCedAu9DAjfQUjzITQb3jNj0KG2Sgt6BHaQUdYzWz+XmBktOHwanXjaSTcwwziBcuMOtwBmqPrTOxFQR/DRKKPqyur0aiW6cULYsx6tBm0jXpR/AUWR6HRq9WVW6MRhIq5jLyjbaCTDCijyYJNpCajdyobP/eTw0iexBAKkJ3gA5KcQb2zBXsIBckn+xVv8jkZSaEFHE+jFEleAEfayRU0MouNoBmB/L50Ai/HSLIHxcrpCvnhSQAuakKp2C/YbCylJjXRVy/z3+Kv/RrNcCo+WUzlVEhzKffnTQnxeN9fWF88fiNCUdSTsaufaChKWInHeysygfpIqagoakW+vV20J8uyl6TyNKEZWV4oRSPyCkWpgOLSbkCObT8o2r6tlG58HQquf6O0v50tB7JM7F4EORd2dx/K0w/KHsVkLPaoYrwgP/y7krr3SSMA4zj+OBgmjYkxcdIJQyQRKgg2viX9Hddi9UBb29LrKR7CVVEEEXWojUkXNyfTNDE14W9gbHJNuhjDettN3ZvbOvdOqCD3Jp/9l+/wJE+9PkYGjx/fqkys3S2rMozM/o2106rfMUINo6hVqz+eu/hd1c4xTg0TAfy5kV+4UG6+IthHTU9woWmxuKNbTfuCSfovBCxq7EtHqvYL4Sm6F8GVxsSXHMQ07TOi1DKtZxjWaaIyi4CXWjxPccUw8WVbMYY5wxC1mzEyXMJWkllpRloi+Kkoq69sxBTlElF6aAxYUbjXNlhlDZilDnM4U5SlN5biRsRHnbx3mbeWjEh4mEyiuJDl5XcWVmX5GvNkFgLWZM5qwsop4/AWfLhU1cR7k1VVvcYCWRkOI6Xy5gmnphCYIkvzuNYzHzosq2oNk2RtSs8khfUOfHIDgR6ysYBaMpl4uEgk2U/oJTs9AaTSwma7dT69geAE2ZpEjUsn2ieJNHeKfrI3EcAGJ2ZaNgVuC8EBctCLc57P5u5led6IOBkIYkuQMrmmjChs4VkfOerHqSBkPzZlhe06RslZ3zMjk2sscqKwY0RcjKK+LWbzd7KiHhkncs/siFJ+V5eXxD34B8nVuJEpGJNmxN2gH3vSvp7J70tF+D1Ej8qUJD1TkErAND2GZwTFg/LubvmgiBG3SOvdlsqFQrkEzJCL1rstlnVFROixZoDDSuXQFHESwVGlcuQcMb/b42NgjLowh5MTDFE3vNB5qStRIErdCQEh6pLPR92anSUb/wAIhldAaDMpGgAAAABJRU5ErkJggg==",no="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",ao="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC";delete Ie.Icon.Default.prototype._getIconUrl;Ie.Icon.Default.mergeOptions({iconRetinaUrl:io,iconUrl:no,shadowUrl:ao});const nu="https://tile.openstreetmap.org/{z}/{x}/{y}.png",au='© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';function ou(i){if(!i||i.latitude==null||i.longitude==null)return"";const n=Number(i.latitude),o=Number(i.longitude);if(isNaN(n)||isNaN(o))return"";const s=i.maps_url||`https://www.google.com/maps/search/?api=1&query=${n},${o}`,l=`readonly-map-${i.entity_id||"preview"}-${Math.random().toString(36).substring(2,7)}`;return`
    <div class="card mb-6" style="border-top:3px solid var(--primary);">
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
        <div class="card-title" style="display:flex; align-items:center; gap:8px;">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--primary);">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Location & Geo-Coordinates
        </div>
        <a href="${s}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Open in Google Maps
        </a>
      </div>
      <div class="card-body" style="padding:16px;">
        <div id="${l}" data-lat="${n}" data-lng="${o}" class="entity-readonly-map-instance" style="height:220px; width:100%; border-radius:6px; border:1px solid var(--border); background:#f1f5f9; z-index:1;"></div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:12px; color:var(--text-muted);">
          <span>Latitude: <strong>${n.toFixed(6)}</strong> • Longitude: <strong>${o.toFixed(6)}</strong></span>
          <span class="badge badge-success" style="font-size:11px;">Verified Coordinates</span>
        </div>
      </div>
    </div>
  `}function su(){document.querySelectorAll(".entity-readonly-map-instance").forEach(n=>{if(n.dataset.initialized)return;const o=parseFloat(n.dataset.lat),s=parseFloat(n.dataset.lng);if(!(isNaN(o)||isNaN(s))){n.dataset.initialized="true";try{const l=Ie.map(n,{center:[o,s],zoom:14,zoomControl:!0,attributionControl:!0,scrollWheelZoom:!1});Ie.tileLayer(nu,{attribution:au,maxZoom:19}).addTo(l),Ie.marker([o,s]).addTo(l),setTimeout(()=>{l.invalidateSize()},200)}catch(l){console.warn("[ReadOnlyMap] Failed to initialize map container:",l)}}})}function ie(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}async function oo({id:i}){var l;const n=String(i||"").split("?")[0].split("#")[0];if(!n||n==="new"){X("/entities/new"+(window.location.search||""));return}if(!yt(X))return;const o=He(),s=document.getElementById("app");s.innerHTML=$e(`
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
  `,`Case #${n}`),Ee();try{const[c,u,p,h,f]=await Promise.all([be.get(n),tr.list(n).catch(()=>({data:[]})),be.audit(n).catch(()=>({data:{auditLogs:[],approvalHistory:[]}})),be.getLineage(n).catch(()=>({data:{current:null,parent:null,children:[],rules:[]}})),be.workflow(n).catch(()=>({data:{allowedTransitions:[]}}))]),g=c.data,v=u.data||[],b=p.data||{auditLogs:[],approvalHistory:[]},w=h.data||{current:null,parent:null,children:[],rules:[]},z=f.data||{allowedTransitions:[]};let x=[];try{x=(await Kt.list({entity_type_id:g.entity_type_id})).data||[]}catch{x=[]}if(document.getElementById("header-title").textContent=g.name,["approved","coordinator_approved","verified","in_progress","resolved","closed"].includes(String(g.status||"").toLowerCase())&&((l=g.entityType)==null?void 0:l.name)!=="Civic Campaign"){const _=document.getElementById("header-extra-actions");_&&(_.innerHTML=`
          <a href="/meme/studio/${g.entity_id}" class="btn btn-secondary" style="display:inline-flex; align-items:center; gap:6px; font-weight:700; border-color:#f59e0b; color:#d97706; background:#fffbeb;">
            <span>⚡</span> Create Civic Meme
          </a>
        `)}ru(document.getElementById("detail-content"),g,v,b,w,z,x,o)}catch(c){console.error("Failed to load case detail:",c),ee("Failed to load case details"),document.getElementById("detail-content").innerHTML=`<div class="alert alert-error">Failed to load case #${n}. It may not exist.</div>`}}function ru(i,n,o,s,l,c,u,p){var N,F;const h=Xe(n.entityType),f=["draft","submitted","coordinator_approved","approved"],g=f.indexOf(n.status)!==-1?f.indexOf(n.status):-1,v=n.status==="rejected";let b='<div class="workflow-steps mt-4 mb-2">';f.forEach((P,W)=>{const ue=W<g||W===g&&!v&&n.status==="approved",q=W===g&&n.status!=="approved";b+=`
      <div class="workflow-step">
        <div class="workflow-step-node">
          <div class="workflow-step-circle ${v&&W===g?"rejected":ue?"done":q?"current":""}">${W+1}</div>
          <div class="workflow-step-label mt-1">${cu(P)}</div>
        </div>
        ${W<f.length-1?`<div class="workflow-step-connector ${ue?"done":""}"></div>`:""}
      </div>
    `}),v&&(b+=`
      <div class="workflow-step">
        <div class="workflow-step-connector"></div>
        <div class="workflow-step-node">
          <div class="workflow-step-circle rejected">!</div>
          <div class="workflow-step-label mt-1 text-red-600">Rejected</div>
        </div>
      </div>
    `),b+="</div>";const w=lu(n,c.allowedTransitions||[],p),z=p&&["coordinator_area","coordinator_general","director","admin"].includes(p.role);let x="";z&&n.status!=="deleted"&&(x=`
      <div class="card mb-6" id="ai-report-card" style="border: 1px solid var(--primary-border); background: #f8fafc;">
        <div class="card-header" style="background: var(--surface); display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid var(--border);">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="display:flex; align-items:center; color:var(--primary);">
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </span>
            <div>
              <h3 class="card-title" style="color: var(--text-primary); margin:0;">Civic Intelligence Analysis</h3>
              <span id="ai-report-source" style="font-size: 12px; color: var(--text-muted);">AI-Assisted Decision Layer</span>
            </div>
          </div>
          <span id="ai-report-badge" class="badge badge-primary" style="font-weight:600;">Executive Analysis</span>
        </div>
        <div class="card-body" id="ai-report-body" style="padding: 1.25rem;">
          <div style="text-align:center; padding: 1rem 0;">
            <p style="color:var(--text-secondary); margin-bottom:1.25rem; font-size:14px; max-width:600px; margin-left:auto; margin-right:auto;">
              Run an automated AI analytical breakdown of this case to inspect observations, patterns, recommendations, and evidence.
            </p>
            <button id="btn-generate-ai" class="btn btn-primary" style="padding:10px 22px; font-weight:600; box-shadow:var(--shadow-sm); display:inline-flex; align-items:center; gap:8px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Run Civic Intelligence Analysis
            </button>
          </div>
        </div>
      </div>
    `);let I="";l.children&&l.children.length>0&&(I=`
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
                This case approval automatically triggered <strong>${l.children.length} related civic record(s)</strong> via configured metadata automation rules.
              </p>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${l.children.map(P=>`
                  <div style="padding:10px 14px; background:#ffffff; border:1px solid #a7f3d0; border-radius:6px; font-size:0.875rem; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                      <strong style="color:var(--text-primary);">#PR-${String(P.entity_id).padStart(5,"0")} ${ie(P.name)}</strong>
                      <span class="badge badge-secondary ml-2">${ie(P.type_name)}</span>
                    </div>
                    <a href="/entities/${P.entity_id}" class="btn btn-secondary btn-sm" style="font-size:12px;">View Related Record →</a>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `);const C=o.map(P=>{var W,ue;return`
    <tr>
      <td class="param-key" style="font-weight:600; width:35%; font-size:0.875rem;">${ie(((W=P.parameterMaster)==null?void 0:W.label)||((ue=P.parameterMaster)==null?void 0:ue.field_key)||`Parameter #${P.parameter_id}`)}</td>
      <td class="param-val" style="font-size:0.875rem;">${ie(P.value||"—")}</td>
    </tr>
  `}).join(""),_=o.length>0?`<div class="table-container"><table class="table"><tbody>${C}</tbody></table></div>`:'<div class="text-muted p-4">No custom parameter values submitted for this case.</div>',B=s.auditLogs||[];s.approvalHistory;const O=B.map(P=>`
    <div class="timeline-item mb-3" style="padding:12px; border-left:3px solid var(--primary); background:var(--gray-50); border-radius:4px;">
      <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-muted);">
        <span><strong>${ie(P.user||"System")}</strong> (${ie(P.role||"User")})</span>
        <span>${new Date(P.datetime).toLocaleString()}</span>
      </div>
      <div style="font-size:0.875rem; color:var(--text-primary); margin-top:4px; font-weight:500;">
        ${P.action==="status_transition"?`Status Transition: <strong>${Ct(P.old_status)}</strong> → <strong>${Ct(P.new_status)}</strong>`:`Action Executed: <strong>${P.action}</strong>`}
      </div>
      ${P.reason?`<div style="font-size:0.8rem; color:var(--text-secondary); font-style:italic; margin-top:4px; background:#fff; padding:6px; border-radius:4px; border:1px solid var(--border);">"${ie(P.reason)}"</div>`:""}
    </div>
  `).join(""),G=B.length>0?`<div>${O}</div>`:'<div class="text-muted p-4">No audit logs recorded yet for this case.</div>';let ae="";u.length>0&&(ae=`
      <div class="card mb-6" style="border-top:3px solid var(--green-600);">
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
          <div class="card-title" style="display:flex; align-items:center; gap:8px;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Civic Reports
          </div>
          <span class="badge badge-success">${u.length} Reports</span>
        </div>
        <div class="card-body" style="padding:16px;">
          <div style="display:flex; flex-wrap:wrap; gap:10px;">
            ${u.map(P=>`
              <button type="button" class="btn btn-secondary btn-sm execute-rep-btn" data-repid="${P.report_id}" style="display:inline-flex; align-items:center; gap:6px;">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Execute "${ie(P.report_name)}"
              </button>
            `).join("")}
          </div>
          <div id="report-result-output" class="mt-4" style="display:none;"></div>
        </div>
      </div>
    `);let U="";(l.parent||l.children&&l.children.length>0)&&(U=`
      <div class="card mb-6" style="border-top:3px solid var(--primary);">
        <div class="card-header">
          <div class="card-title" style="display:flex; align-items:center; gap:8px;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            Civic Lineage
          </div>
          <div class="card-subtitle">Connected parent and auto-created child civic activities</div>
        </div>
        <div class="card-body" style="padding:16px;">
          ${l.parent?`
            <div style="margin-bottom:12px; padding:12px; background:var(--primary-light); border:1px solid var(--primary-border); border-radius:6px; font-size:13px;">
              <div style="font-size:0.75rem; color:var(--primary); font-weight:700; text-transform:uppercase; margin-bottom:2px;">Parent Case</div>
              <a href="/entities/${l.parent.entity_id}" class="text-link font-medium">#PR-${String(l.parent.entity_id).padStart(5,"0")} ${ie(l.parent.name)} (${ie(((N=l.parent.entityType)==null?void 0:N.name)||"Capability")})</a>
            </div>
          `:""}
          ${l.children&&l.children.length>0?`
            <div style="font-size:13px; font-weight:600; color:var(--text-primary); margin-bottom:8px;">Linked Child Activities:</div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${l.children.map(P=>`
                <div style="padding:10px; background:var(--surface); border:1px solid var(--border); border-radius:6px; font-size:13px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <a href="/entities/${P.entity_id}" class="text-link font-medium">#PR-${String(P.entity_id).padStart(5,"0")} ${ie(P.name)}</a>
                    <span class="badge badge-secondary ml-2">${ie(P.type_name)}</span>
                  </div>
                  <span class="badge badge-${P.status}">${Ct(P.status)}</span>
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
              <span class="badge badge-primary font-semibold">${ie(h.title)}</span>
              <span class="badge badge-${n.status}">${Ct(n.status)}</span>
            </div>
            <h2 style="font-size:1.5rem; font-weight:800; color:var(--text-primary); margin:4px 0;">${ie(n.name)}</h2>
            <div style="font-size:13px; color:var(--text-muted);">
              Submitted by <strong>${ie(((F=n.owner)==null?void 0:F.name)||"System")}</strong> • Jurisdiction Area: <strong>${ie(n.area||"—")}</strong> • Location: <strong>${ie(n.location||"—")}</strong>
            </div>
          </div>
        </div>
        ${b}
      </div>
    </div>

    ${I}
    ${x}
    ${ou(n)}
    ${ae}
    ${U}

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
  `;const M=document.getElementById("tab-info"),H=document.getElementById("tab-audit"),Y=document.getElementById("tab-content");M&&H&&Y&&(M.addEventListener("click",()=>{M.classList.add("active"),H.classList.remove("active"),Y.innerHTML=_}),H.addEventListener("click",()=>{H.classList.add("active"),M.classList.remove("active"),Y.innerHTML=G}));const V=document.getElementById("btn-generate-ai");V&&V.addEventListener("click",()=>mu(n,o)),document.querySelectorAll(".execute-rep-btn").forEach(P=>{P.addEventListener("click",()=>{const W=P.getAttribute("data-repid");hu(W)})}),uu(n.entity_id),su(),typeof window.civicTranslatePage=="function"&&window.civicTranslatePage()}function lu(i,n,o){const s=[],l=String(i.status||"draft").trim().toLowerCase(),c=new Set;if(Array.isArray(n)&&n.length>0&&n.forEach(u=>{const p=u.action||u.to||u.to_status;if(!p||c.has(p))return;c.add(p);const h=p==="rejected",f=du(l,p),g=h?"btn-danger":"btn-primary";s.push(`
        <button class="btn ${g} btn-full wf-action-btn mt-2" 
          data-to="${ie(p)}" 
          data-label="${ie(f)}"
          data-reason="${h?"true":"false"}">
          ${ie(f)}
        </button>
      `)}),o&&o.role==="admin"&&s.push(`
      <button class="btn btn-secondary btn-full mt-3" id="btn-fire-rules" data-rule="true" style="display:inline-flex; align-items:center; gap:8px; justify-content:center;">
        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        Execute Automation Rules
      </button>
    `),s.length===0){if(o&&o.role==="coordinator_area"){const u=o.assignedArea||o.assigned_area,p=i.area;if(u&&p&&u.toLowerCase()!==p.toLowerCase())return`
          <div style="padding:14px; background:#fff7ed; border:1px solid #fed7aa; border-radius:8px; font-size:13px; color:#9a3412; line-height:1.4;">
            <div style="font-weight:700; color:#c2410c; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              Jurisdiction Boundary Constraint
            </div>
            Your coordinator account is assigned to <strong>"${ie(u)}"</strong>, but this case belongs to <strong>"${ie(p)}"</strong>.
            <div style="margin-top:8px; font-size:12px; color:#7c2d12;">
              Area Coordinators are strictly authorized to verify cases within their own jurisdiction. Only a Coordinator assigned to <strong>${ie(p)}</strong> (or a General Coordinator) can verify this case.
            </div>
          </div>
        `}return`<div class="text-muted text-sm text-center py-2">No workflow actions currently permitted for your role (${ie((o==null?void 0:o.role)||"user")}) at status "${ie(Ct(l))}".</div>`}return s.join("")}function du(i,n){const o=String(n||"").toLowerCase(),s=String(i||"").toLowerCase();return s==="draft"&&o==="submitted"?"Submit Request":s==="submitted"&&(o==="coordinator_approved"||o==="verified")?"Verify & Recommend Approval":s==="coordinator_approved"&&o==="approved"||s==="verified"&&o==="approved"?"Executive Approval (Director)":o==="rejected"?"Reject Request":`Transition to ${n}`}function cu(i){return i==="draft"?"Draft":i==="submitted"?"Submitted":i==="coordinator_approved"?"Coord Approved":i==="verified"?"Verified":i==="approved"?"Approved":i==="rejected"?"Rejected":i}function uu(i){const n=s=>{const l=s.getAttribute("data-to"),c=s.getAttribute("data-label")||`Transition to ${l}`,u=s.getAttribute("data-reason")==="true";if(s.getAttribute("data-rule")==="true"){pu(i);return}u?(qa({title:"Provide Reason for Rejection",content:`
          <div class="form-group mb-4">
            <label class="form-label" for="action-reason">Reason for Rejection <span class="required">*</span></label>
            <textarea id="action-reason" class="form-control" rows="3" placeholder="Please state rationale for rejecting this case..." required></textarea>
          </div>
        `,footer:`
          <button class="btn btn-ghost" id="cancel-modal-btn">Cancel</button>
          <button class="btn btn-danger" id="confirm-action-btn">Confirm Rejection</button>
        `,onClose:()=>{}}),document.getElementById("cancel-modal-btn").addEventListener("click",pi),document.getElementById("confirm-action-btn").addEventListener("click",async()=>{const h=document.getElementById("action-reason").value.trim();if(!h){ee("Reason is required for rejection");return}pi(),Is(i,l,h)})):(qa({title:`Confirm Action: ${c}`,content:`
          <p style="font-size:0.9rem; color:var(--text-secondary);">
            Are you sure you want to execute <strong>${ie(c)}</strong> for case #${i}?
          </p>
        `,footer:`
          <button class="btn btn-ghost" id="cancel-modal-btn">Cancel</button>
          <button class="btn btn-primary" id="confirm-action-btn">Confirm Transition</button>
        `,onClose:()=>{}}),document.getElementById("cancel-modal-btn").addEventListener("click",pi),document.getElementById("confirm-action-btn").addEventListener("click",async()=>{pi(),Is(i,l,null)}))};document.querySelectorAll(".wf-action-btn, #btn-fire-rules").forEach(s=>{s.addEventListener("click",()=>n(s))})}async function Is(i,n,o){try{const s=await be.transition(i,n,o);we(s.message||`Status updated to ${n}`),oo({id:i})}catch(s){ee(s.message||"Transition failed")}}async function pu(i){var n,o;try{const s=await be.fireRules(i,"approved");we(`Rule Engine executed! ${((o=(n=s.data)==null?void 0:n.createdEntities)==null?void 0:o.length)||0} entity created.`),oo({id:i})}catch(s){ee(s.message||"Rule trigger failed")}}async function hu(i){const n=document.getElementById("report-result-output");if(n){n.style.display="block",n.innerHTML='<div class="spinner spinner-sm"></div> Running report...';try{const s=(await Kt.execute(i)).data;let l=(s.rows||[]).map(c=>{var u;return`
      <tr>
        <td>${ie(c[s.groupBy]||c.area||"Total")}</td>
        <td style="font-weight:bold;">${c[(u=s.metric)==null?void 0:u.toLowerCase()]||c.count||c.total_count||0}</td>
      </tr>
    `}).join("");n.innerHTML=`
      <div style="background:var(--green-50); border:1px solid var(--green-100); border-radius:6px; padding:12px; font-size:13px;">
        <div style="font-weight:bold; color:var(--green-700); margin-bottom:6px; display:flex; align-items:center; gap:6px;">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10"/></svg>
          Execution Result: "${ie(s.reportName)}"
        </div>
        <table class="table-sm" style="width:100%; font-size:12px;">
          <thead><tr><th>${ie(s.groupBy||"Group")}</th><th>${ie(s.metric)}</th></tr></thead>
          <tbody>${l}</tbody>
        </table>
      </div>
    `}catch(o){n.innerHTML=`<div class="alert alert-error">Report execution failed: ${ie(o.message)}</div>`}}}async function mu(i,n=[]){const o=i.entity_id,s=document.getElementById("ai-report-body");if(s){s.innerHTML=`
    <div style="text-align:center; padding: 2rem 1rem;">
      <div class="spinner spinner-lg mb-3" style="border-top-color:var(--primary); margin:0 auto 12px auto;"></div>
      <div style="font-weight:600; color:var(--text-primary); font-size:15px;">Running Civic Intelligence Analysis...</div>
      <div style="color:var(--text-muted); font-size:13px; margin-top:4px;">Evaluating observations, patterns, recommendations, and evidence.</div>
    </div>
  `;try{const l=await be.aiAnalysis(o);we("Civic Intelligence Analysis generated successfully!"),As("ai"),s.innerHTML=gu(l.data)}catch(l){String(l.message||"").includes("GEMINI_API_KEY")||String(l.message||"").includes("Gemini API key")?(ee("AI is not configured. Showing a deterministic summary of the case fields instead."),As("deterministic"),s.innerHTML=fu(i,n)):(ee(l.message||"Could not generate AI report"),s.innerHTML=`<div class="alert alert-error">AI Analysis failed: ${ie(l.message)}</div>`)}}}function As(i){const n=document.getElementById("ai-report-source"),o=document.getElementById("ai-report-badge");!n||!o||(i==="deterministic"?(n.textContent="Deterministic summary — not AI output",o.textContent="Not AI",o.className="badge badge-pending"):(n.textContent="AI-generated — review before acting",o.textContent="AI output",o.className="badge badge-primary"))}function fu(i,n=[]){var c,u;const o=[["Record",`#${i.entity_id} ${i.name||""}`],["Type",(c=i.entityType)==null?void 0:c.name],["Status",i.status],["Area",i.area],["Location",i.location],["Submitted by",(u=i.owner)==null?void 0:u.name]].filter(([,p])=>p!=null&&String(p).trim()!==""),s=(Array.isArray(n)?n:[]).filter(p=>p&&p.value!==null&&p.value!==void 0&&String(p.value).trim()!=="").map(p=>{var h,f;return[((h=p.parameterMaster)==null?void 0:h.label)||((f=p.parameterMaster)==null?void 0:f.field_key)||`Field ${p.parameter_id}`,p.value]}),l=p=>p.map(([h,f])=>`
        <tr>
          <th scope="row" style="text-align:left; width:34%; font-weight:600; color:var(--text-secondary); padding:6px 10px; vertical-align:top;">${ie(String(h))}</th>
          <td style="padding:6px 10px;">${ie(String(f))}</td>
        </tr>`).join("");return`
    <div style="font-size:13px; color:var(--text-primary); line-height:1.5;">
      <div style="margin-bottom:12px; padding:10px 12px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; font-size:12px; color:#1e40af;">
        <strong>Deterministic summary, not AI output.</strong>
        No AI key is configured, so this lists the record's own fields exactly as submitted.
        It contains no analysis, risks or recommendations.
        Set GEMINI_API_KEY in backend/.env for an AI-generated report.
      </div>
      <div class="table-container">
        <table>
          <tbody>${l(o)}</tbody>
        </table>
      </div>
      <h4 style="margin:16px 0 8px; font-size:13px;">Submitted fields (${s.length})</h4>
      ${s.length?`<div class="table-container"><table><tbody>${l(s)}</tbody></table></div>`:'<div class="text-muted">No field values were submitted with this record.</div>'}
    </div>
  `}function gu(i){const n=Array.isArray(i.recommendation)?i.recommendation:Array.isArray(i.actionable_recommendations)?i.actionable_recommendations:[i.recommendation||i.actionable_recommendations||"Proceed with field verification."],o=Array.isArray(i.root_cause_analysis)?i.root_cause_analysis:[i.root_cause_analysis||"No root cause factors recorded."],s=Array.isArray(i.stakeholder_analysis)?i.stakeholder_analysis:[],l=Array.isArray(i.risk_register)?i.risk_register:[];return`
    <div style="font-size:13px; color:var(--text-primary); line-height:1.5;">
      ${i.notice?`
        <div style="margin-bottom:12px; padding:10px 12px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; font-size:12px; color:#1e40af; display:flex; align-items:center; gap:8px;">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>Notice:</strong> ${ie(i.notice)}</div>
        </div>
      `:""}

      <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
        <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">1. Observations & Problem Scope</strong>
        <p style="margin:0; color:var(--text-secondary);">${ie(i.problem_summary)}</p>
      </div>
      
      <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
        <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">2. Patterns & Root Cause Analysis</strong>
        <ul style="margin:0; padding-left:18px; color:var(--text-secondary);">
          ${o.map(c=>`<li style="margin-bottom:4px;">${ie(c)}</li>`).join("")}
        </ul>
      </div>

      ${s.length>0?`
        <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
          <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">3. Stakeholder Impact Analysis</strong>
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${s.map(c=>`
              <div style="font-size:12px; background:var(--surface); padding:6px 10px; border-radius:4px; border:1px solid var(--border);">
                <strong style="color:var(--text-primary);">${ie(c.group||"Stakeholder")}:</strong>
                <span style="color:var(--text-secondary); margin-left:4px;">${ie(c.interest||"")}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `:""}

      ${l.length>0?`
        <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
          <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">4. Risk Register & Feasibility</strong>
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${l.map(c=>{const u=String(c.severity||"Medium").toLowerCase(),p=u==="high"?"background:#fee2e2; color:#b91c1c; border:1px solid #fca5a5;":u==="low"?"background:#dcfce7; color:#15803d; border:1px solid #86efac;":"background:#fef3c7; color:#b45309; border:1px solid #fcd34d;";return`
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; background:var(--surface); padding:6px 10px; border-radius:4px; border:1px solid var(--border);">
                  <span style="color:var(--text-primary);">${ie(c.risk||"")}</span>
                  <span style="padding:2px 8px; border-radius:12px; font-weight:700; font-size:11px; ${p}">${ie(c.severity||"Medium")}</span>
                </div>
              `}).join("")}
          </div>
        </div>
      `:""}

      <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
        <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">5. Recommendations for Coordinator / Executive Action</strong>
        <ul style="margin:0; padding-left:18px; color:var(--text-secondary);">
          ${n.map(c=>`<li style="margin-bottom:4px;">${ie(c)}</li>`).join("")}
        </ul>
      </div>

      <div style="padding:10px 12px; background:var(--yellow-50); border:1px solid var(--yellow-100); border-radius:6px; font-size:12px; color:var(--yellow-700); display:flex; align-items:center; gap:8px;">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        <span><strong>Civic Intelligence Protocol:</strong> This automated advisory report is generated to assist municipal coordinators and directors. Ground evidence and field verification must precede final sanction.</span>
      </div>
    </div>
  `}const ri=[{type:"country",label:"Country"},{type:"state",label:"State / Province"},{type:"city",label:"City / District"},{type:"ward",label:"Ward / Local Area"}];function Ni(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function vu(i,n){if(!n)return Ni(i);const o=new RegExp(`(${n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");return Ni(i).replace(o,'<strong style="color:var(--primary,var(--primary));">$1</strong>')}class yu{constructor(n,o={}){this._container=n,this._required=o.required||!1,this._onChange=o.onChange||null,this._prefix=o.labelPrefix||"jsel",this._levelStates=[],this._hiddenInput=null,this._destroyed=!1,this._onDocumentClick=this._handleDocumentClick.bind(this),document.addEventListener("click",this._onDocumentClick)}async init(){this._render(),await this._loadLevel(0,null)}getValue(){const n=this._levelStates.map(s=>s.selectedItem).filter(Boolean);return n.length===0?null:{jurisdiction_id:n[n.length-1].jurisdiction_id,display_path:n.map(s=>s.name).join(" › ")}}async setValue(n){if(n)try{const o=await kn.get(n),{path:s}=o.data;if(!Array.isArray(s)||s.length===0)return;for(let c=0;c<s.length;c++){const u=c===0?null:s[c-1].jurisdiction_id;await this._loadLevel(c,u);const p=s[c],h=this._levelStates[c].items.find(f=>f.jurisdiction_id===p.jurisdiction_id)||p;this._setSelection(c,h,!1)}this._syncHidden(),this._notifyChange();const l=s.length;if(l<ri.length){const c=s[s.length-1].jurisdiction_id;await this._loadLevel(l,c)}}catch(o){console.warn("[JurisdictionSelector] setValue failed:",o)}}destroy(){this._destroyed=!0,document.removeEventListener("click",this._onDocumentClick),this._container.innerHTML="",this._levelStates=[],this._hiddenInput=null}_render(){this._container.innerHTML="",this._container.classList.add("jurisdiction-selector");const n=document.createElement("div");n.className="jurisdiction-selector-grid",ri.forEach((s,l)=>{const c=document.createElement("div");c.className="form-group jsel-group",c.id=`${this._prefix}-group-${l}`;const u=this._required&&l===0?'<span class="required">*</span>':"",p=document.createElement("label");p.className="form-label",p.innerHTML=`${Ni(s.label)} ${u}`;const h=document.createElement("div");h.className="jsel-combobox",h.id=`${this._prefix}-combobox-${l}`;const f=document.createElement("div");f.className="jsel-trigger is-disabled",f.setAttribute("tabindex",l===0?"0":"-1"),f.setAttribute("role","combobox"),f.setAttribute("aria-expanded","false"),f.setAttribute("aria-label",s.label);const g=document.createElement("span");g.className="jsel-trigger-text is-placeholder",g.textContent=l===0?`-- Search or Select ${s.label} --`:`-- Select ${ri[l-1].label} first --`;const v=document.createElement("div");v.className="jsel-trigger-actions";const b=document.createElement("button");b.type="button",b.className="jsel-clear-btn",b.title="Clear selection",b.style.display="none",b.innerHTML="&#x2715;";const w=document.createElement("span");w.className="jsel-chevron",w.innerHTML='<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>',v.appendChild(b),v.appendChild(w),f.appendChild(g),f.appendChild(v);const z=document.createElement("div");z.className="jsel-dropdown";const x=document.createElement("div");x.className="jsel-search-wrapper",x.innerHTML=`
        <svg class="jsel-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      `;const I=document.createElement("input");I.type="text",I.className="jsel-search-input",I.placeholder=`Search ${s.label}...`,I.setAttribute("autocomplete","off"),x.appendChild(I);const C=document.createElement("ul");C.className="jsel-options-list",C.setAttribute("role","listbox"),z.appendChild(x),z.appendChild(C),h.appendChild(f),h.appendChild(z),c.appendChild(p),c.appendChild(h),n.appendChild(c),this._levelStates[l]={meta:s,groupEl:c,comboboxEl:h,triggerEl:f,triggerTextEl:g,clearBtnEl:b,dropdownEl:z,searchInputEl:I,optionsListEl:C,items:[],filteredItems:[],selectedItem:null,focusedIdx:-1,isOpen:!1,disabled:l!==0},f.addEventListener("click",_=>{_.target.closest(".jsel-clear-btn")||this._toggleDropdown(l)}),f.addEventListener("keydown",_=>{this._levelStates[l].disabled||(_.key==="Enter"||_.key===" "||_.key==="ArrowDown")&&(_.preventDefault(),this._openDropdown(l))}),b.addEventListener("click",_=>{_.stopPropagation(),this._clearSelection(l)}),I.addEventListener("input",_=>{this._filterOptions(l,_.target.value)}),I.addEventListener("keydown",_=>{this._handleSearchKeydown(l,_)})}),this._container.appendChild(n);const o=document.createElement("input");o.type="hidden",o.name="_jurisdiction_id",o.id=`${this._prefix}-hidden`,o.value="",this._container.appendChild(o),this._hiddenInput=o}async _loadLevel(n,o){if(this._destroyed)return;const s=this._levelStates[n];if(s){s.disabled=!0,s.triggerEl.classList.add("is-disabled"),s.triggerEl.setAttribute("tabindex","-1"),s.triggerTextEl.className="jsel-trigger-text is-placeholder",s.triggerTextEl.textContent=`Loading ${s.meta.label}…`,s.optionsListEl.innerHTML=`<li class="jsel-loading"><div class="spinner" style="width:14px;height:14px;border-width:2px;"></div> Loading ${s.meta.label}...</li>`;try{const l=o==null?{}:{parent_id:String(o)},u=(await kn.list(l)).data||[];if(this._destroyed)return;if(s.items=u,s.filteredItems=u,u.length===0){s.disabled=!0,s.triggerEl.classList.add("is-disabled"),s.triggerEl.setAttribute("tabindex","-1"),s.triggerTextEl.textContent=`-- No ${s.meta.label} available --`,this._clearLevelsFrom(n+1);return}s.disabled=!1,s.triggerEl.classList.remove("is-disabled"),s.triggerEl.setAttribute("tabindex","0"),s.triggerTextEl.textContent=`-- Search or Select ${s.meta.label} --`,this._renderOptionsList(n,"")}catch(l){console.warn("[JurisdictionSelector] Failed to load level",n,l),s.disabled=!0,s.triggerEl.classList.add("is-disabled"),s.triggerTextEl.textContent=`-- Error loading ${s.meta.label} --`}}}_renderOptionsList(n,o){const s=this._levelStates[n],l=s.optionsListEl;l.innerHTML="",s.focusedIdx=-1;const c=(o||"").trim().toLowerCase();let u=s.items;if(c&&(u=s.items.filter(h=>h.name&&h.name.toLowerCase().includes(c)||h.code&&h.code.toLowerCase().includes(c))),s.filteredItems=u,u.length===0){l.innerHTML=`<li class="jsel-empty">No ${Ni(s.meta.label)} found matching "${Ni(o)}"</li>`;return}if(n===0&&!c){const h=s.items.find(f=>f.name==="India");if(h){const f=document.createElement("li");f.className="jsel-divider",f.textContent="★ Pinned / Quick Select",l.appendChild(f);const g=this._createOptionElement(n,h,c,0);l.appendChild(g);const v=document.createElement("li");v.className="jsel-divider",v.textContent=`All Countries (${s.items.length})`,l.appendChild(v)}}if(u.slice(0,150).forEach((h,f)=>{const g=this._createOptionElement(n,h,c,f);l.appendChild(g)}),u.length>150){const h=document.createElement("li");h.className="jsel-empty",h.style.fontSize="0.78rem",h.style.padding="8px",h.textContent=`Showing top 150 of ${u.length} matches — type to narrow down`,l.appendChild(h)}}_createOptionElement(n,o,s,l){const c=this._levelStates[n],u=c.selectedItem&&c.selectedItem.jurisdiction_id===o.jurisdiction_id,p=document.createElement("li");p.className=`jsel-option ${u?"is-selected":""}`,p.setAttribute("role","option"),p.setAttribute("aria-selected",u?"true":"false"),p.dataset.index=String(l);const h=document.createElement("span");if(h.innerHTML=vu(o.name,s),p.appendChild(h),o.code){const f=document.createElement("span");f.className="jsel-option-badge",f.textContent=o.code,p.appendChild(f)}return p.addEventListener("click",f=>{f.stopPropagation(),this._selectItem(n,o)}),p}_toggleDropdown(n){const o=this._levelStates[n];o.disabled||(o.isOpen?this._closeDropdown(n):this._openDropdown(n))}_openDropdown(n){this._levelStates.forEach((s,l)=>{l!==n&&s.isOpen&&this._closeDropdown(l)});const o=this._levelStates[n];o.disabled||(o.isOpen=!0,o.comboboxEl.classList.add("is-open"),o.triggerEl.classList.add("is-active"),o.triggerEl.setAttribute("aria-expanded","true"),o.searchInputEl.value="",this._renderOptionsList(n,""),setTimeout(()=>{o.searchInputEl.focus()},50))}_closeDropdown(n){const o=this._levelStates[n];o.isOpen&&(o.isOpen=!1,o.comboboxEl.classList.remove("is-open"),o.triggerEl.classList.remove("is-active"),o.triggerEl.setAttribute("aria-expanded","false"))}_filterOptions(n,o){this._renderOptionsList(n,o)}_handleSearchKeydown(n,o){const s=this._levelStates[n],l=s.optionsListEl.querySelectorAll(".jsel-option");l.length!==0&&(o.key==="ArrowDown"?(o.preventDefault(),s.focusedIdx=Math.min(s.focusedIdx+1,l.length-1),this._updateFocus(l,s.focusedIdx)):o.key==="ArrowUp"?(o.preventDefault(),s.focusedIdx=Math.max(s.focusedIdx-1,0),this._updateFocus(l,s.focusedIdx)):o.key==="Enter"?(o.preventDefault(),s.focusedIdx>=0&&s.focusedIdx<l.length?l[s.focusedIdx].click():l.length>0&&l[0].click()):o.key==="Escape"&&(this._closeDropdown(n),s.triggerEl.focus()))}_updateFocus(n,o){n.forEach((s,l)=>{l===o?(s.classList.add("is-focused"),s.scrollIntoView({block:"nearest"})):s.classList.remove("is-focused")})}_selectItem(n,o){this._setSelection(n,o,!0),this._closeDropdown(n);const s=n+1;s<ri.length&&this._loadLevel(s,o.jurisdiction_id)}_setSelection(n,o,s=!0){const l=this._levelStates[n];l.selectedItem=o,l.triggerTextEl.className="jsel-trigger-text",l.triggerTextEl.textContent=o.name,l.clearBtnEl.style.display="flex",s&&(this._clearLevelsFrom(n+1),this._syncHidden(),this._notifyChange())}_clearSelection(n){const o=this._levelStates[n];o.selectedItem=null,o.triggerTextEl.className="jsel-trigger-text is-placeholder",o.triggerTextEl.textContent=`-- Search or Select ${o.meta.label} --`,o.clearBtnEl.style.display="none",this._clearLevelsFrom(n+1),this._syncHidden(),this._notifyChange()}_clearLevelsFrom(n){for(let o=n;o<ri.length;o++){const s=this._levelStates[o];s&&(s.selectedItem=null,s.disabled=!0,s.items=[],s.filteredItems=[],s.triggerEl.classList.add("is-disabled"),s.triggerEl.setAttribute("tabindex","-1"),s.triggerTextEl.className="jsel-trigger-text is-placeholder",s.triggerTextEl.textContent=`-- Select ${ri[o-1].label} first --`,s.clearBtnEl.style.display="none",s.optionsListEl.innerHTML="",this._closeDropdown(o))}}_handleDocumentClick(n){this._destroyed||this._levelStates.forEach((o,s)=>{o.isOpen&&!o.comboboxEl.contains(n.target)&&this._closeDropdown(s)})}_syncHidden(){if(!this._hiddenInput)return;const n=this.getValue();this._hiddenInput.value=n?String(n.jurisdiction_id):""}_notifyChange(){const n=this.getValue();this._onChange&&this._onChange(n),this._container.dispatchEvent(new CustomEvent("jurisdiction:change",{bubbles:!0,detail:n}))}}delete Ie.Icon.Default.prototype._getIconUrl;Ie.Icon.Default.mergeOptions({iconRetinaUrl:io,iconUrl:no,shadowUrl:ao});const bu="https://tile.openstreetmap.org/{z}/{x}/{y}.png",wu='© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',xu=[28.6139,77.209],_u=13;function ku(i,n={}){const o=typeof i=="string"?document.getElementById(i):i;if(!o)return console.error("[LocationPicker] Mount target not found:",i),null;let s={latitude:n.initialLat?Number(n.initialLat):null,longitude:n.initialLng?Number(n.initialLng):null,area:n.initialArea?String(n.initialArea).trim():"",address:""},l=null,c=null,u=0;const p="loc-picker-"+Math.random().toString(36).substring(2,9);o.innerHTML=`
    <div class="location-picker-box card" id="${p}" style="border:1px solid var(--border); background:var(--surface); padding:16px; border-radius:8px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <label style="font-weight:600; font-size:14px; color:var(--text-primary); display:flex; align-items:center; gap:6px;">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--primary);">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Select Location & Coordinates
        </label>
        <button type="button" class="btn btn-secondary btn-sm" id="${p}-btn-geolocate" style="display:inline-flex; align-items:center; gap:6px;">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Use My Current Location
        </button>
      </div>

      <!-- Search Box & Area Input -->
      <div style="display:grid; grid-template-columns: 2fr 1fr; gap:10px; margin-bottom:12px;" class="loc-input-grid">
        <div style="display:flex; gap:6px;">
          <input type="text" id="${p}-search-input" class="form-control" placeholder="Search landmark, address, street..." style="flex:1;">
          <button type="button" class="btn btn-primary" id="${p}-btn-search" style="padding:6px 14px; font-weight:600; flex-shrink:0;">
            Search
          </button>
        </div>
        <div>
          <input type="text" id="${p}-area-input" class="form-control" placeholder="Locality / Ward (optional)" value="${Ia(s.area)}">
        </div>
      </div>

      <!-- Feedback Banner -->
      <div id="${p}-feedback" style="display:none; padding:8px 12px; border-radius:6px; font-size:13px; margin-bottom:10px;"></div>

      <!-- Map Display -->
      <div id="${p}-map" style="height:280px; width:100%; border-radius:6px; border:1px solid var(--border); background:#f1f5f9; z-index:1;"></div>

      <!-- Selected Coordinates Display -->
      <div id="${p}-coords-bar" style="margin-top:10px; display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--text-muted); background:var(--gray-50); padding:8px 12px; border-radius:6px;">
        <span id="${p}-coords-text">
          ${s.latitude&&s.longitude?`Selected: <strong>${s.latitude.toFixed(6)}, ${s.longitude.toFixed(6)}</strong>`:"Click on the map or drag the pin to set exact coordinates"}
        </span>
        <span style="font-size:11px; color:var(--text-secondary);">Drag marker to fine-tune</span>
      </div>
    </div>
  `;const h=document.getElementById(`${p}-map`),f=document.getElementById(`${p}-feedback`),g=document.getElementById(`${p}-search-input`),v=document.getElementById(`${p}-btn-search`),b=document.getElementById(`${p}-btn-geolocate`),w=document.getElementById(`${p}-area-input`),z=document.getElementById(`${p}-coords-text`);function x(M,H="error"){f&&(f.style.display="block",H==="error"?(f.style.background="#fef2f2",f.style.border="1px solid #fecaca",f.style.color="#dc2626"):H==="info"?(f.style.background="#eff6ff",f.style.border="1px solid #bfdbfe",f.style.color="#1d4ed8"):(f.style.background="#f0fdf4",f.style.border="1px solid #bbf7d0",f.style.color="#16a34a"),f.textContent=M)}function I(){f&&(f.style.display="none",f.textContent="")}function C(){z&&(s.latitude!=null&&s.longitude!=null?z.innerHTML=`Coordinates: <strong>${s.latitude.toFixed(6)}, ${s.longitude.toFixed(6)}</strong> ${s.address?` • <span title="${Ia(s.address)}">${Ia(s.address)}</span>`:""}`:z.textContent="Click on the map or drag the pin to set exact coordinates")}function _(M,H,Y="",V=!0){s.latitude=Math.round(M*1e6)/1e6,s.longitude=Math.round(H*1e6)/1e6,Y&&(s.address=Y),C(),!c&&l?(c=Ie.marker([s.latitude,s.longitude],{draggable:!0}).addTo(l),c.on("dragend",le=>{const N=le.target.getLatLng();_(N.lat,N.lng,"",!1)})):c&&c.setLatLng([s.latitude,s.longitude]),V&&l&&l.setView([s.latitude,s.longitude],Math.max(l.getZoom(),14)),n.onChange&&n.onChange(ae())}function B(){if(!h)return;const M=s.latitude&&s.longitude?[s.latitude,s.longitude]:xu,H=s.latitude&&s.longitude?14:_u;l=Ie.map(h,{center:M,zoom:H,zoomControl:!0,attributionControl:!0}),Ie.tileLayer(bu,{attribution:wu,maxZoom:19}).addTo(l),s.latitude&&s.longitude&&(c=Ie.marker([s.latitude,s.longitude],{draggable:!0}).addTo(l),c.on("dragend",Y=>{const V=Y.target.getLatLng();_(V.lat,V.lng,"",!1)})),l.on("click",Y=>{_(Y.latlng.lat,Y.latlng.lng,"",!1)}),setTimeout(()=>{l&&l.invalidateSize()},250)}async function O(){if(I(),!navigator.geolocation){x("Geolocation is not supported by your browser. Please search or pick manually on the map.","error");return}b.disabled=!0;const M=b.innerHTML;b.innerHTML='<span class="spinner" style="width:14px;height:14px;border-width:2px;margin-right:6px;"></span> Locating...',navigator.geolocation.getCurrentPosition(H=>{b.disabled=!1,b.innerHTML=M;const Y=H.coords.latitude,V=H.coords.longitude;_(Y,V,"Current Location",!0),x("Location retrieved successfully from GPS.","success"),setTimeout(I,3500)},H=>{b.disabled=!1,b.innerHTML=M;let Y="Could not retrieve your location. Please use the search bar or click on the map.";H.code===1?Y="Location permission was denied. Please use the search box or click on the map.":H.code===2?Y="Location unavailable. Please search for your location.":H.code===3&&(Y="Location request timed out. Please try searching for your area."),x(Y,"error")},{timeout:1e4,enableHighAccuracy:!0,maximumAge:0})}async function G(){I();const M=String(g.value||"").trim();if(!M){x("Please enter an address, city, or landmark to search.","error");return}const H=Date.now();if(H-u<1e3){x("Please wait a second before searching again.","info");return}u=H,v.disabled=!0;const Y=v.textContent;v.textContent="Searching...";try{const V=`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(M)}&limit=1`,le=await fetch(V,{headers:{Accept:"application/json"}});if(!le.ok)throw new Error(`Geocoding failed with status ${le.status}`);const N=await le.json();if(!Array.isArray(N)||N.length===0){x(`No location found for "${M}". Try a broader address or landmark.`,"error");return}const F=N[0],P=parseFloat(F.lat),W=parseFloat(F.lon),ue=F.display_name||M;_(P,W,ue,!0),x(`Found: ${ue}`,"success"),setTimeout(I,4e3)}catch(V){console.warn("[LocationPicker] Nominatim search error:",V),x("Failed to lookup address. Please click directly on the map to set coordinates.","error")}finally{v.disabled=!1,v.textContent=Y}}b&&b.addEventListener("click",O),v&&v.addEventListener("click",G),g&&g.addEventListener("keydown",M=>{M.key==="Enter"&&(M.preventDefault(),G())}),w&&w.addEventListener("input",M=>{s.area=M.target.value.trim(),n.onChange&&n.onChange(ae())}),B();function ae(){return{latitude:s.latitude,longitude:s.longitude,area:s.area?s.area:null,address:s.address||null}}function U(){l&&(l.remove(),l=null),o.innerHTML=""}return{getValue:ae,setCoordinates:_,destroy:U}}function Ia(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const zu="/api";function Ue(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}let fi=null,dt=null,At=[],ci=null,Wt=null,ji=new Map;const Lu=new Set(["title","name","movement_title","area","jurisdiction","jurisdiction_id","location","landmark","reported_date","reported_on","contact_person","contact_phone","contact_email","priority_level","volunteer_coordinator"]);function Lr(i){const n=String(i.field_key||"").trim().toLowerCase();return Lu.has(n)}async function $r(i={},n=null){if(!yt(X))return;try{At=(await be.listTypes().catch(()=>({data:[]}))).data||[]}catch{At=[]}const o=n||new URLSearchParams(window.location.search);o.has("entity_type_id")?dt=Number(o.get("entity_type_id")):At.length>0&&(dt=At[0].entity_type_id);const s=At.find(u=>Number(u.entity_type_id)===Number(dt));ci=Xe(s);const l=document.getElementById("app");l.innerHTML=$e(`
    <div class="page-header mb-6">
      <div class="page-header-left">
        <h1 id="page-capability-title">${Ue(ci.title)}</h1>
        <p id="page-capability-sub">Tell us what is happening and where.</p>
      </div>
    </div>
    
    <div class="card mb-6">
      <div class="card-body" style="padding:16px;">
        <div class="form-group" style="max-width: 450px; margin-bottom: 0;">
          <label class="form-label" for="entity-type-select">Target Civic Capability <span class="required">*</span></label>
          <select id="entity-type-select" class="form-control">
            <option value="">-- Select Capability --</option>
            ${At.map(u=>{const p=Xe(u);return`<option value="${u.entity_type_id}" ${Number(dt)===Number(u.entity_type_id)?"selected":""}>${Ue(p.title)}</option>`}).join("")}
          </select>
        </div>
      </div>
    </div>
    
    <div id="dynamic-form-container"></div>
  `,ci.title,At),Ee(),document.getElementById("entity-type-select").addEventListener("change",async u=>{const p=u.target.value;if(!p){document.getElementById("dynamic-form-container").innerHTML="",fi=null;return}dt=Number(p);const h=At.find(f=>Number(f.entity_type_id)===Number(dt));ci=Xe(h),document.getElementById("page-capability-title").textContent=ci.title,window.history.replaceState({},"",`/entities/new?entity_type_id=${dt}`),await Ps(dt)}),dt&&await Ps(dt)}async function Ps(i){Wt&&(Wt.destroy(),Wt=null);const n=document.getElementById("dynamic-form-container");n.innerHTML='<div class="loading-overlay"><div class="spinner spinner-lg"></div></div>';try{fi=(await jn.schema(i)).data,Cu(n,fi),await $u()}catch(o){console.error("Form schema load error:",o),ee("Failed to load form schema"),n.innerHTML='<div class="alert alert-error">Unable to load form for selected capability. No form configuration exists.</div>'}}async function $u(){const i=document.getElementById("jurisdiction-selector-mount");i&&(Wt=new yu(i,{required:!0,labelPrefix:"ent-jsel"}),await Wt.init())}function Eu(i){var z;const n=i.mandatory||i.is_mandatory,o=n?"required":"",s=n?'<span class="required">*</span>':"",l=`param_${i.parameter_id}`,c=(i.field_type||i.data_type||"text").toLowerCase(),u=Ue(i.label||i.field_key),p=(z=i.options)==null?void 0:z.depends_on;let h="",f="",g="";p&&p.field_key&&(h=`data-depends-key="${Ue(p.field_key)}" data-depends-val="${Ue(p.value)}"`,f="conditional-field",g="display:none;");const b=["textarea","file","location"].includes(c)?"flex:1 1 100%; min-width:100%;":"flex:1 1 calc(50% - 8px); min-width:200px;";let w="";switch(c){case"location":w=`
        <div id="location-picker-mount-${i.parameter_id}" class="location-picker-field-mount" data-parameter-id="${i.parameter_id}"></div>
      `;break;case"textarea":w=`<textarea name="${l}" class="form-control" rows="3" ${o} placeholder="Enter ${u.toLowerCase()}..."></textarea>`;break;case"number":w=`<input type="number" name="${l}" class="form-control" ${o} placeholder="0">`;break;case"date":w=`<input type="date" name="${l}" class="form-control" ${o}>`;break;case"email":w=`<input type="email" name="${l}" class="form-control" ${o} placeholder="email@example.com">`;break;case"phone":w=`<input type="tel" name="${l}" class="form-control" ${o} placeholder="+91 XXXXX XXXXX">`;break;case"checkbox":w=`
        <div class="check-group mt-2">
          <input type="checkbox" name="${l}" id="${l}" value="true">
          <label for="${l}">Yes</label>
        </div>
      `;break;case"select":{const x=i.meta_options||(i.options?Array.isArray(i.options)?i.options:i.options.choices:null)||["Option 1","Option 2"],I=i.options&&i.options.default?i.options.default:"";w=`<select name="${l}" class="form-control" ${o}>
        <option value="">-- Select --</option>
        ${x.map(C=>`<option value="${Ue(C)}" ${C===I?"selected":""}>${Ue(C)}</option>`).join("")}
      </select>`;break}case"file":w=`
        <div class="file-upload-wrapper" id="file-wrap-${i.parameter_id}">
          <input type="file" name="${l}" id="file-${i.parameter_id}" 
            class="form-control file-input" 
            data-parameter-id="${i.parameter_id}"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp,.csv,.txt,.zip"
            ${o}>
          <div class="file-upload-info mt-1" style="font-size:0.75rem; color:var(--text-muted);">
            Max 10MB • PDF, Word, Excel, Images, CSV, ZIP
          </div>
          <div id="file-status-${i.parameter_id}" class="file-upload-status mt-1" style="display:none;"></div>
        </div>
      `;break;default:w=`<input type="text" name="${l}" class="form-control" ${o} placeholder="Enter ${u.toLowerCase()}...">`;break}return`<div class="form-group ${f}" ${h} style="${g} ${b}">
    <label class="form-label">${u} ${s}</label>
    ${w}
  </div>`}function Cu(i,n){if(!n||!n.sections||n.sections.length===0){i.innerHTML='<div class="alert alert-warning">This capability has no form fields configured yet.</div>';return}let o=`
    <div class="card">
      <div class="card-header border-b">
        <div class="card-title">${Ue(ci.title)}</div>
        <div class="card-subtitle">Complete all required parameter fields for your submission.</div>
      </div>
      
      <div id="form-validation-alert" class="alert alert-danger hidden m-4"></div>
      ${Array.isArray(n.configuration_errors)&&n.configuration_errors.length>0?`<div class="alert alert-warning m-4">${Ue(n.configuration_errors.join(" "))}</div>`:""}

      <form id="dynamic-form" style="padding:24px;">
  `,s=!1,l=!1;n.sections.forEach((p,h)=>{const f=(p.section_name||p.title||"").trim(),g=h===0,v=f.toLowerCase().includes("where")||f.toLowerCase().includes("location");o+=`
      <div class="form-section mb-6" data-section-name="${Ue(f)}">
        <div class="form-section-title">${Ue(f)}</div>
        ${p.description?`<div class="form-section-subtitle">${Ue(p.description)}</div>`:""}
    `,g&&!s&&(o+=`
        <div class="form-row mt-4" style="display:flex; flex-wrap:wrap; gap:16px;">
          <div class="form-group" style="flex:1 1 100%; min-width:100%;">
            <label class="form-label" for="base_name">Title / Summary <span class="required">*</span></label>
            <input type="text" id="base_name" name="_base_name" class="form-control" required placeholder="Brief title summarizing the initiative">
          </div>
        </div>
      `,s=!0),v&&!l&&(o+=`
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
      `,l=!0),(p.subsections||[]).forEach(b=>{b.subsection_name&&b.subsection_name!=="Main"&&(o+=`<div class="form-subsection mt-3"><div class="form-subsection-title">${Ue(b.subsection_name)}</div>`);const z=[...b.parameters||[]].sort((x,I)=>(x.display_order||0)-(I.display_order||0)).filter(x=>!Lr(x)&&String(x.field_key||"").trim()&&String(x.label||"").trim());z.length>0&&(o+='<div class="form-row mt-3" style="display:flex; flex-wrap:wrap; gap:16px;">',z.forEach(x=>{o+=Eu(x)}),o+="</div>"),b.subsection_name&&b.subsection_name!=="Main"&&(o+="</div>")}),o+="</div>"}),l||(o+=`
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
    `),o+=`
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
  `,i.innerHTML=o,ji.forEach(p=>p.destroy&&p.destroy()),ji.clear(),i.querySelectorAll(".location-picker-field-mount").forEach(p=>{const h=p.getAttribute("data-parameter-id"),f=ku(p);f&&ji.set(String(h),f)});const u=document.getElementById("dynamic-form");u.addEventListener("submit",Tu),Su(u,n)}function Su(i,n){const o=[];(n.sections||[]).forEach(c=>{(c.subsections||[]).forEach(u=>{(u.parameters||[]).forEach(p=>o.push(p))})});const s=i.querySelectorAll(".conditional-field");if(s.length===0)return;function l(){s.forEach(c=>{const u=c.getAttribute("data-depends-key"),p=c.getAttribute("data-depends-val");if(!u)return;const h=o.find(b=>b.field_key===u);if(!h)return;const f=i.querySelector(`[name="param_${h.parameter_id}"]`);if(!f)return;String(f.value||"").trim().toLowerCase()===String(p).toLowerCase()?(c.style.display="",c.querySelectorAll("input, select, textarea").forEach(b=>{b.disabled=!1})):(c.style.display="none",c.querySelectorAll("input, select, textarea").forEach(b=>{b.disabled=!0,b.value=""}))})}i.addEventListener("change",l),i.addEventListener("input",l),l()}async function Tu(i){i.preventDefault();const n=document.getElementById("form-validation-alert");n&&(n.classList.add("hidden"),n.textContent="");const o=document.getElementById("submit-form-btn");o.disabled=!0,o.innerHTML='<div class="spinner" style="width:16px;height:16px;border-width:2px;margin-right:8px;"></div> Submitting...';try{const s=new FormData(i.target),l=Object.fromEntries(s.entries());if(!l._base_name||!l._base_name.trim()){const b=document.getElementById("base_name");throw b&&b.focus(),new Error("Title / Summary is a required field.")}const c=Wt?Wt.getValue():null;if(!c)throw new Error("Please select a jurisdiction (at minimum a Country) before submitting.");if(fi&&fi.sections){for(const b of fi.sections)for(const w of b.subsections||[])for(const z of w.parameters||[])if(!Lr(z)&&(z.mandatory||z.is_mandatory)){const x=i.target.querySelector(`[name="param_${z.parameter_id}"]`);if(x&&!x.disabled&&!(x.type==="file"?x.files&&x.files.length>0:String(x.value||"").trim()))throw x.focus(),new Error(`"${z.label||z.field_key}" is a required field.`)}}let u=null;for(const[b,w]of ji.entries()){const z=w.getValue();if(z&&z.latitude!=null&&z.longitude!=null){u=z;break}}const p={entity_type_id:dt,name:l._base_name.trim(),jurisdiction_id:c.jurisdiction_id,area:u&&u.area?u.area:c.display_path,location:l._base_location?l._base_location.trim():u&&u.address?u.address:null,status:"submitted",...u?{latitude:u.latitude,longitude:u.longitude}:{}},f=(await be.create(p)).data.entity_id;u&&u.latitude!=null&&u.longitude!=null&&await be.update(f,{latitude:u.latitude,longitude:u.longitude,...u.area?{area:u.area}:{}});const g=[];for(const[b,w]of s.entries())if(b.startsWith("param_")){const z=Number(b.replace("param_",""));if(ji.has(String(z)))continue;const x=i.target.querySelector(`[name="${b}"]`);if(x&&(x.type==="file"||x.disabled))continue;w!=null&&String(w).trim()!==""&&g.push({parameter_id:z,value:String(w).trim()})}g.length>0&&await tr.create(f,g);const v=i.target.querySelectorAll('input[type="file"]');for(const b of v)if(b.files&&b.files.length>0){const w=b.getAttribute("data-parameter-id");if(!w)continue;const z=new FormData;z.append("entity_id",f),z.append("parameter_id",w);for(const x of b.files)z.append("files",x);try{await fetch(`${zu}/files/upload`,{method:"POST",headers:{"X-Requested-With":"ck-web"},credentials:"include",body:z})}catch(x){console.warn("File upload warning:",x)}}we("Request submitted successfully!"),Mu(f,l._base_name)}catch(s){const l=s.message||"Failed to submit request";n&&(n.textContent=l,n.classList.remove("hidden")),ee(l),o.disabled=!1,o.innerHTML='<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:8px"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg> Submit Request'}}function Mu(i,n){const o=document.getElementById("dynamic-form-container"),s=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});o.innerHTML=`
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
            <div style="font-weight:600; color:var(--text-primary); margin-top:2px;">${Ue(n)}</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Submission Date</div>
            <div style="color:var(--text-secondary); margin-top:2px;">${s}</div>
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
  `}let Mn=[],Ut=null,Gt="";async function Iu(){if(!Ja(["admin"],X))return;const i=document.getElementById("app");i.innerHTML=$e(`
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
        <input type="text" id="user-search-input" class="form-control" style="padding-left: 42px; height: 42px; width: 100%; border-radius: var(--radius-md);" placeholder="Search users by email (e.g. demo.coord.area@example.com), name, or assigned area..." value="${Ke(Gt)}">
        ${Gt?'<button id="clear-search-btn" class="btn btn-ghost btn-sm" style="position:absolute; right:10px; padding:4px 8px; font-size:12px;">Clear</button>':""}
      </div>
    </div>

    <div id="admin-content">
      <div class="loading-overlay"><div class="spinner spinner-lg"></div></div>
    </div>
  `,"Users and roles"),Ee(),Au(),await In()}let Bs=null;function Au(){const i=document.getElementById("user-search-input");if(!i)return;i.addEventListener("input",o=>{Gt=o.target.value.trim(),clearTimeout(Bs),Bs=setTimeout(()=>{In(Gt)},200)});const n=document.getElementById("clear-search-btn");n&&n.addEventListener("click",()=>{Gt="",i.value="",n.remove(),In("")})}async function In(i=Gt){const n=document.getElementById("admin-content");if(n)try{const o={limit:100};i&&(o.search=i),Mn=(await Xa.listUsers(o)).data,Pu(n,Mn)}catch{ee("Failed to load users"),n.innerHTML='<div class="alert alert-error">Failed to load users data.</div>'}}function Pu(i,n=Mn){if(n.length===0){i.innerHTML=`
      <div class="card">
        <div class="card-header">
          <div class="card-title">System Users & Regional Allocations (${n.length})</div>
        </div>
        <div class="table-empty py-6 text-center text-muted">
          No users found matching "${Ke(Gt)}".
        </div>
      </div>
    `;return}const o=n.map(s=>`
    <tr>
      <td>${s.user_id}</td>
      <td class="font-medium">${Ke(s.name)}</td>
      <td class="text-muted">${Ke(s.email)}</td>
      <td><span class="badge badge-role-${s.role}">${Ru(s.role)}</span></td>
      <td>${s.assignedArea?`<span class="badge badge-primary font-semibold" style="font-size:12px;">${Ke(s.assignedArea)}</span>`:'<span class="text-muted">—</span>'}</td>
      <td><button class="btn btn-secondary btn-sm" onclick="window.editUserRole(${s.user_id})">Change Role / Area</button></td>
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
            ${o}
          </tbody>
        </table>
      </div>
    </div>
  `}async function Bu(){if(Ut&&Ut.length>0)return Ut;try{const i=await kn.tree();i.data&&Array.isArray(i.data)&&(Ut=Er(i.data))}catch(i){console.warn("Failed to load jurisdiction tree for admin, falling back to flat list",i);try{Ut=((await kn.list({parent_id:"all"})).data||[]).map(o=>({jurisdiction_id:o.jurisdiction_id,name:o.name,type:o.type,fullPath:o.name}))}catch{Ut=[]}}return Ut||[]}function Er(i,n=""){let o=[];for(const s of i){const l=n?`${n} › ${s.name}`:s.name;o.push({jurisdiction_id:s.jurisdiction_id,name:s.name,type:s.type,fullPath:l}),s.children&&s.children.length>0&&(o=o.concat(Er(s.children,l)))}return o}window.editUserRole=async i=>{const n=Mn.find(w=>w.user_id===i);if(!n)return;const o=await Bu(),s=o.filter(w=>w.type==="ward"),l=o.filter(w=>w.type==="city"),c=o.filter(w=>w.type!=="ward"&&w.type!=="city");let u=!1,p="";s.length>0&&(p+='<optgroup label="Wards / Local Areas (Recommended)">',s.forEach(w=>{const z=n.assignedArea===w.name;z&&(u=!0),p+=`<option value="${Ke(w.name)}" ${z?"selected":""}>${Ke(w.fullPath)}</option>`}),p+="</optgroup>"),l.length>0&&(p+='<optgroup label="Cities / Districts">',l.forEach(w=>{const z=n.assignedArea===w.name;z&&(u=!0),p+=`<option value="${Ke(w.name)}" ${z?"selected":""}>${Ke(w.fullPath)}</option>`}),p+="</optgroup>"),c.length>0&&(p+='<optgroup label="States / Regions">',c.forEach(w=>{const z=n.assignedArea===w.name;z&&(u=!0),p+=`<option value="${Ke(w.name)}" ${z?"selected":""}>${Ke(w.fullPath)}</option>`}),p+="</optgroup>"),n.assignedArea&&!u&&n.assignedArea!=="Unassigned"&&(p=`<option value="${Ke(n.assignedArea)}" selected>${Ke(n.assignedArea)} (Currently Assigned)</option>`+p),qa({title:`User Role & Area Allocation: ${n.name}`,content:`
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
            ${p}
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
    `,onClose:()=>{}});const h=document.getElementById("new-role"),f=document.getElementById("area-group"),g=document.getElementById("new-area"),v=document.getElementById("custom-area-wrapper"),b=document.getElementById("custom-area-input");h.addEventListener("change",w=>{const z=w.target.value==="coordinator_area";f.style.display=z?"block":"none"}),g.addEventListener("change",w=>{w.target.value==="__custom__"?(v.style.display="block",b.focus()):v.style.display="none"}),document.getElementById("save-role-btn").addEventListener("click",async()=>{const w=h.value;let z=g.value;if(w==="coordinator_area"&&(z==="__custom__"&&(z=b.value.trim()),!z)){ee("Please select or enter an allocated area for the coordinator");return}const x=document.getElementById("save-role-btn");x.disabled=!0,x.textContent="Saving...";try{await Xa.setRole(i,w,w==="coordinator_area"?z:null),we(`Updated role & area allocation for ${n.name}`),pi(),In()}catch(I){ee(I.message||"Failed to update role"),x.disabled=!1,x.textContent="Save Allocation"}})};function Ru(i){return i?i.split("_").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" "):"Unknown"}function Ke(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function Ou(){if(!yt(X))return;const i=He(),n=document.getElementById("app");n.innerHTML=$e(`
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
              <h2 style="font-size:1.25rem; font-weight:700; color:var(--text-primary);">${Aa(i.name)}</h2>
              <p style="font-size:0.875rem; color:var(--text-muted);">${Aa(i.email)}</p>
            </div>
          </div>
          
          <div class="form-group mb-4">
            <label class="form-label">User ID</label>
            <div class="font-mono text-muted" style="font-size:0.9rem;">#${i.user_id}</div>
          </div>

          <div class="form-group mb-4">
            <label class="form-label">Assigned Role</label>
            <div><span class="badge badge-primary">${Ri(i.role)}</span></div>
          </div>
          
          ${i.assignedArea?`
            <div class="form-group">
              <label class="form-label">Jurisdiction Area</label>
              <div style="font-weight:600; color:var(--text-primary);">${Aa(i.assignedArea)}</div>
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
  `,"Profile"),Ee();const o=document.getElementById("change-password-form");o&&o.addEventListener("submit",async s=>{s.preventDefault();const l=document.getElementById("password-alert");l.classList.add("hidden"),l.textContent="";const c=document.getElementById("current_password").value,u=document.getElementById("new_password").value,p=document.getElementById("confirm_password").value;if(u!==p){l.textContent="New password and confirmation do not match.",l.classList.remove("hidden");return}const h=document.getElementById("btn-change-pwd");h.disabled=!0,h.innerHTML='<div class="spinner" style="width:16px;height:16px;border-width:2px;margin-right:8px;"></div> Updating...';try{await Nn.changePassword(c,u),we("Password updated successfully!"),o.reset(),h.disabled=!1,h.innerHTML='<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> Update Password'}catch(f){const g=f.message||"Failed to update password";l.textContent=g,l.classList.remove("hidden"),ee(g),h.disabled=!1,h.innerHTML='<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> Update Password'}})}function Aa(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function me(i){return i?String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}let S={step:1,basics:{name:"",description:"",icon:"📋",domain_id:1},form:{name:"",sections:[{id:"sec_1",name:"General Information",parameters:[{id:"param_1",label:"Title",field_key:"title",field_type:"text",mandatory:!0,options:[]},{id:"param_2",label:"Area",field_key:"area",field_type:"select",mandatory:!0,options:["Sector 5","Sector 12","Pune North","Pune South","Pune Central"]}]}]},workflow:{transitions:[{from:"draft",to:"submitted",role:"citizen"},{from:"submitted",to:"coordinator_approved",role:"coordinator_area"},{from:"submitted",to:"rejected",role:"coordinator_area"},{from:"coordinator_approved",to:"approved",role:"director"},{from:"coordinator_approved",to:"rejected",role:"director"}]},rule:{enabled:!1,target_entity_type_id:"",event:"approved"},report:{enabled:!0,name:"",groupBy:"area",metric:"COUNT",metricField:"",publicStats:!0},existingTypes:[],domains:[],isSubmitting:!1};async function Nu(){var i;if(Ja(["admin","director"],X)){try{const[n,o]=await Promise.all([be.listTypes().catch(()=>({data:[]})),jn.getMetadata().catch(()=>({data:{domains:[]}}))]);S.existingTypes=n.data||[],S.domains=((i=o.data)==null?void 0:i.domains)||[]}catch(n){console.warn("Could not load metadata for module builder:",n)}Oe()}}function Oe(){const i=document.getElementById("app");let n="";S.step===1?n=ju():S.step===2?n=Hu():S.step===3?n=Fu():S.step===4?n=qu():S.step===5?n=Uu():S.step===6?n=Zu():S.step===7&&(n=Vu());const o=[{num:1,label:"Basics"},{num:2,label:"Form & Fields"},{num:3,label:"Workflow"},{num:4,label:"Rules"},{num:5,label:"Reports"},{num:6,label:"Review"}],s=o.map((l,c)=>`
    <div style="display:flex; align-items:center; gap:0.4rem; color:${S.step>=l.num?"var(--primary)":"var(--gray-400)"}; font-weight:${S.step===l.num?"bold":"normal"}; font-size:13px;">
      <span style="width:24px; height:24px; border-radius:50%; background:${S.step>=l.num?"var(--primary)":"#e5e7eb"}; color:${S.step>=l.num?"#fff":"#4b5563"}; display:flex; align-items:center; justify-content:center; font-size:12px;">${l.num}</span>
      ${l.label}
    </div>
    ${c<o.length-1?`<div style="flex:1; height:2px; background:${S.step>l.num?"var(--primary)":"#e5e7eb"}; margin:0 4px;"></div>`:""}
  `).join("");i.innerHTML=$e(`
    <div class="page-header">
      <div class="page-header-left">
        <h1>Module builder</h1>
        <p>Design and deploy brand-new civic governance capabilities purely through metadata.</p>
      </div>
    </div>

    <!-- Stepper Navigation -->
    <div class="card mb-6" style="padding: 0.8rem 1.2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; overflow-x:auto;">
        ${s}
      </div>
    </div>

    ${n}
  `,"Module builder"),Ee(),Wu()}function ju(){const i=S.domains&&S.domains.length>0?S.domains.map(n=>`<option value="${n.domain_id}" ${S.basics.domain_id==n.domain_id?"selected":""}>${me(n.domain_name)}</option>`).join(""):'<option value="1">Civic Operations</option>';return`
    <div class="card" style="max-width: 700px; margin: 0 auto;">
      <div class="card-header">
        <div class="card-title">Step 1: Module Basics</div>
        <div class="card-subtitle">Define the name, domain, and description for your new civic capability.</div>
      </div>
      <div class="card-body">
        <form id="step1-form">
          <div class="form-group">
            <label class="form-label">Module / Entity Type Name <span class="required">*</span></label>
            <input type="text" id="module-name" class="form-control" placeholder="e.g. Park Renovation Request, Public Grievance" value="${me(S.basics.name)}" required>
            <div class="form-hint">Must be unique across the platform.</div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea id="module-desc" class="form-control" rows="3" placeholder="Briefly describe what this module governs...">${me(S.basics.description)}</textarea>
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
  `}function Hu(){const i=S.basics.name?`${S.basics.name} Form`:"Module Registration Form",n=S.form.sections.map((o,s)=>{const l=o.parameters.map((c,u)=>{const p=c.field_type==="select";return`
        <div style="background:var(--gray-50, #f9fafb); border:1px solid var(--gray-200, #e5e7eb); border-radius:8px; padding:12px; margin-bottom:10px; position:relative;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-weight:600; font-size:13px; color:var(--gray-700);">Field #${u+1} (${me(c.field_key||"field")})</span>
            <button type="button" class="btn btn-ghost btn-sm text-error" onclick="window.removeParam(${s}, ${u})" style="padding:2px 6px;">✕ Remove</button>
          </div>
          <div class="form-row">
            <div class="form-group" style="flex:2;">
              <label class="form-label" style="font-size:12px;">Field Label <span class="required">*</span></label>
              <input type="text" class="form-control" value="${me(c.label)}" onchange="window.updateParam(${s}, ${u}, 'label', this.value)" placeholder="e.g. Budget, Location" required>
            </div>
            <div class="form-group" style="flex:1.5;">
              <label class="form-label" style="font-size:12px;">Data Type</label>
              <select class="form-control" onchange="window.updateParam(${s}, ${u}, 'field_type', this.value)">
                <option value="text" ${c.field_type==="text"?"selected":""}>Text Input</option>
                <option value="textarea" ${c.field_type==="textarea"?"selected":""}>Long Text (Textarea)</option>
                <option value="number" ${c.field_type==="number"?"selected":""}>Number (Metric)</option>
                <option value="date" ${c.field_type==="date"?"selected":""}>Date</option>
                <option value="select" ${c.field_type==="select"?"selected":""}>Dropdown Select</option>
              </select>
            </div>
            <div class="form-group" style="flex:1; display:flex; align-items:flex-end; padding-bottom:8px;">
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:13px;">
                <input type="checkbox" ${c.mandatory?"checked":""} onchange="window.updateParam(${s}, ${u}, 'mandatory', this.checked)">
                Required?
              </label>
            </div>
          </div>

          ${p?`
            <div style="margin-top:8px; padding-top:8px; border-top:1px dashed var(--gray-200);">
              <label class="form-label" style="font-size:12px;">Dropdown Choices (comma-separated)</label>
              <input type="text" class="form-control" value="${me((c.options||[]).join(", "))}" onchange="window.updateParamOptions(${s}, ${u}, this.value)" placeholder="Choice 1, Choice 2, Choice 3">
            </div>
          `:""}
        </div>
      `}).join("");return`
      <div class="card mb-4" style="border:1px solid var(--gray-300);">
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc;">
          <input type="text" class="form-control" style="font-weight:bold; max-width:300px;" value="${me(o.name)}" onchange="window.updateSectionName(${s}, this.value)">
          <button type="button" class="btn btn-ghost btn-sm text-error" onclick="window.removeSection(${s})">Delete Section</button>
        </div>
        <div class="card-body">
          ${l}
          <button type="button" class="btn btn-secondary btn-sm mt-2" onclick="window.addParam(${s})">+ Add Field</button>
        </div>
      </div>
    `}).join("");return`
    <div style="display:grid; grid-template-columns: 1.2fr 0.8fr; gap: 20px;">
      <div>
        <div class="card mb-4">
          <div class="card-header">
            <div class="card-title">Step 2: Form & Field Configuration</div>
            <div class="card-subtitle">Define parameters and form sections for "${me(S.basics.name)}".</div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Form Title</label>
              <input type="text" id="form-name-input" class="form-control" value="${me(i)}" onchange="state.form.name = this.value">
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
            ${Du()}
          </div>
        </div>
      </div>
    </div>
  `}function Du(){const i=S.basics.name?`${S.basics.name} Form`:"Untitled Form";let n=`<div style="font-weight:bold; font-size:1.1rem; margin-bottom:12px; color:var(--gray-900);">${me(i)}</div>`;return S.form.sections.forEach(o=>{n+=`
      <div style="margin-bottom:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
        <div style="font-weight:600; font-size:14px; color:var(--primary); margin-bottom:8px;">${me(o.name)}</div>
    `,o.parameters.forEach(s=>{const l=s.mandatory?'<span style="color:red">*</span>':"";if(n+=`<div style="margin-bottom:10px;">
        <label style="display:block; font-size:12px; font-weight:500; margin-bottom:4px;">${me(s.label||"Unlabelled")} ${l}</label>`,s.field_type==="textarea")n+='<textarea class="form-control" rows="2" disabled placeholder="Text response..."></textarea>';else if(s.field_type==="number")n+='<input type="number" class="form-control" disabled placeholder="0">';else if(s.field_type==="date")n+='<input type="date" class="form-control" disabled>';else if(s.field_type==="select"){const c=s.options&&s.options.length?s.options:["Option 1","Option 2"];n+=`<select class="form-control" disabled>
          ${c.map(u=>`<option>${me(u)}</option>`).join("")}
        </select>`}else n+='<input type="text" class="form-control" disabled placeholder="Text response...">';n+="</div>"}),n+="</div>"}),n}function Fu(){const i=[{value:"citizen",label:"Citizen (Owner)"},{value:"coordinator_area",label:"Area Coordinator"},{value:"coordinator_general",label:"General Coordinator"},{value:"director",label:"Director"},{value:"admin",label:"Administrator"}],n=S.workflow.transitions.map((o,s)=>`
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-bottom:10px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:600; font-size:13px; color:#1e293b;">Transition #${s+1}</span>
        <button type="button" class="btn btn-ghost btn-sm text-error" onclick="window.removeTransition(${s})">✕ Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group" style="flex:1;">
          <label class="form-label" style="font-size:12px;">From Status</label>
          <input type="text" class="form-control" value="${me(o.from)}" onchange="window.updateTransition(${s}, 'from', this.value)" placeholder="e.g. draft, submitted" required>
        </div>
        <div style="display:flex; align-items:center; padding-top:16px; font-weight:bold; color:#64748b;">→</div>
        <div class="form-group" style="flex:1;">
          <label class="form-label" style="font-size:12px;">To Status</label>
          <input type="text" class="form-control" value="${me(o.to)}" onchange="window.updateTransition(${s}, 'to', this.value)" placeholder="e.g. submitted, approved" required>
        </div>
        <div class="form-group" style="flex:1.2;">
          <label class="form-label" style="font-size:12px;">Allowed Role</label>
          <select class="form-control" onchange="window.updateTransition(${s}, 'role', this.value)">
            ${i.map(l=>`<option value="${l.value}" ${o.role===l.value?"selected":""}>${l.label}</option>`).join("")}
          </select>
        </div>
      </div>
    </div>
  `).join("");return`
    <div class="card" style="max-width: 750px; margin: 0 auto;">
      <div class="card-header">
        <div class="card-title">Step 3: Workflow & State Transitions</div>
        <div class="card-subtitle">Configure the state machine and permitted actor roles for "${me(S.basics.name)}".</div>
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
  `}function qu(){return S.existingTypes.map(i=>`<option value="${i.entity_type_id}" ${S.rule.target_entity_type_id==i.entity_type_id?"selected":""}>${me(i.name)}</option>`).join(""),`
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
  `}function Uu(){const i=[];S.form.sections.forEach(l=>l.parameters.forEach(c=>i.push(c)));const n=S.basics.name?`${S.basics.name}s by Area`:"Module Report",o=i.filter(l=>l.field_type==="number"),s=['<option value="area">area (Native Area)</option>','<option value="status">status (Workflow Status)</option>',...i.map(l=>`<option value="${me(l.field_key||l.label)}" ${S.report.groupBy===(l.field_key||l.label)?"selected":""}>${me(l.label)} (${l.field_type})</option>`)].join("");return o.map(l=>`
    <option value="${me(l.field_key||l.label)}" ${S.report.metricField===(l.field_key||l.label)?"selected":""}>${me(l.label)}</option>
  `).join(""),`
    <div class="card" style="max-width: 700px; margin: 0 auto;">
      <div class="card-header">
        <div class="card-title">Step 5: Reporting Definition</div>
        <div class="card-subtitle">Configure dynamic analytical reporting for "${me(S.basics.name)}" via ReportMaster.</div>
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
              <input type="text" class="form-control" value="${me(n)}" onchange="state.report.name = this.value" placeholder="e.g. Park Requests by Area">
            </div>

            <div class="form-row">
              <div class="form-group" style="flex:1;">
                <label class="form-label">Group By Field</label>
                <select class="form-control" onchange="state.report.groupBy = this.value">
                  ${s}
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
  `}function Zu(){const i=`${S.basics.name} Form`,n=S.form.sections.reduce((s,l)=>s+l.parameters.length,0),o=`${S.basics.name}s by Area`;return`
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
              <div style="font-weight:bold; font-size:1.2rem; color:#0f172a;">${me(S.basics.name)}</div>
              <div style="color:#64748b; font-size:13px;">${me(S.basics.description||"Civic Operating System Module")}</div>
            </div>
          </div>
          
          <div style="border-top:1px solid #cbd5e1; padding-top:12px; font-size:13px; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <div style="font-weight:600; color:#1e293b; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                Form Definition
              </div>
              <div>Title: <strong>${me(i)}</strong></div>
              <div>Sections: <strong>${S.form.sections.length}</strong></div>
              <div>Total Parameters: <strong>${n}</strong></div>
            </div>
            <div>
              <div style="font-weight:600; color:#1e293b; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                Workflow (${S.workflow.transitions.length} transitions)
              </div>
              ${S.workflow.transitions.map(s=>`<div style="font-size:12px;">• <code>${me(s.from)}</code> → <code>${me(s.to)}</code> (${me(s.role)})</div>`).join("")}
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
              <div>${`${me(o)} (${S.report.metric} by ${S.report.groupBy})`}</div>
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
  `}function Vu(){return`
    <div class="card" style="max-width: 650px; margin: 0 auto; text-align: center; padding: 40px 20px;">
      <div style="display:inline-flex; align-items:center; justify-content:center; width:64px; height:64px; border-radius:50%; background:#dcfce7; color:#16a34a; margin:0 auto 16px;">
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      </div>
      <h2 style="font-size: 1.8rem; color: var(--gray-900); margin-bottom: 10px;">Module Successfully Deployed!</h2>
      <p style="color: var(--gray-600); margin-bottom: 24px;">
        <strong>"${me(S.basics.name)}"</strong> has been generated atomically with complete Form, Workflow, Rule, and Report metadata.
      </p>

      <div style="display: flex; justify-content: center; gap: 12px;">
        <button class="btn btn-secondary btn-lg" onclick="state.step=1; state.basics.name=''; renderWizard();">Create Another Module</button>
        <button class="btn btn-primary btn-lg" onclick="navigate('/entities/new')">Test New Module Form →</button>
      </div>
    </div>
  `}function Wu(){const i=document.getElementById("step1-form");i&&i.addEventListener("submit",n=>{n.preventDefault();const o=document.getElementById("module-name").value.trim(),s=document.getElementById("module-desc").value.trim(),l=document.getElementById("module-icon").value;if(!o){ee("Module name is required");return}if(S.existingTypes.some(u=>u.name.toLowerCase()===o.toLowerCase())){ee(`Module "${o}" already exists. Please choose a different name.`);return}S.basics.name=o,S.basics.description=s,S.basics.icon=l,S.step=2,Oe()})}Object.defineProperty(window,"state",{get:()=>S,configurable:!0});window.renderWizard=Oe;window.navigate=X;window.addSection=()=>{const i=S.form.sections.length+1;S.form.sections.push({id:`sec_${Date.now()}`,name:`Section ${i}`,parameters:[{id:`param_${Date.now()}`,label:"New Field",field_key:`field_${Date.now()}`,field_type:"text",mandatory:!1,options:[]}]}),Oe()};window.removeSection=i=>{if(S.form.sections.length<=1){ee("Form must have at least one section");return}S.form.sections.splice(i,1),Oe()};window.updateSectionName=(i,n)=>{S.form.sections[i].name=n,Oe()};window.addParam=i=>{const n=S.form.sections[i].parameters.length+1;S.form.sections[i].parameters.push({id:`param_${Date.now()}`,label:`Field ${n}`,field_key:`field_${Date.now()}`,field_type:"text",mandatory:!1,options:[]}),Oe()};window.removeParam=(i,n)=>{S.form.sections[i].parameters.splice(n,1),Oe()};window.updateParam=(i,n,o,s)=>{const l=S.form.sections[i].parameters[n];l[o]=s,o==="label"&&(l.field_key=s.toLowerCase().replace(/[^a-z0-9]/g,"_")),Oe()};window.updateParamOptions=(i,n,o)=>{const s=o.split(",").map(l=>l.trim()).filter(Boolean);S.form.sections[i].parameters[n].options=s,Oe()};window.validateAndGoStep3=()=>{for(const i of S.form.sections){if(!i.name.trim()){ee("All sections must have a title");return}for(const n of i.parameters)if(!n.label.trim()){ee("All fields must have a label");return}}S.step=3,Oe()};window.addTransition=()=>{S.workflow.transitions.push({from:"draft",to:"submitted",role:"citizen"}),Oe()};window.removeTransition=i=>{if(S.workflow.transitions.length<=1){ee("Workflow must have at least one transition");return}S.workflow.transitions.splice(i,1),Oe()};window.updateTransition=(i,n,o)=>{S.workflow.transitions[i][n]=o,Oe()};window.validateAndGoStep4=()=>{for(let i=0;i<S.workflow.transitions.length;i++){const n=S.workflow.transitions[i];if(!n.from.trim()||!n.to.trim()){ee(`Transition #${i+1} must have both from and to states.`);return}}S.step=4,Oe()};window.submitModuleCreation=async()=>{const i=document.getElementById("create-module-btn");i&&(i.disabled=!0,i.textContent="Deploying Metadata Atomically..."),S.isSubmitting=!0;try{const n=S.form.name||`${S.basics.name} Form`,o=S.report.name||`${S.basics.name}s by Area`,s={module:{name:S.basics.name,description:S.basics.description,domain_id:S.basics.domain_id||1},form:{name:n,sections:S.form.sections.map(c=>({name:c.name,parameters:c.parameters.map(u=>({field_key:u.field_key,label:u.label,field_type:u.field_type,mandatory:!!u.mandatory,options:u.options}))}))},workflow:{transitions:S.workflow.transitions.map(c=>({from_status:c.from,to_status:c.to,role:c.role}))},rules:S.rule.enabled&&S.rule.target_entity_type_id?[{target_entity_type_id:Number(S.rule.target_entity_type_id),event:S.rule.event||"approved",auto_create:!0,auto_approve:!1}]:[],reports:S.report.enabled?[{report_name:o,output_format:"grouped_count",filters:{groupBy:S.report.groupBy||"area",metric:S.report.metric||"COUNT",metricField:S.report.metricField||void 0,public_stats:S.report.publicStats}}]:[]},l=await Ld.deploy(s);we(l.message||`Module "${S.basics.name}" deployed successfully!`),S.isSubmitting=!1,S.step=7,Oe()}catch(n){ee(n.message||"Failed to deploy module"),S.isSubmitting=!1,i&&(i.disabled=!1,i.innerHTML='<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:6px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Deploy Module via Metadata')}};function Gu(i){const n=l=>(l.textContent||"").replace(/\s+/g," ").trim(),o=Array.from(i.querySelectorAll("thead th")).map(n),s=Array.from(i.querySelectorAll("tbody tr")).map(l=>Array.from(l.querySelectorAll("td, th")).map(n));return{headers:o,rows:s}}function Ku(i){return/^-?\d+(\.\d+)?$/.test(i)?Number(i):null}function Cr(i){return`${String(i||"report").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)||"report"}-${new Date().toISOString().slice(0,10)}`}async function Yu({title:i,subtitle:n,headers:o,rows:s}){const[{jsPDF:l},{autoTable:c}]=await Promise.all([gi(()=>import("./jspdf.es.min-DK5CIhWu.js").then(f=>f.j),__vite__mapDeps([0,1])),gi(()=>import("./jspdf.plugin.autotable-DYHf0IZ0.js"),[])]),u=new l({orientation:o.length>5?"landscape":"portrait"});u.setFontSize(14),u.text(String(i||"Report"),14,16),u.setFontSize(9),u.setTextColor(100);const p=[n,`Generated ${new Date().toLocaleString()}`,`${s.length} row(s)`].filter(Boolean);u.text(p.join("  ·  "),14,23,{maxWidth:u.internal.pageSize.getWidth()-28}),c(u,{head:[o],body:s,startY:30,styles:{fontSize:9,cellPadding:2},headStyles:{fillColor:[37,99,235]}});const h=`${Cr(i)}.pdf`;return u.save(h),h}async function Ju({title:i,headers:n,rows:o}){const{default:s}=await gi(async()=>{const{default:p}=await import("./index-CB9BIZx8.js");return{default:p}},__vite__mapDeps([2,1])),l=[n.map(p=>({value:p,fontWeight:"bold"})),...o.map(p=>p.map(h=>{const f=Ku(h);return f===null?{value:h,type:String}:{value:f,type:Number}}))],c=n.map((p,h)=>({width:Math.min(60,Math.max(12,p.length+2,...o.map(f=>String(f[h]??"").length+2)))})),u=`${Cr(i)}.xlsx`;return await s(l,{columns:c}).toFile(u),u}function Ye(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}let xn=[],Rs=[];async function Xu(){if(!yt(X))return;const i=document.getElementById("app");i.innerHTML=$e(`
    <div class="page-header mb-6">
      <div class="page-header-left">
        <h1>Reports</h1>
        <p>Analytical summaries and metric aggregations of municipal activity.</p>
      </div>
    </div>
    <div id="reports-container">
      <div class="loading-overlay"><div class="spinner spinner-lg"></div></div>
    </div>
  `,"Reports"),Ee();try{const[n,o]=await Promise.all([Kt.list().catch(()=>({data:[]})),be.listTypes().catch(()=>({data:[]}))]);xn=n.data||[],Rs=o.data||[],i.innerHTML=$e(`
      <div class="page-header mb-6">
        <div class="page-header-left">
          <h1>Reports</h1>
          <p style="color:var(--text-secondary); margin-top:2px;">
            Execute analytical query reports configured via ReportMaster metadata.
          </p>
        </div>
      </div>
      
      <div id="reports-container"></div>
    `,"Reports",Rs),Ee(),Qu(document.getElementById("reports-container"))}catch{ee("Failed to load reports catalog"),document.getElementById("reports-container").innerHTML=`
      <div class="alert alert-error">Unable to load reports. Please try again later.</div>
    `}}function Qu(i){if(!xn||xn.length===0){i.innerHTML=`
      <div class="card p-8 text-center" style="padding:48px 24px; text-align:center;">
        <div style="display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:50%; background:var(--gray-100); color:var(--text-muted); margin:0 auto 12px;">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
        </div>
        <h3 style="font-size:1.15rem; font-weight:600; margin-bottom:6px; color:var(--text-primary);">No configured civic reports available</h3>
        <p style="font-size:0.875rem; color:var(--text-muted); max-width:400px; margin:0 auto;">
          Reports can be defined via ReportMaster metadata configurations in the Capability Builder.
        </p>
      </div>
    `;return}const n=xn.map(l=>{const c=Xe(l.entityType);return`
      <div class="report-card">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <span class="badge badge-primary" style="font-size:11px;">${Ye(c.shortTitle)}</span>
            <span class="badge badge-secondary" style="font-size:10px;">${Ye(l.metric_type||"COUNT")}</span>
          </div>
          <div class="report-card-title">${Ye(l.report_name)}</div>
          <div class="report-card-desc">
            Aggregates <strong>${Ye(c.shortTitle)}</strong> records grouped by <strong>${Ye(l.group_by_field||"area / status")}</strong>.
          </div>
        </div>
        
        <div>
          <div class="report-card-meta mb-3">
            <span>Group By: ${Ye(l.group_by_field||"area")}</span>
            <span>•</span>
            <span>Metric: ${Ye(l.metric_type||"COUNT")}</span>
          </div>
          <button class="btn btn-primary btn-full execute-report-btn" data-repid="${l.report_id}" style="display:inline-flex; align-items:center; justify-content:center; gap:6px;">
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
  `,i.querySelectorAll(".execute-report-btn").forEach(l=>{l.addEventListener("click",()=>{const c=l.getAttribute("data-repid");ep(c)})});const s=document.getElementById("btn-close-result");s&&s.addEventListener("click",()=>{document.getElementById("report-execution-panel").style.display="none"})}async function ep(i){const n=document.getElementById("report-execution-panel"),o=document.getElementById("execution-title"),s=document.getElementById("execution-body");if(!(!n||!s)){n.style.display="block",n.scrollIntoView({behavior:"smooth"}),s.innerHTML='<div class="loading-overlay" style="padding:24px;"><div class="spinner spinner-lg"></div></div>';try{const c=(await Kt.execute(i)).data;o.textContent=`Report Results: ${c.reportName||"Execution"}`;const u=c.rows||[];if(u.length===0){s.innerHTML='<div class="text-muted text-center p-4">Report executed successfully, but returned 0 data rows.</div>';return}const p=u.map(g=>{var v;return`
      <tr>
        <td style="font-weight:600;">${Ye(g[c.groupBy]||g.area||g.status||"Total")}</td>
        <td style="font-weight:700; color:var(--primary);">${g[(v=c.metric)==null?void 0:v.toLowerCase()]||g.count||g.total_count||0}</td>
      </tr>
    `}).join("");s.innerHTML=`
      <div style="margin-bottom:16px; font-size:0.875rem; color:var(--text-secondary);">
        Metric: <strong>${Ye(c.metric)}</strong> | Grouped By: <strong>${Ye(c.groupBy)}</strong> | Total Groups: <strong>${u.length}</strong>
      </div>

      <div style="display:flex; gap:8px; justify-content:flex-end; margin-bottom:12px;">
        <button class="btn btn-secondary btn-sm" id="btn-export-pdf" type="button">Download PDF</button>
        <button class="btn btn-secondary btn-sm" id="btn-export-excel" type="button">Download Excel</button>
      </div>

      <div class="table-container">
        <table id="report-result-table">
          <thead>
            <tr>
              <th>${Ye(c.groupBy||"Group")}</th>
              <th>Aggregation Metric (${Ye(c.metric)})</th>
            </tr>
          </thead>
          <tbody>
            ${p}
          </tbody>
        </table>
      </div>
    `;const h={title:c.reportName||"Report",subtitle:`Metric: ${c.metric} · Grouped by: ${c.groupBy}`},f=(g,v,b)=>{const w=document.getElementById(g);w&&w.addEventListener("click",async()=>{const z=document.getElementById("report-result-table");if(z){w.disabled=!0;try{const x=await v({...h,...Gu(z)});we(`${b} downloaded: ${x}`)}catch(x){ee(`${b} export failed: ${x.message||x}`)}finally{w.disabled=!1}}})};f("btn-export-pdf",Yu,"PDF"),f("btn-export-excel",Ju,"Excel")}catch(l){ee(l.message||"Report execution failed"),s.innerHTML=`<div class="alert alert-error">Execution Error: ${Ye(l.message)}</div>`}}}const at=190,Et=64,Os=110,Pi=26,ui=24,yn=20,tp=4,ip=56,np=768;let lt=null;function ap(){try{if(window.innerWidth<np||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return!1;const i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}}function $t(i){return String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ns(i,n){const o=String(i??"");return o.length>n?`${o.slice(0,n-1)}…`:o}function op(i,n){const o=i.map(U=>U.entity_type_id),s=new Set(o),l=n.filter(U=>s.has(U.source_entity_type_id)&&s.has(U.target_entity_type_id)),c=new Map(o.map(U=>[U,0]));for(let U=0;U<o.length;U+=1){let M=!1;for(const H of l){if(H.source_entity_type_id===H.target_entity_type_id)continue;const Y=c.get(H.source_entity_type_id)+1;Y>c.get(H.target_entity_type_id)&&Y<o.length&&(c.set(H.target_entity_type_id,Y),M=!0)}if(!M)break}const u=new Set(l.flatMap(U=>[U.source_entity_type_id,U.target_entity_type_id])),p=new Map;for(const U of i){if(!u.has(U.entity_type_id))continue;const M=c.get(U.entity_type_id);p.has(M)||p.set(M,[]),p.get(M).push(U)}const h=[...p.keys()].sort((U,M)=>U-M),f=Math.max(0,...[...p.values()].map(U=>U.length)),g=ui+(f?24:0),v=f?f*Et+(f-1)*Pi:0,b=h.length*at+Math.max(0,h.length-1)*Os,w=i.filter(U=>!u.has(U.entity_type_id)),z=Math.max(1,Math.min(w.length,Math.max(tp,Math.floor((b+yn)/(at+yn))))),x=Math.ceil(w.length/z),I=w.length?z*at+(z-1)*yn:0,C=g+v+(f&&w.length?ip:0),_=x?x*Et+(x-1)*Pi:0,B=ui*2+Math.max(b,I,at),O=C+_+ui,G=new Map;h.forEach((U,M)=>{const H=p.get(U),Y=H.length*Et+(H.length-1)*Pi,V=g+(v-Y)/2;H.forEach((le,N)=>{G.set(le.entity_type_id,{type:le,x:ui+M*(at+Os),y:V+N*(Et+Pi),standalone:!1})})}),w.forEach((U,M)=>{G.set(U.entity_type_id,{type:U,x:ui+M%z*(at+yn),y:C+Math.floor(M/z)*(Et+Pi),standalone:!0})});const ae=w.length&&f?C-14:null;return{nodes:G,edges:l,width:B,height:O,standaloneLabelY:ae}}function sp(i,n){if(i===n){const h=i.x+at/2;return`M ${h-26} ${i.y} C ${h-60} ${i.y-44}, ${h+60} ${i.y-44}, ${h+26} ${i.y}`}const o=n.x>=i.x,s=o?i.x+at:i.x,l=o?n.x:n.x+at,c=i.y+Et/2,u=n.y+Et/2,p=Math.max(40,Math.abs(l-s)/2)*(o?1:-1);return`M ${s} ${c} C ${s+p} ${c}, ${l-p} ${u}, ${l} ${u}`}function rp(i){var l,c;const n=((l=i.sourceEntityType)==null?void 0:l.name)||`#${i.source_entity_type_id}`,o=((c=i.targetEntityType)==null?void 0:c.name)||`#${i.target_entity_type_id}`,s=i.auto_create?`a ${o} is created ${i.auto_approve?"and approved automatically":"and waits for review"}`:"nothing is created (rule is switched off)";return`When a ${n} is ${i.event||"changed"}, ${s}.`}function lp({nodes:i,edges:n,width:o,height:s,standaloneLabelY:l}){const c=n.map(p=>{const h=i.get(p.source_entity_type_id),f=i.get(p.target_entity_type_id),g=sp(h,f),v=h===f?h.x+at/2:(h.x+f.x+at)/2,b=h===f?h.y-38:(h.y+f.y+Et)/2-8,w=`rule-edge${p.auto_approve?"":" rule-edge-pending"}${p.auto_create?"":" rule-edge-off"}`;return`
      <g class="rule-edge-group" data-rule-id="${Number(p.rule_id)}">
        <title>${$t(rp(p))}</title>
        <path class="rule-edge-hit" d="${g}" />
        <path class="${w}" d="${g}" marker-end="url(#rule-arrow)" />
        <text class="rule-edge-label" x="${v}" y="${b}" text-anchor="middle">on ${$t(p.event||"change")}</text>
      </g>`}).join(""),u=[...i.values()].map(({type:p,x:h,y:f,standalone:g})=>{var w,z;const v=((w=p._count)==null?void 0:w.entities)??0,b=((z=p.domain)==null?void 0:z.domain_name)||"";return`
      <a class="rule-node${g?" rule-node-standalone":""}" href="/entities?entity_type_id=${Number(p.entity_type_id)}"
         data-entity-type-id="${Number(p.entity_type_id)}" aria-label="${$t(`${p.name}, ${v} records. Open its records.`)}">
        <title>${$t(`${p.name} — ${v} record(s)${b?` — ${b}`:""}`)}</title>
        <rect x="${h}" y="${f}" width="${at}" height="${Et}" rx="10" />
        <text class="rule-node-name" x="${h+14}" y="${f+27}">${$t(Ns(p.name,22))}</text>
        <text class="rule-node-meta" x="${h+14}" y="${f+47}">${v} record${v===1?"":"s"}${b?` · ${$t(Ns(b,16))}`:""}</text>
      </a>`}).join("");return`
    <svg class="rule-graph-svg" viewBox="0 0 ${o} ${s}" width="${o}" height="${s}"
         role="img" aria-label="Diagram of modules and the rules that link them. The same rules are listed in the table below.">
      <defs>
        <marker id="rule-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" class="rule-arrow-head" />
        </marker>
      </defs>
      ${c}
      ${l!==null?`<text class="rule-section-label" x="${ui}" y="${l}">Modules with no rules</text>`:""}
      ${u}
    </svg>`}function dp(i){return i.length?`
    <div class="table-container">
      <table id="rule-graph-table">
        <caption class="rule-graph-caption">Rules: what is created when a record reaches a status</caption>
        <thead>
          <tr><th scope="col">When a record of</th><th scope="col">reaches</th><th scope="col">create a</th><th scope="col">Automatic</th><th scope="col">New record</th></tr>
        </thead>
        <tbody>${i.map(o=>{var s,l;return`
        <tr data-rule-id="${Number(o.rule_id)}">
          <td>${$t(((s=o.sourceEntityType)==null?void 0:s.name)||o.source_entity_type_id)}</td>
          <td>${$t(o.event||"")}</td>
          <td>${$t(((l=o.targetEntityType)==null?void 0:l.name)||o.target_entity_type_id)}</td>
          <td>${o.auto_create?"Yes":"No"}</td>
          <td>${o.auto_create?o.auto_approve?"Approved automatically":"Waits for review":"—"}</td>
        </tr>`}).join("")}</tbody>
      </table>
    </div>`:'<div class="text-muted">No rules are defined. Add one to a module in the No-Code Builder and it appears here.</div>'}function cp(i,n){const o=Array.isArray(n==null?void 0:n.entityTypes)?n.entityTypes:[],s=Array.isArray(n==null?void 0:n.rules)?n.rules:[],l=op(o,s);i.innerHTML=`
    <section class="card rule-graph-card" aria-labelledby="rule-graph-title">
      <div class="card-header rule-graph-header">
        <div>
          <h2 class="card-title" id="rule-graph-title">How modules are linked</h2>
          <p class="rule-graph-sub">${o.length} module${o.length===1?"":"s"}, ${l.edges.length} rule${l.edges.length===1?"":"s"}. Read from the module metadata; nothing here is hard-coded.</p>
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
          ${o.length&&ap()?'<button type="button" class="btn btn-secondary btn-sm" id="rule-graph-3d-toggle" aria-pressed="false">View in 3D</button>':""}
        </div>
      </div>
      <div class="card-body">
        <div id="rule-graph-3d-note" class="rule-graph-note" role="status" hidden></div>
        ${o.length?`<div class="rule-graph-scroll" id="rule-graph-2d">${lp(l)}</div>
             <div class="rule-graph-3d" id="rule-graph-3d" hidden></div>`:'<div class="text-muted">No modules are configured yet.</div>'}
        <div class="rule-graph-table-wrap">${dp(l.edges)}</div>
      </div>
    </section>`,up(i,{entityTypes:o,rules:l.edges});const c=(u,p)=>{i.querySelectorAll(`[data-rule-id="${u}"]`).forEach(h=>h.classList.toggle("is-active",p))};i.querySelectorAll("[data-rule-id]").forEach(u=>{const p=u.getAttribute("data-rule-id");u.addEventListener("mouseenter",()=>c(p,!0)),u.addEventListener("mouseleave",()=>c(p,!1))})}function up(i,n){lt&&(lt.destroy(),lt=null);const o=i.querySelector("#rule-graph-3d-toggle");if(!o)return;const s=i.querySelector("#rule-graph-2d"),l=i.querySelector("#rule-graph-3d"),c=i.querySelector("#rule-graph-legend-2d"),u=i.querySelector("#rule-graph-legend-3d"),p=i.querySelector("#rule-graph-3d-note"),h=f=>{lt&&(lt.destroy(),lt=null),l.hidden=!0,s.hidden=!1,u.hidden=!0,c.hidden=!1,o.textContent="View in 3D",o.setAttribute("aria-pressed","false"),f&&(p.textContent=f,p.hidden=!1,o.remove())};o.addEventListener("click",async()=>{if(lt){h();return}o.disabled=!0,o.textContent="Loading 3D…";try{const{mountRuleGraph3d:f,MIN_FPS:g}=await gi(async()=>{const{mountRuleGraph3d:b,MIN_FPS:w}=await import("./ruleGraph3d-bHZKilHA.js");return{mountRuleGraph3d:b,MIN_FPS:w}},[]);s.hidden=!0,c.hidden=!0,l.hidden=!1,u.hidden=!1,lt=f(l,n,{onNodeClick:b=>{window.location.assign(`/entities?entity_type_id=${Number(b)}`)}}),o.textContent="View in 2D",o.setAttribute("aria-pressed","true");const v=lt;setTimeout(async()=>{if(lt!==v||document.hidden)return;const b=await v.measureFps();lt===v&&b<g&&h(`The 3D view ran at ${Math.round(b)} frames per second on this device, so the 2D diagram is shown instead.`)},2500)}catch{h("The 3D view could not be loaded; the 2D diagram is shown instead.")}finally{o.disabled=!1}})}function bn(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}async function pp(){if(!yt(X))return;const i=document.getElementById("app");i.innerHTML=$e(`
    <div class="page-header mb-6">
      <div class="page-header-left">
        <h1>Modules</h1>
        <p>Explore all available civic operations, initiatives, and request modules.</p>
      </div>
    </div>
    <div id="modules-container">
      <div class="loading-overlay"><div class="spinner spinner-lg"></div></div>
    </div>
  `,"Modules"),Ee();try{const o=(await be.listTypes().catch(()=>({data:[]}))).data||[];i.innerHTML=$e(`
      <div class="page-header mb-6">
        <div class="page-header-left">
          <h1>Modules</h1>
          <p style="color:var(--text-secondary); margin-top:2px;">
            Select a civic capability to initiate requests, grievances, community initiatives, or civic actions.
          </p>
        </div>
      </div>

      <div id="modules-container"></div>
      <div id="rule-graph-container"></div>
    `,"Modules",o),Ee(),hp(document.getElementById("modules-container"),o);const s=document.getElementById("rule-graph-container");try{const l=await jn.getMetadata();cp(s,l.data)}catch{s.innerHTML='<div class="alert alert-error" style="margin-top:24px;">The module link diagram could not be loaded.</div>'}}catch{ee("Failed to load civic capabilities"),document.getElementById("modules-container").innerHTML=`
      <div class="alert alert-error">Unable to load capabilities catalog. Please try again.</div>
    `}}function hp(i,n){if(!n||n.length===0){i.innerHTML=`
      <div class="card p-8 text-center" style="padding:48px 24px; text-align:center;">
        <div style="display:flex; align-items:center; justify-content:center; width:56px; height:56px; border-radius:50%; background:var(--gray-100); color:var(--text-muted); margin:0 auto 12px;">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <h3 style="font-size:1.15rem; font-weight:600; margin-bottom:6px; color:var(--text-primary);">No capabilities configured</h3>
        <p style="font-size:0.875rem; color:var(--text-muted); max-width:400px; margin:0 auto;">
          Administrators can publish new civic capabilities using the No-Code Module Builder.
        </p>
      </div>
    `;return}const o=n.map(s=>{var u;const l=Xe(s),c=((u=s._count)==null?void 0:u.entities)||0;return`
      <div class="card capability-card" style="padding:24px; border-top:3px solid rgba(var(--primary-rgb), 0.45); display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--shadow-xs);">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <div style="display:flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:12px; background:rgba(var(--primary-rgb), 0.12); color:var(--primary);">
              ${Bt(l.iconKey,24)}
            </div>
            <span class="badge badge-secondary" style="font-size:11px;">${c} Active Cases</span>
          </div>

          <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--primary); margin-bottom:4px;">
            ${bn(l.category)}
          </div>

          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin-bottom:8px;">
            ${bn(l.title)}
          </h3>

          <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:20px; line-height:1.5;">
            ${bn(l.description)}
          </p>
        </div>

        <div style="display:flex; gap:10px; padding-top:16px; border-top:1px solid var(--border);">
          <a href="/entities?entity_type_id=${s.entity_type_id}" class="btn btn-secondary" style="flex:1; text-align:center; font-size:0.85rem;">
            Explore Cases
          </a>
          <a href="/entities/new?entity_type_id=${s.entity_type_id}" class="btn btn-translucent-orange" style="flex:1; text-align:center; font-size:0.85rem;">
            ${bn(l.actionLabel)} →
          </a>
        </div>
      </div>
    `}).join("");i.innerHTML=`
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:24px;">
      ${o}
    </div>
  `}function Ae(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}let Za=null,Hi=!1,An=[];async function mp(){if(!Ja(["director","admin"],X))return;const i=document.getElementById("app");i.innerHTML=$e(`
    <div style="padding: 24px 0;">
      <div class="loading-overlay" style="min-height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div class="spinner spinner-lg"></div>
        <div style="margin-top: 16px; color: var(--text-secondary); font-weight: 500;">
          Initializing Governance Intelligence Engine...
        </div>
      </div>
    </div>
  `,"/governance"),Ee();try{An=(await be.listTypes().catch(()=>({data:[]}))).data||[],await Sr()}catch(n){ee(n.message||"Failed to load governance intelligence"),fp(n.message)}}async function Sr(){Hi=!0,js();try{const i=await $d.analyze();if(i&&i.success)Za=i.data,we("Governance telemetry updated");else throw new Error((i==null?void 0:i.error)||"Analysis returned invalid response")}catch(i){ee(i.message||"Governance analysis failed")}finally{Hi=!1,js()}}function js(){const i=document.getElementById("app");if(!i)return;if(!Za&&Hi){i.innerHTML=$e(`
      <div style="padding: 32px 0;">
        <div class="loading-overlay" style="min-height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <div class="spinner spinner-lg"></div>
          <div style="margin-top: 16px; color: var(--text-secondary); font-weight: 600;">
            Running Deterministic Rules & Telemetry Pipeline...
          </div>
        </div>
      </div>
    `,"/governance",An),Ee();return}const n=Za||{},o=n.summary_metrics||{},s=n.process_health||{pipeline:[]},l=n.exceptions||[],c=n.stakeholder_intelligence||[],u=n.ai_summary||null,p=n.analysis_mode==="AI_ASSISTED",h=`
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
            <span style="background: ${p?"rgba(147, 51, 234, 0.12)":"rgba(100, 116, 139, 0.12)"}; color: ${p?"#9333ea":"#475569"}; border: 1px solid ${p?"rgba(147, 51, 234, 0.3)":"rgba(100, 116, 139, 0.25)"}; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
              ${p?`
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
            Target Module: <strong style="color: var(--text-primary);">${Ae(n.entity_type_name||"Donation Transaction")}</strong> • 
            Telemetry analyzed at ${n.analyzed_at?new Date(n.analyzed_at).toLocaleTimeString():"now"}
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <button id="btn-reanalyze" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 600;" ${Hi?"disabled":""}>
            ${Hi?`
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
          <div style="font-size: 2rem; font-weight: 800; color: var(--text-primary); margin: 6px 0 2px 0;">${o.total_transactions??0}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Transactions tracked</div>
        </div>

        <div class="card" style="padding: 18px; border-top: 4px solid #16a34a;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Verified</div>
          <div style="font-size: 2rem; font-weight: 800; color: #16a34a; margin: 6px 0 2px 0;">${o.verified_count??0}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Confirmed verification</div>
        </div>

        <div class="card" style="padding: 18px; border-top: 4px solid #ea580c;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Pending Verification</div>
          <div style="font-size: 2rem; font-weight: 800; color: #ea580c; margin: 6px 0 2px 0;">${o.pending_verification_count??0}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Awaiting officer review</div>
        </div>

        <div class="card" style="padding: 18px; border-top: 4px solid #dc2626;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Failed Verification</div>
          <div style="font-size: 2rem; font-weight: 800; color: #dc2626; margin: 6px 0 2px 0;">${o.failed_verification_count??0}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Process failures flagged</div>
        </div>

        <div class="card" style="padding: 18px; border-top: 4px solid #ca8a04;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Unreconciled</div>
          <div style="font-size: 2rem; font-weight: 800; color: #ca8a04; margin: 6px 0 2px 0;">${o.unresolved_reconciliation_count??0}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Bank matching pending</div>
        </div>

        <div class="card" style="padding: 18px; border-top: 4px solid #9333ea;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Exceptions Flagged</div>
          <div style="font-size: 2rem; font-weight: 800; color: #9333ea; margin: 6px 0 2px 0;">${l.length}</div>
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
          ${(s.pipeline||[]).map((g,v)=>{const b=g.exception_count>0;return`
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
                  ${Ae(g.label||g.stage)}
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
      ${u?`
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
              AI: ${Ae(u.analysis_mode||"AI")}
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 18px;">
            <div>
              <h3 style="font-size: 13px; font-weight: 700; color: #581c87; text-transform: uppercase; margin-bottom: 6px;">
                Pipeline Velocity Assessment
              </h3>
              <p style="font-size: 13px; line-height: 1.6; color: #374151; margin: 0;">
                ${Ae(u.process_health_narrative||"Pipeline telemetry shows operational stages operating within standard thresholds.")}
              </p>
            </div>
            <div>
              <h3 style="font-size: 13px; font-weight: 700; color: #581c87; text-transform: uppercase; margin-bottom: 6px;">
                Control Gap Concentration
              </h3>
              <p style="font-size: 13px; line-height: 1.6; color: #374151; margin: 0;">
                ${Ae(u.risk_narrative||"Exceptions detected require periodic verification per standard governance protocols.")}
              </p>
            </div>
          </div>

          ${Array.isArray(u.recommendations)&&u.recommendations.length>0?`
            <div style="background: #ffffff; border: 1px solid #e9d5ff; border-radius: 8px; padding: 14px 18px;">
              <h3 style="font-size: 12px; font-weight: 700; color: #6b21a8; text-transform: uppercase; margin-bottom: 8px;">
                Recommended Corrective Governance Actions
              </h3>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #4b5563;">
                ${u.recommendations.map(g=>`<li>${Ae(g)}</li>`).join("")}
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
            ${l.length} Active Observations
          </span>
        </div>

        ${l.length===0?`
          <div style="text-align: center; padding: 32px; color: var(--text-secondary);">
            <div style="font-size: 2rem; margin-bottom: 8px;">✓</div>
            <strong>Zero Exceptions Detected</strong>
            <p style="font-size: 13px; margin-top: 4px;">All transactions strictly satisfy configured governance and state-sync rules.</p>
          </div>
        `:`
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${l.map(g=>`
              <div style="border: 1px solid var(--gray-200); border-left: 4px solid #f59e0b; border-radius: 8px; padding: 16px; background: #ffffff;">
                <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 11px; font-weight: 700; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-family: monospace;">
                      ${Ae(g.trigger_rule)}
                    </span>
                    <strong style="font-size: 14px; color: var(--text-primary);">
                      ${Ae(g.observation)}
                    </strong>
                  </div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 10px; font-weight: 700; background: var(--gray-100); color: var(--gray-700); padding: 2px 6px; border-radius: 4px;">
                      MODE: ${Ae(g.analysis_mode||"DETERMINISTIC")}
                    </span>
                    ${g.requires_human_review?`
                      <span style="font-size: 10px; font-weight: 700; background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px;">
                        HUMAN REVIEW REQUIRED
                      </span>
                    `:""}
                  </div>
                </div>

                <div style="background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: 6px; padding: 10px 14px; margin-bottom: 10px; font-family: monospace; font-size: 12px; color: #1e293b;">
                  <strong>Evidence:</strong> ${Ae(g.evidence)}
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; font-size: 12.5px;">
                  <div>
                    <span style="color: var(--text-secondary); font-weight: 600;">Possible Process Weakness:</span>
                    <div style="color: var(--text-primary); margin-top: 2px;">${Ae(g.possible_cause)}</div>
                  </div>
                  <div>
                    <span style="color: var(--text-secondary); font-weight: 600;">Governance Recommendation:</span>
                    <div style="color: var(--text-primary); margin-top: 2px;">${Ae(g.recommendation)}</div>
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
                    ${Ae(g.stakeholder)}
                  </strong>
                  <span style="font-size: 10px; font-weight: 700; background: var(--gray-200); color: var(--gray-700); padding: 2px 6px; border-radius: 4px;">
                    ${Ae(g.analysis_mode||"DETERMINISTIC")}
                  </span>
                </div>
                
                <div style="margin-bottom: 10px;">
                  <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Core Responsibility</div>
                  <div style="font-size: 13px; color: var(--text-primary); margin-top: 2px;">${Ae(g.interest)}</div>
                </div>

                <div style="margin-bottom: 10px;">
                  <div style="font-size: 11px; font-weight: 700; color: #b91c1c; text-transform: uppercase;">Governance Concern</div>
                  <div style="font-size: 13px; color: #7f1d1d; margin-top: 2px;">${Ae(g.concern)}</div>
                </div>

                <div style="margin-bottom: 12px;">
                  <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Relevant Process Stage</div>
                  <div style="font-size: 12.5px; color: var(--text-primary); margin-top: 2px; font-family: monospace;">${Ae(g.relevant_process)}</div>
                </div>
              </div>

              <div style="background: #ffffff; border: 1px solid var(--gray-200); border-radius: 6px; padding: 10px; font-size: 12px; color: #334155;">
                <strong style="color: var(--text-secondary); display: block; margin-bottom: 2px; font-size: 11px; text-transform: uppercase;">Live Telemetry Evidence:</strong>
                ${Ae(g.evidence)}
              </div>
            </div>
          `).join("")}
        </div>
      </div>

    </div>
  `;i.innerHTML=$e(h,"/governance",An),Ee();const f=document.getElementById("btn-reanalyze");f&&f.addEventListener("click",()=>{Sr()})}function fp(i){const n=document.getElementById("app");n&&(n.innerHTML=$e(`
    <div style="padding: 40px 0; text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
      <h2 style="font-size: 1.5rem; color: var(--text-primary); margin-bottom: 8px;">Governance Intelligence Error</h2>
      <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 20px auto;">
        ${Ae(i||"Unable to execute governance analysis.")}
      </p>
      <button class="btn btn-primary" onclick="window.location.reload()">Retry</button>
    </div>
  `,"/governance",An),Ee())}let Oi=null,_n=!1,Va=null,ft=null;function qe(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function Tr(i){return qe(i).replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br>")}function Mr(i){return!i||isNaN(i)?"":i<1024?i+" B":i<1024*1024?(i/1024).toFixed(1)+" KB":(i/(1024*1024)).toFixed(1)+" MB"}function gp(i,n=null){let o="";n&&(n.isImage&&n.previewUrl?o=`
        <div class="agent-user-attachment">
          <img src="${qe(n.previewUrl)}" alt="${qe(n.name)}" class="agent-attachment-thumb" />
          <div class="agent-attachment-meta">
            <span class="agent-attachment-name">📷 ${qe(n.name)}</span>
            <span class="agent-attachment-size">${qe(n.sizeStr)}</span>
          </div>
        </div>
      `:o=`
        <div class="agent-user-attachment agent-attachment-doc">
          <span class="agent-attachment-icon">📄</span>
          <div class="agent-attachment-meta">
            <span class="agent-attachment-name">${qe(n.name)}</span>
            <span class="agent-attachment-size">${qe(n.sizeStr)}</span>
          </div>
        </div>
      `);const s=i?`<div class="agent-bubble-text">${qe(i)}</div>`:"";return`
    <div class="agent-msg-row agent-msg-user">
      <div class="agent-bubble agent-bubble-user">
        ${o}
        ${s}
      </div>
    </div>
  `}function Wa(i){return`
    <div class="agent-msg-row agent-msg-agent">
      <div class="agent-bubble-avatar" aria-hidden="true">
        <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      </div>
      <div class="agent-bubble agent-bubble-agent">${Tr(i)}</div>
    </div>
  `}function vp(i,n){const o=Array.isArray(i)?i.map(l=>`
        <div class="agent-confirm-row ${l.isFile?"agent-confirm-file-row":""}">
          <span class="agent-confirm-label">${qe(l.label)}</span>
          <span class="agent-confirm-value">${qe(l.value)}</span>
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
          Submission Summary — Please Review
        </div>
        ${n?`<p style="color:var(--text-secondary); font-size:0.875rem; margin-bottom:12px;">${Tr(n.split(`

`)[0])}</p>`:""}
        <div class="agent-confirm-table">${o}</div>
        <div class="agent-confirm-note" style="margin-top:10px; font-size:0.75rem; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
          <span>📎</span> <span>Uploaded photo/document evidence will be attached directly to your official submission.</span>
        </div>
        <div class="agent-confirm-actions" id="agent-confirm-btns">
          <button id="agent-submit-btn" class="btn btn-primary" style="min-width:120px;">
            ✓ Submit
          </button>
          <button id="agent-cancel-btn" class="btn btn-secondary" style="min-width:100px;">
            ✗ Cancel
          </button>
        </div>
      </div>
    </div>
  `}function yp(i,n,o,s=[]){const l=Array.isArray(s)&&s.length>0?`<div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:12px; display:flex; align-items:center; gap:4px;">
         <span>📎</span> <span>Attached evidence: <strong>${s.map(qe).join(", ")}</strong></span>
       </div>`:"";return`
    <div class="agent-msg-row agent-msg-agent">
      <div class="agent-bubble-avatar" style="background:var(--green-600);" aria-hidden="true">
        <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <div class="agent-success-card">
        <div style="font-weight:700; font-size:1rem; color:var(--green-700); margin-bottom:6px;">
          ✅ ${qe(o)} Submitted!
        </div>
        <div style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:8px;">
          <strong>#${i}</strong> — ${qe(n)}
        </div>
        ${l}
        <a href="/entities/${i}" class="btn btn-sm btn-primary" style="display:inline-flex; align-items:center; gap:6px;">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          View My Request
        </a>
        <button id="agent-new-request-btn" class="btn btn-sm btn-ghost" style="margin-left:8px;">
          + Start New Request
        </button>
      </div>
    </div>
  `}function bp(){return`
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
  `}function wp(){return document.getElementById("agent-thread")}function Ga(){return document.getElementById("agent-input")}function xp(){return document.getElementById("agent-send-btn")}function _p(){return document.getElementById("agent-attach-btn")}function Ir(){return document.getElementById("agent-file-input")}function li(i){const n=wp();if(!n)return;const o=document.createElement("div");for(o.innerHTML=i;o.firstChild;)n.appendChild(o.firstChild);n.scrollTop=n.scrollHeight}function Hs(){const i=document.getElementById("agent-thinking");i&&i.remove()}function Pa(i){const n=Ga(),o=xp(),s=_p();n&&(n.disabled=!i),o&&(o.disabled=!i,o.style.opacity=i?"1":"0.5"),s&&(s.disabled=!i,s.style.opacity=i?"1":"0.5")}function so(){var s;const i=document.getElementById("agent-file-preview-bar");if(!i)return;if(!ft){i.innerHTML="",i.style.display="none";return}const n=ft.type.startsWith("image/"),o=n?URL.createObjectURL(ft):null;i.style.display="flex",i.innerHTML=`
    <div class="agent-preview-chip">
      ${n?`<img src="${o}" class="agent-preview-thumb" alt="Preview" />`:'<span class="agent-preview-icon">📄</span>'}
      <div class="agent-preview-info">
        <span class="agent-preview-filename">${qe(ft.name)}</span>
        <span class="agent-preview-filesize">${Mr(ft.size)}</span>
      </div>
      <button type="button" id="agent-remove-file-btn" class="agent-preview-remove" title="Remove attachment" aria-label="Remove attachment">&times;</button>
    </div>
  `,(s=document.getElementById("agent-remove-file-btn"))==null||s.addEventListener("click",()=>{ft=null;const l=Ir();l&&(l.value=""),so()})}async function Di(i,n=null){const o=n||ft,s=(i||"").trim();if(_n||!s&&!o)return;_n=!0;let l=null;if(o){const p=o.type.startsWith("image/");l={name:o.name,sizeStr:Mr(o.size),isImage:p,previewUrl:p?URL.createObjectURL(o):null}}const c=Ga();c&&(c.value="",c.style.height="auto"),ft=null;const u=Ir();u&&(u.value=""),so(),li(gp(s||(o?`Uploaded: ${o.name}`:""),l)),Pa(!1),li(bp());try{const p=Fi(),h=dr(p),f=await zn.chat(Oi,h+s,o);Hs();const g=f.data;Va=null,g.type==="confirm"?(Va=g,li(vp(g.summary||[],g.text)),setTimeout(()=>{const v=document.getElementById("agent-submit-btn"),b=document.getElementById("agent-cancel-btn");v&&v.addEventListener("click",()=>{var w;(w=document.getElementById("agent-confirm-btns"))==null||w.remove(),Di("yes")}),b&&b.addEventListener("click",()=>{var w;(w=document.getElementById("agent-confirm-btns"))==null||w.remove(),Di("cancel")})},50)):g.type==="submitted"?(li(yp(g.entity_id,g.entity_name,g.capability,g.files)),Pa(!1),setTimeout(()=>{const v=document.getElementById("agent-new-request-btn");v&&v.addEventListener("click",()=>{X("/agent/chat")})},50)):li(Wa(g.text||"Something went wrong. Please try again."))}catch(p){Hs(),li(Wa("Sorry, I encountered an error processing your request. Please try again or use the manual form.")),console.error("[Agent Chat] Error:",p)}finally{if(_n=!1,document.getElementById("agent-input")){Pa(!0);const p=Ga();p&&!p.disabled&&p.focus()}}}async function kp(i={},n=null){if(!yt(X))return;Oi=null,_n=!1,Va=null,ft=null;const o=n||new URLSearchParams(window.location.search),s=o.get("sessionId"),l=o.get("message");Oi=s||"ck-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,9);const c=document.getElementById("app");c.innerHTML=$e(`
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
          <div style="font-weight:700; font-size:0.95rem;">CIVIC-KALKI Assistant</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">
            Report problems · Upload photo evidence · Start initiatives · Check request status
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

      <div id="agent-thread" role="log" aria-live="polite" aria-label="Conversation with Civic Assistant">
        <!-- Initial greeting -->
        ${Wa(`Hello! I'm your CIVIC-KALKI assistant. I can help you:

**1.** Report a civic problem (potholes, garbage, water supply, broken street lights…)
     *Tip: You can attach photo/document evidence directly using the 📎 button! Our AI will analyze the photo and fill the details for you.*
**2.** Start a civic initiative (community project, campaign…)
**3.** Check the status of your existing requests

What would you like to do today?`)}
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
  `,"Civic Assistant"),Ee();const u=document.getElementById("agent-loc-btn"),p=document.getElementById("agent-loc-status"),h=document.getElementById("agent-loc-text");function f(x){p&&(p.style.display="flex"),h&&(h.textContent=x.area),u&&(u.style.display="none")}const g=Fi();g?f(g):rr()||u&&(u.style.display=""),u==null||u.addEventListener("click",async()=>{u&&(u.textContent="⏳ Detecting…",u.disabled=!0);try{const x=await lr();f(x)}catch{u&&(u.textContent="📍 Share location",u.disabled=!1)}});const v=document.getElementById("agent-input"),b=document.getElementById("agent-send-btn"),w=document.getElementById("agent-attach-btn"),z=document.getElementById("agent-file-input");!v||!b||(w==null||w.addEventListener("click",()=>{z==null||z.click()}),z==null||z.addEventListener("change",x=>{var C;const I=(C=x.target.files)==null?void 0:C[0];I&&(ft=I,so(),v.focus())}),v.addEventListener("input",()=>{v.style.height="auto",v.style.height=Math.min(v.scrollHeight,120)+"px"}),v.addEventListener("keydown",x=>{x.key==="Enter"&&!x.shiftKey&&(x.preventDefault(),Di(v.value))}),b.addEventListener("click",()=>{Di(v.value)}),l&&l.trim()?setTimeout(()=>Di(decodeURIComponent(l)),120):v.focus(),window.addEventListener("beforeunload",()=>{Oi&&zn.clearSession(Oi)},{once:!0}))}function Pt(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const Ds={relatable:{primary:"#FF6B35",secondary:"#1A1A2E",accent:"#FFD700",text:"#FFFFFF"},awareness:{primary:"#2E86AB",secondary:"#1A1A2E",accent:"#A8DADC",text:"#FFFFFF"},cta:{primary:"#43AA8B",secondary:"#1A1A2E",accent:"#F8961E",text:"#FFFFFF"}};function zp(i){const{template_type:n="awareness",headline:o,caption:s,locality:l,category:c,photoUrl:u,exportMode:p=!1}=i,h=Ds[n]||Ds.awareness,f=u?`background-image:url('${u}'); background-size:cover; background-position:center;`:`background:linear-gradient(135deg, ${h.secondary} 0%, #2d2d44 100%);`,g={relatable:"?? Relatable",awareness:"?? Awareness",cta:"CTA"}[n]||"?? Awareness",v={relatable:`
      <div style="background:rgba(0,0,0,0.65);backdrop-filter:blur(4px);padding:16px 20px;border-radius:12px;margin:0 0 8px 0;">
        <div style="font-size:22px;font-weight:800;color:${h.accent};letter-spacing:-0.5px;line-height:1.2;margin-bottom:10px;">${Pt(o)}</div>
        <div style="font-size:15px;color:#fff;line-height:1.5;">${Pt(s)}</div>
      </div>
    `,awareness:`
      <div style="background:rgba(46,134,171,0.85);backdrop-filter:blur(4px);padding:16px 20px;border-radius:12px;margin:0 0 8px 0;border-left:4px solid ${h.accent};">
        <div style="font-size:12px;color:${h.accent};font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">CIVIC ISSUE — ${Pt(c||"Infrastructure")}</div>
        <div style="font-size:20px;font-weight:700;color:#fff;line-height:1.2;margin-bottom:8px;">${Pt(o)}</div>
        <div style="font-size:14px;color:#ddd;line-height:1.5;">${Pt(s)}</div>
      </div>
    `,cta:`
      <div style="background:rgba(0,0,0,0.75);backdrop-filter:blur(4px);padding:16px 20px;border-radius:12px;margin:0 0 8px 0;">
        <div style="font-size:20px;font-weight:800;color:${h.accent};line-height:1.2;margin-bottom:8px;">${Pt(o)}</div>
        <div style="font-size:14px;color:#fff;line-height:1.5;margin-bottom:12px;">${Pt(s)}</div>
        <div style="display:inline-block;background:${h.primary};color:#fff;padding:8px 16px;border-radius:20px;font-size:13px;font-weight:700;">Report &amp; Support ?</div>
      </div>
    `}[n]||"";return`
    <div class="${p?"":"ck-meme-card"}" id="meme-preview-canvas" style="
      width:360px;
      min-height:400px;
      border-radius:${p?"0":"16px"};
      overflow:hidden;
      position:relative;
      font-family:'Inter','Segoe UI',sans-serif;
      ${f}
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
        ?? ${Pt(l)}
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
  `}function je(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}let E={step:1,issueId:null,issue:null,config:null,myIssues:[],category:"",locality:"",photoFile:null,photoPreviewUrl:null,eligibility:null,templateType:null,aiOptions:[],selectedOption:null,editedHeadline:"",editedCaption:"",captionSource:"manual",originalAiSuggestion:null,safetyResult:null,attestationAccepted:!1,submitting:!1};async function Ar({issueId:i}){if(!yt(X))return;const n=document.getElementById("app");n.innerHTML=$e(`
    <div class="page-header mb-4">
      <div class="topbar-breadcrumb mb-2">
        ${i?`<a href="/entities/${i}" class="text-link">Back to Issue</a>`:'<a href="/buzz" class="text-link">Back to Civic Buzz</a>'}
      </div>
      <h1>Civic Buzz Studio</h1>
      <p class="text-secondary" style="margin-top:4px;">Create civic awareness content. Every post requires moderator approval before publication.</p>
    </div>
    <div id="meme-studio-body"></div>
  `,"Civic Buzz Studio"),Ee(),E.photoPreviewUrl&&URL.revokeObjectURL(E.photoPreviewUrl),E={...E,step:1,issueId:i?Number(i):null,issue:null,eligibility:null,config:null,myIssues:[],category:"",locality:"",photoFile:null,photoPreviewUrl:null},await Lp(i)}async function Lp(i){const n=document.getElementById("meme-studio-body");n.innerHTML='<div class="loading-overlay"><div class="spinner spinner-lg"></div></div>';try{const[o,s]=await Promise.all([D("GET","/meme/config"),D("GET","/meme/my-issues")]);if(E.config=o.data,E.myIssues=s.data||[],i){if(E.issue=E.myIssues.find(l=>Number(l.issue_id)===Number(i))||null,!E.issue){$p(n,"Only your own approved issues can be linked.");return}E.category=E.issue.category,E.locality=E.issue.locality}Ep(n)}catch(o){n.innerHTML=`<div class="alert alert-error">${je(o.message||"Failed to load issue.")}</div>`}}function $p(i,n){i.innerHTML=`
    <div class="alert alert-warning" style="max-width:600px;">
      <strong>? Cannot Create Meme Campaign</strong>
      <p style="margin-top:8px;">${je(n)}</p>
      <p style="margin-top:8px;color:var(--text-secondary);font-size:0.875rem;">
        If this is a serious matter (crime, harassment, communal issues), please
        <a href="/entities/new" class="text-link">file a Grievance</a> instead.
      </p>
    </div>
  `}function Ep(i){var u;const n=E.config.categories||[],o=E.config.localities||[],s=((u=E.issue)==null?void 0:u.issue_id)||"";i.innerHTML=`
    <div class="ck-studio-wizard" style="max-width:720px;">
      <h2 class="mb-2">Start a Civic Buzz post</h2>
      <p class="text-secondary mb-4">Add an issue photo, choose its category and locality, then send it for moderator review.</p>
      <label class="form-label" for="buzz-photo">Photo</label>
      <input id="buzz-photo" class="form-input mb-3" type="file" accept="image/*" capture="environment" />
      <div id="buzz-photo-preview" class="mb-4"></div>
      <label class="form-label" for="buzz-category">Category</label>
      <select id="buzz-category" class="form-input mb-3" ${s?"disabled":""}>
        <option value="">Choose a category</option>
        ${n.map(p=>`<option value="${je(p)}" ${p===E.category?"selected":""}>${je(p)}</option>`).join("")}
      </select>
      <label class="form-label" for="buzz-locality">Locality</label>
      <select id="buzz-locality" class="form-input mb-3" ${s?"disabled":""}>
        <option value="">Unassigned</option>
        ${o.map(p=>`<option value="${je(p)}" ${p===E.locality?"selected":""}>${je(p)}</option>`).join("")}
      </select>
      <label class="form-label" for="buzz-linked-issue">Link one of my approved issues (optional)</label>
      <select id="buzz-linked-issue" class="form-input mb-3">
        <option value="">Standalone post</option>
        ${E.myIssues.map(p=>`<option value="${p.issue_id}" ${Number(p.issue_id)===Number(s)?"selected":""}>${je(p.name)} (${je(p.category)})</option>`).join("")}
      </select>
      <div id="buzz-category-feedback" aria-live="polite" class="mb-3"></div>
      <button id="buzz-details-next" class="btn btn-primary" type="button" disabled onclick="window._memeStartBuzz()">Continue</button>
    </div>
  `;const l=document.getElementById("buzz-photo");l.addEventListener("change",()=>{var h;const p=((h=l.files)==null?void 0:h[0])||null;E.photoFile=p,E.photoPreviewUrl&&URL.revokeObjectURL(E.photoPreviewUrl),E.photoPreviewUrl=p?URL.createObjectURL(p):null,document.getElementById("buzz-photo-preview").innerHTML=E.photoPreviewUrl?`<img src="${E.photoPreviewUrl}" alt="Selected photo preview" style="max-width:100%;max-height:320px;border-radius:12px;" />`:"",c()}),document.getElementById("buzz-category").addEventListener("change",p=>{E.category=p.target.value,c()}),document.getElementById("buzz-locality").addEventListener("change",p=>{E.locality=p.target.value||"Unassigned"}),document.getElementById("buzz-linked-issue").addEventListener("change",p=>{const h=E.myIssues.find(f=>String(f.issue_id)===p.target.value)||null;E.issue=h,E.issueId=(h==null?void 0:h.issue_id)||null,h&&(E.category=h.category,E.locality=h.locality||"Unassigned",document.getElementById("buzz-category").value=E.category,document.getElementById("buzz-locality").value=E.locality==="Unassigned"?"":E.locality),document.getElementById("buzz-category").disabled=!!h,document.getElementById("buzz-locality").disabled=!!h,c()});function c(){const p=E.category.toLowerCase(),h=E.config.no_meme_categories.some(v=>p.includes(v.toLowerCase())),f=E.config.humor_allowed_categories.includes(p),g=h?'<div class="alert alert-error">This category cannot be used for Civic Buzz. Please use the <a href="/entities/new" class="text-link">Grievance form</a>.</div>':E.config.safety_sensitive_categories.some(v=>p.includes(v.toLowerCase()))?'<div class="alert alert-warning">Only neutral Awareness and CTA templates are available for this safety-sensitive category.</div>':!f&&p?'<div class="alert alert-info">Only Awareness and CTA templates are available for this category.</div>':"";document.getElementById("buzz-category-feedback").innerHTML=g,document.getElementById("buzz-details-next").disabled=!E.photoFile||!p||h}window._memeStartBuzz=()=>{const p=E.category.toLowerCase(),h=E.config.no_meme_categories.some(v=>p.includes(v.toLowerCase()));if(!E.photoFile||!p||h)return;const f=E.config.safety_sensitive_categories.some(v=>p.includes(v.toLowerCase())),g=E.config.humor_allowed_categories.includes(p);E.eligibility={eligible:!0,templateTypes:f?["awareness","cta"]:g?["relatable","awareness","cta"]:["awareness","cta"]},Pr(i)}}function Pr(i){E.step=1;const n=E.eligibility.templateTypes||[],o={relatable:{icon:"??",name:"Relatable",desc:`Light situational humor that makes people nod. "We've all been there." Perfect for everyday civic frustrations.`},awareness:{icon:"??",name:"Awareness",desc:"Factual, informative content that raises visibility for an issue. Facts from the actual report only."},cta:{icon:"??",name:"Call to Action",desc:"Energizing content that encourages citizens to report, support, or take action together."}};i.innerHTML=`
    <div class="ck-studio-wizard">
      ${vi(2)}
      <h2 class="mb-2">Choose a Template</h2>
      <p class="text-secondary mb-4">Pick the tone that best fits this issue.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;max-width:720px;">
        ${n.map(s=>{const l=o[s]||{icon:"??",name:s,desc:""};return`
            <button class="ck-template-card" data-template="${s}" onclick="window._memePickTemplate('${s}')">
              <div style="font-size:2.5rem;margin-bottom:8px;">${l.icon}</div>
              <div style="font-weight:700;font-size:1rem;margin-bottom:6px;">${l.name}</div>
              <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.4;">${l.desc}</div>
            </button>
          `}).join("")}
      </div>
    </div>
  `,window._memePickTemplate=s=>{E.templateType=s,Br(i)}}async function Br(i){E.step=2,i.innerHTML=`
    <div class="ck-studio-wizard">
      ${vi(3)}
      <h2 class="mb-2">Caption Your Meme</h2>
      <div class="loading-overlay" style="position:static;height:80px;"><div class="spinner"></div></div>
      <p class="text-secondary">Generating AI caption suggestions...</p>
    </div>
  `;let n={options:[],ai_unavailable:!1};try{n=(await D("POST","/meme/captions",{issue_id:E.issueId||null,category:E.category,locality:E.locality,template:E.templateType})).data}catch(h){n={options:[],ai_unavailable:!0,reason:h.message||"AI unavailable."}}E.aiOptions=n.options||[];const o=n.ai_unavailable?`<div class="alert alert-warning mb-3" style="max-width:640px;">
        <strong>?? AI Unavailable</strong>
        <p style="margin-top:4px;font-size:0.875rem;">${je(n.reason||"AI caption service is temporarily unavailable. Please write your own caption below.")}</p>
        <p style="font-size:0.75rem;color:var(--text-secondary);">Note: Automated safety check flagged as "unavailable" — moderator will review manually.</p>
      </div>`:"",s=E.aiOptions.length>0?`
      <div class="mb-3" style="max-width:640px;">
        <label class="form-label mb-2"><strong>AI Suggestions (select one to pre-fill):</strong></label>
        ${E.aiOptions.map((h,f)=>`
          <button class="ck-caption-option" onclick="window._memeSelectOption(${f})" id="capopt-${f}" style="display:block;width:100%;text-align:left;padding:12px 16px;margin-bottom:8px;border-radius:8px;border:2px solid var(--border-color);background:var(--bg-secondary);cursor:pointer;">
            <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);">${je(h.headline)}</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">${je(h.caption)}</div>
          </button>
        `).join("")}
      </div>
    `:"";i.innerHTML=`
    <div class="ck-studio-wizard" style="max-width:720px;">
      ${vi(3)}
      <h2 class="mb-2">Caption Your Meme</h2>
      ${o}
      ${s}

      <div class="mb-3">
        <label class="form-label" for="meme-headline">Headline <span style="color:var(--text-muted);font-size:0.8rem;">(max 60 chars)</span></label>
        <input id="meme-headline" class="form-input" type="text" maxlength="60"
          placeholder="e.g. Pothole life got real"
          value="${je(E.editedHeadline)}"
          oninput="window._memeSafetyCheck()"
        />
        <div id="headline-chars" style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">0 / 60</div>
      </div>

      <div class="mb-3">
        <label class="form-label" for="meme-caption">Caption <span style="color:var(--text-muted);font-size:0.8rem;">(max 140 chars)</span></label>
        <textarea id="meme-caption" class="form-input" rows="3" maxlength="140"
          placeholder="e.g. Me checking the same pothole every day like it's a long-term relationship."
          oninput="window._memeSafetyCheck()"
        >${je(E.editedCaption)}</textarea>
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
  `,p(),window._memeSelectOption=h=>{const f=E.aiOptions[h];f&&(E.selectedOption=f,E.editedHeadline=f.headline,E.editedCaption=f.caption,E.captionSource="ai",E.originalAiSuggestion=f,document.getElementById("meme-headline").value=f.headline,document.getElementById("meme-caption").value=f.caption,E.aiOptions.forEach((g,v)=>{const b=document.getElementById(`capopt-${v}`);b&&(b.style.borderColor=v===h?"var(--accent-primary)":"var(--border-color)")}),window._memeSafetyCheck())};let l;window._memeSafetyCheck=()=>{p(),clearTimeout(l),l=setTimeout(c,500)};async function c(){var g,v,b,w,z,x,I,C;const h=((g=document.getElementById("meme-headline"))==null?void 0:g.value)||"",f=((v=document.getElementById("meme-caption"))==null?void 0:v.value)||"";if(!h&&!f){u("",!1);return}E.captionSource==="ai"?(h!==(((b=E.selectedOption)==null?void 0:b.headline)||"")||f!==(((w=E.selectedOption)==null?void 0:w.caption)||""))&&(E.captionSource="ai_edited"):E.captionSource="manual",E.editedHeadline=h,E.editedCaption=f,u('<span style="color:var(--text-muted);">Checking...</span>',!1);try{const _=await D("POST","/meme/safety-check",{headline:h,caption:f,issue_id:E.issueId,category:E.category,template:E.templateType});if(E.safetyResult=_.data,_.data.passed)u('<span style="color:var(--success);">? Caption looks good!</span>',!0);else{const B=[...((z=_.data.deterministic)==null?void 0:z.violations)||[],...((x=_.data.ai_safety)==null?void 0:x.violations)||[]],O=((I=_.data.ai_safety)==null?void 0:I.status)==="unavailable",G=B.map(H=>`<li>${je(H)}</li>`).join(""),ae=O?'<li style="color:var(--warning);">AI safety check unavailable. This post will be flagged for moderator review.</li>':"",U=((C=_.data.deterministic)==null?void 0:C.passed)===!0;u(`<div class="alert ${U&&O?"alert-warning":"alert-error"}" style="margin:0;padding:8px 12px;"><ul style="margin:0;padding-left:18px;">${G}${ae}</ul></div>`,U&&O)}}catch{E.safetyResult={passed:!1,deterministic:{passed:!1,violations:["Safety check unavailable."]},ai_safety:{safe:!1,violations:[],status:"unavailable"}},u('<span style="color:var(--warning);">Safety check unavailable. This post will be flagged for moderator review.</span>',!0)}}function u(h,f){const g=document.getElementById("safety-feedback");g&&(g.innerHTML=h);const v=document.getElementById("step2-next");v&&(v.disabled=!f)}function p(){const h=document.getElementById("meme-headline"),f=document.getElementById("meme-caption"),g=document.getElementById("headline-chars"),v=document.getElementById("caption-chars");h&&g&&(g.textContent=`${h.value.length} / 60`),f&&v&&(v.textContent=`${f.value.length} / 140`)}window._memeGoStep=h=>{h===1&&Pr(i)},window._memeGoStep3=()=>{var h,f;E.editedHeadline=((h=document.getElementById("meme-headline"))==null?void 0:h.value)||"",E.editedCaption=((f=document.getElementById("meme-caption"))==null?void 0:f.value)||"",Rr(i)}}function Rr(i){E.step=3,i.innerHTML=`
    <div class="ck-studio-wizard" style="max-width:600px;">
      ${vi(4)}
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
  `,window._memeAttestCheck=n=>{E.attestationAccepted=n;const o=document.getElementById("step3-next");o&&(o.disabled=!n)},window._memeGoStep=n=>{n===2&&Br(i)},window._memeGoStep4=()=>{if(!E.attestationAccepted){ee("Please accept the attestation to continue.");return}Cp(i)}}function Cp(i){var l,c,u,p;E.step=4;const n=E.photoPreviewUrl,o=zp({template_type:E.templateType,headline:E.editedHeadline,caption:E.editedCaption,locality:E.locality||"Unassigned",category:E.category,photoUrl:n,shareLink:E.issueId?`/entities/${E.issueId}`:null}),s=((c=(l=E.safetyResult)==null?void 0:l.ai_safety)==null?void 0:c.status)==="unavailable"?'<div class="alert alert-warning" style="font-size:0.8rem;margin-bottom:12px;max-width:420px;">?? AI safety check was unavailable. Your meme will be flagged for manual moderator review.</div>':"";i.innerHTML=`
    <div class="ck-studio-wizard">
      ${vi(5)}
      <h2 class="mb-2">Preview Your Meme</h2>
      <p class="text-secondary mb-3">This is how your meme will appear in Civic Buzz after approval.</p>

      ${s}

      <div style="display:flex;flex-wrap:wrap;gap:32px;align-items:flex-start;">
        <div>${o}</div>

        <div style="max-width:280px;">
          <div class="mb-3">
            <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Template</div>
            <div style="font-weight:600;">${(u=E.templateType)==null?void 0:u.replace(/_/g," ")}</div>
          </div>
          <div class="mb-3">
            <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Caption Source</div>
            <div>${E.captionSource==="ai"?"?? AI-generated":E.captionSource==="ai_edited"?"?? AI-assisted + edited":"?? Manual"}</div>
          </div>
          <div class="mb-3">
            <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Linked Issue</div>
            ${E.issueId?`<a href="/entities/${E.issueId}" class="text-link">#${E.issueId} - ${je(((p=E.issue)==null?void 0:p.name)||"")}</a>`:"<span>Standalone civic highlight</span>"}
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
  `,window._memeGoStep=h=>{h===3&&Rr(i)},window._memeSubmit=async()=>{if(E.submitting)return;E.submitting=!0;const h=document.getElementById("step4-submit");h&&(h.disabled=!0,h.textContent="Submitting...");try{const g=(await D("POST","/meme/campaigns",{issue_id:E.issueId,category:E.category,locality:E.locality,template:E.templateType,headline:E.editedHeadline,caption:E.editedCaption,caption_source:E.captionSource,original_ai_suggestion:E.originalAiSuggestion,attestation_accepted:!0})).data.campaign.entity_id,v=new FormData;v.append("photo",E.photoFile),await D("POST",`/meme/campaigns/${g}/photo`,null,{body:v,headers:{"X-Requested-With":"ck-web"}}),await D("POST",`/meme/campaigns/${g}/submit`),Sp(i,g)}catch(f){E.submitting=!1,h&&(h.disabled=!1,h.textContent="?? Submit for Review"),ee(f.message||"Submission failed. Please try again.")}}}function Sp(i,n){E.step=5,i.innerHTML=`
    <div class="ck-studio-wizard" style="text-align:center;max-width:520px;margin:0 auto;">
      ${vi(6)}
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
        ${E.issueId?`<a href="/entities/${E.issueId}" class="btn btn-primary">Back to Issue</a>`:""}
      </div>
    </div>
  `}function vi(i){const n=[{n:1,label:"Photo and details"},{n:2,label:"Template"},{n:3,label:"Caption"},{n:4,label:"Attestation"},{n:5,label:"Preview"},{n:6,label:"Done"}];return`
    <div class="ck-studio-steps" style="display:flex;align-items:center;gap:0;margin-bottom:28px;flex-wrap:wrap;">
      ${n.map((o,s)=>`
        <div style="display:flex;align-items:center;">
          <div style="
            width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;
            font-size:0.75rem;font-weight:700;
            background:${o.n<=i?"var(--accent-primary)":"var(--bg-tertiary)"};
            color:${o.n<=i?"#fff":"var(--text-muted)"};
          ">${o.n}</div>
          <div style="font-size:0.75rem;margin-left:6px;color:${o.n===i?"var(--text-primary)":"var(--text-muted)"};">${o.label}</div>
          ${s<n.length-1?'<div style="width:24px;height:2px;background:var(--border-color);margin:0 8px;"></div>':""}
        </div>
      `).join("")}
    </div>
  `}function Lt(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const Fs='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="50%" stop-color="%230f172a"/><stop offset="100%" stop-color="%23ea580c"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g)"/><text x="50%" y="46%" font-family="system-ui,-apple-system,sans-serif" font-weight="900" font-size="28" fill="%23ffffff" text-anchor="middle" letter-spacing="1">CIVIC BUZZ</text><text x="50%" y="56%" font-family="system-ui,-apple-system,sans-serif" font-weight="600" font-size="15" fill="%23fdba74" text-anchor="middle">YOUTH-POWERED CIVIC CONVERSATION</text></svg>';let Rt="trending",Zt=[];async function Tp(){const i=document.getElementById("app"),n=new URLSearchParams(window.location.search),o=n.get("filter");["trending","newest","following"].includes(o)&&(Rt=o);const s=n.get("post");i.innerHTML=$e(`
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
            CIVIC BUZZ <span class="ck-buzz-flame" style="display:inline-flex; align-items:center;">${R.flame(22,"var(--primary)")}</span>
          </h1>
          <p class="ck-buzz-gallery-subtitle">
            Youth-powered civic conversations turning everyday problems into visible municipal accountability.
          </p>
        </div>

        <div class="ck-buzz-gallery-hero-right">
          <button type="button" class="btn btn-primary" id="ck-buzz-gallery-create-btn" style="border-radius:999px; font-weight:700; padding:10px 22px; display:inline-flex; align-items:center; gap:8px;">
            <span>+</span> Create Post
          </button>
        </div>
      </div>

      <!-- Action & Filter Bar -->
      <div class="ck-buzz-filter-bar">
        <div class="ck-buzz-filter-chips">
          <button type="button" class="ck-buzz-chip ${Rt==="trending"?"active":""}" data-filter="trending">
            <span style="display:inline-flex; align-items:center; gap:5px;">${R.flame(13)} Trending</span>
          </button>
          <button type="button" class="ck-buzz-chip ${Rt==="newest"?"active":""}" data-filter="newest">
            <span style="display:inline-flex; align-items:center; gap:5px;">${R.zap(13)} Newest</span>
          </button>
          <button type="button" class="ck-buzz-chip ${Rt==="following"?"active":""}" data-filter="following">
            <span style="display:inline-flex; align-items:center; gap:5px;">${R.user(13)} Following</span>
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
  `,"Civic Buzz"),Ee(),Mp(),await Vi(s)}function Mp(){var i;(i=document.getElementById("ck-buzz-gallery-create-btn"))==null||i.addEventListener("click",()=>{qi(null,()=>Vi())}),document.querySelectorAll(".ck-buzz-chip").forEach(n=>{n.addEventListener("click",async()=>{const o=n.getAttribute("data-filter");if(o!==Rt){if(o==="following"&&!He()){vt("Please sign in to view posts you are following."),X("/login");return}Rt=o,document.querySelectorAll(".ck-buzz-chip").forEach(s=>s.classList.remove("active")),n.classList.add("active"),await Vi()}})})}async function Vi(i=null){const n=document.getElementById("ck-buzz-gallery-content"),o=document.getElementById("ck-buzz-results-count");if(n){n.innerHTML=`
    <div class="ck-buzz-card-skeleton"></div>
    <div class="ck-buzz-card-skeleton"></div>
    <div class="ck-buzz-card-skeleton"></div>
  `,o&&(o.textContent="Loading...");try{if(Zt=(await ge.list({limit:40,sort:Rt})).data||[],o&&(o.textContent=`${Zt.length} civic conversation${Zt.length===1?"":"s"}`),Zt.length===0){Ip(n);return}if(Pp(n,Zt),i){const l=Zt.find(c=>String(c.id)===String(i));l&&wr(l,c=>Ka(c))}}catch(s){Ap(n,s.message)}}}function Ip(i){var o;const n=Rt==="following";i.innerHTML=`
    <div class="ck-buzz-empty-state-wrap">
      <div style="display:flex; justify-content:center; margin-bottom:8px;">${n?R.inbox(38,"#94a3b8"):R.initiative(38,"#10b981")}</div>
      <h3 style="font-size:1.15rem; font-weight:800; color:#0f172a; margin-bottom:6px;">
        ${n?"No followed posts yet":"No Civic Buzz posts found"}
      </h3>
      <p style="font-size:0.84rem; color:#64748b; max-width:440px; margin:0 auto 18px;">
        ${n?"Follow posts on the trending or newest feed to track community updates and discussions.":"Be the first to turn a local issue or neighborhood initiative into a viral civic conversation!"}
      </p>
      <button type="button" class="btn btn-primary" id="ck-buzz-empty-action-btn" style="border-radius:999px; font-weight:700;">
        ${n?"Explore Trending Posts":"+ Create First Post"}
      </button>
    </div>
  `,(o=document.getElementById("ck-buzz-empty-action-btn"))==null||o.addEventListener("click",()=>{var s;n?(s=document.querySelector('.ck-buzz-chip[data-filter="trending"]'))==null||s.click():qi(null,()=>Vi())})}function Ap(i,n){var o;i.innerHTML=`
    <div class="ck-buzz-empty-state-wrap" style="border-color: rgba(239,68,68,0.25); background: rgba(239,68,68,0.04);">
      <div style="display:flex; justify-content:center; color:#ef4444; margin-bottom:8px;">${R.alert(32)}</div>
      <h3 style="font-size:1.05rem; font-weight:700; color:#991b1b; margin-bottom:6px;">
        Failed to load Civic Buzz
      </h3>
      <p style="font-size:0.8rem; color:#64748b; margin-bottom:14px;">${Lt(n)}</p>
      <button type="button" class="btn btn-secondary btn-sm" id="ck-buzz-retry-btn" style="border-radius:999px;">
        Try Again
      </button>
    </div>
  `,(o=document.getElementById("ck-buzz-retry-btn"))==null||o.addEventListener("click",()=>Vi())}function Pp(i,n){i.innerHTML=n.map(o=>{const s=o.image_url||Fs,l=o.linked_title||o.caption,c=o.views_count||0,u=o.vote_count||0,p=o.shares_count||0;return`
      <div class="ck-buzz-card" data-post-id="${o.id}">
        <!-- Media Image with Bold Meme Caption -->
        <div class="ck-buzz-card-media" data-action="open-detail">
          <img src="${Lt(s)}" alt="${Lt(o.caption)}" class="ck-buzz-card-img" onerror="this.src='${Fs}'" />
          <div class="ck-buzz-card-scrim"></div>
          
          <div class="ck-buzz-card-caption">
            ${Lt(o.caption)}
          </div>

          <div class="ck-buzz-card-badges">
            <span class="ck-buzz-badge-pill">
              ${o.template==="initiative"?`<span style="display:inline-flex; align-items:center; gap:4px;">${R.initiative(11)} INITIATIVE</span>`:o.template==="awareness"?`<span style="display:inline-flex; align-items:center; gap:4px;">${R.awareness(11)} AWARENESS</span>`:`<span style="display:inline-flex; align-items:center; gap:4px;">${R.flame(11)} MEME</span>`}
            </span>
            ${o.linked_status?`
              <span class="ck-buzz-status-tag ${Lt(o.linked_status)}">
                ${Lt(o.linked_status)}
              </span>
            `:""}
          </div>
        </div>

        <!-- Details Footer -->
        <div class="ck-buzz-card-details">
          <div class="ck-buzz-card-title-row" data-action="open-detail" style="cursor: pointer;">
            <div class="ck-buzz-card-title" title="${Lt(l)}">
              ${Lt(l)}
            </div>
            ${o.linked_area?`<div class="ck-buzz-card-area" style="display:inline-flex; align-items:center; gap:3px;">${R.pin(11)} ${Lt(o.linked_area)}</div>`:""}
          </div>

          <!-- Stats Line -->
          <div class="ck-buzz-card-stats-line">
            <span style="display:inline-flex; align-items:center; gap:3px;">${R.eye(12)} ${c} views</span>
            <span>·</span>
            <span style="display:inline-flex; align-items:center; gap:3px;">${R.arrowUp(12)} ${u} upvotes</span>
            <span>·</span>
            <span style="display:inline-flex; align-items:center; gap:3px;">${R.share(12)} ${p} shares</span>
          </div>

          <!-- Quick Action Buttons -->
          <div class="ck-buzz-card-bottom-bar">
            <button type="button" class="ck-buzz-quick-vote-btn ${o.has_voted?"active":""}" data-action="quick-vote" data-post-id="${o.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
              <span>${o.has_voted?"Upvoted":"Upvote"}</span>
            </button>

            <button type="button" class="ck-buzz-quick-share-btn" data-action="quick-share" data-post-id="${o.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    `}).join(""),i.addEventListener("click",async o=>{const s=o.target.closest(".ck-buzz-card");if(!s)return;const l=Number(s.getAttribute("data-post-id")),c=Zt.find(h=>h.id===l);if(!c)return;if(o.target.closest('[data-action="quick-vote"]')){if(o.stopPropagation(),!He()){vt("Please sign in to upvote.");return}try{const h=await ge.vote(c.id);c.has_voted=h.voted,c.vote_count=h.vote_count,Ka(c)}catch(h){ee(h.message||"Could not vote")}return}if(o.target.closest('[data-action="quick-share"]')){o.stopPropagation(),Hn(c);return}wr(c,h=>Ka(h))})}function Ka(i){const n=document.querySelector(`.ck-buzz-card[data-post-id="${i.id}"]`);if(!n)return;const o=n.querySelector('[data-action="quick-vote"]');o&&(o.classList.toggle("active",i.has_voted),o.querySelector("span").textContent=i.has_voted?"Upvoted":"Upvote");const s=n.querySelector(".ck-buzz-card-stats-line");s&&(s.innerHTML=`
      <span style="display:inline-flex; align-items:center; gap:4px;">${R.eye(13,"#64748b")} ${i.views_count||0} views</span>
      <span>·</span>
      <span style="display:inline-flex; align-items:center; gap:3px;">${R.arrowUp(13,"#64748b")} ${i.vote_count||0} upvotes</span>
      <span>·</span>
      <span style="display:inline-flex; align-items:center; gap:4px;">${R.share(13,"#64748b")} ${i.shares_count||0} shares</span>
    `)}function Ge(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}async function Bp(i){const n=document.getElementById("app"),o=i==null?void 0:i.id;if(!o||isNaN(Number(o))){Ba("Invalid Civic Buzz post ID.");return}n.innerHTML=$e(`
    <div class="ck-buzz-post-page-wrap">
      <div style="text-align:center; padding: 60px 0;">
        <div class="spinner" style="margin: 0 auto 16px;"></div>
        <p style="color:#64748b; font-weight:600;">Loading Civic Buzz conversation...</p>
      </div>
    </div>
  `,"Civic Buzz"),Ee();try{const l=(await ge.get(o)).data;if(!l){Ba("Civic Buzz post not found or no longer available.");return}ge.logEvent(l.id,"view").catch(()=>{});const c=He(),u=l.linked_type==="initiative";let p="";l.image_url?p=`
        <div style="border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.12); position:relative; background:#0f172a; aspect-ratio:1/1; display:flex; align-items:center; justify-content:center;">
          <img src="${Ge(l.image_url)}" alt="${Ge(l.caption)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='${En}'" />
          <div class="ck-card-watermark">
            <span class="ck-wm-flame">${R.flame(14,"var(--primary)")}</span>
            <span class="ck-wm-brand">CIVIC-KALKI</span>
          </div>
        </div>
      `:p=`
        <div style="border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.12); aspect-ratio:1/1;">
          ${br({template:l.template||"meme",style:l.style||"funny",caption:l.caption,cta_text:l.cta_text,issue:{name:l.linked_title,area:l.linked_area,status:l.linked_status,entity_id:l.linked_id}})}
        </div>
      `,n.innerHTML=$e(`
      <div class="ck-buzz-post-page-wrap">
        <!-- Top Back Navigation -->
        <div style="margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center;">
          <a href="/buzz" class="ck-buzz-back-link" style="display:inline-flex; align-items:center; gap:6px; font-weight:700; color:var(--primary); text-decoration:none;">
            ← Back to Civic Buzz Gallery
          </a>
          <span style="font-size:0.8rem; color:#64748b;">Post #${l.id}</span>
        </div>

        <!-- Main Showcase Card -->
        <div class="ck-buzz-post-view-card">
          <!-- Left: The Visual Card -->
          <div>
            ${p}
          </div>

          <!-- Right: Details, Actions & Conversation -->
          <div style="display:flex; flex-direction:column; justify-content:space-between; gap:20px;">
            <div>
              <!-- Header Badges -->
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="ck-buzz-fire-tag" style="display:inline-flex; align-items:center; gap:4px;">${R.flame(13,"#ea580c")} CIVIC BUZZ</span>
                  <span class="ck-buzz-status-pill ${Ge(l.linked_status||"submitted")}">
                    ${Ge(l.linked_status||"Active")}
                  </span>
                </div>
                <button type="button" class="ck-buzz-icon-btn" id="ck-post-report-btn" title="Report post">
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
                </button>
              </div>

              <!-- Main Caption Headline -->
              <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; line-height: 1.3; margin: 0 0 10px;">
                ${Ge(l.caption)}
              </h2>

              ${l.cta_text?`
                <div style="display:inline-flex; align-items:center; gap:6px; background:#fff7ed; border:1px solid #fed7aa; color:#ea580c; font-weight:700; font-size:0.82rem; padding:4px 12px; border-radius:999px; margin-bottom:14px;">
                  <span style="display:inline-flex; align-items:center;">${R.zap(13,"#ea580c")}</span> CTA: ${Ge(l.cta_text)}
                </div>
              `:""}

              <!-- Linked Entity Details Box -->
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px 16px; margin-bottom:16px;">
                <div style="font-size:0.7rem; font-weight:800; color:var(--primary); text-transform:uppercase; letter-spacing:0.06em;">
                  Linked ${Ge(l.linked_type)} #${Ge(l.linked_id)}
                </div>
                <div style="font-size:0.95rem; font-weight:700; color:#1e293b; margin-top:2px;">
                  ${Ge(l.linked_title||l.caption)}
                </div>
                ${l.linked_area?`<div style="font-size:0.78rem; color:#64748b; margin-top:2px;">${R.pin(13,"#64748b")} ${Ge(l.linked_area)}</div>`:""}
              </div>

              <!-- Metrics Row -->
              <div style="font-size: 0.8rem; color: #64748b; font-weight: 600; display:flex; gap:14px; margin-bottom:18px;">
                <span>${R.eye(14,"#64748b")} ${l.views_count} views</span>
                <span>${R.arrowUp(14,"#64748b")} <span id="ck-post-vote-count">${l.vote_count}</span> upvotes</span>
                <span>${R.share(14,"#64748b")} ${l.shares_count} shares</span>
              </div>

              <!-- Key CTA Buttons -->
              <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:20px;">
                <!-- View Issue Button (Mandatory) -->
                <button type="button" class="btn btn-primary" id="ck-post-view-issue-btn" style="flex:1; min-width:140px; font-weight:700; border-radius:999px; padding:10px 18px;">
                  View Issue →
                </button>

                <!-- Share Button (Mandatory) -->
                <button type="button" class="btn btn-secondary" id="ck-post-share-btn" style="border-radius:999px; font-weight:700; padding:10px 18px; display:inline-flex; align-items:center; gap:6px;">
                  <span style="display:inline-flex; align-items:center;">${R.share(14,"currentColor")}</span> Share
                </button>

                <!-- Upvote Toggle -->
                <button type="button" class="ck-buzz-act-btn ${l.has_voted?"active":""}" id="ck-post-upvote-btn" style="border-radius:999px;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                  <span id="ck-post-vote-label">${l.has_voted?"Upvoted":"Upvote"}</span>
                </button>

                ${u?`
                  <button type="button" class="btn btn-secondary" id="ck-post-join-btn" style="border-radius:999px; font-weight:700; color:#059669; border-color:#a7f3d0; background:#ecfdf5; display:inline-flex; align-items:center; gap:6px;">
                    <span style="display:inline-flex; align-items:center;">${R.handshake(15,"#059669")}</span> <span>Join Initiative</span>
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
    `,`Civic Buzz #${l.id}`),Ee(),Rp(l),Op(l.id)}catch(s){Ba(s.message||"Error loading post.")}}function Ba(i){const n=document.getElementById("app");n.innerHTML=$e(`
    <div class="ck-buzz-post-page-wrap" style="text-align:center; padding:60px 20px;">
      <div style="font-size:3rem; margin-bottom:12px; display:flex; justify-content:center; color:var(--primary);">${R.flame(52,"var(--primary)")}</div>
      <h2 style="font-size:1.5rem; font-weight:800; color:#0f172a; margin-bottom:8px;">Civic Buzz Post Not Found</h2>
      <p style="color:#64748b; max-width:440px; margin:0 auto 20px;">${Ge(i)}</p>
      <a href="/buzz" class="btn btn-primary" style="border-radius:999px; font-weight:700;">Explore Civic Buzz Gallery</a>
    </div>
  `,"Post Not Found"),Ee()}function Rp(i){var l,c,u,p;(l=document.getElementById("ck-post-view-issue-btn"))==null||l.addEventListener("click",()=>{ge.logEvent(i.id,"click_issue").catch(()=>{}),X(`/entities/${i.linked_id}`)}),(c=document.getElementById("ck-post-share-btn"))==null||c.addEventListener("click",()=>{Hn(i)});const n=document.getElementById("ck-post-upvote-btn"),o=document.getElementById("ck-post-vote-count"),s=document.getElementById("ck-post-vote-label");n==null||n.addEventListener("click",async()=>{if(!He()){vt("Please sign in to upvote."),X("/login");return}try{const h=await ge.vote(i.id);h.voted?(n.classList.add("active"),s.textContent="Upvoted"):(n.classList.remove("active"),s.textContent="Upvote"),o.textContent=h.vote_count}catch(h){ee(h.message||"Could not vote")}}),(u=document.getElementById("ck-post-report-btn"))==null||u.addEventListener("click",()=>{const h=window.prompt(`Why are you reporting this Civic Buzz post?
(e.g., Offensive language, personal data, misleading claim)`);h&&h.trim()&&ge.report(i.id,h.trim()).then(f=>{we(f.message||"Report received. Thank you for keeping our community safe.")}).catch(f=>{ee(f.message||"Could not report post")})}),(p=document.getElementById("ck-post-join-btn"))==null||p.addEventListener("click",()=>{ge.logEvent(i.id,"join").catch(()=>{}),we("Thanks for raising your hand! Redirecting to initiative..."),setTimeout(()=>X(`/entities/${i.linked_id}`),800)})}async function Op(i){const n=document.getElementById("ck-post-comments-list"),o=document.getElementById("ck-post-comment-send"),s=document.getElementById("ck-post-comment-input");if(!n)return;async function l(){try{const u=(await ge.getComments(i)).data||[];if(u.length===0){n.innerHTML='<div style="text-align:center; padding:12px; color:#94a3b8; font-size:0.8rem;">No comments yet. Start the conversation!</div>';return}n.innerHTML=u.map(p=>`
        <div class="ck-buzz-comment-item">
          <div class="ck-buzz-comment-meta">
            <span class="ck-buzz-comment-author" style="display:inline-flex; align-items:center; gap:4px;">${R.user(13,"#64748b")} ${Ge(p.author_name)}</span>
            <span class="ck-buzz-comment-time">${new Date(p.created_at).toLocaleDateString()}</span>
          </div>
          <div class="ck-buzz-comment-text">${Ge(p.text)}</div>
        </div>
      `).join("")}catch{n.innerHTML='<div style="text-align:center; padding:10px; color:#ef4444; font-size:0.75rem;">Failed to load comments</div>'}}o==null||o.addEventListener("click",async()=>{var u;const c=s==null?void 0:s.value.trim();if(c){o.disabled=!0;try{await ge.addComment(i,c),s.value="",we("Comment posted!"),await l()}catch(p){ee(((u=p.data)==null?void 0:u.message)||p.message||"Failed to post comment")}finally{o.disabled=!1}}}),await l()}delete Ie.Icon.Default.prototype._getIconUrl;Ie.Icon.Default.mergeOptions({iconRetinaUrl:io,iconUrl:no,shadowUrl:ao});const Np="https://tile.openstreetmap.org/{z}/{x}/{y}.png",jp='© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';let Fe=null,wn=null,Bi=null;async function Or(){const i=document.getElementById("app"),n=`
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
  `;i.innerHTML=$e(n,"Nearby Civic Protests"),Ee(),Hp()}function Hp(){const i=document.getElementById("nearby-map"),n=document.getElementById("btn-detect-location"),o=document.getElementById("select-radius"),s=document.getElementById("select-filter-mode"),l=document.getElementById("nearby-results-list"),c=document.getElementById("results-count-badge"),u=document.getElementById("map-status-pill");new URLSearchParams(window.location.search).get("filter")==="trending"&&s&&(s.value="trending");let h=null,f=[];i&&(Fe&&(Fe.remove(),Fe=null),Fe=Ie.map(i,{center:[28.6139,77.209],zoom:12,zoomControl:!0,attributionControl:!0}),Ie.tileLayer(Np,{attribution:jp,maxZoom:19}).addTo(Fe),Bi=Ie.layerGroup().addTo(Fe),setTimeout(()=>{Fe&&Fe.invalidateSize()},200));async function g(b,w,z){l&&(l.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:var(--text-muted);">
          <div class="spinner" style="width:32px; height:32px; border-width:3px; margin-bottom:12px;"></div>
          <div style="font-size:13px;">Scanning within ${z} km radius...</div>
        </div>
      `);try{f=(await be.nearby(b,w,z)).data||[];const C=(s==null?void 0:s.value)==="trending"?[...f].sort((_,B)=>(B.citizens_count||B.entity_id)-(_.citizens_count||_.entity_id)):f;c&&(c.textContent=`${C.length} found`,c.className=C.length>0?"badge badge-primary":"badge badge-secondary"),u&&(u.textContent=`Showing ${C.length} records within ${z} km`),v(C,b,w)}catch(x){console.error("[NearbyProtests] Fetch error:",x),ee(x.message||"Failed to search nearby events"),l&&(l.innerHTML=`
          <div style="padding:40px 20px; text-align:center; color:#dc2626;">
            <div style="font-weight:600; margin-bottom:4px;">Search Error</div>
            <div style="font-size:13px;">${di(x.message||"Could not load nearby events")}</div>
          </div>
        `)}}function v(b,w,z){if(!l)return;Bi&&Bi.clearLayers(),wn&&Fe&&Fe.removeLayer(wn);const x=Ie.divIcon({className:"user-radar-pin",html:'<div style="background:#2563eb; width:18px; height:18px; border-radius:50%; border:3px solid #ffffff; box-shadow:0 0 10px rgba(37,99,235,0.8); animation:pulse 2s infinite;"></div>',iconSize:[18,18],iconAnchor:[9,9]});if(wn=Ie.marker([w,z],{icon:x}).addTo(Fe),wn.bindPopup("<strong>Your Location</strong>"),b.length===0){l.innerHTML=`
        <div style="text-align:center; padding:60px 20px; color:var(--text-muted);">
          <div style="font-weight:600; color:var(--text-primary); margin-bottom:4px;">No Approved Protests Found</div>
          <div style="font-size:13px; max-width:320px; margin:0 auto;">
            There are currently no public, approved civic rallies or protests within ${o.value} km.
            Try expanding the search radius.
          </div>
        </div>
      `,Fe.setView([w,z],13);return}const I=Ie.latLngBounds([[w,z]]),C=b.map(_=>{var U,M;const B=_.latitude,O=_.longitude,G=_.distance_km!=null?`${Number(_.distance_km).toFixed(1)} km away`:"",ae=_.maps_url||`https://www.google.com/maps/search/?api=1&query=${B},${O}`;return B!=null&&O!=null&&Bi&&(I.extend([B,O]),Ie.marker([B,O]).addTo(Bi).bindPopup(`
          <div style="padding:4px; max-width:220px;">
            <div style="font-weight:700; font-size:13px; color:#0f172a; margin-bottom:4px;">${di(_.name)}</div>
            <div style="font-size:11px; color:#64748b; margin-bottom:6px;">${di(((U=_.entityType)==null?void 0:U.name)||"Civic Event")} • ${G}</div>
            <a href="${ae}" target="_blank" rel="noopener noreferrer" style="display:inline-block; font-size:11px; color:var(--primary); font-weight:600; text-decoration:none;">Open in Google Maps →</a>
          </div>
        `)),`
        <div class="card" style="padding:14px; border:1px solid var(--border); background:var(--surface); border-radius:8px; transition:all 0.2s ease;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:6px;">
            <div>
              <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700; letter-spacing:0.04em;">
                ${di(((M=_.entityType)==null?void 0:M.name)||"Event")}
              </div>
              <a href="/entities/${_.entity_id}" class="text-link" style="font-size:15px; font-weight:700; color:var(--text-primary); text-decoration:none;">
                ${di(_.name)}
              </a>
            </div>
            <span class="badge badge-success" style="font-size:11px; flex-shrink:0;">Approved</span>
          </div>

          <div style="font-size:12px; color:var(--text-secondary); margin-bottom:10px;">
            ${_.area?`<span>Area: <strong>${di(_.area)}</strong></span> • `:""}
            <span>Distance: <strong style="color:var(--primary);">${G}</strong></span>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:10px; font-size:12px;">
            <a href="/entities/${_.entity_id}" class="btn btn-secondary btn-sm" style="font-size:12px; padding:4px 10px;">
              View Details
            </a>
            <a href="${ae}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="font-size:12px; padding:4px 10px; display:inline-flex; align-items:center; gap:4px;">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              Open in Maps
            </a>
          </div>
        </div>
      `}).join("");l.innerHTML=C,Fe&&I.isValid()&&Fe.fitBounds(I,{padding:[40,40],maxZoom:15})}n&&n.addEventListener("click",()=>{if(!navigator.geolocation){ee("Geolocation is not supported by your browser.");return}n.disabled=!0;const b=n.innerHTML;n.innerHTML='<span class="spinner" style="width:16px;height:16px;border-width:2px;margin-right:8px;"></span> Locating...',navigator.geolocation.getCurrentPosition(w=>{n.disabled=!1,n.innerHTML=b,h={latitude:w.coords.latitude,longitude:w.coords.longitude},we("Location detected! Searching nearby records...");const z=Number(o?o.value:10);g(h.latitude,h.longitude,z)},w=>{n.disabled=!1,n.innerHTML=b;let z="Could not access your location.";w.code===1?z="Location permission was denied. Please allow location access in your browser.":w.code===2?z="Location unavailable.":w.code===3&&(z="Location request timed out."),ee(z)},{timeout:1e4,enableHighAccuracy:!0})}),o&&o.addEventListener("change",()=>{h&&g(h.latitude,h.longitude,Number(o.value))})}function di(i){return String(i||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}_e("/",xd);_e("/login",Td);_e("/signup",Md);_e("/dashboard",Un);_e("/governance",mp);_e("/modules",pp);_e("/entities",Xc);_e("/entities/new",$r);_e("/report",$r);_e("/entities/:id",oo);_e("/nearby",Or);_e("/protests/nearby",Or);_e("/admin",Iu);_e("/module-builder",Nu);_e("/reports",Xu);_e("/profile",Ou);_e("/director",Un);_e("/coordinator",Un);_e("/workspace",Un);_e("/agent/chat",kp);_e("/meme/studio",Ar);_e("/meme/studio/:issueId",Ar);_e("/buzz",Tp);_e("/buzz/:id",Bp);Zs(()=>{document.getElementById("app").innerHTML=`
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; text-align:center; padding:24px;">
      <h1 style="font-size:4rem; color:var(--text-muted); font-weight:800;">404</h1>
      <h2 style="margin-bottom:var(--space-4); color:var(--text-primary);">Page Not Found</h2>
      <p style="color:var(--text-secondary); margin-bottom:var(--space-6);">The requested page does not exist or has been moved.</p>
      <a href="/" class="btn btn-primary">Go to CIVIC-KALKI Home</a>
    </div>
  `});window.addEventListener("auth:expired",()=>{gi(()=>Promise.resolve().then(()=>Sd),void 0).then(i=>{i.toastWarning("Your session has expired. Please sign in again.")}),gi(()=>Promise.resolve().then(()=>ud),void 0).then(i=>i.navigate("/login"))});const Ra=document.getElementById("app");Ra&&!Ra.innerHTML.trim()&&(Ra.innerHTML=`
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; gap:16px;">
      <div class="spinner" style="width:36px; height:36px; border-width:3px;"></div>
      <div style="font-size:14px; font-weight:600; color:var(--text-secondary);">Loading CIVIC-KALKI...</div>
    </div>
  `);pd().finally(()=>{Vs(),wd()});export{gi as _,eu as c,tu as g};
