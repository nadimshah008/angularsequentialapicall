import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/common/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filters:any=[];
  selectedButtons:any=[];
  resultData:any=[];
  sequenceArray:any=[];
  constructor(private apiServ:ApiService, private router:Router) { }

 async ngOnInit(): Promise<void> {
    this.filters = [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
      { value: '3', label: 'Three' },
      { value: '4', label: 'Four' }
    ];

    if (localStorage.getItem('selectedButtons')) {
      this.sequenceArray = JSON.parse(localStorage.getItem('selectedButtons') as string);
      console.log(this.sequenceArray);
    }

    // Ensure sequenceArray is initialized as an empty array if it's undefined
    if (!this.sequenceArray) {
      this.sequenceArray = [];
    }

    for (let i = 0; i < this.sequenceArray.length; i++) {
      await this.getTheData(this.sequenceArray[i]);
    }

  }

  processData(data:any){
    return new Promise((resolve, reject) => {
      this.apiServ.getTheData(data).subscribe(
        (result: any) => {
          resolve(result);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  // checkbox-click-array--- mpn and manufacture

  // selectedArray =  array.map({mpn:"",manufacture:""})


  // selectedArray = [{mpn:"",manufacture:""},{mpn:"",manufacture:""},{mpn:"",manufacture:""},{mpn:"",manufacture:""}]




  async getTheData(data:any){
    this.selectedButtons.push(data);
    localStorage.setItem('selectedButtons', JSON.stringify(this.selectedButtons));
    try {
      const temp = await this.processData(data);
      if (temp) {
        this.resultData.push(temp);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  goToLogin(){
    this.router.navigate(['/login'])
  }

}


