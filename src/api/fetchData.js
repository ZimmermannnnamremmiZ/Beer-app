import axios from 'axios';

// eslint-disable-next-line
async function fetchData(point) {
  try {
    return await axios.get(`https://random-data-api.com/api/${point}`)
      .then((response) => response.data);
  } catch (err) {
    console.log(err);
  }
}

export default fetchData;
