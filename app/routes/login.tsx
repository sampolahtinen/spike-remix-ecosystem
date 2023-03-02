import { Button } from "@looma/core";
import { sprinkles } from "../styles/sprinkles.css";
import { Form } from "@remix-run/react";

const Login = () => {
  return (
    <div
      className={sprinkles({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      })}
    >
      <h1
        className={sprinkles({
          mb: "4",
        })}
      >
        Login
      </h1>
      <section
        className={sprinkles({
          width: 100,
          display: "flex",
          justifyContent: "center",
        })}
      >
        <Form action="/auth/auth0" method="post">
          <Button>Log in</Button>
        </Form>
      </section>
    </div>
  );
};

export default Login;
