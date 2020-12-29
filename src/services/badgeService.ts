import { pool } from '../dbconn'
import { odznaka } from '../interfaces'

class badgeService{
    async getOngoingBadge(req, res) {
        const user = req.session.login
        if(user){
            const query = await pool.promise().query(`SELECT * FROM odznaka JOIN turysta ON odznaka.turysta = turysta.ID 
            WHERE turysta.Login = '${user}' AND odznaka.Zdobyta = false`)
            if(query[0]){
                const result : odznaka = JSON.parse(JSON.stringify(query[0]))
                res.json(result)
            }
            else{
                res.json(null)
            }
        }
        else{
            res.json(null)
        }
    }

    async getCompletedBadges(req, res) {
        const user = req.session.login
        if(user){
            const query = await pool.promise().query(`SELECT * FROM odznaka JOIN turysta ON turysta.ID = Turysta 
            WHERE turysta.Login = '${user}' AND odznaka.Zdobyta = true`) 
            if(query[0]){
                const result : Array<odznaka> = JSON.parse(JSON.stringify(query[0]))
                res.json(result)
            }
            else{
                res.json(null)
            }
        }
        else{
            res.json(null)
        }
    }

    async getBadge(req, res) {
        const type = req.params.type
        const user = req.session.login
        if(user){
            const query = await pool.promise().query(`SELECT * FROM odznaka 
            JOIN turysta ON turysta.ID = odznaka.Turysta
            JOIN stopien ON stopien.ID = odznaka.Stopien
            WHERE turysta.Login = '${user}' AND stopien.Nazwa = '${type}'`) 
            if(query[0]){
                const result : odznaka = JSON.parse(JSON.stringify(query[0]))
                res.json(result)
            }
            else{
                res.json(null)
            }
        }
        else{
            res.json(null)
        }
    }

    async getRankById(req, res) {
        const id = req.params.id
        const query = await pool.promise().query(`SELECT * FROM Stopien WHERE ID = ${id}`)
        if(query[0]){
            const result : odznaka = JSON.parse(JSON.stringify(query[0]))
            res.json(result)
        }
        else{
            res.json(null)
        }
    }
}

export default new badgeService