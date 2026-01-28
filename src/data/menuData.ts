export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  customizable?: boolean;
  sizes?: { name: string; priceModifier: number }[];
  toppings?: { name: string; price: number }[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedSize?: string;
  selectedToppings?: string[];
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    address?: string;
  };
  orderType: 'delivery' | 'takeaway';
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  total: number;
  createdAt: Date;
}

export const categories = [
  { id: 'deals', name: 'New Year Deal Boxes', icon: '🔥' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'shawarma', name: 'Shawarma & Rolls', icon: '🌯' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
  { id: 'fried-items', name: 'Fried Items', icon: '🍗' },
  { id: 'fries', name: 'Fries', icon: '🍟' },
];

export const pizzaSizes = [
  { name: 'Small', priceModifier: 0 },
  { name: 'Medium', priceModifier: 840 },
  { name: 'Large', priceModifier: 1680 },
];

export const pizzaToppings = [
  { name: 'Extra Cheese', price: 420 },
  { name: 'Pepperoni', price: 560 },
  { name: 'Mushrooms', price: 420 },
  { name: 'Olives', price: 280 },
  { name: 'Jalapeños', price: 280 },
  { name: 'Onions', price: 280 },
  { name: 'Bell Peppers', price: 420 },
  { name: 'Chicken', price: 700 },
];

export const menuItems: MenuItem[] = [
  // 🔥 New Year Deal Boxes
  {
    id: 'deal-1',
    name: 'Deal 1',
    description: '1 Small Pizza + 3 Wings + 1 Fries + 1 Regular Drink',
    price: 649,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/delicious-seafood-shrimps-mussels-pizza-black-wooden-table-italian-food-top-view_2829-6089.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-2',
    name: 'Deal 2',
    description: '1 Medium Pizza + 1 Zinger Burger + Fries + 500ml Drink',
    price: 1049,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/side-view-pizza-stand-with-tomatoes-olives-bell-peppers_141793-13029.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-3',
    name: 'Deal 3',
    description: '1 Small Pizza + 2 Zinger Burgers + 1 Small Shawarma + 1 Fries + 500ml Drink',
    price: 1149,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/pepperoni-pizza-with-bell-peppers-tomato-olive-cheese_140725-5881.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-4',
    name: 'Deal 4',
    description: '1 Large Pizza + 1 Large Shawarma + 1 Fries + 1 Liter Drink',
    price: 1249,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/pizza-with-sausages-tomato-cheese-olives-pepper_141793-17550.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-5',
    name: 'Deal 5',
    description: '4 Zinger Burgers + 1 Fries + 1 Small Shawarma + 1 Liter Drink',
    price: 1349,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/delicious-pizza-indoors_23-2150873916.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-6',
    name: 'Deal 6',
    description: '3 Small Pizzas + 1 Fries + 1 Small Shawarma + 1 Liter Drink',
    price: 1449,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/side-view-salami-pizza-with-bell-pepper-tomatoes-olives-rolling-pin-with-flour_141793-14249.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-7',
    name: 'Deal 7',
    description: '1 Large Pizza + 1 Small Pizza + 1 Paratha Roll + 1 Fries + 1 Liter Drink',
    price: 1549,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/margharita-pizza-with-full-tomato-sauce-andgreen-basilica-leaves-per-slice_114579-1902.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-8',
    name: 'Deal 8',
    description: '1 XL Pizza + 1 Large Pizza + 2 Paratha Rolls + 1 Fries + 1 Liter Drink',
    price: 2849,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/slices-vegetarian-pizza-with-basil-tomatoes-peppers-woodent-tray_140725-3963.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-9',
    name: 'Deal 9',
    description: '2 Medium Pizzas + 1 Zinger Burger + 1 Fries + 1 Liter Drink',
    price: 1899,
    category: 'deals',
    image: 'https://img.freepik.com/premium-photo/slice-juicy-tasty-pizza-ai-generated_367581-6247.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-10',
    name: 'Deal 10',
    description: '1 Large Pizza + 2 Small Shawarmas + 1 Fries + 500ml Drink',
    price: 1399,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/delicious-pizza-indoors_23-2150873874.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-11',
    name: 'Deal 11',
    description: '1 Supreme Pizza + 1 Zinger Burger + 1 Small Shawarma + 1 Fries',
    price: 1699,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/front-view-delicious-cheese-pizza-consists-olives-pepper-tomatoes-dark-surface_179666-34395.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-12',
    name: 'Deal 12',
    description: '1 Traditional Supreme Pizza + 1 Fries + 1 Regular Drink',
    price: 899,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/traditional-supreme-pizza-black-stone_123827-20345.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-13',
    name: 'Deal 13',
    description: '1 Large Mixed Pizza + 1 Small Shawarma + 500ml Drink',
    price: 1199,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/large-mixed-pizza-with-meat_140725-1274.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-14',
    name: 'Deal 14',
    description: '1 Mix Pizza with Chicken & Veggies + 1 Fries + 1 Regular Drink',
    price: 999,
    category: 'deals',
    image: 'https://img.freepik.com/free-photo/mix-pizza-chicken-tomato-bell-pepper-olives-mushroom-side-view_141793-3167.jpg?w=800&h=600&fit=crop',
  },
  {
    id: 'deal-15',
    name: 'Deal 15',
    description: '1 Seafood Pizza + 1 Small Shawarma + 1 Fries + 500ml Drink',
    price: 1599,
    category: 'deals',
    image: 'https://img.freepik.com/premium-photo/delicious-seafood-shrimps-mussels-pizza-black-wooden-table-italian-food_2829-7880.jpg?w=800&h=600&fit=crop',
  },

  // 🍔 Burgers
  {
    id: 'burger-1',
    name: 'Shami Burger',
    description: 'Traditional shami kebab patty with fresh vegetables and special sauce',
    price: 150,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'burger-2',
    name: 'Anda Shami Burger',
    description: 'Shami burger with egg, fresh lettuce, tomato and signature sauce',
    price: 200,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'burger-3',
    name: 'Chicken Patty Burger',
    description: 'Juicy chicken patty with crispy coating and garden vegetables',
    price: 250,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'burger-4',
    name: 'Zinger Burger',
    description: 'Crispy fried chicken fillet with spicy coating and coleslaw',
    price: 300,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'burger-5',
    name: 'Zinger Cheese Burger',
    description: 'Zinger burger with melted cheese, lettuce and special mayo sauce',
    price: 350,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&h=600&fit=crop&crop=center',
  },

  // 🌯 Shawarma & Rolls
  {
    id: 'shawarma-1',
    name: 'Shawarma Small',
    description: 'Marinated chicken shawarma wrapped in pita with garlic sauce and pickles',
    price: 100,
    category: 'shawarma',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'shawarma-2',
    name: 'Shawarma Large',
    description: 'Generous portion of marinated chicken shawarma with fresh vegetables',
    price: 200,
    category: 'shawarma',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'shawarma-3',
    name: 'Achari Shawarma Small',
    description: 'Spicy achari marinated chicken shawarma with tangy pickle sauce',
    price: 150,
    category: 'shawarma',
    image: 'https://images.unsplash.com/photo-1719282431565-3b30bb7d2658?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2hhd2FybWF8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 'shawarma-4',
    name: 'Achari Shawarma Large',
    description: 'Large portion of spicy achari chicken shawarma with extra vegetables',
    price: 200,
    category: 'shawarma',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'roll-1',
    name: 'Chicken Roll',
    description: 'Chicken filling wrapped in paratha with fresh vegetables and sauce',
    price: 250,
    category: 'shawarma',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'roll-2',
    name: 'Chicken Achari Roll',
    description: 'Spicy achari chicken roll with tangy flavors and fresh veggies',
    price: 300,
    category: 'shawarma',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'roll-3',
    name: 'Chicken Cheese Roll',
    description: 'Chicken roll with melted cheese, vegetables and special sauce',
    price: 350,
    category: 'shawarma',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'roll-4',
    name: 'Fries Wrap Roll',
    description: 'Crispy fries wrapped in paratha with cheese and spicy sauce',
    price: 199,
    category: 'shawarma',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&h=600&fit=crop&crop=center',
  },

  // 🍝 Pasta
  {
    id: 'pasta-1',
    name: 'Red Pasta',
    description: 'Pasta in rich tomato sauce with herbs and parmesan cheese',
    price: 350,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1655279561980-c72226ffe505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmVkJTIwUGFzdGF8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 'pasta-2',
    name: 'Penne Pasta',
    description: 'Penne pasta with creamy sauce and fresh herbs',
    price: 400,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1662197480393-2a82030b7b83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UGVubmUlMjBQYXN0YXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 'pasta-3',
    name: 'Alfredo Pasta',
    description: 'Creamy alfredo pasta with parmesan and garlic butter sauce',
    price: 450,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1561001070-ce11eea271b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fEFsZnJlZG8lMjBQYXN0YXxlbnwwfHwwfHx8MA%3D%3D',
  },

  // 🍗 Fried Items
  {
    id: 'fried-1',
    name: 'Crispy Wings (6 pcs)',
    description: 'Six pieces of crispy fried chicken wings with special seasoning',
    price: 399,
    category: 'fried-items',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'fried-2',
    name: 'Crispy Leg',
    description: 'Juicy chicken leg with crispy coating and special marinade',
    price: 299,
    category: 'fried-items',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'fried-3',
    name: 'Crispy Chest',
    description: 'Tender chicken breast with crispy exterior and juicy interior',
    price: 499,
    category: 'fried-items',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=600&fit=crop&crop=center',
  },

  // 🍟 Fries
  {
    id: 'fries-1',
    name: 'French Fries Small',
    description: 'Golden crispy french fries with sea salt',
    price: 150,
    category: 'fries',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'fries-2',
    name: 'French Fries Large',
    description: 'Generous portion of golden crispy french fries',
    price: 250,
    category: 'fries',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'fries-3',
    name: 'Chicken Fries Small',
    description: 'Crispy chicken fries with special seasoning',
    price: 350,
    category: 'fries',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 'fries-4',
    name: 'Chicken Fries Large',
    description: 'Large portion of crispy chicken fries',
    price: 499,
    category: 'fries',
    image: 'https://images.unsplash.com/photo-1594299414720-16b2842a0fc4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2hpY2tlbiUyMEZyaWVzJTIwTGFyZ2V8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 'fries-5',
    name: 'Mix Salad Fries Small',
    description: 'Fries mixed with fresh salad and special dressing',
    price: 200,
    category: 'fries',
    image: 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fFNhbGFkJTIwRnJpZXMlMjBMYXJnZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 'fries-6',
    name: 'Mix Salad Fries Large',
    description: 'Large portion of fries with fresh mixed salad',
    price: 299,
    category: 'fries',
    image: 'https://images.unsplash.com/photo-1630431341771-1ceb084d6607?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fFNhbGFkJTIwRnJpZXMlMjBMYXJnZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 'fries-7',
    name: 'Loaded Fries Large',
    description: 'Fries loaded with cheese, bacon bits and jalapeños',
    price: 399,
    category: 'fries',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&h=600&fit=crop&crop=center',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    items: [
      {
        ...menuItems[3],
        quantity: 2,
        selectedSize: 'Large',
        selectedToppings: ['Extra Cheese', 'Pepperoni'],
        totalPrice: 10950,
      },
      {
        ...menuItems[10],
        quantity: 1,
        totalPrice: 1120,
      },
    ],
    customer: { name: 'John Smith', phone: '555-0123', address: '123 Main St' },
    orderType: 'delivery',
    status: 'pending',
    total: 12070,
    createdAt: new Date(Date.now() - 5 * 60000),
  },
  {
    id: 'ORD-002',
    items: [
      {
        ...menuItems[0],
        quantity: 1,
        totalPrice: 8400,
      },
    ],
    customer: { name: 'Sarah Johnson', phone: '555-0456' },
    orderType: 'takeaway',
    status: 'preparing',
    total: 29.99,
    createdAt: new Date(Date.now() - 15 * 60000),
  },
  {
    id: 'ORD-003',
    items: [
      {
        ...menuItems[7],
        quantity: 2,
        totalPrice: 17.98,
      },
      {
        ...menuItems[18],
        quantity: 2,
        totalPrice: 3.98,
      },
    ],
    customer: { name: 'Mike Davis', phone: '555-0789', address: '456 Oak Ave' },
    orderType: 'delivery',
    status: 'ready',
    total: 21.96,
    createdAt: new Date(Date.now() - 25 * 60000),
  },
  {
    id: 'ORD-004',
    items: [
      {
        ...menuItems[14],
        quantity: 1,
        totalPrice: 7.99,
      },
    ],
    customer: { name: 'Emily Wilson', phone: '555-0321' },
    orderType: 'takeaway',
    status: 'completed',
    total: 7.99,
    createdAt: new Date(Date.now() - 60 * 60000),
  },
];

export const reportData = {
  today: {
    orders: 47,
    revenue: 1234.56,
    avgOrderValue: 26.27,
  },
  weekly: {
    orders: 312,
    revenue: 8456.78,
    avgOrderValue: 27.11,
    dailyData: [
      { day: 'Mon', orders: 42, revenue: 1120 },
      { day: 'Tue', orders: 38, revenue: 980 },
      { day: 'Wed', orders: 45, revenue: 1250 },
      { day: 'Thu', orders: 52, revenue: 1420 },
      { day: 'Fri', orders: 68, revenue: 1890 },
      { day: 'Sat', orders: 45, revenue: 1200 },
      { day: 'Sun', orders: 22, revenue: 596 },
    ],
  },
  monthly: {
    orders: 1248,
    revenue: 34567.89,
    avgOrderValue: 27.70,
    weeklyData: [
      { week: 'Week 1', orders: 298, revenue: 8200 },
      { week: 'Week 2', orders: 312, revenue: 8600 },
      { week: 'Week 3', orders: 325, revenue: 9100 },
      { week: 'Week 4', orders: 313, revenue: 8667 },
    ],
  },
};
