/**********************************************************************************************************************************************************************************
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de gênero 
 * Data: 24/04/2025
 * Autor: Thayla Amorim Mateus
 * Versões: 1.0
 ***********************************************************************************************************************************************************************************/

const MESSAGE = require('../../modulo/config.js');
const generoDAO = require('../../model/DAO/genero.js');

// Função para inserir um novo gênero
const inserirGenero = async function (genero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') { 
            if (genero.nome == undefined || genero.nome == '' || genero.nome == null || genero.nome.length > 50) {
                return MESSAGE.ERROR_REQUIRE_FIELDS;
            } else {
                let generoExistente = await generoDAO.selectGeneroByNome(genero.nome);
                
                if (generoExistente) {
                    return MESSAGE.ERROR_ITEM_ALREADY_EXISTS;
                } else {
                    let resultGenero = await generoDAO.insertGenero(genero);

                    if (resultGenero) {
                        return MESSAGE.SUCCESS_CREATED_ITEM;
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
                    }
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE;
        } 
    } catch (error) {
        console.error(error);
        return MESSAGE.ERROR_INTERNAL_CONTROLLER;
    }
};

// Função para atualizar um gênero
const atualizarGenero = async function (id, genero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (genero.nome == undefined || genero.nome == '' || genero.nome == null || genero.nome.length > 50) {
                return MESSAGE.ERROR_REQUIRE_FIELDS;
            } else {
                let generoExistente = await generoDAO.selectGeneroById(id);
                
                if (!generoExistente) {
                    return MESSAGE.ERROR_NOT_FOUND;
                }

                if (genero.nome != generoExistente.nome) {
                    let generoComMesmoNome = await generoDAO.selectGeneroByNome(genero.nome);
                    if (generoComMesmoNome) {
                        return MESSAGE.ERROR_ITEM_ALREADY_EXISTS;
                    }
                }

                genero.id = id; // adiciona o id ao objeto para ser usado no update
                let resultGenero = await generoDAO.updateGenero(genero);

                if (resultGenero) {
                    return MESSAGE.SUCCESS_UPDATED_ITEM;
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.error(error);
        return MESSAGE.ERROR_INTERNAL_CONTROLLER;
    }
};

// Função para excluir um gênero
const excluirGenero = async function (id) {
    try {
        let generoExistente = await generoDAO.selectGeneroById(id);
        
        if (!generoExistente) {
            return MESSAGE.ERROR_NOT_FOUND;
        }

        let resultGenero = await generoDAO.deleteGenero(id);

        if (resultGenero) {
            return MESSAGE.SUCCESS_DELETED_ITEM;
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error(error);
        return MESSAGE.ERROR_INTERNAL_CONTROLLER;
    }
};

// Função para listar todos os gêneros
const listarGeneros = async function () {
    try {
        let dadosGenero = {};
        let resultGenero = await generoDAO.selectAllGeneros();

        if (resultGenero != false || typeof(resultGenero) == 'object') {
            if (resultGenero.length > 0) {
                dadosGenero.status = true;
                dadosGenero.status_code = 200;
                dadosGenero.items = resultGenero.length;
                dadosGenero.generos = resultGenero;
                return dadosGenero;
            } else {
                return MESSAGE.ERROR_NOT_FOUND;
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_MODEL;
        }
    } catch (error) {
        console.error(error);
        return MESSAGE.ERROR_INTERNAL_CONTROLLER;
    }
};

// Função para buscar um gênero pelo ID
const buscarGeneroPorId = async function (id) {
    try {
        let genero = await generoDAO.selectGeneroById(id);

        if (genero) {
            let dadosGenero = {
                status: true,
                status_code: 200,
                genero: genero
            };
            return dadosGenero;
        } else {
            return MESSAGE.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error(error);
        return MESSAGE.ERROR_INTERNAL_CONTROLLER;
    }
};

module.exports = {
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGeneros,
    buscarGeneroPorId
};
