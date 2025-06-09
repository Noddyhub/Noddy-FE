import ThreeDimensionalImage from "@/components/ThreeDimensionalImage";

export default function DetailedInstructionPageLayout(options) {
  const { rounded, model, cameraRotation } = options;

  return <ThreeDimensionalImage rounded={rounded} model={model} cameraRotation={cameraRotation} />;
}
