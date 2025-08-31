
class Node {
  constructor(data) {
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

  insert(value, currentNode = this.root) {
    if (currentNode === null) return new Node(value);
    if (currentNode.data === value) return currentNode;

    if (currentNode.data < value) {
      currentNode.right = this.insert(value, currentNode.right);
    } else {
      currentNode.left = this.insert(value, currentNode.left);
    }
    return currentNode;
  }
  remove(value, currentNode = this.root) {
    if (currentNode === null) return currentNode;

    if (currentNode.data === value) {
      currentNode = this.#removeNodeHelper(currentNode);
    } else if (currentNode.data > value) {
      currentNode.left = this.remove(value, currentNode.left);
    } else {
      currentNode.right = this.remove(value, currentNode.right);
    }
    return currentNode;
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
    if (this.root === null) return [];
    
    const queue = [this.root];
    const levelOrderList = [];
    
    while (queue.length > 0) {
      const currentNode = queue.shift();
      
      if (callbackFn) {
        callbackFn(currentNode);
      } else {
        levelOrderList.push(currentNode.data);
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    
    return callbackFn ? undefined : levelOrderList;
  }

  inorder(callbackFn, node = this.root, inorderList = []) {
    if (node === null) return callbackFn ? undefined : [];

    this.inorder(callbackFn, node.left, inorderList);
    
    if (callbackFn) {
      callbackFn(node);
    } else {
      inorderList.push(node.data);
    }
    
    this.inorder(callbackFn, node.right, inorderList);

    return callbackFn ? undefined : inorderList;
  }

  preorder(callbackFn, node = this.root, preorderList = []) {
    if (node === null) return callbackFn ? undefined : [];

    if (callbackFn) {
      callbackFn(node);
    } else {
      preorderList.push(node.data);
    }
    
    this.preorder(callbackFn, node.left, preorderList);
    this.preorder(callbackFn, node.right, preorderList);

    return callbackFn ? undefined : preorderList;
  }

  postorder(callbackFn, node = this.root, postorderList = []) {
    if (node === null) return callbackFn ? undefined : [];

    this.postorder(callbackFn, node.left, postorderList);
    this.postorder(callbackFn, node.right, postorderList);
    
    if (callbackFn) {
      callbackFn(node);
    } else {
      postorderList.push(node.data);
    }

    return callbackFn ? undefined : postorderList;
  }

  height(node = this.root) {
    if (node === null) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(nodeValue, node = this.root, edgeCount = 0) {
    if (node === null) return null;
    if (node.data === nodeValue) return edgeCount;

    if (node.data < nodeValue) {
      return this.depth(nodeValue, node.right, edgeCount + 1);
    } else {
      return this.depth(nodeValue, node.left, edgeCount + 1);
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

  #inorderSuccessorFor(node) {
    let currentNode = node;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  #removeNodeHelper(node) {
    if (node.left && node.right) {
      const successorNode = this.#inorderSuccessorFor(node.right);
      node.data = successorNode.data;
      node.right = this.remove(successorNode.data, node.right);
      return node;
    } else {
      const replacementNode = node.right || node.left;
      return replacementNode;
    }
  }
}


