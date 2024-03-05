/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    const products = this.products;
    return products;
  }

  getProduct(productId: string): Product {
    const [product, productIndex] = this.findProduct(productId);
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ): Product {
    const [product, productIndex] = this.findProduct(productId);
    const updatedproduct = { ...product };
    if (title) {
      updatedproduct.title = title;
    }
    if (desc) {
      updatedproduct.description = desc;
    }
    if (price) {
      updatedproduct.price = price;
    }
    this.products[productIndex] = updatedproduct;
    return { ...updatedproduct };
  }

  deletProduct(productId: string) {
    const [deletedProduct, productIndex] = this.findProduct(productId);
    const newProducts = this.products.filter((prod) => prod?.id !== productId);
    this.products = newProducts;
    return { ...deletedProduct };
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [product, productIndex];
  }
}
