import { Request } from './request/request';
import { Response } from './response/response';
import { Registry } from '../database/registry';
import * as X from 'express';

export class Controller {
     
    constructor() {
    }
    
    updateUrl(request: X.Request, res: X.Response, response: Response, callback: any) : void {
        let req: Request = request.body;
        Registry.updateUrl(req, request, res, callback);
    }
    
    getUrl(request: X.Request, res: X.Response, response: Response, callback: any) : void {
        let req: Request = request.body;
        Registry.getUrl(req, request, res, callback);
    }
}
