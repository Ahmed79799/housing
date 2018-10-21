
/*--- targeting send button onClick ---*/

$("#send").click(function (evt) {
    evt.preventDefault();

    /*--- grapping form inputs ids ---*/

    var name    = $("#name").val(),
        mobile  = $("#mobile").val(),
        email   = $("#email").val(),
        comment = $("#comment").val();

    var nummberOnly = /^\d+$/;

    /*--- check if user inputs all information ---*/

    if (name =="" || mobile == 0 || email == "" || comment == "") {
        alert("Please Fill All Information :D");
    } else if (nummberOnly.test(mobile) == false || mobile.length < 11) {
        alert("Enter A Valid Mobile Number");
    } else {

        /*--- sending data to send.php page ---*/
        console.log(encodeURI('main.php?comment=' + comment + "&name=" + name + "&email=" + email + "&mobile=" + mobile));

        $.ajax({
            url: 'main.php?comment=' + encodeURI(comment) + "&name=" + encodeURI(name) + "&email=" + encodeURI(email) + "&mobile=" + encodeURI(mobile),
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                if (data.response == 'done') {
                    showSuMsg ("Your Message Is Sent.");
                    ga('send', 'event', 'form', 'submit', 'Summer Campaign');
                    $("#name").val("");
                    $("#mobile").val("");
                    $("#email").val("");
                    $("#comment").val("");
                }
            },
            error: function () {
                console.log('error');
            }
        });

    }

});