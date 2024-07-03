import { API_CONSTANTS } from "@/config/API.constants"


export const jwtSecret = API_CONSTANTS.API_JWT_SECRET;


export default {
    jwt:{
       secret: jwtSecret,
       expiresIn: '1h',
    }
  }