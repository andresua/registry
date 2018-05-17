export class Response {
    timeStamp: Date;
    message: string;
    url?:string;
    
    constructor(timeStamp: Date,
                message: string,
                url?:string) {
        this.timeStamp = timeStamp;
        this.message = message;
        if(url)this.url = url;
    }
}
