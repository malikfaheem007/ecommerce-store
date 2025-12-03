import Container from "@/components/Container";
import LatestBlog from "@/components/LatestBlog";
import {Title} from "@/components/ui/text";

const BlogPage = () => {
  return (
    <div>
      {" "}
      <Container>
        <LatestBlog />
      </Container>
    </div>
  );
};

export default BlogPage;
