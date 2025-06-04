import { Routes, Route } from "react-router-dom";
import InstructionPageLayout from "@/layouts/InstructionPageLayout";
import OptionPageLayout from "@/layouts/OptionPageLayout";
import StartPageLayout from "@/layouts/StartPageLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPageLayout />} />
      <Route path="/instruction-page" element={<InstructionPageLayout />} />
      <Route path="/option-page" element={<OptionPageLayout />} />
    </Routes>
  );
}
