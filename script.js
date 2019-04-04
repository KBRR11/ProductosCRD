var selectedRow = null
var q=1, pre,can,sub,newst=0,elnew,to=0,subigv=0,sub,subtotal=0;

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["producto"] = document.getElementById("producto").value;
    formData["precio"] = document.getElementById("precio").value;
    formData["cantidad"] = document.getElementById("cantidad").value;
    
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    pre = document.getElementById("precio").value;
    can = document.getElementById("cantidad").value;
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = q++;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.producto;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.precio;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.cantidad;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = pre*can;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<i class="btn btn-warning fas fa-pen" onClick="onEdit(this)" id="btedit"></i>
                       <i class="btn btn-danger fas fa-trash-alt" onClick="onDelete(this)"></i>`;
result();
                    }

function resetForm() {
    document.getElementById("producto").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
    
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("producto").value = selectedRow.cells[1].innerHTML;
    document.getElementById("precio").value = selectedRow.cells[2].innerHTML;
    document.getElementById("cantidad").value = selectedRow.cells[3].innerHTML;
    
}
function updateRecord(formData) {
    pre = document.getElementById("precio").value;
    can = document.getElementById("cantidad").value;
    if (confirm('Estas seguro de editar ?')) {
    selectedRow.cells[1].innerHTML = formData.producto;
    selectedRow.cells[2].innerHTML = formData.precio;
    selectedRow.cells[3].innerHTML = formData.cantidad;
    selectedRow.cells[4].innerHTML = pre*can;
    
    newst=pre*can;
    elnew=newst-subtotal;
     console.log(newst);
console.log(subtotal+elnew+newst);

document.getElementById("cajast").value=newst+subtotal;
    }
}

function onDelete(td) {
    if (confirm('Estas seguro de eliminar ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("producto").value == "") {
        isValid = false;
        document.getElementById("ProductoValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("ProductoValidationError").classList.contains("hide"))
            document.getElementById("PoductoValidationError").classList.add("hide");
    }
    return isValid;
}
function result(){
    pre = document.getElementById("precio").value;
    can = document.getElementById("cantidad").value;
    sub=pre*can;
    to+=sub;
    igv=0.18*to;
   subigv+=igv;

subtotal+=sub;
document.getElementById("cajast").value = subtotal;
document.getElementById("cajaimp").value=subigv;
    document.getElementById("cajato").value=(to+subigv);
}