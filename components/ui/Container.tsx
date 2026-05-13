export default function Container({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}) {
  return (
    <div className={`xl:px-28 px-8 ${className || ""}`} {...props}>
      {children}
    </div>
  );
}