import * as styles from "./Label.css"; // Note that `.ts` is omitted here

export const Label = ({ children }: { children: any }) => (
  <span className={styles.root}>{children}</span>
);
Label.displayName = "Label";
