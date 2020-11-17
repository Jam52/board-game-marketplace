export const fakeDropdownData = {
  categories: [
    {
      id: '2bdFPJUvFo',
      name: '18XX',
      url: 'https://www.boardgameatlas.com/category/2bdFPJUvFo/18xx',
    },
    {
      id: '85OKv8p5Ow',
      name: '4x',
      url: 'https://www.boardgameatlas.com/category/85OKv8p5Ow/4x',
    },
    {
      id: 'hBqZ3Ar4RJ',
      name: 'Abstract',
      url: 'https://www.boardgameatlas.com/category/hBqZ3Ar4RJ/abstract',
    },
    {
      id: 'KUBCKBkGxV',
      name: 'Adventure',
      url: 'https://www.boardgameatlas.com/category/KUBCKBkGxV/adventure',
    },
    {
      id: '20iDvpbh7A',
      name: 'Age of Reason',
      url: 'https://www.boardgameatlas.com/category/20iDvpbh7A/age-of-reason',
    },
  ],
};

// export const fetchOptions = async (term) => {
//   console.log('in mock');
//   const response = new Promise((resolve) => {
//     resolve(fakeDropdownData);
//   });
//   return await response;
// };

export const fetchOptions = jest.fn().mockImplementation(async (term) => {
  console.log('in mock');
  const response = new Promise((resolve) => {
    resolve(fakeDropdownData);
  });
  return await response;
});
