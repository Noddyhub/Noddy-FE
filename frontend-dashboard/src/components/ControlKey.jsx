import OptionsList from "@/components/OptionsList";

export default function ControlKey({ name }) {
  return (
    <div className="mb-2 flex w-[45vh] flex-row items-center justify-between rounded-2xl px-2">
      <div className="mt-2 mb-2 ml-2 font-medium dark:text-white">{name}</div>
      <div>
        <OptionsList name={name} />
      </div>
    </div>
  );
}
