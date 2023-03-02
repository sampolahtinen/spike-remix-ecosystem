import { useField } from "remix-validated-form";
import { sprinkles } from "~/styles/sprinkles.css";
import * as styles from "./Input.css";

type MyInputProps = {
  name: string;
  label: string;
};

export const Input = ({ name, label }: MyInputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <div className={styles.root}>
      <label htmlFor={name}>{label}</label>
      <input className={styles.input} {...getInputProps({ id: name })} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
