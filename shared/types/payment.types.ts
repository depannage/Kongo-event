import type { PaginatedResponse } from "@/shared/types/paginated.types";

export const PAYMENT_STATUSES = ["PENDING", "COMPLETED", "FAILED", "CANCELLED", "REFUNDED"] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_METHODS = ["MPESA", "CARD", "BANK_TRANSFER", "CASH", "MOBILE_MONEY"] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export type PaymentRecord = {
    id: string;
    createdAt: string;
    updatedAt: string;
};

export type Payment = PaymentRecord & {
    orderId: string;
    method: PaymentMethod | string;
    status: PaymentStatus | string;
    amount: number;
    currency: string;
    providerRef: string;
};

export type CreatePaymentPayload = {
    orderId: string;
    method: string;
    status: string;
    amount: number;
    currency: string;
    providerRef: string;
};

export type UpdatePaymentPayload = Partial<CreatePaymentPayload>;

export type PaymentsListResponse = PaginatedResponse<Payment>;

export type PaymentMutationResponse = PaymentRecord;

export type DeletePaymentResponse = {
    message?: string;
};
