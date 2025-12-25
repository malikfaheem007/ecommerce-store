import Container from "@/components/Container";
import {urlFor} from "@/sanity/lib/image";
import {getSingleBlog} from "@/sanity/queries";
import Image from "next/image";
import {notFound} from "next/navigation";

const SingleBlogPage = async ({params}: {params: Promise<{slug: string}>}) => {
  const {slug} = await params;
  const blog = await getSingleBlog(slug);
  if (!blog) return notFound();
  return (
    <div>
      <Container>
        <div>
          {blog?.mainImage && (
            <Image
              src={urlFor(blog?.mainImage).url()}
              alt={blog?.title || "blog image"}
              width={800}
              height={800}
              className="w-full max-h-[500px] object-cover rounded-lg"
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default SingleBlogPage;
