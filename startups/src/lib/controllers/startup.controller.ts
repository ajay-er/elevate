import express, { Request, Response } from 'express';
import { container } from 'tsyringe';
import { StartupService } from '../service/startup.service';
import { PUT_TO_ELASTIC } from '../database/elasticsearch/elasticsearch.repository';
import { upload } from '../../config/multer.config';

const router = express.Router();

const startupService = container.resolve(StartupService);

router.post(
    '/add-startup',
    upload.fields([
        { name: 'bannerImage', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
    ]),
    async (req: Request, res: Response) => {
        const { companyName, logo, description, industry, location } = req.body;
        const result = await startupService.create(req.body);
        console.log(result);
        console.log(req.files);
        await PUT_TO_ELASTIC('startups', {
            companyName,
            logo,
            description,
            industry,
            location,
            id: result._id,
        });
        res.status(201).json({ result, message: 'Startup added successfully' });
    }
);

router.get('/startups', async (req: Request, res: Response) => {
    const result = await startupService.get();
    res.status(200).json({ result });
});

export { router as startupRoute };
