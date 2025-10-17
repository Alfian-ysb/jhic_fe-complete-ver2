// import React from 'react'
import Button from '../button'

const newsItems = ({gridTemplate, imgSource, newstitle, newsDesc, published, newsUrl} : {
    gridTemplate : string
    imgSource? : string
    newstitle : string
    newsDesc? : string
    published? : string
    newsUrl? : string
}) => {
  return (
    <div className={`flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:scale-101 hover:shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all duration-150 ${gridTemplate}`}>
        {imgSource ? (
          <img
            src={imgSource}
            alt={newstitle}
            className="w-full sm:w-1/3 md:w-1/4 h-48 sm:h-full object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-t-none"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%25" height="100%25" fill="%23e5e7eb"/><text x="50%25" y="50%25" font-size="14" fill="%236b7280" dominant-baseline="middle" text-anchor="middle">No Image</text></svg>' }}
          />
        ) : (
          <div className="w-full sm:w-1/3 md:w-1/4 h-48 sm:h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-t-xl sm:rounded-l-xl sm:rounded-t-none">
            No Image
          </div>
        )}
        <div className="w-full h-full object-cover flex flex-col justify-between">
          <div className="p-3 md:p-4">
            <h3 className="text-base md:text-lg font-bold line-clamp-2">{newstitle}</h3>
            <p className="text-xs md:text-sm text-gray-600 mt-2 line-clamp-2">
              {newsDesc}
            </p>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-3 md:px-4 pb-3 md:pb-4">
            <Button buttonText='Read More' url={newsUrl ?? '#'} />
            <p className="w-fit text-right text-xs md:text-sm text-neutral-500 font-medium px-3 sm:px-0 sm:pr-2">{published}</p>
          </div>
        </div>
    </div>
  )
}

{/* <div className="flex col-span-3 row-span-2 col-start-3 row-start-3 bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src={getNews(2).urlToImage} 
              alt={getNews(2).title}
              className="w-1/4 h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-xs text-purple-600 font-bold">INDEX 2</span>
              <h3 className="font-bold mt-2 line-clamp-2">{getNews(2).title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {getNews(2).description}
              </p>
            </div>
          </div> */}


export default newsItems