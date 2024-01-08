'use client';
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
import Image from 'next/image';
import Link from 'next/link';

export default function HeroCard(props: {
  heading: string;
  title: string;
  filename: string;
  id: number;
}) {
  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>{props.heading}</CardTitle>
        <CardDescription>{props.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={1 / 1}>
          <Image
            src={props.filename}
            priority={true}
            className="rounded-md object-cover"
            alt="Most liked media"
            fill
            sizes="(min-width: 640px) 300px, 100vw"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/media/${props.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
