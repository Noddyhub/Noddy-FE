import ThreeDimensionalImage from "@/components/ThreeDimensionalImage";

export default function DetailedInstructionPageLayout(props) {
  const { rounded, model, cameraRotation } = props;

  return <ThreeDimensionalImage rounded={rounded} model={model} cameraRotation={cameraRotation} />;
}
