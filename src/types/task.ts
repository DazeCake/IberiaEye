export interface AccountInter {
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
    delete: number
}

export interface LockTaskListInter {
    deviceToken: string;
    task: AccountInter;
    time: string;
}

export interface FreezeTaskListInter {
    id: string;
    time: string;
}

export class InitData {
    freeTaskList: AccountInter[] = [];
    lockTaskList: LockTaskListInter[] = [];
    freezeTaskList: FreezeTaskListInter[] = [];
    newRogue: AccountInter = {
        id: 0,
        name: "",
        account: "",
        password: "",
        server: 0,
        taskType: "rogue",
        config: {
            daily: {
                fight: [],
                sanity: {
                    drug: 0,
                    stone: 0
                },
                mail: true,
                offer: {
                    enable: true,
                    car: true,
                    star4: true,
                    star5: false,
                    star6: false,
                    other: false
                },
                friend: true,
                infrastructure: {
                    harvest: true,
                    shift: true,
                    acceleration: true,
                    communication: true,
                    deputy: false
                },
                credit: true,
                task: true,
                activity: true
            },
            rogue: {
                operator: {
                    index: 1,
                    num: 1,
                    skill: 2
                },
                level: 140,
                coin: 0,
                skip: {
                    coin: true,
                    beast: false,
                    daily: true,
                    sensitive: true,
                    illusion: true,
                    survive: true
                }
            }
        },
        active: {
            monday: {
                enable: true,
                detail: []
            },
            tuesday: {
                enable: true,
                detail: []
            },
            wednesday: {
                enable: true,
                detail: []
            },
            thursday: {
                enable: true,
                detail: []
            },
            friday: {
                enable: true,
                detail: []
            },
            saturday: {
                enable: true,
                detail: []
            },
            sunday: {
                enable: true,
                detail: []
            }
        },
        expireTime: "2099-01-01T00:00:00.000Z",
        delete: 0
    }
}