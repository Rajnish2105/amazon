document.addEventListener("DOMContentLoaded", async()=>{
    const loginform = document.getElementById("login-form");
    const signup = document.getElementById("signup-link");
    loginform.addEventListener("submit",async(event)=>{
        event.preventDefault();

        const formdata = new FormData(loginform);
        const formDataObject = Object.fromEntries(formdata.entries());

        try{
            const response = await fetch("http://localhost:3000/signin",{
                method: "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(formDataObject)
               
            });
            if(response.ok){
                const data =  await response.json();
                window.location.href = "amazon.html";
                
            }
            else {
                const errorData = await response.json();
                // Handle login error (e.g., display error message)
                console.error('Login failed:', errorData.message);
                showMessage(errorData.message, 'red');
            }
            

        }
        catch(err){
            console.error('An error occurred:', err);
            showMessage('An error occurred. Please try again later.', 'red');
        }

    })
    signup.addEventListener("click",()=>{
        window.location.href="signup.html"
    })
})
function showMessage(message, color) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = color;
}