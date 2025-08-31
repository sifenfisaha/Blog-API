export const calculateReadingTime = (
  text: string,
  wordsPerMinute: number = 200
): number => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};
