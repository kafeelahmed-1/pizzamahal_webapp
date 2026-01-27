import connectDB from '../connectDB.js';
import Order from '../../backend/models/Order.js';

const createOrder = async (req, res) => {
  try {
    const { name, phone, address, items, total } = req.body;

    if (!name || !phone || !items || total === undefined) {
      return res.status(400).json({ message: 'Please provide name, phone, items, and total' });
    }

    const order = new Order({
      name,
      phone,
      address,
      items,
      total,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  await connectDB();

  if (req.method === 'GET') {
    await getOrders(req, res);
  } else if (req.method === 'POST') {
    await createOrder(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}