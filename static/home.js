function newFile() {
    var fname = prompt("what do you want your file to be called?", "");
    if (fname != null) {
      window.location.href = "/write/?type=paper&filename=" + fname + ".cpf&new=true";

    }
}

function newNotebook() {
    var fname = prompt("what do you want your new notebook to be called?", "");
    if (fname != null) {
      httpGet("/createnotebook?name=" + fname);
      window.location.href = "/write/?type=notebook&pagenumber=1&bookname=" + fname;

    }
}
