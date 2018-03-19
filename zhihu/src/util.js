// 基本配置
import axios from 'axios'
const Util = {
  apiPath: 'https://zhihu-agent.herokuapp.com/get?api=/4/'
}
Util.ajax = axios.create({
  baseURL: Util.apiPath
})

// 添加相应拦截器
Util.ajax.interceptors.response.use(res => {
  return res.data
})

Util.getTodayTime = function () {
  const date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
}

// 获取前一天的日期
Util.prevDay = function (timestamp = (new Date().getTime())) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return year + month + day
}
export default Util
