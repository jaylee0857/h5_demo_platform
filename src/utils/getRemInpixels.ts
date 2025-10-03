export const getRemInPixels = () => {
  // 取得 html 元素的計算樣式
  const htmlElement = document.documentElement;
  const fontSize = window.getComputedStyle(htmlElement).fontSize;

  // 將字體大小轉換為數字並返回
  return parseFloat(fontSize);
};

export default getRemInPixels;
