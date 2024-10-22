import cloudinary from '@/lib/cloudinary';

export async function convertImage(image) {
  const imageData = await image.arrayBuffer();
  const mime = image.type;
  const encoding = 'base64';
  const base64Data = Buffer.from(imageData).toString('base64');
  const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
  return fileUri;
}

export async function uploadImageToCloudinary(fn, imageFile, folderName) {
  if (!imageFile) return;

  const fileUri = await fn(imageFile);
  const result = await cloudinary.uploader.upload(fileUri, {
    folder: folderName
  });
  return result.secure_url;
}
