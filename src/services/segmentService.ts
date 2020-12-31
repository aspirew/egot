import { pool } from '../dbconn'
import { odcinek } from '../interfaces'

class segmentService{
    async addNewSegment(req, res) {

        console.log(req.body)

        const {ID, Nazwa, PunktPoczatkowy, PunktKoncowy, Teren, Dlugosc, Punktacja, PunktacjaOdKonca} = req.body.newSegment

        try{
            const query = await pool.promise().query(`INSERT INTO odcinek VALUES(NULL, '${Nazwa}', ${PunktPoczatkowy}, ${PunktKoncowy},
                ${Teren}, ${Dlugosc}, ${Punktacja}, ${PunktacjaOdKonca})`)
            console.log(query)
            res.json({success : true, message : "New segment succesfully add"})
        }
        catch(err) {
            res.json({success : true, message : err.sqlMessage})
        }

    }

    async segmentSearch(req, res) {
        const {points, names} = req.body
        //TODO : search for segment

        res.json() //parsed json data here

    }

    async segmentEdit(req, res){
        const segmentID : number = req.params.id
        const newSegment : odcinek = req.body
        console.log(segmentID)
        console.log(newSegment)
        //TODO : edit segment - editable data: nazwa and punkty w tę i z powrotem

        res.json({success : true, message : "Segment succesfully edited"})
    }


    async segmentDelete(req, res){
        const segmentID : number = req.params.id
        console.log(segmentID)

        res.json({success : true, message : "Segment succesfully deleted"})
    }
}

export default new segmentService