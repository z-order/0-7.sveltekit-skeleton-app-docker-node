/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck @ts-ignore
function _setStyleXYFull(containerClass: string, containerIndex: number, targetClass: string, targetIndex: number, padding: number) {
  // eslint-disable-next-line no-unused-labels
  $: {
    const targetElement = document.getElementsByClassName(targetClass)[targetIndex];
    const containerElement = document.getElementsByClassName(containerClass)[containerIndex];
    const containerElementX = containerElement.clientLeft;
    const containerElementY = containerElement.clientTop;
    const containerElementW = containerElement.clientWidth;
    const containerElementH = containerElement.clientHeight;
    const containerElementOffsetX = containerElement.offsetLeft;
    const containerElementOffsetY = containerElement.offsetTop;
    const containerElementOffsetW = containerElement.offsetWidth;
    const containerElementOffsetH = containerElement.offsetHeight;
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
  export const setStyleXYFull = _setStyleXYFull;
  export const setStyleElementVisible = _setStyleElementVisible;
}
