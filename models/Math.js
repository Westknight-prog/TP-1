const Model = require('./model');
module.exports = 
    class Math extends Model{
        constructor(op, x, y){
            super();
            this.op == op !== undefined ? op : ""; 
            this.x == x !== undefined ? x : ""; 
            this.y == y !== undefined ? y : "";
            
            this.setKey("op");
            this.addValidator("op","string");
            this.addValidator("x","integer");
            this.addValidator("y","integer");

        }
    }