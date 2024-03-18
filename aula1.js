// const http = require('http')
// const porta = process.env.PORT 

// const servidor = http.createServer((req,res) => {
//     res.statusCode=200
//     res.writeHead(200,{'Content-Type':'text/plain'})
//     res.end('estudo de node')
// })

// servidor.listen(porta|| 3000, () => {console.log('servidor rodando')})

//USANDO EXPRESS

const express = require('express')
const app =express()
const porta = process.env.PORT 

app.get('/',(req,res) => {
    res.send('Estdo node')
})

app.get('/estudo',(req,res) => {
    res.json({estudo:"node"})
})

app.listen(porta|| 3000, () => {console.log('servidor rodando')})