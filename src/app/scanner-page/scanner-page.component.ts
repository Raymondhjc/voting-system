import { ImageDetails } from './Image-Details';
import {Component, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {ScannerDownloadService} from './scanner-web.service';

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
    displayedColumns = ['id', 'name'];

    constructor(private scannerDownloadService: ScannerDownloadService) {
        // private scannerDownloadService: ScannerDownloadService
    }

    ngOnInit() {
        var response = this.scannerDownloadService.getPictureInfo().subscribe(
            response=>{
                const r= response.json()
                console.log(r[0].pictureid)
            }
        )
        console.log(response);
    }

    countNumber = this.getImageCount();
    ImageName = this.showImageName(this.imageIndex);
    ImageSrc = this.imageArray[this.imageIndex];
    imageDetails = new ExampleImageDetails();

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

    applyFilter(filterValue:string) {
        filterValue = filterValue.trim();
        //remove whitespace
        filterValue = filterValue.toLowerCase();
        //this.imageDetails.filter = filterValue;
    }

}

/*
export class ExampleImageDetails extends DataSource<any>{
    connect(): Observable<ImageDetails[]> {
        return Observable.of();
    }
    disconnect() {}
}
*/

export interface Element {
    name: string;
    id: number;
  }
  
  const data: Element[] = [
    { id: 1, name: 'VotingImage1'},
    { id: 2, name: 'VotingImage2'},
    { id: 3, name: 'VotingImage3'},
  ]
  
  export class ExampleImageDetails extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Element[]> {
      return Observable.of(data);
    }
  
    disconnect() {}
  } 


