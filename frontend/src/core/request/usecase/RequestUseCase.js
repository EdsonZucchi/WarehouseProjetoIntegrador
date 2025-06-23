import { requestRepository } from "../repository/RequestRepository";

class RequestUseCase {
  async listRequest() {
    return requestRepository.getRequests();
  }

  async saveRequest(id, idWarehouse, body) {
    let newRequest = {
      "id" : (id != undefined && id != null ? id : null), 
      "warehouseId" : idWarehouse,
      "body" : body
    }

    return requestRepository.saveRequest(newRequest);
  }
}

export const requestUseCase = new RequestUseCase();