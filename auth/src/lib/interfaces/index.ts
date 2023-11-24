//auth

export interface IUpdateUser {
	id: string;
	name: string;
	email: string;
	photo?: string;
}

export interface ISignupUser {
	email: string;
	password?: string;
	firstName: string;
	lastName?: string;
	isEmailVerified?: boolean;
}

export interface ILoginUser {
	email: string;
	password: string;
}

export interface IToken {
	email: string;
	token: string;
}

export interface MailInterface {
	from?: string;
	to: string | string[];
	cc?: string | string[];
	bcc?: string | string[];
	subject: string;
	text?: string;
	html: string;
}

export enum IRole {
	USER = 'USER',
	ADMIN = 'ADMIN'
}
