toastr.options = {
  closeButton: $("#closeButton").prop("checked"),
  debug: $("#debugInfo").prop("checked"),
  newestOnTop: $("#newestOnTop").prop("checked"),
  progressBar: $("#progressBar").prop("checked"),
  // rtl: $("#rtl").prop("checked"),
  positionClass:
    $("#positionGroup input:radio:checked").val() || "toast-top-right",
  preventDuplicates: $("#preventDuplicates").prop("checked"),
  onclick: null,
};
