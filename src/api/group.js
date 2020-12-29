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

// 修改指定用户的角色
export function updateUserGroups(uid, data) {
  return request({
    url: `/api/userGroups/${uid}/`,
    method: 'patch',
    data
  })
}

// 获取指定用户的用户组
export function getUserGroupList(uid, params) {
  return request({
    url: `/api/userGroups/${uid}/`,
    method: 'get',
    params
  })
}
