import { EventForm } from "../_components/EventForm";

export default function NewEventPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create New Event</h1>
        <p className="text-sm text-slate-500">
          Fill in the details below to add a new event.
        </p>
      </div>
      <EventForm />
    </div>
  );
}
