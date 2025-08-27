class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr = []) {
    const sortedArr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArr);
  }

  buildTree(sortedArr) {
    if (sortedArr.length === 0) return null;
    const mid = Math.floor(sortedArr.length / 2);
    const newNode = new Node(sortedArr[mid]);
    newNode.left = this.buildTree(sortedArr.slice(0, mid));
    newNode.right = this.buildTree(sortedArr.slice(mid + 1));
    return newNode;
  }
}

const arr = [2, 4, 3, 1, 2, 5];
const test = new Tree(arr);
console.log(test.root);
