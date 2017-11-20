/* eslint-disable */
import TWEEN from '@tweenjs/tween.js'

export default function  ({ refresher }) {
  var pxr = 2.0;
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
  function drawBox ({ top, left, boxW, boxH }) {
    ctx.lineWidth = 2 * pxr;
    ctx.strokeStyle = '#EE3932';
    ctx.strokeRect(left, top, boxW, boxH);
  }

  var animateDrawBox = ({ boxW, boxH, top, left }, { delay, yTime, hTime, setter }) => {
    var group = { boxW, boxH, top, left };

    group.top += boxH * 2.0;
    group.boxH += boxH * 2.0;

    new TWEEN.Tween(group)
      .to({ top }, yTime)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        setter(group);
      })
      .delay(delay)
      .start();

    new TWEEN.Tween(group)
      .to({ boxH }, hTime)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        setter(group);
      })
      .delay(delay)
      .start();
  }

  // var animateRevealText = (config,{ delay, hTime, setter }) => {
  //   var group = { drawImage: { ...config.drawImage }, drawGrad: { ...config.drawGrad } };

  //   new TWEEN.Tween(group.drawImage)
  //     .to({ ...config.drawImage2 }, hTime)
  //     .easing(TWEEN.Easing.Quadratic.Out)
  //     .onUpdate(() => {
  //       setter(group);
  //     })
  //     .delay(delay)
  //     .start();

  //   // new TWEEN.Tween(group.drawGrad)
  //   //   .to({ ...config.drawGrad2 }, hTime)
  //   //   .easing(TWEEN.Easing.Quadratic.Out)
  //   //   .onUpdate(() => {
  //   //     setter(group);
  //   //   })
  //   //   .delay(delay)
  //   //   .start();
  // }

  function box1 () {
    var boxW = 335 * pxr;
    var boxH = (220) * pxr;
    var top = 20 * pxr;
    var left = getLeft({ boxW: 335 * pxr });
    return { boxW, boxH, top, left };
  }
  function box2 () {
    var boxW = 315 * pxr;
    var boxH = (150) * pxr;
    var top = (20 + 60) * pxr;
    var left = (10 * pxr) + getLeft({ boxW: 335 * pxr });
    return { boxW, boxH, top, left };
  }
  function box3 () {
    var boxW = 295 * pxr;
    var boxH = (80) * pxr;
    var top = (20 + 60 + 60) * pxr;
    var left = (20 * pxr) + getLeft({ boxW: 335 * pxr });
    return { boxW, boxH, top, left };
  }
  function box4 () {
    var boxW = 138 * pxr;
    var boxH = (60) * pxr;
    var top = (20 + 60 + 60 + 10) * pxr;
    var left = ((20 + 48.5) * pxr) + getLeft({ boxW: 138 * pxr });
    return { boxW, boxH, top, left };
  }

  // function boxText1 () {
  //   var top = 100 * pxr;
  //   var left = (130 - 16) * pxr;
  //   var width = 285 * pxr;
  //   var height = 15 * pxr;
  //   return {
  //     drawImage: ({ image: images['box-txt-1'].image, top: top + 200, left, width, height }),
  //     drawImage2: ({ image: images['box-txt-1'].image, top: top, left, width, height }),
  //     drawGrad: ({ x0: left, y0: top, x1: 0, y1: top }),
  //     drawGrad2: ({ x0: left, y0: top, x1: 0, y1: top })
  //   }
  // }

  // function boxText2 () {
  //   var top = 150 * pxr;
  //   var left = (130) * pxr;
  //   var width = 98 * pxr;
  //   var height = 55 * pxr;
  //   return {
  //     drawImage: ({ image: images['box-txt-2'].image, top: top + 200, left, width, height }),
  //     drawImage2: ({ image: images['box-txt-2'].image, top: top, left, width, height }),
  //     drawGrad: ({ x0: left, y0: top, x1: 0, y1: top }),
  //     drawGrad2: ({ x0: left, y0: top, x1: 0, y1: top })
  //   }
  // }

  var ref = {}
  function start () {
    animateDrawBox(box1(), { delay: 0, yTime: 700, hTime: 100 + 2200, setter: (v) => { ref.b1 = v } });
    animateDrawBox(box2(), { delay: 300, yTime: 700, hTime: 100 + 1700, setter: (v) => { ref.b2 = v } });
    animateDrawBox(box3(), { delay: 600, yTime: 700, hTime: 100 + 1300, setter: (v) => { ref.b3 = v } });
    animateDrawBox(box4(), { delay: 900, yTime: 700, hTime: 100 + 600, setter: (v) => { ref.b4 = v } });

    // animateRevealText(boxText1(), { delay: 0, hTime: 500, setter: (v) => { ref.r1 = v } })
    // animateRevealText(boxText2(), { delay: 0, hTime: 500, setter: (v) => { ref.r2 = v } })
  }

  api.start = start;
  api.canvas = canvas;
  api.draw = draw;
  api.reset = reset;

  var drawing = false
  function reset () {
    ref = {};
    ctx.clearRect(0, 0, size, size);
  }
  function draw () {
    if (drawing) { return; }
    drawing = true;

    ctx.clearRect(0, 0, size, size);

    if (ref.b1) {
      drawBox(ref.b1)
    }
    if (ref.b2) {
      drawBox(ref.b2)
    }
    if (ref.b3) {
      drawBox(ref.b3)
    }
    if (ref.b4) {
      drawBox(ref.b4)
    }

    // if (ref.r1) {
    //   drawImage(ref.r1.drawImage)
    //   drawGrad(ref.r1.drawGrad)
    // }
    // if (ref.r2) {
    //   drawImage(ref.r2.drawImage)
    //   drawGrad(ref.r2.drawGrad)
    // }
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