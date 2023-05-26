import jieba from 'node-jieba';

export default async function handler(req, res) {
    try {
      const text = req.query.text;
      const words = jieba.cut(text);
  
      res.status(200).json({ words });
    } catch (error) {
      console.error('Error in jieba-api:', error);
      res.status(500).json({ error: error.message });
    }
  }