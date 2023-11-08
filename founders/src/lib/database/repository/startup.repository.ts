import { IStartup, Startup } from "../model/Startup";

export class StartupRepository {
	async create(data:Partial<IStartup>): Promise<any> {
		return await Startup.create();
	}
	async findAll(): Promise<any> { 
		return await Startup.find({});
	}
}
