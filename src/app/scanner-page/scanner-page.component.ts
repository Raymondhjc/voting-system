import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { any } from 'codelyzer/util/function';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanner-page',
  templateUrl: './scanner-page.component.html',
  styleUrls: ['./scanner-page.component.css']
})
export class ScannerPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  
  imageIndex: number = 0;
  imageArray: string[] = ["assets/votingImage1.jpg","assets/votingImage2.jpg","assets/votingImage3.jpg"];
  countNumber = this.getImageCount();
 
  previousPage(image:any,previousButton:any,nextButton:any){
    if (this.imageIndex > 0){
      this.imageIndex = this.imageIndex - 1;
      image.src = this.imageArray[this.imageIndex]
    }
    if (this.imageIndex === 0){
      previousButton.disabled = true 
    }
    nextButton.disabled = false;
  }

  nextPage(image:any,previousButton:any,nextButton:any){
    if (this.imageIndex < this.imageArray.length - 1){
      this.imageIndex = this.imageIndex + 1;
      image.src = this.imageArray[this.imageIndex]
    }
    if (this.imageIndex === this.imageArray.length - 1){
      nextButton.disabled = true
    }
    previousButton.disabled = false;
  }

  getImageCount(){
    return this.imageArray.length;
  }

  countImageNumber(){
      this.countNumber = this.getImageCount();
  }

  resetImageNumber(){
      this.countNumber = 0;
  }

  resetInput(placeholder: any){
    placeholder.value = "";
  }
}
