import { autoInjectable } from "tsyringe";
import { StartupRepository } from "../database/mongo/repository/startup.repository";

@autoInjectable()
export class StartupService {
    constructor(private readonly startupRepo: StartupRepository) {}

    public async create(data:any) {
        return await this.startupRepo.create(data);
    }

    public async get() {
        return await this.startupRepo.findAll();
    }

    public async delete() {
        return await this.startupRepo.delete();
    }
}
