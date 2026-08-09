import type { Metadata } from "next";
import AdminLeads from "./AdminLeads";

export const metadata: Metadata = {
  title: "Admin Leads",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLeadsPage() {
  return <AdminLeads />;
}
