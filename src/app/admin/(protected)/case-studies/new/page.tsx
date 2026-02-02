import { createCaseStudy } from '../actions';

export default function NewCaseStudyPage() {
    return (
        <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">New Case Study</h1>

            <form action={createCaseStudy} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input
                        id="title"
                        name="title"
                        placeholder="Enter the case study title"
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="image" className="block text-sm font-medium">Cover Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="summary" className="block text-sm font-medium">Summary</label>
                    <textarea
                        id="summary"
                        name="summary"
                        placeholder="A short summary for the list view"
                        required
                        rows={3}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="content" className="block text-sm font-medium">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Full content of the case study (Markdown supported)"
                        required
                        rows={15}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none font-mono text-sm"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="published"
                        name="published"
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <label htmlFor="published" className="text-sm font-medium">Publish immediately</label>
                </div>

                <div className="pt-4">
                    <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                        Create Case Study
                    </button>
                </div>
            </form>
        </div>
    );
}
