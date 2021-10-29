import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { first } from 'rxjs/operators';
import { RegisterEmailRequest } from 'src/app/_models/RegisterEmailRequest';
import { AuthenticationService } from 'src/app/_services';
declare var JSEncrypt: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl?: string;
  error: string = "";

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _FileSaverService: FileSaverService
  ) {
    console.log(this.authenticationService.currentUserValue) 
    this.loading = false;
    if(this.authenticationService.currentUserValue.token && this.authenticationService.currentUserValue.token !== "")
      this.router.navigate(['home']);
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  get f() { return this.userForm?.controls; }

  onSubmit(){
    this.submitted = true;

    this.loading = true;
    const jsenc = new JSEncrypt({default_key_size: 2048});
    var pub_priv = {PublicKey: jsenc.getPublicKey(), PrivateKey: jsenc.getPrivateKey()};
    this.save_text("private_key", btoa(pub_priv.PrivateKey));
    
    const username: string = this.f?.username.value;
    const s = new RegisterEmailRequest(this.f?.email.value, username, pub_priv.PublicKey);
    this.authenticationService.register(this.f?.email.value, username, pub_priv.PublicKey)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(["signin"]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });

  }

  save_text(filename: String, body: String){
    this._FileSaverService.saveText(body.toString(), filename.toString());
  }
}
