import Product from './Product';
import { getAllProducts } from '@/services/productService';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default async function ProductSlider({products}) {
    return (
        <Carousel
            opts={{
                loop: true,
            }}
        >
            <CarouselContent className='items-center h-[315px]'>
                {products.map((product) => (
                    <CarouselItem key={product.product_id} className='sm:basis-1/3 lg:basis-1/4 xl:basis-1/5'>
                        <Product
                            id={product.product_id}
                            image={product.image_url}
                            name={product.name}
                            price={product.price}
                            quantity={product.quantity_in_stock}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='-left-4'/>
            <CarouselNext className='-right-4'/>
        </Carousel>
    )
}