import ProductSlider from '@/components/common/ProductSlider';
import { getFeaturedProducts } from '@/services/productService';

export default async function FeaturedSection() {
    const products = await getFeaturedProducts();
    return (
        <section className='my-8 px-8'>
            <h3 className='font-semibold mb-4 underline underline-offset-2'>Featured Products</h3>
            <ProductSlider products={products}/>
        </section>
    )
}