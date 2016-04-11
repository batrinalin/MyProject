sap.ui.define([ 'sap/m/MessageBox', 'sap/ui/core/mvc/Controller',
		"sap/ui/model/json/JSONModel" ],

function(MessageBox, Controller, JSONModel) {
	"use strict";

	return Controller.extend("myproject.MyProjectView", {
		/**
		 * Called when a controller is instantiated and its View controls (if
		 * available) are already created. Can be used to modify the View before
		 * it is displayed, to bind event handlers and do other one-time
		 * initialization.
		 * 
		 * @memberOf myproject.MyProjectView
		 * 
		 * Push with the git GUI by Alin-Calin
		 * Elim
		 */
		onInit : function() {

			this.addSectionModel = new JSONModel({

				newEmployee : {
					name : "",
					firstName : "",
					bornDate : "",
					employeeDate : "",
					jobName : "",
					managerId : "",
					brm : ""
				},

				showAddSectionState : false,
				editButtonState : false,
				insertButtonState : false,

			});

			this.modelEmployee = new JSONModel({

				pageTitle : "Titlul pagini web",

				brmArray : [ {
					key : "full",
					text : "Full Time"
				}, {
					key : "part",
					text : "Part Time"
				}, {
					key : "manager",
					text : "Manager"
				} ],

				employeeArray : [ {
					id : "101",
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
					id : "0123",
					name : "Bulc",
					firstName : "Sergiu",
					bornDate : "10-08-1982",
					employeeDate : "22-09-1997",
					managerId : "101",
					brm : "Full-Time",
					jobName : "Lucrator Magazie",
					pay : "2240",
					checked : false
				} ]
			});

			this.getView().setModel(this.modelEmployee) // first model added to
			// View
			this.getView().setModel(this.addSectionModel, "addSection") // second
			// model
			// added
			// to
			// View
		},

		uniqueID : function() {
			return Math.random().toString(10).substr(2, 3);
		},

		// Functia calculatePay calculeaza salarul in functe de Incdrare
		calculatePay : function(brm) {

			var pay;
			var _numberOfWorkDays;
			var _hoursOfWork;
			var _rateOfWork;
			var _bonus;
			var brmArray = this.modelEmployee.getProperty("/brmArray");

			if (brm == brmArray[0].text) {

				_numberOfWorkDays = 22;
				_hoursOfWork = 8;
				_rateOfWork = 25;
				pay = _numberOfWorkDays * _hoursOfWork * _rateOfWork;

			} else if (brm == brmArray[1].text) {

				_numberOfWorkDays = 22;
				_hoursOfWork = 4;
				_rateOfWork = 20;

				pay = _numberOfWorkDays * _hoursOfWork * _rateOfWork;

			} else if (brm = brmArray[2].text) {

				_numberOfWorkDays = 22;
				_hoursOfWork = 8;
				_rateOfWork = 35;
				_bonus = 20;

				var salar = (_numberOfWorkDays * _hoursOfWork * _rateOfWork);

				pay = salar + (salar * _bonus) / 100;
			}
			return pay;

		},

		// Functia resetAddSectionLabels reseteaza campurile din panelul de
		// addSection
		resetAddSectionModel : function() {

			var newEmployee = {
				name : "",
				firstName : "",
				bornDate : "",
				employeeDate : "",
				jobName : "",
				managerId : "",
				brm : ""
			};

			this.addSectionModel.setProperty("/newEmployee", newEmployee);
			this.addSectionModel.refresh();
		},

		cancelButtonAddSection : function() {

			this.showHideAddSection();
			this.resetAddSectionModel();

		},

		showHideAddSection : function() {

			var state = this.addSectionModel
					.getProperty("/showAddSectionState");
			this.addSectionModel.setProperty("/showAddSectionState", !state);
		},

		deleteCheck : function() {

			var employee = this.modelEmployee.getProperty("/employeeArray");
			var newEmployeeArray = [];

			for (var i = 0; i < employee.length; i++) {
				if (!employee[i].checked) {
					newEmployeeArray.push(employee[i]);
				}
			}
			this.modelEmployee.setProperty("/employeeArray", newEmployeeArray);
		},

		confirmDelete : function() {

			var addSectionState = this.addSectionModel
					.getProperty("/showAddSectionState");

			if (addSectionState === true) {
				//Daca este addSection state pe true il inchid is il pun pe false.
				this.showHideAddSection();
				addSectionState = false;
				this.resetAddSectionModel();
			}

			MessageBox.confirm("Confirm the delete?", function(sValue) {
				if (sValue === "OK") {
					this.deleteCheck();
				}
			}.bind(this));

			this.addSectionModel.setProperty("/showAddSectionState",
					addSectionState);
			this.addSectionModel.refresh();
		},

		checkBoxState : function(e) {
			// e este un event bind-uit de proprietatea select
			// ne da informatii despre obiectul selectat.
			// console.log(e.getSource().getBindingContext().getObject());
			this.modelEmployee.refresh(true);

		},

		// Aceasta functie, introduce in sectiunea AddSection employee selectat
		// pt editare
		editEmployeeSection : function(e) {

			var i = 0;
			var employee = this.modelEmployee.getProperty("/employeeArray");
			var addSectionState = this.addSectionModel
					.getProperty("/showAddSectionState");
			var noInsertButton = this.addSectionModel
					.getProperty("/insertButtonState");
			var editButton = this.addSectionModel
					.getProperty("/editButtonState");

			noInsertButton = false;
			editButton = true;
			for (i = 0; i < employee.length; i++) {
				if (employee[i].checked === true) {

					if (addSectionState === false) {
						this.showHideAddSection();
					}

					var newEmployee = {
						id : employee[i].id,
						name : employee[i].name,
						firstName : employee[i].firstName,
						bornDate : employee[i].bornDate,
						employeeDate : employee[i].employeeDate,
						jobName : employee[i].jobName,
						managerId : employee[i].managerId,
						brm : employee[i].brm
					};
				}
			}

			this.addSectionModel.setProperty("/newEmployee", newEmployee);
			this.addSectionModel.setProperty("/insertButtonState",
					noInsertButton);
			this.addSectionModel.setProperty("/editButtonState", editButton);
			this.addSectionModel.refresh();

		},

		editEmployeeAddSectionButton : function() {

			var i = 0;
			var j = 0;
			var id = this.addSectionModel.getProperty("/newEmployee/id")
			var name = this.addSectionModel.getProperty("/newEmployee/name");
			var firstName = this.addSectionModel
					.getProperty("/newEmployee/firstName");
			var bornDate = this.addSectionModel
					.getProperty("/newEmployee/bornDate");
			var employeeDate = this.addSectionModel
					.getProperty("/newEmployee/employeeDate");
			var jobName = this.addSectionModel
					.getProperty("/newEmployee/jobName");
			var managerId = this.addSectionModel
					.getProperty("/newEmployee/managerId");
			var brm = this.addSectionModel.getProperty("/newEmployee/brm");
			var pay = this.calculatePay(brm);

			var employees = this.modelEmployee.getProperty("/employeeArray");

			for (i = 0; i < employees.length; i++) {
				if (employees[i].id == id) {
					j = i;
					employees[i].name = name;
					employees[i].firstName = firstName;
					employees[i].bornDate = bornDate;
					employees[i].employeeDate = employeeDate;
					employees[i].jobName = jobName;
					employees[i].managerId = managerId;
					employees[i].brm = brm;
					employees[i].pay = pay;
				}

			}
			// console.log(employees[i].id);

			// Read: map, filter, reduce
			this.addSectionModel.setProperty("/newEmployee", {});
			this.addSectionModel.refresh();
			this.modelEmployee.refresh();
			this.showHideAddSection();
			console.log('angajatul s-a editat.');
		},

		// todo: fa check sa se disable daca se check-uie 2

		/*checkSelectBox : function(checked) {
			this.modelEmployee.refresh(true);
			if (checked == true)

				return true;
			return false;
		},*/

		checkStatus : function(employeeArray) {

			if (employeeArray == undefined) {
				return false;
			}

			var checkCount = 0;
			var i = 0;

			for (i = 0; i < employeeArray.length; i++) {
				if (employeeArray[i].checked) {
					checkCount++;
				}
			}
			console.log(checkCount);
			if (checkCount > 1) {
				return false;
			}
			return true;
		},

		//este vorba de butonul din afara AddSection
		addEmployeeButton : function() {

			var addSectionState = this.addSectionModel
					.getProperty("/showAddSectionState");
			var noEditButton = this.addSectionModel
					.getProperty("/editButtonState");
			var insertButton = this.addSectionModel
					.getProperty("/insertButtonState");

			this.resetAddSectionModel();

			if (addSectionState === false) {
				this.showHideAddSection();
			}

			noEditButton = false;
			insertButton = true;

			this.addSectionModel.setProperty("/editButtonState", noEditButton);
			this.addSectionModel
					.setProperty("/insertButtonState", insertButton);
			this.addSectionModel.refresh();
		},
		// Functia addNewEmployee adauga in array-ul de employee noul angajat.
		addNewEmployeeAddSectionButton : function(event) {

			var id = this.uniqueID();
			var name = this.addSectionModel.getProperty("/newEmployee/name");
			var firstName = this.addSectionModel
					.getProperty("/newEmployee/firstName");
			var bornDate = this.addSectionModel
					.getProperty("/newEmployee/bornDate");
			var employeeDate = this.addSectionModel
					.getProperty("/newEmployee/employeeDate");
			var jobName = this.addSectionModel
					.getProperty("/newEmployee/jobName");
			var managerId = this.addSectionModel
					.getProperty("/newEmployee/managerId");
			var brm = this.addSectionModel.getProperty("/newEmployee/brm");
			var pay = this.calculatePay(brm);

			var employees = this.modelEmployee.getProperty("/employeeArray");

			employees.push({
				id : id,
				name : name,
				firstName : firstName,
				bornDate : bornDate,
				employeeDate : employeeDate,
				managerId : managerId,
				brm : brm,
				jobName : jobName,
				pay : pay,
				checked : false
			});

			var newEmployee = {
				name : "",
				firstName : "",
				bornDate : "",
				employeeDate : "",
				jobName : "",
				managerId : "",
				brm : ""
			}

			this.addSectionModel.setProperty("/newEmployee", newEmployee);
			this.modelEmployee.setProperty("/employeeArray", employees);
			this.modelEmployee.refresh(true);
			this.addSectionModel.refresh(true);
		}

	});
});
