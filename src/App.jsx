import { useEffect, useState } from 'react'
import './App.css'

class Point { 
  constructor({ x, y })  {
    this.x = x 
    this.y = y 
  }
   
  toString() {
    return `<${this.x}, ${this.y}>`
  }
}

function App() {
  const [tris, setTris] = useState([])

const [styles,setStyles] = useState("") 

  useEffect(() => {
    const load = async () => {
      const res = await fetch("Metaocto Polyart Puzzle.svg") 
      const parser = new DOMParser();
      const svg = parser.parseFromString(await res.text(), "application/xml");
      console.log(svg)

      const points = svg.querySelectorAll("polygon")
      const truth = []
      for (const point of points) {
        const raw = point.getAttribute("points").split(/[ ,]/).map((p) => Number(p))
        truth.push({
          points: [ 
            new Point({ x: raw[0], y: raw[1] }),
            new Point({ x: raw[2], y: raw[3] }),
            new Point({ x: raw[4], y: raw[5] }),
          ],
          className: point.classList.toString(),
        })
      }
      setTris(truth)

      const styles = svg.querySelector("style").innerHTML
      setStyles(styles)
    }
    load()
  }, []) 

  return (
    <main>
      <svg viewBox="0 0 427.5 374.9" xmlns="http://www.w3.org/2000/svg">

        <style type="text/css">{styles}</style>

        {tris.map((tri, idx) => { 
          const [p1, p2, p3] = tri.points
          const mid = new Point({
            x: p1.x + ((p2.x - p1.x) / 2),
            y: p1.y + ((p2.y - p1.y) / 2),
          }) 
          return ( 
            <polygon key={idx} className={tri.className} points={
              [p1.x, p1.y, mid.x, mid.y, p2.x, p2.y].join(" ")
            }>
              <animate
                attributeName="points"
                dur="2s"
                fill="freeze"
                values={`
                  ${[p1.x, p1.y, mid.x, mid.y, p2.x, p2.y].join(" ")};
                  ${[p1.x, p1.y, p3.x, p3.y, p2.x, p2.y].join(" ")}
                `}
                keyTimes="0; 1"
                begin="0s"
              />
            </polygon>
          )
        })}
         
      </svg>
    </main>
  )
}

export default App
