import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services';
import * as CryptoJS from 'crypto-js';
import { SessionStorageService } from 'src/app/_services/SessionStorageService.service';

declare var JSEncrypt: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {
  userForm!: FormGroup;
  errorText: String;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private localStore: SessionStorageService
    ) {
      this.errorText = "";
      if(this.authenticationService.currentUserValue.token && this.authenticationService.currentUserValue.token !== "")
        this.router.navigate(['home']);
    }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      private_key: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  get f() { return this.userForm?.controls; }

  onSubmit() {
    const private_key = atob(this.f?.private_key.value);
    const jsenc = new JSEncrypt();
    jsenc.setPrivateKey(private_key);
    var signature = jsenc.sign("SecureChatServer", CryptoJS.SHA256, "sha256");
    console.log(signature);
    this.authenticationService.login(this.f?.email.value, signature)
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
              this.localStore.storeValue('private_key', private_key)
              this.router.navigate(["home"]);
            },
            error => {
              this.errorText = error;
              console.error(error);
            });
  }

}
