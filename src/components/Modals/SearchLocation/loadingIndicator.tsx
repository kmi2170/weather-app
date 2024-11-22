import { keyframes, styled } from "@mui/material/styles";

const maxScale = 1.5;
const minOpacity = 0.2;

const pulseL = keyframes`
  0% {
     opacity: 1.0;
     scale: ${maxScale};
  }
  50% {
     opacity: ${minOpacity};
     scale: 1;
  }
  100% {
     opacity: ${minOpacity};
     scale: 1;
  }
`;

const pulseM = keyframes`
  0% {
     opacity: ${minOpacity};
     scale: 1;
  }
  50% {
     opacity: 1.0;
     scale: ${maxScale};
  }
  100% {
     opacity: ${minOpacity};
     scale: 1;
  }
`;

const pulseR = keyframes`
  0% {
     opacity: ${minOpacity};
     scale: 1;
  }
  50% {
     opacity: ${minOpacity};
     scale: 1;
  }
  100% {
     opacity: 1.0;
     scale: ${maxScale};
  }
`;

const Dot = styled("div")({
  display: "inline-block",
  margin: "0 0.75rem",
  width: "1.0rem",
  height: "1.0rem",
  borderRadius: "50%",
  backgroundColor: "purple",
});

const period = 0.75;

const DotIndicatorLeft = styled(Dot)({
  animation: `${pulseL} ${period}s infinite ease-in-out`,
});

const DotIndicatorMiddle = styled(Dot)({
  animation: `${pulseM} ${period}s infinite ease-in-out`,
});

const DotIndicatorRight = styled(Dot)({
  animation: `${pulseR} ${period}s infinite ease-in-out`,
});

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
});

const LoadingIndicator = () => {
  return (
    <Wrapper>
      <DotIndicatorLeft />
      <DotIndicatorMiddle />
      <DotIndicatorRight />
    </Wrapper>
  );
};

export default LoadingIndicator;
