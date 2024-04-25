import { TagIcon, PaperAirplaneIcon, InboxIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Categories or Tags:',
    description:
      'Users can organize their bookmarks into categories or apply tags for easier navigation and retrieval.',
    icon: TagIcon,
  },
  {
    name: 'Search Functionality:',
    description: 'Users can search through their saved bookmarks by title, URL, or tags to quickly find what they are looking for.',
    icon: PaperAirplaneIcon,
  },
  {
    name: 'Preview or Thumbnail:',
    description: 'When saving a bookmark, the website may provide a preview or thumbnail of the linked content, such as a website screenshot or image.',
    icon: InboxIcon,
  },
]

export default function Feature() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
                
              <h2 className="text-base font-semibold leading-7 text-indigo-600"></h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">Better Bookmarks</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              A bookmarks website is a digital tool that enables users to save and organize web links for later access, providing features such as categorization, search functionality, and preview of thumbnail.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="/main.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
          
        </div>
      </div>
    </div>
  )
}