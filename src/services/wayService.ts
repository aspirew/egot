import { pool } from '../dbconn'
import { przejscie } from '../interfaces'

class wayService{
    async getAllWays(req, res) {
        const query = await pool.promise().query("SELECT * FROM `przejscie`")
        const result : Array<przejscie> = JSON.parse(JSON.stringify(query[0]))
        res.json(result)
    }
}

export default new wayService