$(document).ready(function() {
	$.ajax({
		url: "SmartPhoneServlet",
		data: { action: "load" },
		method: "POST",
		success: function(data) {
			console.log(data)
			listerSpc(data);
		},
		error: function(data) {
			console.log(data);
		}
	});
	$("#submitspc").click(function() {
		//alert("kamal");
		if (parseInt($("#id").val()) === 0) {
			var user = $("#inputUsers").val();
			var imei = $("#imei").val();
			if (user !== "" && imei !== " ") {
				console.log(user + " " + imei)
				$.ajax({
					url: "SmartPhoneServlet",
					data: { action: "add", user: user, imei: imei },
					method: "POST",
					success: function(data) {
						listerSpc(data);
					},
					error: function(data) {
						console.log("error " + data);
					}
				});
				$("#inputUsers").val("");
				$("#imei").val("");
			}
		}
	});
	$("#submitspcupdate").click(function() {
		if (parseInt($("#id").val()) !== 0) {
			var user = $("#inputUsers").val();
			var imei = $("#imei").val();
			var id = $("#id").val();
			if (user !== " " && imei !== " ") {
				// console.log(code +" "+libelle)
				$.ajax({
					url: "SmartPhoneServlet",
					data: { action: "update", id: id, user: user, imei: imei },
					method: "POST",
					success: function(data) {
						listerSpc(data);
					},
					error: function(data) {
						console.log(data);
					}

				});
				$("#inputUsers").val("");
				$("#libelle").val("");
			}
		}
	});
	$("#content").on("click", '.badge', function() {
		//alert($(this).attr("data-role"));
		if ($(this).attr("data-role") === "delete") {
			$.ajax({
				url: 'SmartPhoneServlet',
				data: { action: "delete", id: $(this).attr("indice") },
				method: "POST",
				success: function(data) {
					listerSpc(data);
				},
				error: function(data) {
					console.log(data);
				}
			});
		} else if ($(this).attr("data-role") === "map") {
			var id = $(this).attr('indice');
			//alert(id);
			if (id != undefined && id != null) {
				window.location = '/gestionSmartphone/map.html?id=' + id;
			}
		} else {
			// alert($(this).attr("indice"));
			$.ajax({
				url: 'SmartPhoneServlet',
				data: { action: "edit", id: $(this).attr("indice") },
				method: "POST",
				success: function(data) {
					console.log(data);
					$("#inputUsers").val(data.user.id);
					$("#imei").val(data.imei);
					$("#id").val(data.id);
				},
				error: function(data) {
					console.log(data);
				}
			});
		}
	});
	function listerSpc(data) {
		var ligne = " ";
		data.forEach(function(e) {
			ligne += "<tr><th scope='row'>" + e.id + "</th><td value='" + e.user.nom + "' >" + e.user.nom + "</td><td valuel=" + e.imei + ">" + e.imei
				+ "</td><td><button indice=" + e.id + " data-role='delete' class='badge badge-secondary'>Delete</button>&nbsp;&nbsp;&nbsp;<button indice=" + e.id
				+ " data-role='update' class='badge badge-warning'>Update</button>&nbsp;&nbsp;&nbsp;<button indice=" + e.id
				+ " data-role='map' class='badge badge-info'> GetMap</button></td></tr>";
		});
		$("#content").html(ligne);
	}
});
