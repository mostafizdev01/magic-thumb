import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import BackSoftDrop from "./BackSoftDrop";
import AspectRatioSelector from "./AspectRatioSelector";
import StyleSelector from "./StyleSelector";
import ColorSchemeSelector from "./ColorSchemeSelector";
import { colorSchemes, type AspectRatio, type IThumbnail, type ThumbnailStyle } from "../../public/assets/assets";
import PreviewPanel from "./PreviewPanel";
import { api } from "../config/api";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";


const Generate = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [additionalDetails, setAdditionalDetails] = useState("")
    const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null)
    const [loading, setLoading] = useState(false)
    const [AspectRatio, setAspectRatio] = useState<AspectRatio>("16:9")
    const [colorSchemeId, setColorSchemeId] = useState<string>(colorSchemes[0].id)
    const [style, setStyle] = useState<ThumbnailStyle>('Bold & Graphic')
    const [styleDropdownOpen, setstyleDropdownOpen] = useState(false)

    const { user } = useAuth();

    const handleGenerate = async () => {
        setLoading(true)
        if (!user) {
            setTimeout(() => {
                toast.error("You aren't loggedIn!")
                navigate('/login')
            }, 1000);
            return
        }
        const api_payload = {
            title,
            prompt: additionalDetails,
            style,
            aspect_ratio: AspectRatio,
            color_scheme: colorSchemeId,
            text_overlay: true
        }

        const { data } = await api.post("/api/generate", api_payload);

        setThumbnail(data?.thumbnail);

        if (data?.success) {
            setLoading(false)
            toast.success(data.message)
            navigate("/generate/" + data?.thumbnail?._id);
        }
    }

    const fetchThumbnail = async () => {
        try {
            const { data } = await api.get(`/api/generate/${id}`);
            // console.log("data:", data)
            setThumbnail(data?.thumbnail as IThumbnail);
            setLoading(!data?.thumbnail.image_url);
            setAdditionalDetails(data?.thumbnail?.user_prompt)
            setTitle(data?.thumbnail?.title)
            setColorSchemeId(data?.thumbnail?.color_scheme)
            setAspectRatio(data?.thumbnail.aspect_ratio)
            setStyle(data?.thumbnail.style)
        } catch (error) {
            // console.log("error: ", error);
            toast.error("Something wen't wrong!")

        }
    }

    useEffect(() => {
        if (id) {
            fetchThumbnail()
        }
        if (thumbnail && loading) {
            const interval = setInterval(() => {
                fetchThumbnail()
            }, 5000);
            return () => clearInterval(interval)
        }
    }, [id])

    useEffect(() => {
        if (!id && thumbnail) {
            setThumbnail(null)
        }
    }, [id])


    return (
        <>
            <BackSoftDrop />
            <div className=" pt-24 min-h-screen">
                <main className=" max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
                    <div className=" grid lg:grid-cols-[400px_1fr] gap-8">
                        {/* LEFT PANEL */}
                        <div className={`space-y-6 ${id && 'pointer-events-none'}`}>
                            <div className=" p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                                <div>
                                    <h2 className=" text-xl font-bold text-zinc-100 mb-1">ate Your Thumbcrenail</h2>
                                    <p className=" text-sm text-zinc-300">Describe your vision and let AI bring it to life</p>
                                </div>
                                <div className=" space-y-5">
                                    <div className=" space-y-2">
                                        <label className=" block text-sm font-medium" htmlFor="title">Title or Topic</label>
                                        <input type="text" name="title" value={title}
                                            onChange={(e) => setTitle(e.target.value)} maxLength={100} placeholder="e.g., 10 Tips for Better Sleep"
                                            className=" w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400
                                        focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                        <div className=" flex justify-end">
                                            <span className=" text-sx text-zinc-400">{title.length}/100</span>
                                        </div>
                                    </div>
                                    {/* AspectRatioSelector */}
                                    <AspectRatioSelector value={AspectRatio} onChange={setAspectRatio} />

                                    {/* StyleSelector */}
                                    <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setstyleDropdownOpen} />

                                    {/* ColorSchemeSelector */}
                                    <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId} />

                                    {/* Details */}
                                    <div className=" space-y-2">
                                        <label className=" block text-sm font-medium">Additional Prompts <span className=" text-zinc-400 text-xs">(optional)</span></label>
                                        <textarea value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} rows={3}
                                            placeholder="Add any specific elements, mood, or style preferences..."
                                            className=" w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100
                                        placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none" />
                                    </div>
                                </div>

                                {/* Button */}


                                {
                                    !id && (
                                        <button
                                            disabled={loading || !title}
                                            onClick={handleGenerate}
                                            className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-700 disabled:bg-gray-400 disabled:cursor-default disabled:opacity-30"
                                        >
                                            {loading ? (
                                                <div className="flex justify-center items-center gap-1.5">
                                                    <LoaderIcon className="animate-spin size-5 [animation-duration:.6s]" />
                                                    Generating...
                                                </div>
                                            ) : (
                                                "Generate Thumbnail"
                                            )}
                                        </button>
                                    )
                                }

                            </div>
                        </div>

                        {/* RIGHT PANEL */}
                        <div>
                            <div className=" p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                                <h2 className=" text-lg font-semibold text-zinc-100 mb-4">Preview</h2>
                                <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={AspectRatio} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Generate