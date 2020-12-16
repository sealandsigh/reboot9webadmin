import request from '@/utils/request'

export function getGroupList(params) {
  return request({
    url: '/api/groups/',
    method: 'get',
    params
  })
}

export function addGroup(data) {
  return request({
    url: '/api/groups/',
    method: 'post',
    data
  })
}

export function modifyGroup(id, data) {
  return request({
    url: `/api/groups/${id}/`,
    method: 'patch',
    data
  })
}
