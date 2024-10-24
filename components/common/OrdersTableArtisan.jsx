import Image from "next/image";

import { getLimitedProductsForTesting } from "@/services/productService";

import { Badge } from "../ui/badge";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "../ui/card";

async function OrdersTableArtisan() {
  const products = await getLimitedProductsForTesting();

  return (
    <>
      <div className="mt-4">
        <h1 className="text-lg font-bold md:text-2xl">List of Recent Orders</h1>
        <p>These are the list of recent products ordered</p>
      </div>
      <Table className="border">
        <TableCaption>List of recent Orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="text-base font-bold">Name</TableHead>
            <TableHead className="text-base font-bold">Price</TableHead>
            <TableHead className="text-base font-bold">In Stock</TableHead>
            <TableHead className="text-base font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.product_id}>
              <TableCell>
                <div className=" object-contain w-16 h-16 rounded">
                  <Image
                    src={product.image_url}
                    alt={`${product.name} product image`}
                    width={100}
                    height={100}
                    className="rounded"
                  />
                </div>
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{`$${product.price}`}</TableCell>
              <TableCell>{product.quantity_in_stock}</TableCell>
              <TableCell>
                <Badge className="bg-orange-400 text-slate-100">Pending</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default OrdersTableArtisan;
