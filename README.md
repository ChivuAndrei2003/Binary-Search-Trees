# Binary Search Tree Implementation

A complete implementation of a balanced Binary Search Tree (BST) data structure in JavaScript with comprehensive functionality and testing.

## Features

### Core Data Structures
- **Node Class**: Represents individual tree nodes with data and child references
- **Tree Class**: Main BST implementation with automatic balancing and sorting

### Tree Operations
- **Construction**: Builds balanced BST from arrays (removes duplicates, sorts automatically)
- **Insertion**: Add new values while maintaining BST properties
- **Deletion**: Remove values with proper handling of all cases (leaf, one child, two children)
- **Search**: Find nodes by value with O(log n) complexity

### Traversal Methods
- **Level Order**: Breadth-first traversal using queue-based iteration
- **In-order**: Left → Root → Right (produces sorted output)
- **Pre-order**: Root → Left → Right
- **Post-order**: Left → Right → Root

All traversal methods support optional callback functions for custom processing.

### Tree Properties
- **Height**: Calculate tree/subtree height (edges from node to deepest leaf)
- **Depth**: Calculate node depth (edges from root to target node)
- **Balance Check**: Verify if tree maintains balance property
- **Rebalancing**: Restore balance to unbalanced trees

### Utility Features
- **Pretty Print**: Visual tree structure display in console
- **Automatic Deduplication**: Removes duplicate values during construction
- **Null Handling**: Robust handling of empty trees and missing nodes

## Usage

### Basic Operations

```javascript
// Create a balanced BST from an array
const tree = new Tree([15, 10, 20, 8, 12, 25, 6]);

// Insert and remove values
tree.insert(14);
tree.remove(10);

// Search for values
const node = tree.find(12);
console.log(node ? "Found" : "Not found");
```

### Tree Traversals

```javascript
// Get arrays of values
console.log("In-order:", tree.inorder());     // [6, 8, 12, 14, 15, 20, 25]
console.log("Pre-order:", tree.preorder());   // [15, 10, 8, 6, 12, 14, 20, 25]
console.log("Post-order:", tree.postorder()); // [6, 8, 14, 12, 10, 25, 20, 15]
console.log("Level order:", tree.levelOrder()); // [15, 10, 20, 8, 12, 25, 6, 14]

// Use with callback functions
tree.inorder(node => console.log(`Processing: ${node.data}`));
```

### Tree Properties

```javascript
// Check tree properties
console.log("Tree height:", tree.height());      // Height of entire tree
console.log("Node depth:", tree.depth(12));      // Depth of specific node
console.log("Is balanced:", tree.isBalanced());  // Balance verification

// Rebalance if needed
if (!tree.isBalanced()) {
    tree.rebalance();
    console.log("Tree rebalanced");
}
```

### Visualization

```javascript
// Display tree structure
tree.prettyPrint();
/*
Output example:
    ┌── 25
┌── 20
│   └── 14
15
│       ┌── 12
│   ┌── 10
└── 8
    └── 6
*/
```

## Implementation Details

### Balanced Construction
The tree automatically creates a balanced structure by:
1. Removing duplicate values using `Set`
2. Sorting the array
3. Recursively building the tree from the middle element

### Height Definition
- Empty nodes return height -1
- Leaf nodes have height 0
- Height increases by 1 for each level up the tree

### Balance Criteria
A tree is considered balanced when:
- For every node, the height difference between left and right subtrees ≤ 1
- Both left and right subtrees are also balanced

### Time Complexity
- **Search, Insert, Delete**: O(log n) for balanced trees
- **Traversals**: O(n) to visit all nodes
- **Balance Check**: O(n) to verify all nodes
- **Rebalancing**: O(n) to rebuild tree

## Project Structure

```
├── src/
│   └── index.js          # Main BST implementation
├── dist/
│   └── bundle.js         # Webpack build output
├── webpack.config.js     # Build configuration
└── README.md            # Documentation
```

## Building and Running

The project uses Webpack for bundling:

```bash
# Install dependencies
npm install

# Build the project
npx webpack

# Run the bundled code
node dist/bundle.js
```

