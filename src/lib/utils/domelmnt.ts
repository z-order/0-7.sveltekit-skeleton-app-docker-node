// @ts-nocheck @ts-ignore
function _setStyleXYFull(containerClass: string, containerIndex: number, targetClass: string, targetIndex: number, padding: number) {
  $: {
    const targetElement = document.getElementsByClassName(targetClass)[targetIndex];
    const containerElement = document.getElementsByClassName(containerClass)[containerIndex];
    let containerElementX = containerElement.clientLeft;
    let containerElementY = containerElement.clientTop;
    let containerElementW = containerElement.clientWidth;
    let containerElementH = containerElement.clientHeight;
    let containerElementOffsetX = containerElement.offsetLeft;
    let containerElementOffsetY = containerElement.offsetTop;
    let containerElementOffsetW = containerElement.offsetWidth;
    let containerElementOffsetH = containerElement.offsetHeight;
    targetElement.style.position = 'absolute';
    targetElement.style.left = `${containerElementOffsetX - padding}px`;
    targetElement.style.top = `${containerElementOffsetY - padding}px`;
    targetElement.style.width = `${containerElementOffsetW + padding * 2}px`;
    targetElement.style.height = `${containerElementOffsetH + padding * 2}px`;
  }
}

function _setStyleElementVisible(targetClass: string, targetIndex: number, visible: boolean) {
  const targetElement = document.getElementsByClassName(targetClass)[targetIndex];
  targetElement.style.visibility = visible ? 'visible' : 'hidden';
  return true;
}

export namespace _$domElmnt {
  export let setStyleXYFull = _setStyleXYFull;
  export let setStyleElementVisible = _setStyleElementVisible;
}
