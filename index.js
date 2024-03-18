// const express = require('express')
// const rotas = require('./rotas/rotas.js')
// const porta = process.env.PORT || 3000

// const app = express()


// app.use('/',rotas)

// app.get('*',() => {//Rota Padrão
//     res.send('Estudo NodeJs')
// })

// app.listen(porta,() => {console.log("servidor rodando")})



// (async () => {
//     const db = require('./db.js')
//     console.log('obter todos os estudos');
//     let estudos = await db.todosEstudos()
//     console.log(estudos);
//     // await db.insereEstudo({curso:"asp",aulas:20,canal:"CFB Cursos"})
//     // console.log("adicionado novo estudo!!");
//     // await db.attEstudo(3,{curso:"asp classico",aulas:25,canal:"CFB"})
//     // console.log("estudo atualizado!!");
//     // estudos = await db.todosEstudos()
//     // console.log(estudos);
//     await db.deletEstudo(3)
//     console.log("estudo deletado!!");
//     estudos = await db.todosEstudos()
//     console.log(estudos);
// })()

// const http = require('http')
// const eventos = require('events')
// const porta = process.env.PORT || 3000
// const retorno = () => {console.log('servidor rodando');}
// const eventoEmissor = new eventos.EventEmitter()

// const final = () => {
//     console.log('Fim do processo');
// }

// eventoEmissor.on('msg', () => {console.log('Estudo de Node')})
// eventoEmissor.on('fim',final)

// const servidor = http.createServer((req,res) => {
//     res.writeHead(200,{"Content-Type":"text/plain"})
//     res.write("Estudo")
//     eventoEmissor.emit('msg')
//     eventoEmissor.emit('fim')
//     res.end()
// })

// servidor.listen(porta,retorno)

/*const http = require('http')
const porta = process.env.PORT || 3000
const formidavel = require('formidable')
const fs = require('fs')
const formidable = require('formidable')

const servidor = http.createServer((req,res) => {
    if(req.url == '/envioDeArquivo'){
        const form = new formidavel.IncomingForm()
        form.parse(req,(erro, campos, arquivos) => {
            const urlantiga = arquivos.filetoupload.path
            const urlnova = 'C:/Users/Adriel/JoaoLucas/Estudo/Aprendendo_NodeJs/img/' + arquivos.filetoupload.name
            fs.rename(urlantiga, urlnova, (erro) => {
                if(erro){
                    throw erro
                } 
                res.write("Arquivo Movido")
                res.end()
            })  
        })
    }else{
        res.writeHead(200,{"Content-Type":"text/html"})
        res.write('<form action="envioDeArquivo" method="post" enctype="multipart/form-data">')
        res.write('<input type="file" name="filetoupload"><br>')
        res.write('<input type="submit" value="Enviar"/>')
        res.write('</form>')
        return res.end()
    }
})

servidor.listen(porta)*/

// const mongodb = require('mongodb').MongoClient
// const url = "mongodb+srv://joaolucasdsouza:Galatas2@cluster0.gvhbdxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(url, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
//   async function run() {
    
//       // Connect the client to the server	(optional starting in v4.7)
//       await mongodb.connect(url,(erro,banco) => {
//         if(erro)throw erro
//         const nomeDoBanco = banco.db("Cursos")
//         const dadosDaTabela = {curso:"Curso de Node",canal:"CFB cursos"}
//         const colecao = "cursos"
//         nomeDoBanco.collection(colecao).insertOne(dadosDaTabela, (erro,result) => {
//             if(erro)throw erro
//             console.log("1 novo curso inserido");
//             banco.close()
//         })});
      
    
//   }
//   run()
// mongodb.connect()

import { fastify } from 'fastify'
// import { databaseMemory } from './databaseMemory.js'
import { databasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new databaseMemory()
const database = new databasePostgres()

//Request body



server.get("/", (req,res) => {
    return "olssss"
})
server.post("/videos", async (req,res) => {

    const { title, description, duration} = req.body

    // console.log(body);

    await database.create({
        title,
        description,
        duration
    })

    return res.status(201).send()
})
server.get("/videos", async (req) => {
    const search = req.query.search
    console.log(search);
    const videos = await database.list(search)

    return videos
})
server.put("/videos/:id", async (req,res) => {
    const { title, description, duration} = req.body
    const videoId = req.params.id

    await database.update(videoId,{
        title,
        description,
        duration
    })

    return res.status(204).send()
})
server.delete("/videos/:id", async (req,res) => {
    const videoId = req.params.id

    await database.delete(videoId)

    return res.status(204).send()
})


server.listen({
    host: "0.0.0.0",
    port:process.env.PORT ?? 3000
})