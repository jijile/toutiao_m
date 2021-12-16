// 请求模块
import axios from 'axios'
import store from '../store'
const request = axios.create({
  baseURL: '/app' // 基础路径
})

// 拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 必须返回config
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
