import request from '@/utils/request'

// 获取出版社列表
export function getAuthorList(params) {
  return request({
    url: '/api/author/',
    method: 'get',
    params
  })
}

// 创建出版社
export function createAuthor(data) {
  return request({
    url: '/api/author/',
    method: 'post',
    data
  })
}

// 修改出版社
export function updateAuthor(id, data) {
  return request({
    url: '/api/author/' + id + '/',
    method: 'put',
    data
  })
}

// 删除出版社
export function deleteAuthor(id) {
  return request({
    url: '/api/author/' + id + '/',
    method: 'delete'
  })
}
