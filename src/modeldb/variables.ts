export class Variables {
    id: number;
    name: string;
    cost: number;
    url: string;
    operation: string;
    
    constructor(id: number, 
                name: string,
                cost: number,
                url: string,
                operation: string) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.url = url;
        this.operation = operation;
    }
}
