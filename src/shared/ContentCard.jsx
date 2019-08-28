import styled from "@emotion/styled";
import theme from "../styles/theme";

const ContentCard = styled.div`
  background-color: ${theme.blank};
  height: 100%;
  width: 100%;
  position: absolute;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  pointer-events: all;
  transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

export default ContentCard;
