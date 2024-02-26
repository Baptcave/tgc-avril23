import Layout from "@/components/Layout";
import {
  useCreateExampleMutation,
  useExamplesQueryQuery,
} from "@/graphql/generated/schema";
import { FormEvent } from "react";

export default function Home() {
  const [createExample] = useCreateExampleMutation();
  const { data, refetch } = useExamplesQueryQuery();
  const examples = data?.examples || [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    await createExample({ variables: { data: { ...formJSON } } });
    refetch();
  };

  return (
    <Layout title="Accueil - TGC">
      <h1 className="pt-4"> New example :</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="name" />
        <button type="submit">Save</button>
      </form>

      {examples.map((ex) => (
        <li key={ex.id}>{ex.name}</li>
      ))}
    </Layout>
  );
}
