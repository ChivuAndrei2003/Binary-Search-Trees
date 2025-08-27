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
  
  insert(value, currNode =this.root) {
    if (currNode === null) return new Node(value);
    if (currNode.data === value) return;

    if (currNode.data < value) {
      currNode.right = this.insert(value, currNode.right);
    } else {
      currNode.left = this.insert(value, currNode.left);
    }
    return currNode;
    
  }
  delete(value, currNode = this.root) {
    
  }

}

const arr = [2, 4, 3, 1, 2, 5];
const test = new Tree(arr);
console.log(test.root);
