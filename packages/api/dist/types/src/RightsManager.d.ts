export declare class RightsManager {
    protected resource: string;
    /**
     *
     */
    acl: any[];
    /**
     *
     * @param resource
     */
    constructor(resource: string);
    /**
     *
     * @param role
     * @param action
     * @param attributes
     * @param condition
     */
    addRight(role: string, action: string | Array<string>, attributes?: Array<string>, condition?: Function): void;
    /**
     *
     * @param acl
     */
    private addRightToAcl;
    /**
     *
     */
    static applyRights(): void;
    /**
     *
     */
    static registerRightsController(rightsManager: RightsManager): void;
    /**
     *
     */
    static getRole(user: any): any;
    /**
     *
     */
    static accessController: any;
    /**
     *
     */
    static rights: any[];
    /**
     *
     */
    static roleCallback: Function;
}
