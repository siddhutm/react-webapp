class Node {
    constructor(data = null) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DLL {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(item) {
        let node = new Node(item);
        if(!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.currentPointer = this.tail;
    }

    hasCurrentPrev() {
        return this.currentPointer && this.currentPointer.prev !== null;
    }

    hasCurrentNext() {
        return this.currentPointer && this.currentPointer.next !== null;
    }

    getCurrentPointer() {
        return this.currentPointer;
    }

    onPrevious() {
        if(this.hasCurrentPrev()) {
            this.currentPointer = this.currentPointer.prev;
        }
    }

    onNext() {
        if(this.hasCurrentNext()) {
            this.currentPointer = this.currentPointer.next;
        }
    }

    clear() {
        this.head = null;
        this.tail = null;
    }
}

export default DLL;