'use strict';

const data = {
  totalCartPrice: 0,
  plants: [],
};

const API_URL = 'https://openapi.programming-hero.com/api';
const categoryBtnContainerEl = document.getElementById('categoryContainer');
const cardsContainerEl = document.getElementById('cardsContainer');
const allTreeBtnEl = document.getElementById('categoryBtn-0');
const cartListContainerEl = document.getElementById('cartListContainer');
const totalPriceContainerEl = document.getElementById('totalPriceContainer');

// Helper Functions
function errorMessage(el, msg) {
  el.innerHTML = msg;
}
function manageSpinner(id, status, el) {
  const spinnerEl = document.getElementById(id);
  if (status) {
    spinnerEl.classList.remove('hidden');
    spinnerEl.classList.add('flex');
    if (el.classList.contains('flex')) {
      el.classList.remove('flex');
    } else {
      el.classList.remove('grid');
    }

    el.classList.add('hidden');
  } else {
    spinnerEl.classList.remove('flex');
    spinnerEl.classList.add('hidden');
    el.classList.remove('hidden');
    if (el.classList.contains('flex')) {
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
function deleteCartPlant(id) {
  data.plants = data.plants.filter(p => p.id !== id);
  displayCart();
  if (data.plants.length === 0) {
    cartListContainerEl.classList.remove('border-b', 'border-gray-200');
    totalPriceContainerEl.classList.add('hidden');
    totalPriceContainerEl.classList.remove('flex');
  }
}
function displayTotalPrice(totalPrice) {
  const totalPriceEl = document.getElementById('totalPrice');

  totalPriceContainerEl.classList.remove('hidden');
  totalPriceContainerEl.classList.add('flex');

  data.totalCartPrice = totalPrice;
  totalPriceEl.innerText = data.totalCartPrice;
}
function displayCart() {
  cartListContainerEl.innerHTML = '';
  let totalPrice = 0;
  let html = '';

  data.plants.forEach(plant => {
    html += `
    <div
      class="bg-[#F0FDF4] rounded-md flex justify-between items-center p-2">
      <div class="space-y-1">
        <h4 class="font-semibold text-sm">${plant.name}</h4>
            <p class="">&#2547;${plant.price} &times; ${plant.count}</p>
      </div>
      <span onclick="deleteCartPlant(${plant.id})" class="text-3xl cursor-pointer">&times;</span>
    </div>
    
    `;

    totalPrice += plant.totalPrice;
  });
  cartListContainerEl.classList.add('border-b', 'border-gray-200');
  cartListContainerEl.innerHTML = html;
  displayTotalPrice(totalPrice);
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
  displayCart();

  // console.log(data);
}

// /////////////////////////////////
// PLANTS LOAD AND DISPLAY
// /////////////////////////////////
// {
// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500
// },
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
    <div class="p-3 bg-white rounded-lg flex flex-col justify-around gap-4 ">
              <figure  class="rounded-lg">
                <img class="rounded-lg h-[15.625rem] object-cover w-full" src="${image}" alt="Tree Image" />
              </figure>
              <div class="space-y-2">
                <h4 class="font-semibold text-lg">${name}</h4>
                <p class="opacity-80">
                  ${description}
                </p>
                <div class="flex justify-between items-center">
                  <span class="bg-[#DCFCE7] text-primary rounded-full text-sm px-3 py-1 font-medium">${category}</span>
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
function determinedActiveBtn() {
  const categoryBtns = document.querySelectorAll('.cateBtn');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      removeNonActiveBtnStyle(categoryBtns);
      addActiveBtnStyle(e.target);
    });
  });
}

allTreeBtnEl.addEventListener('click', () => {
  loadAllPlants();
});

// {
// "id": 1,
// "category_name": "Fruit Tree",
// "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
// },
function displayCategoriesBtn(categories) {
  categoryBtnContainerEl.innerHTML = '';
  let html = ``;

  if (categories.length === 0) {
    errorMessage(
      categoryBtnContainerEl,
      'Unknown error happen. Categories not Found.'
    );
    return;
  }

  categories.forEach(category => {
    const { id, category_name } = category;
    html += `
    <button id="categoryBtn-${id}"
      onclick = "loadCategoryPlant(${id})"
      class="text-left text-lg rounded-sm p-2 hover:bg-primary hover:text-white hover:font-medium cateBtn cursor-pointer">
      ${category_name}
    </button>
    `;
  });

  categoryBtnContainerEl.innerHTML = html;

  determinedActiveBtn();
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
  addActiveBtnStyle(allTreeBtnEl);
  loadAllPlants();
}

init();
