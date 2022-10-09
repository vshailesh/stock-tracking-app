import axios from 'axios';

const TOKEN = "ccqk9nqad3i908o7ask0ccqk9nqad3i908o7askg"

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})