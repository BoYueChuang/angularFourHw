import { Attribute, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // 綁定在表單上
  formGroup!: FormGroup;

  /**
   * 用以取得firstname欄位的表單控制項
   */
   get firstNameControl(): FormControl {

    return this.formGroup.get('firstName') as FormControl;
  }

  /**
   * 用以取得lastname欄位的表單控制項
   */
   get lastNameControl(): FormControl {

    return this.formGroup.get('lastName') as FormControl;
  }

  /**
   * 用以取得信箱欄位的表單控制項
   */
  get emailControl(): FormControl {
    console.log(this.formGroup.get('email')?.errors);

    return this.formGroup.get('email') as FormControl;
  }

  /**
   * 用以取得密碼欄位的表單控制項
   */
  get passwordControl(): FormControl {
    return this.formGroup.get('password') as FormControl
  }

  /**
   * 用以取得密碼重複確認欄位的表單控制項
   */

  get passwordRepeatControl(): FormControl {
    return this.formGroup.get('passwordRepeat') as FormControl;
  }

  /**
   * 透過 DI 取得 FromBuilder 物件，用以建立表單
   */
  constructor(private formBuilder: FormBuilder ,
    @Attribute('equalsTo') public equalsTo: string,) {}

  /**
   * 當 Component 初始化的時候初始化表單
   */
  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/)
        ]
      ],
      passwordRepeat: [
        '',
        [

        ]
      ]
    });
  }

  // 綁定在表單上，當使用者按下登入按鈕時會觸發此函式
  login(): void {
    // do login...
  }

  /**
   * 透過該欄位的表單控制項來取得該欄位的錯誤訊息
   *
   * @param {FormControl} formControl 欲取得錯誤訊息的欄位的表單控制項 (by Angular)
   */
  getErrorMessage(formControl: FormControl): string {
    console.log(this.formGroup.get('passwordRepeat')?.value);

    console.log(formControl);

    let errorMessage!: string;
    if (!formControl.errors || !formControl.touched) {
      errorMessage = '';
    } else if (formControl.errors['required']) {
      errorMessage = '此欄位必填';
    } else if (formControl.errors['pattern']) {
      errorMessage = '格式有誤，請重新輸入';
    } else if (formControl.errors['minlength']) {
      errorMessage = '密碼長度最短不得低於8碼';
    } else if (formControl.errors['maxlength']) {
      errorMessage = '密碼長度最長不得超過16碼';
    }
    return errorMessage;
  }



  onChange(y:any){
    console.log(y);
  }



}
