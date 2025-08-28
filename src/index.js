
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

  insert(value, currNode = this.root) {
    if (currNode === null) return new Node(value);
    if (currNode.data === value) return;

    if (currNode.data < value) {
      currNode.right = this.insert(value, currNode.right);
    } else {
      currNode.left = this.insert(value, currNode.left);
    }
    return currNode;
  }
  remove(value, currNode = this.root) {
    if (currNode === null) return currNode;

    if (currNode.data === value) {
      currNode = this.#removeNodeHelper(currNode);
    } else if (currNode.data > value) {
      currNode.left = this.remove(value, currNode.left);
    } else {
      currNode.right = this.remove(value, currNode.right);
    }
    return currNode;
  }

  find(value, node = this.root) {
    if (node === null || node.data === value) return node;

    if (node.data < value) {
      return this.find(value, node.right);
    } else {
      return this.find(value, node.left);
    }
  }

  levelOrder(callbackFn) {
    const que = [this.root];
    const levelOrderList = [];
    while (que.length > 0) {
      const curentNode = que.shift();
      callbackFn
        ? callbackFn(curentNode)
        : levelOrderList.push(curentNode.data);

      const enqueList = [curentNode?.left, curentNode?.right].filter(
        (value) => value
      );
      que.push(...enqueList);
    }
    if (levelOrderList.length > 0) return levelOrderList;
  }

  inorder(callbackFn, node = this.root, inorderList = []) {
    if (node === null) return;

    this.inorder(callbackFn, node.left, inorderList);
    callbackFn ? callbackFn(node) : inorderList.push(node.data);
    this.inorder(callbackFn, node.right, inorderList);

    if (inorderList.length > 0) return inorderList;
  }

  preorder(callbackFn, node = this.root, preorderList = []) {
    if (node === null) return;

    callbackFn ? callbackFn(node) : preorderList.push(node.data);
    this.preorder(callbackFn, node.left, preorderList);
    this.preorder(callbackFn, node.right, preorderList);

    if (preorderList.length > 0) return preorderList;
  }

  postorder(callbackFn, node = this.root, postorderList = []) {
    if (node === null) return;

    this.postorder(callbackFn, node.left, postorderList);
    this.postorder(callbackFn, node.right, postorderList);
    callbackFn ? callbackFn(node) : postorderList.push(node.data);

    if (postorderList.length > 0) return postorderList;
  }

  height(node = this.root) {
    if (node === null) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(nodeVal, node = this.root, edgeCount = 0) {
    if (node === null) return;
    if (node.data === nodeVal) return edgeCount;

    if (node.data < nodeVal) {
      return this.depth(nodeVal, node.right, edgeCount + 1);
    } else {
      return this.depth(nodeVal, node.left, edgeCount + 1);
    }
  }

  isBalanced() {
    return this.#testBalance(this.root) !== -1;
  }

  rebalance() {
    const inorderList = this.inorder();
    this.root = this.buildTree(inorderList);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return;
    if (node.right) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "|   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left) {
      this.prettyPrint(
        node.left,
        `${prefix}${isLeft ? "    " : "|   "}`,
        true
      );
    }
  }

  #testBalance(node) {
    if (node === null) return 0;

    const leftBalance = this.#testBalance(node.left);
    const rightBalance = this.#testBalance(node.right);
    const diff = Math.abs(leftBalance - rightBalance);

    if (leftBalance === -1 || rightBalance === -1 || diff > 1) {
      return -1;
    } else {
      return Math.max(leftBalance, rightBalance) + 1;
    }
  }

  #inorderSuccesorFor(node) {
    let currNode = node;
    while (currNode.left) {
      currNode = currNode.left;
    }
    return currNode;
  }

  #removeNodeHelper(node) {
    if (node.left && node.right) {
      const successorNode = this.#inorderSuccesorFor(node.right);
      node.data = successorNode.data;
      node.right = this.remove(successorNode.data, node.right);
      return node;
    } else {
      const replacementNode = node.right || node.left;
      node = null;
      return replacementNode;
    }
  }
}

// TODO(human)

const arr = [2, 4, 3, 1, 2, 5];
const test = new Tree(arr);
console.log("=== BST Testing ===");
console.log("Tree structure:");
test.prettyPrint();

console.log("\nTraversal tests:");
console.log("Inorder:", test.inorder());
console.log("Preorder:", test.preorder());
console.log("Postorder:", test.postorder());
console.log("Level order:", test.levelOrder());

console.log("\nSearch and insert tests:");
console.log("Find 4:", test.find(4) ? "Found" : "Not found");
console.log("Find 10:", test.find(10) ? "Found" : "Not found");
test.insert(6);
console.log("After inserting 6:");
test.prettyPrint();

console.log("\nTree properties:");
console.log("Height:", test.height());
console.log("Depth of node 4:", test.depth(4));
console.log("Is balanced:", test.isBalanced());
