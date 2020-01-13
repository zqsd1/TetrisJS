/**
 * Design Pattern Observer
 */
class Subject{
    constructor() {
        this.observers = [];
    }

    subscribeObserver(observer) {
        this.observers.push(observer);
    }
    unsubscribeObserver(observer) {
        var index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    notifyObserver(observer) {
        var index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers[index].notify();
        }
    }
    notifyAllObservers() {
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i].notify(i);
        }

    }
}


class Observer {

    constructor() {

    }
    notify(index) {
        console.log("Observer " + index + " is notified!");

    }
}
