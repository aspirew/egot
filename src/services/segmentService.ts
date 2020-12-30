import { pool } from '../dbconn'

class segmentService{
    async addNewSegment(req, res) {

        console.log(req.body)

        const {ID, Nazwa, PunktPoczatkowy, PunktKoncowy, Teren, Dlugosc, Punktacja, PunktacjaOdKonca} = req.body.newSegment

        try{
            const query = await pool.promise().query(`INSERT INTO odcinek VALUES(NULL, '${Nazwa}', ${PunktPoczatkowy}, ${PunktKoncowy},
                ${Teren}, ${Dlugosc}, ${Punktacja}, ${PunktacjaOdKonca})`)
            console.log(query)
            res.json({success : true, message : "yes"})
        }
        catch(err) {
            res.json({success : true, message : err.sqlMessage})
        }

    }
}

export default new segmentService