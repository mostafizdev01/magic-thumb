import { useEffect, useRef, useState } from "react"
import BackSoftDrop from "../components/BackSoftDrop"
import { type IThumbnail } from "../../public/assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRightIcon, DownloadIcon, TrashIcon } from "lucide-react"
import { api } from "../config/api"
import toast from "react-hot-toast"


const MyGeneratePage = () => {

  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const cache = useRef<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const aspectRatioClassMap: Record<string, string> = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '1:16': 'aspect-[9/16]',

  }

  const fetchThumbnails = async () => {
    if (cache.current) {
      setThumbnails(cache.current)
      return
    }
    setLoading(true)
    const { data } = await api.get("/api/generate/my-thumbnail")
    if (data?.thumbnail) {
      cache.current = data?.thumbnail;
      setLoading(false)
      setThumbnails(data?.thumbnail)
    }
  }

  const handleDownload = async (image_url: string) => {
    try {
      const response = await fetch(image_url); // response image file

      const blob = await response.blob(); // response raw file data. Example:- jpg, png, video. ## Blob means = Binary Large Object

      const url = window.URL.createObjectURL(blob); /// create a random url.

      const a = document.createElement("a"); // create HTML a tag. useing JS.
      a.href = url;
      a.download = "thumbnail.png"; // set download image name

      document.body.appendChild(a); /// a tag add temporary page.
      a.click(); /// auto click for download

      a.remove(); /// a tag remove in temporary page.
      window.URL.revokeObjectURL(url); // blob URL delete
    } catch (error) {
      console.log(error); 
    }
  };

  const handleDelete = (id: string) => {
    setSelectedId(id)
    setShowModal(true)
  }

  const confirmDelete = async () => {
    if (!selectedId) {
      toast.error("Invalid ImageId!")
      setShowModal(false)
      return
    }

    try {
      const { data } = await api.delete(`/api/generate/${selectedId}`);
      setThumbnails((prev: any[]) =>
        prev.filter(item => item._id !== selectedId)
      );

      toast.success(data?.message);
    } catch (error) {
      toast.error("Delete failed!");
    } finally {
      setShowModal(false);
    }
  };




  useEffect(() => {
    fetchThumbnails()
  }, [])

  return (
    <>
      <BackSoftDrop />
      <div className=" mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        {/* HEADER */}
        <div className=" mb-8">
          <h1 className=" text-2xl font-bold text-zinc-200">My Generations</h1>
          <p className=" text-sm text-zinc-400 mt-1">View and manage all your AI-generated thumbnails</p>
        </div>

        {/* LOADING */}
        {
          loading && (
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className=" rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]" />
              ))}
            </div>
          )
        }

        {/* EMPTY STATE  */}

        {!loading && thumbnails?.length === 0 && (
          <div className=" text-center py-24">
            <h2 className=" text-lg font-semibold text-zinc-200">No thumbnails yet</h2>
            <p className=" text-sm text-zinc-400 mt-2">Generate your first thumbnail to see it here.</p>
          </div>
        )}


        {!loading && thumbnails.length > 0 && (
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {
              thumbnails?.map((thumb: IThumbnail) => {
                const aspectClasses = aspectRatioClassMap[thumb.aspect_ratio || '16:9'];

                return (
                  <div key={thumb._id} onClick={() => navigate(`/generate/${thumb?._id}`)}
                    className=" mb-3 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 transition shadow-xl break-inside-avoid">
                    {/* IMAGE  */}
                    <div className={`relative overflow-hidden rounded-t-2xl ${aspectClasses} bg-black`}>
                      {thumb?.image_url ? (
                        <img src={thumb?.image_url} alt={thumb?.title} className=" w-full h-full object-cover group-hover:scale105 transition-transform duration-300" />
                      ) : (
                        <div className=" w-full h-full flex items-center justify-center text-sm text-zinc-400">
                          {thumb?.isGenerating ? "Generating..." : "No image"}
                        </div>
                      )}

                      {
                        thumb?.isGenerating && <div className=" absolute inset-0 bg-black/50 flex items-center justify-center text-sm font-medium text-white">
                          Generating...
                        </div>
                      }

                    </div>

                    {/* CONTENT */}
                    <div className=" p-4 space-y-2">
                      <h3 className=" text-sm font-semibold text-zinc-100 line-clamp-2">{thumb?.title}</h3>
                      <div className=" flex flex-wrap gap-2 text-xs text-zinc-400">
                        <span className=" px-2 py-0.5 rounded bg-white/8">{thumb?.style}</span>
                        <span className=" px-2 py-0.5 rounded bg-white/8">{thumb?.color_scheme}</span>
                        <span className=" px-2 py-0.5 rounded bg-white/8">{thumb?.aspect_ratio}</span>
                      </div>
                      <p>{new Date(thumb.createdAt!).toDateString()}</p>
                    </div>

                    {/* DELETE & DOWNLOAD & ARROWICON AND FUNCTION  */}

                    <div onClick={(e) => e.stopPropagation()} className=" absolute bottom-2 right-2 max-sm:flex flex gap-1.5">
                      <TrashIcon onClick={() => handleDelete(thumb?._id)} className=" size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all" />
                      <DownloadIcon onClick={() => handleDownload(thumb?.image_url!)} className=" size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all" />
                      <Link target="_blank" to={`/preview?thumbnail_url=${thumb?.image_url}&title=${thumb?.title}`}>
                        <ArrowRightIcon className=" size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all" />
                      </Link>
                    </div>

                  </div>
                )
              })
            }
          </div>
        )}

      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl w-[300px] text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure? You want to delete
            </h2>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-900 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MyGeneratePage