"use strict";

const button = document.querySelector(".js-btn");
const select = document.querySelectorAll(".js-radio");
const cardList = document.querySelector(".js-list");

let cardListLi = [];
let radioSelect = "";
let cards = [];
let frontImages = [];
let backImages = [];
let firstPair = "";
let clickCounter = 0;

function getAndPaintData(ev) {
  ev.preventDefault();
  getRadioSelected();
  getDataFromServer();
}

function getRadioSelected() {
  //debugger;
  for (let i = 0; i < select.length; i++) {
    if (select[0].checked === true) {
      return (radioSelect = "4");
    } else if (select[1].checked === true) {
      return (radioSelect = "6");
    } else if (select[2].checked === true) {
      return (radioSelect = "8");
    }
  }
}

function getDataFromServer() {
  fetch(
    `https://raw.githubusercontent.com/Adalab/cards-data/master/${radioSelect}.json`
  )
    .then(response => response.json())
    .then(data => {
      cards = data;
      console.log(cards);
      paintData(cards);
    });
}

function paintData() {
  cardList.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    cardList.innerHTML += ` <li class="main_content_list_item js-list-li"><img src="${
      cards[i].image
    }" class="front_img hidden" data-img="front" data-pair="${cards[i].pair}">
    <img src="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB" class="back_img" data-img="back"></li>`;
  }

  cardListLi = document.querySelectorAll(".js-list-li");

  for (const li of cardListLi) {
    li.addEventListener("click", changeVisibility);
  }
}

let liSelectedFront;
let liSelectedBack;
let liSelectedFront2;
let liSelectedBack2;

function changeVisibility(ev) {
  clickCounter++;
  console.log(`clickCounter: ${clickCounter}`);
  //debugger;
  if (clickCounter % 2 !== 0) {
    liSelectedFront = ev.currentTarget.firstChild;
    liSelectedBack = ev.currentTarget.lastChild;
    liSelectedFront.classList.toggle("hidden");
    liSelectedBack.classList.toggle("hidden");
    firstPair = ev.currentTarget.firstChild.dataset.pair;
  } else if (clickCounter % 2 === 0) {
    liSelectedFront2 = ev.currentTarget.firstChild;
    liSelectedBack2 = ev.currentTarget.lastChild;
    liSelectedFront2.classList.toggle("hidden");
    liSelectedBack2.classList.toggle("hidden");
    setTimeout(comparePair, 1000);
    //comparePair(ev);
  }
}

function comparePair(ev) {
  //debugger;
  const pairSelected = parseInt(liSelectedFront2.dataset.pair);
  console.log(firstPair);
  console.log(pairSelected);

  if (parseInt(firstPair) !== pairSelected) {
    liSelectedFront.classList.add("hidden");
    liSelectedFront2.classList.add("hidden");
    liSelectedBack.classList.remove("hidden");
    liSelectedBack2.classList.remove("hidden");
  }
}

button.addEventListener("click", getAndPaintData);
