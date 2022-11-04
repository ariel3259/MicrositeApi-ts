import Microsite from "../models/Microsite";
import MicrositeResponse from "../types/Dto/Microsite";

export default class MicrositeResponseMapper {
    static toResponse(microsite: Microsite): MicrositeResponse {
        return {
            id: microsite.id,
            name: microsite.name,
            url: microsite.url,
            typeId: microsite.typeId
        }
    }

    static toResponseArray(microsites: Microsite[]): MicrositeResponse[]{
        const micrositesResponse: MicrositeResponse[] = [];
        microsites.forEach((microsite: Microsite) => micrositesResponse.push(this.toResponse(microsite)));
        return micrositesResponse;
    }
}