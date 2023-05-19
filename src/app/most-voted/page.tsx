import { prisma } from "@/lib/db";

export default async function mostVoted() {
  const qCats = await prisma.cats.findMany({
    orderBy: { likeCount: "desc" },
    take: 8,
  });
  return (
    <div className="h-92 flex gap-5 px-5 flex-wrap overflow-y-scroll py-20">
        <div  className="max-w-sm rounded overflow-hidden shadow-lg w-2/4 h-2/4">
          <img
           
            src={"/mia.jpeg"}
            alt="Sunset in the mountains"
            
            style={{objectFit: "fill", height: "100%", width: "100% "}}

          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-white">Mia Like Count: (9999)</div>
          </div>
        </div>
        <div  className="max-w-sm rounded overflow-hidden shadow-lg w-2/4 h-2/4">
          <img
            className="w-full"
            src={"/muhallebi.jpg"}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-white">Sütlaç Like Count: (9999)</div>
          </div>
        </div>
        
      {qCats.map((cat, index) => (
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg w-2/4 h-2/4">
          <img
            className="w-full"
            src={cat.imageUrl}
        
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-white">Anonymus Cat Like Count: ({cat.likeCount})</div>
          </div>
         
        </div>
      ))}
    </div>
  );
}
