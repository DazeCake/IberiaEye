import $http from './index';

interface adminLoginData {
    username: string;
    password: string;
}

export const adminLogin = (data: adminLoginData) => $http({
    url: '/adminLogin',
    method: 'post',
    params: data
})