# Binary Search Trees

## Assignment

You'll build a balanced BST in this assignment. Do not use duplicate values because they make it more complicated and result in trees that are much harder to balance. Therefore, be sure to always remove duplicate values or check for an existing value before inserting.

## Requirements

### 1. Build a Node class/factory
It should have an attribute for the data it stores as well as its left and right children.

### 2. Build a Tree class/factory
- Accepts an array when initialized
- Should have a `root` attribute, which uses the return value of `buildTree` which you'll write next

### 3. Write a `buildTree(array)` function
Takes an array of data (e.g., `[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]`) and turns it into a balanced binary tree full of Node objects appropriately placed (don't forget to sort and remove duplicates!). The `buildTree` function should return the level-0 root node.

**Tip:** If you would like to visualize your binary search tree, here is a `prettyPrint()` function that will console.log your tree in a structured format. This function will expect to receive the root of your tree as the value for the node parameter.

```javascript
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
```

### 4. Write `insert(value)` and `deleteItem(value)` functions
- Insert/delete the given value
- You'll have to deal with several cases for delete, such as when a node has children or not
- If you need additional resources, check out these two articles on [inserting and deleting](https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/), or this [video on BST inserting/removing](https://www.youtube.com/watch?v=wcIRPqTR3Kc) with several visual examples

> **Important:** You may be tempted to implement these methods using the original input array used to build the tree, but it's important for the efficiency of these operations that you don't do this. If we refer back to the Big O Cheatsheet, we'll see that binary search trees can insert/delete in O(log n) time, which is a significant performance boost over arrays for the same operations. To get this added efficiency, your implementation of these methods should traverse the tree and manipulate the nodes and their connections.

### 5. Write a `find(value)` function
Returns the node with the given value.

### 6. Write a `levelOrderForEach(callback)` function
- Accepts a callback function as its parameter
- Should traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how `Array.prototype.forEach` might work for arrays
- May be implemented using either iteration or recursion (try implementing both!)
- If no callback function is provided, throw an Error reporting that a callback is required

**Tip:** You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list ([video on level order traversal](https://www.youtube.com/watch?v=86g8jAQug04)).

### 7. Write traversal functions
Write `inOrderForEach(callback)`, `preOrderForEach(callback)`, and `postOrderForEach(callback)` functions that also accept a callback as a parameter. Each of these functions should:
- Traverse the tree in their respective depth-first order
- Pass each node to the provided callback
- Throw an Error if no callback is given as an argument, like with `levelOrderForEach`

The video [Binary Tree Traversal: Preorder, Inorder, Postorder](https://www.youtube.com/watch?v=WLvU5EQVZqY) explains the topic clearly.

### 8. Write a `height(value)` function
- Returns the height of the node containing the given value
- Height is defined as the number of edges in the longest path from that node to a leaf node
- If the value is not found in the tree, the function should return `null`

### 9. Write a `depth(value)` function
- Returns the depth of the node containing the given value
- Depth is defined as the number of edges in the path from that node to the root node
- If the value is not found in the tree, the function should return `null`

### 10. Write an `isBalanced` function
Checks if the tree is balanced. A binary tree is considered balanced if, for every node in the tree, the height difference between its left and right subtrees is no more than 1, and both the left and right subtrees are also balanced.

> **Pitfall with checking balance:** A common mistake is only checking the height difference between the root's left and right children. That is not enough — you must check the balance condition for every node.

### 11. Write a `rebalance` function
Rebalances an unbalanced tree. **Tip:** You'll want to use a traversal method to provide a new array to the `buildTree` function.

## Tie it all together

Write a driver script that does the following:

1. Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
2. Confirm that the tree is balanced by calling `isBalanced`.
3. Print out all elements in level, pre, post, and in order.
4. Unbalance the tree by adding several numbers > 100.
5. Confirm that the tree is unbalanced by calling `isBalanced`.
6. Balance the tree by calling `rebalance`.
7. Confirm that the tree is balanced by calling `isBalanced`.
8. Print out all elements in level, pre, post, and in order.
