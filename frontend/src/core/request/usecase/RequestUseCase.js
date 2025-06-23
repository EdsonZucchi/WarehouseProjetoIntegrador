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

  async saveItemRequest(idRequest, idVariant, quantity) {
    let newItem = {
      "idRequest" : idRequest, 
      "idVariant" : idVariant,
      "quantity" : quantity
    }

    return requestRepository.saveRequestItem(newItem);
  }

  async saveItemRequestReturn(idRequest, idVariant, quantity) {
    let newItem = {
      "idRequest" : idRequest, 
      "idVariant" : idVariant,
      "quantity" : quantity
    }

    return requestRepository.saveRequestItemReturn(newItem);
  }

  async listItems(idRequest, filter) {
    return requestRepository.listItems(idRequest, filter);
  }

  async getRequest(idRequest) {
    return requestRepository.getRequest(idRequest);
  }

  async finishiTyping(idRequest) {
    return requestRepository.finishiTyping(idRequest); 
  }

  async returnRequest(idRequest) {
    return requestRepository.returnRequest(idRequest); 
  }

  async cancelRequest(idRequest) {
    return requestRepository.cancelRequest(idRequest);
  }
}

export const requestUseCase = new RequestUseCase();