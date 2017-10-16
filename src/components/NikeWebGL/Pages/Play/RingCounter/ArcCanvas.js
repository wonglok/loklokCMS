/* eslint-disable */
export default function  () {
  var factor = 250 / 512;
  var api = {};
  var canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  canvas.style.width = 512 * factor + 'px';
  canvas.style.height = 512 * factor + 'px';

  var ctx, context;
  context = ctx = canvas.getContext("2d");

  var grd = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  // light blue
  grd.addColorStop(0, 'red');
  // dark blue
  grd.addColorStop(1, 'white');

  var drawing = false

  function draw (percentage) {
    if (drawing) { return; }
    drawing = true;
    context.clearRect(0, 0, canvas.width, canvas.height);
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var radius = 240;
    var startAngle = 1.5 * Math.PI;
    var endAngle = (1.5) * Math.PI + (Math.PI * 2 * percentage);
    var counterClockwise = false;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, counterClockwise);
    context.lineWidth = 5;
    // line color
    context.strokeStyle = '#1a1a1a';
    context.stroke();

    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = 5;
    // line color
    context.strokeStyle = grd;
    context.stroke();
    drawing = false;
  }
  draw(0);

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