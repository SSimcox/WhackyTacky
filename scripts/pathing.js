/**
 * Created by Steven on 4/20/2017.
 */


var edges = []

module.exports = function(map, creep){

  // Find shortest path from [16,0] to [0,10] in player.map

  //console.log(map)
  var nodes = []
  for(let i = 0; i < 16; i++){
    nodes.push([])
    for(let j = 0; j < 20; j++){
      let visited = "none"
      if(map[i][j] != -1)
        visited = "visited"
      nodes[i].push(Node(j,i,visited))
    }
  }

  let list = new PriorityQueue()

  let x = 0, y = 15
  if(creep !== undefined){
    x = Math.floor(creep.center.x / 50)
    y = Math.floor((creep.center.y - 100) / 50)
  }

  list.push(nodes[y][x],1)

  let cur = null
  nodes[15][0].length = 0

  do{
    cur = list.pop()
    cur.visited = "visited"
    visit(cur,list,nodes,map)
  }while(cur !== nodes[0][9] && list.data.length > 0)

  if(cur !== nodes[0][9]){
    return false
  }

  let path = []
  while(cur !== nodes[15][0])
  {
    path.unshift(cur)
    cur = cur.parent
  }
  path.unshift(cur)
  // Find shortest path from unit to shortest path player.creeps[i].center

  return path
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
  if(node.x > 0 && nodes[node.y][node.x-1].visited !== "visited" && (nodes[node.y][node.x-1].visited === "none" || (nodes[node.y][node.x-1].visited === "listed" && nodes[node.y][node.x-1].length > node.length + 1))){
    nodes[node.y][node.x-1].length = node.length + 1
    nodes[node.y][node.x-1].parent = node
    nodes[node.y][node.x-1].visited = "listed"
    list.push(nodes[node.y][node.x-1],nodes[node.y][node.x-1].length) //distance(nodes[0][9], nodes[node.y][node.x-1]) + nodes[node.y][node.x-1].length)
  }
  if(node.y < 15 && nodes[node.y+1][node.x].visited !== "visited" && (nodes[node.y+1][node.x].visited === "none" || (nodes[node.y+1][node.x].visited === "listed" && nodes[node.y+1][node.x].length > node.length + 1))){
    nodes[node.y+1][node.x].length = node.length + 1
    nodes[node.y+1][node.x].parent = node
    nodes[node.y+1][node.x].visited = "listed"
    list.push(nodes[node.y+1][node.x],nodes[node.y+1][node.x].length) //distance(nodes[0][9], nodes[node.y+1][node.x]) + nodes[node.y+1][node.x].length)
  }
  if(node.x < 19 && nodes[node.y][node.x+1].visited !== "visited" && (nodes[node.y][node.x+1].visited === "none" || (nodes[node.y][node.x+1].visited === "listed" && nodes[node.y][node.x+1].length > node.length + 1))){
    nodes[node.y][node.x+1].length = node.length + 1
    nodes[node.y][node.x+1].parent = node
    nodes[node.y][node.x+1].visited = "listed"
    list.push(nodes[node.y][node.x+1],nodes[node.y][node.x+1].length) //distance(nodes[0][9], nodes[node.y][node.x+1]) + nodes[node.y][node.x+1].length)
  }
  if(node.y > 0 && nodes[node.y-1][node.x].visited !== "visited" && (nodes[node.y-1][node.x].visited === "none" || (nodes[node.y-1][node.x].visited === "listed" && nodes[node.y-1][node.x].length > node.length + 1))){
    nodes[node.y-1][node.x].length = node.length + 1
    nodes[node.y-1][node.x].parent = node
    nodes[node.y-1][node.x].visited = "listed"
    list.push(nodes[node.y-1][node.x],nodes[node.y-1][node.x].length) //distance(nodes[0][9], nodes[node.y-1][node.x]) + nodes[node.y-1][node.x].length)
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