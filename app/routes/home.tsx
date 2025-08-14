import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Github Repo Explorer' },
    { name: 'Github Repo Explorer', content: 'Github Repo Explorer' },
  ];
}

export default function Home() {
  return <Welcome />;
}
