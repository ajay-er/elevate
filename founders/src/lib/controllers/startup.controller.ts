// import express, { Request, Response } from 'express';
// import { container } from 'tsyringe';
// import { StartupService } from '../service/startup.service';
// import { PUT_TO_ELASTIC } from '../database/elasticsearch/elasticsearch.repository';
// import { upload } from '../../config/multer.config';
// import { cloudinary } from '../../config/cloudinary.config';

// const router = express.Router();

// const startupService = container.resolve(StartupService);

// router.post(
//     '/send-logo',
//     upload.single('logo'),
//     async (req: Request, res: Response) => {
//         const image = req?.file;
//         const path = image?.path;
//         const response = await cloudinary.uploader.upload(path!, {
//             secure: true,
//             transformation: [
//                 { width: 150, height: 150, crop: 'thumb' },
//                 { radius: 10 },
//             ],
//             folder: 'elevate/startup_logo',
//             unique_filename: true,
//         });
//         res
//             .status(200)
//             .json({ url: response.secure_url, message: 'logo added successfully' });
//     }
// );

// router.post(
//     '/send-banner',
//     upload.single('bannerImage'),
//     async (req: Request, res: Response) => {
//         const image = req?.file;
//         const path = image?.path;
//         const response = await cloudinary.uploader.upload(path!, {
//             secure: true,
//             folder: 'elevate/startup_banner',
//             unique_filename: true,
//         });
//         res
//             .status(200)
//             .json({ url: response.secure_url, message: 'banner added successfully' });
//     }
// );

// router.post('/add-startup', async (req: Request, res: Response) => {
//     const { companyName, bannerImage, description, industry, location } =
//     req.body;
//     console.log(req.body);
//     const result = await startupService.create(req.body);

//     await PUT_TO_ELASTIC('startups', {
//         companyName,
//         bannerImage,
//         description,
//         industry,
//         location,
//         id: result._id,
//     });

//     res.status(201).json({ result, message: 'Startup added successfully' });
// });

// router.get('/startups', async (req: Request, res: Response) => {
//     const result = await startupService.get();
//     res.status(200).json({ result });
// });

// router.get('/:id', async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const result = await startupService.getStartup(id);
//     res.status(200).json({ result });
// });

// export { router as startupRoute };
