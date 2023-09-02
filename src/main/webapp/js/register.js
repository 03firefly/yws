async function mySubmit() {
    let n = $("#name").val();
    let psw = $("#password").val();
    let em = $("#e").val();
    let s1 = $("#sp1").text();
    let s2 = $("#sp2").text();
    let s3 = $("#sp3").text();
    let gd;
    if($("#man").is(':checked'))
        gd = '男';
    else if ($("#women").is(':checked'))
        gd = '女';
    else gd = '';
    let flag = n!==""&&psw!==""&&em!==""&&s1===""&&s2===""&&s3==="";
    if(flag) {
        await axios.post('/t/ajax1',{'name':n,'password':psw,'email':em,'gender':gd}).then(res=>{
            console.log(res)
            $("#id").val(res.data);
            alert('注册成功');
            $("#to").click();
            return true;
        }).catch(err=>{
            console.log(err);
        })
    } else {
        alert("错误");
        return false;
    }
}

$(document).ready(function () {
    $("#name").blur(async function () {
        await axios.post('/t/ajax2',{'name':$("#name").val(),'type':'name'}).then(res=>{
            //console.log(res)
            $("#sp3").text(res.data);
        }).catch(err=>{
            console.log(err);
        })
    })
    $("#password").blur(async function () {
        await axios.post('/t/ajax2',{'password':$("#password").val(),'type':'password'}).then(res=>{
            //console.log(res)
            $("#sp1").text(res.data);
        }).catch(err=>{
            console.log(err);
        })
    })
    $("#e").blur(async function () {
        await axios.post('/t/ajax2',{'email':$("#e").val(),'type':'email'}).then(res=>{
            //console.log(res)
            $("#sp2").text(res.data);
        }).catch(err=>{
            console.log(err);
        })
    })
})