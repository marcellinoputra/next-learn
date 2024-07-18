"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { DataFeed, useCreateFeed, useFeed } from "@/hooks/useFeed";
import { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const createFeedFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title Minimal 3 Karakter")
    .max(16, "Title Maximal 16 Karakter")
    .default(""),

  body: z.string().min(8, "Body Minimal 8 Karakter").default(""),
});

type CreateFeedFormSchema = z.infer<typeof createFeedFormSchema>;

const ViewFeed: React.FC = () => {
  const form = useForm<CreateFeedFormSchema>({
    resolver: zodResolver(createFeedFormSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const { handleSubmit, control } = form;

  // State
  const [progress, setProgress] = useState<number>(0);
  const [isAddPostOpen, setIsAddPostOpen] = useState<boolean>(false);
  const { toast } = useToast();
  // hooks
  const { data, isPending, isError, refetch } = useFeed();
  const mutation = useCreateFeed();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPending) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prevProgress + 10;
        });
      }, 100);
    } else {
      setProgress(100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPending]);

  useEffect(() => {
    if (mutation.isError) {
      <div>An error occurred: {mutation.error.message}</div>;
    }
    if (mutation.isSuccess) {
      toast({
        title: mutation.data.data.message,
      });
      // setIsAddPostOpen(false);
      // mutation.reset();
      // form.reset();
      // refetch();
    }
  }, [mutation.isError, mutation.isSuccess, mutation.error, mutation.data]);

  if (isPending) {
    return (
      <div className="flex flex-col max-w min-h-screen justify-center items-center p-5">
        <Progress value={progress} className="w-[60%]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        Error fetching data.{" "}
        <Button variant="default" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const onSubmit = handleSubmit((values) => {
    console.log("Form submitted", values);
    try {
      mutation.mutate({
        title: values.title,
        body: values.body,
      });
      // Jika berhasil, mutation.isSuccess akan menjadi true,
      // yang akan memicu efek untuk menutup dialog dan me-refresh data
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (misalnya, menampilkan pesan error kepada pengguna)
    }
  });

  return (
    <main className="flex flex-col max-w min-h-screen p-5">
      <div className="flex flex-start justify-between items-start mb-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          The Post
        </h3>
        <Button onClick={() => setIsAddPostOpen(true)}>Add Post</Button>
      </div>
      {data?.map((item: DataFeed) => (
        <Card key={item.id} className="my-4">
          <CardHeader>
            <p>User ID: {item.userId}</p>
          </CardHeader>
          <CardContent>
            <p>Title: </p>
            <p>{item.title}</p>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col">
              <p>Content: </p>
              <p>{item.body}</p>
            </div>
          </CardFooter>
        </Card>
      ))}

      <Form {...form}>
        <form onSubmit={onSubmit}>
          <Dialog open={isAddPostOpen} onOpenChange={setIsAddPostOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Post</DialogTitle>
                <DialogDescription>
                  Create a new post here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={control}
                  name="body"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Body</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save Post</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </main>
  );
};

export default ViewFeed;
