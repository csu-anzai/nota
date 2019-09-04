import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import Draggable, { AXIS, DIRECTION } from '../../shared/helpers/draggable';
import ResizeHook from '../../shared/ResizeHook';
import { FULL, COLLAPSED, HIDDEN, getAwayPosition } from './restingPoints';
import { ANIMATION_DURATION, verse } from './constants';
import VerseCard from './VerseCard';
import routes from '../../shared/constants/routes';
import { goTo } from '../../shared/helpers/locationHelpers';
import { getEnsureState } from '../../shared/helpers/functionHelpers';

const { UP } = DIRECTION;

const getValidRestingPoints = current => current.id === 2 ? [FULL, COLLAPSED, HIDDEN] : [FULL, COLLAPSED];

const isEitherNavOpen = ({ isMainNavOpen = false, isBookNavOpen = false }) => isMainNavOpen || isBookNavOpen;

class DraggableVerseCard extends Component {
  constructor(props) {
    super(props);

    this.iconRef = React.createRef();

    this.scrollerRef = React.createRef();

    this.draggable = null;
    
    this.state = {
      restingPoints: getValidRestingPoints(HIDDEN),
      currentRestingPoint: HIDDEN,
      showAddButton: false,
    }

    this.ensureState = getEnsureState(this);
  }

  componentWillUnmount() {
    this.draggable.destroy();
  }

  componentDidUpdate(prevProps) {
    const isNavOpen = isEitherNavOpen(this.props);
    const wasNavOpen = isEitherNavOpen(prevProps);

    if (!wasNavOpen && isNavOpen) {
      this.draggable.animateToRestingPoint(HIDDEN);
    } else if (wasNavOpen && !isNavOpen) {
      this.draggable.animateToRestingPoint(COLLAPSED);
    }
  }

  initDraggable = (ref) => {
    const { restingPoints } = this.state;
    
    this.draggable = new Draggable({
      axis: AXIS.Y,
      restingPoints,
      animationDuration: ANIMATION_DURATION,
      onAnimateTo: this.handleAnimateTo,
      onAnimateToCompleted: this.handleAnimateToCompleted,
      getIsMoveable: this.isMoveable,
      startingPosition: HIDDEN.getPosition(),
      ref,
    });

    if (this.props.verseId) this.draggable.animateToRestingPoint(COLLAPSED);
  }

  // setScrollerRef = (ref) => {
  //   this.scrollerRef = ref;

  //   const scroll$ = fromEvent(ref, 'scroll');

  //   scroll$.subscribe(console.log);
  // }

  getRestingPoint = (id) => {
    const { restingPoints } = this.state;
    return restingPoints.find(rp => rp.id === id);
  }

  setIconStyle = ({ id }) => {
    const { current } = this.iconRef;

    if (!current) return;

    if (id === 1) {
      current.style.transform = "rotate(0deg)";
    } else {
      current.style.transform = "rotate(-180deg)";
    }
  }

  setCurrentRestingPoint = (id) => {
    const currentRestingPoint = this.getRestingPoint(id);

    this.setIconStyle(currentRestingPoint);

    const newRestingPoints = getValidRestingPoints(currentRestingPoint)

    this.setState({
      currentRestingPoint,
      restingPoints: newRestingPoints,
    });

    this.draggable.setRestingPoints(newRestingPoints);
  }

  handleAnimateTo = ({ point: { restingPoint }}) => {
    const { id } = restingPoint;

    this.setCurrentRestingPoint(id);
  }

  handleAnimateToCompleted = ({ point: { restingPoint }}) => {
    const { id } = restingPoint;

    if (id === FULL.id) {
      this.ensureState({ showAddButton: true });
    } else if (id === HIDDEN.id && !isEitherNavOpen(this.props)) {
      goTo(routes.readChapter.action());
    } else {
      this.ensureState({ showAddButton: false });
    }
  }

  handleClick = () => {
    const { currentRestingPoint } = this.state;
    const { id: restingPointId } = currentRestingPoint || {};

    if (restingPointId === COLLAPSED.id) {
      this.draggable.animateTo({
        position: FULL.position,
        restingPoint: FULL,
      });
    } else {
      this.draggable.animateTo({
        position: getAwayPosition(this.draggable.ref),
        restingPoint: COLLAPSED,
      });
    }
  }
  
  maybeSetShowAddButton = debounce((currentRestingPoint, scrollerIsAtTop, direction) => {
    if (currentRestingPoint === FULL && (scrollerIsAtTop || direction === DIRECTION.DOWN)) {
      this.ensureState({ showAddButton: true });
    } else {
      this.ensureState({ showAddButton: false });
    }
  }, 200)

  isMoveable = ({ event, direction }) => {
    if (event.target.classList.contains('draggable')) return true;
    
    const { current } = this.scrollerRef;
    if (!current) return true;

    const { currentRestingPoint } = this.state;
    if (currentRestingPoint.id !== 1) return true;

    const scrollerIsAtTop = current.scrollTop < 1;

    this.maybeSetShowAddButton(currentRestingPoint, scrollerIsAtTop, direction);

    if (direction === UP || !scrollerIsAtTop) return false;

    return true;
  }

  onResize = () => {
    this.draggable.animateToClosestRestingPoint();
  }

  render() {
    const { currentRestingPoint, showAddButton } = this.state;

    return (
      <>
        {/* <ButtonPrimary
          onClick={() => this.handleClick(animateTo, draggableRef)}
          type="button"
          style={{ position: 'absolute', top: 8, right: 8 }}
        >
          Toggle
        </ButtonPrimary> */}
        <ResizeHook onResize={this.onResize} />
        <VerseCard
          draggableRef={this.initDraggable}
          scrollerRef={this.scrollerRef}
          iconRef={this.iconRef}
          handleClick={this.handleClick}
          verse={verse}
          currentRestingPoint={currentRestingPoint}
          showAddButton={showAddButton}
        />
      </>
    )
  };
}

const mapStateToProps = state => ({
  isMainNavOpen: state.navigation.isMainNavOpen,
  isBookNavOpen: state.navigation.isBookNavOpen
});

export default connect(mapStateToProps)(DraggableVerseCard);
