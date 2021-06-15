import request from '@/utils/request'

// 获取出版社列表
export function getBookList(params) {
  return request({
    url: '/api/book/',
    method: 'get',
    params
  })
}

// 创建出版社
export function createBook(data) {
  return request({
    url: '/api/book/',
    method: 'post',
    data
  })
}

// 修改出版社
export function updateBook(id, data) {
  return request({
    url: '/api/book/' + id + '/',
    method: 'put',
    data
  })
}

// 删除出版社
export function deleteBook(id) {
  return request({
    url: '/api/book/' + id + '/',
    method: 'delete'
  })
}
