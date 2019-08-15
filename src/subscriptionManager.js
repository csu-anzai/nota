import { safelyCall } from './helpers';

const unsubscribeFrom = (subscriptions, key) => {
  const subscription = subscriptions[key];
  if (!subscription) return subscriptions;

  safelyCall(subscription.unsubscribe.bind(subscription));
  return subscriptions;
};

class SubscriptionManager {
  constructor() {
    this.subscriptions = {};
  }

  add = (nameOrSubscriptions, subscription) => {
    if (typeof nameOrSubscriptions === 'object') {
      Object
        .keys(nameOrSubscriptions)
        .forEach((name) => {
          this.add(name, nameOrSubscriptions[name]);
        });
    } else if (typeof nameOrSubscriptions === 'string') {
      if (this.has(nameOrSubscriptions)) {
        throw new Error(`Subscription with name '${nameOrSubscriptions}' already exists`);
      }

      this.subscriptions[nameOrSubscriptions] = subscription;
    } else {
      throw new Error(`Invalid name or subscription: ${nameOrSubscriptions}`);
    }
  }

  has = name => !!this.get(name)

  get = name => this.subscriptions[name]

  unsubscribe = (name = '') => {
    const { subscriptions } = this;

    if (!name) {
      Object.keys(subscriptions).reduce(unsubscribeFrom, subscriptions);

      this.subscriptions = {};
    } else {
      unsubscribeFrom(subscriptions, name);

      delete subscriptions[name];
    }
  }
}

export default SubscriptionManager;
