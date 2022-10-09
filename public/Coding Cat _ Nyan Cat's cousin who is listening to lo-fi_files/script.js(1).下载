/* 
MIT license

Copyright (c) 2021 by Alex Lerida (https://codepen.io/lerida/pen/QWKzBQm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const Main = () => {
  return /*#__PURE__*/(
    React.createElement("main", { className: "Main" }, /*#__PURE__*/
    React.createElement(Form, null)));


};

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.Toggle = React.createRef();

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isActive: {
        Toggle: true } };


  }

  handleClick(el) {
    if (!this.state.isActive[el]) {
      this.state.isActive[el] = true;
      this[el].current.animate(
      -9,
      -6,
      "right",
      ".in .seq-1",
      ".in .seq-2",
      ".in .seq-3",
      ".in .seq-4",
      ".in .seq-5",
      ".in .seq-6",
      "#74798E",
      "#1A1E2D",
      3,
      3);

    } else {
      this.state.isActive[el] = false;
      this[el].current.animate(
      9,
      3,
      "left",
      ".out .seq-1",
      ".out .seq-2",
      ".out .seq-3",
      ".out .seq-4",
      ".out .seq-5",
      ".in .seq-0",
      "#9ADF90",
      "#1A1E2D",
      -3,
      -3);

    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("form", { className: "Form" }, /*#__PURE__*/
      React.createElement(Toggle, { handleClick: this.handleClick, ref: this.Toggle })));


  }}


class Toggle extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleClick",


    () => this.props.handleClick("Toggle"));}

  animate(
  x,
  y,
  transformOrigin,
  seq_1,
  seq_2,
  seq_3,
  seq_4,
  seq_5,
  seq_6,
  baseColor,
  backgroundColor,
  x2,
  y2)
  {
    gsap.set(".Toggle", { pointerEvents: "none" });
    setTimeout(() => gsap.set(".Toggle", { pointerEvents: "all" }), 900);

    const tl = gsap.timeline();

    tl.to("svg", {
      duration: 1,
      ease: "back.inOut",
      x: x,
      rotate: y });


    tl.to("svg", {
      duration: 1,
      delay: -0.3,
      ease: "back.inOut",
      x: 0,
      rotate: 0 });


    tl.to(".in .seq-0", {
      duration: 1,
      delay: -2,
      ease: "none",
      x: x,
      scaleX: 0.8,
      ease: "back.inOut",
      transformOrigin: transformOrigin });


    tl.to(".in .seq-0", {
      ease: "none",
      delay: -0.5,
      x: y,
      scaleX: 1,
      transformOrigin: "center",
      morphSVG: seq_1 });


    tl.to(".in .seq-0", {
      delay: -0.5,
      ease: "none",
      morphSVG: seq_2 });


    tl.to(".in .seq-0", {
      delay: -0.5,
      ease: "none",
      morphSVG: seq_3 });


    tl.to(".in .seq-0", {
      delay: -0.3,
      ease: "none",
      morphSVG: seq_4 });


    tl.to(".in .seq-0", {
      delay: -0.3,
      ease: "none",
      morphSVG: seq_5 });


    tl.to(".in .seq-0", {
      duration: 3,
      delay: -0.3,
      ease: "elastic.out",
      morphSVG: seq_6 });


    tl.to("svg", {
      duration: 1,
      delay: -3,
      ease: "back.inOut",
      x: x2,
      rotate: y2 });


    tl.to("svg", {
      duration: 1,
      delay: -2.5,
      ease: "back.inOut",
      x: 0,
      rotate: 0 });


    const colors = gsap.timeline();

    colors.to(".base", {
      duration: 0.9,
      delay: 0.3,
      fill: baseColor,
      ease: "power3.inOut" });


    colors.to(".Main", {
      duration: 0.9,
      delay: -0.9,
      ease: "power3.inOut",
      backgroundColor: backgroundColor });


    const master = gsap.timeline();

    master.to(tl, { progress: 1, ease: "none", duration: 2 });
  }

  componentDidMount() {
    gsap.set(".hide", { opacity: 0 });

    this.animate(
    -9,
    -6,
    "right",
    ".in .seq-1",
    ".in .seq-2",
    ".in .seq-3",
    ".in .seq-4",
    ".in .seq-5",
    ".in .seq-6",
    "#74798E",
    "#1A1E2D",
    3,
    3);

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "Toggle", onClick: this.handleClick }, /*#__PURE__*/
      React.createElement("svg", { viewBox: "0 0 120 48" }, /*#__PURE__*/
      React.createElement("path", {
        className: "st0 base",
        d: "M96,48H24C10.7,48,0,37.3,0,24v0C0,10.7,10.7,0,24,0l72,0c13.3,0,24,10.7,24,24v0 C120,37.3,109.3,48,96,48z" }), /*#__PURE__*/


      React.createElement("g", { className: "in" }, /*#__PURE__*/
      React.createElement("g", { className: "circle" }, /*#__PURE__*/
      React.createElement("path", {
        className: "st1 seq-0",
        d: "M24.8,42.2c-9.9,0-18-8.1-18-18s8.1-18,18-18s18,8.1,18,18S34.7,42.2,24.8,42.2z" }), /*#__PURE__*/

      React.createElement("path", {
        className: "st1 seq-1 hide",
        d: "M24.6,42.6c-9.8-1.8-18.8-8.1-18-18c1.3-16.4,8.1-16.7,18-18C44,4,47.1,15.8,47.1,25.8 S34.6,44.5,24.6,42.6z" }), /*#__PURE__*/


      React.createElement("path", {
        className: "st1 seq-2 hide",
        d: "M21.6,21.7c-2-0.3-3.9-1.2-5.1-2.8c-1.2-1.7-1.8-4,1.1-6.3c5.7-4.6,20.2-7.5,33.3-4.9 s15.3,16.1,13.6,21.2S55,43.4,43.2,42.4s-13.4-1-16.1-3.8s-0.8-7.3,2.1-10.1C31.7,25.9,26.3,22.4,21.6,21.7z" }), /*#__PURE__*/


      React.createElement("path", {
        className: "st1 seq-3 hide",
        d: "M15,19.5c0,0,0.8-4.3,8.8-6.6c2.3-0.7,5.4-1.4,8.8-2.2c8.6-2,19-4,23.5-4 c6.2,0,22.9-0.8,28.5,7.5s4.7,17.4-0.8,22.7c-5.4,5.3-16.2,7.3-28.9,5.1c0,0-5.4-2.3-7.1-8.1c-1.7-5.7-2.8-5.7-6.4-5.2 c-3.6,0.5-9-0.1-9.7-2.9c-0.7-2.8-4.4-4.9-9.4-4.5C17.4,21.8,15.2,22,15,19.5z" }), /*#__PURE__*/



      React.createElement("path", {
        className: "st1 seq-4 hide",
        d: "M53.5,22.2c-2-0.3-3.9-1.2-5.1-2.8c-1.2-1.7-1.8-4,1.1-6.3c5.7-4.6,20.2-7.5,33.3-4.9 s15.3,16.1,13.6,21.2c-1.6,5.2-9.6,14.5-21.3,13.5s-13.4-1-16.1-3.8s-0.8-7.3,2.1-10.1C63.7,26.4,58.3,22.9,53.5,22.2z" }), /*#__PURE__*/


      React.createElement("path", {
        className: "st1 seq-5 hide",
        d: "M72.6,25.8c0-9.9,3.1-21.8,22.6-19.1c9.9,1.3,16.7,1.6,18,18c0.8,9.9-8.2,16.2-18,18 C85.1,44.5,72.6,35.7,72.6,25.8z" }), /*#__PURE__*/


      React.createElement("path", {
        className: "st1 seq-6 hide",
        d: "M76.9,24.2c0-9.9,8.1-18,18-18s18,8.1,18,18s-8.1,18-18,18S76.9,34.2,76.9,24.2z" }))), /*#__PURE__*/



      React.createElement("g", { className: "out" }, /*#__PURE__*/
      React.createElement("g", { className: "circle" }, /*#__PURE__*/
      React.createElement("path", {
        className: "st1 seq-0 hide",
        d: "M76.9,24.5c0-9.9,8.1-18,18-18s18,8.1,18,18s-8.1,18-18,18S76.9,34.4,76.9,24.5z" }), /*#__PURE__*/

      React.createElement("path", {
        className: "st1 seq-1 hide",
        d: "M72.6,26c0-9.9,3.1-21.8,22.6-19.1c9.9,1.3,16.7,1.6,18,18c0.8,9.9-8.2,16.2-18,18 C85.1,44.8,72.6,36,72.6,26z" }), /*#__PURE__*/


      React.createElement("path", {
        className: "st1 seq-2 hide",
        d: "M90.4,28.7c2.9,2.9,4.7,7.3,2.1,10.1c-2.6,2.9-4.3,2.9-16.1,3.8s-19.7-8.4-21.3-13.5 s0.5-18.7,13.6-21.2s27.6,0.3,33.3,4.9c2.9,2.3,2.4,4.6,1.1,6.3c-1.2,1.6-3.1,2.6-5.1,2.8C93.4,22.7,87.9,26.2,90.4,28.7z" }), /*#__PURE__*/


      React.createElement("path", {
        className: "st1 seq-3 hide",
        d: "M97.4,21.7c-4.9-0.4-8.7,1.7-9.4,4.5c-0.7,2.8-6.1,3.4-9.7,2.9c-3.6-0.5-4.6-0.6-6.4,5.2 s-7.1,8.1-7.1,8.1c-12.7,2.2-23.5,0.2-28.9-5.1s-6.4-14.4-0.8-22.7S57.4,7,63.6,7c4.4,0,14.9,2,23.5,4c3.4,0.8,6.5,1.6,8.8,2.2 c8,2.3,8.8,6.6,8.8,6.6C104.5,22.3,102.3,22.1,97.4,21.7z" }), /*#__PURE__*/



      React.createElement("path", {
        className: "st1 seq-4 hide",
        d: "M58.5,29.2c2.9,2.9,4.7,7.3,2.1,10.1c-2.6,2.9-4.3,2.9-16.1,3.8c-11.8,1-19.7-8.4-21.3-13.5 c-1.6-5.2,0.5-18.7,13.6-21.2s27.6,0.3,33.3,4.9c2.9,2.3,2.4,4.6,1.1,6.3c-1.2,1.6-3.1,2.6-5.1,2.8C61.4,23.1,56,26.7,58.5,29.2z" }), /*#__PURE__*/


      React.createElement("path", {
        className: "st1 seq-5 hide",
        d: "M24.6,42.9c-9.8-1.8-18.8-8.1-18-18c1.3-16.4,8.1-16.7,18-18C44,4.3,47.1,16.1,47.1,26 S34.6,44.8,24.6,42.9z" }), /*#__PURE__*/


      React.createElement("path", {
        className: "st1 seq-6 hide",
        d: "M24.8,42.5c-9.9,0-18-8.1-18-18s8.1-18,18-18s18,8.1,18,18S34.7,42.5,24.8,42.5z" }))))));






  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Main, null), document.getElementById("app"));