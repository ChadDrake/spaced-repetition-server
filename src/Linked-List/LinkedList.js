const _Node = require("./node");
class LinkedList {
  constructor() {
    this.head = null;
  }
  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }
  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);

      return tempNode.next;
    }
  }
  insertBefore(item, location) {
    let currNode = this.head;
    let prev = {};
    while (currNode.value !== location) {
      if (currNode.next === null) {
        return null;
      } else {
        prev = currNode;
        currNode = currNode.next;
      }
    }
    prev.next = new _Node(item, currNode);
  }
  insertAfter(item, location) {
    let currNode = this.head;
    let tempNode = {};
    while (currNode.value.original !== location) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }

    currNode.next = new _Node(item, tempNode);
    return currNode.next;
  }
  insertAt(item, index) {
    let currNode = this.head;
    let tempNode = {};

    if (index <= 1) {
      return this.insertFirst(item);
    }

    for (let i = 1; i < index - 1; i++) {
      if (currNode.next === null) {
        return this.insertLast(item);
      }
      currNode = currNode.next;
    }
    if (currNode) {
      tempNode = currNode.next;
    }

    currNode.next = new _Node(item, tempNode);
    return currNode.next;
  }
  find(item) {
    let currNode = this.head;

    if (!this.head) {
      return null;
    }

    while (currNode.value.translation !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }

    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }

    if (this.head.value.original === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;

    let previousNode = this.head;

    while (currNode && currNode.value.original !== item) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      return;
    }
    previousNode.next = currNode.next;
  }
}
module.exports = LinkedList;
