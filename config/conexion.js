const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'apirest_mysql'
})

conn.connect( (err) => {
    if(err) {
        console.log("Error en la BBDD" , err)
        return err
    }
    console.log('Conexión establecida!')
})

module.exports = conn