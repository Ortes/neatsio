import { NeatsioActions } from '../interfaces/NeatsioActions';
import { RightsManager } from '../RightsManager';
/**
 *
 * @param controllerName
 */
export declare const Controller: <T extends new (...args: any[]) => any>(controllerName: string, params?: ControllerParams) => (constructor: T) => any;
export interface ControllerParams {
    model?: any;
    rights?: RightsManager;
    unauthorizedRoutes?: Array<NeatsioActions>;
    hiddenAttributes?: Array<String>;
}
