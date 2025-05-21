import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { STREAM_CATEGORIES } from '@/lib/constants';
import Link from 'next/link';

export default function CategoryBar() {
  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-2 py-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/browse">All</Link>
        </Button>
        {STREAM_CATEGORIES.map((category) => (
          <Button key={category.id} variant="outline" size="sm" asChild>
            <Link href={`/category/${category.id}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}