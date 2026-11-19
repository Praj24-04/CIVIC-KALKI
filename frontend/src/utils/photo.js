/**
 * CIVIC-KALKI — photos are shrunk in the browser before upload.
 * A phone photo is often 4-8 MB; the assistant only needs to see the problem.
 * Larger than 1600 px on its long side, or bigger than 1 MB, becomes a JPEG at
 * that size. If the browser cannot read the image, the original is returned.
 * Used by both chat screens.
 */
export const MAX_PHOTO_SIDE = 1600;
export const SHRINK_ABOVE_BYTES = 1024 * 1024;
export const SERVER_LIMIT_BYTES = 10 * 1024 * 1024;

export async function shrinkPhoto(file) {
  if (!file || !/^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_PHOTO_SIDE / Math.max(bitmap.width, bitmap.height));
    const isJpeg = /jpe?g/i.test(file.type);
    if (scale === 1 && file.size <= SHRINK_ABOVE_BYTES && isJpeg) { bitmap.close?.(); return file; }
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
    if (!blob || (blob.size >= file.size && isJpeg)) return file;
    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], name, { type: 'image/jpeg', lastModified: Date.now() });
  } catch {
    return file;
  }
}

