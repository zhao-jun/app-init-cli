import request from './xhr'

export const getHomeList = param => request('get', '/home/list', param)
