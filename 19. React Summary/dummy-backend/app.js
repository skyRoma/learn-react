const express = require('express');
const bodyParser = require('body-parser');

const { getStoredPosts, storePosts } = require('./data/posts');
const { MOCK_DATA, genres, countries, years, movies } = require('./data/products');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();
  await new Promise((resolve,) => setTimeout(() => resolve(), 1500));
  res.json({ posts: storedPosts });
});

app.get('/posts/:id', async (req, res) => {
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

app.post('/posts', async (req, res) => {
  const existingPosts = await getStoredPosts();
  const postData = req.body;
  console.log(postData)
  const newPost = {
    ...postData,
    id: Math.random().toString(),
  };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Stored new post.', post: newPost });
});


app.get('/products/search', async (req, res) => {
  const { query = '', category, inStockOnly } = req.query;

  await new Promise(resolve => setTimeout(resolve, 3300));

  const queryLower = query.toLowerCase();
  const inStockBool = inStockOnly === 'true'; // Приходит как строка, преобразуем в bool

  const results = MOCK_DATA.filter(item => {
    if (inStockBool && !item.inStock) {
      return false;
    }

    if (item.category !== category && category !== 'All') {
      return false;
    }

    if (!item.name.toLowerCase().includes(queryLower)) {
      return false;
    }

    return true;
  });

  return res.json({
    data: results,
    count: results.length
  });
});

app.get("/movies/filters", (req, res) => {
  res.json({
    filters: {
      genres,
      countries,
      years,
    },
    updatedAt: new Date().toISOString(),
  });
});

app.get("/movies", (req, res) => {
  const { search = "", genre, year, country, page = 1, size = 10 } = req.query;

  let results = movies.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = !genre || m.genre === genres.find((g) => g.id === genre)?.name;
    const matchesYear = !year || m.year === Number(year);
    const matchesCountry = !country || m.country === countries.find((c) => c.id === country)?.name;

    return matchesSearch && matchesGenre && matchesYear && matchesCountry;
  });

  const totalCount = results.length;

  const paginated = results.slice(
    (page - 1) * size,
    (page - 1) * size + Number(size)
  );

  res.json({
    results: paginated,
    totalCount,
  });
});

app.listen(8080);
