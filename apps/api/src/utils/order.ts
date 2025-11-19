import { createHash } from 'crypto';

export function generateIdFromSeed(seed: string | number, length = 10): string {
  const hash = createHash('sha256').update(seed.toString()).digest('hex');
  return hash.slice(0, length).toUpperCase();
}

export interface OrderHashedDto {
    sellerSessionId: string;
    cartId: string;
    amount: number;
    sellerChannel: string;
    callbackUrl?: string;
    callbackUrlSuccess?: string;
    callbackUrlFail?: string;
    sellerName?: string;
    orderId: number;
    sellerClientId: string;
}

export function mapToOrderHashed(details: any): OrderHashedDto {
    if (!details) {
        throw new Error('OrderDetailsDto cannot be null or undefined');
    }

    return {
        sellerSessionId: details.sellerSessionId,
        cartId: details.cartId,
        amount: details.orderData?.totalAmount,
        sellerChannel: details.sellerChannel,
        callbackUrl: details.callbackUrl,
        callbackUrlFail: details.callbackUrlFail,
        callbackUrlSuccess: details.callbackUrlSuccess,
        sellerName: details.sellerName,
        orderId: details.orderId,
        sellerClientId: details.sellerClientId,
    };
}

// export function mapOrderDetailsToOrderHashed(details: OrderDetailsDto): OrderHashedDto {
//     if (!details) {
//         throw new Error('OrderDetailsDto cannot be null or undefined');
//     }

//     const requiredFields = ['sellerSessionId', 'cartId', 'amount', 'sellerChannel', 'orderId', 'sellerClientId'];
//     const missingFields = requiredFields.filter(field => !details[field]);
    
//     if (missingFields.length > 0) {
//         throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
//     }

//     return {
//         sellerSessionId: details.sellerSessionId,
//         cartId: details.cartId,
//         amount: details.amount,
//         sellerChannel: details.sellerChannel,
//         orderId: details.orderId,
//         sellerClientId: details.sellerClientId,
//         ...(details.callbackUrl && { callbackUrl: details.callbackUrl }),
//         ...(details.callbackUrlSuccess && { callbackUrlSuccess: details.callbackUrlSuccess }),
//         ...(details.callbackUrlFail && { callbackUrlFail: details.callbackUrlFail }),
//         ...(details.sellerName && { sellerName: details.sellerName }),
//     };
// }