/* 用户相关的请求 */
import request from '@/utils/request'

export const login = data => {
  return request({
    methods: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
