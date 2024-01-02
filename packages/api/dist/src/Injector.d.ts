import { Class } from 'type-fest';
import 'reflect-metadata';
declare class Container {
    private providers;
    resolve<T>(target: string | Class<T>): T;
    addProvider<T>(target: Class<T>): void;
}
export declare const providerContainer: Container;
export {};
