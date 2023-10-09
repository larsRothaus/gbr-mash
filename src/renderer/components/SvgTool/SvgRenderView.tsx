//@ts-nocheck
import React from 'react';
import { Point2D } from '../../dtos/Point2D';
import { GbrNode } from '../../dtos/GbrNode';
import { GbrDataModel } from '../../models/GbrDataModel';

const delay = async (ms: number) => new Promise(resolve => {
  setTimeout(resolve, ms);
});
type Props = {
  svgPath?: string,
  svgData: Buffer
  completeHandler: (nodes: GbrDataModel) => void
};

type State = {
  dataModel?: GbrDataModel
};

const iframeStyle = {
  width: '100%',
  height: '100vh'
};
const iframeStyle_ = {
  width: '100%',
  height: '100%'
};


export class SvgRenderView extends React.Component<Props, State> {
  private frame!: HTMLIFrameElement;
  private createBtn!: HTMLButtonElement;
  private readyBtn!: HTMLButtonElement;
  private svg: SVGSVGElement | null = null;
  private canvas: HTMLCanvasElement;

  componentDidMount() {

    this.canvas = document.getElementById('canvas');
    this.readyBtn = document.getElementById('readyBtn');

    this.canvas.hidden = true;
    let ctx = this.canvas.getContext('2d');
    this.frame = document.getElementById('frame') as HTMLIFrameElement;
    this.createBtn = document.getElementById('create') as HTMLButtonElement;

    if (!this.frame) return;
    const iframedoc = this.frame.contentDocument || this.frame.contentWindow!.document;

    var contentString = new TextDecoder().decode(this.props.svgData);
    iframedoc.body.innerHTML = contentString;
    const svgRoot = iframedoc;

    this.svg = svgRoot.querySelector('svg');
    if (!this.svg) {
      console.error('No svg header');
      return;
    }

    this.createBtn.addEventListener('click', async () => {
      this.frame.hidden = true;
      this.canvas.hidden = false;
      if (!this.svg) {
        console.log('No SVG File');
        return;
      }
      const widthPx = Math.floor(this.svg.width.baseVal.value);
      const widthUnit = Math.floor(this.svg.width.baseVal.valueInSpecifiedUnits);
      const xScaleFactor = widthPx / widthUnit;
      const heightPx = Math.floor(this.svg.height.baseVal.value);
      const heightUnit = Math.floor(this.svg.height.baseVal.valueInSpecifiedUnits);
      const yScaleFactor = heightPx / heightUnit;


      const resolution = 20;
      const masterScale =  1;//.25;
      const pxToMmScaleFactor = 2.83; //1; //// (typeof widthUnit === 'number' && typeof heightUnit === 'number') ? 2.83 : 1;

      const scaleFactor = .6;

      const scalePoint2D = (point: Point2D | DOMPoint): Point2D => {
        return {
          x: (point.x / pxToMmScaleFactor) * masterScale,
          y: (point.y / pxToMmScaleFactor) * masterScale
        };
      };

      let objects = [];

      objects = [...this.svg.querySelectorAll('path')];
      objects = [...objects, ...this.svg.querySelectorAll('rect')];
      objects = [...objects, ...this.svg.querySelectorAll('ellipse')];


      const completedNodes: GbrNode[] = [];
      let currentNode: GbrNode = new GbrNode();


      let totalNotes = 0;

      let progress = 0;
      for (let obj in objects) {
        progress++;
        console.log(`## [SvgRenderView] progress | itemIndex:${progress} ${Math.floor(progress / objects.length * 100)}%`);
        currentNode = new GbrNode();
        currentNode.refId = `TD-${progress}`;
        const totalLength = objects[obj].getTotalLength();
        console.log(`## [SvgRenderView] node:${currentNode.refId} | totalLength:${totalLength}`);
        let d = objects[obj].getAttribute('d');
        let startPoint = scalePoint2D(objects[obj].getPointAtLength(0));
        let endPoint = scalePoint2D(objects[obj].getPointAtLength(totalLength));

        objects[obj].addEventListener('click', (e) => {
          console.log(`## [svg] client`, e);
          e.target.stroke = 'blue';
        });
        objects[obj].addEventListener('mouseover', (e) => {

        });

        ctx.moveTo(startPoint.x * scaleFactor, startPoint.y * scaleFactor);
        ctx.beginPath();
        ctx.fillStyle = 'red';

        const totalInterpolation = Math.floor(totalLength / resolution);

        let interpolationPoints = new Array(totalInterpolation).fill(null).map((value, index) => (index + 1) * resolution);
        interpolationPoints.unshift(0);
        if (interpolationPoints[interpolationPoints.length - 1] !== totalLength) {
          interpolationPoints.push(totalLength);
        }


        console.log(`## [SvgRenderView] d:`, d.slice(0, 30).toString());
        console.log(`## [SvgRenderView] start: [x:${startPoint.x},y:${startPoint.y}] end: [x:${endPoint.x},y:${endPoint.y}] `);
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor((Math.random() * 127) + 127);

        ctx.strokeStyle = `rgba(${r},${g},${b},1)`;

        let lastValidPoint: Point2D | undefined = undefined;
        currentNode.addPoint(startPoint);
        ctx.lineTo(startPoint.x * scaleFactor, startPoint.y * scaleFactor);
        for (let a = 0; a < interpolationPoints.length; a++) {
          let point2D = scalePoint2D(objects[obj].getPointAtLength(interpolationPoints[a]));
          lastValidPoint = point2D;

          currentNode.addPoint({
            x: point2D.x,
            y: point2D.y
          });

          ctx.lineTo(point2D.x * scaleFactor, point2D.y * scaleFactor);
          ctx.stroke();
          // await delay(resolution);
          totalNotes++;

          if (point2D.x < -20 || point2D.y < -20) {
            throw new Error(`Error class:SvgRenderView[] : Out of Bounce!`);
          }
        }

        ctx.lineTo(endPoint.x * scaleFactor, endPoint.y * scaleFactor);
        currentNode.addPoint(endPoint);
        ctx.stroke();

        currentNode.close();
        completedNodes.push(currentNode);
      }
      console.log(`## [SvgRenderView] componentDidMount | Finn `, completedNodes);
      console.log(`## [SvgRenderView]  | `, widthPx, widthUnit, heightPx, heightUnit);
      console.log(`## [SvgRenderView] Total Notes; | `, totalNotes);

      ///////// Convert ////////////
      for (let n in completedNodes) {
        for (let p in completedNodes[n].points) {
          const { x, y } = completedNodes[n].points[p];
          completedNodes[n].points[p] = {
            x: Math.floor(x * 10),
            y: Math.floor(y * 10)
          };
          completedNodes[n].close();
        }
      }

      this.setState({
        dataModel: new GbrDataModel(completedNodes, {
          width: widthUnit * 10,
          height: heightUnit * 10
        })
      });


      this.readyBtn.addEventListener('click', () => {
        if (this.state && this.state.dataModel) {
          this.props.completeHandler(this.state.dataModel);
        }
      });

      //this.download(JSON.stringify(completedNodes, null, 2), "test_data.json", "text/plain")


    });

  }

  componentDidUpdate() {

  }

  render() {

    const { dataModel } = this.state ?? {};
    return (
      <div>
        <button id={'create'}>create gbr nodes</button>
        <button id={'readyBtn'} disabled={!dataModel}>import</button>
        <iframe hidden={false} style={iframeStyle} id={'frame'} width={window.innerWidth}
                height={window.innerHeight}></iframe>
        <canvas id={'canvas'} style={{
          scale: .2
        }} width={window.innerWidth} height={window.innerHeight}></canvas>
      </div>
    );
  }
}


