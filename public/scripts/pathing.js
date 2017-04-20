/**
 * Created by Steven on 4/19/2017.
 */

function setPath(player){

  // Find shortest path from [16,0] to [0,10] in player.map

  var nodes = []
  for(let i = 0; i < 16; i++){
    nodes.push([])
    for(let j = 0; j < 20; j++){
      nodes[i].push(Node(j,i))
    }
  }

  var list = []
  var cur = nodes[15][0]

  while(cur != nodes[0][9]){
    cur.visited = true
    visit(cur,list,nodes)
  }

  // Find shortest path from unit to shortest path player.creeps[i].center


}

function turn(p1, p2, p3) {
  a = p1.x; b = p1.y;
  c = p2.x; d = p2.y;
  e = p3.x; f = p3.y;
  A = (f - b) * (c - a);
  B = (d - b) * (e - a);
  return (A > B + Number.EPSILON) ? 1 : (A + Number.EPSILON < B) ? -1 : 0;
}

function isIntersect(p1, p2, p3, p4) {
  return (turn(p1, p3, p4) != turn(p2, p3, p4)) && (turn(p1, p2, p3) != turn(p1, p2, p4));
}

function Node(x,y){
  return {
    x:x,
    y:y,
    parent:null,
    visited: false,
    length: Math.POSITIVE_INFINITY
  }
}

function visit(node,list,nodes){
  if(!nodes[node.x][node.y-1].visited){
    nodes[node.x][node.y-1].length = node.length + 1
    nodes[node.x][node.y-1].parent = node
    list.push(nodes[node.x][node.y-1])
  }
  if(!nodes[node.x][node.y+1].visited){
    nodes[node.x][node.y+1].length = node.length + 1
    nodes[node.x][node.y+1].parent = node
    list.push(nodes[node.x][node.y+1])
  }
  if(!nodes[node.x][node.y-1].visited){
    nodes[node.x][node.y-1].length = node.length + 1
    nodes[node.x][node.y-1].parent = node
    list.push(nodes[node.x][node.y-1])
  }
  if(!nodes[node.x][node.y-1].visited){
    nodes[node.x][node.y-1].length = node.length + 1
    nodes[node.x][node.y-1].parent = node
    list.push(nodes[node.x][node.y-1])
  }

}