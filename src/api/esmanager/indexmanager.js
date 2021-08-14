import request from '@/utils/request'

// 获取索引列表
export function getTopicList(params) {
  return request({
    url: '/api/indexmanage/',
    method: 'get',
    params
  })
}

// 创建索引
export function createTopic(data) {
  return request({
    url: '/api/indexmanage/',
    method: 'post',
    data
  })
}

// 修改索引信息
export function updateTopic(id, data) {
  return request({
    url: '/api/indexmanage/' + id + '/',
    method: 'put',
    data
  })
}

// 删除索引
export function deleteTopic(id) {
  return request({
    url: '/api/indexmanage/' + id + '/',
    method: 'delete'
  })
}
