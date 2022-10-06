import supabase from "../utils/supabase";
import { useEffect } from "react";

export async function getServerSideProps({ params }) {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, comments(*)")
    .eq("id", params.id)
    .single();

  if (error) {
    throw new Error(error);
  }

  return {
    props: {
      posts,
    },
  };
}

export default function Postpage({ posts }) {
  useEffect(() => {
    const subscription = supabase
      .from("comments")
      .on("INSERT", (payload) => {
        console.log(payload);
      })
      .subscribe();

    return () => supabase.removeSubscription(subscription);
  }, []);

  return (
    <div>
      <h1>{posts.title}</h1>
      <p>{posts.content}</p>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
