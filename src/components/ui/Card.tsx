import { type HTMLAttributes } from "react";

export default function Card({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-white border border-border rounded-lg p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
