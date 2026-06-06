"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, CircleDollarSign, Plus, Ticket as TicketIcon } from "lucide-react";
import { toast } from "sonner";
import { useSidebar } from "@/contexts/SidebarContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TicketTable from "@/components/tickets/TicketTable";
import TicketFormModal from "@/components/tickets/TicketFormModal";
import SummaryCards from "@/components/tickets/SummaryCards";
import {
  useCreateTicket,
  useDeleteTicket,
  useTicket,
  useTickets,
  useUpdateTicket,
} from "@/core/hooks/ticket/useTicket";
import type { CreateTicketPayload, Ticket } from "@/core/types/ticket";
import MetricCard from "@/components/MetricCard";
import { useTranslations } from "next-intl";

export default function TicketsPage() {
  const { isCollapsed } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const ticketsQuery = useTickets();
  const createTicketMutation = useCreateTicket();
  const updateTicketMutation = useUpdateTicket();
  const deleteTicketMutation = useDeleteTicket();
  const selectedTicketQuery = useTicket(selectedTicketId ?? undefined);

  const tickets = ticketsQuery.data?.items ?? [];

  const metrics = useMemo(() => {
    const pending = tickets.filter((ticket) => ticket.status === "PENDING").length;
    const active = tickets.filter((ticket) => ticket.status === "ACTIVE").length;
    const used = tickets.filter((ticket) => ticket.status === "USED").length;
    const cancelled = tickets.filter((ticket) => ticket.status === "CANCELLED").length;

    return { total: tickets.length, pending, active, used, cancelled };
  }, [tickets]);

  const t = useTranslations("tickets");

  const handleOpenCreate = () => {
    setEditingTicket(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCreateOrUpdate = async (payload: CreateTicketPayload) => {
    try {
      if (editingTicket) {
        await updateTicketMutation.mutateAsync({
          id: editingTicket.id,
          payload,
        });

        toast.success("Ticket mis à jour", {
          description: "Les informations du ticket ont été enregistrées.",
        });
      } else {
        await createTicketMutation.mutateAsync(payload);

        toast.success("Ticket créé", {
          description: "Le ticket a été créé avec succès.",
        });
      }

      setIsModalOpen(false);
      setEditingTicket(null);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.response?.data?.error ??
        error?.message ??
        "Une erreur est survenue.";

      toast.error("Échec de l'enregistrement", {
        description: Array.isArray(message) ? message.join(", ") : message,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTicketMutation.mutateAsync(id);
      if (selectedTicketId === id) setSelectedTicketId(null);

      toast.success("Ticket supprimé", {
        description: "Le ticket a été supprimé avec succès.",
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.response?.data?.error ??
        error?.message ??
        "Une erreur est survenue.";

      toast.error("Suppression impossible", {
        description: Array.isArray(message) ? message.join(", ") : message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <DashboardSidebar />

      <div className={`transition-all duration-300 ${isCollapsed ? "lg:ml-[80px]" : "lg:ml-[280px]"}`}>
        <DashboardNavbar />

        <main className="space-y-6 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-950">Tickets</h1>
              <p className="mt-1 text-sm text-slate-500">Gestion complète des tickets et suivi des statuts.</p>
            </div>

            <Button onClick={handleOpenCreate} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="size-4" />
              Créer un ticket
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard icon={<TicketIcon className="size-5" />} title={t("metrics.ticketsSold")} value={metrics.total} trend="+10.5%" trendUp={true} />
            <MetricCard icon={<CircleDollarSign className="size-5" />} title={t("metrics.revenueGenerated")} value={metrics.pending} trend="+8.2%" trendUp={true} />
            <MetricCard icon={<TicketIcon className="size-5" />} title={t("metrics.ticketsRemaining")} value={metrics.active} trend="+12.5%" trendUp={true} />
            <MetricCard icon={<CalendarCheck className="size-5" />} title={t("metrics.checkinsCompleted")} value={metrics.used} trend="+12.5%" trendUp={true} />
          </div>
          <SummaryCards
            activeTickets={metrics.active}
            soldOutTickets={metrics.cancelled}
            totalTickets={metrics.total}
            onCreateTicket={handleOpenCreate}
          />

          {ticketsQuery.isPending ? (
            <div className="rounded border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Chargement des tickets...
            </div>
          ) : ticketsQuery.isError ? (
            <div className="rounded border border-rose-200 bg-rose-50 p-8 text-center text-sm text-rose-700">
              Impossible de récupérer les tickets.
            </div>
          ) : (
            <TicketTable
              tickets={tickets}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deleteTicketMutation.isPending}
              deletingId={deleteTicketMutation.variables ?? null}
            />
          )}

          <Card className="rounded border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TicketIcon className="size-5 text-blue-600" />
                Détail d'un ticket
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex flex-wrap gap-2">
                {tickets.slice(0, 8).map((ticket) => (
                  <Button
                    key={ticket.id}
                    variant={selectedTicketId === ticket.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTicketId(ticket.id)}
                  >
                    {ticket.code}
                  </Button>
                ))}
              </div>

              {!selectedTicketId ? (
                <p className="text-sm text-slate-500">Sélectionnez un ticket pour afficher ses détails.</p>
              ) : selectedTicketQuery.isPending ? (
                <p className="text-sm text-slate-500">Chargement du ticket...</p>
              ) : selectedTicketQuery.isError ? (
                <p className="text-sm text-rose-600">Impossible de charger ce ticket.</p>
              ) : (
                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <DetailItem label="ID" value={selectedTicketQuery.data?.id} />
                  <DetailItem label="Event ID" value={selectedTicketQuery.data?.eventId} />
                  <DetailItem label="Ticket Type ID" value={selectedTicketQuery.data?.ticketTypeId} />
                  <DetailItem label="User ID" value={selectedTicketQuery.data?.userId} />
                  <DetailItem label="Code" value={selectedTicketQuery.data?.code} />
                  <DetailItem label="Statut" value={selectedTicketQuery.data?.status} />
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      <TicketFormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTicket(null);
        }}
        mode={editingTicket ? "edit" : "create"}
        initialTicket={editingTicket}
        isPending={createTicketMutation.isPending || updateTicketMutation.isPending}
        onSubmit={handleCreateOrUpdate}
      />
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-medium text-slate-900">{value ?? "-"}</p>
    </div>
  );
}

