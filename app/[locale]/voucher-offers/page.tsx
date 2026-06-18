import CrudResourcePage from "@/components/resources/CrudResourcePage";

export default function VoucherOffersPage() {
  return (
    <CrudResourcePage
      title="Voucher offers"
      description="Create and manage public voucher offers shown on the website."
      endpoint="/voucher-offers"
      createLabel="Add voucher"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "category", label: "Category" },
        { name: "city", label: "City" },
        { name: "description", label: "Description" },
        { name: "price", label: "Price", type: "number", required: true },
        { name: "currency", label: "Currency", placeholder: "USD" },
        { name: "discount", label: "Discount", type: "number" },
        { name: "imageUrl", label: "Image", type: "cloudinary" },
        { name: "validUntil", label: "Valid until", placeholder: "2026-12-31T23:59:59.000Z" },
        { name: "stock", label: "Stock", type: "number" },
        { name: "isActive", label: "Active", type: "checkbox" },
      ]}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "city", label: "City" },
        { key: "price", label: "Price" },
        { key: "discount", label: "Discount" },
        { key: "currency", label: "Currency" },
        { key: "stock", label: "Stock" },
        { key: "isActive", label: "Active" },
      ]}
    />
  );
}
