import React from 'react';
import { connect } from 'react-redux';
import DraggableVerseCard from './verseCard/DraggableVerseCard';
import CardContainer from '../shared/CardContainer';
import styled from '@emotion/styled';
import theme from '../styles/theme';
import Link from '../shared/Link';
import routes from '../shared/constants/routes';

const Read = ({ verseId }) => (
  <>
    <CardContainer>
      <ContentCard>
        Lorem ipsum
        <Link to={routes.readVerse.action({ chapterId: 1, bookId: 1, verseId: 1 })}>
          Read verse
        </Link>
      </ContentCard>
    </CardContainer>
    {verseId && (
      <CardContainer path="verse">
        <DraggableVerseCard verseId={verseId} />
      </CardContainer>
    )}
  </>
);

const ContentCard = styled.div`
  background-color: ${theme.blank};
  height: 100%;
  width: 100%;
  position: absolute;
  top: 50px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  pointer-events: all;
`;

const mapStateToProps = state => ({ verseId: state.location.payload.verseId });

export default connect(mapStateToProps)(Read);
