# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

### Read this intruction :
- the scope of this project is to LEARN!! Do not 
 write code for me unless I explicitely tell you to
 -You have to act like a teacher/tool not as a way to cheat . I have to think for myself!! 

## Commands

### Build
- `npm run build` - Compiles the project using webpack into `dist/bundle.js`

### Development
- No test framework is currently configured
- No linting or type checking commands available

## Project Structure

This is a Binary Search Tree implementation assignment with the following structure:

```
src/
├── index.js          # Main BST implementation with Node and Tree classes
dist/                 # Webpack build output
webpack.config.js     # Webpack configuration for development builds
```

## Architecture

The project implements a balanced Binary Search Tree with two main classes:

### Node Class (`src/index.js:1-7`)
- Simple data structure with `data`, `left`, and `right` properties
- Used as the building blocks for the BST

### Tree Class (`src/index.js:9-18`)  
- Main BST implementation class
- Constructor accepts an array and builds a balanced tree via `buildTree()`
- Currently has a stub implementation of `buildTree()` that needs to be completed

## Assignment Requirements

The Tree class needs the following methods implemented according to the README:

**Core Methods:**
- `buildTree(array)` - Build balanced BST from sorted, deduplicated array
- `insert(value)` - Insert node while maintaining BST properties
- `deleteItem(value)` - Delete node handling all edge cases
- `find(value)` - Return node with given value

**Traversal Methods:**
- `levelOrderForEach(callback)` - Breadth-first traversal
- `inOrderForEach(callback)` - In-order depth-first traversal  
- `preOrderForEach(callback)` - Pre-order depth-first traversal
- `postOrderForEach(callback)` - Post-order depth-first traversal

**Utility Methods:**
- `height(value)` - Return height of node (edges to furthest leaf)
- `depth(value)` - Return depth of node (edges to root)
- `isBalanced()` - Check if tree is balanced (height diff ≤ 1 for all nodes)
- `rebalance()` - Rebalance an unbalanced tree

## Implementation Notes

- Do not use duplicate values in the BST
- Always sort and remove duplicates when building the tree
- Traverse tree nodes directly for insert/delete operations (don't use original array)
- All traversal methods should throw an Error if no callback is provided
- Height/depth methods should return `null` if value not found
- Balance checking must validate every node, not just the root's children

## Development Workflow

Since no tests are configured, validate implementations by:
1. Creating driver scripts that test functionality per README requirements
2. Using the provided `prettyPrint()` function from README to visualize tree structure
3. Building with `npm run build` to check for syntax errors