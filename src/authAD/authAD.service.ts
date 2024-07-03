import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@/users/users.service";
import axios from "axios";
import { UserResponseADDTO } from "./dto/response-userAD.dto";




@Injectable()
export class AuthADService {

    constructor(){}

    async isValiteAD(username: string, password: string){     

        try{
                                
                const linklogin = `http://webservices.sao.flextronics.com/FlexAD/V1?username=${username}&password=${encodeURIComponent(password)}&domain=americas&method=validateuser`;
                //const linkUser = `http://webservices.sao.flextronics.com/FlexAD/V1?filter=(samaccountname=${username})&ptl=samaccountname,givenname,sn,mail,displayName,title,department,manager`;

                //Get Dados Login
                const response = await axios.get(linklogin);
                
                
                // Insert XML and Mount XML login
                const convert = require('xml-js');
                const xml = response.data;

                const result = convert.xml2json(xml, { compact: true, spaces: 4 });

                const dadoslogin = JSON.parse(result);
                

                const { _cdata } = dadoslogin.ResultSet.IsValid;
                

                if (_cdata === 'Y') {  // Retorna a validação do usuário no AD        
           
                    return true ;
                }
                else {
                    return false;
                }
        }catch (e) {
            throw new NotFoundException (`Usuário inválido AD`);
        }
    }
}
