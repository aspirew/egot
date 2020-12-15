import { pool } from '../dbconn'

class wayService{
    async getAllUsers(){
        return pool.promise().query("SELECT * FROM `przejscie`")
    }
}

export default new wayService