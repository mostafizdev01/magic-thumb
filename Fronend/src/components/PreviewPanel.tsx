import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react"
import type { AspectRatio, IThumbnail } from "../../public/assets/assets"
import { useState } from "react"

const PreviewPanel = ({ thumbnail, isLoading, aspectRatio }: { thumbnail: IThumbnail | null, isLoading: boolean, aspectRatio: AspectRatio }) => {

    const aspectClasses = {
        "16:9": "aspect-video",
        "1:1": "aspect-square",
        "9:16": "aspect-[9/16]"
    } as Record<AspectRatio, string>

    const [loading, setLoading] = useState(false)

    // download button 
    const onDownload = async (image_url: string) => {
        try {
            setLoading(true)
            setTimeout( async () => {
                const response = await fetch(image_url); // response image file

                const blob = await response.blob(); // response raw file data. Example:- jpg, png, video. ## Blob means = Binary Large Object

                const url = window.URL.createObjectURL(blob); /// create a random url.

                const a = document.createElement("a"); // create HTML a tag. useing JS.
                a.href = url;
                const randomNumber = Math.floor(Math.random() * 1000);
                a.download = `thumbnail_${randomNumber}.png`; // set download image name

                document.body.appendChild(a); /// a tag add temporary page.
                a.click(); /// auto click for download

                a.remove(); /// a tag remove in temporary page.
                window.URL.revokeObjectURL(url); // blob URL delete 
                setLoading(false)
            }, );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className=" relative mx-auto w-full max-w-2xl">
            <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}>
                {/* loading state */}
                {
                    isLoading && (
                        <div className=" absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25">
                            <Loader2Icon className=" size-8 animate-spin text-zinc-400" />
                            <div className=" text-center">
                                <p className=" text-sm font-medium text-zinc-200">AI is creating your thumbnail...</p>
                                <p className=" mt-1 text-xs text-zinc-400">This may take 10-20 seconds.</p>
                            </div>
                        </div>
                    )
                }

                {/* image state */}
                {
                    !isLoading && thumbnail?.image_url && (
                        <div>
                            <img src={thumbnail?.image_url} alt={thumbnail?.title}
                                className=" h-full w-full object-cover" />
                            <div className=" absolute inset-0 flex items-end justify-center bg-black/10 transition-opacity group-hover:opacity-100">
                                <button onClick={() => onDownload(thumbnail?.image_url as string)}
                                    className=" flex mb-6  items-center gap-2 rounded-md px-5 py-2.5 text-xs font-medium transition bg-white/30 ring-2 ring-white/400 backdrop-blur hover:scale-105 active:scale-95">
                                    <DownloadIcon className=" size-4" />
                                    {loading ? "Downloading..." : "Download Thumbnail"}
                                </button>
                            </div>
                        </div>
                    )
                }
                {/* Empty state */}
                {
                    !isLoading && !thumbnail?.image_url && (
                        <div className=" absolute inset-0 m-2 flex flex-col  items-center justify-center gap-4 rounded-lg border-2 border-dashed border-white/20 bg-black/25">
                            <div className=" max-sm:hidden flex size-20 items-center justify-center rounded-full bg-white/10">
                                <ImageIcon className=" size-10 text-white opacity-50" />
                            </div>
                            <div className=" px-4 text-center">
                                <p className=" font text-zinc-200">Generate your first thumbnail</p>
                                <p className=" mt-1 text-xs text-zinc-400">Fill out the form and click Generate</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PreviewPanel