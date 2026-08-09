// D:\tudulu\apps\web\services\organizations.service.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface OrganizationQueryParams {
  search?: string;
  region?: string;
  type?: string;
  sectorId?: string;
  countryId?: string;
  isVerified?: boolean;
}

export const organizationsService = {
  /**
   * Fetch all organizations with optional multi-facet filter parameters
   */
  async findAll(query?: OrganizationQueryParams) {
    const params = new URLSearchParams();

    if (query) {
      if (query.search) params.append("search", query.search);
      if (query.region && query.region !== "All Regions")
        params.append("region", query.region);
      if (query.type && query.type !== "All Types")
        params.append("type", query.type);
      if (query.sectorId && query.sectorId !== "All Sectors")
        params.append("sectorId", query.sectorId);
      if (query.countryId) params.append("countryId", query.countryId);
      if (query.isVerified !== undefined)
        params.append("isVerified", String(query.isVerified));
    }

    const response = await fetch(
      `${API_BASE_URL}/organizations?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Ensures fresh data retrieval
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch organizations: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Fetch a single organization profile by its unique ID or slug
   */
  async findOne(id: string) {
    const response = await fetch(`${API_BASE_URL}/organizations/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Organization with ID "${id}" not found.`);
      }
      throw new Error(
        `Failed to fetch organization details: ${response.statusText}`,
      );
    }

    return response.json();
  },

  /**
   * Create a new organization entity
   */
  async create(data: any) {
    const response = await fetch(`${API_BASE_URL}/organizations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create organization.");
    }

    return response.json();
  },

  /**
   * Update an existing organization entity
   */
  async update(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/organizations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update organization.");
    }

    return response.json();
  },

  /**
   * Delete an organization entity
   */
  async remove(id: string) {
    const response = await fetch(`${API_BASE_URL}/organizations/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete organization.");
    }

    return response.json();
  },
};
