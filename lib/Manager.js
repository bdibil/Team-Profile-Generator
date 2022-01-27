// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name, id, email)
        this.officeNumber = officeNumber
    }
    
    getRole(){
        const m = "Manager"
        return m
    }

    getOfficeNumber(){
        return this.officeNumber
    }
}

module.exports = Manager