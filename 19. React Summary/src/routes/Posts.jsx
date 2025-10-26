import { PostList } from "../components/PostList/PostList";
import { Outlet } from "react-router-dom";

export function Posts() {
  return (
    <>
      <Outlet></Outlet>
      <main>
        <PostList />
      </main>
    </>
  );
}

export async function postsLoader() {
  const res = await fetch('http://localhost:8080/posts');
  const data = await res.json();

  return data.posts;
}
