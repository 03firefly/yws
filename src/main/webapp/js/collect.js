
$(document).ready(function () {
    let id=null;
    let url = window.location.search;
    if(url.indexOf("?")!==-1) {
        id = url.substring(url.indexOf('=') + 1)
        axios.post('/t/ajax6',{'id':id,'type':'collect'}).then(res=>{
            console.log(res)
            let total = "",poetry = "",prose = "",novel = "",drama = "",other = "",str;
            for (let i = res.data[0];i>0;i--) {
                str = "<dd>\n" +
                    "            <div class=\"text\">\n" +
                    "                <a href=\"article.html?key=" + res.data[i].key + "&id=" + id + "\" class=\"a\">\n" +
                    "                    <div class=\"title\">" + res.data[i].title + "</div>\n" +
                    "                    <textarea class=\"body\" disabled=\"disabled\" >" + res.data[i].content + "</textarea>\n" +
                    "                    <div class=\"other\">\n" +
                    "                        <span class=\"author\" style=\"margin-right: 40px\">作者：" + res.data[i].authorName + "</span>\n" +
                    "                        <span class=\"type\">类型：" + res.data[i].atype + "</span>\n" +
                    "                    </div>\n" +
                    "                </a>\n" +
                    "            </div>\n" +
                    "            <div class=\"check\">\n" +
                    "                <input type=\"checkbox\" class=\"checkbox\" hidden=\"hidden\" value=\""+ res.data[i].key +"\">\n" +
                    "            </div>\n"+
                    "        </dd>\n";
                total += str;
                if(res.data[i].atype === '诗词'){
                    poetry += str;
                }else  if(res.data[i].atype === '散文'){
                    prose += str;
                }else  if(res.data[i].atype === '小说'){
                    novel += str;
                }else  if(res.data[i].atype === '戏剧'){
                    drama += str;
                }else {
                    other += str;
                }
            }

            $("#total").click(function () {
                $(".kind").css('border-bottom','none')
                $("#total").css('border-bottom','1px solid #777777')
                $(".part3").html(total)
            })
            $("#poetry").click(function () {
                $(".kind").css('border-bottom','none')
                $("#poetry").css('border-bottom','1px solid #777777')
                $(".part3").html(poetry)
            })
            $("#prose").click(function () {
                $(".kind").css('border-bottom','none')
                $("#prose").css('border-bottom','1px solid #777777')
                $(".part3").html(prose)
            })
            $("#novel").click(function () {
                $(".kind").css('border-bottom','none')
                $("#novel").css('border-bottom','1px solid #777777')
                $(".part3").html(novel)
            })
            $("#drama").click(function () {
                $(".kind").css('border-bottom','none')
                $("#drama").css('border-bottom','1px solid #777777')
                $(".part3").html(drama)
            })
            $("#other").click(function () {
                $(".kind").css('border-bottom','none')
                $("#other").css('border-bottom','1px solid #777777')
                $(".part3").html(other)
            })
            $("#total").click()


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
                object['id'] = id;
                object['type'] = 'delete';
                object['action'] = '收藏';
                let json = JSON.stringify(object);
                await axios.post('/t/ajax6', json).then(res => {
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