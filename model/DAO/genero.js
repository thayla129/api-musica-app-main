/*
* Objetivo: Model responsável pelo CRUD de dados de gênero no Banco de Dados 
* Data: 13/02/25 (Atualizado)
* Autor: Thayla Amorim Mateus
* Versão: 1.1
*/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Inserir novo gênero
const insertGenero = async function (genero) {
    try {
        let sql = `
            INSERT INTO tbl_genero (nome, descricao)
            VALUES ('${genero.nome}', '${genero.descricao}')
        `
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

// Atualizar gênero existente
const updateGenero = async function (genero) {
    try {
        let sql = `
            UPDATE tbl_genero 
            SET nome = '${genero.nome}', 
                descricao = '${genero.descricao}' 
            WHERE id_genero = ${genero.id_genero}
        `
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

// Excluir gênero por ID
const deleteGenero = async function (id) {
    try {
        let sql = `DELETE FROM tbl_genero WHERE id_genero = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

// Selecionar todos os gêneros
const selectAllGenero = async function () {
    try {
        let sql = `SELECT * FROM tbl_genero ORDER BY id_genero DESC`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result : false
    } catch (error) {
        return false
    }
}

// Selecionar gênero por ID
const selectByIdGenero = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_genero WHERE id_genero = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}
