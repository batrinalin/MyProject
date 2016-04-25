sap.ui.define([],function () {
	function EmployeeDAO() {
		
		this.employee = [{
			id : "001",
			name : "Popescu",
			firstName : "Ioan",
			bornDate : "10-08-1990",
			employeeDate : "22-09-2005",
			managerId : "007",
			brm : "Full-Time",
			jobName : "Portar",
			pay : "3450",
			checked : false
		}, {
			id : "007",
			name : "Mauro",
			firstName : "Schifano",
			bornDate : "10-08-1982",
			employeeDate : "22-09-1997",
			managerId : "101",
			brm : "Full-Time",
			jobName : "Sef vanzari",
			pay : "7240",
			checked : false
		}, {
			id : "120",
			name : "Pop",
			firstName : "Andrei",
			bornDate : "10-08-1982",
			employeeDate : "22-09-1997",
			managerId : "101",
			brm : "Full-Time",
			jobName : "Lucrator Magazie",
			pay : "2240",
			checked : false
		}];
		
		this.deletedEmployee = [];
	};
	
	/*
	 * TODO: fa toate functiile de CRUD intre DAO si controller
	 */
	EmployeeDAO.prototype.getAll = function() {
		return this.employee;
	};
	
	EmployeeDAO.prototype.add = function(employee) {
		this.employee.push(employee);
	};
	
	EmployeeDAO.prototype.deleteEmployees = function(employees) {
		this.deletedEmployee = this.deletedEmployee.concat(employees);
		this.employee = this.employee.filter( function(empl) {
			return employees.indexOf(empl) === -1;				
		});
	}
	
	EmployeeDAO.prototype.revertEmployees = function(employees) {
		this.deletedEmployee = this.deletedEmployee.concat(employees);
	}
	
	
	return EmployeeDAO;
	//});
}, true); 
