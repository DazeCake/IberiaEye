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

interface updateAccountData {
    id: number;
}

interface delAccountData {
    id: number;
}

interface addAccountData {
    id: number;
    name: string;
    account: string;
    password: string;
    server: number;
    taskType: string;
    config: {
        daily: {
            fight: {
                level: string;
                num: number;
            }[],
            sanity: {
                drug: number;
                stone: number;
            },
            mail: boolean;
            offer: {
                enable: boolean;
                car: boolean;
                star4: boolean;
                star5: boolean;
                star6: boolean;
                other: boolean;
            },
            friend: boolean;
            infrastructure: {
                harvest: boolean;
                shift: boolean;
                acceleration: boolean;
                communication: boolean;
                deputy: boolean
            },
            credit: boolean;
            task: boolean;
            activity: boolean
        },
        rogue: {
            operator: {
                index: number;
                num: number;
                skill: number
            },
            level: number;
            coin: number;
            skip: {
                coin: boolean;
                beast: boolean;
                daily: boolean;
                sensitive: boolean;
                illusion: boolean;
                survive: boolean
            }
        }
    };
    active: {
        monday: {
            enable: boolean;
            detail: string[];
        },
        tuesday: {
            enable: boolean;
            detail: string[];
        },
        wednesday: {
            enable: boolean;
            detail: string[];
        },
        thursday: {
            enable: boolean;
            detail: string[];
        },
        friday: {
            enable: boolean;
            detail: string[];
        },
        saturday: {
            enable: boolean;
            detail: string[];
        },
        sunday: {
            enable: boolean;
            detail: string[];
        }
    };
    expireTime: string;
    delete: number;
}

interface searchAccountData {
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

export const updateAccount = (data: updateAccountData) => $http({
    url: '/updateAccount',
    method: 'post',
    params: { id: data.id },
    data: data
})

export const delAccount = (data: delAccountData) => $http({
    url: '/delAccount',
    method: 'post',
    params: data
})

export const addAccount = (data: addAccountData) => $http({
    url: '/addAccount',
    method: 'post',
    data
})

export const searchAccount = (data: searchAccountData) => $http({
    url: '/showAccount',
    method: 'get',
    params: data
})

export const showLockTaskList = () => $http({
    url: '/showLockTaskList',
    method: 'get'
})

export const showFreezeTaskList = () => $http({
    url: '/showFreezeTaskList',
    method: 'get'
})

export const showFreeTaskList = () => $http({
    url: '/showFreeTaskList',
    method: 'get'
})

export const tempAddTask = (data: addAccountData) => $http({
    url: '/tempAddTask',
    method: 'post',
    data
})