$(document).ready(function () {
    //alert("test");
    $.ajax({
        url: "UserServlet",
        data: {action: "charge"},
        method: "POST",
        success: function (data) {
            console.log(data);
            listerProf(data);
        },
        error: function () {
            //console.log(error);
        }
    });
    $("#search").click(function () {
        // console.log("helloe");
        var id = $("#inputSpc").val();
        console.log(id);
        $.ajax({
            url: "UserServlet",
            data: {action: "search", id: id},
            method: "POST",
            success: function (data) {
                //console.log(data);
                listerProf(data);
            },
            error: function () {
                console.log(error);
            }
        });
    });
    $("#searchdate").click(function () {
        console.log("helloe");
        var date1 = $("#date1").val();
        var date2 = $("#date2").val();
        console.log(date1 + "  " + date2);
        $.ajax({
            url: "UserServlet",
            data: {action: "searchdate", date1: date1, date2: date2},
            method: "POST",
            success: function (data) {
                console.log("rah dkhel")
                console.log(data);
                searchProf(data);
            },
            error: function () {
                console.log("error");
            }
        });
    });
    $("#submitt").click(function () {
	console.log("yes ",parseInt($("#inputId").val()))
        if ($("#inputId").val() === "") {
            var nom = $("#inputNom").val();
            var prenom = $("#inputPrenom").val();
            var tele = $("#inputTele").val();
            var email = $("#inputEmail").val();
            var date = $("#inputDate").val();
            console.log("ajout "+ nom);
            if ($("#inputNom").val() !== " " && $("#inputPrenom").val() !== " " && $("#inputTele").val() !== " " && $("#inputEmail").val() !== " " && $("#inputDate").val() !== " ")
            {
                $.ajax({
                    url: "UserServlet ",
                    data: {action: "add", nom: nom, prenom: prenom, tele: tele, email: email, date: date},
                    method: "POST",
                    success: function (data) {
	                      console.log(data);
                        listerProf(data);
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
                $("#inputNom").val("");
                $("#inputPrenom").val("");
                $("#inputTele").val("");
                $("#inputEmail").val("");
                $("#inputDate").val("");
                $("#inputId").val("");
            }
        }
    });
    $("#submitupdate").click(function () {
        if (parseInt($("#inputId").val()) !== 0) {
            var nom = $("#inputNom").val();
            var prenom = $("#inputPrenom").val();
            var tele = $("#inputTele").val();
            var email = $("#inputEmail").val();
            var date = $("#inputDate").val();
            var id = $("#inputId").val();
            console.log("update" + id);
            if ($("#inputNom").val() !== " " && $("#inputPrenom").val() !== " " && $("#inputTele").val() !== " " && $("#inputEmail").val() !== " " && $("#inputDate").val() !== " ")
            {
                $.ajax({
                    url: "UserServlet",
                    data: {action: "update", id: id, nom: nom, prenom: prenom, tele: tele, email: email, date: date},
                    method: "POST",
                    success: function (data) {
                        console.log("her hna")
                        console.log(data);
                        listerProf(data);
                    },
                    error: function () {
                        //console.log(data);
                    }
                });
                $("#inputNom").val("");
                $("#inputPrenom").val("");
                $("#inputTele").val("");
                $("#inputEmail").val("");
                $("#inputDate").val("");
                $("#inputId").val("");
            }
        }
    });

    $("#contentprof").on('click', '.badge', function () {
         //alert($(this).attr("indice")+" "+$(this).attr("role"));
        if ($(this).attr("role") === "delete") {
            $.ajax({
                url: "UserServlet",
                data: {action: "delete", id: $(this).attr("indice")},
                method: "POST",
                success: function (data) {
                    console.log(data);
                    listerProf(data);
                },
                error: function () {
                    console.log(error);
                }
            });
        } else {
            $.ajax({
                url: "UserServlet",
                data: {action: "edit", id: $(this).attr("indice")},
                method: "POST",
                success: function (data) {
                    var dateEmp = new Date(data.dateNaissance);

                    $("#inputId").val(data.id);
                    $("#inputNom").val(data.nom);
                    $("#inputPrenom").val(data.prenom);
                    $("#inputTele").val(data.telephone);
                    $("#inputEmail").val(data.email);
                    var now = new Date();

                    var day = ("0" + dateEmp.getDate()).slice(-2);
                    var month = ("0" + (dateEmp.getMonth() + 1)).slice(-2);
                    var dateEmpFormatted = dateEmp.getFullYear() + "-" + (month) + "-" + (day);
                    console.log(dateEmpFormatted);
                    $("#inputDate").val(dateEmpFormatted);
                     console.log(data);
                },
                error: function () {
                    console.log(error);
                }
            });
        }
    });
    function listerProf(data) {
        var ligne = " ";
        var option="";

        data.forEach(function (e) {
            ligne += "<tr><th scope='row'>" + e.id + "</th><td>"
                    + e.nom + "</td><td>" + e.prenom + "</td><td>"
                    + e.telephone + "</td><td>" + e.email + "</td><td>"
                    + e.dateNaissance + "</td><td><button role='delete' indice="
                    + e.id + " class='badge badge-secondary'>Delete</button>&nbsp;&nbsp;&nbsp;<button indice="
                    + e.id + " class='badge badge-warning'>Update</button></td> </tr>";
             option +="<option value="+e.id+" >"+e.prenom+" "+e.nom+"</option>";

        });
        $("#contentprof").html(ligne);
        $("#inputUsers").html(option);

    }
    function searchProf(data) {
        var ligne = " ";

        // console.log(data);

        data.forEach(function (e) {
            ligne += "<tr><th scope='row'>" + e.id + "</th><td>"
                    + e.nom + "</td><td>" + e.prenom + "</td><td>"
                    + e.telephone + "</td><td>" + e.email + "</td><td>"
                    + e.dateNaissance +  "</td> </tr>";

        });
        $("#contentprof").html(ligne);

    }
});

