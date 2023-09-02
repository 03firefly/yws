$(document).ready(function () {
    $("#id").blur(async function () {
        await axios.post('/t/ajax3',{'id':$("#id").val(),'type':'id'}).then(res=>{
            console.log(res)
            if(res.data === "普通用户"||res.data === "管理员")
                $("#spn1").text("");
            else $("#spn1").text(res.data);
        }).catch(err=>{
            console.log(err);
        })
    })
    $("#email").blur(async function () {
       await axios.post('/t/ajax2',{'email':$("#email").val(),'type':'email'}).then(res=>{
            console.log(res)
            $("#spn2").text(res.data);
        }).catch(err=>{
            console.log(err);
        })
    })
    $("#get").click(async function () {
        let id = $('#id').val();
        let e = $('#email').val();
        let s1 = $('#spn1').text();
        let s2 = $('#spn2').text();
        if(id!==""&&e!==""&&s1===""&&s2==="") {
           await axios.post('/t/ajax3',{'id':id,'email':e,'type':'find'}).then(res=>{
                console.log(res)
                if(res.data === '邮箱不匹配')
                    alert(res.data)
                $("#mm").text('密码：'+res.data);
            }).catch(err=>{
                console.log(err);
            })
        }
        else if(id===""||e===""){
            alert("不能为空");
        }

    })
})
