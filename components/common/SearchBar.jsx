import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchBar() {
    return (
    <div className="flex w-full items-center space-x-2 md:max-w-sm">
      <Input type="text" placeholder="Search products..." />
      <Button type="submit" className="md:hover:bg-secondary1-800 md:hover:text-text-50">Search</Button>
    </div>
    )
}