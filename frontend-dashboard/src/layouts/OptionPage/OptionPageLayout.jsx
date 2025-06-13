import { useTranslation } from "react-i18next";
import { usePageStore } from "@/stores/usePageStore";
import Body from "@/components/Body";
import CursorModeOptions from "@/layouts/OptionPage/CursorModeOptions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollModeOptions from "@/layouts/OptionPage/ScrollModeOptions";

export default function OptionPageLayout() {
  const { t } = useTranslation();
  const optionPage = usePageStore((state) => state.optionPage);

  const renderOption = () => {
    switch (t(optionPage)) {
      case "Cursor":
      case "커서":
        return <CursorModeOptions />;
      case "Scroll":
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
