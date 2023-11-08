import { autoInjectable } from "tsyringe";
import { StartupRepository } from "../database/repository/startup.repository";

@autoInjectable()
export class StartupService {
	constructor(private readonly startupRepo: StartupRepository) {}

	public async create() {
		return await this.startupRepo.create({});
	}

	public async get() {
		return await this.startupRepo.findAll();
	}
}
