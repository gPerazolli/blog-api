const Post = require('../models/postModel.js'); 

//listar todos os posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);

    }catch(err) {
        res.status(500).json({ error: 'Erro ao buscar posts'});
    }
};

//obter post por ID
exports.getPostById = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({ error: 'Post não encontrado'});
        res.status(200).json(post);

    }catch(err){
        res.status(500).json({ error: 'Erro ao buscar post'});
    }
};

//obter post por palavra-chave
exports.searchPost = async (req, res) => {
    const searchTerm = req.query.q;

    try{
        const posts = await Post.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i'} },
                { content: { $regex: searchTerm, $options: 'i'} }
            ]
        });
        res.status(200).json(posts);

    }catch(err){
        res.status(500).json({ error: 'Erro ao buscar posts', details: err.message});
    }
};

// criar post
exports.createPost = async (req, res) =>{
    const { title, content, author } = req.body;

    try{
        const newPost = new Post({ title, content, author});
        const savedPost =  await newPost.save();
        res.status(201).json(savedPost);

    }catch(err){
        res.status(500).json({ error: 'Erro ao criar post'});
    }
};

// atualizar post 
exports.updatePost = async (req, res) =>{
    const { title, content, author } = req.body;

    try{
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, author},
            { new: true}
        );
        if(!updatedPost) return res.status(404).json({ error: 'Post não encontrado'});
        res.status(200).json(updatedPost);

    }catch(err){
        res.status(500).json({ error: 'Erro ao atualizar post'});
    }
};

//excluir post
exports.deletePost = async (req, res) => {
    try{
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if(!deletedPost) return res.status(404).json({ error: 'Post não encontrado'});
        res.status(200).json({ message: 'Post excluido com sucesso'});

    }catch(err){
        res.status(500).json({ error: 'Erro ao excluir post'});
    }
};
