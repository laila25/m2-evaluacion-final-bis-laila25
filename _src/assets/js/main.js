"use strict";

const button = document.querySelector(".js-btn");
const select = document.querySelectorAll(".js-radio");
const cardList = document.querySelector(".js-list");
let radioSelect = "";
let cards = [];

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
    cardList.innerHTML += ` <li class="main_content_list_item"></li>`;
    cardList.innerHTML += ` <li class="main_content_list_item2"><img src="${
      cards[i].image
    }"></li>`;
  }
}

button.addEventListener("click", getAndPaintData);
