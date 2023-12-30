import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FounderService } from '../service/founder.service';
import { BadRequestError, UnAuthorizedError } from '@ajay404/elevate';
import { UserService } from '../service/user.service';

const founderService = container.resolve(FounderService);
const userService = container.resolve(UserService);

class FounderController {
    async getAllUserSubscriptions(req: Request, res: Response) {
        const currentUserId = req.currentUser?.id;
        if (!currentUserId) throw new UnAuthorizedError();
        const user = await userService.findUserById(currentUserId);
        if (!user) throw new BadRequestError('oops user not found');
        const result = await founderService.getAllSubcriptions(user.id);
        res.json({result});
    } 
    async getAllUserSubscriptionsAdmin(req: Request, res: Response) {
        const result = await founderService.getAllSubcriptionsAdmin();
        res.json({result});
    } 

    async getSubscriptionsCount(req: Request, res: Response) {
        const result = await founderService.getAllSubcriptionsCount();
        res.json({result});
    } 

    async getPendingSubscriptionCount(req: Request, res: Response) {
        const result = await founderService.getPendingSubscriptionCount();
        res.json({result});
    } 

    async findTotalProfit(req: Request, res: Response) {
        const result = await founderService.findTotalProfit();
        res.json({result});
    } 

    async chartData(req: Request, res: Response) {
        const today = new Date();
        const result = await founderService.getChartData();
        const daysWithProfit = result.map((entry:any) => entry.day);
        const missingDays = Array.from({ length: 7 }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() - index);
            return date.toLocaleDateString('en-GB');
        }).filter((day) => !daysWithProfit.includes(day));

        const finalResult = result.concat(
            missingDays.map((day) => ({ day, profit: 0 }))
        );
        res.json({result:finalResult});
    }  


    async chart2Data(req:Request,res:Response) {
        const result = await founderService.getChart2Data();
        res.json({result});
    }
}

export const founderController = new FounderController();

