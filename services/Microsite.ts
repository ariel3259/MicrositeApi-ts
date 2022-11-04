import Microsite from "../models/Microsite";
import Page from "../types/Page";

export default class MicrositeService {

    async getAll(offset: number, limit: number): Promise<Page<Microsite>> {
        const microsites: Microsite[] = await Microsite.findAll({
            offset,
            limit, 
            where: {
                state: true
            }
        });
        const totalItems: number = await Microsite.count({
            where: {
                state: true
            }
        });
        return {
            elements: microsites,
            totalItems
        }
    }

    async getByTypeId(typeId: number, offset: number, limit: number): Promise<Page<Microsite>> {
        const microsites: Microsite[] = await Microsite.findAll({
            offset,
            limit,
            where: {
                typeId,
                state: true
            }
        });
        const totalItems: number = await Microsite.count({
            where: {
                typeId,
                state: true
            }
        });
        return {
            elements: microsites,
            totalItems
        }
    }

    async save(microsite: Microsite): Promise<Microsite> {
        const micrositeSaved: Microsite = await Microsite.create(microsite);
        return micrositeSaved;
    }
    
    async update(microsite: Microsite, id: number): Promise<Microsite> {
        await Microsite.update(microsite, {
            where: {
                id,
                state: true
            }
        });
        const micrositeUpdated: Microsite = await Microsite.findOne({
            where: {
                id,
                state: true
            }
        }) as Microsite;
        return micrositeUpdated;
    }

    async delete(id: number): Promise<void> {
        await Microsite.update({
            state: true
        }, {
            where: {
                id,
                state: true
            }
        });
    }
}