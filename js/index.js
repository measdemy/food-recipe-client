import { fetchAPI } from '../api/meal.js';

const DEFAULT_URL = 'https://measdemy-food-recipe.glitch.me';
const LIST_CATEGORY = `${DEFAULT_URL}/categories`;
const DEFAULT_CATEGORY = `${DEFAULT_URL}/categories/beef`;
const BY_CATEGORY = `${DEFAULT_URL}/categories/`;

const menuDiv = document.querySelector('.menu');
const tab = document.querySelector('.tab');

const listAllCategories = async () => {
  let { meals: categories } = await fetchAPI(LIST_CATEGORY);

  let displayCategories = categories.slice(0, 4).map((category) => {
    const { strCategory: name } = category;
    const active = name === 'Beef' ? 'active' : '';
    return `<button class="tab-btn ${active}" id=${name}>${name}</button>`;
  });
  tab.innerHTML = displayCategories.join('');
  tab.addEventListener('click', async (e) => {
    const element = e.target;
    element.classList.add('active');
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach((btn) => {
      if (btn.id !== element.id && btn.classList.contains('active')) {
        btn.classList.remove('active');
      }
    });
    showMeals(`${BY_CATEGORY}${element.textContent}`);
  });

  return displayCategories;
};

const showMeals = async (url) => {
  // fetch meals
  const { meals } = await fetchAPI(url);
  // display meals
  const section = await displayMeals(meals);
  return section;
};

const displayMeals = async (meals) => {
  let article = meals
    .map((meal) => {
      const { strMeal: name, strMealThumb } = meal;
      return `
      <article class="item">
          <img
            id="menu-img"
            src=${strMealThumb}
            alt=${name}
          />
        <div class="menu-name">
          <h3>${name}</h3>
        </div>
      </article>`;
    })
    .join('');
  menuDiv.innerHTML = article;
};

window.addEventListener('DOMContentLoaded', () => {
  showMeals(DEFAULT_CATEGORY), listAllCategories();
});
