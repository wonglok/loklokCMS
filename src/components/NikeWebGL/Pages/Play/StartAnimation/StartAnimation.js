/* eslint-disable */
import TWEEN from '@tweenjs/tween.js'

export default function  ({ renderresher }) {
  var pxr = 1.0;
  var api = {};
  var size = 512 * pxr;

  // function imager (src) {
  //   var image = new Image()
  //   image.src = src
  //   var result = { image, ready: false }
  //   image.onload = () => {
  //     result.ready = true
  //   }
  //   return result
  // }

  // var images = {
  //   'box-btn-comics': imager(require('../img/shake/box-btn-comics.png')),
  //   'box-btn-game': imager(require('../img/shake/box-btn-game.png')),
  //   'box-txt-1': imager(require('../img/shake/box-txt-1.png')),
  //   'box-txt-2': imager(require('../img/shake/box-txt-2.png'))
  // };

  var canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  canvas.style.width = canvas.width / pxr + 'px';
  canvas.style.height = canvas.height / pxr + 'px';

  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);

  function getLeft ({ boxW }) {
    return (canvas.width - boxW) / 2;
  }

  // function drawImage ({ image, top, left, width, height }) {
  //   ctx.drawImage(image, left, top, width, height);
  // }
  // function drawGrad ({ x0, y0, x1, y1 }) {
  //   var gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  //   gradient.addColorStop(0, 'transparent');
  //   gradient.addColorStop(1, 'black');
  //   ctx.fillStyle = gradient;
  //   ctx.fillRect(x0, y0, x1, y1);
  // }

  function drawBox ({ top, left, boxW, boxH, opacity }) {
    ctx.lineWidth = 3 * pxr;
    ctx.strokeStyle = `rgba(238, 57, 50, ${opacity})`;
    ctx.strokeRect(left, top, boxW, boxH);
  }

  var animateDrawBox = ({ boxW, boxH, top, left }, { delay, yTime, hTime, setter }) => {
    var group = { boxW, boxH, top, left, opacity: 0 };
    setter(group);
    group.top = group.top + group.boxH;
    group.boxH = 0;

    new TWEEN.Tween(group)
      .to({ boxH, top, opacity: 1 }, hTime)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        setter(group);
      })
      .delay(delay)
      .start();
  }

  function box1 () {
    var boxW = 260 * pxr;
    var boxH = (260) * pxr;
    var top = 20 * pxr;
    var left = getLeft({ boxW: 260 * pxr });
    return { boxW, boxH, top, left };
  }

  function box2 () {
    var boxW = (230) * pxr;
    var boxH = (180) * pxr;
    var top = (60 + 20 + 4) * pxr;
    var left = getLeft({ boxW: 230 * pxr });
    return { boxW, boxH, top, left };
  }

  function box3 () {
    var boxW = (200) * pxr;
    var boxH = (100) * pxr;
    var top = (60 + 60 + 20 + 4) * pxr;
    var left = getLeft({ boxW: 200 * pxr });
    return { boxW, boxH, top, left };
  }

  var render = {}
  function start () {
    animateDrawBox(box1(), { delay: 0.5 * 500, yTime: 300, hTime: 0.5 * 1000, setter: (v) => { render.b1 = v } });
    animateDrawBox(box2(), { delay: 0.5 * 1000, yTime: 300, hTime: 0.5 * 1000, setter: (v) => { render.b2 = v } });
    animateDrawBox(box3(), { delay: 0.5 * 1500, yTime: 300, hTime: 0.5 * 1000, setter: (v) => { render.b3 = v } });
    // animateRevealText(boxText1(), { delay: 0, hTime: 500, setter: (v) => { render.r1 = v } })
    // animateRevealText(boxText2(), { delay: 0, hTime: 500, setter: (v) => { render.r2 = v } })
  }

  api.start = start;
  api.canvas = canvas;
  api.draw = draw;
  api.reset = reset;

  var drawing = false
  function reset () {
    render = {};
    ctx.clearRect(0, 0, size, size);
  }
  function draw () {
    if (drawing) { return; }
    drawing = true;

    ctx.clearRect(0, 0, size, size);

    if (render.b1) {
      drawBox(render.b1)
    }
    if (render.b2) {
      drawBox(render.b2)
    }
    if (render.b3) {
      drawBox(render.b3)
    }
    if (render.b4) {
      drawBox(render.b4)
    }
    drawing = false;
  }
  // draw(0);

  api.install = (target) => {
    target.appendChild(canvas)
  };
  api.uninstall = (target) => {
    target.removeChild(canvas)
  };

  return api;
}