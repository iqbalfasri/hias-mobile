import axios from 'axios';

// base url for development
const BASE_URL = 'https://api-core-hias.herokuapp.com';

// fetch best seller product
export const fetchBestSeller = () => {
  return axios.get(`${BASE_URL}/product/bestSeller`).then(res => {
    return res.data;
  });
};

// fetch hot product
export const fetchHotProduct = () => {
  return axios.get(`${BASE_URL}/product/hotItems`).then(res => {
    return res.data;
  });
};

// fetch detail product by id
export const fetchProductById = id => {
  return axios.get(`${BASE_URL}/product/${id}`).then(res => {
    return res.data;
  });
};

// fetch main category
export const fetchMainCategory = () => {
  return axios.get(`${BASE_URL}/product/mainCategory`).then(res => {
    return res.data;
  });
};

// fetch sub category, fetch by main category id
export const fetchSubCategory = mainCategoryId => {
  return axios
    .get(`${BASE_URL}/product/subCategoryByMainCategoryId/${mainCategoryId}`)
    .then(res => {
      return res.data;
    });
};

// fetch second sub category, parameter by sub category id
export const fetchSecondCategory = subCategoryId => {
  return axios
    .get(
      `${BASE_URL}/product/secondSubCategoryBySubCategoryId/${subCategoryId}`,
    )
    .then(res => {
      return res.data;
    });
};

// fetch third sub category, parameter by second sub category id
export const fetchThirdSubCategory = secondSubCategoryId => {
  return axios
    .get(
      `${BASE_URL}/product/thirdSubCategoryBySecondMainCategoryId/${secondSubCategoryId}`,
    )
    .then(res => {
      return res.data;
    });
};

// fetch search result by category, parameter by third sub category id
export const fetchSearchByCategory = thirdSUbCategoryId => {
  return axios
    .get(`${BASE_URL}/product/categoryId/${thirdSUbCategoryId}`)
    .then(res => {
      return res.data;
    });
};

// fetch search result by product name, parameter by name of product
export const fetchSearchByName = productName => {
  return axios
    .post(`${BASE_URL}/product/searchName/${productName}`)
    .then(res => {
      return res.data;
    });
};

// feth user profile
export const fetchUserProfile = token => {
  return axios
    .get(`${BASE_URL}/member/meProfile`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then(res => {
      return res.data;
    });
};
