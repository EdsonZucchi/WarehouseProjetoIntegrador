import { httpHelper } from "../../../shared/api/httpHelper";
import { Product } from "../model/Product";
import { Unit } from "../model/Unit";

class ProductRepository {
    async getAllProducts() {
        try {
            const response = await httpHelper.get("/product")

            if (response.status == 200) {
                const data = response.data;
                return data.map(
                    (dto) =>
                        new Product(
                            dto.id,
                            dto.name,
                            dto.um.acronym,
                            dto.quantityStock,
                            dto.status == "ACTIVE" ? "ATIVO" : "INATIVO"
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
            const response = await httpHelper.get("/product/"+idProduct)

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
}

export const productRepository = new ProductRepository();