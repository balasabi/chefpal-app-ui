// makeData.ts

// Define a sample array of person data
const data: Person[] = [
    { id: 1,menu:"Burger", date: 'June 1, 2020, 08:22 AM', address: 'Elm Street, 23 Yogyakarta 2,97 Km', total_amount: '$ 55.5', city: 'New York', country: 'USA',food_Name:"Burger" },
    { id: 2,menu:"BeefBurger", date: 'June 1, 2020, 08:22 AM', address: 'Elm Street, 23 Yogyakarta 2,97 Km', total_amount: '$ 55.5', city: 'Los Angeles', country: 'USA',food_Name:"BeefBurger" },
    { id: 3,menu:"Pizza", date: 'June 1, 2020, 08:22 AM', address: 'Elm Street, 23 Yogyakarta 2,97 Km', total_amount: '$ 55.5', city: 'London', country: 'UK',food_Name:"Pizza" },
    { id: 4,menu:"VegRice", date: 'June 1, 2020, 08:22 AM', address: 'Elm Street, 23 Yogyakarta 2,97 Km', total_amount: '$ 55.5', city: 'New York', country: 'USA' ,food_Name:"VegRice" },
    { id: 5,menu:"Ramen", date: 'June 1, 2020, 08:22 AM', address: 'Elm Street, 23 Yogyakarta 2,97 Km', total_amount: '$ 55.5', city: 'Los Angeles', country: 'USA' ,food_Name:"Ramen" },
    { id: 6,menu:"Burger", date: 'June 1, 2020, 08:22 AM', address: 'Elm Street, 23 Yogyakarta 2,97 Km', total_amount: '$ 55.5', city: 'London', country: 'UK' ,food_Name:"Burger" },
    { id: 7,menu:"BeefBurger", date: 'June 1, 2020, 08:22 AM', address: 'Elm Street, 23 Yogyakarta 2,97 Km', total_amount: '$ 55.5', city: 'New York', country: 'USA' ,food_Name:"BeefBurger" },
    { id: 8,menu:"Pizza", date: 'June 1, 2020, 08:22 AM', address: 'Elm Street, 23 Yogyakarta 2,97 Km', total_amount: '$ 55.5', city: 'Los Angeles', country: 'USA' ,food_Name:"Pizza" },
    { id: 9,menu:"VegRice", date: 'June 1, 2020, 08:22 AM', address: 'Elm Street, 23 Yogyakarta 2,97 Km', total_amount: '$ 55.5', city: 'London', country: 'UK' ,food_Name:"VegRice" },
    { id: 10,menu:"Ramen", date: 'June 1, 2020, 08:22 AM', address: 'Elm Street, 23 Yogyakarta 2,97 Km', total_amount: '$ 55.5', city: 'New York', country: 'USA',food_Name:"Ramen" },
    { id: 11,menu:"Burger", date: 'June 1, 2020, 08:22 AM', address: 'Elm Street, 23 Yogyakarta 2,97 Km', total_amount: '$ 55.5', city: 'Los Angeles', country: 'USA' ,food_Name:"Burger" },
    { id: 12,menu:"BeefBurger", date: 'June 1, 2020, 08:22 AM', address: 'Elm Street, 23 Yogyakarta 2,97 Km', total_amount: '$ 55.5', city: 'London', country: 'UK' ,food_Name:"BeefBurger" },
    // Add more sample data as needed
  ];

  // Define the Person type
  export type Person = {
    id: number;
    date: string;
    address: string;
    total_amount: string;
    city: string;
    country: string;
    menu:string;
    food_Name:string
  };

  // Export the sample data and the Person type
  export { data };
