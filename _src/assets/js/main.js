"use strict";

const button = document.querySelector(".js-btn");
const select = document.querySelectorAll(".js-radio");
const cardList = document.querySelector(".js-list");

let cardListLi = [];
let radioSelect = "";
let cards = [];
let frontImages = [];
let backImages = [];

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

function getAndPaintData(ev) {
  ev.preventDefault();
  getRadioSelected();
  getDataFromServer();
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
    }" class="front_img hidden" data-img="front">
    <img src="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB" class="back_img" data-img="back"></li>`;
  }

  cardListLi = document.querySelectorAll(".js-list-li");

  for (const li of cardListLi) {
    li.addEventListener("click", changeVisibility);
  }
}

function changeVisibility(ev) {
  const liSelectedFront = ev.currentTarget.firstChild;
  const liSelectedBack = ev.currentTarget.lastChild;
  console.log(liSelectedFront);
  console.log(liSelectedBack);
  liSelectedFront.classList.toggle("hidden");
  liSelectedBack.classList.toggle("hidden");
}

button.addEventListener("click", getAndPaintData);
