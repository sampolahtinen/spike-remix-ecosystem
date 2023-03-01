import { Button } from "@looma/core";
import { Label } from "~/components/label";

export default function Index() {
  const handleDoSomething = () => {
    console.log(`clicked`);
  };
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Spike: Remix Ecosystem</h1>
      <h2>Looma integration</h2>
      <Button variant="primary" onClick={handleDoSomething}>
        Looma button
      </Button>
      <h2>Vanilla extract styles</h2>
      <Label>Styled with Vanilla Extract</Label>
    </div>
  );
}
