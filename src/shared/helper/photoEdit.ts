import { Area } from 'react-easy-crop';
import { v4 as uuid } from 'uuid';

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => {
      reject(error);
    });
    image.src = url;
  });
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area, rotation = 0) {
  const image = await createImage(imageSrc);
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
  
  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);
  
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  );
  
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y,
  );
  
  return canvas;
}

export const generateCroppedPhoto = async (img: File, crop: Area): Promise<File> => {
  if (!crop || !img) {
    return;
  }
  
  const imgBlob = URL.createObjectURL(img);

  const canvas = await getCroppedImg(imgBlob, crop);
  const blob = canvas.toDataURL();

  const result: File | undefined = await fetch(blob)
    .then((res) => res.blob())
    .then((blob) => {
      const type = img ? img.name.split('.').pop() : '.jpg';
      const name = uuid();
      return new File([blob], name, { type: `image/${type}`, lastModified: new Date().getTime() });
    })
    .catch(() => {
      return undefined;
    });

  if (result) {
    return result;
  }
};
