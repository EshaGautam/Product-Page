const { json } = require('body-parser')
const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(process.mainModule.filename),'data','product.json')

const products = []

const getProductFromFile =(cb)=>{
   
        fs.readFile(p,(err,fileContent)=>{

            if(err){
               return cb([])
            }
            return cb(JSON.parse(fileContent))
        })
        
}

module.exports=class Product{
    constructor(t){
        this.title = t
    }
    save(){
   
    getProductFromFile((products)=>{
        products.push(this)
        fs.writeFile(p,JSON.stringify(products),err=>{console.log(err)})
    })

    }
    static fetchAll(cb){
      
        fs.readFile(p,(err,fileContent)=>{

            if(err){
                cb([])
            }
            cb(JSON.parse(fileContent))
        })
        
    }
}