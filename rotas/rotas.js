const express = require('express')
const rotas = express.Router()

let estudoInfo=[
    {'estudo':'node','info':'estudo de node'},
    {'estudo':'asp','info':'estudo de asp'},
    {'estudo':'java','info':'estudo de java'},
    {'estudo':'javascript','info':'estudo de javascript'},
    {'estudo':'react','info':'estudo de react'},
]

rotas.get('/',(req,res) => {
    res.json({"ola":"seja bem-vindo"})
})

rotas.get('/:estudoId',(req,res) => {
    const id = req.params.estudoId
    const info = estudoInfo.find(i=> i.estudo == id)
    if(!info){
        res.status(404).json(
            {erro:"Curso não encontrado", cursoPesquisado:id}
        )
    }else{
        res.status(200).json(info)
    }
})

module.exports = rotas 