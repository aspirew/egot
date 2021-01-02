import { pool } from '../dbconn'
import { odcinek, odcinekHR } from '../interfaces'

class segmentService{
    async addNewSegment(req, res) {

        console.log(req.body)

        const {ID, Nazwa, PunktPoczatkowy, PunktKoncowy, Teren, Dlugosc, Punktacja, PunktacjaOdKonca} = req.body.newSegment

        try{
            const query = await pool.promise().query(`INSERT INTO Odcinek VALUES(NULL, '${Nazwa}', ${PunktPoczatkowy}, ${PunktKoncowy},
                ${Teren}, ${Dlugosc}, ${Punktacja}, ${PunktacjaOdKonca})`)
            console.log(query)
            res.json({success : true, message : "New segment succesfully add"})
        }
        catch(err) {
            res.json({success : false, message : err.sqlMessage})
        }

    }

    async segmentSearch(req, res) {
        const {areaID, points, name, minPoints, maxPoints, minLen, maxLen} = req.body
        //test

        var pointsarray = points.split(" ")
        for (var i =0; i < pointsarray.length; i++){
            pointsarray[i] = `'${pointsarray[i]}'`
        }
        var pointsString = pointsarray.join(",")
        if(pointsString === ""){
            pointsString = "''"
        }
        try {
            const query = await pool.promise().query(`SELECT O.ID, O.Nazwa, O.PunktPoczatkowy, PP.Nazwa PPNazwa, O.PunktKoncowy, PK.Nazwa PKNazwa, O.Teren, T.Nazwa TerenNazwa, O.Dlugosc, O.Punktacja, O.PunktacjaOdKonca
            FROM Odcinek O JOIN Punkt PP ON O.PunktPoczatkowy = PP.ID JOIN Punkt PK ON O.PunktKoncowy = PK.ID JOIN Teren T ON T.ID = O.Teren
            WHERE PP.Nazwa IN(${pointsString}) OR PK.Nazwa IN(${pointsString}) OR O.Nazwa LIKE('${name}')
            ORDER BY O.Nazwa;`)
            if(query[0]){
                const result : Array<odcinekHR> = JSON.parse(JSON.stringify(query[0]))
                res.json(result)
            }
            else{
                res.json(null)
            }
        }
        catch(err) {
            res.json({success : false, message : err.sqlMessage})
        }

    }

    async segmentEdit(req, res){
        const segmentID : number = req.params.id
        const newSegment : odcinek = req.body
        console.log(segmentID)
        console.log(newSegment)
        try {
            const query = await pool.promise().query (`UPDATE Odcinek SET Nazwa = '${newSegment.Nazwa}', 
                    Punktacja=${newSegment.Punktacja}, 
                    PunktacjaOdKonca=${newSegment.PunktacjaOdKonca===0?"NULL":newSegment.PunktacjaOdKonca} 
                    WHERE ID=${segmentID};`)
            res.json({success : true, message : "Segment succesfully eddited"})
            
        }
        catch(err){
            res.json({success : false, message : err.sqlMessage})
        }
    }


    async segmentDelete(req, res){
        const segmentID : number = req.params.id
        console.log(segmentID)
        try {
            const query = await pool.promise().query(`DELETE FROM Odcinek WHERE ID = ${segmentID}`)
            res.json({success : true, message : "Segment succesfully deleted"})
        }
        catch(err){
            res.json({success : false, message : err.sqlMessage})
        }
    }
}

export default new segmentService