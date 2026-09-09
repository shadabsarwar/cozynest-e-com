import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useToast } from "../hooks/StoreProvider";
import { asset } from "../data/products";
import Icon from "../components/Icon";
export default function Auth({ register = false }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const auth = useAuth();
  const notify = useToast();
  const navigate = useNavigate();
  function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      return setError("Please enter a valid email address.");
    if (data.password.length < 8)
      return setError("Use at least 8 characters for your demo password.");
    if (register && (!data.firstName.trim() || !data.lastName.trim()))
      return setError("Please enter your first and last name.");
    if (
      register &&
      (!/[A-Z]/.test(data.password) ||
        !/[a-z]/.test(data.password) ||
        !/[0-9]/.test(data.password))
    )
      return setError(
        "Include an uppercase letter, a lowercase letter, and a number.",
      );
    if (register && data.password !== data.confirmPassword)
      return setError("Your passwords do not match. Please try again.");
    if (register && !data.terms)
      return setError("Please accept the demo terms to continue.");
    setError("");
    register
      ? auth.register(data)
      : auth.login({ email: data.email.trim(), remember: !!data.remember });
    navigate("/account");
  }
  return (
    <section className="auth-layout">
      <div className="auth-image">
        <img
          src={asset("grid-1.jpg")}
          alt="A warm and inviting home"
          width="700"
          height="900"
        />
        <div>
          <p className="eyebrow">MAKE YOURSELF AT HOME</p>
          <h2>
            A little more
            <br />
            <em>lovely, every day.</em>
          </h2>
        </div>
      </div>
      <div className="auth-content">
        <Link className="wordmark" to="/">
          CozyNest
        </Link>
        <p className="eyebrow">YOUR LITTLE CORNER OF COZYNEST</p>
        <h1>{register ? "Come on in." : "Welcome back."}</h1>
        <p>
          {register
            ? "Create a space for all your favorite finds."
            : "Your favorite things are waiting for you."}
        </p>
        <p className="demo-note">
          Demo experience. No identity is verified. Use a made-up password;
          passwords are never stored or sent.
        </p>
        <form onSubmit={submit}>
          {register && (
            <div className="form-row">
              <label>
                First name
                <input
                  name="firstName"
                  autoComplete="given-name"
                  required
                  maxLength="60"
                />
              </label>
              <label>
                Last name
                <input
                  name="lastName"
                  autoComplete="family-name"
                  required
                  maxLength="60"
                />
              </label>
            </div>
          )}
          <label>
            Email address
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <div className="password-field">
              <input
                name="password"
                type={show ? "text" : "password"}
                autoComplete={register ? "new-password" : "current-password"}
                required
                minLength="8"
                aria-describedby="password-help"
              />
              <button
                type="button"
                className="icon-button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Hide password" : "Show password"}
              >
                <Icon name="eye" />
              </button>
            </div>
          </label>
          <p id="password-help" className="small muted">
            {register
              ? "8+ characters, with uppercase, lowercase, and a number."
              : "Use any demo password of at least 8 characters."}
          </p>
          {register && (
            <label>
              Confirm password
              <input
                name="confirmPassword"
                type={show ? "text" : "password"}
                required
                autoComplete="new-password"
              />
            </label>
          )}
          <div className="form-options">
            {register ? (
              <label className="checkbox">
                <input type="checkbox" name="terms" required />
                <span>
                  I agree to the <Link to="/terms">demo terms</Link> and{" "}
                  <Link to="/privacy">privacy notice</Link>.
                </span>
              </label>
            ) : (
              <>
                <label className="checkbox">
                  <input type="checkbox" name="remember" />
                  Remember me
                </label>
                <button
                  className="text-link"
                  type="button"
                  onClick={() =>
                    notify(
                      "Demo login has no saved password. Use any demo password of 8+ characters.",
                    )
                  }
                >
                  Forgot password?
                </button>
              </>
            )}
          </div>
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <button className="button full" type="submit">
            {register ? "Create demo account" : "Login to demo"}{" "}
            <Icon name="arrow" />
          </button>
          <button
            type="button"
            className="button outline full google-button"
            onClick={() =>
              notify(
                "Google sign-in is not connected yet. Use the demo form above.",
              )
            }
          >
            <strong>G</strong> Continue with Google
          </button>
        </form>
        <p className="auth-switch">
          {register ? "Already have an account?" : "New to CozyNest?"}{" "}
          <Link to={register ? "/login" : "/register"}>
            {register ? "Login" : "Create an account"}
          </Link>
        </p>
      </div>
    </section>
  );
}
