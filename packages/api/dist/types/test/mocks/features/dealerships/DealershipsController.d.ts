export default class DealershipsController {
    /**
     *
     */
    findAll(): Promise<{
        name: string;
    }[]>;
    /**
     *
     */
    create(body: any): Promise<any>;
    /**
     *
     */
    update(id2: string, companyId: number, id: string): Promise<{
        companyId: number;
        id: string;
        id2: string;
    }>;
    /**
     *
     */
    delete(acceptHeader: string, companyId: string): Promise<{
        acceptHeader: string;
        companyId: string;
    }>;
}
