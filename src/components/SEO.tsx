import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
}

const SEO = ({ title, description, path = "/" }: SEOProps) => (
  <Helmet>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    <link rel="canonical" href={path} />
    <meta property="og:title" content={title} />
    {description && <meta property="og:description" content={description} />}
    <meta property="og:url" content={path} />
    <meta property="og:type" content="website" />
  </Helmet>
);

export default SEO;
