import { TICKET_STATUSES } from "@/core/types/ticket";

const REQUIRED_FIELDS = [
  "eventId",
  "ticketTypeId",
  "userId",
  "code",
  "qrCodeUrl",
  "status",
] as const;

export type TicketFormValues = {
  eventId: string;
  ticketTypeId: string;
  userId: string;
  code: string;
  qrCodeUrl: string;
  status: string;
};

export type TicketFormErrors = Partial<Record<(typeof REQUIRED_FIELDS)[number], string>>;

export const ticketInitialValues: TicketFormValues = {
  eventId: "",
  ticketTypeId: "",
  userId: "",
  code: "",
  qrCodeUrl: "",
  status: "PENDING",
};

export function validateTicketPayload(values: TicketFormValues): TicketFormErrors {
  const errors: TicketFormErrors = {};

  if (!values.eventId.trim()) errors.eventId = "L'identifiant de l'événement est requis.";
  if (!values.ticketTypeId.trim()) errors.ticketTypeId = "Le type de ticket est requis.";
  if (!values.userId.trim()) errors.userId = "L'identifiant utilisateur est requis.";
  if (!values.code.trim()) errors.code = "Le code du ticket est requis.";
  if (!values.qrCodeUrl.trim()) errors.qrCodeUrl = "L'URL du QR code est requise.";

  const status = values.status.trim().toUpperCase();
  if (!status) {
    errors.status = "Le statut est requis.";
  } else if (!TICKET_STATUSES.includes(status as any)) {
    errors.status = "Le statut sélectionné est invalide.";
  }

  return errors;
}
