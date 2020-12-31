import { pool } from '../dbconn'
import { przejscie } from '../interfaces'

class wayService{
    async getAllWays(req, res) {

        try{
            const query = await pool.promise().query("SELECT * FROM `Przejscie`")
            const result : Array<przejscie> = JSON.parse(JSON.stringify(query[0]))
            res.json(result)
        }
        catch {
            res.json({message : "err connecting to db"})
        }

    }
}

export default new wayService