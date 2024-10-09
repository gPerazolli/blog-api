const Teacher = require('../models/teacherModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = process.env.JWT_SECRET;

//logar professor
exports.loginTeacher = async (req, res) =>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ error: 'Por favor, forneça o e-mail e senha'});
    }

    try{
        const teacher = await Teacher.findOne({ email });
        if(!teacher) return res.status(404).json({ error: 'Professor não encontrado'});

        const isMatch = await bcrypt.compare(password, teacher.password);

        if(!isMatch) return res.status(404).json({ error: 'Senha incorreta'});

        const token = jwt.sign({ id: teacher._id}, secret, { expiresIn: '1h'});
        res.status(200).json({ token });

    }catch(err){
        console.error('Erro ao autenticar professor', err);
        res.status(500).json({ error: 'Erro ao autenticar professor' });
    }
};

//criar professor
exports.registerTeacher = async (req, res) =>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ error: 'Por favor, forneça o e-mail e senha'});
    }

    try{
        const existingTeacher = await Teacher.findOne({ email });

        if(existingTeacher){
            return res.status(400).json({ error: 'Professor ja regsitrado com este e-mail' });
        };

        const newTeacher = new Teacher({
            email,
            password
        });

        await newTeacher.save();
        res.status(201).json({ message: 'Professor registrado com sucesso' });

    }catch(err){
        console.error('erro ao registrar professor:', err);
        res.status(500).json({ error: 'Erro ao registrar professor' });
    };
};

//buscar professor
exports.getTeacher = async (req, res) =>{
    try{
        const teachers = await Teacher.find();
        res.status(200).json(teachers);

    }catch(err){
        console.error('Erro ao buscar professores:', err);
        res.status(500).json({ error: 'Erro ao buscar professores' });
    };
};