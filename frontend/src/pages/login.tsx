import React, { FormEvent } from "react";
import Layout from "@/components/Layout";
import { useLoginMutation } from "@/graphql/generated/schema";

export default function Login() {
  const [loginUser] = useLoginMutation();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    console.log({ formJSON });
    await loginUser({ variables: { data: formJSON } });
    alert("merci !");
  };

  return (
    <Layout title="Se connecter">
      <h1 className="text-xl pt-4 pb-4">Se connecter</h1>
      <form onSubmit={handleSubmit} className="pb-12">
        <div className="flex flex-wrap gap-6 mb-3">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              required
              type="text"
              minLength={3}
              name="email"
              id="email"
              placeholder="email@example.com"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex flex-wrap gap-6 mb-3">
            <div className="flex flex-wrap gap-6 mb-3">
              <div className="form-control w-full max-w-xs">
                <label className="label" htmlFor="password">
                  <span className="label-text">Mot de passe</span>
                </label>
                <input
                  required
                  type="password"
                  minLength={8}
                  name="password"
                  id="password"
                  placeholder="********"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>

            <button className="btn btn-primary text-white mt-12 w-full">
              Se connecter
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
