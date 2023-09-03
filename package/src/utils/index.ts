export function getCurrentMousePosition(event: MouseEvent | TouchEvent) {
  return event instanceof MouseEvent
    ? { x: event.offsetX, y: event.offsetY }
    : { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
}

export function download(url: string, name = '') {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = name;

  document.body.appendChild(a);
  a.click();
  a.remove();
}
