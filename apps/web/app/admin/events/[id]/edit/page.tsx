import { notFound } from "next/navigation";
import { EventForm } from "../../_components/EventForm";

async function getEventById(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/v1/events`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    const events = await res.json();
    return events.find((evt: any) => evt.id === id) || null;
  } catch {
    return null;
  }
}

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEventById(params.id);

  if (!event) notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit Event</h1>
        <p className="text-sm text-slate-500">Update event information.</p>
      </div>
      <EventForm initialData={event} isEditing={true} />
    </div>
  );
}
