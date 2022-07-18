import { AccountInter } from "./task";

export class InitData {
    account: AccountInter = {
        id: 0,
        name: '',
        account: '',
        password: '',
        server: -1,
        taskType: "daily",
        config: {
            daily: {
                fight: [
                    {
                        num: 5,
                        level: "当期委托"
                    },
                    {
                        num: 1,
                        level: "ls"
                    },
                    {
                        num: 1,
                        level: "ce"
                    },
                    {
                        num: 99,
                        level: "1-7"
                    }
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
        expireTime: '',
        delete: 0,
    };
    cdk: string = "";
    repassword: string = "";
}