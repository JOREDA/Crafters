export const getPlaceholderImage = (text, bgColor = '788c7c') => {
  // Create a data URL for a colored rectangle with text
  return `https://placehold.co/400x400/${bgColor}/FFFFFF/png?text=${encodeURIComponent(text)}`;
}; 