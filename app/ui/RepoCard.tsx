import Image from 'next/image';
import Link from 'next/link'
import React from 'react';
import Tag from './Tag';

interface Owner {
    login: string;
    avatar_url: string;
    html_url: string;
}

export interface Repository {
    id: number;
    name: string;
    owner: Owner;
    html_url: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

interface CardProps<T> {
    data: T;
}

function RepoCard<T extends Repository>({ data }: CardProps<T>) {
    const tagOptions = [
        { label: 'TypeScript', href: `${data.html_url}/network/members` },
        { label: 'JavaScript', href: `${data.html_url}/issues` }
    ];

    return (
        <div className="p-4 shadow-sm shadow-border bg-gradient-to-r from-primary to-secondary border border-border rounded hover:scale-105 duration-200 hover:border-accent">
            <h2 className="text-h2 mb-2">{data.name}</h2>
            <p className="text-body mb-2">{data.description}</p>
            <div className="flex items-center mb-2">
                <Image
                    src={data.owner.avatar_url}
                    alt={data.owner.login}
                    width={30}
                    height={30}
                    className="w-8 h-8 rounded-full mr-2"
                />
                <Link href={data.owner.html_url} className="text-accent hover:text-foreground">{data.owner.login}</Link>
            </div>
            <div className="flex space-x-4">
                <Tag text={`Languages 🌐`} options={tagOptions} />
                <Tag text={`Forks 🍴 ${data.forks_count}`} options={tagOptions} />
                <Tag text={`Issues 🐛 ${data.open_issues_count}`} options={tagOptions} />
            </div>
        </div>
    );
};

export default RepoCard;
