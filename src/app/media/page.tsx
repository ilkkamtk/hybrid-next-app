import MediaForm from '@/components/MediaForm';
import { fetchAllMedia } from '@/models/media-model';
import MediaCard from '@/components/MediaCard';

const MediaPage = async () => {
  const mediaList = await fetchAllMedia();
  mediaList.reverse();
  return (
    <main>
      <h1 className="text-4xl font-bold">Media</h1>
      <MediaForm />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols:4 gap-4">
        {mediaList.map((media, index) => (
          <div key={index} className="mb-4 break-inside-avoid-column">
            <MediaCard media={media} />
          </div>
        ))}
      </section>
    </main>
  );
};

export default MediaPage;
