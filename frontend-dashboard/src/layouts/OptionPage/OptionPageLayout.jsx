import { usePageStore } from "@/stores/usePageStore";
import Body from "@/components/Body";
import CursorModeOptions from "@/layouts/OptionPage/CursorModeOptions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollModeOptions from "@/layouts/OptionPage/ScrollModeOptions";

export default function OptionPageLayout() {
  const optionPage = usePageStore((state) => state.optionPage);

  const renderOption = () => {
    switch (optionPage) {
      case "커서":
        return <CursorModeOptions />;
      case "스크롤":
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
