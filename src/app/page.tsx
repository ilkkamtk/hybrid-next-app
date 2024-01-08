import HeroCard from '@/components/HeroCard';
import {
  fetchHighestRatedMedia,
  fetchMostLikedMedia,
  fetchMostCommentedMedia,
} from '@/models/media-model';

export default async function Home() {
  const mostLiked = await fetchMostLikedMedia();
  const mostCommented = await fetchMostCommentedMedia();
  const highestRated = await fetchHighestRatedMedia();

  return (
    <main>
      <h1 className="text-4xl font-bold">Home</h1>
      <section className="flex flex-wrap justify-between">
        <HeroCard
          heading="Most Liked Media"
          title={mostLiked ? mostLiked.title : 'No media liked yet'}
          filename={
            mostLiked
              ? mostLiked.filename
              : process.env.UPLOAD_SERVER + '/uploads/no-image.png'
          }
          id={mostLiked ? mostLiked.media_id : 0}
        />
        <HeroCard
          heading="Most Commented Media"
          title={mostCommented ? mostCommented.title : 'No media commented yet'}
          filename={
            mostCommented
              ? mostCommented.filename
              : process.env.UPLOAD_SERVER + '/uploads/no-image.png'
          }
          id={mostCommented ? mostCommented.media_id : 0}
        />
        <HeroCard
          heading="Highest Rated Media"
          title={highestRated ? highestRated.title : 'No media rated yet'}
          filename={
            highestRated
              ? highestRated.filename
              : process.env.UPLOAD_SERVER + '/uploads/no-image.png'
          }
          id={highestRated ? highestRated.media_id : 0}
        />
      </section>
    </main>
  );
}
