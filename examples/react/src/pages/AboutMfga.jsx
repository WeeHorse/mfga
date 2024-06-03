import ReactMarkdown from 'react-markdown';
import { useLoaderData } from 'react-router-dom'

export default function () {
  const readme = useLoaderData()

  return (
    <div>
      <ReactMarkdown>{readme}</ReactMarkdown>
    </div>
  );
};
