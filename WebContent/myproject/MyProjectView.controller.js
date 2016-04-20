sap.ui.define([ 'sap/m/MessageBox', 'sap/ui/core/mvc/Controller',
		"sap/ui/model/json/JSONModel" ],

function(MessageBox, Controller, JSONModel) {
	"use strict";

	function validareString(text, list) {

		  for (var i = 0; i < list.length; i++) {
		   if (text.indexOf(list[i]) > -1) {
		    return false;
		   }
		  }
		  return true;
		 }
	
	function errorMessage(mesaj) {
			  sap.m.MessageBox.error(mesaj);
			 }	 
	
	return Controller.extend("myproject.MyProjectView", {
		/**
		 * Called when a controller is instantiated and its View controls (if
		 * available) are already created. Can be used to modify the View before
		 * it is displayed, to bind event handlers and do other one-time
		 * initialization.
		 * 
		 * Push with the git GUI by Alin-Calin
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
				labelAddSection : "Add employee section"

			});

			this.oModel = new sap.ui.model.json.JSONModel({

				e1 : {
					name : "Caius",
					prenume : "Matei"
				}
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
			// View model added to View
			this.getView().setModel(this.addSectionModel, "addSection") // second
			this.getView().setModel(this.oModel, "oModelData") // third
		},

		uploadJson : function() {

			var data = this.oModel;
			data.loadData("data.json");
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
				// Daca este addSection state pe true il inchid is il pun pe
				// false.
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

		/*
		 * checkSelectBox : function(checked) {
		 * this.modelEmployee.refresh(true); if (checked == true)
		 * 
		 * return true; return false; },
		 */

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

		// este vorba de butonul din afara AddSection
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

			 
		validateString : function(prop, message) {
					
		var myString = ['*', ';', '#', '/', '!', ' ','0','1'
				                ,'2','3','4','5','6','7','8','9' ];
			return function (employee){
					if( ! validareString(employee[prop],myString) ){
						throw new Error(message);						
						}
					}		 
		},
		
		validateDate : function(prop, message){
			
			 var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
			 
			return function (employee){
				
				var dt1 = new Date(employee[prop].replace(pattern, '$3-$2-$1'));
				
				if( dt2 == "Invalid Date"){
					throw new Error(message);
				}
			}
		},
		
		validateDiffrennceDate : function (prop, prop2, message, message2){
			
		     var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
			 var dt = new Date(prop.replace(pattern, '$3-$2-$1'));
			 var dt2 = new Date(prop2.replace(pattern, '$3-$2-$1'));
			 
			return function (){
				
				if
			}
		},
		
		validateEmployee : function ( employee ){
			
			var validName = this.validateString ("name", "Invalid Name!");
			var validFirstName = this.validateString ("firstName", "Invalid Firstname!");
			var validJobName = this.validateString ("jobName", "Invalid job name!");
			var validBornDate = this.validateDate ("bornDate" , "Invalid born date!")
			var validEmployeeDate = this.validateDate ("employeeDate" , "Invalid employeeDate!")
			var validDiffrence = this.validateDiffrennceDate("bornDate", "employeeDate", "Employee date is no bigger!", "Diffrence is not 18!")
			var errors=[];
			
			var validateArray = [validName,validFirstName,validJobName,validBornDate,validEmployeeDate];
			
			for (var i=0; i<validateArray.length; i++){
				try{
					validateArray[i](employee);
				}catch(e){
				      errors.push(e.message);
				      console.trace(e);
				      }
			}
			return errors;
		},
		/*
		validateDate : function (date,date2){
			
			var message = '';
			
			if ( date == "Invalid Date" ) {
				message = "bornDate invalid";
			}
			else if ( date2 == "Invalid Date" ) {
				message = "employeeDate invalid";
			}
			return message;
		},
*/
/*
		// validate name, firstName, jobName.
		validateEmployeeStrings : function(employee) {

			var employeeValidatorMessage = '';
			var myString = ['*', ';', '#', '/', '!', ' ','0','1'
			                ,'2','3','4','5','6','7','8','9' ];
			
			for (var i = 0; i < myString.length; i++) {

				var checkName = employee.name.indexOf(myString[i]);
				var checkFirstName = employee.firstName.indexOf(myString[i]);
				var checkJobName = employee.jobName.indexOf(myString[i]);
				
				if ( checkName != -1 ) {
					employeeValidatorMessage = "";
				}
				else {
					employeeValidatorMessage = false;
				}
			}
			
			return employeeValidatorMessage;
		},
*/		

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
			var newEmployee;
			var employees = this.modelEmployee.getProperty("/employeeArray");
			var employeeValidator = true;
			
			newEmployee = {
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
			};
			
			var errors = this.validateEmployee(newEmployee);
			//MessageBox.error(errors[0]);
			if(errors.length > 0){
			     errorMessage(errors.join("\n"));
			    }
			else {
				
				employees.push(newEmployee);
				
				this.addSectionModel.setProperty("/newEmployee", {});
				this.modelEmployee.setProperty("/employeeArray", employees);
				this.modelEmployee.refresh(true);
				this.addSectionModel.refresh(true);
			}
			 
			/*
			 var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
			 var dt = new Date(bornDate.replace(pattern, '$3-$2-$1'));
			 var dt2 = new Date(employeeDate.replace(pattern, '$3-$2-$1'));
			 var message = this.validateDate(dt,dt2)
			 
			 employeeValidator = this.validateEmployeeStrings(newEmployee);
			 
			 if (employeeValidator != false) {
			 
				 if( message !='' ){
				 
				 MessageBox.error(message);
				 } else {
				 
				 if( dt.getFullYear() > dt2.getFullYear()) {
					 
					 MessageBox.error("Born date is bigger then employee date");
				 }
			 	}

				employees.push(newEmployee);

				
				
			} else {
				console.log("Angajatul nu e valid");
				 MessageBox.error("Invalid employee: name/firstName/jobName");
			}
			*/
			
			
		},
		
		handleUploadPress: function(oEvent) {
			var oFileUploader = this.getView().byId("fileUploader");
			oFileUploader.upload();
		},
		
		handleUploadComplete: function(oEvent) {
			var sResponse = oEvent.getParameter("response");
			if (sResponse) {
				var sMsg = "";
				var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
				if (m[1] == "200") {
					sMsg = "Return Code: " + m[1] + "\n" + m[2], "SUCCESS", "Upload Success";
					oEvent.getSource().setValue("");
				} else {
					sMsg = "Return Code: " + m[1] + "\n" + m[2], "ERROR", "Upload Error";
				}
 
				MessageToast.show(sMsg);
			}
		}

	});
});
