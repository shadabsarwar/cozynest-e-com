import { useState } from "react";
import { writeStorage } from "../utils/storage";
import Icon from "./Icon";
export default function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="newsletter">
      <div>
        <p className="eyebrow">LET'S STAY A LITTLE CLOSER</p>
        <h2>A little inspiration, in your inbox.</h2>
        <p>New finds, thoughtful stories, and the things we love.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          writeStorage(
            "newsletter",
            new FormData(e.currentTarget).get("email"),
          );
          setDone(true);
        }}
      >
        <label htmlFor="newsletter-email">Your email address</label>
        <div className="newsletter-input">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="Enter your email address"
          />
          <button aria-label="Subscribe">
            <Icon name="arrow" />
          </button>
        </div>
        <p className="small" role="status">
          {done
            ? "Saved on this device. Email delivery is not connected yet."
            : "Demo signup: your email stays on this device."}
        </p>
      </form>
    </section>
  );
}
