import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTimeISO: any;
};

export type Ad = {
  __typename?: 'Ad';
  category: Category;
  createdAt: Scalars['DateTimeISO'];
  description: Scalars['String'];
  id: Scalars['Int'];
  location: Scalars['String'];
  owner: User;
  picture: Scalars['String'];
  price: Scalars['Float'];
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTimeISO'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAd: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  ads: Array<Ad>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  nickname: Scalars['String'];
  role: Scalars['String'];
};

export type AdsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdsQuery = { __typename?: 'Query', ads: Array<{ __typename?: 'Ad', id: number, title: string, price: number, picture: string }> };


export const AdsDocument = gql`
    query Ads {
  ads {
    id
    title
    price
    picture
  }
}
    `;

/**
 * __useAdsQuery__
 *
 * To run a query within a React component, call `useAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdsQuery(baseOptions?: Apollo.QueryHookOptions<AdsQuery, AdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdsQuery, AdsQueryVariables>(AdsDocument, options);
      }
export function useAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdsQuery, AdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdsQuery, AdsQueryVariables>(AdsDocument, options);
        }
export type AdsQueryHookResult = ReturnType<typeof useAdsQuery>;
export type AdsLazyQueryHookResult = ReturnType<typeof useAdsLazyQuery>;
export type AdsQueryResult = Apollo.QueryResult<AdsQuery, AdsQueryVariables>;