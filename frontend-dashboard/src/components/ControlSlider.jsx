export default function ControlSlider({ name }) {
  return (
    <div className="mb-2 flex h-[5vh] w-[48vh] flex-row items-center justify-between rounded-2xl border-2 px-2">
      <div>{name}</div>
      <div className="flex flex-row">
        <input type="range" className="rounded-2xl border-2 px-2" />
      </div>
    </div>
  );
}
