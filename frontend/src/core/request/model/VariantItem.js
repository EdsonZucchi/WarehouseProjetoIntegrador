export class VariantItem {
    constructor(productId, productName, variantId, variantName, variantCode, quantityStock, quantitySelect, quantityReturn, quantityPending, um) {
        this.productId = productId;
        this.productName = productName;
        this.um = um;
        this.variantId = variantId; 
        this.variantName = variantName;
        this.variantCode = variantCode;
        this.quantityStock = quantityStock;
        this.quantitySelect = quantitySelect;
        this.quantityReturn = quantityReturn;
        this.quantityPending = quantityPending;
    }
}