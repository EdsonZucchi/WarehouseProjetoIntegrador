import { httpHelper } from "../../../shared/api/httpHelper";
import { Product } from "../model/Product";

const productsMock = [
    new Product(1, "Produto A", "KG", 150, "Ativo"),
    new Product(2, "Produto B", "PC", 30, "Inativo"),
    new Product(3, "Produto C", "UN", 75, "Ativo"),
];

class ProductRepository {
    async getAllProducts() {
        try {
            const response = await httpHelper.get("/product?status=")

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
}

export const productRepository = new ProductRepository();