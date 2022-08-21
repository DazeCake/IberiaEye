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

export const useCDK = (cdk: string) => $http({
    url: '/useCDK',
    method: 'post',
    params: { cdk }
})

export const getUserInfo = () => $http({
    url: '/showMyAccount',
    method: 'get'
})

export const updateUserInfo = (data: AccountInterface) => $http({
    url: '/updateMyAccount',
    method: 'post',
    data
})

export const getUserStatus = () => $http({
    url: '/showMyStatus',
    method: 'get'
})

export const getWechatQRCode = () => $http({
    url: '/getWechatQRCode',
    method: 'get'
})

export const updateAccountAndPassword = (data: { account: string, password: string, server: number }) => $http({
    url: '/updateAccountAndPassword',
    method: 'post',
    params: data
})

export const freezeMyAccount = () => $http({
    url: '/freezeMyAccount',
    method: 'post'
})

export const unfreezeMyAccount = () => $http({
    url: '/unfreezeMyAccount',
    method: 'post'
})

export const startNow = () => $http({
    url: '/startNow',
    method: 'post'
})

export const insertQueue = () => $http({
    url: '/insertQueue',
    method: 'post'
})

export const getRefresh = () => $http({
    url: '/getRefresh',
    method: 'get'
})

export const haltTask = () => $http({
    url: '/forceHalt',
    method: 'post'
})