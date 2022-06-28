import type { FormInstance } from 'element-plus'

export interface LoginFromInter {
	username: string
	password: string
}

export class InitData {
	loginFrom: LoginFromInter = {
		username: '',
		password: '',
	}
	loginFromRef: FormInstance | null = null
}
