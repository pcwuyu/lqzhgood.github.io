function fixOrientation (url, opts, fn) {
  if (typeof opts == 'function') {
    fn = opts;
    opts = {};
  }

  var buf = toArray(url);
  var tags = {};
  try { tags = exif(buf.buffer) } catch (err) {}

  var toRotate = tags.Orientation
    && typeof tags.Orientation.value == 'number'
    && (tags.Orientation.value == 6
    || tags.Orientation.value == 8);

  if (!toRotate) {
    process.nextTick(function () {
      fn(url, opts.image && urlToImage(url));
    });
    return;
  }

  var s = size[buf.type](buf);
  var max = Math.max(s.width, s.height);
  var half = max / 2;
  var dir = { 6: 1, 8: -1 }[tags.Orientation.value];

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = canvas.height = max;

  rotate(ctx, { x: half, y: half, degrees: dir * 90 });

  urlToImage(url, function (img) {
    if (dir == 1) {
      ctx.drawImage(img, 0, max - s.height);
    } else {
      ctx.drawImage(img, max - s.width, 0);
    }

    rotate(ctx, { x: half, y: half, degrees: -1 * dir * 90 });
    resize(canvas, {
      width: s.height,
      height: s.width
    });

    var url = buf.type == 'image/png'
      ? canvas.toDataURL()
      : canvas.toDataURL('image/jpeg', 1);
    fn(url, opts.image && urlToImage(url));
  });
}


function urlToImage (url, fn) {
  var img = new Image();
  if (fn) img.onload = fn.bind(null, img);
  img.src = url;
  return img;
}


function resize (canvas, o) {
  var ctx = canvas.getContext('2d');
  var imgData = ctx.getImageData(0, 0, o.width, o.height);
  canvas.width = o.width;
  canvas.height = o.height;
  ctx.putImageData(imgData, 0, 0);
}


