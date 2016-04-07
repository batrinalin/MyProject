sap.ui.define([
               'sap/m/MessageBox',
               'sap/ui/core/mvc/Controller', 
               "sap/ui/model/json/JSONModel"],
               
function(MessageBox, Controller, JSONModel){
	"use strict";

	
	/*
	var obj = {
		value : 42
	};
	
	function f(a, b, c) {
		return this.value + a + b + c;
	}
	
	var a = f(); //42;
	var b = f.call(obj, 1, 2 ,3) //42
	
	var args = [];
	
	
	var c =  f.apply(obj, args)//42
	
	var f2 = f.bind(obj);
	//diferenta call si apply, la apply pot sa imi constuiesc eu array-ul de parametrii
	//bind pot sa selectez eu care ii this.ul care vreau sa imi apeleze functia
	*/
			
			
	return Controller.extend("myproject.MyProjectView", {
		/**
		 * Called when a controller is instantiated and its View controls (if
		 * available) are already created. Can be used to modify the View before it
		 * is displayed, to bind event handlers and do other one-time
		 * initialization.
		 * 
		 * @memberOf myproject.MyProjectView
		 */
		onInit : function() {
			
			this.addSectionModel = new JSONModel({
				
				newEmployee: {
					name: "",
					firstName:"",
					bornDate: "",
					employeeDate: "",
					jobName: "",
					managerId:"",
					brm:"" 
				},
				
				showAddSectionState : false
				
			});
			
			this.modelEmployee = new JSONModel({

				pageTitle : "Titlul pagini web",

				buttonPagina : {

					nume : "Apasa pe buton."
				},

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
					checked:false
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
					checked:false
				},{
					id : "0123",
					name : "Bulc",
					firstName : "Sergiu",
					bornDate : "10-08-1982",
					employeeDate : "22-09-1997",
					managerId : "101",
					brm : "Full-Time",
					jobName : "Lucrator Magazie",
					pay : "2240",
					checked:true
				} ]
			});
			
			this.getView().setModel(this.modelEmployee) //first model added to View
			this.getView().setModel(this.addSectionModel, "addSection") //second model added to View
		},
		
		uniqueID : function () {
			 
			 return Math.random().toString(10).substr(2, 3);
		},
		
		/*
		 *Functia calculatePay calculeaza salarul in functe de Incdrare
		 * */
		calculatePay : function(brm){
			
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
				 
				 var salar =  (_numberOfWorkDays * _hoursOfWork * _rateOfWork );
				 
				 pay = salar + (salar * _bonus)/100;
			}
			return pay;
			
		},
		
		/*
		 *Functia resetAddSectionLabels reseteaza campurile din panelul de addSection
		 * */
		resetAddSectionLabels: function (){
			
			var newEmployee = { 
				name :"",
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

		showHideAddSection : function (){
			
			var state = this.addSectionModel.getProperty("/showAddSectionState");
			this.addSectionModel.setProperty("/showAddSectionState", !state);
			
		},
		
		
		//Just testing git!
		
		confirmDelete : function () {
			MessageBox.confirm("Confirm the delete?", function(sValue){
				if (sValue === "OK") {
					this.deleteCheck();
				}
			}.bind(this));
		},
		
		checkBoxState : function(e){
			
			
			// e este un event bind-uit de proprietatea select
			//ne da informatii despre obiectul selectat.
			//console.log(e.getSource().getBindingContext().getObject());
			this.modelEmployee.refresh(true);
			
		},
		editEmployeeSection : function (e) {
			
			var employee = this.modelEmployee.getProperty("/employeeArray");
			var incompleteTodos = []  ;
			var contor = 0;
			
			for(var i = 0; i < employee.length; i ++){
				if(employee[i].checked){
					incompleteTodos.push(employee[i]);
					contor++;
				}
			}
			
			console.log(contor);
			
			if(contor > 1){
				alert("Please select only one employee");
			}else if ( contor < 1 ) {
				alert("Please select a employee");
			} else if ( contor == 1 ) {
				
				var newEmployee = { 
					id:incompleteTodos[0].id,
					name :incompleteTodos[0].name,
					firstName : incompleteTodos[0].firstName,
					bornDate : incompleteTodos[0].bornDate,
					employeeDate : incompleteTodos[0].employeeDate,
					jobName : incompleteTodos[0].jobName,
					managerId : incompleteTodos[0].managerId,
					brm : incompleteTodos[0].brm
				};
						
				this.addSectionModel.setProperty("/newEmployee", newEmployee);
				this.addSectionModel.refresh();
			}
			
		},
		//press="deleteCheck"
		
		deleteConfimation:function(){
			//sap.m.MessageBox.confirm("Approve purchase order 12345?");
			sap.ui.commons.MessageBox.confirm("You are not authorized to delete this content.\n Please check your access");
		},
		
		deleteCheck : function(){
			
			var employee = this.modelEmployee.getProperty("/employeeArray");
			var newEmployeeArray = [];
			
			for(var i = 0; i < employee.length; i ++){
				if(!employee[i].checked){
					newEmployeeArray.push(employee[i]);
				}
			}
			
			this.modelEmployee.setProperty("/employeeArray", newEmployeeArray);
		},
		
		editEmployee : function () {

			var i = 0;
			var j = 0;
			
			var id = this.addSectionModel.getProperty("/newEmployee/id")
  			var name = this.addSectionModel.getProperty("/newEmployee/name");
			var firstName = this.addSectionModel.getProperty("/newEmployee/firstName");
			var bornDate = this.addSectionModel.getProperty("/newEmployee/bornDate");
			var employeeDate = this.addSectionModel.getProperty("/newEmployee/employeeDate");
			var jobName = this.addSectionModel.getProperty("/newEmployee/jobName");
			var managerId = this.addSectionModel.getProperty("/newEmployee/managerId");
			var brm = this.addSectionModel.getProperty("/newEmployee/brm");
			var pay = this.calculatePay(brm);
			
			var employees = this.modelEmployee.getProperty("/employeeArray");
			
			for ( i=0; i<employees.length; i++) {
				if( employees[i].id == id){
					j=i;
					employees[i].name=name;
					employees[i].firstName=firstName;
					employees[i].bornDate=bornDate;
					employees[i].employeeDate=employeeDate;
					employees[i].jobName=jobName;
					employees[i].managerId=managerId;
					employees[i].brm=brm;
					employees[i].pay=pay;
				}
				
			}
			//console.log(employees[i].id);
			
			//Read: map, filter, reduce
			this.addSectionModel.setProperty("/newEmployee", {});
			this.addSectionModel.refresh();
			this.modelEmployee.refresh();
			console.log('angajatul s-a editat.');
		},
		
		
		//todo: fa check sa se disable daca se check-uie 2
		checkSelectBox : function (checked)
		{
			this.modelEmployee.refresh(true);
			if (checked == true ) 
				
				return true;
			return false;
		},
		
		checkStatus : function (employeeArray) {
			
			if(employeeArray == undefined ){
				return false;
			}
			
			var checkCount =0;
			var i = 0; 
			
			for ( i=0; i<employeeArray.length; i++){
				if ( employeeArray[i].checked ) {
					checkCount++;
				}
			}
			console.log(checkCount);
			if (checkCount > 1){
				return false;
			}
			return true;
		},
		
		/*
		 *Functia addNewEmployee adauga in array-ul de employee noul angajat.
		 * */
		addNewEmployee : function(event) {
			
			var id = this.uniqueID();
  			var name = this.addSectionModel.getProperty("/newEmployee/name");
			var firstName = this.addSectionModel.getProperty("/newEmployee/firstName");
			var bornDate = this.addSectionModel.getProperty("/newEmployee/bornDate");
			var employeeDate = this.addSectionModel.getProperty("/newEmployee/employeeDate");
			var jobName = this.addSectionModel.getProperty("/newEmployee/jobName");
			var managerId = this.addSectionModel.getProperty("/newEmployee/managerId");
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
				checked:true
			});
			
			
			var newEmployee = { 
				name :"",
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
