//Requires:

const express = require("express");
const router = express.Router();


const AuthController = require("../controllers/auth");
const authLoginValidator = require("../validators/auth/login");
const authCadastroValidator = require("../validators/auth/cadastro");
const psicologoController = require("../controllers/psicologos");
const atendimentosController = require("../controllers/atendimentos");
const pacientesController = require('../controllers/pacienteController');
const atendimentoValidator = require('../validators/atendimentos/agendar');
const updateValidate = require("../validators/pacientes/update")

const createValidate = require("../validators/pacientes/create");
const dashboardController = require('../controllers/dashboardController');



//Routes - Dashboar:

router.get('/dashboard/psicologos', dashboardController.totalPsicologos);
router.get('/dashboard/atendimentos', dashboardController.totalAtendimentos);
router.get('/dashboard/pacientes', dashboardController.totalPacientes);
router.get('/dashboard/media', dashboardController.mediaAtendimentos);

//Login Route:

router.post("/login", authLoginValidator, AuthController.login);

//CRUD - Pacientes OK

router.get('/pacientes', pacientesController.listarPaciente);
router.get('/pacientes/:id', pacientesController.exibirPaciente)
router.post('/pacientes',createValidate, pacientesController.cadastrarPaciente);
router.delete('/pacientes/:id', pacientesController.deletarPaciente);
router.put('/pacientes/:id',updateValidate, pacientesController.atualizarPaciente);

//CRUD - Atendimentos

router.get('/atendimentos', atendimentosController.listar);
router.get('/atendimentos/:id', atendimentosController.exibir);
router.post('/atendimentos', atendimentoValidator, atendimentosController.agendar);

//CRUD - Psicólogos: OK

router.get("/psicologos", psicologoController.index);
router.get("/psicologos/:id", psicologoController.exibir);
router.post("/psicologos/", authCadastroValidator, psicologoController.cadastrar);
router.put("/psicologos/:id", authCadastroValidator, psicologoController.atualizar);
router.delete("/psicologos/:id", psicologoController.deletar);


module.exports = router;

