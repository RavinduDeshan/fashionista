// @flow

type imageType = {
  id: string,
  name: string,
  size: Number,
  type: string,
  url: string
};

type productType = {
  brand: string,
  description: string,
  images: Array,
  productCategory: Array<imageType>,
  productCode: string,
  productGroup: string,
  productName: string,
  unitOfMeasure: string
};

export type ProductListType = Array<productType>;
