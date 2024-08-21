let zIndexCounter = 1;

function bringToTop(element) {
  element.style.zIndex = zIndexCounter++;
}

function makeResizable(elmnt) {
  elmnt.classList.add("resizable");
  elmnt.style.position = 'absolute';

  addResizeHandles(elmnt);
  dragElement(elmnt);
}

function addResizeHandles(elmnt) {
  const handles = ['se', 'sw', 'ne', 'nw', 'n', 's', 'e', 'w'];
  handles.forEach(handle => {
    const div = document.createElement('div');
    div.className = `resize-handle ${handle}`;
    elmnt.appendChild(div);
    div.addEventListener('mousedown', startResize.bind(null, elmnt, handle));
  });
}

function startResize(elmnt, handle, e) {
  e.preventDefault();
  let startX = e.clientX;
  let startY = e.clientY;
  const startWidth = parseFloat(getComputedStyle(elmnt, null).width.replace('px', ''));
  const startHeight = parseFloat(getComputedStyle(elmnt, null).height.replace('px', ''));
  const startTop = parseFloat(getComputedStyle(elmnt, null).top.replace('px', ''));
  const startLeft = parseFloat(getComputedStyle(elmnt, null).left.replace('px', ''));

  function resize(e) {
    let newWidth, newHeight, newTop, newLeft;

    if (handle.includes('e')) {
      newWidth = startWidth + e.clientX - startX;
    }
    if (handle.includes('w')) {
      newWidth = startWidth - (e.clientX - startX);
      newLeft = startLeft + (e.clientX - startX);
    }
    if (handle.includes('s')) {
      newHeight = startHeight + e.clientY - startY;
    }
    if (handle.includes('n')) {
      newHeight = startHeight - (e.clientY - startY);
      newTop = startTop + (e.clientY - startY);
    }

    elmnt.style.width = `${newWidth}px`;
    elmnt.style.height = `${newHeight}px`;
    if (newTop !== undefined) elmnt.style.top = `${newTop}px`;
    if (newLeft !== undefined) elmnt.style.left = `${newLeft}px`;
  }

  function stopResize() {
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
  }

  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);
}

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.onmousedown = function(e) {
    if (e.target.classList.contains('resize-handle')) return;
    bringToTop(elmnt);
    dragMouseDown(e);
  };

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function resetSize(element) {
  element.style.width = '300px';
  element.style.height = '200px';
}

setInterval(function () {
  document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
}, 1000);

makeResizable(document.getElementById("mydiv"));
makeResizable(document.getElementById("previewBlock"));

document.getElementById("openButton").addEventListener("click", function() {
  const myDiv = document.getElementById("mydiv");
  bringToTop(myDiv);
  myDiv.style.display = "flex";
  resetSize(myDiv);
});

document.getElementById("closeButton").addEventListener("click", function() {
  document.getElementById("mydiv").style.display = "none";
});

document.getElementById("previewButton").addEventListener("click", function() {
  const previewBlock = document.getElementById("previewBlock");
  const previewFrame = document.getElementById("previewFrame");
  previewFrame.src = "https://yash00241.github.io";
  bringToTop(previewBlock);
  previewBlock.style.display = "flex";
  resetSize(previewBlock);
});

document.getElementById("previewCloseButton").addEventListener("click", function() {
  document.getElementById("previewBlock").style.display = "none";
});

document.getElementById("instagramButton").addEventListener("click", function() {
  window.open("https://www.instagram.com/mr.yash00241", "_blank");
});

document.addEventListener('mousemove', function(e) {
  const glow = document.querySelector('.glow');
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

document.getElementById('popupButton').addEventListener('click', function() {
  const iframe = document.getElementById('previewFrame');
  const url = iframe.src;
  if (url) {
    window.open(url, '_blank');
  } 
});
