import { keys } from 'ts-transformer-keys';
import { teren } from "./interfaces"
import app from "./app"
import { mockupArea } from './mockupData'
import { poolObject } from './dbconn'


const request = require('supertest')

poolObject.setTesting()

describe('Post Endpoints', () => {
  it('Get all routes api should return array of routes in res', async () => {
    const res = await request(app)
      .get('/api/areas')

      var foo : Array<teren> = JSON.parse(res.text)

    //   const keysOfProps = keys<teren>();

    //   console.log(a)

    //   keysOfProps.forEach(k => {
          
    //   })

    expect(foo[0]).toHaveProperty(['ID'])
    expect(foo[0]).toHaveProperty(['Nazwa'])
    expect(foo[0]).toHaveProperty(['Pasmo_gorskie'])
  })
})