export class HeaderData {
    correlationId: string;
    securityToken: string;
    
    constructor(correlationId: string,
                securityToken: string) {
        this.correlationId = correlationId;
        this.securityToken = securityToken;
    }
}
