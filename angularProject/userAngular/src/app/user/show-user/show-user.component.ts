import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiService } from 'src/app/user-api.service'; 

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  [x: string]: any;

  

  UserList$!:Observable<any[]>;
  UserGendersList$!:Observable<any[]>;
  UserGendersList:any=[];

  userGendersTypeMap:Map<number, string> = new Map();

  constructor(private service:UserApiService){}

  //input variables
  
  @Input() User:any;
  uGender2!:number;
  userid:number=0;
  NameUser:String ="";
  GmailUser:String ="";
  PaswordUser:String ="";
  userGender!:number;


  ngOnInit(): void {

    //calls the functions
    this.UserList$ = this.service.getUserList();
    this.UserGendersList$ = this.service.getUserGendersList();
    this.refreshUserGendersTypeMap();

  }

  //varaible(propery)

  modalTitle:string = '';
  activateAddEditUserComponent:boolean = false;
  usuario:any;

  //shows panel to add users

  modalAdd() {
    this.activateAddEditUserComponent = true;
  }

  //panel to add users disappears and shows the changes
  modalClose(){
    this.activateAddEditUserComponent = false;
    this.UserList$ = this.service.getUserList();
  }

  //shows available genres
  refreshUserGendersTypeMap(){

    this.service.getUserGendersList().subscribe(data => {
      this.UserGendersList=data 

        for(let i=0; i < data.length; i++){

          this.userGendersTypeMap.set(this.UserGendersList[i].id, this.UserGendersList[i].typeGender);
        }



    })

    
  }

  //function to delete users
  modalDelete(item:any){

    if(confirm('Are you sure you want to delete the user?' )){

      this.service.deleteUser(item.id).subscribe(res =>{

        this.UserList$ = this.service.getUserList();
  
        var showupd = document.getElementById('updateUserSu');
        if(showupd){
          showupd.style.display ="block";
        }
  
      })

    }

  }

   
  //function to load data
  loadUser(id:any, name:any, gmail:any, pss:any){

    var showadd = document.getElementById('Box');
      if(showadd){
        showadd.style.display ="block";
      }

      this.userid = id;
      
      this.NameUser = name;

      this.GmailUser = gmail;

      this.PaswordUser = pss;
   
  }

  //check the data to edit
  floutValueEdit(){

    var strength = 0;
    var tips = "";
    var UsuarioName = (<HTMLInputElement>document.getElementById("name")).value;
    var UsuarioEmail = (<HTMLInputElement>document.getElementById("userEmail")).value;
    var UsuarioPassword = (<HTMLInputElement>document.getElementById("inputPassword")).value;
    var Usuariooption = (<HTMLInputElement>document.getElementById("option2")).value;
    var gen = Number (Usuariooption);

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

                      this.updateUser();

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

  //edit the data
  updateUser(){

   var UsaruiId = (<HTMLInputElement>document.getElementById("idUser")).value;
   var UsuarioName = (<HTMLInputElement>document.getElementById("name")).value;
   var UsuarioEmail = (<HTMLInputElement>document.getElementById("userEmail")).value;
   var UsuarioPassword = (<HTMLInputElement>document.getElementById("inputPassword")).value;
   var Usuariooption = (<HTMLInputElement>document.getElementById("option2")).value;
   var gen = Number (Usuariooption);
   var UPDATEUser={

    id:this.userid,
    userName:UsuarioName,
    userGmail:UsuarioEmail,
    userPassword:UsuarioPassword,
    userTypeGender:gen
  }

  this.service.updateUser(this.userid, UPDATEUser).subscribe(res =>{

    this.UserList$ = this.service.getUserList();

    var showadd = document.getElementById('Box');
    if(showadd){
      showadd.style.display ="none";
    }

    var showupd = document.getElementById('updateUserSu');
    if(showupd){
      showupd.style.display ="block";
    }
    setTimeout(function(){
      if(showupd){
        showupd.style.display ="none";
      }

},4000)

  })

  }

   
    
  }
  
