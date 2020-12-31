import { pool } from '../dbconn'
import { odznaka } from '../interfaces'

class badgeService{
    async getOngoingBadge(req, res) {
        const user = req.session.login
        if(user){
            const query = await pool.promise().query(`SELECT * FROM Odznaka JOIN Turysta ON Odznaka.Turysta = Turysta.ID 
            WHERE Turysta.Login = '${user}' AND Odznaka.Zdobyta = false`)
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
            const query = await pool.promise().query(`SELECT * FROM Odznaka JOIN Turysta ON Turysta.ID = Turysta 
            WHERE Turysta.Login = '${user}' AND Odznaka.Zdobyta = true`) 
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
            const query = await pool.promise().query(`SELECT * FROM Odznaka 
            JOIN Turysta ON Turysta.ID = Odznaka.Turysta
            JOIN Stopien ON Stopien.ID = Odznaka.Stopien
            WHERE Turysta.Login = '${user}' AND Stopien.Nazwa = '${type}'`) 
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