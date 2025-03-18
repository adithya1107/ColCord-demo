import { PlagiarismChecker } from '@/components/plagiarism-checker'

export default function PlagiarismCheckerPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Plagiarism Checker</h1>
      <PlagiarismChecker />
    </div>
  )
}

