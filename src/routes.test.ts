import { keys } from 'ts-transformer-keys';
import { teren } from "./interfaces"
import app from "./app"
import { mockupArea } from './mockupData'
import { poolObject, pool, testPool } from './dbconn'
import pointsService from './services/pointsService';


const request = require('supertest')

poolObject.setTesting()


const del = async (name: String) => {
  try{
    const result = await pool.promise().query('DELETE FROM Punkt WHERE nazwa = ?', name);
    //console.log(result)
  }
    catch(err){

    }
}

const delSeg = async (name: String) => {
  try{
    const result = await pool.promise().query('DELETE FROM Odcinek WHERE nazwa = ?', name);
    console.log(result)
  }
    catch(err){
      //console.log(err)
    }
}

const add = async (id: Number, name: String, Pracownik_PTTK: Number, npm: Number) => {
    try{
      const result = await pool.promise().query('INSERT INTO Punkt VALUES ?, ?, ?, ?', [id, name, Pracownik_PTTK, npm]);
      //console.log(result)
    }
    catch(err){
    }
}

const reverseChange = async (id: Number, nazwa: String, punktacja1: Number, punktacja2: Number) => {
  try{
    const result = await pool.promise().query('UPDATE odcinek SET Nazwa = ?, Punktacja = ?, PunktacjaOdKonca = ? WHERE ID = ?', [nazwa, punktacja1, punktacja2, id]);
    //console.log(result)
  }
  catch(err){

  }
}

  const getSegmentFromDB = async (id: Number) => {
    try{
      const result = await pool.promise().query('SELECT Punktacja FROM Odcinek WHERE ID = ?', id);
      return result;
    }
    catch(err){
    }
}

const addSeg = async (id: Number, name: String, pp : Number, pk: Number, ter: Number, dl: Number, punkt : Number, punkt2: Number) => {
  try{
    const result = await pool.promise().query('INSERT INTO Odcinek VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id, name, pp, pk, ter, dl, punkt, punkt2]);
    console.log(result)
  }
  catch(err){
    console.log('Add Segment ERROR')
    console.log(err)
  }
}


describe('Post Endpoints', () => {
  it('Get all areas api should return array of areas', async () => {
    const res = await request(app)
      .get('/api/areas')

      var foo : Array<teren> = JSON.parse(res.text)

    expect(foo.length).toEqual(3)
    expect(foo[0]).toHaveProperty(['ID'])
    expect(foo[0]).toHaveProperty(['Nazwa'])
    expect(foo[0]).toHaveProperty(['Pasmo_gorskie'])
  })

  it('Posting new point should add point to db', async () => {
  const name = "Schronisko pod wyrwigroszem"
  const npm = 420
  

    const res = await request(app)
      .post('/api/point').send({
        name: name,
        npm: npm
      })
      
      await del(name)
      
      expect(res.body.success).toEqual(true)
      expect(res.body.message).toEqual("New point succesfully add")

  })

  it('Posting new point should fail if key is duplicated', async () => {
    const name = "Cerekwica"
    const npm = 420
  
      const res = await request(app)
        .post('/api/point').send({
          name: name,
          npm: npm
        })
        
        expect(res.body.success).toEqual(false)
  
    })

    it('Deleting not bound point should succeed', async () => {
      const id = 47
      const name = "Przełęcz Srebrna"
      const Pracownik_PTTK = 1
      const Wysokosc_npm = 586

      const res = await request(app)
      .delete(`/api/point/${id}`)
      
      await add(id, name, Pracownik_PTTK, Wysokosc_npm)
      
      expect(res.body.success).toEqual(true)
    })

    it('Deleting bound point should fail', async () => {
      const id = 1
    
        const res = await request(app)
          .delete(`/api/point/${id}`)
          
          expect(res.body.success).toEqual(false)
    
      })

      it('Posting new segment should succeed', async () => {
        const name = 'Wyszeborska Trasa Dla Miłości Serca'
        const start = 47
        const end = 46
        const dlugosc = 100
        const teren = 3
        const punktacja = 10
        const punktacja2 = 10

        const res = await request(app)
        .post('/api/segment/add').send({
            newSegment: {
            ID: null,
            Nazwa: name,
            PunktPoczatkowy: start,
            PunktKoncowy: end,
            Teren: teren,
            Dlugosc: dlugosc,
            Punktacja: punktacja,
            PunktacjaOdKonca: punktacja2
          }
        })

        await delSeg(name)

        expect(res.body.success).toEqual(true)
        expect(res.body.message).toEqual("New segment succesfully add")
      })

      it('Posting new segment with existing name should fail', async () => {
        const name = 'AB'
        const start = 47
        const end = 46
        const dlugosc = 100
        const teren = 3
        const punktacja = 10
        const punktacja2 = 10

        const res = await request(app)
        .post('/api/segment/add').send({
            newSegment: {
            ID: null,
            Nazwa: name,
            PunktPoczatkowy: start,
            PunktKoncowy: end,
            Teren: teren,
            Dlugosc: dlugosc,
            Punktacja: punktacja,
            PunktacjaOdKonca: punktacja2
          }
        })

        expect(res.body.success).toEqual(false)
      })

      it('posting new segment with non positive dlugosc should fail', async () =>{
        const name = 'Wyszeborska Trasa Dla Miłości Serca'
        const start = 47
        const end = 46
        const dlugosc = -100
        const teren = 3
        const punktacja = 10
        const punktacja2 = 10

        const res = await request(app)
        .post('/api/segment/add').send({
            newSegment: {
            ID: null,
            Nazwa: name,
            PunktPoczatkowy: start,
            PunktKoncowy: end,
            Teren: teren,
            Dlugosc: dlugosc,
            Punktacja: punktacja,
            PunktacjaOdKonca: punktacja2
          }
        })
      })

      it('deleting segment which is not used in any przejscie should succeed', async () => {
          const id = 38
          const name = 'Moszna - Rozdroże pod Osówką'
          const pp = 24
          const pk = 25
          const teren = 1
          const dl = 200
          const punkt = 1
          const punkt2 = 1
    
          const res = await request(app)
            .delete(`/api/segment/${id}`)

          await addSeg(id, name, pp, pk, teren, dl, punkt, punkt2)
          console.log(res.body)
          expect(res.body.success).toEqual(true)

      })

      it('deleting segment which is used in any przejscie should not succeed', async () => {
        const id = 1
  
        const res = await request(app)
          .delete(`/api/segment/${id}`)

        console.log(res.body)
        expect(res.body.success).toEqual(false)

    })

    it('Editing existing segment should succeed', async () => {
      const id = 24
      const Nazwa = "Kocurkowy odcinek"
      const Punktacja = 6
      const PunktacjaOdKonca = 10

      const nazwaPrzed = "z Cerekwicy"
      const punktacjaPrzed = 3
      const punktacjaOdKoncaPrzed = 3

      const res = await request(app)
        .post(`/api/segment/${id}`)
        .send({
            Nazwa : Nazwa,
            Punktacja : Punktacja,
            PunktacjaOdKonca: PunktacjaOdKonca
        })

        console.log(res.body)

        reverseChange(id, nazwaPrzed, punktacjaPrzed, punktacjaOdKoncaPrzed)
        
        expect(res.body.success).toEqual(true)
  
    })

    it('Editing segments to negative should save them as 0', async () => {
      const id = 24
      const Nazwa = "Kocurkowy odcinek"
      const Punktacja = -6
      const PunktacjaOdKonca = 66

      const nazwaPrzed = "z Cerekwicy"
      const punktacjaPrzed = 3
      const punktacjaOdKoncaPrzed = 3

      const res = await request(app)
        .post(`/api/segment/${id}`)
        .send({
            Nazwa : Nazwa,
            Punktacja : Punktacja,
            PunktacjaOdKonca: PunktacjaOdKonca
        })

        const modifiedData = (await getSegmentFromDB(id))
        const md = JSON.parse(JSON.stringify(modifiedData[0]))[0].Punktacja

        reverseChange(id, nazwaPrzed, punktacjaPrzed, punktacjaOdKoncaPrzed)

        expect(md).toEqual(0)
        expect(res.body.success).toEqual(true)
  
    })

    it('Editing segment with duplicated name should fail', async () => {
      const id = 24
      const Nazwa = "z Glinna"
      const Punktacja = -6
      const PunktacjaOdKonca = 66

      const res = await request(app)
        .post(`/api/segment/${id}`)
        .send({
            Nazwa : Nazwa,
            Punktacja : Punktacja,
            PunktacjaOdKonca: PunktacjaOdKonca
        })

        expect(res.body.success).toEqual(false)
  
    })
} )