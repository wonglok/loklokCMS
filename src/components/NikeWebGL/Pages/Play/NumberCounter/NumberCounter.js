/* eslint-disable */
// var CanvasTextWrapper = require('canvas-text-wrapper').CanvasTextWrapper;

export default function () {
  var factor = 1.0;
  var api = {};
  var canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  canvas.style.width = 512 * factor + 'px';
  canvas.style.height = 512 * factor + 'px';

  var ctx, context;
  context = ctx = canvas.getContext("2d");
  // ctx.translate(0.5, 0.5);

  var grd = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  // light blue
  grd.addColorStop(0, 'red');
  // dark blue
  grd.addColorStop(1, 'white');

  var drawing = false


  function draw (word) {
    var padX = 100;
    var padY = 70;/* 20: */
    if (drawing) { return; }
    drawing = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '310px DINCond-Regular';
    var width = ctx.measureText(word).width;

    var charNum = (word + '').length
    var autoCenter = width / (2 * charNum) * (charNum - 1)

    ctx.fillText(word, padX + 70 - autoCenter, padY + 310);
    ctx.font = '130px DINCond-Regular';
    ctx.fillText('"', padX + 70 + width - autoCenter, padY + 130 + 20);
    drawing = false;
  }
  //draw(0);

  function drawStroke (word) {
    var padX = 120;
    var padY = 70;/* 20: */
    if (drawing) { return; }
    drawing = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3.5;
    ctx.font = '310px DINCond-Medium';
    var width = ctx.measureText(word).width;

    var charNum = (word + '').length
    var autoCenter = width / (2 * charNum) * (charNum - 1)

    ctx.strokeText(word, padX + 70 - autoCenter, padY + 310);
    // ctx.font = '130px DINCond-Medium';
    // ctx.strokeText('"', padX + 70 + width - autoCenter, padY + 130 + 20);
    drawing = false;
  }

  api.drawStroke = drawStroke;
  api.canvas = canvas;
  api.draw = draw;

  api.install = (target) => {
    target.appendChild(canvas)
  };
  api.uninstall = (target) => {
    target.removeChild(canvas)
  };

  return api;
}