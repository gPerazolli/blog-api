const  query  = require('express');
const postController = require('../controllers/postController');
const Post = require('../models/postModel');

jest.mock('../models/postModel.js');

describe('Post Controller', () =>{

    //limpa os mocks antes de cada teste
    beforeEach(() =>{
        jest.clearAllMocks();
    });

    //testes para criação de posts
    describe('createPost', () =>{
        it('deve criar um post com sucesso', async () =>{
            const req = {
                body: {
                    title: 'Título do post',
                    content: 'Conteúdo do post',
                    author: 'Autor do post'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const createdPost = {
                _id: '1',
                title: req.body.title,
                content: req.body.content,
                author: req.body.author
            };
          
            Post.mockImplementation(() => { 
                return{
                    save: jest.fn().mockResolvedValue(createdPost)
                }
            });

            await postController.createPost(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdPost);
        });

        it('deve retornar erro ao criar um post', async () =>{
            const req = {
                body : {
                    title: 'Título do post',
                    content: 'Conteúdo do post',
                    author: 'Autor do post'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.mockImplementation(() => {
                return{ 
                    save: jest.fn().mockRejectedValue(new Error('Erro ao criar post'))
                }
            }); 

            await postController.createPost(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar post' });
        });
    });

    beforeEach(() =>{
        jest.clearAllMocks();
    });

    //teste para atualização de posts
    describe('updatePost', () =>{
        it('deve atualizar um post com sucesso', async () =>{
            const req = {
                params: { id: '1' },
                body: {
                    title: 'Novo título',
                    content: 'Novo conteúdo',
                    author: 'Novo autor'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const updatedPost = req.body;

            Post.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedPost);

            await postController.updatePost(req, res);

            expect(Post.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, { new: true });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedPost);
        });

        it('deve retornar erro ao tenatr atulizar um post que não existe', async() =>{
            const req = {
                params: { id: '1' },
                body: {
                    title: 'Novo título',
                    content: 'Novo conteúdo',
                    author: 'Novo autor'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

            await postController.updatePost(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Post não encontrado' });
        });
    });

    beforeEach(() =>{
        jest.clearAllMocks();
    });

    //teste para exclusão de posts
    describe('deletePost', () =>{
        it('deve excluir um post com sucesso', async () =>{
            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const deletedPost = { _id: '1', title: 'Título do post' };

            Post.findByIdAndDelete = jest.fn().mockResolvedValue(deletedPost);

            await postController.deletePost(req, res);

            expect(Post.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Post excluido com sucesso'} );
        });

        it('deve retornar erro ao tentar excluir um post que não existe', async () => {
            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.findByIdAndDelete = jest.fn().mockResolvedValue(null);

            await postController.deletePost(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Post não encontrado'} );
        });
    });

    beforeEach(() =>{
        jest.clearAllMocks();
    });

    //testes para busca de post
    describe('searchPost', () =>{
        it('deve buscar posts com sucesso pela termo fornecido', async () =>{
            const req = { query: { q: 'Titulo' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const posts = [
                { title: 'Título do post 1', content: 'Conteúdo do post 1' },
                { title: 'Título do post 2', content: 'Conteúdo do post 2' }
            ];

            Post.find = jest.fn().mockResolvedValue(posts);

            await postController.searchPost(req, res);

            expect(Post.find).toHaveBeenCalledWith({
                $or: [
                    { title: { $regex: req.query.q, $options: 'i' } },
                    { content: { $regex: req.query.q, $options: 'i' } }
                ]
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(posts);
        });

        it('deve retornar erro ao falhar na busca', async () => {
            const req = { query: { q: 'Título' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.find = jest.fn().mockRejectedValue(new Error('Erro ao buscar posts'));

            await postController.searchPost(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar posts', details: 'Erro ao buscar posts' });
        });
    });
});
