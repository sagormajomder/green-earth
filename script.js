'use strict';
const API_URL = 'https://openapi.programming-hero.com/api';
const categoryBtnContainer = document.getElementById('categoryContainer');

// Helper Functions
function manageSpinner(id, status, el) {
  const spinnerEl = document.getElementById(id);
  if (status) {
    spinnerEl.classList.remove('hidden');
    spinnerEl.classList.add('flex');
    el.classList.remove('flex');
    el.classList.add('hidden');
  } else {
    spinnerEl.classList.remove('flex');
    spinnerEl.classList.add('hidden');
    el.classList.remove('hidden');
    el.classList.add('flex');
  }
}

async function loadCategoryPlant(categoryID) {
  const res = await fetch(`${API_URL}/category/${categoryID}`);
}

function displayCategoriesBtn(categories) {
  categoryBtnContainer.innerHTML = '';
  let html = ``;

  categories.forEach(category => {
    html += `
    <button id="categoryBtn-${category.id}"
      onclick="loadCategoryPlant(${category.id})"
      class="text-left rounded-sm p-2 hover:bg-primary hover:text-white hover:font-medium cateBtn">
      ${category.category_name}
    </button>
    `;
  });

  categoryBtnContainer.innerHTML = html;
}

async function loadCategories() {
  manageSpinner('spinner1', true, categoryBtnContainer);
  const res = await fetch(`${API_URL}/categories`);
  const { categories } = await res.json();

  manageSpinner('spinner1', false, categoryBtnContainer);
  displayCategoriesBtn(categories);
}

loadCategories();
