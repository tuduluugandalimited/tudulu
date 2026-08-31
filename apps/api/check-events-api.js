// Use fetch to query the API directly
async function checkEvents() {
  try {
    const response = await fetch("https://api.tudulu.org/api/v1/events");
    const events = await response.json();
    console.log("Events found:", events.length);
    events.forEach((event) => {
      console.log(`- ${event.title} | slug: ${event.slug || "MISSING"}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkEvents();
