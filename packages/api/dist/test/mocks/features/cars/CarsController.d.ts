export default class CarsController {
    private carsService;
    constructor();
    find(user: any): Promise<any[]>;
    findAll(): Promise<any[]>;
    query(code: string): {
        code: string;
    };
    requestHandler(id: string): (req: any, res: any) => Promise<void>;
}
