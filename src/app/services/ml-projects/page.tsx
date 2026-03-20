import ServicePage from "@/components/sections/ServicePage";
import { servicesData } from "@/lib/services-data";
export default function Page() {
  return (
    <ServicePage data={servicesData.find((s) => s.slug === "ml-projects")!} />
  );
}
