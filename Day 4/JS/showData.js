window.onload = function () {
    var input = document.getElementById("firstName").focus();
}

function validateForm(event) {

    var firstNa = document.getElementById("firstName");
    var lastNa = document.getElementById("lastName");

    if (checkNullEmpty(firstNa)) {
        if (checkNullEmpty(lastNa)) {
            alert(firstNa.value + " " + lastNa.value);
        }
    }
    event.preventDefault();
}

function validateValue(val) {
    var len = val.value.trim().length;
    if (len != 0 | val != 'na') {
        val.className = '';
    }
}

function checkNullEmpty(inputValue) {
    var len = inputValue.value.trim().length;
    var fieldName = inputValue.getAttribute('displayName');
    if (len == 0) {
        alert("Please enter a " + fieldName);
        return false;
    }
    return true;
}
