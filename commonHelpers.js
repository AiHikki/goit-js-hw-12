import{i as w,S,a as u}from"./assets/vendor-906f2679.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();function c(i){w.show({close:!1,closeOnClick:!0,message:i,messageColor:"white",timeout:3e3,transitionIn:"flipInX",transitionOut:"flipOutX",position:"topRight",backgroundColor:"red",progressBar:!1})}let I=new S("#gallery a",{overlayOpacity:.5,showCounter:!1});const q="41474300-2fa05bee877be877b8dc1781f",m="https://pixabay.com/api/";u.defaults.baseURL=m;const O=document.querySelector("#form"),P=document.querySelector("#searchInput"),f=document.querySelector("#gallery"),a=document.querySelector("#loadBtn"),d=document.querySelector(".loader");let g=innerHeight,n=1;const h=40;let y;window.scrollBy(0,g);O.addEventListener("submit",A);a.addEventListener("click",M);async function A(i){i.preventDefault(),$(),y=P.value,await v()}async function v(){try{const s=(await u.get(m,{params:k()})).data;if(s.hits.length===0)return c("Sorry, no images match your search query. Please try again!");B(s.hits),C(s.totalHits)}catch{E()}finally{d.classList.add("hide")}}function B(i){n+=1;const s=i.reduce((l,{webformatURL:o,largeImageURL:e,tags:t,likes:r,views:p,comments:L,downloads:b})=>l+`
      <li class="gallery-item">
        <a href="${e}">
          <img src="${o}" alt="${t}" />
        </a>
        <div class="image-desc">
          <div class="image-desc-item">
            <div class="image-desc-label">Likes</div>
            <div>${r}</div>
          </div>
          <div class="image-desc-item">
             <div class="image-desc-label">Views</div>
             <div>${p}</div>
          </div>
          <div class="image-desc-item">
            <div class="image-desc-label">Comments</div>
            <div>${L}</div>
          </div>
          <div class="image-desc-item">
            <div class="image-desc-label">Downloads</div>
            <div>${b}</div>
          </div>
        </div>
      </li>
      `,"");f.insertAdjacentHTML("beforeend",s),g=document.querySelector(".gallery-item").getBoundingClientRect().height,I.refresh()}async function M(){a.classList.add("hide"),d.classList.remove("hide"),await v()}function $(){a.classList.add("hide"),d.classList.remove("hide"),n=1,f.innerHTML=""}function k(){return{key:q,q:y,orientation:"horizontal",image_type:"photo",safesearch:!0,page:n,per_page:h}}function C(i){const s=Math.ceil(i/h);n>s?c("We're sorry, but you've reached the end of search results."):a.classList.remove("hide")}function E(){c("Oops... Something went wrong")}
//# sourceMappingURL=commonHelpers.js.map
