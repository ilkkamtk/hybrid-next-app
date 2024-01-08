import { deleteMedia } from '@/models/media-model';
import { redirect } from 'next/navigation';

export default async function Delete({ params }: { params: { id: number } }) {
  try {
    const mediaItem = await deleteMedia(params.id);
    console.log(mediaItem);
  } catch (error) {
    console.error('Delete', (error as Error).message);
  } finally {
    redirect('/media');
  }
}
