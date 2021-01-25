import { pool } from '../dbconn'
import { odcinek, odcinekHR } from '../interfaces'

class segmentService{
    async addNewSegment(req, res) {

        const {ID, Nazwa, PunktPoczatkowy, PunktKoncowy, Teren, Dlugosc, Punktacja, PunktacjaOdKonca} = req.body.newSegment

        try{
            const query = await pool.promise().query(`INSERT INTO Odcinek VALUES(NULL, '${Nazwa}', ${PunktPoczatkowy}, ${PunktKoncowy},
                ${Teren}, ${Dlugosc}, ${Punktacja}, ${PunktacjaOdKonca})`)
            res.json({success : true, message : "New segment succesfully add"})
        }
        catch(err) {
            res.json({success : false, message : err.sqlMessage})
        }

    }

    async segmentSearch(req, res) {
        const {areaID, points, name, minPoints, maxPoints, minLen, maxLen} = req.body
        

        var pointsarray = points.split(",")
        for (var i =0; i < pointsarray.length; i++){
            pointsarray[i] = `'${pointsarray[i]}'`
        }
        var pointsString = pointsarray.join(",")
        if(pointsString === ""){
            pointsString = "''"
        }
        try {
            var query
            var selectStatement = `O.ID, O.Nazwa, O.PunktPoczatkowy, PP.Nazwa PPNazwa, O.PunktKoncowy, PK.Nazwa PKNazwa, O.Teren, T.Nazwa TerenNazwa, O.Dlugosc, O.Punktacja, O.PunktacjaOdKonca`
            var fromStatement = `Odcinek O JOIN Punkt PP ON O.PunktPoczatkowy = PP.ID JOIN Punkt PK ON O.PunktKoncowy = PK.ID JOIN Teren T ON T.ID = O.Teren`
            var whereStatements = []

            if (points != '' && name != ''){
                whereStatements.push(`(PP.Nazwa IN(${pointsString}) OR PK.Nazwa IN(${pointsString})) AND O.Nazwa LIKE('%${name}%')`)
            }
            else if (points == '' && name != ''){
                whereStatements.push(`O.Nazwa LIKE('%${name}%')`)
            }
            else if (name == '' && points !=''){
                whereStatements.push(`(PP.Nazwa IN(${pointsString}) OR PK.Nazwa IN(${pointsString}))`)
            }

            if(areaID != null){
                whereStatements.push(`O.Teren = ${areaID}`)
            }
            if(minPoints != null){
                whereStatements.push(`(O.Punktacja >= ${minPoints} OR O.PunktacjaOdKonca >= ${minPoints})`)
            }
            if(maxPoints != null){
                whereStatements.push(`(O.Punktacja <= ${maxPoints} OR O.PunktacjaOdKonca <= ${maxPoints})`)
            }
            if(minLen != null){
                whereStatements.push(`O.Dlugosc >= ${minLen}`)
            }
            if(maxLen != null){
                whereStatements.push(`O.Dlugosc <= ${maxLen}`)
            }


            var xd = `SELECT ${selectStatement}
                    FROM ${fromStatement} 
                    ${whereStatements.length!=0?'WHERE': ''} 
                    ${whereStatements.join(' AND ')} 
                    ORDER BY O.Nazwa`
            query = await pool.promise().query(xd)

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