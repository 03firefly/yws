
$(document).ready(function () {
    let id=null;
    let url = window.location.search;
    if(url.indexOf("?")!==-1) {
        id = url.substring(url.indexOf('=') + 1)
        $("#top").attr("href","search.html?id="+id)
        axios.post('/t/ajax5',{'type':'get'}).then(res=>{
            console.log(res)
            let total = "",poetry = "",prose = "",novel = "",drama = "",other = "",str;
            for (let i = res.data[0];i>0;i--) {
                str = "<dd>\n" +
                    "            <div class=\"text\">\n" +
                    "                <a href=\"article.html?key="+ res.data[i].key +"&id="+id +"\" class=\"a\">\n" +
                    "                    <div class=\"title\">"+ res.data[i].title +"</div>\n" +
                    "                    <textarea class=\"body\" disabled=\"disabled\" >"+ res.data[i].content +"</textarea>\n" +
                    "                    <div class=\"other\">\n" +
                    "                        <span class=\"author\" style=\"margin-right: 40px\">作者："+ res.data[i].authorName +"</span>\n" +
                    "                        <span class=\"type\">类型："+ res.data[i].atype +"</span>\n" +
                    "                    </div>\n" +
                    "                </a>\n" +
                    "            </div>\n" +
                    "        </dd>\n";
                total += str;
                if(res.data[i].atype === '诗词'){
                    poetry += str;
                }
                else if(res.data[i].atype === '散文'){
                    prose += str;
                }else if(res.data[i].atype === '小说'){
                    novel += str;
                }else if(res.data[i].atype === '戏剧'){
                    drama += str;
                }else{
                    other += str;
                }
            }

            $("#total").click(function () {
                // border-bottom: 1px solid #777777;
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
        }).catch(err=>{
            console.log(err);
        })
    }
})