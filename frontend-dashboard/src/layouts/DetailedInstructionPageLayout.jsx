import ThreeDimensionalImage from "@/components/3D/ThreeDimensionalImage";

export default function DetailedInstructionPageLayout(props) {
  const { rounded, model, cameraRotation } = props;

  return <ThreeDimensionalImage rounded={rounded} model={model} cameraRotation={cameraRotation} />;
}
