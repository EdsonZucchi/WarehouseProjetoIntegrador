export class VariantItem {
    constructor(productId, productName, variantId, variantName, variantCode, quantityStock, quantitySelect, quantityReturn, um) {
        this.productId = productId;
        this.productName = productName;
        this.um = um;
        this.variantId = variantId; 
        this.variantName = variantName;
        this.variantCode = variantCode;
        this.quantityStock = quantityStock;
        this.quantitySelect = quantitySelect;
        this.quantityReturn = quantityReturn;
    }
}