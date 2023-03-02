import { Button } from "@looma/core";
import { sprinkles } from "~/styles/sprinkles.css";
import { Label } from "~/components/label";

export default function Index() {
  const handleDoSomething = () => {
    console.log(`clicked`);
  };
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Spike: Remix Ecosystem</h1>
      <section>
        <h2>Looma integration</h2>
        <Button variant="primary" onClick={handleDoSomething}>
          Looma button
        </Button>
      </section>

      <section>
        <h2>Vanilla extract styles</h2>
        <Label>Styled with Vanilla Extract</Label>
      </section>

      <section>
        <h2>Sprinkles</h2>
        <div
          className={sprinkles({
            background: "gray-300",
            padding: "6",
            margin: "3",
          })}
        >
          Sprinkles box
        </div>
      </section>

      <section>
        <h2>Tailwind styles</h2>
        <div className="bg-slate-900 text-red-600 p-8">Tailwind box</div>
      </section>
    </div>
  );
}
