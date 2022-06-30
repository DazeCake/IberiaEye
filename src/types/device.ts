export interface DeviceInter {
    id: number;
    status: number;
    deviceName: string;
    deviceToken: string;
    expireTime: string;
}

export class InitData {
    deviceList: DeviceInter[] = [];
    newDeviceName: string = '新增设备';
    newExpireTime: string = '';
}
