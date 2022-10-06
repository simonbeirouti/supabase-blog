import MetaHead from "../components/MetaHead";
import styles from "../styles/Home.module.css";
import supabase from "../utils/supabase";

export async function getStaticProps() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw new Error(error);
  }

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <MetaHead
        title="NextJS + Supabase Blog"
        description="An example of a NextJS + Supabase blog"
      />

      <h1>Working!</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
