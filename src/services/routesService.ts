import { pool } from '../dbconn'
import { odcinekHR, przejscie } from '../interfaces'

class routesService{
    async getAllRoutes(req, res) {

        try{
            const query = await pool.promise().query("SELECT * FROM `Przejscie`")
            const result : Array<przejscie> = JSON.parse(JSON.stringify(query[0]))
            res.json(result)
        }
        catch {
            res.json({message : "err connecting to db"})
        }

    }

    async saveRoute(req, res) {
        const userID = req.session.userID
        const segmentsInRoute : Array<odcinekHR> = req.body.route
        console.log(segmentsInRoute)

        try {
            const query = null
            res.json({success : true, message : "Segment succesfully eddited"})
            
        }
        catch(err){
            res.json({success : false, message : err.sqlMessage})
        }

    }
}

export default new routesService