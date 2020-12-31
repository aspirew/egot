import { pool } from '../dbconn'
import { punkt } from '../interfaces'

class pointsService{
    async getAllPoints(req, res) {

        try{
            const query = await pool.promise().query("SELECT * FROM `punkt`")
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
            JOIN punkt ON punkt.ID = odcinek.PunktKoncowy WHERE punktPoczatkowy = ${pointID}`)
            const result : Array<punkt> = JSON.parse(JSON.stringify(query[0]))
            res.json(result)
        }
        catch(err) {
            res.json({message : err.sqlMessage })
        }

    }
}

export default new pointsService