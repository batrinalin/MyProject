jQuery.sap.require("myproject.EmployeeDAO");

module("EmployeeDAO");

	var EmployeeDAO = myproject.EmployeeDAO;


test ("Get all test!.", function(assert) {
	
	var employeeDao = new EmployeeDAO();
	assert.equal(3,employeeDao.getAll().length);
});

test("it exists", function () {
	
	ok(1);
});

test("test", function () {
	
	ok(1);
});