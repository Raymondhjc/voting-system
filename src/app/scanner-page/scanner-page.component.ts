import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-scanner-page',
    templateUrl: './scanner-page.component.html',
    styleUrls: ['./scanner-page.component.css']
})
export class ScannerPageComponent implements OnInit {

    imageIndex = 0;
    originalImageArray: string[] = ['assets/votingImage1.jpg', 'assets/votingImage2.jpg', 'assets/votingImage3.jpg'];
    imageArray: string[] = ['assets/votingImage1.jpg', 'assets/votingImage2.jpg', 'assets/votingImage3.jpg'];
    resultImageArray: string[] = new Array();

    constructor() {
    }

    ngOnInit() {
    }

    countNumber = this.getImageCount();
    ImageName = this.showImageName(this.imageIndex);
    ImageSrc = this.imageArray[this.imageIndex];

    previousPage(image: any, previousButton: any, nextButton: any) {
        if (this.imageIndex > 0) {
            this.imageIndex = this.imageIndex - 1;
            image.src = this.imageArray[this.imageIndex];
        }
        if (this.imageIndex === 0) {
            previousButton.disabled = true;
        }
        nextButton.disabled = false;
        this.ImageName = this.showImageName(this.imageIndex);
    }

    nextPage(image: any, previousButton: any, nextButton: any) {
        if (this.imageIndex < this.imageArray.length - 1) {
            this.imageIndex = this.imageIndex + 1;
            image.src = this.imageArray[this.imageIndex];
        }
        if (this.imageIndex === this.imageArray.length - 1) {
            nextButton.disabled = true;
        }
        previousButton.disabled = false;
        this.ImageName = this.showImageName(this.imageIndex);
    }

    getImageCount(){
        return this.imageArray.length;
    }
    
    countImageNumber(){
        
        this.countNumber = this.getImageCount();
    }
    
    resetImageNumber(image: any){
        this.countNumber = 0;
        this.ImageName = this.showImageName(0);
        this.imageArray = this.originalImageArray;
        image.src = this.imageArray[0];
    }
    
    resetInput(placeholder: any, image: any){
        placeholder.value = "";
        this.ImageName = this.showImageName(0);
        image.src = this.imageArray[0];
        this.resultImageArray = new Array();
        this.imageArray = this.originalImageArray;
    }

    searchImage(placeholder: any, image: any){
        var searchValue = placeholder.value;
        this.resultImageArray = new Array();
        var iCount = 0;
        //console.log("searchValue = "+searchValue);        
        if(searchValue != "") {
            for(var i =0;i<this.imageArray.length; i++) {
                if(this.imageArray[i].indexOf(searchValue) >= 0) {
                    this.resultImageArray[iCount] =this.imageArray[i];
                    iCount++;
                }
            }
            this.imageArray = this.resultImageArray;
            if(iCount == 0) {
                placeholder.value = "Image not Found!"
            }
        } else {
            this.imageArray = this.originalImageArray;
        }

        this.ImageName = this.showImageName(0);
        image.src = this.imageArray[0]; 
    }

    showImageName(imageIndex: any){
        //console.log(this.imageArray);        
        var imgName = this.imageArray[imageIndex];


        // example: assests/image1.jpg
        var startIndex= imgName.lastIndexOf("/");
        var endIndex =imgName.lastIndexOf(".");
        var realName = imgName.substring(startIndex +1, endIndex);

        return realName;
    }
}
