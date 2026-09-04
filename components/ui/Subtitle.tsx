import Link from "next/link";

export default function Subtitle({
  label,
  showButton,
  titleClassName,
  onNavLink,
}: {
  label: string;
  titleClassName?: string;
  showButton?: boolean;
  onNavLink?: string;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <h2 className={`md:text-3xl text-2xl font-semibold font-heading ${titleClassName}`}>
        {label}
      </h2>
      {showButton && (
        <Link className="text-xs opacity-50" href={onNavLink ?? ""}>
          SEE MORE
        </Link>
      )}
    </div>
  );
}
