// Client-side image & PDF processing helpers using HTML5 Canvas and Blob APIs

export interface ResizeOptions {
  width: number;
  height: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/png';
}

/**
 * Resizes an image file to exact target width and height using HTML5 Canvas
 */
export async function resizeImageToExactDimensions(
  file: File,
  targetWidth: number,
  targetHeight: number,
  format: 'image/jpeg' | 'image/png' = 'image/jpeg',
  quality = 0.92
): Promise<{ blob: Blob; dataUrl: string; sizeKB: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context not available'));
          return;
        }

        // Fill white background for passport/signature scans
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // Aspect ratio calculation to avoid distortion while filling
        const hRatio = targetWidth / img.width;
        const vRatio = targetHeight / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (targetWidth - img.width * ratio) / 2;
        const centerShiftY = (targetHeight - img.height * ratio) / 2;

        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShiftX,
          centerShiftY,
          img.width * ratio,
          img.height * ratio
        );

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Blob creation failed'));
              return;
            }
            const dataUrl = canvas.toDataURL(format, quality);
            const sizeKB = Math.round(blob.size / 1024);
            resolve({ blob, dataUrl, sizeKB });
          },
          format,
          quality
        );
      };
      img.onerror = () => reject(new Error('Failed to load source image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Compresses an image or document scan to meet a maximum target file size (e.g. 200 KB)
 */
export async function compressFileToTargetSize(
  file: File,
  targetMaxKB: number = 200,
  targetQuality: number = 0.75
): Promise<{ blob: Blob; dataUrl: string; originalKB: number; compressedKB: number; reductionPercent: number }> {
  const originalKB = Math.round(file.size / 1024);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // If file is large or image dimensions are massive, scale down reasonably
        if (width > 1800 || height > 1800) {
          const scale = 1600 / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context not available'));
          return;
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Adjust quality to ensure it drops under targetMaxKB
        let calculatedQuality = targetQuality;
        if (originalKB > targetMaxKB * 3) {
          calculatedQuality = 0.55;
        } else if (originalKB > targetMaxKB * 1.5) {
          calculatedQuality = 0.68;
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Compression blob failed'));
              return;
            }
            const dataUrl = canvas.toDataURL('image/jpeg', calculatedQuality);
            const compressedKB = Math.round(blob.size / 1024);
            const reductionPercent = Math.max(0, Math.round(((originalKB - compressedKB) / originalKB) * 100));
            resolve({ blob, dataUrl, originalKB, compressedKB, reductionPercent });
          },
          'image/jpeg',
          calculatedQuality
        );
      };
      img.onerror = () => reject(new Error('Image decode error'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('File reader error'));
    reader.readAsDataURL(file);
  });
}

/**
 * Merges two or more document images (e.g. Aadhaar front & back) into a single A4 canvas document
 */
export async function mergeImagesToSingleSheet(
  files: File[],
  title = 'GOVERNMENT IDENTITY PROOF (CONSOLIDATED)'
): Promise<{ blob: Blob; dataUrl: string; sizeKB: number }> {
  return new Promise(async (resolve, reject) => {
    try {
      const loadedImages: HTMLImageElement[] = [];

      for (const file of files) {
        const img = await new Promise<HTMLImageElement>((res, rej) => {
          const r = new FileReader();
          r.onload = (e) => {
            const image = new Image();
            image.onload = () => res(image);
            image.onerror = rej;
            image.src = e.target?.result as string;
          };
          r.onerror = rej;
          r.readAsDataURL(file);
        });
        loadedImages.push(img);
      }

      // Standard A4 canvas at 150 DPI: 1240 x 1754 px
      const canvasWidth = 1240;
      const canvasHeight = 1754;
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not available');

      // White background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Header Banner
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(0, 0, canvasWidth, 80);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, canvasWidth / 2, 50);

      // Timestamp watermark
      ctx.fillStyle = '#64748B';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`Consolidated on ${new Date().toLocaleDateString('en-IN')} | Verified Citizen Copy`, canvasWidth - 40, 115);

      const margin = 50;
      const availableHeight = canvasHeight - 160 - margin;
      const sectionHeight = availableHeight / loadedImages.length;

      loadedImages.forEach((img, index) => {
        const yOffset = 150 + index * sectionHeight;

        // Label above image
        ctx.fillStyle = '#2563EB';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(index === 0 ? 'PART 1: IDENTITY PROOF (FRONT SIDE)' : 'PART 2: IDENTITY PROOF (REVERSE SIDE)', margin, yOffset + 24);

        // Calculate aspect fit inside section
        const maxImgWidth = canvasWidth - margin * 2;
        const maxImgHeight = sectionHeight - 50;
        const ratio = Math.min(maxImgWidth / img.width, maxImgHeight / img.height);
        const drawW = img.width * ratio;
        const drawH = img.height * ratio;
        const drawX = margin + (maxImgWidth - drawW) / 2;
        const drawY = yOffset + 40;

        // Border around document
        ctx.strokeStyle = '#CBD5E1';
        ctx.lineWidth = 2;
        ctx.strokeRect(drawX - 2, drawY - 2, drawW + 4, drawH + 4);

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      });

      canvas.toBlob(
        (blob) => {
          if (!blob) throw new Error('Blob creation failed');
          const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
          const sizeKB = Math.round(blob.size / 1024);
          resolve({ blob, dataUrl, sizeKB });
        },
        'image/jpeg',
        0.88
      );
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Triggers a native browser file download of any Blob or DataURL
 */
export function triggerFileDownload(urlOrBlob: string | Blob, fileName: string) {
  let url = '';
  if (typeof urlOrBlob === 'string') {
    url = urlOrBlob;
  } else {
    url = URL.createObjectURL(urlOrBlob);
  }

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (typeof urlOrBlob !== 'string') {
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
}
