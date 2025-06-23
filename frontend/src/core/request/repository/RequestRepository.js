import { httpHelper } from "../../../shared/api/httpHelper";
import { Request } from "../model/Request"

class RequestRepository {

    async getRequests() {
        try {
            const response = await httpHelper.get("/request")

            if (response.status == 200) {
                const data = response.data;
                return data.map(
                    (dto) =>
                        new Request(
                            dto.id,
                            dto.user.name,
                            dto.warehouseRequested.name,
                            dto.status
                        )
                )
            } else {
                return [];
            }
        } catch (error) {
            console.error(error);
            return []; 
        }
    }

    async saveRequest(newRequest) {
        try { 
            const response = await httpHelper.post("/request/save", newRequest)

            if (response.status != 200) {
                const err = new Error(response.data)
                err.isCase = true
                throw err
            }
        }catch (error) {
            if (error.isCase) { 
                throw error
            } else {
                throw Error("Ocorreu um erro na requisição")
            }
        }
    }
}

export const requestRepository = new RequestRepository();