'use strict';

const data = {
  totalCartPrice: 0,
  plants: [],
};

const API_URL = 'https://openapi.programming-hero.com/api';

const categoryBtnContainerEl = document.getElementById('categoryContainer');
const cardsContainerEl = document.getElementById('cardsContainer');
const cartListContainerEl = document.getElementById('cartListContainer');
const cartListContainerTwoEl = document.getElementById('cartListContainer-2');
const totalPriceContainerEl = document.getElementById('totalPriceContainer');
const totalPriceEl = document.getElementById('totalPrice');
const totalPriceTwoEl = document.getElementById('totalPrice-2');

const treeModalEl = document.getElementById('treeModal');
const treeDetailsContainerEl = document.getElementById('treeDetailsContainer');
const cartIconOneEl = document.getElementById('cartIcon-1');
const cartIconTwoEl = document.getElementById('cartIcon-2');
const cartModalEl = document.getElementById('cartModal');

// Helper Functions
function errorMessage(el, msg) {
  el.innerHTML = `<p class="bg-red-200 p-2 rounded-md text-red-500">${msg}</p>`;
}
function manageSpinner(id, status, el) {
  const spinnerEl = document.getElementById(id);
  if (status) {
    spinnerEl.classList.remove('hidden');
    spinnerEl.classList.add('flex');
    if (el.classList.contains('flex-row')) {
      el.classList.remove('flex');
    } else {
      el.classList.remove('grid');
    }

    el.classList.add('hidden');
  } else {
    spinnerEl.classList.remove('flex');
    spinnerEl.classList.add('hidden');
    el.classList.remove('hidden');
    if (el.classList.contains('flex-row')) {
      el.classList.add('flex');
    } else {
      el.classList.add('grid');
    }
  }
}

function addActiveBtnStyle(el) {
  el.classList.add('font-medium', 'bg-primary', 'text-white');
}
function removeNonActiveBtnStyle(els) {
  els.forEach(el => {
    el.classList.remove('font-medium', 'bg-primary', 'text-white');
  });
}
// /////////////////////////////////
// ADD/DELETE ITEM TO CART
// /////////////////////////////////
cartIconOneEl.addEventListener('click', function () {
  cartModalEl.showModal();
  displayCart(cartListContainerTwoEl);
});
cartIconTwoEl.addEventListener('click', function () {
  cartModalEl.showModal();
  displayCart(cartListContainerTwoEl);
});

function displayTotalCartItemNum(cartItemNum) {
  const cartNumberOneEl = document.getElementById('itemNum-1');
  const cartNumberTwoEl = document.getElementById('itemNum-2');
  cartNumberOneEl.innerText = cartItemNum;
  cartNumberTwoEl.innerText = cartItemNum;
}

function deleteCartPlant(id) {
  data.plants = data.plants.filter(p => p.id !== id);
  displayCart(cartListContainerEl);
  displayCart(cartListContainerTwoEl);
  if (data.plants.length === 0) {
    cartListContainerEl.classList.remove('border-b', 'border-gray-200');
    totalPriceContainerEl.classList.add('hidden');
    totalPriceContainerEl.classList.remove('flex');
  }
}
function displayTotalPrice(el, totalPrice) {
  if (totalPrice) {
    totalPriceContainerEl.classList.remove('hidden');
    totalPriceContainerEl.classList.add('flex');
  }

  data.totalCartPrice = totalPrice;
  el.innerText = data.totalCartPrice;
}
function displayCart(el) {
  el.innerHTML = '';
  let totalPrice = 0;
  let html = '';
  let cartItemNum = 0;

  data.plants.forEach(plant => {
    html += `
    <div
      class="bg-[#F0FDF4] rounded-md flex justify-between items-center p-2">
      <div class="space-y-1">
        <h4 class="font-semibold text-base">${plant.name}</h4>
            <p class="opacity-80 text-base">&#2547;${plant.price} &times; ${plant.count}</p>
      </div>
      <span onclick="deleteCartPlant(${plant.id})" class="text-3xl text-red-500 cursor-pointer">&times;</span>
    </div>
    
    `;

    totalPrice += plant.totalPrice;
    cartItemNum += plant.count;
  });
  el.classList.add('border-b', 'border-gray-200');
  el.innerHTML = html;

  displayTotalPrice(totalPriceEl, totalPrice);
  displayTotalPrice(totalPriceTwoEl, totalPrice);

  displayTotalCartItemNum(cartItemNum);
}
function addToCart(plant) {
  // check already added into Cart
  const isExist = data.plants.find(p => p.id === plant.id);
  if (isExist) {
    isExist.count++;
    isExist.totalPrice = isExist.count * isExist.price;
  } else {
    data.plants.push({ ...plant, count: 1, totalPrice: plant.price });
  }
  displayCart(cartListContainerEl);
}

// /////////////////////////////////
// PLANTS LOAD AND DISPLAY
// /////////////////////////////////
function displayTreeModal(plant) {
  treeModalEl.showModal();
  treeDetailsContainerEl.innerHTML = '';
  const { image, name, description, category, price } = plant;
  treeDetailsContainerEl.innerHTML = `
  <div>
    <h3 class="heading-tertiary">${name}</h3>
    <img class="h-[13.125rem] object-cover w-full rounded-xl" src="${image}" alt="${name}" />
  </div>
  <p><span class="font-bold">Category: </span>${category}</p>
  <p><span class="font-bold">Price: </span>&#2547;${price}</p>
  <p>
    <span class="font-bold">Description: </span>${description}
  </p>
  `;
}
function displayPlantCards(plants) {
  cardsContainerEl.innerHTML = '';
  let html = '';

  if (plants.length === 0) {
    errorMessage(cardsContainerEl, 'Unknown error happen. plants not Found.');
    return;
  }

  plants.forEach(plant => {
    const { image, name, description, category, price } = plant;

    html += `
    <div class="p-3 bg-white rounded-lg flex flex-col justify-between gap-4 shadow-md">
              <figure  class="rounded-lg">
                <img class="rounded-lg h-[11.25rem] object-cover w-full" src="${image}" alt="${name}" />
              </figure>
              <div class="space-y-2">
                <h4 onclick='displayTreeModal(${JSON.stringify(
                  plant
                )})' class="font-semibold text-base md:text-lg cursor-pointer">${name}</h4>
                <p class="opacity-80">
                  ${description}
                </p>
                <div class="flex justify-between items-center">
                  <span class="bg-[#DCFCE7] text-primary rounded-full text-xs md:text-sm px-3 py-1 font-medium">${category}</span>
                  <span class="font-semibold">&#2547;${price}</span>
                </div>
              </div>
              <button onclick='addToCart(${JSON.stringify(
                plant
              )})' class="btn btn-block btn-primary rounded-full">
                Add to Cart
              </button>
            </div>

    `;
  });

  cardsContainerEl.innerHTML = html;
}

async function loadCategoryPlant(categoryID) {
  manageSpinner('spinner2', true, cardsContainerEl);
  const res = await fetch(`${API_URL}/category/${categoryID}`);
  const { plants } = await res.json();
  manageSpinner('spinner2', false, cardsContainerEl);
  displayPlantCards(plants);
}

async function loadAllPlants() {
  manageSpinner('spinner2', true, cardsContainerEl);
  const res = await fetch(`${API_URL}/plants`);
  const { plants } = await res.json();
  manageSpinner('spinner2', false, cardsContainerEl);

  displayPlantCards(plants);
}

// /////////////////////////////////
// CATEGORIES LOAD AND DISPLAY
// /////////////////////////////////
function handleCatBtn(e) {
  e.stopPropagation();

  if (e.target.localName === 'button') {
    const categoryBtns = document.querySelectorAll('.cateBtn');
    removeNonActiveBtnStyle(categoryBtns);
    addActiveBtnStyle(e.target);
    if (e.target.id === 'categoryBtn-0') {
      loadAllPlants();
    } else {
      const plantId = e.target.id.split('-')[1];
      loadCategoryPlant(plantId);
    }
  }
}

function displayCategoriesBtn(categories) {
  categoryBtnContainerEl.innerHTML = '';

  if (categories.length === 0) {
    errorMessage(
      categoryBtnContainerEl,
      'Unknown error happen. Categories not Found.'
    );
    return;
  }

  let html = `<button
              id="categoryBtn-0"
              class="text-left rounded-sm p-2 hover:bg-primary hover:text-white hover:font-medium cursor-pointer cateBtn text-base lg:text-lg xs:inline-block text-white font-medium bg-primary">
              All Trees
            </button>`;

  categories.forEach(category => {
    const { id, category_name } = category;
    html += `
    <button id="categoryBtn-${id}"
      class="text-left text-base lg:text-lg rounded-sm p-2 hover:bg-primary hover:text-white hover:font-medium cateBtn cursor-pointer">
      ${category_name}
    </button>
    `;
  });

  categoryBtnContainerEl.innerHTML = html;

  categoryBtnContainerEl.addEventListener('click', handleCatBtn);
}

async function loadCategories() {
  manageSpinner('spinner1', true, categoryBtnContainerEl);
  const res = await fetch(`${API_URL}/categories`);
  const { categories } = await res.json();

  manageSpinner('spinner1', false, categoryBtnContainerEl);
  displayCategoriesBtn(categories);
}

// /////////////////////////////////
// INITAILLY CALLED
// /////////////////////////////////
function init() {
  loadCategories();
  loadAllPlants();
}

init();
