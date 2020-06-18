import 'core-js/features/promise';
import 'core-js/features/string/pad-start';

export function add0 (n: number, i = 2): string {
  const sNum = parseInt(n.toString(), 10).toString();
  return sNum.padStart(i, '0');
}

export function secondToTime (second: number): string {
  const hour = Math.floor(second / 3600);
  const min = Math.floor((second - hour * 3600) / 60);
  const sec = Math.floor(second - hour * 3600 - min * 60);
  return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
}

export function importJS (src: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const oScript = document.createElement('script');
    oScript.async = true;
    oScript.src = src;
    oScript.onload = (): void => {
      resolve();
    };
    oScript.onerror = (): void => {
      reject(new Error('加载失败'));
    };
    document.head.insertAdjacentElement('beforeend', oScript);
  });
}
