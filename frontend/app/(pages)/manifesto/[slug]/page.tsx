import ManifestoDetail from '../../../../components/ManifestoDetail'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ManifestoDetailPage({ params }: PageProps) {
  const { slug } = await params
  return <ManifestoDetail slug={slug} />
}