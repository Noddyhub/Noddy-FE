export default function Body({ children }) {
  return (
    <div className="m-2 flex h-[60vh] w-[50vh] flex-col items-center justify-start rounded-2xl border-2">
      <div className="mt-2 mb-2 text-xl font-bold">Option</div>
      {children}
    </div>
  );
}
