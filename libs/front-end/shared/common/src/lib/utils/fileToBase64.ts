export const fileToBase64 = (
  file: File,
  orelse: string | undefined = undefined
): Promise<string> => {
  const res = new Promise<string>((resolve, reject) => {
    if (typeof file === 'string') {
      resolve(file);
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

  if (orelse !== undefined) {
    return res.catch(() => orelse);
  }
  return res;
};
