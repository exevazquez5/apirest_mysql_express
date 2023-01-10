const express = require('express')
const cors = require('cors')
const db = require('./config/conexion')
const { urlencoded } = require('express')

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
const PORT = process.env.PORT || 8080

app.use(cors())

//APIREST
app.get('/productos', (req, res) => {

    db.query('SELECT * FROM Frutas', (err , data) => {
        if(err){
            return err
        }
        res.json({frutas: data})
    })

})

app.post('/productos', (req, res) => {
    console.log(Object.values(req.body))
    const values = Object.values(req.body)
    const sql = 'INSERT INTO Frutas (Nombre, Color, Precio) VALUES(?,?,?)'
    db.query(sql, values, (err, result) => {
        if(err){
            console.log(err)
            return err
        }
        res.json({
            mensaje: 'Producto agregado',
            result
        })
    })

})

app.get('/productos/:id', (req, res) => {
    console.log(req.params.id)
    const ID = req.params.id
    const sql = 'SELECT * FROM Frutas WHERE Id = ?'
    db.query(sql, [ID], (err, data) => {
        if(err){
            return err
        }
        res.json({
            mensaje: 'Resultado',
            data
        })
    })

})

app.put('/productos/', (req, res) => {
    console.log(Object.values(req.body))
    const values = Object.values(req.body)
    const sql = 'UPDATE Frutas SET Nombre=?, Color=?, Precio=? WHERE Id=?'
    db.query(sql, values, (err, result) => {
        if(err){
            return err
        }
        res.json({
            mensaje: 'Producto actualizado',
            result
        })
    })
})

app.delete('/productos/:id', (req, res) => {
    console.log(req.params.id)
    const ID = req.params.id
    const sql = 'DELETE FROM Frutas WHERE Id = ?'
    db.query(sql, [ID], (err, result) => {
        if(err){
            return err
        }
        res.json({
            mensaje: 'Producto eliminado con éxito',
            result
        })
    })

})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})