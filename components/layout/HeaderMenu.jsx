import SearchProducts from '@/components/common/SearchProducts';
import ToolBar from '@/components/common/ToolBar';
import { getFilteredProducts } from '@/services/productService';

export default async function HeaderMenu({searchParams}) {
    return (
        <div className="flex flex-col-reverse m-4 gap-3 md:mx-6 md:flex-row md:justify-between">
            <SearchProducts searchParams={searchParams}/>
            <ToolBar/>
        </div>
    )
}