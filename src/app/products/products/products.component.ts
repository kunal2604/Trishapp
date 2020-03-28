import { Component, OnInit } from '@angular/core';
import { ProductsDataService } from '../products-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'trishapp-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productDataService: ProductsDataService) { }
  products: Observable<any>;

  ngOnInit(): void {
    this.products = this.productDataService.getAllProducts();
  }

}
