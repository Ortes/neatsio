interface BodyOptions {
    path: string;
}
export declare function Body(target: any, propertyName: string, index: number): void;
export declare function Body(name: string): Function;
export declare function Body(options: BodyOptions): Function;
export declare function Params(target: any, propertyName: string, index: number): void;
export declare function Params(name?: string): Function;
export declare function Header(target: any, propertyName: string, index: number): void;
export declare function Header(name?: string): Function;
export declare function Query(target: any, propertyName: string, index: number): void;
export declare function Query(name?: string): Function;
/**
 *
 * @param target
 * @param propertyName
 * @param index
 */
export declare function CurrentUser(target: any, key: string, index: number): void;
export {};
