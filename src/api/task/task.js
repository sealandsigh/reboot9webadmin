import request from '@/utils/request'

// 获取任务
export function getTaskList(params) {
  return request({
    url: '/api/task/',
    method: 'get',
    params
  })
}

// 创建任务
export function createTask(data) {
  return request({
    url: '/api/task/',
    method: 'post',
    data
  })
}

// 修改任务
export function updateTask(id, data) {
  return request({
    url: '/api/task/' + id + '/',
    method: 'patch',
    data
  })
}

// 删除任务
export function deleteTask(id) {
  return request({
    url: '/api/task/' + id + '/',
    method: 'delete'
  })
}
