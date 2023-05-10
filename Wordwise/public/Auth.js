import jwt from 'jsonwebtoken'
import axios from 'axios';


function auth(token){
    const user=jwt.decode(token)
    return user
}

const helper={
    auth:auth()
}

export default helper