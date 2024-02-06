class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => {
      this.nodes.add(vertex)
    });
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    let stack = [ vertex ]
    let seen = new Set()
    seen.add(vertex)

    while (stack.length) {
      let current = stack.pop()

      for (let neighbour of current.adjacent) {
        if (neighbour === vertex) current.adjacent.delete(vertex)
        if (!seen.has(neighbour)) {
          seen.add(neighbour)
          stack.push(neighbour)
        }
      }
    }

    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let stack = [ start ]
    let seen = new Set(stack)
    let arrOfNodes = []

    while (stack.length) {
      let current = stack.pop()
      arrOfNodes.push(current.value)

      for (let neighbour of current.adjacent) {
        if (!(seen.has(neighbour))) {
          stack.push(neighbour)
          seen.add(neighbour)
        }
      }
    }

    return arrOfNodes
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [ start ]
    let seen = new Set()
    let arrOfNodes = []

    seen.add(start)

    while (queue.length) {
      let current = queue.shift()
      arrOfNodes.push(current.value)

      for (let neighbour of current.adjacent) {
        if (!(seen.has(neighbour))) {
          seen.add(neighbour);
          queue.push(neighbour)
        }
      }
    }

    return arrOfNodes
  }
}

module.exports = {Graph, Node}