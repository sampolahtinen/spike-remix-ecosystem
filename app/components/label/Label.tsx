import * as spanStyles from "./Label.css"; // Note that `.ts` is omitted here

export const Label = ({ children }: { children: any }) => {
  return (
    <div>
      <span className={spanStyles.root}>{children}</span>
      {/* <div className={boxStyles}>In TS file definition</div> */}
    </div>
  );
};
Label.displayName = "Label";
