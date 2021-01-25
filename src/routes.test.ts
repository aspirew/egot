import { keys } from 'ts-transformer-keys';
import { teren } from "./interfaces"
import app from "./app"
import { mockupArea } from './mockupData'
import { poolObject, pool } from './dbconn'
import pointsService from './services/pointsService';


const request = require('supertest')

poolObject.setTesting()


const del = async (name: String) => {
  try{
    const result = await pool.promise().query('DELETE FROM punkt WHERE nazwa = ?', name);
    console.log(result)
  }
    catch(err){
      console.log(err)
    }
}

const add = async (id: Number, name: String, Pracownik_PTTK: Number, npm: Number) => {
    try{
      const result = await pool.promise().query('INSERT INTO odcinek VALUES ?, ?, ?, ?', [id, name, Pracownik_PTTK, npm]);
      console.log(result)
    }
    catch(err){
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
      .delete(`/api/segment/${id}`)
      
      await add(id, name, Pracownik_PTTK, Wysokosc_npm)
      
      expect(res.body.success).toEqual(true)
    })

    it('Deleting bound point should fail', async () => {
      const id = 1
    
        const res = await request(app)
          .delete(`/api/segment/${id}`)
          
          expect(res.body.success).toEqual(false)
    
      })

    
})