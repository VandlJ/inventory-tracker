export type StatusEnum = 'on_stock' | 'ordered' | 'planned';

export interface Item {
    id?: number;
    name: string;
    price: number;
    status: StatusEnum;
}
