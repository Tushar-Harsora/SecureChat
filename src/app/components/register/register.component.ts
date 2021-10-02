import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services';

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
    private authenticationService: AuthenticationService
  ) {
    console.log(this.authenticationService.currentUserValue) 
    if(this.authenticationService.currentUserValue.id !== -1)
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
    // stop here if form is invalid
    if (this.userForm?.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f?.username.value, this.f?.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });

  }
}
