import { fetchMediaById } from '@/models/media-model';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default async function Single({ params }: { params: { id: number } }) {
  const mediaItem = await fetchMediaById(params.id);
  return (
    <main>
      <h1 className="text-4xl font-bold">Single</h1>
      <section className="flex flex-col p-8">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={process.env.UPLOAD_SERVER + '/uploads/' + mediaItem.filename}
            priority={true}
            className="rounded-md object-cover"
            alt={mediaItem.title}
            fill
          />
        </AspectRatio>
      </section>
    </main>
  );
}
