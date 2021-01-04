import { pool } from '../dbconn'
import { odcinekHR, przejscie, simplePrzejscieOdcinka } from '../interfaces'

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
        const segmentsInRoute : Array<simplePrzejscieOdcinka> = req.body.route
        const routeName : string = req.body.routeName
        const initialPoint : number = req.body.initialPoint

        try {
            const query = await pool.promise().query(`INSERT INTO Przejscie VALUE (NULL, '${routeName}', ${initialPoint},(SELECT ID FROM Odznaka WHERE Turysta = ${userID} AND Odznaka.Zdobyta = false), ${userID}, false, NULL, NULL, NULL);`)
            const idQuery = await pool.promise().query(`SELECT ID FROM Przejscie WHERE TurystaPlanujacy = ${userID} AND Nazwa = '${routeName}';`)
            const routeId : number = JSON.parse(JSON.stringify(query[0])).insertId
            var values = []
            segmentsInRoute.forEach(e => {
                values.push(`(NULL, ${e.Odcinek}, NULL, ${routeId}, false, ${e.Od_konca}, NULL)`)
            })
            var valuesJoined = values.join(',\n')
            const query2 = await pool.promise().query(`INSERT INTO Przejscie_Odcinka VALUES\n${valuesJoined};`);
                        
            res.json({success : true, message : "Route succesfully added"})
            
        }
        catch(err){
            res.json({success : false, message : err.sqlMessage})
        }

    }
}

export default new routesService