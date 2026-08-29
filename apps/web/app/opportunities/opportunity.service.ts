// D:\tudulu\apps\web\app\opportunities\opportunity.service.ts
import { opportunitiesData, Opportunity } from "./data";

export async function fetchOpportunities(): Promise<Opportunity[]> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
    const res = await fetch(`${apiUrl}/jobs`, { cache: "no-store" });

    const contentType = res.headers.get("content-type");
    if (res.ok && contentType && contentType.includes("application/json")) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : data?.data || data?.items || [];
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    }
  } catch (error) {
    // Fallback to local mock array data if backend is unreachable
  }

  // Fallback to local mock array data
  return Array.isArray(opportunitiesData) ? opportunitiesData : [];
}

export async function fetchOpportunityById(
  id: string,
): Promise<Opportunity | null> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
    const res = await fetch(`${apiUrl}/jobs/${id}`, { cache: "no-store" });

    const contentType = res.headers.get("content-type");
    if (res.ok && contentType && contentType.includes("application/json")) {
      return await res.json();
    }
  } catch (error) {
    // Fallback if backend is unreachable
  }

  const list = Array.isArray(opportunitiesData) ? opportunitiesData : [];
  return (
    list.find(
      (opp) => opp.id === id || (opp as Record<string, any>).slug === id,
    ) || null
  );
}
