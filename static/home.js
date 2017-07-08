function newFile() {
    var fname = prompt("what do you want your file to be called?", "");
    if (fname != null) {
      window.location.href = "/write/?type=paper&filename=" + fname + ".cpf&new=true";

    }
}
