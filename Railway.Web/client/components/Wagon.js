import * as React from "react";
import { Rectangle } from './Rectangle';
export class Wagon extends React.Component {
    constructor(props) {
        super(props);
        this.isRotates = false;
        this.state = {
            angleX: 0,
            angleY: 0,
            rotationInfo: {
                x: 0,
                y: 0
            },
            viewDistance: 3.5
        };
    }
    onWheelHandler(event) {
        if (event.nativeEvent.deltaY > 0) {
            this.setState({
                viewDistance: this.state.viewDistance + 1
            });
        }
        else {
            this.setState({
                viewDistance: this.state.viewDistance - 1
            });
        }
    }
    onMouseDownHandeler(event) {
        this.isRotates = true;
        this.state.rotationInfo.x = event.pageX;
        this.state.rotationInfo.y = event.pageY;
    }
    onMouseUpHandeler(event) {
        this.isRotates = false;
    }
    onMouseMoveHandeler(event) {
        if (this.isRotates) {
            let deltaX = this.state.rotationInfo.x - event.pageX, deltaY = this.state.rotationInfo.y - event.pageY;
            this.setState({
                angleX: this.state.angleX - deltaY,
                angleY: this.state.angleY + deltaX,
                rotationInfo: {
                    x: event.pageX,
                    y: event.pageY
                }
            });
        }
    }
    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const canvas = this.refs['canvas'].getContext('2d');
        canvas.clearRect(0, 0, 10000, 10000);
        let r = new Rectangle({
            angleX: this.state.angleX,
            angleY: this.state.angleY,
            viewDistance: this.state.viewDistance,
            canvas: canvas,
            rectangle: { height: 10, length: 20, width: 10 },
            position: { x: 300, y: 300, z: 0 }
        });
        r.updateCanvas();
        let r2 = new Rectangle({
            angleX: this.state.angleX,
            angleY: this.state.angleY,
            viewDistance: this.state.viewDistance,
            canvas: canvas,
            rectangle: { height: 10, length: 20, width: 10 },
            position: { x: 300, y: 600, z: 0 }
        });
        r2.updateCanvas();
        console.log(r);
    }
    render() {
        return React.createElement("canvas", { ref: 'canvas', onWheel: this.onWheelHandler.bind(this), onMouseDown: this.onMouseDownHandeler.bind(this), onMouseUp: this.onMouseUpHandeler.bind(this), onMouseMove: this.onMouseMoveHandeler.bind(this), onMouseLeave: this.onMouseUpHandeler.bind(this), width: '800px', height: '800px' });
    }
}
//# sourceMappingURL=Wagon.js.map