import { Component, Output, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiService } from 'src/app/user-api.service';


@Component({
  
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit{

  UserList$!:Observable<any[]>;
  UserGendersList$!:Observable<any[]>;
  userGendersTypeMap:Map<number, string> = new Map();
  UserGendersList:any=[];
  static document: any;

  constructor(private service:UserApiService){}

  //input variables
  @Input() User:any;
  id:number=0;
  uName:string ="";
  uGmail:string ="";
  uPss:string ="";
  uGender!:number;
  

  ngOnInit(): void {

    //calls the function
    this.service.getUserGendersList().subscribe((data:any) => {
    this.UserGendersList=data })
  }

  //check the data to add
  floutValueAdd(){

    var strength = 0;
    var tips = "";
    var UsuarioName = this.uName;
    var UsuarioEmail = this.uGmail;
    var UsuarioPassword = this.uPss;
    var gen = this.uGender;

    if(UsuarioName.length > 0 ||  UsuarioEmail.length > 0 || UsuarioPassword.length > 0){

      if(UsuarioName.length > 3 && UsuarioName.length < 30){
        if ((/[0-9]/.test(UsuarioName))) {
          alert("Your name cannot have numbers");
        } else {
         
          if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(UsuarioEmail)){

            if(UsuarioPassword.length > 8){

              // Check for mixed case
              if (UsuarioPassword.match(/[a-z]/) && UsuarioPassword.match(/[A-Z]/)) {
              
                  // Check for numbers
                if (UsuarioPassword.match(/\d/)) {

                  // Check for special characters
                  if (UsuarioPassword.match(/[^a-zA-Z\d]/)) {
                    
                    if(gen > 0 && gen < 4){

                      this.addUserr();

                    }else{

                      alert("gender not found");

                    }
                    

                  } else {
                    alert("You must include at least one special character in your password");
                  }
                } else {
                   alert("You must include at least one number in your password");
                }

              } else {
              alert("You must include letters in your password");
              }
            }else{
              alert("Very short password");
            }

           } else {
            alert("The email address is wrong!.");
           }
      
         }

      }else{

        alert("his name is too short")

      }

    }else{
   
      alert("There can be no empty fields");
    }
    
  }

    //Add the data
  addUserr(){

    var ADDUser={

      userName:this.uName,
      userGmail:this.uGmail,
      userPassword:this.uPss,
      userTypeGender:this.uGender,
    }

    this.service.addUser(ADDUser).subscribe(res =>{

      var closeModalBtn = document.getElementById('add-edit-modal-close');
      
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showadd = document.getElementById('addUserSu');
      if(showadd){
        showadd.style.display ="block";
      }

        setTimeout(function(){
          if(showadd){
            showadd.style.display ="none";
          }

},4000)

    })

  }

 
}
