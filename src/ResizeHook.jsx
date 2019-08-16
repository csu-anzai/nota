import { Component } from 'react';
import SubscriptionManager from './subscriptionManager';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

class ResizeHook extends Component {
  constructor(props) {
    super(props);

    this.subscriptions = new SubscriptionManager();
  }
  
  componentDidMount() {
    const resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(100),
    );

    const resizeSubscription = resize$.subscribe(this.handleResize);

    this.subscriptions.add('resize', resizeSubscription);
  }

  componentWillUnmount() {
    this.subscriptions.unsubscribe();
  }

  handleResize = (e) => {
    const { onResize } = this.props;

    onResize(e);
  }

  render() { return null; }
}

export default ResizeHook;
