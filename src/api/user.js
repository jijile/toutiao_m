/* 用户相关的请求 */
import request from '@/utils/request'

import store from '../store'
export const login = data => {
  return request({
    methods: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

export const sendSms = mobile => {
  return request({
    url: ` /app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    headers: {
      // 接口需要授权
      Authorization: `Bearea ${store.state.user.token}`
    }
  })
}
