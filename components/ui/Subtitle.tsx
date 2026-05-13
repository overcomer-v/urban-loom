export default function Subtitle({ label,showButton }: { label: string,showButton?:boolean }) {
  return <div className="flex items-center justify-between w-full">
    <h2 className="text-3xl font-semibold">{label}</h2>
   {showButton &&  <span className="text-xs opacity-50">SEE MORE</span>}
  </div>;
}
