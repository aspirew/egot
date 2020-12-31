import { pool } from '../dbconn'
import { teren } from '../interfaces'

class pointsService{
    async getAllAreas(req, res) {

        try{
            const query = await pool.promise().query("SELECT * FROM `Teren`")
            const result : Array<teren> = JSON.parse(JSON.stringify(query[0]))
            res.json(result)
        }
        catch(err) {
            res.json({message : err.sqlMessage })
        }

    }
}

export default new pointsService