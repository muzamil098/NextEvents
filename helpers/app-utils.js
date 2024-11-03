import { DUMMY_EVENTS } from "../dummy-data";

export async function getAllEvents() {
  const response = await fetch(
    "https://nextcourse-csdatafetching-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  console.log(data)
  const events = [];
  //   for (const key in data) {
  //     events.push({
  //       id: key,
  //       title: data[key].title,
  //       description: data[key].description,
  //       date: data[key].date,
  //       image: data[key].image,
  //       isFeatured: data[key].isFeatured,
  //     });
  //   }
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}
export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}
export async function getEventById(id) {
  const allEvents = await getAllEvents();
  const eventId = allEvents.find((event) => event.id === id);
  return eventId;
}
export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
