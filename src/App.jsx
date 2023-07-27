import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
      const res = await fetch("Big Metaocto Polyart Puzzle.svg") 
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
          className: point.className 
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

<style type="text/css"> {styles}
</style>

        {tris.map((tri, idx) => ( 
          <polygon key={idx} className={tri.className} points={
            [tri.points[0].x, tri.points[0].y, tri.points[1].x, tri.points[1].y, tri.points[2].x, tri.points[2].y].join(" ")
          }/>
        ))}
         
      </svg>
    </main>
  )
}

export default App
