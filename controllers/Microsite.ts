import Microsite from "../models/Microsite";
import MicrositeResponse from "../types/Dto/Microsite";
import { Request, Response } from "express";
import MicrositeService from "../services/Microsite";
import Pagination from "../types/Pagination";
import Page from "../types/Page";
import MicrositeResponseMapper from "../mappers/MicrositeResponseMapper";
import {validationResult, Result, ValidationError} from "express-validator"

const micrositeService: MicrositeService = new MicrositeService();

export default class MicrositeController {

    async getAll(
        req: Request<{}, MicrositeResponse[] | {message: string}, {}, Pagination>,
        res: Response<MicrositeResponse[] | {message: string}>
    ): Promise<void> {
        const errors: Result<ValidationError> = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({message: 'missing fields'});
            return;
        }
        
        try{
            const {offset, limit}: Pagination = req.query;
            const paginatedMicrosites: Page<Microsite> = await micrositeService.getAll(parseInt(offset), parseInt(limit));
            const micrositesResponse: MicrositeResponse[] = MicrositeResponseMapper.toResponseArray(paginatedMicrosites.elements);
            res.set({
                'x-total-count': paginatedMicrosites.totalItems
            });
            res.json(micrositesResponse);
        }catch(err){
            let message: string = 'unkown error';
            if(err instanceof Error) message = err.message
            res.status(502).json({message});
        }
    }

    async getByTypeId(
        req: Request<{typeId: number}, MicrositeResponse[] | {message: string}, {}, Pagination>,
        res: Response<MicrositeResponse[] | {message: string}>
    ): Promise<void> {
        const errors: Result<ValidationError> = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({message: 'missing fields'});
            return;
        }
        try{
            const {typeId}: {typeId: number} = req.params;
            const {offset, limit}: Pagination = req.query;
            const paginatedMicrosites: Page<Microsite> = await micrositeService.getByTypeId(typeId, parseInt(offset), parseInt(limit));
            const micrositesResponse: MicrositeResponse[] = MicrositeResponseMapper.toResponseArray(paginatedMicrosites.elements);
            res.set({
                'x-total-count': paginatedMicrosites.totalItems
            });
            res.json(micrositesResponse);
        }catch(err){
            let message: string = 'unknown error';
            if(err instanceof Error) message = err.message
            res.status(502).json({message});
        }
    }

    async save(
        req: Request<{}, MicrositeResponse | {message: string}, Microsite, {}>,
        res: Response<MicrositeResponse | {message: string}>
    ): Promise<void> {
        const errors: Result<ValidationError> = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({
                id: 0,
                name: '',
                url: '',
                typeId: 0
            })
            return;
        }
        try{
            const microsite: Microsite = req.body;
            const micrositeSaved: Microsite = await micrositeService.save(microsite);
            const micrositeResponse: MicrositeResponse = MicrositeResponseMapper.toResponse(micrositeSaved);
            res.status(201).json(micrositeResponse)
        }catch(err){
            let message: string = 'unknown server'
            if(err instanceof Error) message = err.message
            res.status(502).json({message});
        }
    }

    async update(
        req: Request<{id: number}, MicrositeResponse | {message: string}, Microsite, {}>,
        res: Response<MicrositeResponse | {message: string}>
    ): Promise<void> {
        const errors: Result<ValidationError> = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({
                id: 0,
                name: '',
                url: '',
                typeId: 0
            })
            return;
        }
        try{
            const microsite: Microsite = req.body;
            const {id}: {id: number} = req.params;
            const micrositeUpdated: Microsite = await micrositeService.update(microsite, id);
            const micrositeResponse: MicrositeResponse = MicrositeResponseMapper.toResponse(micrositeUpdated);
            res.json(micrositeResponse)
        }catch(err) {
            let message: string = 'unknown error';
            if(err instanceof Error) message = err.message
            res.status(502).json({message});
        }
    }

    async delete(
        req: Request<{id: number}, null | {message: string}, {}, {}>,
        res: Response<null | {message: string}>
    ): Promise<void> {
        const errors: Result<ValidationError> = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({message: 'missing fields'});
            return;
        }
        try{
            const {id}: {id: number} = req.params;
            await micrositeService.delete(id);
            res.status(204).json(null);
        }catch(err) {
            let message: string = 'unknown error';
            if(err instanceof Error) message = err.message
            res.status(502).json({message});
        }
    }
}