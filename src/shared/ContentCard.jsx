import styled from "@emotion/styled";
import theme from "../styles/theme";

const ContentCard = styled.div`
  background-color: ${theme.blank};
  height: 100%;
  width: 100%;
  position: absolute;
  /* top: 50px; */
  /* transform: translateY(0) translateX(0); */
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  pointer-events: all;
  transition: transform 0.1s ease-in-out;
`;

export default ContentCard;
