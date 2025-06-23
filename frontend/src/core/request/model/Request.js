export class Request {
    constructor(id, requestName, warehouseName, status, statusCode) {
        this.id = id;
        this.requestName = requestName;
        this.warehouseName = warehouseName; 
        this.status = status;
        this.statusCode = statusCode;
    }
}