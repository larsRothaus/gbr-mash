//@ts-nocheck
import React from "react";
import { Point2D } from "../../dtos/Point2D";
import { GbrNode } from "../../dtos/GbrNode";

type Props = {
  svgPath?: string,
  completeHandler:(nodes:GbrNode[])=> void
};

type State = {};

const iframeStyle = {
  width: '100%',
  height: '100vh'
}
const iframeStyle_ = {
  width: '100%',
  height: '100%'
}


export class SvgRenderView extends React.Component<Props, State> {
  private frame!: HTMLIFrameElement;
  private createBtn!: HTMLButtonElement;
  private readyBtn!: HTMLButtonElement;
  private svg: SVGSVGElement | null = null;
  private canvas: HTMLCanvasElement
  private preview: HTMLImageElement




  componentDidMount() {
    this.canvas = document.getElementById('canvas')
    this.preview = document.getElementById('preview')
    this.readyBtn = document.getElementById('readyBtn')
    this.readyBtn.disabled = true;

    this.canvas.hidden = true;
    let ctx = this.canvas.getContext('2d')
    this.frame = document.getElementById('frame') as HTMLIFrameElement
    this.createBtn = document.getElementById('create') as HTMLButtonElement

    if (!this.frame) return;

    this.frame.addEventListener('load', () => {
      const svgRoot = this.frame.contentDocument;
      const iframedoc = this.frame.contentDocument || this.frame.contentWindow!.document;
      if (!svgRoot) {
        console.error('No contentDocument');
        return;
      }
      const svg = svgRoot.querySelector('svg');
      if (!svg) {
        console.error('No svg header');
        return;
      }


      const widthPx = Math.floor(svg.width.baseVal.value);
      const widthUnit = Math.floor(svg.width.baseVal.valueInSpecifiedUnits);
      const heightPx = Math.floor(svg.height.baseVal.value);
      const heightUnit = Math.floor(svg.height.baseVal.valueInSpecifiedUnits);


      console.log(`## [SvgRenderView] :`, widthPx, widthUnit, heightPx, heightUnit);

    });

    setTimeout(async () => {

      const iframedoc = this.frame.contentDocument || this.frame.contentWindow!.document
      if (!iframedoc) {
        throw new Error(`Error class:SvgRenderView[ghg] : No doc!`);
      }

      // const resourceUrl = 'http://127.0.0.1:8080/Wave700x1000_test_v2.svg';
      // const resourceUrl = 'http://localhost:8080/pik.svg';
      //const resourceUrl = 'http://127.0.0.1:8080/single_wave_100x70.svg';
      const resourceUrl = 'http://127.0.0.1:8080/Wave700x1000_Artwork_JUNE2023.svg';

      const res = await fetch(resourceUrl);
      const content = await res.text()

      iframedoc.body.innerHTML = content;
      this.preview.src = resourceUrl;
      const svgRoot = iframedoc

      this.svg = svgRoot.querySelector('svg');
      if (!this.svg) {
        console.error('No svg header');
        return;
      }

    }, 1000)

    this.createBtn.addEventListener('click', () => {
      this.frame.hidden = true;
      this.preview.hidden = true;
      this.canvas.hidden = false
      if (!this.svg) {
        console.log('No SVG File')
        return;
      }
      const widthPx = Math.floor(this.svg.width.baseVal.value);
      const widthUnit = Math.floor(this.svg.width.baseVal.valueInSpecifiedUnits);
      const heightPx = Math.floor(this.svg.height.baseVal.value);
      const heightUnit = Math.floor(this.svg.height.baseVal.valueInSpecifiedUnits);

      let objects = [];

      objects = [...this.svg.querySelectorAll('path')];
      objects = [...objects, ...this.svg.querySelectorAll('rect')];
      objects = [...objects, ...this.svg.querySelectorAll('ellipse')];

      const resolution = 1;

      const completedNodes: GbrNode[] = []
      let currentNode: GbrNode = new GbrNode();


      let totalNotes = 0;

      let progress = 0;
      for (let obj in objects) {
        progress++;
        console.log(`## [SvgRenderView] progress |${Math.floor(progress / objects.length * 100)}%`);
        currentNode = new GbrNode();
        currentNode.refId = `TD-${progress}`
        const totalLength = objects[obj].getTotalLength();
        let d = objects[obj].getAttribute('d');
        let vx = d.split(' ');
        let mvX = 0;
        let mvY = 0;
        // if(vx[0].toLowerCase() === 'm'){
        //   let moveXy = vx[1].split(',');
        //   let x = parseInt(moveXy[0]);
        //   let y = parseInt(moveXy[1]);
        //   if(isNaN(x) || isNaN(y)){
        //     throw new Error(`Error class:SvgRenderView[] : x is nan !`);
        //   }
        //   mvX = x;
        //   mvY = y;
        // }
        let tmStart = objects[obj].getPointAtLength(0);
        const start = {
          x: mvX + tmStart.x,
          y: mvY + tmStart.y
        }
        objects[obj].addEventListener('click', (e) => {
          console.log(`## [svg] client`, e);
          e.target.stroke = "blue"
        })
        objects[obj].addEventListener('mouseover', (e) => {

        })
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);

        // let r = Math.floor(Math.random() * 255);
        // let g = Math.floor(Math.random() * 255);$
        // let b = Math.floor((Math.random() * 127) + 127);

        ctx.fillStyle = 'red'

        let currentProgress = 0;
        let lastPoint: Point2D = {
          ...start
        }

        //@ts-ignore

        const totalInterpolation = Math.floor(totalLength / resolution)

        let interpolationPoints = new Array(totalInterpolation).fill(null).map((value, index) => (index+1) * resolution);
        interpolationPoints.unshift(0)
        if(interpolationPoints[interpolationPoints.length-1] !== totalLength){
          interpolationPoints.push(totalLength);
        }

        let startPoint = objects[obj].getPointAtLength(0);
        let endPoint = objects[obj].getPointAtLength(totalLength);

        if((startPoint.x === endPoint.x) || (startPoint.y === endPoint.y)){
          //simple addd
        }

        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor((Math.random() * 127) + 127);
        ctx.strokeStyle = `rgba(${r},${g},${b},1)`;

        //while (currentProgress <= totalLength+1) {
        let lastValidPoint:Point2D | undefined = undefined
        let lastAngle:number | undefined = undefined;
        for (let a = 0; a < interpolationPoints.length; a++) {
          let point2D = objects[obj].getPointAtLength(interpolationPoints[a]);
          if (lastPoint.x === point2D.x || lastPoint.y === point2D.y) {
            if(interpolationPoints.length-1 !== a){
              currentProgress += resolution;
              continue;
            }
          }

          // const preCorrectionX = point2D.x;
          // const preCorrectionY = point2D.y;
          // point2D.x = parseInt((mvX + point2D.x).toFixed(2));
          // point2D.y = parseInt((mvY + point2D.y).toFixed(2));
          // console.log(`## [SvgRenderView] pre: x:${preCorrectionX} y:${preCorrectionY} | post: x:${point2D.x} y:${point2D.y} `);


          //
          // if(lastValidPoint){
          //   let angle = Math.atan2(point2D.y - lastValidPoint.y, point2D.x - lastValidPoint.x)
          //   angle = angle * 180 / Math.PI;
          //   const dif = Math.abs(angle - lastAngle);
          //   console.log(`## [SvgRenderView] angle |`,dif);
          //   if (typeof lastAngle === 'number' && dif > 80) {
          //     currentNode.close();
          //     completedNodes.push(currentNode);
          //     currentNode = new GbrNode();
          //     currentNode.refId = `TD-${progress}-${a}`
          //     //update color
          //     let r = Math.floor(Math.random() * 255);
          //     let g = Math.floor(Math.random() * 255);
          //     let b = Math.floor((Math.random() * 127) + 127);
          //     ctx.strokeStyle = `rgba(${r},${g},${b},1)`;
          //   }
          //   lastAngle = angle;
          // }

          lastValidPoint = point2D;


          currentNode.addPoint({
            x: point2D.x,
            y: point2D.y
          });

          ctx.lineTo(point2D.x, point2D.y);
          // console.log(`## [svg] x:${point2D.x}, y:${point2D.y}`);
          totalNotes++

          if (point2D.x < -20 || point2D.y < -20) {
            throw new Error(`Error class:SvgRenderView[] : Out of Bounce!`);
          }

          currentProgress += resolution;

          // if(currentProgress === totalLength){
          //   currentProgress += 1000
          // }
          // if (totalLength - currentProgress < resolution) {
          //   currentProgress += totalLength - currentProgress
          // } else {
          //
          // }

        }

        ctx.stroke()
        currentNode.close();
        completedNodes.push(currentNode);


      }
      console.log(`## [SvgRenderView] componentDidMount | Finn `, completedNodes);
      console.log(`## [SvgRenderView]  | `, widthPx, widthUnit, heightPx, heightUnit);
      console.log(`## [SvgRenderView] Total Notes; | `, totalNotes);

      ///////// Convert ////////////
      for(let n in completedNodes) {
        for(let p in completedNodes[n].points){
          const {x,y} = completedNodes[n].points[p];
          completedNodes[n].points[p] = {
            x: Math.floor(x * 10),
            y:Math.floor(y * 10)
          };
          completedNodes[n].close();
        }
      }

      this.readyBtn.disabled = false;
      this.readyBtn.addEventListener('click', ()=>{
        this.props.completeHandler(completedNodes);
      })

      //this.download(JSON.stringify(completedNodes, null, 2), "test_data.json", "text/plain")


    });


    // this.frame.src = "http://127.0.0.1:8080/Wave700x1000_Artwork_JUNE2023.svg"
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div>
        <iframe hidden={true} style={iframeStyle} id={"frame"} width={window.innerWidth}
                height={window.innerHeight}></iframe>
        <button id={"create"}>create gbr nodes</button>
        <button id={"readyBtn"}>ready</button>
        <img id={"preview"} style={{
          verticalAlign: 'top'
        }} width={window.innerWidth} height={window.innerHeight}></img>
        <canvas id={"canvas"} width={window.innerWidth} height={window.innerHeight}></canvas>
      </div>
    );
  }
}


