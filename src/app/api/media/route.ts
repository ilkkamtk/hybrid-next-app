import { addMedia } from '@/models/media-model';
import { MediaItem, UploadResult } from '@/types/DBTypes';
import { fetchData } from '@/lib/functions';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    console.log(formData);

    const options = {
      method: 'POST',
      body: formData,
    };

    const result = await fetchData<UploadResult>(
      `${process.env.UPLOAD_SERVER}/api/v1/upload`,
      options,
    );

    // check if the result is not valid
    if (!result.message || !result.data || !result.data.image) {
      return new Response('Invalid response from media server', {
        status: 500,
      });
    }
    // add data to database

    const { title, description, file } = Object.fromEntries(formData.entries());
    const { size, type } = file as File;
    const mediaItem: Omit<MediaItem, 'media_id' | 'created_at'> = {
      user_id: 4,
      filename: result.data.image,
      filesize: size,
      media_type: type,
      title: title.toString(),
      description: description.toString(),
    };

    const addResult = await addMedia(mediaItem);
    console.log('addResult', addResult);
    result.message += ' ' + addResult.media_id;
    return new Response(JSON.stringify(result), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error((error as Error).message);
    return new Response((error as Error).message, { status: 500 });
  }
}
