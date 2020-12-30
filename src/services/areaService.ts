import { pool } from '../dbconn'
import { teren } from '../interfaces'

class pointsService{
    async getAllAreas(req, res) {

        try{
            const query = await pool.promise().query("SELECT * FROM `teren`")
            const result : Array<teren> = JSON.parse(JSON.stringify(query[0]))
            res.json(result)
        }
        catch {
            res.json({message : "err connecting to db"})
        }

    }
}

export default new pointsService