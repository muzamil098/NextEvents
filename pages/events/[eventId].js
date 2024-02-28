import { Fragment } from "react";
import { useRouter } from "next/router";

// import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { getFeaturedEvents, getEventById } from "../../helpers/app-utils";
import Comments from "../../components/input/comments";

function EventDetailPage(props) {
  // const router = useRouter();
  // const eventId = router.query.eventId;
  const event = props.selectedEvents;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}
export async function getStaticProps(context) {
  const eventById = context.params.eventId;
  const eventId = await getEventById(eventById);
  return {
    props: {
      selectedEvents: eventId,
    },
    revalidate: 30,
  };
}
export async function getStaticPaths() {
  const allEvents = getFeaturedEvents();
  const eventPaths = (await allEvents).map((paths) => ({
    params: { eventId: paths.id },
  }));
  return {
    paths: eventPaths,
    fallback: "blocking",
  };
}
export default EventDetailPage;
