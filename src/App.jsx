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

export default function App() {
  const [tris, setTris] = useState([])
  const [styles, setStyles] = useState("") 

  useEffect(() => {
    const load = async () => {
      const res = await fetch("Big Metaocto Polyart Puzzle.svg") 
      const parser = new DOMParser();
      const svg = parser.parseFromString(await res.text(), "application/xml");
      console.log(svg)

      const points = svg.querySelectorAll("polygon")
      const truth = Array.from(points).map((point) => {
        const raw = (
          point.getAttribute("points")
          .split(/[ ,]/)
          .map((p) => Number(p))
        )
        return {
          points: [ 
            new Point({ x: raw[0], y: raw[1] }),
            new Point({ x: raw[2], y: raw[3] }),
            new Point({ x: raw[4], y: raw[5] }),
          ],
          className: point.classList.toString(),
        }
      })
      setTris(truth)

      const styles = svg.querySelector("style").innerHTML
      setStyles(styles)
    }
    load()
  }, []) 

const midpoint = (p1, p2) => (
  new Point({
    x: p1.x + ((p2.x - p1.x) / 2),
    y: p1.y + ((p2.y - p1.y) / 2),
  })               
)

  return (
    <main>
      <svg viewBox="0 0 427.5 374.9" xmlns="http://www.w3.org/2000/svg">

        <style type="text/css">{styles}</style>

        {tris.map((tri, idx) => { 
          const [p1, p2, p3] = tri.points
          const first = midpoint(p1, p2)
          const mid = midpoint(first, p3)
          return ( 
            <polygon key={idx} className={tri.className} points={
              [mid.x, mid.y, mid.x, mid.y, mid.x, mid.y].join(" ")
            }    
            >
              <animate
                id={`poly${idx}`}
                attributeName="points"
                dur="0.02s"
                fill="freeze"
                values={`
                  ${[mid.x, mid.y, mid.x, mid.y, mid.x, mid.y].join(" ")};
                  ${[p1.x, p1.y, p3.x, p3.y, p2.x, p2.y].join(" ")}                 
                `}
                repeatCount="1"
                keyTimes="0; 1"
                begin={idx === 0 ? "0s" : `poly${idx - 1}.end`} 

              />
            </polygon>
          )
        })}
         
      </svg>
    </main>
  )
}