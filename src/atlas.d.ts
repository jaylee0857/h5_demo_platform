// 在 src 目錄下創建一個 types 文件夾，然後添加 atlas.d.ts 文件
declare module "*.atlas" {
  const content: string;
  export default content;
}
