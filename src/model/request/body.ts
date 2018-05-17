export class Body {
    url: string;
    operation?: string;
    cost?: number;
    
    constructor(url: string,
                operation?: string,
                cost?: number) {
        this.url = url;
        if(cost)this.cost = cost;
        if(operation)this.operation = operation;
    }
}
