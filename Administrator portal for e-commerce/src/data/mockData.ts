import { StoreData } from '../types';

export const initialMockData: StoreData = {
  store_info: [
    {
      id: 1,
      name: "Coffee R Us",
      description: "The go to store for coffee",
      phone_number: "555-5555"
    }
  ],
  coffee: [
    {
      id: 1,
      description: "Medium Roast, nutty flavor",
      name: "Vanilla Bean",
      origin: "Columbia",
      price: 10.00
    },
    {
      id: 2,
      description: "Dark Roast, Rich flavor",
      name: "House Blend",
      origin: "Vietnam",
      price: 12.00
    },
    {
      id: 3,
      description: "Light Roast, Fruity notes",
      name: "Ethiopian Yirgacheffe",
      origin: "Ethiopia",
      price: 15.00
    },
    {
      id: 4,
      description: "Medium Roast, Chocolate undertones",
      name: "Brazilian Santos",
      origin: "Brazil",
      price: 11.00
    },
    {
      id: 5,
      description: "Dark Roast, Bold and Smooth",
      name: "French Roast",
      origin: "Guatemala",
      price: 13.00
    }
  ]
};
