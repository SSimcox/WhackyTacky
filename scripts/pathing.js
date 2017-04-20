/**
 * Created by Steven on 4/20/2017.
 */


var edges = []

module.exports = function(map){

  // Find shortest path from [16,0] to [0,10] in player.map

  console.log(map)
  var nodes = []
  for(let i = 0; i < 16; i++){
    nodes.push([])
    for(let j = 0; j < 20; j++){
      let visited = false
      if(map[i][j] > -1)
        visited = true
      nodes[i].push(Node(j,i,visited))
    }
  }

  var list = new PriorityQueue()
  var cur = nodes[15][0]
  cur.length = 0
  cur.visited
  visit(cur,list,nodes)

  while(cur !== nodes[0][9] && list.data.length > 0){
    cur.visited = true
    visit(cur,list,nodes)
    console.log(cur)
    while(cur.visited) { // prevents duplicate node visits
      cur = list.pop()
    }
  }
  if(cur !== nodes[0][9]){
    return false
  }

  var path = []
  while(cur !== nodes[15][0])
  {
    path.unshift(cur)
    cur = cur.parent
  }
  path.unshift(cur)
  // Find shortest path from unit to shortest path player.creeps[i].center

  return path
}

function turn(p1, p2, p3) {
  let a = p1.x, b = p1.y,
    c = p2.x, d = p2.y,
    e = p3.x, f = p3.y;
  let A = (f - b) * (c - a),
    B = (d - b) * (e - a);
  return (A > B + Number.EPSILON) ? 1 : (A + Number.EPSILON < B) ? -1 : 0;
}

function isIntersect(p1, p2, p3, p4) {
  return (turn(p1, p3, p4) !== turn(p2, p3, p4)) && (turn(p1, p2, p3) !== turn(p1, p2, p4));
}

function Node(x,y,visited){
  return {
    x:x,
    y:y,
    parent:null,
    visited: visited,
    length: Math.POSITIVE_INFINITY
  }
}

function visit(node,list,nodes){
  if(node.x > 0 && (!nodes[node.y][node.x-1].visited || nodes[node.y][node.x-1].length > node.length + 1)){
    nodes[node.y][node.x-1].length = node.length + 1
    nodes[node.y][node.x-1].parent = node
    list.push(nodes[node.y][node.x-1],distance(nodes[0][9],node) + node.length)
  }
  if(node.y < 15 && (!nodes[node.y+1][node.x].visited || nodes[node.y+1][node.x].length > node.length + 1)){
    nodes[node.y+1][node.x].length = node.length + 1
    nodes[node.y+1][node.x].parent = node
    list.push(nodes[node.y+1][node.x],distance(nodes[0][9],node) + node.length)
  }
  if(node.x < 19 && (!nodes[node.y][node.x+1].visited || nodes[node.y][node.x+1].length > node.length + 1)){
    nodes[node.y][node.x+1].length = node.length + 1
    nodes[node.y][node.x+1].parent = node
    list.push(nodes[node.y][node.x+1],distance(nodes[0][9],node) + node.length)
  }
  if(node.y > 0 && (!nodes[node.y-1][node.x].visited || nodes[node.y-1][node.x].length > node.length + 1)){
    nodes[node.y-1][node.x].length = node.length + 1
    nodes[node.y-1][node.x].parent = node
    list.push(nodes[node.y-1][node.x],distance(nodes[0][9],node) + node.length)
  }
}

function distance(a,b){
  return Math.sqrt(Math.pow(a.x-b.x,2) + Math.pow(a.y-b.y,2))
}

function PriorityQueue() {
  this.data = []
}

PriorityQueue.prototype.push = function(element, priority) {
  priority = +priority
  for (var i = 0; i < this.data.length && this.data[i][1] < priority; i++);
  this.data.splice(i, 0, [element, priority])
}

PriorityQueue.prototype.pop = function() {
  return this.data.shift()[0]
}

PriorityQueue.prototype.size = function() {
  return this.data.length
}