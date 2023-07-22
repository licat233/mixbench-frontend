export function checkImageLoad(imageUrl: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();

    image.onload = function() {
      // 图片加载成功
      resolve();
    };

    image.onerror = function() {
      // 图片加载失败
      reject();
    };

    image.src = imageUrl;
  });
}
