// api.js
import axios from 'axios';

const apiFootball = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v2',
  headers: {
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    'x-rapidapi-key': '9420ea3be4msh1556c4e757e0865p114ab9jsn13f7ea8c4e10',
  },
});

export default apiFootball;
