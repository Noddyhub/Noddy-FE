import { useMovementStore } from "@/stores/useMovementStore";
import Body from "@/components/Body";
import CursorModeOptions from "@/pages/cursorMode/CursorModeOptions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollModeOptions from "@/pages/scrollMode/ScrollModeOptions";

export default function OptionPageLayout() {
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
      <Header />
      <main>
        <Body children={renderOption()} />
      </main>
      <Footer />
    </>
  );
}
