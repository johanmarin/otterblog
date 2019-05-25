var get = function(el) {
  if (typeof el === 'string') {
    return document.querySelector(el);
  }
  return el;
};
var dragable = function(parentEl, dragEl) {
  var parent = get(parentEl);
  var target = get(dragEl);
  var drag = false;
  offsetY = 0;
  var mousemoveTemp = null;

  if (target) {
    var mouseY = function(e) {
      if (e.pageY) {
        return e.pageY;
      }
      if (e.clientY) {
        return e.clientY + (document.documentElement.scrollTop ?
          document.documentElement.scrollTop :
          document.body.scrollTop);
      }
      return null;
    };
    
    var move = function (x, y) {
      var xPos = parseInt(target.style.left) || 0;
      var yPos = parseInt(target.style.top) || 0;

      target.style.left = x + 'px';
      target.style.top  = (yPos + y) + 'px';
    };
    
    var mouseMoveHandler = function (e) {
      e = e || window.event;
      if(!drag){return true};

      var x = 0;
      var y = mouseY(e);
      if (x != 0 || y != offsetY) {
        move(x , y - offsetY);
        offsetY = y;
      }
      return false;
    };
    
    var start_drag = function (e) {
      e = e || window.event;

      offsetY=mouseY(e);
      drag=true; // basically we're using this to detect dragging

      // save any previous mousemove event handler:
      if (document.body.onmousemove) {
        mousemoveTemp = document.body.onmousemove;
      }
      document.body.onmousemove = mouseMoveHandler;
      return false;
    };
    
    var stop_drag = function () {
      drag=false;      

      // restore previous mousemove event handler if necessary:
      if (mousemoveTemp) {
        document.body.onmousemove = mousemoveTemp;
        mousemoveTemp = null;
      }
      return false;
    };
    
    parent.onmousedown = start_drag;
    parent.onmouseup = stop_drag;
  }
}

dragable('.container', '.draggable');
