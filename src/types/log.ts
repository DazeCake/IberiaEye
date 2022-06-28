export interface ListInter {
    id: number;
    level: string;
    taskType: string;
    title: string;
    detail: string;
    imageUrl: string;
    from: string;
    server: number;
    name: string;
    account: string;
    password: string;
    time: string;
    delete: boolean;
}

export class InitData {
    list: ListInter[] = [];
}
