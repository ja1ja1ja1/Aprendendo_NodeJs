
const conectar = async () => {
    if(global.conexao && global.conexao.state != 'disconected')
        return global.conexao
    const mysql = require('mysql2/promise')
    const con = mysql.createConnection("mysql://root:123456789@localhost:3306/estudonode")
    console.log('Conexão realizada');
    global.conexao = con 
    return con
}

//select
const todosEstudos = async () => {
    const con = await conectar()
    const [linhas] = await con.query('SELECT * FROM estudo')
    return await linhas
}

const insereEstudo = async (estudo) => {
    const con = await conectar()
    const sql = 'INSERT INTO estudo (idestudo,curso,aulas,canal) values (3,?,?,?)'
    const valores = [estudo.curso,estudo.aulas,estudo.canal]
    await con.query(sql,valores)
}

const attEstudo = async (id,estudo) => {
    const con = await conectar()
    const sql = 'UPDATE estudo SET curso = ?, aulas = ?, canal = ? where idestudo = ?'
    const valores = [estudo.curso,estudo.aulas,estudo.canal,id]
    await con.query(sql,valores)
}

const deletEstudo = async (estudoId) => {
    const con = await conectar()
    const sql = 'DELETE from estudo WHERE idestudo = ?'
    await con.query(sql,estudoId)
}
module.exports = {todosEstudos,insereEstudo,attEstudo,deletEstudo}