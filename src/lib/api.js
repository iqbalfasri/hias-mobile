import axios from 'axios';

// base url for development
const BASE_URL = 'https://api-corehias.herokuapp.com';
const BASE_ONGKIR = 'https://api.rajaongkir.com/starter/cost';

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
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
    .then(res => {
      return res.data;
    });
};

// fetch get cart by cart id / user id
export const fetchGetCart = (cartId, token) => {
  return axios
    .get(`${BASE_URL}/product/${cartId}/getCartByUserId`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
    .then(res => {
      return res.data;
    });
};

// fetch get address by user id
export const fetchGetAddress = (userId, token) => {
  return axios
    .get(`${BASE_URL}/product/${userId}/getUserAddressByUserId`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
    .then(res => {
      return res.data;
    });
};

// Ongkir example data
const ONGKIR_EXAMPLE = {
  origin: '155',
  destination: '153',
  weight: '302',
  courier: 'jne',
};

// cek ongkir jne
export const fetchOngkir = dataObj => {
  return axios
    .post(`${BASE_ONGKIR}`, dataObj, {
      headers: {
        'Content-Type': 'application/json',
        key: 'aa1d866526704ded6b36b17ec3e95126',
      },
    })
    .then(res => {
      return res.data.rajaongkir.results[0].costs[1].cost[0].value;
    });
};

// cek ongkir pos
export const fetchOngkirPOS = dataObj => {
  return axios
    .post(`${BASE_ONGKIR}`, dataObj, {
      headers: {
        'Content-Type': 'application/json',
        key: 'aa1d866526704ded6b36b17ec3e95126',
      },
    })
    .then(res => {
      return res.data;
    });
};

// cek ongkir tiki
export const fetchOngkirTIKI = dataObj => {
  return axios
    .post(`${BASE_ONGKIR}`, dataObj, {
      headers: {
        'Content-Type': 'application/json',
        key: 'aa1d866526704ded6b36b17ec3e95126',
      },
    })
    .then(res => {
      return res.data;
    });
};

// payment iPaymu
export const paymentIpayMu = detailOrder => {
  return axios
    .post('https://my.ipaymu.com/payment.htm', detailOrder, {
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => {
      return {
        success: true,
        data: res.data,
      };
    })
    .catch(error => {
      return {
        success: false,
        error: error,
      };
    });
};
