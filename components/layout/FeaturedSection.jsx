import ProductSlider from '@/components/common/ProductSlider';
import { getFeaturedProducts } from '@/services/productService';
import { Frown } from 'lucide-react';

export default async function FeaturedSection() {
    const products = await getFeaturedProducts();
    return (
        <section className='my-8 px-8'>
            <h3 className='font-semibold mb-4 underline underline-offset-2'>Featured</h3>
            {
                products.length > 0 ? (

                    <ProductSlider products={products}/>
                ) : (
                    <div className='flex flex-col gap-4 items-center justify-evenly h-24 sm:h-40'>
                        <p className='sm:text-xl'>There are no products in the featured section</p>
                        <Frown className='h-12 w-12 stroke-1 sm:h-16 sm:w-16'/>
                    </div>
                )
            }
        </section>
    )
}