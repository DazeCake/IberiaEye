import $http from './index';

interface adminLoginData {
    username: string;
    password: string;
}

interface logData {
    current: number;
    size: number;

}

interface searchLogData {
    key: string;
    current: number;
    size: number;
}

interface addDeviceData {
    id: number;
    deviceName: string;
    deviceToken: string;
    expireTime: string;
    delete: number;
}

export const adminLogin = (data: adminLoginData) => $http({
    url: '/adminLogin',
    method: 'post',
    params: data
})

export const getLog = (data: logData) => $http({
    url: '/showLog',
    method: 'get',
    params: data
})

export const searchLog = (data: searchLogData) => $http({
    url: '/searchLog',
    method: 'get',
    params: data
})

export const getDevice = () => $http({
    url: '/showLoadedDevice',
    method: 'get'
})

export const addDevice = (data: addDeviceData) => $http({
    url: '/addDevice',
    method: 'post',
    data
})