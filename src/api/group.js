import request from '@/utils/request'

export function getGroupList(params) {
  return request({
    url: '/api/groups/',
    method: 'get',
    params
  })
}
