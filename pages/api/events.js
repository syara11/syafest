import events from "@/data/events.json";

// Simple in-memory "backend" for the Event Management app.
// A short artificial delay is added so the frontend's loading state
// is actually visible during development/demo instead of resolving instantly.
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(req, res) {
  await delay(600);

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const { category, id } = req.query;

  if (id) {
    const event = events.find((item) => item.id === id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json(event);
  }

  const filtered = category && category !== "All"
    ? events.filter((item) => item.category === category)
    : events;

  return res.status(200).json(filtered);
}
