/**
 * Autor: Thayla Amorim Mateus
 * objetivo: model responsável pelo CRUD de dados de artistas no banco de dados
 * data: 24/04/2025
 * versão: 2.0 (com proteção contra SQL Injection)
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Inserir novo artista (protegido contra SQL Injection)
const insertArtista = async function(artista) {
    try {
        let sql = `insert into tbl_artista(nome, biografia) values($1, $2)`
        let result = await prisma.$executeRawUnsafe(sql, [artista.nome, artista.biografia])
        
        return !!result

    } catch (error) {
        console.error('Erro no insertArtista:', error)
        return false
    }
}

// Atualizar artista (protegido contra SQL Injection)
const updateArtista = async function(artista) {
    try {
        let sql = `update tbl_artista set nome = $1, biografia = $2 where id = $3`
        let result = await prisma.$executeRawUnsafe(sql, [
            artista.nome, 
            artista.biografia,
            artista.id
        ])

        return !!result

    } catch (error) {
        console.error('Erro no updateArtista:', error)
        return false
    }
}

// Excluir artista (protegido contra SQL Injection)
const deleteArtista = async function(id) {
    try {
        let sql = `delete from tbl_artista where id = $1`
        let result = await prisma.$executeRawUnsafe(sql, [id])

        return !!result

    } catch (error) {
        console.error('Erro no deleteArtista:', error)
        return false
    }
}

// Retornar todos os artistas
const selectAllArtista = async function() {
    try {
        let sql = `select * from tbl_artista order by id desc`
        let result = await prisma.$queryRawUnsafe(sql)

        return result.length > 0 ? result : false

    } catch (error) {
        console.error('Erro no selectAllArtista:', error)
        return false
    }
}

// Buscar artista por ID (protegido contra SQL Injection)
const selectByIdArtista = async function(id) {
    try {
        let sql = `select * from tbl_artista where id = $1`
        let result = await prisma.$queryRawUnsafe(sql, [id])

        return result.length > 0 ? result : false

    } catch (error) {
        console.error('Erro no selectByIdArtista:', error)
        return false
    }
}

module.exports = {
    insertArtista,
    updateArtista,
    deleteArtista,
    selectAllArtista,
    selectByIdArtista
}