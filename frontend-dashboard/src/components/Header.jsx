export default function Header() {
  return (
    <>
      <div className="h-[10vh] w-[50vh] rounded-2xl border-2">
        <div className="flex justify-center text-4xl font-extrabold">Noddy</div>
        <div className="flex h-[4vh] w-[50vh]">
          <button className="ml-auto h-[4vh] w-[5vh] cursor-pointer rounded-xl border-2">Cursor</button>
          <button className="h-[4vh] w-[5vh] cursor-pointer rounded-xl border-2">Scroll</button>
          <button className="h-[4vh] w-[5vh] cursor-pointer rounded-xl border-2">Keys</button>
        </div>
      </div>
    </>
  );
}
