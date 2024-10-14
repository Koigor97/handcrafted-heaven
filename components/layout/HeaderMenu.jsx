import SearchBar from '@/components/common/SearchBar';

export default function HeaderMenu() {
    return (
        <div className="flex flex-col items-center md:flex-row justify-between">
            <SearchBar/>
        </div>
    )
}