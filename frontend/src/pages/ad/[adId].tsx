import React from 'react';
import Layout from '@/components/Layout';
import {
  useAdQuery,
  useDeleteAdMutation,
  useProfileQuery,
} from '@/graphql/generated/schema';
import { useRouter } from 'next/router';
import { UserCircleIcon } from '@heroicons/react/outline';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import { PencilIcon } from '@heroicons/react/outline';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function adDetails() {
  const router = useRouter();

  const { adId } = router.query;

  const { data } = useAdQuery({
    variables: { adId: typeof adId === 'string' ? parseInt(adId, 10) : 0 },
    skip: typeof adId === 'undefined',
  });

  const ad = data?.ad;

  const category = ad?.category.name;

  const [deleteAd] = useDeleteAdMutation();

  const { data: currentUser } = useProfileQuery();

  const canEdit =
    currentUser?.profile.role === 'admin' ||
    currentUser?.profile.id === ad?.owner.id;

  return (
    <Layout title={ad?.title ? ad.title + ' - TGC' : 'The Good Corner'}>
      <div className="">
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          {typeof ad === 'undefined' ? (
            'chargement...'
          ) : (
            <div className="">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{ad.title}</h1>
                <p className="text-2xl">{ad.price} €</p>
              </div>

              <div className="flex justify-center items-center">
                <img
                  src={ad.picture}
                  alt={ad.title}
                  className="max-h-96 rounded-lg mt-6 mb-6"
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="font-bold mr-2">{category}</p>
                <div className="flex items-center justify-items-center gap-2">
                  {ad.tags.map((tag, index) => (
                    <div className="flex items-center justify-items-center px-2 py-2 border border-gray-700 text-black rounded-full leading-none">
                      <p key={index}>{tag.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-3 mb-6">{ad.description}</p>
              <div className="flex justify-between mb-2">
                <div className="flex items-center mt-3">
                  {ad.owner.avatar ? (
                    <img
                      className="rounded-full h-8 w-8 mr-2"
                      src={ad.owner.avatar}
                      alt={ad.owner.nickname}
                    />
                  ) : (
                    <UserCircleIcon width={24} height={24} className="mr-2" />
                  )}

                  {ad.owner.nickname}
                </div>

                <div className="flex items-center mt-2 ">
                  <LocationMarkerIcon width={24} height={24} className="mr-2" />
                  {ad.location}
                </div>
              </div>

              {canEdit && (
                <div className="flex justify-between border-t pt-2 items-center ">
                  <Link
                    href={`/editAd/${ad.id}`}
                    className="flex items-center mt-3 cursor-pointer"
                    data-testid="editAdBtn"
                  >
                    <PencilIcon width={24} height={24} className="mr-2" />
                    Editer l'annonce
                  </Link>
                  <div
                    className="flex items-center mt-3 cursor-pointer"
                    data-testid="deleteAdBtn"
                    onClick={() => {
                      if (
                        confirm(
                          'Êtes-vous certain.e de vouloir supprimer cette annonce ?'
                        )
                      )
                        deleteAd({ variables: { adId: ad.id } })
                          .then(() => {
                            router.push('/').then(() => router.reload());
                          })
                          .catch(console.error);
                    }}
                  >
                    <TrashIcon width={24} height={24} className="mr-2" />
                    Supprimer l'annonce
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
