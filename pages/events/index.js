import { Fragment } from "react";
import { useRouter } from "next/router";

// import { getAllEvents } from "../../dummy-data";
import { getAllEvents } from "../../helpers/app-utils";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import NewsletterRegistration from "../../components/input/newsletter-registration";

function AllEventsPage(props) {
  const router = useRouter();
  const events = props.events;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}
export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
