function change(a){
    document.querySelector('.frame').src=a;
    console.log('change');
}
function log(){
    fetch('/logout')
    .then(res=>res.json())
    .then(data=>{
        if(data.success){
            parent.location.href='/'
        }
        else{
            alert('logout failed');
        }
    });
}
document.querySelector('#cls').addEventListener('click',function(eve){
    document.querySelector('.left').style.display='none';
});
document.querySelector('#cls1').addEventListener('click',function(eve){
    document.querySelector('.left').style.display='none';
});
document.querySelector('#cls2').addEventListener('click',function(eve){
    document.querySelector('.left').style.display='none';
});
document.querySelector('#cls3').addEventListener('click',function(eve){
    document.querySelector('.left').style.display='none';
});
document.querySelector('#cls4').addEventListener('click',function(eve){
    document.querySelector('.left').style.display='none';
});
document.querySelector('#baropen1').addEventListener('click',function(eve){
    document.querySelector('.left').style.display='block';
});