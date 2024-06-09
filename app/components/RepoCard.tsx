import { Fork, Repository, RepositoryDetails } from '@/app/lib/types';
import React, { useCallback, useState } from 'react';

import GitClient from '@/app/lib/api/gitClient';
import Image from 'next/image';
import Link from 'next/link';
import Tag from './Tag';

interface CardProps<T> {
  data: T;
}

function RepoCard<T extends Repository>({ data }: CardProps<T>) {
  const [repoDetails, setRepoDetails] = useState<RepositoryDetails | null>(
    null,
  );
  const [isTagLoading, setIsTagLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepoDetails = useCallback(async () => {
    if (repoDetails || isTagLoading) return;

    setIsTagLoading(true);
    setError(null);

    try {
      const details = await GitClient.getRepoDetails({
        owner: data.owner.name,
        name: data.name,
      });
      setRepoDetails(details);
    } catch (err) {
      setError('Error fetching repository details');
    } finally {
      setIsTagLoading(false);
    }
  }, [data.owner.name, data.name, repoDetails, isTagLoading]);

  const languagesTagOptions =
    repoDetails?.languages.map(language => ({
      label: language,
      // TODO: make this a link to a language wiki
      href: `#`,
    })) || [];

  const forksTagOptions =
    repoDetails?.forks.map(fork => ({
      label: fork.owner.name,
      href: fork.owner.profile,
    })) || [];

  return (
    <div className="rounded border border-border bg-gradient-to-r from-primary to-secondary p-4 shadow-sm shadow-border duration-200 hover:scale-105 hover:border-accent">
      <h2 className="mb-2 text-h2">
        <Link href={data.url} className="text-accent hover:text-foreground">
          {data.name}
        </Link>
      </h2>
      <p className="mb-2 truncate text-body">{data.description}</p>
      <div className="mb-2 flex items-center">
        <Image
          src={data.owner.avatar}
          alt={data.owner.name}
          width={30}
          height={30}
          className="mr-2 h-8 w-8 rounded-full"
        />
        <Link
          href={data.owner.profile}
          className="text-accent hover:text-foreground"
        >
          {data.owner.name}
        </Link>
      </div>
      <div className="flex space-x-4">
        <Tag
          text={`Languages 🌐`}
          options={languagesTagOptions}
          onClick={fetchRepoDetails}
          loading={isTagLoading}
        />
        <Tag
          text={`Forks 🍴 ${data.forksCount}`}
          options={forksTagOptions}
          onClick={fetchRepoDetails}
          loading={isTagLoading}
        />
        <Tag text={`Issues 🐛 ${data.openIssuesCount}`} options={[]} />
      </div>
    </div>
  );
}

export default RepoCard;
