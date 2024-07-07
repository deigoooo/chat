
document.addEventListener('DOMContentLoaded', function() {
    const isDeslogued = document.querySelectorAll('.logged');
    const itsLog = document.getElementById('itsLog');
    const state = itsLog.textContent || itsLog.innerText;
    const login = document.getElementById('login');

    if(state){
        isDeslogued.forEach(element =>{
            element.style.display = 'block';
        });
        login.style.display = 'none';
    }
});