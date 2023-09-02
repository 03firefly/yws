

$(document).ready(function () {
    let id;
    let name,email,sign,birthday,gender,password;
    let url = window.location.search;
    if(url.indexOf("?")!==-1){
        url = url.slice(url.indexOf('?')+1);
        let arr = url.split('&');
        id = arr[0].split('=')[1];
        axios.post('/t/ajax4',{'id':id,'type':'get'}).then(res=>{
            $("#name").text(res.data.name);
            name = res.data.name;
            $("#id").html(res.data.id);
            $("#email").val(res.data.email);
            email = res.data.email;
            $("#sign").val(res.data.signature);
            sign = res.data.signature;
            $("#bd").val(res.data.birthday)
            birthday = res.data.birthday;
            $("#password").val(res.data.password);
            password = res.data.password;
            console.log(password)
            if (res.data.gender==='男') {
                $("#man").prop("checked", true);
                gender = '男';
            }
            else if (res.data.gender==='女') {
                $("#women").prop("checked", true);
                gender = '女';
            }
            console.log(res)
        }).catch(err=>{
            console.log(err);
        })
        $('#article').attr('href','history.html?id='+id)



        $("#edit").click(function () {
            $("#name").attr('contenteditable',true)
            $("#name").css('background-color','white')
            $(".button1").css("display","block")
            $("input").attr('disabled',false);
            $("textarea").attr("disabled",false);
            $('#name').blur(async function () {
                 await axios.post('/t/ajax2',{'name':$("#name").text(),'type':'name'}).then(res=>{
                    //console.log(res)
                    $("#sp1").text(res.data);
                }).catch(err=>{
                    console.log(err);
                })
            })
            $("#email").blur(async function () {
               await axios.post('/t/ajax2',{'email':$("#email").val(),'type':'email'}).then(res=>{
                    //console.log(res)
                    $("#sp2").text(res.data);
                }).catch(err=>{
                    console.log(err);
                })
            })
            $("#bd").blur(async function () {
               await axios.post('/t/ajax2',{'birthday':$("#bd").val(),'type':'birthday'}).then(res=>{
                    //console.log(res)
                    $("#sp3").text(res.data);
                }).catch(err=>{
                    console.log(err);
                })
            })
            $("#password").blur(async function () {
                await axios.post('/t/ajax2',{'password':$("#password").val(),'type':'password'}).then(res=>{
                    //console.log(res)
                    $("#sp4").text(res.data);
                }).catch(err=>{
                    console.log(err);
                })
            })
        })

        $("#sure").click(async function () {
            let gd;
            if($("#man").is(':checked'))
                gd = '男';
            else if ($("#women").is(':checked'))
                gd = '女';
            else gd = '';
            // let name,email,sign,birthday,gender,password;
            let bl = $("#sp1").text().length === 0 && $("#sp2").text().length === 0 && $("#sp3").text().length === 0&& $("#sp4").text().length === 0
            //console.log(bl)
            if(!bl)
                alert("格式出错")
            else {
                await axios.post('/t/ajax4', {
                    'type': 'edit',
                    'id': id,
                    'name': $("#name").text(),
                    'password': $("#password").val(),
                    'email': $("#email").val(),
                    'gender': gd,
                    'birthday': $("#bd").val(),
                    'sign': $("#sign").val()
                }).then(res => {
                    alert(res.data)
                    console.log(res);
                    // $("#name").attr('contenteditable', false)
                    // $("#name").css('background-color', '#f8f8f9')
                    // $("input").attr("disabled", "disabled");
                    // $("textarea").attr("disabled", "disabled");
                    // $(".button1").css("display", "none");
                    location.reload();
                }).catch(err => {
                    console.log(err);
                })

            }
        })

        $("#cancel").click(function () {
            $("#name").attr('contenteditable',false)
            $("#name").css('background-color','#f8f8f9')
            $("#name").text(name);
            $("#password").val(password);
            $("#email").val(email);
            $("#sign").val(sign);
            $("#bd").val(birthday);
            if(gender==='男')
                $("#man").attr('checked',true);
            else if(gender==='女')
                $("#women").attr('checked',true);
            $("#sp1").text("");
            $("#sp2").text("");
            $("#sp3").text("");
            $("input").attr("disabled","disabled");
            $("textarea").attr("disabled","disabled");
            $(".button1").css("display","none")
        })

        $("#delete").click(function () {
            $(".button2").css("display","block")
        })

        $("#yes").click(async function () {
            await axios.post('/t/ajax4',{'type':'delete','id':id}).then(res=>{
                console.log(res)
                alert(res.data)
                top.location = 'login.html';
            }).catch(err=>{
                console.log(err);
            })

        })

        $("#no").click(function () {
            $(".button2").css("display","none")
        })
        }
})



