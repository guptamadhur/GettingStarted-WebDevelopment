var empTable = document.getElementById("dataTable");
var employees = 0;
var headCounter = 0;

function errorMethod() {
    $('#loadingText').css("display", "flex");
    $('#loadingText').html("<h1>Server Error ...</h1>");
}

function loadData(event) {
    $('#loadingText').css("display", "flex");
    $('#requestData').css("display", "none");
    getData();
}

function getData() {
    $.ajax({
        //url: "https://api.myjson.com/bins/8sxr7",
        url: 'https://api.myjson.com/bins/17w0fn',
        type: 'get',
        dataType: 'json',
        async: "true",
        contentType: 'application/json',
        success: function(data) {
            console.log("Response: " + JSON.stringify(data));
            //After Sucess Ajax request
            if (data[0].length != 0) {
                $('#loadingText').css("display", "none");
                $('#dataLoaded').css("display", "block");
                employees = 1;
                setFormValue(data);
            } else {
                errorMethod();
            }
        },
        error: function(data) {
            errorMethod();
        }
    });
}

function setFormValue(data) {
    $('#firstName').val(data[0].firstName);
    $('#lastName').val(data[0].lastName);
    data[0].gender = "female";
    data[0].gender == "male" ? $('#mgender').prop('checked', true) : data[0].gender == "female" ? $('#fgender').prop('checked', true) : $('#ogender').prop('checked', true);
    $('#maritalStatus').val(data[0].status);
    $('#otherDetails').val(data[0].otherDetails);

    setTableData(data)
    event.preventDefault();
}

function setTableData(data) {
    deleteRow();
    data.forEach(function(employee) {
        insertTableData(employee.firstName, employee.lastName, employee.gender, employee.otherDetails);
    });
}

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