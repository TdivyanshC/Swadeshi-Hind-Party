import ChallengeDetail from '../../../../components/ChallengeDetail'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ChallengeDetailPage({ params }: PageProps) {
  const { slug } = await params
  return <ChallengeDetail slug={slug} />
}