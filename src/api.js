import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/endpoint/');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();