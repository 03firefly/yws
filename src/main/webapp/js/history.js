
$(document).ready(function () {
    let id=null;
    let type=null;
    let url = window.location.search;
    if(url.indexOf("?")!==-1) {
        url = url.slice(url.indexOf('?')+1);
        let arr = url.split('&');
        if(arr.length === 2) {
            type = arr[0].split('=')[1];
            id = arr[1].split('=')[1];
            $(".top").attr("hidden","hidden")
        }
        else id = url.substring(url.indexOf('=') + 1)
        axios.post('/t/ajax6',{'type':'history', 'id':id}).then(res=>{
            console.log(res)
            let s = "";
            for (let i = res.data[0];i>=1;i--) {
                s += "<dd class='dd'>\n" +
                    "            <div class=\"text\">\n" +
                    "                <a href=\"article.html?key=" + res.data[i].key +"&id="+ id+ "\" class=\"a\">\n" +
                    "                    <div class=\"title\">" + res.data[i].title + "</div>\n" +
                    "                    <textarea class=\"body\" disabled=\"disabled\" >" + res.data[i].content + "</textarea>\n" +
                    "                    <div class=\"other\">\n" +
                    "                        <span class=\"type\" style=\"margin-right: 40px\">类型：" + res.data[i].atype + "</span>\n" +
                    "                        <span class=\"time\">" + res.data[i].time + "</span>\n" +
                    "                    </div>\n" +
                    "                </a>\n" +
                    "            </div>\n" +
                    "            <div class=\"check\">\n" +
                    "                <input type=\"checkbox\" class=\"checkbox\" hidden=\"hidden\" value=\""+ res.data[i].aid
                    +"\">\n" +
                    "            </div>\n"+
                    "        </dd>\n"
            }
            if (s.length !== 0)
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

            $('#delete').click(async function () {
                let n = 0;
                let object = Object.create(null)
                let check = document.getElementsByClassName('checkbox')
                for (let i = 0; i < check.length; i++) {
                    if (check[i].checked) {
                        n++;
                        object[n] = check[i].value;
                    }
                }
                object[0] = n;
                object['type'] = 'delete';
                let json = JSON.stringify(object);
                await axios.post('/t/ajax5', json).then(res => {
                    console.log(res);
                    alert(res.data)
                    location.reload()
                }).catch(err => {
                    console.log(err);
                })
            })
        }).catch(err=>{
            console.log(err);
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
            $('.a').css('pointer-events','none')
        })
        $("#cancel").click(function () {
            $("#delete").attr('hidden',true)
            $('#al').attr('checked',false)
            $(".checkbox").attr('checked',false)
            $(".checkbox").attr('hidden',true)
            $("#cancel").attr('hidden',true)
            $(".al").attr('hidden',true)
            $('.checkbox').attr('hidden',true)
            $('.a').css('pointer-events','auto')
        })
    }

})