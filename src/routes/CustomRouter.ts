import {Router, Request, Response, NextFunction} from 'express';
import {Controller} from '../model/model';
import * as model from '../model/model';

export class CustomRouter {
    router: Router
    controller: Controller;

    /**
    * Initialize the CustomRouter
    */
    constructor() {
        this.router = Router();
        this.controller = new Controller();
        this.init();
    }

    public updateUrl(req: Request, res: Response, next: NextFunction) {
        let response: model.Response;
        try{
            new Controller().updateUrl(req, res, response, (req: Request, res: Response, response: model.Response) => {
                console.log(response.timeStamp);
                console.log(response.message);
                try{
                    res.status(201);
                } catch(e) {
                    console.log(e);
                    res.status(500);
                    response = new model.Response(new Date(),
                        "Error interno del servidor");
                } finally {
                    res.json(response?response:{});
                    res.send(res);
                }
            });
        } catch(e) {
			console.log(e);
            res.status(500);
            response = new model.Response(new Date(),
                "Error interno del servidor");
            res.json(response?response:{});
            res.send(res);
        } finally {
        }
    }
    public getUrl(req: Request, res: Response, next: NextFunction) {
        let response: model.Response;
        try{
            new Controller().getUrl(req, res, response, (req: Request, res: Response, response: model.Response) => {
                console.log(response.timeStamp);
                console.log(response.message);
                try{
                    res.status(201);
                } catch(e) {
                    console.log(e);
                    res.status(500);
                    response = new model.Response(new Date(),
                        "Error interno del servidor");
                } finally {
                    res.json(response?response:{});
                    res.send(res);
                }
            });
        } catch(e) {
			console.log(e);
            res.status(500);
            response = new model.Response(new Date(),
                "Error interno del servidor");
            console.log(response);
            res.json(response?response:{});
            res.send(res);
        } finally {
        }
    }

    init() {
        this.router.post('/', this.getUrl);
        this.router.post('/arti-4208/registry', this.getUrl);
        this.router.post('/arti-4208/registry/setUrl', this.updateUrl);
    }

}

const customRoutes = new CustomRouter();
customRoutes.init();

export default customRoutes.router;