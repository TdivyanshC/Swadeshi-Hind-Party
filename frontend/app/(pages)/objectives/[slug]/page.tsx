import ObjectiveDetail from '../../../../components/ObjectiveDetail'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ObjectiveDetailPage({ params }: PageProps) {
  const { slug } = await params
  return <ObjectiveDetail slug={slug} />
}