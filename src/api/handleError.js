export const handleError = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('Error data : ', error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    if (error.response.data.message) {
      return error.response.data.message;
    } else {
      return error.response.data;
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('Error request: ', error.request);
    return error.message;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error message: ', error.message);
    return error.message;
  }
};
