// @flow

type warehouse = {
  wareHouseCode: string,
  binLocation: string,
  minStockLevel: number,
  maxStockLevel: number,
  availableQty: null | number,
  onPurchaseQty: null | number,
  stockOnHand: null | number,
  stockValue: null | number
};

type supplier = {
  supplierCode: string,
  supplierName: string,
  supplierProductCode: string,
  supplierProductDescription: string,
  purchasePrice: number,
  minOrderQty: number,
  isTaxable: boolean,
  taxInfo: {
    taxCode: string,
    taxName: string,
    rate: number
  },
  currency: string
};

export type productType = {
  productCode: string,
  description: string,
  barCode: string,
  defaultLabel: string,
  unitOfMeasure: string,
  attributeSet: string,
  productGroup: string,
  productNote: string,
  dimensions: {
    packSize: string,
    weight: number,
    width: number,
    height: number,
    depth: number,
    cubicTotal: number
  },
  inventory: Array<warehouse>,
  purchase: {
    defaultPurchasePrice: number,
    purchaseTaxCode: string,
    minOrderQty: number,
    suppliers: Array<supplier>
  },
  sales: {
    defaultSellPrice: number,
    minSellPrice: number,
    salesTaxCode: string,
    minSaleQty: number
  }
};

export type productListType = Array<productType>;
