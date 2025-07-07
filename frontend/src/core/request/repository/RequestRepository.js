import { httpHelper } from "../../../shared/api/httpHelper";
import { Request } from "../model/Request"
import { VariantItem } from "../model/VariantItem"

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
                            dto.status,
                            0
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

    async getRequest(idRequest) {
        try {
            const response = await httpHelper.get("/request/" + idRequest)

            if (response.status == 200) {
                const data = response.data;
                return new Request(
                    data.id,
                    data.user.name,
                    data.warehouseRequested.name,
                    data.status,
                    data.statusCode,
                )
            }

            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async finishiTyping(idRequest) {
        try {
            const response = await httpHelper.post("/request/finish/typing/"+idRequest)

            if (response.status != 200) {
                const err = new Error(response.data)
                err.isCase = true
                throw err
            }
        } catch (error) {
            if (error.isCase) {
                throw error
            } else {
                throw Error("Ocorreu um erro na requisição")
            }
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

            const data = response.data;

            return data.id;
        } catch (error) {
            if (error.isCase) {
                throw error
            } else {
                throw Error("Ocorreu um erro na requisição")
            }
        }
    }

    async saveRequestItem(newItem) {
        try {
            const response = await httpHelper.post("/request/item/save", newItem)

            if (response.status != 200) {
                const err = new Error(response.data)
                err.isCase = true
                throw err
            }
        } catch (error) {
            if (error.isCase) {
                throw error
            } else {
                throw Error("Ocorreu um erro na requisição")
            }
        }
    }

    async saveRequestItemReturn(newItem) {
        try {
            const response = await httpHelper.post("/request/item/return/save", newItem)

            if (response.status != 200) {
                const err = new Error(response.data)
                err.isCase = true
                throw err
            }
        } catch (error) {
            if (error.isCase) {
                throw error
            } else {
                throw Error("Ocorreu um erro na requisição")
            }
        }
    }

    async returnRequest(idRequest) {
        try {
            const response = await httpHelper.post("/request/return/"+idRequest)

            if (response.status != 200) {
                const err = new Error(response.data)
                err.isCase = true
                throw err
            }
        } catch (error) {
            if (error.isCase) {
                throw error
            } else {
                throw Error("Ocorreu um erro na requisição")
            }
        }
    }

    async returnPartialRequest(idRequest) {
        try {
            const response = await httpHelper.post("/request/return/partial/"+idRequest)

            if (response.status != 200) {
                const err = new Error(response.data)
                err.isCase = true
                throw err
            }
        } catch (error) {
            if (error.isCase) {
                throw error
            } else {
                throw Error("Ocorreu um erro na requisição")
            }
        }
    }

    async cancelRequest(idRequest) {
        try {
            const response = await httpHelper.delete("/request/"+idRequest)

            if (response.status != 200) {
                const err = new Error(response.data)
                err.isCase = true
                throw err
            }
        } catch (error) {
            if (error.isCase) {
                throw error
            } else {
                throw Error("Ocorreu um erro na requisição")
            }
        }
    }

    async rejectedRequest(idRequest) {
        try {
            const response = await httpHelper.post("/request/"+idRequest+"/rejected")

            if (response.status != 200) {
                const err = new Error(response.data)
                err.isCase = true
                throw err
            }
        } catch (error) {
            if (error.isCase) {
                throw error
            } else {
                throw Error("Ocorreu um erro na requisição")
            }
        }
    }

    async acceptedRequest(idRequest) {
        try {
            const response = await httpHelper.post("/request/"+idRequest+"/accepted")

            if (response.status != 200) {
                const err = new Error(response.data)
                err.isCase = true
                throw err
            }
        } catch (error) {
            if (error.isCase) {
                throw error
            } else {
                throw Error("Ocorreu um erro na requisição")
            }
        }
    }

    async listItems(idRequest, filter) {
        try {
            const response = await httpHelper.get("/request/list/item", {
                params: {
                    id: idRequest,
                    filter: filter
                }
            })

            if (response.status != 200) {
                const err = new Error("Erro ao buscar a informação")
                err.isCase = true
                throw err
            }

            const data = response.data;
            return data.map(
                (dto) =>
                    new VariantItem(
                        dto.product.id,
                        dto.product.name,
                        dto.variant.id,
                        dto.variant.name,
                        dto.variant.code,
                        dto.stockQuantity,
                        dto.selectQuantity,
                        dto.returnQuantity,
                        dto.pendingQuantity,
                        dto.product.um.acronym.toLowerCase(),
                    )
            );
        } catch (error) {
            if (error.isCase) {
                throw error
            } else {
                throw Error("Ocorreu um erro na requisição")
            }
        }
    }


}

export const requestRepository = new RequestRepository();