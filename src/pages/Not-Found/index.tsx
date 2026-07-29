import { useNotFound } from './hooks/useNotFound';
import { NotFoundContent } from './components/NotFoundContent';

export default function NotFoundPage() {
  const { handleGoBack } = useNotFound();

  return <NotFoundContent onGoBack={handleGoBack} />;
}
