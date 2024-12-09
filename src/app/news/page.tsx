import PostCard from "@/components/PostCard";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
// import MediumPostList from "@/components/MediumPostList";

export default function News() {
    return (
        <div className="max-w-screen-lg mx-auto pt-40 flex flex-col gap-40">
            <PostCard />
            {/* medium post list */}
            <BlogCard />
            <div className="h-20"></div>
            <Footer/>
        </div>
    )
}