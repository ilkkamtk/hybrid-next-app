import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { dateTimeOptions } from '@/lib/variables';
import { MediaItem } from '@/types/DBTypes';
import Image from 'next/image';
import Link from 'next/link';

export default async function MediaCard(props: { media: MediaItem }) {
  const { title, description, created_at, filename, media_id } = props.media;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="overflow-ellipsis overflow-hidden whitespace-nowrap">
          {description}
        </CardDescription>
        <CardDescription>
          {created_at.toLocaleString('fi-FI', dateTimeOptions)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Image
          src={process.env.UPLOAD_SERVER + '/uploads/' + filename}
          priority={true}
          className="rounded-md object-cover md:place-self-center sm:width-full md:h-64"
          alt="Most liked media"
          width={300}
          height={200}
        />
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/media/${media_id}`}>View</Link>
        </Button>
        <Button asChild className="w-full">
          <Link href={`/media/${media_id}/edit`}>Edit</Link>
        </Button>
        <Button asChild className="w-full">
          <Link href={`/media/${media_id}/delete`}>Delete</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
