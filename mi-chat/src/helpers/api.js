import axios from 'axios'

import { getToken } from './auth.js'

const baseUrl = 'http://localhost:4000/api'

export const login = async (data) => {
  return makeAxiosRequest('login', data)
}
const makeAxiosRequest = async (url, data) => {
  const config = getAxiosRequestConfig(url, data)

  const response = await axios(config)
  return response.data
}

export const getAxiosRequestConfig = (requestUrl, data, method = 'post') => {
  const config = {
    method,
    url: `${baseUrl}/${requestUrl}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    //The "payload" or the "body" of the request: the important info to send as JSON
    data,
  }
  console.log(config)
  return config
}
