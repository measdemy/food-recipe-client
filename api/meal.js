export const fetchAPI = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
