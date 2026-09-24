import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";
import { getService } from "@/lib/services";

const s = getService("web-development");

export const metadata: Metadata = { title: s.title, description: s.metaDescription };

export default function Page() {
  return <ServicePage s={s} />;
}
