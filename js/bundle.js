(()=>{"use strict";function t(t,e){const n=document.querySelector(t);n.classList.add("show","fade"),n.classList.remove("hide"),document.body.style.overflow="hidden",console.log(e),e&&clearInterval(e)}function e(t){const e=document.querySelector(t);e.classList.add("hide"),e.classList.remove("show","fade"),document.body.style.overflow=""}const n=function(n,o){const s=document.querySelectorAll(n);function a(n){const s=document.querySelector(".modal__dialog");s.classList.add("hide"),t(".modal",o);const a=document.createElement("div");a.classList.add("modal__dialog"),a.innerHTML=`\n\t\t\t<div class="modal__content">\n\t\t\t<div data-close class="modal__close">&times;</div>\n\t\t\t<div class="modal__title">${n}</div>\n\t\t\t</div>\n\t\t`,document.querySelector(".modal").append(a),setTimeout((()=>{a.remove(),s.classList.add("show"),s.classList.remove("hide"),e(".modal")}),4e3)}s.forEach((t=>{var e;(e=t).addEventListener("submit",(t=>{t.preventDefault();const n=document.createElement("img");n.src="img/form/spinner.svg",n.style.cssText="\n\t\t\t\tdisplay: block;\n\t\t\t\tmargin: 0 auto;\n\t\t\t",e.insertAdjacentElement("afterend",n);const o=new FormData(e);(async(t,e)=>{const n=await fetch("http://localhost:3000/requests",{method:"POST",headers:{"Content-type":"application/json"},body:e});return await n.json()})(0,JSON.stringify(Object.fromEntries(o.entries()))).then((t=>{console.log(t),a("Дякуємо! Невдовзі ми з Вами зв'яжемося"),n.remove()})).catch((()=>{a("Щось пішло не так...")})).finally((()=>{e.reset()}))}))})),fetch("http://localhost:3000/menu").then((t=>t.json())).then((t=>console.log(t)))};window.addEventListener("DOMContentLoaded",(()=>{const o=setTimeout((()=>t(".modal",o)),3e5);(function(t,e,n,o){const s=document.querySelectorAll(t),a=document.querySelectorAll(e),r=document.querySelector(n);function c(){a.forEach((t=>{t.classList.add("hide"),t.classList.remove("show","fade")})),s.forEach((t=>{t.classList.remove(o)}))}function i(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;a[t].classList.add("show","fade"),a[t].classList.remove("hide"),s[t].classList.add(o)}c(),i(),r.addEventListener("click",(e=>{const n=e.target;n&&n.classList.contains(t.slice(1))&&s.forEach(((t,e)=>{n==t&&(c(),i(e))}))}))})(".tabheader__item",".tabcontent",".tabheader__items","tabheader__item_active"),function(t,e){function n(t){return t>=0&&t<10?`0${t}`:t}!function(t,e){const o=document.querySelector(t),s=o.querySelector("#days"),a=o.querySelector("#hours"),r=o.querySelector("#minutes"),c=o.querySelector("#seconds"),i=setInterval(l,1e3);function l(){const t=function(t){let e,n,o,s;const a=Date.parse(t)-Date.parse(new Date);return a<=0?(e=0,n=0,o=0,s=0):(e=Math.floor(a/864e5),n=Math.floor(a/36e5%24),o=Math.floor(a/6e4%60),s=Math.floor(a/1e3%60)),{total:a,days:e,hours:n,minutes:o,seconds:s}}(e);s.innerHTML=n(t.days),a.innerHTML=n(t.hours),r.innerHTML=n(t.minutes),c.innerHTML=n(t.seconds),t.total<=0&&clearInterval(i)}l()}(t,e)}(".timer","2023-05-10"),function(n,o,s){const a=document.querySelectorAll(n),r=document.querySelector(o);a.forEach((e=>{e.addEventListener("click",(()=>t(o,s)))})),r.addEventListener("click",(t=>{t.target!==r&&""!=t.target.getAttribute("data-close")||e(o)})),document.addEventListener("keydown",(t=>{"Escape"===t.code&&r.classList.contains("show")&&e(o)}))}("[data-modal]",".modal",o),function(){document.querySelector(".menu__item");class t{constructor(t,e,n,o,s,a){this.src=t,this.alt=e,this.title=n,this.descr=o,this.price=s;for(var r=arguments.length,c=new Array(r>6?r-6:0),i=6;i<r;i++)c[i-6]=arguments[i];this.classes=c,this.parent=document.querySelector(a),this.transfer=38,this.changeToUAH()}changeToUAH(){this.price=10*Math.round(this.price*this.transfer/10)}render(){const t=document.createElement("div");0===this.classes.length?(this.element="menu__item",t.classList.add(this.element)):this.classes.forEach((e=>t.classList.add(e))),this.classes.forEach((e=>t.classList.add(e))),t.innerHTML=`\n\t\t\t\t<img src=${this.src} alt=${this.alt}>\n\t\t\t\t<h3 class="menu__item-subtitle">${this.title}</h3>\n\t\t\t\t<div class="menu__item-descr">${this.descr}</div>\n\t\t\t\t<div class="menu__item-divider"></div>\n\t\t\t\t<div class="menu__item-price">\n\t\t\t\t\t<div class="menu__item-cost">Цена:</div>\n\t\t\t\t\t<div class="menu__item-total"><span>${this.price}</span> грн/день</div>\n\t\t\t\t</div>\n            `,this.parent.append(t)}}(async t=>{const e=await fetch(t);if(!e.ok)throw new Error(`Could not fetch ${t}, status: ${e.status}`);return await e.json()})("http://localhost:3000/menu").then((e=>{e.forEach((e=>{let{img:n,altimg:o,title:s,descr:a,price:r}=e;new t(n,o,s,a,r,".menu .container").render()}))}))}(),n("form",o),function(t){let{container:e,slide:n,nextArrow:o,prevArrow:s,totalCounter:a,currentCounter:r,wrapper:c,field:i}=t;const l=document.querySelectorAll(n),d=document.querySelector(e),u=document.querySelector(s),m=document.querySelector(o),h=document.querySelector(r),g=document.querySelector(a),f=document.querySelector(c),_=document.querySelector(i),y=window.getComputedStyle(f).width;let v=1,p=0;l.length<10?(g.textContent=`0${l.length}`,h.textContent=`0${v}`):(g.textContent=l.length,h.textContent=`0${v}`),_.style.width=100*l.length+"%",_.style.display="flex",_.style.transition="0.5s all",f.style.overflow="hidden",l.forEach((t=>{t.style.width=y})),d.style.position="relative";const L=document.createElement("ol"),S=[];L.classList.add("carousel-indicators"),L.style.cssText="\n\t\tposition: absolute;\n\t\tright: 0;\n\t\tbottom: 0;\n\t\tleft: 0;\n\t\tz-index: 15;\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\tmargin-right: 15%;\n\t\tmargin-left: 15%;\n\t\tlist-style: none;\n\t",d.append(L);for(let t=0;t<l.length;t++){const e=document.createElement("li");e.setAttribute("data-slide-to",t+1),e.classList.add("dot"),0==t&&(e.style.opacity=1),L.append(e),S.push(e)}function w(){S.forEach((t=>t.style.opacity=".5")),S[v-1].style.opacity=1}function E(t){return+t.replace(/\D/g,"")}m.addEventListener("click",(()=>{p===E(y)*(l.length-1)?p=0:p+=E(y),_.style.transform=`translateX(-${p}px)`,v==l.length?v=1:v++,h.textContent=v<10?`0${v}`:v,w()})),u.addEventListener("click",(()=>{0==p?p=E(y)*(l.length-1):p-=E(y),_.style.transform=`translateX(-${p}px)`,1==v?v=l.length:v--,h.textContent=v<10?`0${v}`:v,w()})),S.forEach((t=>{t.addEventListener("click",(t=>{const e=t.target.getAttribute("data-slide-to");v=e,p=E(y)*(e-1),_.style.transform=`translateX(-${p}px)`,h.textContent=v<10?`0${v}`:v,w()}))}))}({container:".offer__slider",prevArrow:".offer__slider-prev",nextArrow:".offer__slider-next",slide:".offer__slide",totalCounter:"#total",currentCounter:"#current",wrapper:".offer__slider-wrapper",field:".offer__slider-inner"}),function(){const t=document.querySelector(".calculating__result span");let e,n,o,s,a;function r(t,e){document.querySelectorAll(t).forEach((t=>{t.classList.remove(e),t.getAttribute("id")===localStorage.getItem("sex")&&t.classList.add(e),t.getAttribute("data-ratio")===localStorage.getItem("ratio")&&t.classList.add(e)}))}function c(){t.textContent=e&&n&&o&&s&&a?"female"===e?10*Math.round((447.6+9.2*o+3.1*n-4.3*s)*a/10):10*Math.round((88.36+13.4*o+4.8*n-5.7*s)*a/10):"____"}function i(t,n){const o=document.querySelectorAll(t);o.forEach((t=>{t.addEventListener("click",(t=>{t.target.getAttribute("data-ratio")?(a=+t.target.getAttribute("data-ratio"),localStorage.setItem("ratio",+t.target.getAttribute("data-ratio"))):(e=t.target.getAttribute("id"),localStorage.setItem("sex",t.target.getAttribute("id"))),console.log(a,e),o.forEach((t=>{t.classList.remove(n)})),t.target.classList.add(n),c()}))}))}function l(t){const e=document.querySelector(t);e.addEventListener("input",(()=>{switch(e.value.match(/\D/g)?e.style.border="1px solid red":e.style.border="none",e.getAttribute("id")){case"height":n=+e.value;break;case"weight":o=+e.value;break;case"age":s=+e.value}c()}))}localStorage.getItem("sex")?e=localStorage.getItem("sex"):(e="female",localStorage.setItem("sex","female")),localStorage.getItem("ratio")?a=localStorage.getItem("ratio"):(a=1.375,localStorage.setItem("ratio",1.375)),r("#gender div","calculating__choose-item_active"),r(".calculating__choose_big div","calculating__choose-item_active"),c(),i("#gender div","calculating__choose-item_active"),i(".calculating__choose_big div","calculating__choose-item_active"),l("#height"),l("#weight"),l("#age")}();const s=new class{constructor(t,e){this.name=t,this._age=e}#t="Petrovich";say(){console.log(`Ім'я користувача: ${this.name} ${this.#t}, вік: ${this._age}`)}get age(){return this._age}set age(t){"number"==typeof t&&t>0&&t<110?this._age=t:console.log("Некоректне значення")}get surname(){return this.#t}set surname(t){this.#t=t}}("Ivan",27);console.log(s._age),s._age=99,console.log(s._age),console.log(s.surname),s.surname="Oleksandrovich",s.say()}))})();
//# sourceMappingURL=bundle.js.map