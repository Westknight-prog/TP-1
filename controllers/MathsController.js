/////////////////////////////////////////////////////////////////////
// Author : Samuel Houle
// Étudiant College Lionel-Groulx 
/////////////////////////////////////////////////////////////////////

const Math = require('../models/Math');
const MathModel = require('../models/Math');
const Repository = require('../models/repository');
const fs = require('fs');


const IsPrime = (number)=>{
    for(let i = 2;i < number;i++){
        if(number % i === 0)
            return false;
    }
    return true;
}
const initListPrime = () =>{
    const list = new Array();
    for(let i = 2;i<10000;i++){
        if(IsPrime(i))
            list.push(i);
    }
    return list;
}
const CalcFactorial = (number)=>{
    let result = number;
    for (let i = 1 ;i < number; i++){
         result *=  (number-i); 
    }
    return result;
} 

module.exports =
    class ContactsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            this.repository = new Repository(new MathModel());
        }
        get() {
            let data =  this.HttpContext.path.params;

            if(this.HttpContext.path.queryString == "?"){
                let helpPagePath = path.join(process.pwd(), "wwwroot/helpPages/mathServiceHelp.html");
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html", content);
            }

            if(data.op != null)
            {
                switch (data.op){

                    // Addition (X + Y)
                    case ' ' || '+': 
                    data.op = '+';
                        if( data.x != null && 
                            data.y != null && 
                            !isNaN(parseInt(data.x)) && 
                            !isNaN(parseInt(data.y)) && 
                            Object.keys(data).length === 3) {

                            data.value = "" + (parseInt(data.x) + parseInt(data.y));
                        }
                        else{
                           
                            data.error  = "Valeur invalide";
                        }
                        this.HttpContext.response.JSON(data);
                        break;

                        // Soustraction (X - Y)
                     case '-':
                        if(!isNaN(parseInt(data.x)) && !isNaN(parseInt(data.y)) && Object.keys(data).length === 3){
                            data.value = "" + (parseInt(data.x) - parseInt(data.y));
                        }
                        else{
                            data.error  = "Valeur invalide";
                        }
                        this.HttpContext.response.JSON(data);
                        break;

                        // Multiplaction (X * Y)
                     case '*':
                        if(!isNaN(parseInt(data.x)) && !isNaN(parseInt(data.y))&& Object.keys(data).length === 3){
                            data.value = "" + (parseInt(data.x) * parseInt(data.y));
                        }
                        else{
                            data.error  = "Valeur invalide";
                        }
                        this.HttpContext.response.JSON(data);
                        break;

                        // Division (X / Y)
                     case '/':
                        if(!isNaN(parseInt(data.x)) && !isNaN(data.y) && Object.keys(data).length === 3){
                            data.value = "" + (parseInt(data.x) / parseInt(data.y));
                        }
                        else{
                            data.error  = "Valeur invalide";
                        }
                        this.HttpContext.response.JSON(data);
                        break;


                        // Modulo (X % Y)
                    case '%':
                        if(!isNaN(parseInt(data.x)) && !isNaN(parseInt(data.y)) && Object.keys(data).length === 3){
                            data.value = "" + (parseInt(data.x) % parseInt(data.y));
                        }
                        else{
                            data.error  = "Valeur invalide";
                        }
                        this.HttpContext.response.JSON(data);
                        break;

                        // Factorielle (X!)
                    case '!':
                        if(isNaN(parseInt(data.n)) && data.n > 0 && Object.keys(data).length === 2){
                            data.value = "" + CalcFactorial(parseInt(data.n)) 
                        }
                        else{
                            data.error  = "Valeur invalide";
                        }
                        this.HttpContext.response.JSON(data);
                        break;

                        // Premier (X)
                    case 'p':
                        if(!isNaN(parseInt(data.n)) &&  data.n > 0 && Object.keys(data).length === 2){
                            data.value = (IsPrime(data.n));
                        }
                        else{
                            data.error  = "Valeur invalide";
                        }
                        this.HttpContext.response.JSON(data);
                        break;

                        // N iem Premier
                    case 'np':
                        if(!isNaN(parseInt(data.n)) && data.n > 0 && Object.keys(data).length === 2){
                            let listPrime = initListPrime();
                            data.value = "" + listPrime[data.n-1];
                        }
                        else{
                            data.error  = "Valeur invalide";
                        }
                        this.HttpContext.response.JSON(data);
                        break;

                    default :
                        this.HttpContext.response.JSON(data);
                        break;

                }
            }else{
                data.error = "OP is missing";
                this.HttpContext.response.JSON(data);
            }
                
            
        }
    }