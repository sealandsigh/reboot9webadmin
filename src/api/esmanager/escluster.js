import request from '@/utils/request'

// 获取集群列表
export function getEsclusterList(params) {
  return request({
    url: '/api/escluster/',
    method: 'get',
    params
  })
}

// 创建集群
export function createEscluster(data) {
  return request({
    url: '/api/escluster/',
    method: 'post',
    data
  })
}

// 修改集群信息
export function updateEscluster(id, data) {
  return request({
    url: '/api/escluster/' + id + '/',
    method: 'put',
    data
  })
}

// 删除集群
export function deleteEscluster(id) {
  return request({
    url: '/api/escluster/' + id + '/',
    method: 'delete'
  })
}
