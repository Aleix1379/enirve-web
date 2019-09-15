import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private subscriptions = {};

  constructor() {
  }

  public publish(topic: string, eventData?: any): void {
    if (this.subscriptions[topic]) {
      this.subscriptions[topic](eventData);
    } else {
      console.warn(`There is no subscription for the topic: ->${topic}<-`);
    }
  }

  public subscribe(topic: string, handler: (...data: any) => void): void {
    this.subscriptions[topic] = handler;
  }

  public unsubscribe(topic: string): void {
    delete this.subscriptions[topic];
  }

}
