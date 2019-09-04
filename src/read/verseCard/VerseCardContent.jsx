import React from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { safelyCall } from '../../shared/helpers/functionHelpers';
import VerseCardContentWindow from './VerseCardContentWindow';
import AddAnnotationButton from './AddAnnotationButton';

const preventDefault = (e) => { safelyCall(e.stopPropagation.bind(e)); }

const VerseCardContent = ({
  verse,
  scrollerRef,
}) => (
  // TODO: remove the handlers
  <VerseCardContentContainer
    ref={scrollerRef}
    onTouchStart={preventDefault}
    onTouchEnd={preventDefault}
    onTouchMove={preventDefault}
  >
    <VerseCardContentWindow verse={verse} />
    <VerseCardContentTextContainer>
      Pancetta chicken tongue pork belly, ball tip drumstick flank pastrami spare ribs doner. Kielbasa tail bresaola flank. Ham hock pastrami shoulder sausage ribeye t-bone pork loin. Ball tip alcatra burgdoggen shank, buffalo jerky salami swine picanha chuck ground round tri-tip capicola meatloaf beef ribs.

      Pancetta turducken sausage, rump tail pork loin chuck cow boudin. Pastrami shank beef venison pork chop pork frankfurter turkey brisket pancetta meatball. Pork loin corned beef hamburger, chuck beef ham hock landjaeger doner t-bone pork belly strip steak turducken leberkas fatback. Tail cow boudin, chicken cupim chuck salami corned beef meatloaf pork chop ball tip spare ribs tri-tip filet mignon.

      Pancetta cow ribeye, tongue biltong pork loin burgdoggen andouille. T-bone alcatra short loin ham frankfurter. Filet mignon kielbasa cupim tongue landjaeger turducken ball tip salami prosciutto. Pork chuck cupim jowl brisket leberkas rump pig ground round tenderloin beef ham hock.

      Picanha kielbasa ribeye t-bone tail kevin chicken alcatra bresaola rump burgdoggen andouille turkey sausage pork loin. Corned beef shankle pork belly ribeye spare ribs sausage short ribs picanha beef ribs chuck swine buffalo. Pig short loin filet mignon short ribs ribeye sausage salami ham t-bone spare ribs turkey picanha. Ham hock salami shoulder burgdoggen. Flank pork belly fatback sausage alcatra chuck meatball venison.

      Chuck prosciutto pork short loin filet mignon. Boudin beef ribs frankfurter turducken jowl short ribs jerky tri-tip prosciutto chicken sausage brisket. Spare ribs buffalo alcatra chuck pastrami t-bone. Filet mignon salami t-bone bacon meatball biltong bresaola.

      Does your lorem ipsum text long for something a little meatier? Give our generator a try… it’s tasty!
    </VerseCardContentTextContainer>
  </VerseCardContentContainer>
);

const VerseCardContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  overflow-y: auto;
`;

const VerseCardContentTextContainer = styled.div`
  background-color: white;
  color: ${theme.text};
  padding: 16px;
  height: 4000px;
  line-height: 1.5em;
`;

export default VerseCardContent;
