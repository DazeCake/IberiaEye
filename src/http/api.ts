import $http from './index';

interface adminLoginData {
    username: string;
    password: string;
}

interface logData {
    current: number;
    size: number;

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
