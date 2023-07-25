class Point { 
  constructor({ x, y })  {
    this.x = x 
    this.y = y 
  }
   
  toString() {
    return `<${this.x}, ${this.y}>`
  }
}

const points = document.querySelectorAll("polygon")
for (const point of points) {
  
    const raw = point.getAttribute("points").split(/[ ,]/).map((p) => Number(p))
    const points = [
      new Point({ x: raw[0], y: raw[1] }),
      new Point({ x: raw[2], y: raw[3] }),
      new Point({ x: raw[4], y: raw[5] }),
    ]
    
    console.log({points})
}



// check link bellow how  to call elements in SVG using path function
// https://stackoverflow.com/questions/2753732/how-to-access-svg-elements-with-javascript



//alert ('yo moda fukkaaas')
