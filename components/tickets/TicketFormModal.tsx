"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ticketInitialValues,
  validateTicketPayload,
  type TicketFormErrors,
  type TicketFormValues,
} from "@/core/schemas/ticket.schema";
import { TICKET_STATUSES, type CreateTicketPayload, type Ticket } from "@/core/types/ticket";

type TicketFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateTicketPayload) => Promise<void> | void;
  isPending?: boolean;
  mode?: "create" | "edit";
  initialTicket?: Ticket | null;
};

function normalizeFormValues(ticket?: Ticket | null): TicketFormValues {
  if (!ticket) return ticketInitialValues;

  return {
    eventId: ticket.eventId ?? "",
    ticketTypeId: ticket.ticketTypeId ?? "",
    userId: ticket.userId ?? "",
    code: ticket.code ?? "",
    qrCodeUrl: ticket.qrCodeUrl ?? "",
    status: ticket.status ?? "PENDING",
  };
}

export default function TicketFormModal({
  open,
  onClose,
  onSubmit,
  isPending = false,
  mode = "create",
  initialTicket,
}: TicketFormModalProps) {
  const [values, setValues] = useState<TicketFormValues>(ticketInitialValues);
  const [errors, setErrors] = useState<TicketFormErrors>({});

  const title = useMemo(
    () => (mode === "create" ? "Créer un ticket" : "Modifier le ticket"),
    [mode]
  );

  useEffect(() => {
    if (!open) return;
    setValues(normalizeFormValues(initialTicket));
    setErrors({});
  }, [open, initialTicket]);

  if (!open) return null;

  const setField = (field: keyof TicketFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextValues: TicketFormValues = {
      ...values,
      eventId: values.eventId.trim(),
      ticketTypeId: values.ticketTypeId.trim(),
      userId: values.userId.trim(),
      code: values.code.trim(),
      qrCodeUrl: values.qrCodeUrl.trim(),
      status: values.status.trim().toUpperCase(),
    };

    const validationErrors = validateTicketPayload(nextValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await onSubmit(nextValues as CreateTicketPayload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-xl font-extrabold text-slate-950">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Event ID" required error={errors.eventId}>
              <Input
                value={values.eventId}
                onChange={(e) => setField("eventId", e.target.value)}
                placeholder="evt_..."
              />
            </Field>

            <Field label="Ticket Type ID" required error={errors.ticketTypeId}>
              <Input
                value={values.ticketTypeId}
                onChange={(e) => setField("ticketTypeId", e.target.value)}
                placeholder="tt_..."
              />
            </Field>

            <Field label="User ID" required error={errors.userId}>
              <Input
                value={values.userId}
                onChange={(e) => setField("userId", e.target.value)}
                placeholder="usr_..."
              />
            </Field>

            <Field label="Code" required error={errors.code}>
              <Input
                value={values.code}
                onChange={(e) => setField("code", e.target.value)}
                placeholder="TICKET-2026-001"
              />
            </Field>
          </div>

          <Field label="QR Code URL" required error={errors.qrCodeUrl}>
            <Input
              value={values.qrCodeUrl}
              onChange={(e) => setField("qrCodeUrl", e.target.value)}
              placeholder="https://..."
            />
          </Field>

          <Field label="Statut" required error={errors.status}>
            <select
              value={values.status}
              onChange={(e) => setField("status", e.target.value)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-[3px] focus:ring-ring/30"
            >
              {TICKET_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </Field>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
              Annuler
            </Button>
            <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700">
              {isPending ? "Enregistrement..." : mode === "create" ? "Créer le ticket" : "Mettre à jour"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}
