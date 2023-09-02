let type = null;
function sub() {
    let id = $("#id").val();
    let pd = $("#psw").val();
    let s1 = $("#span1").text();
    let s2 = $("#spn2").text();
    // alert(s2)
    // alert(id)
    if(id!==""&&pd!==""&&s1===""&&s2===""&&type!==undefined) {
         $("#post").val(type);

        return true;
    }
    else if(id===""||pd===""){
        alert("不能为空")
        return false;
    }
    else {
        alert("错误")
        return false;
    }
}
$(document).ready(function () {
    $("#id").blur(async function () {
        await axios.post('/t/ajax3',{'id':$("#id").val(),'type':'id'}).then( res=>{
            console.log(res)
            if(res.data==="普通用户"){
                type = "user";
                $("#spn1").text("");
            }
            else if(res.data==="管理员") {
                type = "administrator";
                $("#spn1").text("");
            }
            else {
                $("#spn1").text(res.data);
            }

        }).catch(err=>{
            console.log(err);
        })
    })
    $("#psw").blur(async function () {
        await axios.post('/t/ajax3',{'id':$("#id").val(),'password':$("#psw").val(),'type':'password'}).then(res=>{
            console.log(res)
            $("#spn2").text(res.data);
            // alert($("#spn2").text())
        }).catch(err=>{
            console.log(err);
        })
    })

})