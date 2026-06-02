import type { ReportTransaction } from "@/components/report/types";

export const MOCK_TRANSACTIONS: ReportTransaction[] = [
    { id: "1", name: "Liam Smith", email: "liamsmith@gmail.com", ticketType: "VIP", purchaseDate: "June 15, 2025", status: "Paid", amount: 150 },
    { id: "2", name: "Sophia Johnson", email: "sophiajohnson@gmail.com", ticketType: "VIP", purchaseDate: "May 30, 2025", status: "Paid", amount: 150 },
    { id: "3", name: "Olivia Brown", email: "oliviabrown@gmail.com", ticketType: "Regular", purchaseDate: "July 4, 2025", status: "Cancelled", amount: 75 },
    { id: "4", name: "Emma Wilson", email: "emmawilson@gmail.com", ticketType: "VIP", purchaseDate: "June 20, 2025", status: "Paid", amount: 150 },
    { id: "5", name: "James Martinez", email: "jamesm@gmail.com", ticketType: "Regular", purchaseDate: "June 18, 2025", status: "Refunded", amount: 75 },
];
