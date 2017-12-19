     var code ; //在全局 定义验证码  
     function createCode()  
     {   
       code = "";  
       var codeLength = 4;//验证码的长度  
       var kCode = document.getElementById("kCode");  
       var selectChar = new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');//所有候选组成验证码的字符，当然也可以用中文的  
          
       for(var i=0;i<codeLength;i++)  
       {  
        
          
       var charIndex = Math.floor(Math.random()*36);  
       code +=selectChar[charIndex];  
         
         
       }  
       if(kCode)  
       {  
         kCode.className="kCode";  
         kCode.value = code;  
       }  
         
     }  
       
      function validate ()  
     {  
       var inputCode = document.getElementById("vfCode").value;  
       if(inputCode.length <=0)  
       {  
          document.getElementById("error").innerHtml = "请输验证码";  
       }  
       else if(inputCode != code )  
       {  
          alert("验证码输入错误！");  
          createCode();//刷新验证码  
       }  
         
       }  
