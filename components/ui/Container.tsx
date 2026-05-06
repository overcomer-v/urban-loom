export default function Container({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}) {
  return (
    <div className={`px-28 ${className || ""}`} {...props}>
      {children}
    </div>
  );
}