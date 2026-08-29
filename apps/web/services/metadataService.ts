// D:\tudulu\apps\web\services\metadataService.ts
export async function fetchMetadata() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/metadata/organization-options`,
  );
  if (!response.ok) throw new Error("Failed to load form configuration.");
  return response.json();
  // Expected response structure:
  // { organizationTypes: [{ label: "...", value: "..." }], focusAreas: ["..."] }
}
