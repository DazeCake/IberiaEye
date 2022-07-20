import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import { userStore } from '../store/user'
import { useRouter } from 'vue-router'
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    if (err.response.status == 401) {
      createToast('登录过期，请重新登录', {
        showIcon: true,
        type: 'danger',
        transition: 'bounce',
      })
      userStore().logout()
      const router = useRouter()
      router.push({ path: '/login' })
      return
    }
    createToast('网络故障，请稍后重试', {
      showIcon: true,
      type: 'danger',
      transition: 'bounce',
    })
    console.log(err)
  }
)
function post(url: string, params: object) {
  return new Promise((resolve) => {
    service.post(url, params).then((res) => {
      resolve(res)
    })
  })
}
function get(url: string) {
  return new Promise((resolve) => {
    service.get(url).then((res) => {
      resolve(res)
    })
  })
}
export default service
export const Login = (username: string, password: string) =>
  post(`adminLogin?username=${username}&password=${password}`, {})
export const GetLogs = (current: number, size: number) => get(`showLog?current=${current}&size=${size}`)
export const GetTasks = (token: string) => get(`getTask?deviceToken=${token}`)
export const GetLoadDevices = () => get('showLoadedDevice')
export const addDevice = (p: AddDevice) => post('addDevice', p)
export const DelDevice = (id: string) => post(`delDevice?id=${id}`, {})

export const userLogin = (username: string, password: string) =>
  post(`userLogin?username=${username}&password=${password}`, {})
export const userUseCDK = (cdk: string) => post(`useCDK?cdk=${cdk}`, {})
export const userCreate = (cdk: string, account: string, password: string, name: string) =>
  post(`createUser?cdk=${cdk}`, {
    id: 0,
    name: name,
    account: account,
    password: password,
    server: 0,
    taskType: 'daily',
    config: {
      daily: {
        fight: [
          {
            num: 5,
            level: '当期委托',
          },
          {
            num: 1,
            level: 'ls',
          },
          {
            num: 1,
            level: 'ce',
          },
          {
            num: 99,
            level: '1-7',
          },
        ],
        sanity: {
          drug: 0,
          stone: 0,
        },
        mail: true,
        offer: {
          enable: true,
          car: true,
          star4: true,
          star5: false,
          star6: false,
          other: false,
        },
        friend: true,
        infrastructure: {
          harvest: true,
          shift: true,
          acceleration: true,
          communication: true,
          deputy: false,
        },
        credit: true,
        task: true,
        activity: true,
      },
      rogue: {
        operator: {
          index: 0,
          num: 0,
          skill: 0,
        },
        level: 0,
        coin: 0,
        skip: {
          coin: true,
          beast: true,
          daily: true,
          sensitive: true,
          illusion: true,
          survive: true,
        },
      },
    },
    active: {
      monday: {
        enable: true,
        detail: [],
      },
      tuesday: {
        enable: true,
        detail: [],
      },
      wednesday: {
        enable: true,
        detail: [],
      },
      thursday: {
        enable: true,
        detail: [],
      },
      friday: {
        enable: true,
        detail: [],
      },
      saturday: {
        enable: true,
        detail: [],
      },
      sunday: {
        enable: true,
        detail: [],
      },
    },
    expireTime: '',
    delete: 0,
  })
export const userLog = (current: number, size: number) => get(`showMyLog?current=${current}&size=${size}`)
export const userAccount = (current: number, size: number) => get(`showMyAccount?current=${current}&size=${size}`)

interface AddDevice {
  id: number
  deviceName: string
  deviceToken: string
  expireTime: string
  delete: number
}
