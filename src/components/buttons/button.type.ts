export type buttonProps = {
  children: string;
  type?: "button" | "submit" | "reset";
  cnames?: string;
  onClick?: () => void;
  disable?: boolean;
};
