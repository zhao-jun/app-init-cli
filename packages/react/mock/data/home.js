import Mock from 'mockjs';

// 定义数据结构
export default Mock.mock({
  code: 0,
  data: {
    id: '@guid()',
    title: 'Welcome to use app-init-cli',
    show: '@boolean',
    ['list|1-10']: [
      {
        'id|+1': 1,
        userName: '@cname()',
        text: '@cparagraph(10)'
      }
    ]
  }
})
