import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Body from "@/components/Body";
import { useMovementStore } from "@/stores/useMovementStore";
import CursorModeOptions from "@/pages/cursorMode/CursorModeOptions";
import ScrollModeOptions from "@/pages/scrollMode/ScrollModeOptions";

export default function MainLayout({ children }) {
  const optionPage = useMovementStore((state) => state.optionPage);

  const renderOption = () => {
    switch (optionPage) {
      case "Cursor":
        return <CursorModeOptions />;
      case "Scroll":
        return <ScrollModeOptions />;
    }
  };

  return (
    <>
      <div className="absolute -z-100 h-[100vh] w-[50vh] bg-gray-100"></div>
      <Header />
      <main>
        <Body children={renderOption()} />
      </main>
      <Footer />
    </>
  );
}
