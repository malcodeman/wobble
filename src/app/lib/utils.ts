export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const file2Text = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = (error) => reject(error);
  });
};
