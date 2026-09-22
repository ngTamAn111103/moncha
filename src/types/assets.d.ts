// Khai báo kiểu cho file ảnh tĩnh (Metro trả về asset id dạng number)
declare module "*.svg" {
  const asset: number;
  export default asset;
}
