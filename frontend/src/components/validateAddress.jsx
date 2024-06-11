import axios from 'axios';

const validateAddress = (userid,address) => {
     return axios.get(`http://localhost:8080/api/${userid}/validate-address?address=${address}`)
    .then(response => {
        console.log(response.data.isInEurope)
      return response.data.isInEurope;
    })
    .catch(error => {
      console.error('Error validating address:', error);
      return false;
  });
};

export default validateAddress;