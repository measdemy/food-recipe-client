const loader = document.querySelector('.loader');
export const fetchAPI = async (url) => {
  loader.classList.remove('hidden');
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
