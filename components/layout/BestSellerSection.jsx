import ProductSlider from '@/components/common/ProductSlider';
import { getProductsByRating } from '@/services/productService';

export default async function BestSellerSection() {
    const products = await getProductsByRating();
    return (
        <section className='my-8 px-8'>
            <h3 className='font-semibold mb-4 underline underline-offset-2'>Best Sellers</h3>
            <ProductSlider products={products}/>
        </section>
    )
}