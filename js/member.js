//まとめたページ用
function showGrade(id){

    document.querySelectorAll(".grade-content").forEach(function(content){
        content.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    document.querySelectorAll(".grade-buttons button").forEach(function(btn){
        btn.classList.remove("active");
    });

    if(id==="grade2"){
        document.querySelectorAll(".grade-buttons button")[0].classList.add("active");
    }else if(id==="grade3"){
        document.querySelectorAll(".grade-buttons button")[1].classList.add("active");
    }else{
        document.querySelectorAll(".grade-buttons button")[2].classList.add("active");
    }
}

window.onload=function(){
    showGrade("grade4");
};
