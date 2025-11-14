export interface OrderHashedDto {
  createdAt: string
  orderStatus: string
  sellerClientId: string
  amount: number
  channel: string
  orderTransactionId: string
  pointId: string
  qrData: string
  storeId: string
  storeName: string
  sessionId: string
  sessionTime: number
  sellerSessionId: string
  cartId: string
  storeCity: string
  storeCvu: string
  storeEmail: string
  storeTributaryId: string
  locationCode: number
  sellerAdditionalData: SellerAdditionalData
  sellerChannel: string
  qrOrderId: any
  updatedAt: any
  orderId: number
  internalProcess: string
  minutesExpiracy: number
  msecondsExpiracy: number
}

export interface SellerAdditionalData {
  campoDinamico_1: string
  external_account_id: number
}