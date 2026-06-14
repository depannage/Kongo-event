"use client";

import CrudResourcePage from "@/components/resources/CrudResourcePage";
import { useTranslations } from "next-intl";
import { useMe } from "@/shared/hooks/auth.hooks";

export default function OrganizersPage() {
  const t = useTranslations("resources.organizers");
  const meQuery = useMe();

  const connectedUserId = meQuery.data?.id ?? "";

  return (
    <CrudResourcePage
      title={t("title")}
      description={t("description")}
      endpoint="/organizers"
      createLabel={t("create")}
      createFixedValues={{ userId: connectedUserId }}
      fields={[
        { name: "organizationId", label: t("fields.organization"), type: "select", endpoint: "/organizations" },
        { name: "displayName", label: t("fields.displayName"), required: true },
        { name: "description", label: t("fields.description") },
        { name: "isVerified", label: t("fields.verified"), type: "checkbox" },
      ]}
      columns={[
        { key: "displayName", label: t("fields.displayName") },
        { key: "user", label: t("fields.user") },
        { key: "organization", label: t("fields.organization") },
        { key: "isVerified", label: t("fields.verified") },
      ]}
    />
  );
}
