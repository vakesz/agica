import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';

import { ContactformService } from 'src/app/services/contactform/contactform.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  FormData!: FormGroup;

  constructor(private builder: FormBuilder, private contact: ContactformService) { }

  ngOnInit() {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Recipient: new FormControl('', [Validators.required]),
      Email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      Message: new FormControl('', [Validators.required])
    });
  }

  onSubmit(FormData : FormGroup) {
    console.log(FormData)
    this.contact.PostMessage(FormData)
      .subscribe(response => {
        //SENT
        console.log(response)
      }, error => {
        console.warn(error.responseText)
        console.log({ error })
      })
  }
}
