// 请求模块
import axios from 'axios'

const request = axios.create({
  baseURL: '/app' // 基础路径
})

// 拦截器

export default request
