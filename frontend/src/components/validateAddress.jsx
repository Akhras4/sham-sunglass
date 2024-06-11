import axios from 'axios';

const validateAddress = (userid,address) => {
     return axios.get(`http://localhost:8080/api/${userid}/validate-address?address=${address}`)
    .then(response => {
        // console.log(response.data.isInEurope)
      return { isValid: response.data.isInEurope, errorMessage: '' }
    })
    .catch(error => {
      // console.error('Error validating address:', error);
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'Error validating address';
      return { isValid: false, errorMessage };
    });
};

export default validateAddress;