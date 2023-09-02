
let type=null;
let id=null;
let url = window.location.search;
if(url.indexOf("?")!==-1){
    url = url.slice(url.indexOf('?')+1);
    let arr = url.split('&');
    id = arr[0].split('=')[1];
    type = arr[1].split('=')[1];
}
function homeClick() {
    $("#if").attr('src','home.html?id='+id)
    $('.menu').css('color','#777777')
    $('#home').css('color','#0b84d9')
}
$("#publish").click(function () {
    $("#if").attr('src','publish.html?id='+id)
    $('.menu').css('color','#777777')
    $('#publish').css('color','#0b84d9')

})
$(document).ready(function () {
    $("#home").click();
    if(type==='administrator') {
        $(".admin").css("display","block")
        $(".admin").click(function () {
            $(this).addClass("current").next("div.ad").slideToggle(200).siblings("div.ad").slideUp("slow");
            $(this).siblings().removeClass("current");
        })
    }

});
$("#people").click(function () {
    $("#if").attr('src','personal.html?id='+id)
    $('.menu').css('color','#777777')
    $('#people').css('color','#0b84d9')

})
$("#collect").click(function () {
    $("#if").attr('src','collect.html?id='+id)
    $('.menu').css('color','#777777')
    $('#collect').css('color','#0b84d9')
})
$("#attention").click(function () {
    $("#if").attr('src','attention.html?id='+id)
    $('.menu').css('color','#777777')
    $('#attention').css('color','#0b84d9')
})
$("#articles").click(function () {
    $("#if").attr('src','articles.html?id='+id)
    $('.menu').css('color','#777777')
    $('#articles').css('color','#0b84d9')
})
$("#users").click(function () {
    $("#if").attr('src','users.html?id='+id)
    $('.menu').css('color','#777777')
    $('#users').css('color','#0b84d9')
})