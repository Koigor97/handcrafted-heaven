import SearchBar from '@/components/common/SearchBar';
import ToolBar from '@/components/common/ToolBar';

export default function HeaderMenu() {
    return (
        <div className="flex flex-col-reverse m-4 gap-3 md:mx-6 md:flex-row md:justify-between">
            <SearchBar/>
            <ToolBar/>
        </div>
    )
}