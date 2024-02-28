import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { getAllEvents, getFeaturedEvents } from "../helpers/app-utils";

function HomePage(props) {
  // const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export default HomePage;
export async function getStaticProps() {
  const events = await getFeaturedEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 1800,
  };
}
