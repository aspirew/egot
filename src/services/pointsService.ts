import { pool } from '../dbconn'
import { punkt } from '../interfaces'

class pointsService{
    async getAllPoints(req, res) {

        try{
            const query = await pool.promise().query("SELECT * FROM `Punkt`")
            const result : Array<punkt> = JSON.parse(JSON.stringify(query[0]))
            res.json(result)
        }
        catch(err) {
            res.json({message : err.sqlMessage})
        }

    }

    async getAllPointsInArea(req, res) {

        const pointID : number = req.params.id

        try{
            const query = await pool.promise().query(`SELECT DISTINCT Punkt.ID, Punkt.Nazwa, Punkt.Pracownik_PTTK, Punkt.Wysokosc_npm
            FROM Odcinek JOIN Punkt ON Punkt.ID IN (Odcinek.PunktPoczatkowy, Odcinek.PunktKoncowy) WHERE Odcinek.Teren = ${pointID} `)
            const result : Array<punkt> = JSON.parse(JSON.stringify(query[0]))
            res.json(result)
        }
        catch(err) {
            res.json({message : err.sqlMessage })
        }

    }

    async getBoundPoints(req, res) {

        const pointID = req.params.id

        try{
            const query = await pool.promise().query(`SELECT Punkt.Nazwa FROM Odcinek 
            JOIN punkt ON Punkt.ID = odcinek.PunktKoncowy WHERE PunktPoczatkowy = ${pointID}`)
            const result : Array<punkt> = JSON.parse(JSON.stringify(query[0]))
            res.json(result)
        }
        catch(err) {
            res.json({message : err.sqlMessage })
        }

    }
    async pointSearch(req, res){
        const name : string = req.body.name

        try {
            const query = await pool.promise().query(`SELECT * FROM Punkt WHERE Nazwa LIKE('%${name}%')`)
            const result : Array<punkt> = JSON.parse(JSON.stringify(query[0]))
            res.json(result)
        }
        catch(err){
            res.json({message : err.sqlMessage })
        }
    }

    async addNewPoint(req, res){
        const name : string = req.body.name
        const npm : number = req.body.npm
        const employeeID : number = req.session.userID

        try {
            const query = await pool.promise().query(`INSERT INTO Punkt VALUES(NULL, '${name}', ${employeeID}, ${npm})`)
            res.json({success : true, message : "New point succesfully add"})
        }
        catch(err) {
            res.json({success : false, message : err.sqlMessage})
        }

    }
    
    async pointEdit(req, res){
        const ID : number = req.params.id
        const point : punkt = req.body.newPointData
        console.log(ID)
        console.log(point)
        try {
            const query = await pool.promise().query(`UPDATE Punkt SET Nazwa = '${point.Nazwa}', Wysokosc_npm = ${point.Wysokosc_npm} WHERE ID=${ID}`)
            res.json({success : true, message : "point succesfully edited"})
        }
        catch(err) {
            res.json({success : false, message : err.sqlMessage})
        }

    }
    async pointDelete(req, res){
        const ID : number = req.params.id
        try {
            const query = await pool.promise().query(`DELETE FROM Punkt WHERE ID=${ID}`)
            res.json({success : true, message : "point succesfully deleted"})
        }
        catch(err) {
            res.json({success : false, message : err.sqlMessage})
        }
    }
}

export default new pointsService