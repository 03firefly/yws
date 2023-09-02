let key = null;
let id = null;
let url = window.location.search;
let arr = null;
$(document).ready(function () {


    if(url.indexOf("?")!==-1){
        url = url.slice(url.indexOf('?')+1);
        arr = url.split('&');
        key = arr[0].split('=')[1];
        id = arr[1].split('=')[1];
        axios.post('/t/ajax5',{'type':'article','key':key}).then(res=>{
            $("#content").css('height','100%')
            console.log(res.data)
            $("#topic").text(res.data.title)
            $("#time").text(res.data.time)
            $("#id").text("账号："+res.data.authorId)
            $("#name").text("昵称："+res.data.authorName)
            $("#a").attr('href','user.html?id='+res.data.authorId)
            $("#content").text(res.data.content)
            if($("#content").height() < 300)
                $("#content").css('height','300px')
            if(res.data.authorId == id)
                $("#attention").attr('hidden','hidden')

            axios.post('/t/ajax5',{'Uid':id,'id':res.data.authorId,'key':res.data.key,'type':'value'}).then(res=>{
                console.log(res)
                if (res.data.attention === 2)
                    $("#attention").text('已关注')
                if (res.data.collect === 2)
                    $("#collect").text('已收藏')
            }).catch(err=>{
                console.log(err);
            })


            $("#attention").click(async function () {
                await axios.post('/t/ajax5',{'Uid':id,'id':res.data.authorId,'type':'attention','value':$("#attention").text()}).then(res=>{
                    console.log(res)
                    $("#attention").text(res.data)
                }).catch(err=>{
                    console.log(err);
                })
            })
            $("#collect").click(async function () {
                await axios.post('/t/ajax5',{'Uid':id,'id':res.data.key,'type':'collect','value':$("#collect").text()}).then(res=>{
                    console.log(res)
                    $("#collect").text(res.data)
                }).catch(err=>{
                    console.log(err);
                })
            })


        }).catch(err=>{
            console.log(err);
        })
    }

    $("#download").click(function () {
        axios.post('/t/download',{'key':key}).then(res=>{
            console.log(res)
            $("#dl").attr('href',"../excel/article.xls");
            $("#dl").attr('download',res.data);
            $("#aButton").click();
        }).catch(err=>{
            console.log(err);
        })
    })


})