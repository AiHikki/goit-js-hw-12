import{i as L,S as w,a as d}from"./assets/vendor-906f2679.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function u(r){L.show({close:!1,closeOnClick:!0,message:r,messageColor:"white",timeout:3e3,transitionIn:"flipInX",transitionOut:"flipOutX",position:"topRight",backgroundColor:"red",progressBar:!1})}let S=new w("#gallery a",{overlayOpacity:.5,showCounter:!1});const q=document.querySelector("#form"),I=document.querySelector("#searchInput"),f=document.querySelector("#gallery"),o=document.querySelector("#loadBtn"),c=document.querySelector(".loader");let h=innerHeight,n=1;const m=40;let g;window.scrollBy(0,h);q.addEventListener("submit",O);o.addEventListener("click",k);async function O(r){r.preventDefault(),n=1,c.classList.remove("hide"),o.classList.add("hide"),f.innerHTML="",d.defaults.baseURL="https://pixabay.com/api/",g=I.value;try{const i=(await d.get("",{params:{key:"41474300-2fa05bee877be877b8dc1781f",q:g,orientation:"horizontal",image_type:"photo",safesearch:!0,page:n,per_page:m}})).data;if(i.hits.length===0)return u("Sorry, there are no images matching your search query. Please try again!");p(i.hits)}catch{u("Oops... Something went wrong")}}function p(r){n+=1;const s=r.reduce((i,{webformatURL:l,largeImageURL:e,tags:t,likes:a,views:y,comments:v,downloads:b})=>i+`
      <li class="gallery-item">
        <a href="${e}">
          <img src="${l}" alt="${t}" />
        </a>
        <div class="image-desc">
          <div class="image-desc-item">
            <div class="image-desc-label">Likes</div>
            <div>${a}</div>
          </div>
          <div class="image-desc-item">
             <div class="image-desc-label">Views</div>
             <div>${y}</div>
          </div>
          <div class="image-desc-item">
            <div class="image-desc-label">Comments</div>
            <div>${v}</div>
          </div>
          <div class="image-desc-item">
            <div class="image-desc-label">Downloads</div>
            <div>${b}</div>
          </div>
        </div>
      </li>
      `,"");f.insertAdjacentHTML("beforeend",s),h=document.querySelector(".gallery-item").getBoundingClientRect().height,c.classList.add("hide"),o.classList.remove("hide"),S.refresh()}async function k(){c.classList.remove("hide"),o.classList.add("hide");const s=(await d.get("",{params:{key:"41474300-2fa05bee877be877b8dc1781f",q:g,orientation:"horizontal",image_type:"photo",safesearch:!0,page:n,per_page:m}})).data,i=Math.ceil(s.totalHits/m);if(p(s.hits),n>i){o.classList.add("hide"),c.classList.add("hide"),u("We're sorry, but you've reached the end of search results.");return}}
//# sourceMappingURL=commonHelpers.js.map
