import { AccountInterface } from '../types/account';
import $http from './index';

export const userLogin = (data: { username: string, password: string }) => $http({
    url: '/userLogin',
    method: 'post',
    params: data
})

export const userRegister = (data: AccountInterface, cdk: string) => $http({
    url: '/createUser',
    method: 'post',
    params: { cdk },
    data: data
})

export const getUserLog = (current: number, size: number) => $http({
    url: '/showMyLog',
    method: 'get',
    params: { current, size }
})