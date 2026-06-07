"use client";

import { useEffect, useMemo, useState } from "react";
import { UserCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Autocomplete, { type AutocompleteOption } from "@/components/ui/autocomplete";
import {
  ticketInitialValues,
  validateTicketPayload,
  type TicketFormErrors,
  type TicketFormValues,
} from "@/shared/schemas/ticket.schema";
import type { CreateTicketPayload, Ticket } from "@/shared/types/ticket";

type TicketFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateTicketPayload) => Promise<void> | void;
  isPending?: boolean;
  mode?: "create" | "edit";
  initialTicket?: Ticket | null;
  ticketTypeOptions?: AutocompleteOption[];
  userOptions?: AutocompleteOption[];
  connectedUser?: AutocompleteOption | null;
  isTypeTicketsLoading?: boolean;
  isUsersLoading?: boolean;
};

function normalizeFormValues(ticket?: Ticket | null): TicketFormValues {
  if (!ticket) {
    return ticketInitialValues;
  }

  return {
    eventId: ticket.eventId ?? "",
    ticketTypeId: ticket.ticketTypeId ?? "",
    userId: ticket.userId ?? "",
  };
}

export default function TicketFormModal({
  open,
  onClose,
  onSubmit,
  isPending = false,
  mode = "create",
  initialTicket,
  ticketTypeOptions = [],
  userOptions = [],
  connectedUser = null,
  isTypeTicketsLoading = false,
  isUsersLoading = false,
}: TicketFormModalProps) {
  const [values, setValues] = useState<TicketFormValues>(ticketInitialValues);
  const [errors, setErrors] = useState<TicketFormErrors>({});
  const [useConnectedUser, setUseConnectedUser] = useState(false);

  const title = useMemo(
    () => (mode === "create" ? "Créer un ticket" : "Modifier le ticket"),
    [mode]
  );

  useEffect(() => {
    if (!open) return;
    const nextValues = normalizeFormValues(initialTicket);
    const canUseConnectedUser = mode === "create" && Boolean(connectedUser?.id);
    const isConnected = Boolean(connectedUser?.id) && nextValues.userId === connectedUser?.id;

    setValues(nextValues);
    setUseConnectedUser(Boolean(initialTicket && isConnected && canUseConnectedUser));
    setErrors({});
  }, [open, initialTicket, mode, connectedUser]);

  useEffect(() => {
    if (mode !== "create" || !connectedUser?.id) return;
    if (!open) return;

    if (useConnectedUser) {
      setField("userId", connectedUser.id);
    } else if (values.userId === connectedUser.id) {
      setField("userId", "");
    }
  }, [useConnectedUser, connectedUser, mode, open]);

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
    };

    const validationErrors = validateTicketPayload(nextValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await onSubmit(nextValues as CreateTicketPayload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-2xl overflow-visible rounded border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-xl font-extrabold text-slate-950">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
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

            <Field label="Type de ticket" required error={errors.ticketTypeId}>
              <Autocomplete
                value={values.ticketTypeId}
                placeholder="Sélectionnez un type-ticket"
                options={ticketTypeOptions}
                isLoading={isTypeTicketsLoading}
                emptyText="Aucun type-ticket trouvé."
                onSelect={(option) => {
                  setField("ticketTypeId", option.id);
                }}
              />
            </Field>

            <Field label="Utilisateur / Organisateur" required error={errors.userId}>
              {mode === "create" && connectedUser?.id ? (
                <label className="mb-3 flex cursor-pointer items-center gap-3 rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2 text-sm text-blue-900">
                  <input
                    type="checkbox"
                    checked={useConnectedUser}
                    onChange={(event) => setUseConnectedUser(event.target.checked)}
                    className="size-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  />
                  <UserCheck className="size-4" />
                  <span>
                    Utiliser l'utilisateur connecté
                    <span className="ml-2 font-semibold">({connectedUser.label})</span>
                  </span>
                </label>
              ) : null}

              {!useConnectedUser ? (
                <Autocomplete
                  value={values.userId}
                  placeholder="Rechercher et sélectionner un utilisateur"
                  options={userOptions}
                  isLoading={isUsersLoading}
                  emptyText="Aucun utilisateur trouvé."
                  onSelect={(option) => {
                    setField("userId", option.id);
                  }}
                />
              ) : (
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">{connectedUser?.label}</span>
                  <span className="ml-2 text-xs text-slate-500">{connectedUser?.id}</span>
                </div>
              )}
            </Field>
          </div>

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
