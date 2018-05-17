import { Body } from './body';
import { HeaderData } from './headerData';

export class Request {
    HeaderData: HeaderData;
    Body: Body;
    
    constructor(header: HeaderData,
                body: Body) {
        this.HeaderData = header;
        this.Body = body;
    }
}