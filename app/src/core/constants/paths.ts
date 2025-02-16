export const paths = {
    home: '/',
    categories: '/categories', 
    characters: '/categories/characters', 
    locations: '/categories/location',
    episodes: '/categories/episode',
    detail: (category: string, id: string): string => `/categories/${category}/${id}`, 
  };