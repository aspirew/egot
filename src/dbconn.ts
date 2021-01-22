import mysql2 from 'mysql2'

class dbConn {
  defaultPool = mysql2.createPool({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
  });

 testPool = mysql2.createPool({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    database: process.env.DB_TEST_NAME,
    password: process.env.DB_PASS
  });

  pool = this.defaultPool

  setDefault(){
    pool = this.defaultPool
  }

  setTesting(){
    pool = this.testPool
  }

}

export const poolObject = new dbConn()

export var pool = poolObject.pool