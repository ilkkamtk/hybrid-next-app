'use client';
import { FieldValues, useForm } from 'react-hook-form';
import { fetchData } from '@/lib/functions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useState } from 'react';

const MediaForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const form = useForm();
  const router = useRouter();

  const doSubmit = async (data: FieldValues) => {
    console.log(data, file);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('file', file as File);
      const response = await fetchData('/api/media', {
        method: 'POST',
        body: formData,
      });
      console.log(response);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const doChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <section className="flex flex-col p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(doSubmit)}>
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            name="file"
            render={() => (
              <FormItem>
                <FormLabel htmlFor="media">File</FormLabel>
                <FormControl>
                  <Input type="file" id="media" onChange={doChange} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
};

export default MediaForm;
