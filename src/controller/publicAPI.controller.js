import axios from "axios";

const getAllData = async (req, res) => {
  try {
    const response = await axios.get("https://api.publicapis.org/entries");

    const data = response.data.entries;

    const { category } = req.query;

    // If limit query parameter is provided
    let { limit } = req.query;
    limit = limit ? parseInt(limit, 10) : undefined;

    let resultData = data;

    // Filter data based on category
    if (category) {
      resultData = resultData.filter(
        (entry) => entry.Category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply result limit
    if (limit) {
      resultData = resultData.slice(0, limit);
    }

    res.json({statusCode: 200, count: resultData.length ,data : resultData});
  } catch (error) {
    res.status(500).json({ statusCode: 500, error: "Failed to fetch data from external API" });
  }
};

const getAllCategories = async (_, res) => {
    try {
        const response = await axios.get("https://api.publicapis.org/categories");
    
        const data = response.data.categories;

        res.json({statusCode: 201, count: data.length, data});
      } catch (error) {
        res.status(500).json({ statusCode: 500, error: "Failed to fetch data from external API" });
      }
}

export { getAllData, getAllCategories };
