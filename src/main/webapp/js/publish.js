
$(document).ready(function () {
    let id=null;
    let url = window.location.search;
    if(url.indexOf("?")!==-1) {
        id = url.substring(url.indexOf('=') + 1)
        $("#publish").click(async  function () {
            let date = new Date();
            await axios.post('/t/ajax6',{'type':'publish',
                'id':id,
                'kind':$("input[name='kind']").filter(':checked').val(),
                'title':$("#title").text(),
                'content':$("#text").val(),
                'time':date.toLocaleDateString().replaceAll('/','-')}).then(res=>{
                console.log(res)
                alert(res.data)
                $("#title").text("")
                $("#text").val("")
                $("#other").add('checked',true)
            }).catch(err=>{
                console.log(err);
            })
        })
        $("#history").click(function () {
            $('#a').attr('href','history.html?id='+id)
        })
    }

})
