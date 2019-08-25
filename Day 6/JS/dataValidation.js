var firstError = "";
var errorCount = 0;
var errorSpan = document.getElementById('error-span');
var errorDiv = document.getElementById('error-div');
var empTable = document.getElementById("dataTable");
var employees = [];
var headCounter = 0;

window.onload = function() {
    var input = document.getElementById("firstName").focus();
    document.getElementById('nameSpouse').readOnly = true;
    document.getElementById('nameSpouse').style.backgroundColor = "#8e8d8d";
}

function validateForm(event) {
    var firstNa = document.getElementById("firstName");
    var middleNa = document.getElementById("middleName");
    var lastNa = document.getElementById("lastName");
    var gender = document.getElementById("gender");
    var status = document.getElementById('maritalStatus');
    var spouseNa = document.getElementById("nameSpouse");
    var details = document.getElementById('otherDetails');

    errorCount = 0;

    if (checkNullEmpty(firstNa)) {
        if (checkNullEmpty(middleNa)) {
            if (checkNullEmpty(lastNa)) {
                errorCount == 0;
            }
        }
    }

    if (status.value == "na") {
        if (errorCount == 0) {
            errorCount = errorCount + 1;
            status.className = "error";
            firstError = status;
            alert("Please enter Marital Status");
        }
    } else if (status.value == "married") {
        checkNullEmpty(spouseNa);
    }

    if (!detailForm.termsAndCondition.checked) {
        if (errorCount == 0) {
            errorCount = errorCount + 1;
            alert("Please indicate that you accept the Terms and Conditions");
        }
    }
    if (errorCount > 0) {
        setError();
        firstError.focus();
    } else {
        removeError();
        saveData(firstNa.value, middleNa.value, lastNa.value, gender.value, status.value, spouseNa.value == 'na' ? null : spouseNa.value, details.value.trim().length == 0 ? null : details.value);
        alert("Thank You");
    }
    document.getElementById("detailForm").reset();
    event.preventDefault();
}

function statusMarried(status) {
    if (status == "married") {
        var nameSpouse = document.getElementById('nameSpouse');
        nameSpouse.readOnly = false;
        nameSpouse.style.backgroundColor = "transparent";
    } else {
        spouseNameReadOnly();
    }
}

function saveData(firstName, middleName, lastName, gender, mStatus, spouse, otherDetails) {

    employees.push({ firstName: firstName, lastName: lastName, gender: gender, otherDetails: otherDetails });

    console.log(employees.length);

    insertTableData(firstName, lastName, gender, otherDetails);

    deleteRow();
}
/*
function deleteTableRows() {
    for (var i = empTable.rows.length - 1; i > 0; i--) {
        empTable.deleteRow(i);
    }
}

function insertData(firstName, lastName, gender, otherDetails) {
    var row = empTable.insertRow(1);
    row.insertCell(0).innerHTML = firstName;
    row.insertCell(1).innerHTML = lastName;
    row.insertCell(2).innerHTML = gender;
    row.insertCell(3).innerHTML = otherDetails;
}

function loadData(employees) {
    createTableHeader();
    employees.forEach(function(employee) {
        var row = empTable.insertRow(1);
        row.insertCell(0).innerHTML = employee.firstName;
        row.insertCell(1).innerHTML = employee.lastName;
        row.insertCell(2).innerHTML = employee.gender;
        row.insertCell(3).innerHTML = employee.otherDetails;
    });
}

function createTableHeader() {
    if (headCounter != 1) {
        // Create heading of table.
        var MyHeader = empTable.createTHead();
        var hrow = MyHeader.insertRow(0);
        var hCell0 = hrow.insertCell(0);
        var hCell1 = hrow.insertCell(1);
        var hCell2 = hrow.insertCell(2);
        var hCell3 = hrow.insertCell(3);
        hCell0.innerHTML = "First Name";
        hCell1.innerHTML = "Last Name";
        hCell2.innerHTML = "Gender";
        hCell3.innerHTML = "Other Details";
        headCounter = 1;
    }
}*/

function insertTableData(firstName, lastName, gender, otherDetails) {

    var tbody = document.getElementById("dataTable").getElementsByTagName('TBODY')[0];

    console.log("Adding: " + firstName);


    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    var cell4 = document.createElement("td");
    cell1.innerHTML = firstName;
    cell2.innerHTML = lastName;
    cell3.innerHTML = gender;
    cell4.innerHTML = otherDetails;
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    tbody.appendChild(row);
}

function validateValue(val) {
    var len = val.value.trim().length;
    if (len != 0 || val != 'na') {
        val.className = '';
        removeError();
    }
}

function removeError() {
    errorSpan.style.display = "none";
    errorDiv.style.display = "none";
}

function setError() {
    errorDiv.style.display = "block";
    errorSpan.style.display = "flex";
}

function checkNullEmpty(inputValue) {
    var val = inputValue.value;
    var len = inputValue.value.trim().length;

    if (len != 0 && regexValidation(val.trim())) {
        return true;
    } else {
        errorSetter(inputValue);
    }
    return false;
}

function errorSetter(inputValue) {
    var fieldName = inputValue.getAttribute('displayName');
    inputValue.className = "error";
    errorCount = errorCount + 1;
    if (errorCount == 1) {
        alert("Please enter a " + fieldName);
        firstError = inputValue;
    }
}

function resetButton() {
    firstError.className = '';
    spouseNameReadOnly();
    removeError();
}

function spouseNameReadOnly() {
    var nameSpouse = document.getElementById('nameSpouse');
    nameSpouse.readOnly = true;
    nameSpouse.value = "";
    nameSpouse.style.backgroundColor = "#8e8d8d";
}

function showHideTable() {
    var btn = document.getElementById("showTableButton");
    var tableId = document.getElementById("dataTable");

    if (btn.innerText == "Show Table") {
        btn.innerText = "Hide Table";
        tableId.style.display = "table";
        if (employees.length == 0) {
            //No records found
            var row = empTable.insertRow(1);
            var cell0 = row.insertCell(0);
            cell0.colSpan = "4";
            cell0.id = "noRecord";
            cell0.innerHTML = "No records found";
        } else {
            deleteRow();
        }
    } else {
        btn.innerText = "Show Table";
        tableId.style.display = "none";
        deleteRow();
    }
}

function deleteRow() {
    var row = document.getElementById("noRecord");
    if (row)
        row.parentNode.removeChild(row);
}

function regexValidation(inputValue) {
    var regex = new RegExp('^[a-zA-Z][a-zA-Z\s]*$');
    console.log("regexValidation: " + regex.test(inputValue) + " :" + inputValue);
    if (regex.test(inputValue))
        return true;
    else {
        errorCount = 1;
        alert("Please enter all alpha");
        return false;
    }
}