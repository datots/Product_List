export interface Item {
  id: number;
  name: string;
  price: number;
}

export interface cartItem extends Item {
  quantity: number;
}
