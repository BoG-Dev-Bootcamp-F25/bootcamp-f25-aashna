import express from 'express';

const app = express();
app.use(express.json());

type Post = {
	id: number;
	title: string;
	content: string;
};

const posts: Record<number, Post> = {};

app.get('/api/posts', async (req, res) => {
	res.status(200).json(Array.from(Object.values(posts)));
});

app.post('/api/posts', async (req, res) => {
	const newPost: Post = req.body;
	console.log(newPost);
	posts[newPost.id] = newPost;
	res.status(200).json(newPost);
});

app.get('/api/posts/:id', async (req, res) => {
	const id = Number(req.params.id);
	const post = posts[id] || null;
	res.status(200).json(post);
});

app.patch('/api/posts/:id', async (req, res) => {
	const id = Number(req.params.id);
	const post = posts[id] || null;

	if (!post) {
		return res.status(404).send();
	}

	const newPost: Post = req.body;
	posts[id] = newPost;

	res.status(200).json(newPost);
});

app.delete('/api/posts/:id', async (req, res) => {
	const id = Number(req.params.id);
	const post = posts[id] || null;

	if (!post) {
		return res.status(404).send();
	}

	delete posts[id];
	res.status(200).send();
});

app.listen(8080, console.error);
