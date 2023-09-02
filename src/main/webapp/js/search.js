$(document).ready(function () {
    //let info = JSON.parse(sessionStorage.getItem("info"));
    // alert(info)
    let id=null;
    let url = window.location.search;
    if(url.indexOf("?")!==-1) {
        id = url.substring(url.indexOf('=') + 1)
        $("#img").click(async function () {
            //sessionStorage.setItem("info",JSON.stringify($("#search").val()))

            // alert($("#search").val())
            await axios.post('/t/ajax7', {'info': $("#search").val()}).then(res => {
                console.log(res.data);
                let user = "", article = "";
                if (res.data[0] !== 0) {
                    for (let i = res.data[0]; i > 0; i--) {
                        if (res.data[i].myClass === 'user') {
                            user += "<dd class=\"user\">\n" +
                                "        <div class=\"a\">\n" +
                                "            <a  href=\"user.html?id=" + res.data[i].id + "\">\n" +
                                "                <div class=\"info\">\n" +
                                "                    <div class=\"name\">" + res.data[i].name + "</div>\n" +
                                "                    <div class=\"id\">账号：" + res.data[i].id + "</div>\n" +
                                "                </div>\n" +
                                "            </a>\n" +
                                "        </div>\n" +
                                "    </dd>"
                        } else if (res.data[i].myClass === 'article') {
                            article += "<dd class=\"article\">\n" +
                                "        <div class=\"text\">\n" +
                                "            <a href=\"article.html?key=" + res.data[i].key + "&id=" + id + "\" >\n" +
                                "                <div class=\"title\">" + res.data[i].title + "</div>\n" +
                                "                <textarea class=\"body\" disabled=\"disabled\" >" + res.data[i].content + "</textarea>\n" +
                                "                <div class=\"other\">\n" +
                                "                        <span class=\"author\" >作者：" + res.data[i].authorName + "</span>\n" +
                                "                        <span class=\"type\">类型：" + res.data[i].atype + "</span>\n" +
                                "                </div>\n" +
                                "            </a>\n" +
                                "        </div>\n" +
                                "    </dd>"
                        }
                    }

                } else {
                    // $(".dl").html("")
                    //$("#sorry").attr("hidden", false);
                    article = "<div  id=\"sorry\" style=\"text-align: center\" >很抱歉，您搜索的内容不存在！</div>"
                    user = article
                }
                $("#article").click(function () {
                    $(".kind").css('color', '#777777')
                    $("#article").css('color', 'black')
                    $(".dl").html(article)
                })
                $("#user").click(function () {
                    $(".kind").css('color', '#777777')
                    $("#user").css('color', 'black')
                    $(".dl").html(user)
                })
                $("#article").click();
                // if(info !== null){
                //     $("#search").val(info)
                //     // alert($("#search").val())
                //     $("#img").click();
                // }
            }).catch(err => {
                console.log(err);
            })

        })
        $("#search").keydown(function (event) {
            if (event.keyCode === 13) {
                $("#img").click()
            }

        })
    }
})