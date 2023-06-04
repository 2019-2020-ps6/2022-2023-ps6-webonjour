export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (!file) {
      reject('No file');
    }
    if (!(file instanceof File)) {
      reject('Not a file');
    }
    if (!file.type.match('image.*')) {
      reject('Not an image');
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() as string);
    reader.onerror = (error) => reject(error);
  });
};
