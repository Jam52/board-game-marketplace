export const fakeDropdownData = {
  categories: [
    {
      id: '2bdFPJUvFo',
      name: '18XX',
      url: 'https://www.boardgameatlas.com/category/2bdFPJUvFo/18xx',
      type: 'category',
    },
    {
      id: '85OKv8p5Ow',
      name: '4x',
      url: 'https://www.boardgameatlas.com/category/85OKv8p5Ow/4x',
      type: 'category',
    },
    {
      id: 'hBqZ3Ar4RJ',
      name: 'Abstract',
      url: 'https://www.boardgameatlas.com/category/hBqZ3Ar4RJ/abstract',
      type: 'category',
    },
    {
      id: 'KUBCKBkGxV',
      name: 'Adventure',
      url: 'https://www.boardgameatlas.com/category/KUBCKBkGxV/adventure',
      type: 'category',
    },
    {
      id: '20iDvpbh7A',
      name: 'Age of Reason',
      url: 'https://www.boardgameatlas.com/category/20iDvpbh7A/age-of-reason',
      type: 'category',
    },
  ],
  mechanics: [
    {
      id: '2bdFPJUvFo',
      name: '18XX',
      url: 'https://www.boardgameatlas.com/category/2bdFPJUvFo/18xx',
      type: 'mechanic',
    },
    {
      id: '85OKv8p5Ow',
      name: '4x',
      url: 'https://www.boardgameatlas.com/category/85OKv8p5Ow/4x',
      type: 'machanic',
    },
    {
      id: 'hBqZ3Ar4RJ',
      name: 'Abstract',
      url: 'https://www.boardgameatlas.com/category/hBqZ3Ar4RJ/abstract',
      type: 'machanic',
    },
    {
      id: 'KUBCKBkGxV',
      name: 'Adventure',
      url: 'https://www.boardgameatlas.com/category/KUBCKBkGxV/adventure',
      type: 'machanic',
    },
    {
      id: '20iDvpbh7A',
      name: 'Age of Reason',
      url: 'https://www.boardgameatlas.com/category/20iDvpbh7A/age-of-reason',
      type: 'machanic',
    },
  ],
};

export const fetchDropdownOptions = jest
  .fn()
  .mockImplementation(async (term) => {
    const response = new Promise((resolve) => {
      resolve(fakeDropdownData);
    });
    return await response;
  });
