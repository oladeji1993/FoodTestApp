import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  allProducts : any []
  constructor(
    private productService: ProductsService,
    private loading: LoadingService

    ) { }

  ngOnInit() {
    this.getAllproduct()
  }


  getAllproduct(){
    this.loading.show()
    this.productService.products().subscribe((products:any) =>{
      if(products){
        this.allProducts = products.data
        this.loading.hide()
      }else{
        this.loading.hide()
        this.loading.showFailure("Something went wrong")
      }
    }, err => {
      this.loading.hide()
      this.loading.showFailure("Something went wrong")
    })
  }

}
