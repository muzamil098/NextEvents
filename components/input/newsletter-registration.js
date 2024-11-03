import { useRef } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";
import { useContext } from "react";
function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef();
  // notificationCtx.showNotification({
  //   title: "Signing up....!",
  //   message: "Registering for news-letter",
  //   status: "pending",
  // });
  function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "something went wrong");
        });
      })
      .then((data) =>
        notificationCtx.showNotification({
          title: "success!",
          message: "Successfully registered for news-letters",
          status: "success",
        })
      )
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
