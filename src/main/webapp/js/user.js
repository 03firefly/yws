
$(document).ready( function () {
    let id=null;
    let url = window.location.search;
    if(url.indexOf("?")!==-1) {
        id = url.substring(url.indexOf('=') + 1);
        $('#article').attr('href','history.html?type=user&id='+id)
        axios.post('/t/ajax4',{'id':id,'type':'get'}).then(res=>{
            console.log(res)
            $("#name").text(res.data.name);
            name = res.data.name;
            $("#id").text(res.data.id);
            $("#sign").val(res.data.signature);
            sign = res.data.signature;
            $("#bd").val(res.data.birthday)
            birthday = res.data.birthday
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
    }
})