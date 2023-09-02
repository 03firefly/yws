
$(document).ready(function () {
    let id=null;
    let url = window.location.search;
    if(url.indexOf("?")!==-1) {
        id = url.substring(url.indexOf('=') + 1)
        axios.post('/t/ajax6',{'id':id,'type':'attention'}).then(res=>{
            console.log(res.data)
            let s = "";
            for (let k of Object.keys(res.data)){
                s += "<dl class=\"user\">\n" +
                    "<div class=\"a\">"+
                    "<a  href=\"user.html?id="+ res.data[k].id +"\">\n"+
                    "<div class=\"info\">\n"+
                    "      <div class=\"name\">"+ res.data[k].name +"</div>\n" +
                    "      <div class=\"id\">账号："+ res.data[k].id +"</div>\n" +
                    "</div>\n" +
                    "</a>\n"+
                    "<div class=\"input\">\n" +
                    "      <input type=\"checkbox\" class=\"checkbox\" hidden=\"hidden\" value=\""+ res.data[k].id +"\">\n" +
                    "</div>\n"+
                    "</div>\n" +
                    "</dl>\n"
            }
            if(s.length !== 0)
                $(".list").html(s)
            $('.checkbox').click(function () {
                // alert(1)
                let n=0;
                let check = document.getElementsByClassName('checkbox')
                for (let i=0;i<check.length;i++){
                    if(check[i].checked)
                        n++;
                }
                if(n === check.length)
                    $('#al').click()
                else $('#al').attr('checked',false)
            })

            $('#al').click(function () {
                let check = document.getElementsByClassName('checkbox')
                if($("#al").attr('checked') === 'checked'){
                    $("#al").removeAttr('checked')
                    for (let i=0;i<check.length;i++){
                        check[i].checked = false;
                    }
                }
                else{
                    for (let i=0;i<check.length;i++){
                        check[i].checked = true;
                    }
                    $("#al").attr('checked',true)
                }

            })

            $("#edit").click(function () {
                $("#delete").attr('hidden',false)
                $(".al").attr('hidden',false)
                $(".checkbox").attr('hidden',false)
                $("#cancel").attr('hidden',false)
                $('a').css('pointer-events','none')
            })
            $("#cancel").click(function () {
                $("#delete").attr('hidden',true)
                $('#al').attr('checked',false)
                $(".checkbox").attr('checked',false)
                $(".checkbox").attr('hidden',true)
                $("#cancel").attr('hidden',true)
                $(".al").attr('hidden',true)
                $('.checkbox').attr('hidden',true)
                $('a').css('pointer-events','auto')
            })

            $('#delete').click(async function () {
                let n=0;
                let object = Object.create(null)
                let check = document.getElementsByClassName('checkbox')
                for (let i=0;i<check.length;i++){
                    if(check[i].checked){
                        n++;
                        object[n] = check[i].value;
                    }
                }
                object[0] = n;
                object['id'] = id;
                object['type'] = 'delete';
                object['action'] = '关注';
                let json = JSON.stringify(object);
                await axios.post('/t/ajax6',json).then(res=>{
                    console.log(res);
                    alert(res.data)
                    location.reload()
                }).catch(err=>{
                    console.log(err);
                })
            })
        }).catch(err=>{
            console.log(err);
        })
    }
})