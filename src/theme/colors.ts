export const getColors = (theme: 'light' | 'dark') => {
  if (theme === 'dark') {
    return {
      text: '#000000',
      background: '#000000',
      inputBackground: '#fffacd', 
      card: '#FAEBD7', 
      secondaryText: '#cccccc',
    };
  } else {
    return {
      text: '#000000',
      background: '#ffffff',
      inputBackground: '#fffacd',
      card: '#B8BC86',
      secondaryText: '#666666',
    };
  }
};
