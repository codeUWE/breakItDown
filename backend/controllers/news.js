const News = require('../models/news');
const createNews = async (req, res) => {
    try {
        const { name, body, profilePicture } = req.body;
        const createNews = await News.create({
            name,
            body,
            profilePicture
        });
        res.json(createNews);
    } catch (error) {
        console.error(error);
        res.status(500).json('Something went wrong');
    }
};


const getNews = async (req, res) => {
    try {
        const getNews = await News.find({
        
        });
        res.json(getNews);
    } catch (error) {
        console.error(error);
        res.status(500).json('Something went wrong');
    }
};

const updateNews = async (req, res) => {
    try {
        const { params: { id }, body } = req;
        const updatedNews = await News.findByIdAndUpdate(id, body, {
            new: true, // Return the updated document
        });
        res.json(updatedNews); // Respond with the updated news item

    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong!");
    }
};


const deleteNews = async (req, res) => {
    try {
      const deleteNews = await News.findByIdAndDelete(req.params.id);
      if (!deleteNews) {
        return res.status(404);
      }
      res.json({ message: 'News deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getNewsId = async (req, res) => {
    try {
      const newsItem = await News.findById(req.params.id);
      if (!newsItem) {
        return res.status(404).json({ message: 'News not found' });
      }
      res.json(newsItem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  









module.exports = {
    createNews,
    getNews, 
    updateNews, 
    deleteNews, 
    getNewsId
};
