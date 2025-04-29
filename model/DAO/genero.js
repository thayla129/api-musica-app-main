/*

* Objetivo: Model responsável pelo CRUD de dados de música no Banco de Dados 
* Data: 13/02/25
* Autor: Thayla Amorim Mateus
* Versão: 1.0
*/

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//função para inserir uma nova música no banco de dados
const insertGenero = async function(genero){
try {
        
    let sql = `insert into tbl_genero ( nome,
                                        link,
                                        duracao,
                                        data_lancamento,
                                        foto_capa,
                                        letra
                                        )
                                values (
                                        '${genero.nome}',
                                        '${genero.link}',
                                        '${genero.duracao}',
                                        '${genero.data_lancamento}',
                                        '${genero.foto_capa}',
                                        '${genero.letra}'
                                        )`



    //executa o script SQL no DB e aguarda o retorno do DB
    let result = await prisma.$executeRawUnsafe(sql)


    if(result){
        return true
    }else{
        return false
    }

    } catch (error){
        return false
    }
}

//função para atualizar uma música existente no banco de dados
const updateGenero = async function(genero){
    try {
        
        let sql = `update tbl_genero set nome =              '${genero.nome}',
                                         link =              '${genero.link}',
                                         duracao =           '${genero.duracao}',
                                         data_lancamento =   '${genero.data_lancamento}',
                                         foto_capa =         '${genero.foto_capa}',
                                         letra =             '${genero.letra}'
        where id=${genero.id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }

}

//função para excluir uma música existente no banco de dados
const deleteGenero = async function(id){
    try {
       
        //Script SQL 
        let sql = 'delete from tbl_genero where id='+id
    
    
        //Exeuta o script SQL no BD e aguada o retorno dos daods 
        let result = await prisma.$executeRawUnsafe(sql)
    
        if(result)
            return true
        else 
            return false
    
    
    } catch (error) {
        return false 
    }
}

//função para retornar todas as músicas do banco de dados
const selectAllGenero = async function(){
try {

    //Script SQL 
    let sql = 'select * from tbl_genero order by id desc'


    //Exeuta o script SQL no BD e aguada o retorno dos daods 
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else 
        return false


} catch (error) {
    return false 
}
}

//função para listar uma música pelo ID no banco de dados
const selectByIdGenero = async function(id){
    try {
       
    //Script SQL 
    let sql = 'select * from tbl_genero where id='+id


    //Exeuta o script SQL no BD e aguada o retorno dos daods 
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else 
        return false


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