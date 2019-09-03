"use strict";const button=document.querySelector(".js-btn"),select=document.querySelectorAll(".js-radio"),cardList=document.querySelector(".js-list");let liSelectedFront,liSelectedBack,liSelectedFront2,liSelectedBack2,cardListLi=[],radioSelect="",cards=[],frontImages=[],backImages=[],firstPair="",clickCounter=0;function getAndPaintData(e){e.preventDefault(),getRadioSelected(),getDataFromServer()}function getRadioSelected(){for(let e=0;e<select.length;e++){if(!0===select[0].checked)return radioSelect="4";if(!0===select[1].checked)return radioSelect="6";if(!0===select[2].checked)return radioSelect="8"}}function getDataFromServer(){fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${radioSelect}.json`).then(e=>e.json()).then(e=>{cards=e,console.log(cards),paintData(cards)})}function paintData(){cardList.innerHTML="";for(let e=0;e<cards.length;e++)cardList.innerHTML+=` <li class="main_content_list_item js-list-li"><img src="${cards[e].image}" class="front_img hidden" data-img="front" data-pair="${cards[e].pair}">\n    <img src="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB" class="back_img" data-img="back"></li>`;cardListLi=document.querySelectorAll(".js-list-li");for(const e of cardListLi)e.addEventListener("click",changeVisibility)}function changeVisibility(e){clickCounter++,console.log(`clickCounter: ${clickCounter}`),clickCounter%2!=0?(liSelectedFront=e.currentTarget.firstChild,liSelectedBack=e.currentTarget.lastChild,liSelectedFront.classList.toggle("hidden"),liSelectedBack.classList.toggle("hidden"),firstPair=e.currentTarget.firstChild.dataset.pair):clickCounter%2==0&&(liSelectedFront2=e.currentTarget.firstChild,liSelectedBack2=e.currentTarget.lastChild,liSelectedFront2.classList.toggle("hidden"),liSelectedBack2.classList.toggle("hidden"),setTimeout(comparePair,1e3))}function comparePair(e){const t=parseInt(liSelectedFront2.dataset.pair);console.log(firstPair),console.log(t),parseInt(firstPair)!==t&&(liSelectedFront.classList.add("hidden"),liSelectedFront2.classList.add("hidden"),liSelectedBack.classList.remove("hidden"),liSelectedBack2.classList.remove("hidden"))}button.addEventListener("click",getAndPaintData);