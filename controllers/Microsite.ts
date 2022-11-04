import Microsite from "../models/Microsite";
import MicrositeResponse from "../types/Dto/Microsite";
import { Request, Response } from "express";
import MicrositeService from "../services/Microsite";
import Pagination from "../types/Pagination";
import Page from "../types/Page";
import MicrositeResponseMapper from "../mappers/MicrositeResponseMapper";

const micrositeService: MicrositeService = new MicrositeService();

export default class MicrositeController {

    async getAll(
        req: Request<{}, MicrositeResponse[] | {message: string}, {}, Pagination>,
        res: Response<MicrositeResponse[] | {message: string}>
    ): Promise<void> {
        const {offset, limit}: Pagination = req.query;
        try{
            const paginatedMicrosites: Page<Microsite> = await micrositeService.getAll(parseInt(offset), parseInt(limit));
            const micrositesResponse: MicrositeResponse[] = MicrositeResponseMapper.toResponseArray(paginatedMicrosites.elements);
            res.set({
                'x-total-count': paginatedMicrosites.totalItems
            });
            res.json(micrositesResponse);
        }catch(err){
            console.log(err);
            res.status(502).json({message: 'server error'})
        }
    }

    async getByTypeId(
        req: Request<{typeId: number}, MicrositeResponse[] | {message: string}, {}, Pagination>,
        res: Response<MicrositeResponse[] | {message: string}>
    ): Promise<void> {
        const {id}: {id: number} = req.params;
        const {offset, limit}: Pagination = req.query;
        try{

        }catch(err){
            console.log(err);
            res.status(502).json({message: 'server error'});
        }
    }
}