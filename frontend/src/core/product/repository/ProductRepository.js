import { httpHelper } from "../../../shared/api/httpHelper";
import { Product } from "../model/Product";
import { Unit } from "../model/Unit";
import { VariantItem } from "../../request/model/VariantItem"
import { Movement } from "../model/Movement";
import { Critical } from "../model/Critical";

class ProductRepository {
    async getAllProducts(filter) {
        try {
            const response = await httpHelper.get("/product", {
                params: {
                    "filter": filter
                }
            })

            if (response.status == 200) {
                const data = response.data;
                return data.map(
                    (dto) =>
                        new Product(
                            dto.id,
                            dto.name,
                            dto.um.acronym,
                            dto.quantityStock,
                            dto.status
                        )
                )
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async saveNewProduct(newProduct) {
        try {
            const response = await httpHelper.post("/product", newProduct)

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

    async getUms() {
        try {
            const response = await httpHelper.get("/product/ums")

            if (response.status == 200) {
                const data = response.data;
                return data.map(
                    (dto) =>
                        new Unit(
                            dto.acronym,
                            dto.name
                        )
                )


            } else {
                return [];
            }
        } catch (err) {
            console.error(err)
            return [];
        }
    }

    async getProductById(idProduct) {
        try {
            const response = await httpHelper.get("/product/" + idProduct)

            const data = response.data;
            if (response.status == 200) {
                return data;
            } else {
                const err = new Error(data)
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

    async listItems(idWarehouse, filter) {
        try {
            const response = await httpHelper.get("/product/variant/stock/" + idWarehouse, {
                params: {
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

    async inventory(request) {
        try {
            const response = await httpHelper.post("/product/inventory", request)

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

    async getMovements(filter, warehouse, user) {
        try {
            const response = await httpHelper.get("/stock/movements", {
                params: {
                    filter: filter,
                    warehouse: warehouse,
                    user: user
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
                    new Movement(
                        dto.id, 
                        dto.warehouse.name, 
                        dto.product.name, 
                        (''+dto.variant.code+' - '+dto.variant.name), 
                        dto.quantity, 
                        dto.typeMovement, 
                        dto.user.name, 
                        dto.time
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

    async getCritical() {
        try {
            const response = await httpHelper.get("/product/critical")

            if (response.status != 200) {
                const err = new Error("Erro ao buscar a informação")
                err.isCase = true
                throw err
            }

            const data = response.data;
            return data.map(
                (dto) =>
                    new Critical(
                        dto.name,
                        dto.quantity,
                        dto.um
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


export const productRepository = new ProductRepository();