import { pool } from '../dbconn'
import { badgeWays, odznaka } from '../interfaces'

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
            const query = await pool.promise().query(`SELECT Odznaka.ID, Punkty_wymagane, Zdobyta FROM Odznaka 
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

    async getAllBadgeWays(req, res){
        const id : number = req.params.id

        try{
            const query = await pool.promise().query(`SELECT YEET.data_przejscia Data,
            SUM(YEET.Punkty_zdobyte) Zdobyte ,
            IF(SUM(YEET.Punkty_zdobyte)>50, 50-SUM(YEET.Punkty_zdobyte), 0) Nadmiar,
            IF(SUM(YEET.Punkty_zdobyte)>50, 50, SUM(YEET.Punkty_zdobyte)) Przyznane
        FROM
            (
                SELECT MIN(Przejscie_Odcinka.Data_przejscia) AS data_przejscia,
                    MIN(IF(Przejscie_Odcinka.Od_konca, Odcinek.PunktacjaOdKonca, Odcinek.Punktacja)) AS Punkty_zdobyte
                FROM Odznaka
                    JOIN Przejscie ON Odznaka.ID=Przejscie.Odznaka
                    JOIN Przejscie_Odcinka ON Przejscie_Odcinka.Przejscie=Przejscie.ID
                    JOIN Odcinek ON Odcinek.ID=Przejscie_Odcinka.Odcinek
                WHERE Przejscie_Odcinka.Zatwierdzone=true
                    AND Odznaka.ID= ${id}
                GROUP BY Przejscie_Odcinka.Odcinek, Przejscie_Odcinka.Od_konca
            ) YEET
        GROUP BY YEET.data_przejscia ORDER BY YEET.data_przejscia;`)

            if(query[0]){
                const result : badgeWays = JSON.parse(JSON.stringify(query[0]))
                res.json(result)
            }
            else{
                res.json(null)
            }
        }
        catch (err){
            res.json({message : err})
        }
    }
}

export default new badgeService