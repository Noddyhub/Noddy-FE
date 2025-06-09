import ThreeDimensionalImage from "@/components/ThreeDimensionalImage";

export default function DetailedInstructionPageLayout(options) {
  const { rounded, model } = options;

  return <ThreeDimensionalImage rounded={rounded} model={model} />;
}
