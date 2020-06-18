// @flow
type orderType = {
    orderNumber: string,
    status: string,
    tenantId: string,
    productCode: string,
    productDescription: string,
    quantity: null | number,
    price: null | number,
  };
  
export type orderListType = Array<orderType>;

type productType = {
    line : String,
    productCode: String,
    productDescription: String,
    unit: String,
    quantity: number,
    price: number,
    discountPercentage: number,
    lineTotal: number,
    unitCost: number,
    costingTotal: number,
    totalUnitCost: number,
    landedCost: number,
}

export type singleOrderType = {
    orderNumber: String,
    status: String,
    supplierCode: String,
    tenantId: String,
    supplierName: String,
    supplierReference: String,
    discount: Number,
    supplierInvoiceDate: String,
    wareHouse: String,
    exchangeRate: Number,
    address: Object,
    orderDate: String,
    currencyCode: String,
    products: Array<productType>,
    costs: Array<any>,
    taxRate: Number,
    isAddedToErp: Boolean
}